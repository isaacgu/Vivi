import { z } from 'zod';

export const uploadIntentSchema = z.object({
  key: z.string().min(3).max(180).regex(/^[a-zA-Z0-9/_\-.]+$/),
  contentType: z.string().min(3).max(120),
  maxBytes: z.number().int().positive().max(10_000_000).default(5_000_000),
});
