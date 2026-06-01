import { Router } from 'express';
import { z } from 'zod';

import { prisma } from '../lib/prisma.js';
import { validateRequest } from '../middleware/validate-request.js';

export const eventsRouter = Router();

eventsRouter.get('/', async (_req, res, next) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      take: 25,
      include: {
        host: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: { gifts: true },
        },
      },
    });

    res.json({ events });
  } catch (error) {
    next(error);
  }
});

eventsRouter.get(
  '/:id',
  validateRequest({ params: z.object({ id: z.string().min(1) }) }),
  async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          gifts: true,
          host: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      });

      if (!event) {
        res.status(404).json({
          error: {
            code: 'event_not_found',
            message: 'Event was not found.',
          },
        });
        return;
      }

      res.json({ event });
    } catch (error) {
      next(error);
    }
  },
);
