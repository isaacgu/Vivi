import { Router } from 'express';

import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate-request.js';
import { uploadIntentSchema } from '../schemas/uploads.js';
import { storageProvider } from '../services/storage/index.js';

export const uploadsRouter = Router();

uploadsRouter.post(
  '/intent',
  requireAuth,
  validateRequest({ body: uploadIntentSchema }),
  async (req, res, next) => {
    try {
      const target = await storageProvider.createUploadTarget(req.body);
      res.status(201).json({ upload: target });
    } catch (error) {
      next(error);
    }
  },
);
