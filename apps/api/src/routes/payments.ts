import { Router } from 'express';

import { validateRequest } from '../middleware/validate-request.js';
import { paystackCheckoutSchema } from '../schemas/payments.js';
import {
  initializePaystackCheckout,
  verifyPaystackWebhookSignature,
} from '../services/payments/paystack.js';

export const paymentsRouter = Router();

paymentsRouter.post(
  '/paystack/checkout',
  validateRequest({ body: paystackCheckoutSchema }),
  async (req, res, next) => {
    try {
      const checkout = await initializePaystackCheckout(req.body);
      res.status(201).json({ checkout });
    } catch (error) {
      next(error);
    }
  },
);

paymentsRouter.post('/paystack/webhook', (req, res, next) => {
  try {
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body));
    verifyPaystackWebhookSignature(rawBody, req.header('x-paystack-signature'));
    res.status(202).json({ received: true });
  } catch (error) {
    next(error);
  }
});
