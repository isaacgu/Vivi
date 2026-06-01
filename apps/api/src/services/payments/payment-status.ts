import type { PaymentStatus } from '@prisma/client';

export function mapPaystackStatus(status: string): PaymentStatus {
  switch (status.toLowerCase()) {
    case 'success':
      return 'PAID';
    case 'abandoned':
      return 'CANCELLED';
    case 'failed':
      return 'FAILED';
    case 'reversed':
      return 'REFUNDED';
    default:
      return 'PENDING';
  }
}
