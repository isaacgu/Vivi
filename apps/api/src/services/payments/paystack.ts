import { createHmac, timingSafeEqual } from 'node:crypto';

import { env } from '../../config/env.js';
import { AppError } from '../../lib/errors.js';
import type { PaystackCheckoutInput } from '../../schemas/payments.js';

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export async function initializePaystackCheckout(payload: PaystackCheckoutInput) {
  if (!env.PAYSTACK_SECRET_KEY) {
    throw new AppError(
      'paystack_not_configured',
      'Set PAYSTACK_SECRET_KEY before creating checkout sessions.',
      503,
    );
  }

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
    throw new AppError(
      'paystack_initialization_failed',
      body.message || 'Paystack checkout could not be initialized.',
      502,
    );
  }

  return {
    authorizationUrl: body.data.authorization_url,
    accessCode: body.data.access_code,
    reference: body.data.reference,
  };
}

export function verifyPaystackWebhookSignature(rawBody: Buffer, signature: string | undefined) {
  if (!env.PAYSTACK_WEBHOOK_SECRET) {
    throw new AppError(
      'paystack_webhook_not_configured',
      'Set PAYSTACK_WEBHOOK_SECRET before accepting Paystack webhooks.',
      503,
    );
  }

  if (!signature) {
    throw new AppError('missing_paystack_signature', 'Missing Paystack signature header.', 401);
  }

  const expected = createHmac('sha512', env.PAYSTACK_WEBHOOK_SECRET).update(rawBody).digest('hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  const receivedBuffer = Buffer.from(signature, 'hex');

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    throw new AppError('invalid_paystack_signature', 'Paystack signature is invalid.', 401);
  }
}
