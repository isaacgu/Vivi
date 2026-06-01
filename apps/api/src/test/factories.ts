import type { EventStatus, PaymentProvider, PaymentStatus, UserRole } from '@prisma/client';

export function buildUser(overrides: Partial<{ email: string; role: UserRole }> = {}) {
  return {
    email: overrides.email ?? 'customer@example.com',
    role: overrides.role ?? 'CUSTOMER',
  };
}

export function buildEvent(
  overrides: Partial<{ title: string; status: EventStatus; city: string }> = {},
) {
  return {
    title: overrides.title ?? 'Demo celebration',
    status: overrides.status ?? 'LIVE',
    city: overrides.city ?? 'Centurion',
  };
}

export function buildPayment(
  overrides: Partial<{
    provider: PaymentProvider;
    status: PaymentStatus;
    amountCents: number;
  }> = {},
) {
  return {
    provider: overrides.provider ?? 'PAYSTACK',
    status: overrides.status ?? 'PENDING',
    amountCents: overrides.amountCents ?? 50_000,
    currency: 'ZAR',
  };
}
