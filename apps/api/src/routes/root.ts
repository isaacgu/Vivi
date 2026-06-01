import { Router } from 'express';

export const rootRouter = Router();

rootRouter.get('/', (_req, res) => {
  res.json({
    service: 'evivi-api',
    status: 'online',
    version: '0.1.0',
    routes: {
      health: '/health',
      readiness: '/health/ready',
      apiV1: '/api/v1',
    },
  });
});
