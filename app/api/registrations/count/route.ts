import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const count = await prisma.registration.count({ where: { status: { in: ['paid', 'registered'] } } });
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Registration count error:', error);
    return NextResponse.json({ success: true, count: 0, databaseAvailable: false });
  }
}
