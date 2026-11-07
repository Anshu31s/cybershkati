import { NextResponse } from 'next/server';
import { activeTier, authorizeAdmin, getPricingConfiguration, PRICING_ID, prisma, validTiers } from '../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const denied = authorizeAdmin(request);
  if (denied) return NextResponse.json({ success: false, error: denied.error }, { status: denied.status });
  try {
    const [config, registrationCount] = await Promise.all([
      getPricingConfiguration(),
      prisma.registration.count({ where: { status: { in: ['paid', 'registered'] } } }),
    ]);
    return NextResponse.json({ success: true, config, registrationCount, activeTier: activeTier(config, registrationCount + 1) });
  } catch (error) {
    console.error('Admin pricing read error:', error);
    return NextResponse.json({ success: false, error: 'Could not load fee configuration. Check the database connection and run the Prisma sync.' }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const denied = authorizeAdmin(request);
  if (denied) return NextResponse.json({ success: false, error: denied.error }, { status: denied.status });
  const { mode, manualTierId, tiers } = await request.json().catch(() => ({}));
  if (!['auto', 'manual'].includes(mode) || !validTiers(tiers)
    || (mode === 'manual' && !tiers.some((tier) => tier.id === manualTierId))) {
    return NextResponse.json({ success: false, error: 'Check the fee tiers and selected pricing mode.' }, { status: 400 });
  }
  try {
    const config = await prisma.pricingConfiguration.upsert({
      where: { id: PRICING_ID },
      create: { id: PRICING_ID, mode, manualTierId: mode === 'manual' ? manualTierId : null, tiers },
      update: { mode, manualTierId: mode === 'manual' ? manualTierId : null, tiers },
    });
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error('Admin pricing save error:', error);
    return NextResponse.json({ success: false, error: 'Could not save fee configuration. Check the database connection and run the Prisma sync.' }, { status: 503 });
  }
}
