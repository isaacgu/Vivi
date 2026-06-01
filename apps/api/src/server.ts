import { env } from './config/env.js';
import { createApp } from './app.js';
import { disconnectRedis } from './lib/redis.js';
import { prisma } from './lib/prisma.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`Evivi API listening on http://localhost:${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}. Shutting Evivi API down.`);

  server.close(() => {
    console.log('Evivi API HTTP server stopped');
  });

  await Promise.allSettled([prisma.$disconnect(), disconnectRedis()]);
}

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
