import { NextResponse } from 'next/server';
import {
  activeTier,
  createApplicationId,
  createRegistrationToken,
  getPricingConfiguration,
  getRazorpayCredentials,
  prisma,
  razorpayRequest,
  type RegistrationDraft,
} from '../../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const credentials = getRazorpayCredentials();
  if (!credentials) return NextResponse.json({ success: false, error: 'Razorpay is not configured on the server.' }, { status: 503 });
  const data = await request.json().catch(() => ({}));
  const fullName = String(data.fullName || '').trim();
  const email = String(data.email || '').trim().toLowerCase();
  const phone = String(data.phone || data.whatsappNumber || '').trim();
  if (!fullName || !email || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Enter a valid name, email, and phone number.' }, { status: 400 });
  }

  try {
    const paidRegistrations = await prisma.registration.count({ where: { status: { in: ['paid', 'registered'] } } });
    const pricing = await getPricingConfiguration();
    const tier = activeTier(pricing, paidRegistrations + 1);
    const amount = tier.amount * 100;
    const applicationId = createApplicationId();
    const draft: RegistrationDraft = {
      applicationId,
      fullName,
      email,
      phone,
      altPhone: String(data.altPhone || '').trim(),
      whatsappNumber: String(data.whatsappNumber || phone).trim(),
      gender: String(data.gender || '').trim(),
      dob: String(data.dob || '').trim(),
      category: String(data.category || '').trim(),
      experienceLevel: String(data.experienceLevel || 'Beginner / Student').trim(),
      hasPriorInternship: String(data.hasPriorInternship || 'No').trim(),
      priorInternshipDetails: String(data.priorInternshipDetails || '').trim(),
      college: String(data.college || 'N/A').trim(),
      course: String(data.course || data.currentRole || 'N/A').trim(),
      year: String(data.year || '2026').trim(),
      currentRole: String(data.currentRole || 'Student').trim(),
      attendanceReason: String(data.attendanceReason || '').trim(),
      hearAboutEvent: String(data.hearAboutEvent || 'Direct').trim(),
      preferredTrack: String(data.preferredTrack || 'All 7 Tracks'),
      amount: tier.amount,
      pricingTierId: tier.id,
    };

    const order = await razorpayRequest('/orders', {
      method: 'POST',
      credentials,
      body: {
        amount,
        currency: 'INR',
        receipt: applicationId.slice(0, 40),
        notes: { application_id: applicationId, program: 'Winter Internship Program 2026', price_tier: tier.id },
      },
    });
    const registrationToken = createRegistrationToken(draft, order.id, credentials.keySecret);
    return NextResponse.json({
      success: true,
      keyId: credentials.keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      applicationId,
      registrationToken,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    const databaseUnavailable = /Can't reach database server|PrismaClientKnownRequestError|connection refused/i.test(error.message || '');
    return NextResponse.json({ success: false, error: databaseUnavailable
      ? 'Registration pricing is temporarily unavailable. Please try again shortly.'
      : error.message || 'Could not create a Razorpay order.' }, { status: databaseUnavailable ? 503 : 502 });
  }
}
