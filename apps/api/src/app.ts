import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { env } from './config/env.js';
import { attachDevAuthUser } from './middleware/auth.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { docsRouter } from './routes/docs.js';
import { eventsRouter } from './routes/events.js';
import { healthRouter } from './routes/health.js';
import { paymentsRouter } from './routes/payments.js';
import { rootRouter } from './routes/root.js';
import { sessionRouter } from './routes/session.js';
import { uploadsRouter } from './routes/uploads.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(pinoHttp());
  app.use(helmet());
  app.use(cors({ origin: parseCorsOrigin(env.CORS_ORIGIN) }));
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use('/payments/paystack/webhook', express.raw({ type: 'application/json', limit: '1mb' }));
  app.use('/api/v1/payments/paystack/webhook', express.raw({ type: 'application/json', limit: '1mb' }));
  app.use(express.json({ limit: '1mb' }));
  app.use(attachDevAuthUser);

  app.use('/', docsRouter);
  app.use('/', rootRouter);
  app.use('/health', healthRouter);
  app.use('/payments', paymentsRouter);
  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/events', eventsRouter);
  app.use('/api/v1/payments', paymentsRouter);
  app.use('/api/v1/session', sessionRouter);
  app.use('/api/v1/uploads', uploadsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

function parseCorsOrigin(value: string) {
  if (value === '*') {
    return true;
  }

  return value.split(',').map((origin) => origin.trim());
}
