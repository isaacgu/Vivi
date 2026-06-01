import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { ZodError } from 'zod';

import { env } from './config/env.js';
import { healthRouter } from './routes/health.js';
import { paymentsRouter } from './routes/payments.js';
import { rootRouter } from './routes/root.js';

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
  app.use(express.json({ limit: '1mb' }));

  app.use('/', rootRouter);
  app.use('/health', healthRouter);
  app.use('/payments', paymentsRouter);
  app.use('/api/v1/health', healthRouter);
  app.use('/api/v1/payments', paymentsRouter);

  app.use((req, res) => {
    res.status(404).json({ error: 'not_found', path: req.originalUrl });
  });
  app.use(errorHandler);

  return app;
}

function parseCorsOrigin(value: string) {
  if (value === '*') {
    return true;
  }

  return value.split(',').map((origin) => origin.trim());
}

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  req.log.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      error: 'validation_error',
      issues: error.issues,
    });
    return;
  }

  res.status(500).json({
    error: 'internal_server_error',
  });
};
