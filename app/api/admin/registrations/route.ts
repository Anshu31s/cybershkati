import { NextResponse } from 'next/server';
import { authorizeAdmin, prisma } from '../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const denied = authorizeAdmin(request);
  if (denied) return NextResponse.json({ success: false, error: denied.error }, { status: denied.status });
  try {
    const registrations = await prisma.registration.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, registrations });
  } catch (error) {
    console.error('Admin registrations read error:', error);
    return NextResponse.json({ success: false, error: 'Could not load registrations. Check the database connection and run the Prisma sync.' }, { status: 503 });
  }
}
