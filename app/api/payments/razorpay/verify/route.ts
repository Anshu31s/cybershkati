import { NextResponse } from 'next/server';
import {
  ensureRegistrationConfirmation,
  getRazorpayCredentials,
  isValidRazorpaySignature,
  prisma,
  razorpayRequest,
  readRegistrationToken,
} from '../../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const credentials = getRazorpayCredentials();
  if (!credentials) return NextResponse.json({ success: false, error: 'Razorpay is not configured on the server.' }, { status: 503 });
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
    registrationToken,
  } = await request.json().catch(() => ({}));
  if (!orderId || !paymentId || !signature || typeof registrationToken !== 'string') {
    return NextResponse.json({ success: false, error: 'The Razorpay payment response is incomplete.' }, { status: 400 });
  }
  if (!isValidRazorpaySignature(orderId, paymentId, signature, credentials.keySecret)) {
    return NextResponse.json({ success: false, error: 'Payment signature verification failed.' }, { status: 400 });
  }
  const draft = readRegistrationToken(registrationToken, orderId, credentials.keySecret);
  if (!draft) {
    return NextResponse.json({ success: false, error: 'Registration details expired or failed verification. Contact support before retrying if you were charged.' }, { status: 400 });
  }

  try {
    const existing = await prisma.registration.findUnique({ where: { razorpayOrderId: orderId } });
    if (existing?.paymentStatus === 'captured' && existing.razorpayPaymentId === paymentId) {
      const emailSent = await ensureRegistrationConfirmation(existing);
      return NextResponse.json({ success: true, applicationId: existing.applicationId, status: 'paid', emailSent });
    }
    if (existing) {
      return NextResponse.json({ success: false, error: 'This order is already linked to a different payment. Contact support before retrying.' }, { status: 409 });
    }

    let payment = await razorpayRequest(`/payments/${encodeURIComponent(paymentId)}`, { credentials });
    const expectedAmount = Math.round(draft.amount * 100);
    if (payment.order_id !== orderId || payment.amount !== expectedAmount || payment.currency !== 'INR') {
      return NextResponse.json({ success: false, error: 'Payment details do not match this registration.' }, { status: 400 });
    }
    if (payment.status === 'authorized') {
      payment = await razorpayRequest(`/payments/${encodeURIComponent(paymentId)}/capture`, {
        method: 'POST', credentials, body: { amount: expectedAmount, currency: 'INR' },
      });
    }
    if (payment.status !== 'captured') {
      return NextResponse.json({ success: false, error: 'The payment has not been captured. Please contact support before retrying.' }, { status: 409 });
    }

    let registration;
    try {
      registration = await prisma.registration.create({
        data: {
          applicationId: draft.applicationId,
          fullName: draft.fullName,
          email: draft.email,
          phone: draft.phone,
          altPhone: draft.altPhone || null,
          whatsappNumber: draft.whatsappNumber || draft.phone,
          gender: draft.gender || null,
          dob: draft.dob || null,
          experienceLevel: draft.experienceLevel || null,
          hasPriorInternship: draft.hasPriorInternship || 'No',
          priorInternshipDetails: draft.priorInternshipDetails || null,
          college: draft.college || 'N/A',
          course: draft.course || 'N/A',
          yearOfStudy: draft.year || 'N/A',
          currentRole: draft.currentRole || null,
          hearAboutEvent: draft.hearAboutEvent || null,
          amount: draft.amount,
          pricingTierId: draft.pricingTierId,
          status: 'paid',
          paymentStatus: 'captured',
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          paymentMethod: payment.method || null,
          paymentCurrency: payment.currency || 'INR',
          paymentFee: Number.isSafeInteger(payment.fee) ? payment.fee : null,
          paymentTax: Number.isSafeInteger(payment.tax) ? payment.tax : null,
          paymentCapturedAt: new Date(),
        },
      });
    } catch (error) {
      // Razorpay may deliver the same successful checkout callback more than once.
      if ((error as { code?: string }).code !== 'P2002') throw error;
      registration = await prisma.registration.findUnique({ where: { razorpayOrderId: orderId } });
      if (!registration || registration.razorpayPaymentId !== paymentId || registration.paymentStatus !== 'captured') throw error;
    }

    const emailSent = await ensureRegistrationConfirmation(registration);
    return NextResponse.json({ success: true, applicationId: registration.applicationId, status: 'paid', emailSent });
  } catch (error: any) {
    console.error('Razorpay payment verification error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Could not verify the Razorpay payment.' }, { status: 502 });
  }
}
