import type { UserRole } from '@prisma/client';
import type { RequestHandler } from 'express';

import { AppError } from '../lib/errors.js';

export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(new AppError('unauthorized', 'Authentication is required.', 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError('forbidden', 'You do not have permission for this action.', 403));
      return;
    }

    next();
  };
}
