import type { ErrorRequestHandler, RequestHandler, Response } from 'express';
import { ZodError } from 'zod';

import { AppError, isAppError } from '../lib/errors.js';

export const notFoundHandler: RequestHandler = (req, res) => {
  sendError(res, new AppError('not_found', `Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  req.log.error(error);

  if (error instanceof ZodError) {
    sendError(
      res,
      new AppError(
        'validation_error',
        'Request validation failed.',
        400,
        error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      ),
    );
    return;
  }

  if (isAppError(error)) {
    sendError(res, error);
    return;
  }

  sendError(res, new AppError('internal_server_error', 'Something went wrong.', 500));
};

function sendError(res: Response, error: AppError) {
  res.status(error.statusCode).json({
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  });
}
