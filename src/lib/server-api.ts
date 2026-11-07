import { PrismaClient } from '../generated/prisma';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const globalForPrisma = globalThis as typeof globalThis & { cyberShaktiPrisma?: PrismaClient };

function getRuntimeDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return undefined;

  const url = new URL(connectionString);
  const isSupabasePooler = url.hostname.endsWith('.pooler.supabase.com');

  // Supabase session mode (5432) caps application clients at the configured
  // pool size. Use transaction mode for runtime requests and keep each Prisma
  // instance's own pool small so multiple route instances can share it safely.
  if (isSupabasePooler && url.port === '5432') {
    url.port = '6543';
    url.searchParams.set('pgbouncer', 'true');
  }
  url.searchParams.set('connection_limit', process.env.PRISMA_CONNECTION_LIMIT || '1');
  return url.toString();
}

const datasourceUrl = getRuntimeDatabaseUrl();
export const prisma = globalForPrisma.cyberShaktiPrisma || new PrismaClient({
  ...(datasourceUrl ? { datasourceUrl } : {}),
  log: ['warn', 'error'],
});
globalForPrisma.cyberShaktiPrisma = prisma;

export const PRICING_ID = 'winter-2026';
export type PriceTier = { id: string; min: number; max: number | null; amount: number };
export const DEFAULT_PRICE_TIERS: PriceTier[] = [
  { id: 'tier-1', min: 1, max: 50, amount: 1000 },
  { id: 'tier-2', min: 51, max: 100, amount: 999 },
  { id: 'tier-3', min: 101, max: 200, amount: 1499 },
  { id: 'tier-4', min: 201, max: 500, amount: 1999 },
  { id: 'tier-5', min: 501, max: 750, amount: 2499 },
  { id: 'tier-6', min: 751, max: null, amount: 2999 },
];

export async function getPricingConfiguration() {
  const existing = await prisma.pricingConfiguration.findUnique({ where: { id: PRICING_ID } });
  if (existing) return { ...existing, tiers: existing.tiers as PriceTier[] };

  let config;
  try {
    config = await prisma.pricingConfiguration.create({
      data: { id: PRICING_ID, mode: 'auto', tiers: DEFAULT_PRICE_TIERS },
    });
  } catch (error) {
    // Concurrent first requests can both observe a missing row. Reuse the
    // singleton created by the winning request rather than surfacing P2002.
    if ((error as { code?: string }).code !== 'P2002') throw error;
    config = await prisma.pricingConfiguration.findUnique({ where: { id: PRICING_ID } });
    if (!config) throw error;
  }
  return { ...config, tiers: config.tiers as PriceTier[] };
}

export function activeTier(config: { mode: string; manualTierId?: string | null; tiers: PriceTier[] }, registrationCount: number) {
  if (config.mode === 'manual' && config.manualTierId) {
    return config.tiers.find((tier) => tier.id === config.manualTierId) || config.tiers[0];
  }
  return config.tiers.find((tier) => registrationCount >= tier.min && (tier.max == null || registrationCount <= tier.max))
    || config.tiers[config.tiers.length - 1];
}

export function validTiers(tiers: unknown): tiers is PriceTier[] {
  if (!Array.isArray(tiers) || tiers.length < 1 || tiers.length > 12) return false;
  const ids = new Set<string>();
  let expectedMin: number | null = 1;
  for (const tier of tiers) {
    if (!tier || typeof tier.id !== 'string' || !tier.id || !Number.isSafeInteger(tier.min)
      || ids.has(tier.id) || !Number.isSafeInteger(tier.amount) || tier.amount < 1
      || !Number.isSafeInteger(tier.amount * 100) || tier.min !== expectedMin
      || (tier.max !== null && (!Number.isSafeInteger(tier.max) || tier.max < tier.min))) return false;
    ids.add(tier.id);
    expectedMin = tier.max === null ? null : tier.max + 1;
  }
  return expectedMin === null;
}

export function authorizeAdmin(request: Request) {
  const expected = process.env.ADMIN_ACCESS_KEY || '';
  const provided = request.headers.get('x-admin-key') || '';
  if (!expected) return { status: 503, error: 'Admin access is not configured on the server.' };
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);
  if (expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return { status: 401, error: 'Admin key is invalid.' };
  }
  return null;
}

const RAZORPAY_API = 'https://api.razorpay.com/v1';
export function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export async function razorpayRequest(path: string, options: { method?: string; body?: unknown; credentials: { keyId: string; keySecret: string } }) {
  const auth = Buffer.from(`${options.credentials.keyId}:${options.credentials.keySecret}`).toString('base64');
  const response = await fetch(`${RAZORPAY_API}${path}`, {
    method: options.method || 'GET',
    headers: { Authorization: `Basic ${auth}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}) },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.description || 'Razorpay request failed.');
  return result;
}

export function isValidRazorpaySignature(orderId: string, paymentId: string, signature: string, secret: string) {
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest();
  const received = Buffer.from(signature, 'hex');
  return received.length === expected.length && timingSafeEqual(expected, received);
}

export type RegistrationDraft = {
  applicationId: string;
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
  whatsappNumber: string;
  gender: string;
  dob: string;
  experienceLevel: string;
  hasPriorInternship: string;
  priorInternshipDetails: string;
  college: string;
  course: string;
  year: string;
  currentRole: string;
  hearAboutEvent: string;
  amount: number;
  pricingTierId: string;
};

const REGISTRATION_TOKEN_LIFETIME_MS = 30 * 60 * 1000;

function registrationTokenSecret(razorpaySecret: string) {
  return process.env.REGISTRATION_TOKEN_SECRET || razorpaySecret;
}

export function createRegistrationToken(draft: RegistrationDraft, orderId: string, razorpaySecret: string) {
  const payload = Buffer.from(JSON.stringify({
    draft,
    orderId,
    expiresAt: Date.now() + REGISTRATION_TOKEN_LIFETIME_MS,
  })).toString('base64url');
  const signature = createHmac('sha256', registrationTokenSecret(razorpaySecret)).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function readRegistrationToken(token: string, orderId: string, razorpaySecret: string): RegistrationDraft | null {
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return null;
  const expected = createHmac('sha256', registrationTokenSecret(razorpaySecret)).update(payload).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, 'base64url');
  } catch {
    return null;
  }
  if (received.length !== expected.length || !timingSafeEqual(expected, received)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.orderId !== orderId || !Number.isSafeInteger(data.expiresAt) || data.expiresAt < Date.now()) return null;
    if (!data.draft || typeof data.draft.applicationId !== 'string' || typeof data.draft.fullName !== 'string'
      || typeof data.draft.email !== 'string' || typeof data.draft.phone !== 'string'
      || !Number.isSafeInteger(data.draft.amount) || typeof data.draft.pricingTierId !== 'string') return null;
    return data.draft as RegistrationDraft;
  } catch {
    return null;
  }
}

export function createApplicationId() {
  return `CSF-WIP26-${randomUUID().slice(0, 8).toUpperCase()}`;
}

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!);
}

export async function ensureRegistrationConfirmation(registration: any) {
  if (registration.confirmationEmailSentAt) return true;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return false;
  const name = escapeHtml(registration.fullName);
  const applicationId = escapeHtml(registration.applicationId);
  const amount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(registration.amount);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `registration-confirmation-${registration.applicationId}` },
      body: JSON.stringify({
        from, to: [registration.email], subject: 'Your Cyber Shakti Winter Internship registration is confirmed',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#172033;line-height:1.6"><p style="color:#0e7490;font-weight:700">CYBER SHAKTI FOUNDATION</p><h1 style="font-size:26px">You’re registered, ${name}!</h1><p>Your payment has been verified and your place in the <strong>Winter Internship Program 2026</strong> is confirmed.</p><div style="padding:18px;background:#f1f7fa;border-radius:12px"><p><strong>Application ID:</strong> ${applicationId}</p><p><strong>Program:</strong> Winter Internship Program 2026 · 28 days</p><p><strong>Payment received:</strong> ${amount}</p></div><p>Keep your application ID for future communication. We look forward to learning and building with you.</p><p>— Cyber Shakti Foundation</p></div>`,
        text: `You’re registered, ${registration.fullName}! Payment verified. Application ID: ${registration.applicationId}. Winter Internship Program 2026 · 28 days. Payment received: ${amount}. — Cyber Shakti Foundation`,
      }),
    });
    if (!response.ok) throw new Error('Resend could not send the registration email.');
    await prisma.registration.update({ where: { id: registration.id }, data: { confirmationEmailSentAt: new Date() } });
    return true;
  } catch (error) {
    console.error('Registration confirmation email error:', error);
    return false;
  }
}
