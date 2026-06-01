import { Router } from 'express';
import { z } from 'zod';

import { env } from '../config/env.js';

export const paymentsRouter = Router();

const paystackCheckoutSchema = z.object({
  email: z.string().email(),
  amountCents: z.number().int().positive(),
  currency: z.literal('ZAR').default('ZAR'),
  reference: z.string().min(6).max(100).optional(),
  callbackUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

paymentsRouter.post('/paystack/checkout', async (req, res, next) => {
  try {
    if (!env.PAYSTACK_SECRET_KEY) {
      res.status(503).json({
        error: 'paystack_not_configured',
        message: 'Set PAYSTACK_SECRET_KEY before creating checkout sessions.',
      });
      return;
    }

    const payload = paystackCheckoutSchema.parse(req.body);
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        amount: payload.amountCents,
        currency: payload.currency,
        reference: payload.reference,
        callback_url: payload.callbackUrl,
        metadata: payload.metadata,
      }),
    });

    const body = (await paystackResponse.json()) as PaystackInitializeResponse;

    if (!paystackResponse.ok || !body.status || !body.data) {
      res.status(502).json({
        error: 'paystack_initialization_failed',
        message: body.message,
      });
      return;
    }

    res.status(201).json({
      authorizationUrl: body.data.authorization_url,
      accessCode: body.data.access_code,
      reference: body.data.reference,
    });
  } catch (error) {
    next(error);
  }
});
