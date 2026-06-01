import { Router } from 'express';

import { requireAuth } from '../middleware/auth.js';

export const sessionRouter = Router();

sessionRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});
