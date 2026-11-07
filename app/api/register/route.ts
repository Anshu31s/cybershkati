import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ success: false, error: 'Complete payment through Razorpay Checkout to register.' }, { status: 410 });
}
