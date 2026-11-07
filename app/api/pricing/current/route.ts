import { NextResponse } from 'next/server';
import { activeTier, DEFAULT_PRICE_TIERS, getPricingConfiguration, prisma } from '../../../../src/lib/server-api';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const [config, registrationCount] = await Promise.all([
      getPricingConfiguration(),
      prisma.registration.count({ where: { status: { in: ['paid', 'registered'] } } }),
    ]);
    const tier = activeTier(config, registrationCount + 1);
    return NextResponse.json({ success: true, mode: config.mode, tiers: config.tiers, tier, registrationCount, amount: tier.amount });
  } catch (error) {
    console.error('Pricing configuration read error:', error);
    const tier = DEFAULT_PRICE_TIERS[0];
    return NextResponse.json({ success: true, mode: 'auto', tiers: DEFAULT_PRICE_TIERS, tier, registrationCount: 0, amount: tier.amount, databaseAvailable: false });
  }
}
