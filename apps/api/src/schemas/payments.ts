import { z } from 'zod';

export const paystackCheckoutSchema = z.object({
  email: z.string().email(),
  amountCents: z.number().int().positive(),
  currency: z.literal('ZAR').default('ZAR'),
  reference: z.string().min(6).max(100).optional(),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type PaystackCheckoutInput = z.infer<typeof paystackCheckoutSchema>;
