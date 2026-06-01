import type { RequestHandler } from 'express';

import { env } from '../config/env.js';
import { AppError } from '../lib/errors.js';

const validRoles = ['CUSTOMER', 'VENDOR', 'ADMIN'] as const;

export const attachDevAuthUser: RequestHandler = (req, _res, next) => {
  if (!env.DEV_AUTH_ENABLED || req.user) {
    next();
    return;
  }

  const role = String(req.header('x-dev-user-role') ?? 'CUSTOMER').toUpperCase();

  if (!validRoles.includes(role as (typeof validRoles)[number])) {
    next(new AppError('invalid_dev_role', 'x-dev-user-role is not valid.', 400));
    return;
  }

  req.user = {
    id: req.header('x-dev-user-id') ?? 'dev-user',
    email: req.header('x-dev-user-email') ?? 'dev@evivi.local',
    role: role as (typeof validRoles)[number],
  };

  next();
};

export const requireAuth: RequestHandler = (req, _res, next) => {
  if (!req.user) {
    next(new AppError('unauthorized', 'Authentication is required.', 401));
    return;
  }

  next();
};
