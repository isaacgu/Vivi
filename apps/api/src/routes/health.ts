import { Router } from 'express';

import { pingRedis } from '../lib/redis.js';
import { prisma } from '../lib/prisma.js';

export const healthRouter = Router();

const startedAt = new Date();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'evivi-api',
    startedAt: startedAt.toISOString(),
  });
});

healthRouter.get('/ready', async (_req, res, next) => {
  try {
    const checks = await Promise.allSettled([prisma.$queryRaw`SELECT 1`, pingRedis()]);
    const [database, cache] = checks.map((result) =>
      result.status === 'fulfilled' ? 'ok' : 'unavailable',
    );
    const ready = checks.every((result) => result.status === 'fulfilled');

    res.status(ready ? 200 : 503).json({
      status: ready ? 'ready' : 'not_ready',
      checks: {
        database,
        cache,
      },
    });
  } catch (error) {
    next(error);
  }
});
