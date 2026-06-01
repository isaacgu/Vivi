import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const localDatabaseUrl =
  'postgresql://evivi:evivi_dev_password@localhost:5432/evivi?schema=public';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string().url().default(localDatabaseUrl),
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  JWT_ISSUER: z.string().optional(),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_WEBHOOK_SECRET: z.string().optional(),
  OZOW_SITE_CODE: z.string().optional(),
  OZOW_PRIVATE_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export const isProduction = env.NODE_ENV === 'production';
