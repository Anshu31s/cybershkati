/**
 * Prisma API Client for Cyber Shakti Foundation Winter Internship
 * Talks directly to Express + Prisma ORM backend (/api/*)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const DEFAULT_PRICING = {
  mode: 'auto',
  tiers: [
    { id: 'tier-1', min: 1, max: 50, amount: 1000 },
    { id: 'tier-2', min: 51, max: 100, amount: 999 },
    { id: 'tier-3', min: 101, max: 200, amount: 1499 },
    { id: 'tier-4', min: 201, max: 500, amount: 1999 },
    { id: 'tier-5', min: 501, max: 750, amount: 2499 },
    { id: 'tier-6', min: 751, max: null, amount: 2999 },
  ],
};

async function postPaymentRequest(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Razorpay payment request failed.');
  }
  return result;
}

export function createRazorpayOrder(registrationData) {
  return postPaymentRequest('/api/payments/razorpay/orders', registrationData);
}

export function verifyRazorpayPayment(paymentData) {
  return postPaymentRequest('/api/payments/razorpay/verify', paymentData);
}

export async function submitRegistration(registrationData) {
  try {
    const res = await createRazorpayOrder(registrationData);
    return { data: res, error: null, mode: 'prisma' };
  } catch (err) {
    return { data: null, error: err, mode: 'error' };
  }
}

export async function getCurrentPricing() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pricing/current`);
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || 'Could not load registration fee.');
    return result;
  } catch (error) {
    const tier = DEFAULT_PRICING.tiers[0];
    return { ...DEFAULT_PRICING, tier, amount: tier.amount, registrationCount: 0, error };
  }
}

/**
 * Fetch total registration count from Prisma database
 */
export async function getRegistrationCount() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/registrations/count`);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return { count: data.count || 0, error: null, mode: data.databaseAvailable === false ? 'offline' : 'prisma', databaseAvailable: data.databaseAvailable !== false };
  } catch (err) {
    // If backend is momentarily unreachable, fallback to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('cyber_shakti_registrations') || '[]');
      return { count: existing.length, error: null, mode: 'local_fallback', databaseAvailable: false };
    } catch (e) {
      return { count: 0, error: err, mode: 'error', databaseAvailable: false };
    }
  }
}

/**
 * Fetch all registrations (admin/dashboard query)
 */
export async function getRegistrations() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/registrations`);
    const data = await res.json();
    return { registrations: data.registrations || [], error: null };
  } catch (err) {
    return { registrations: [], error: err };
  }
}
