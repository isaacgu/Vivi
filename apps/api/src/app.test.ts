import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from './app.js';

describe('Evivi API', () => {
  it('returns health status', async () => {
    const response = await request(createApp()).get('/health').expect(200);

    expect(response.body).toMatchObject({
      status: 'ok',
      service: 'evivi-api',
    });
  });

  it('returns API root metadata', async () => {
    const response = await request(createApp()).get('/').expect(200);

    expect(response.body).toMatchObject({
      service: 'evivi-api',
      status: 'online',
    });
  });

  it('returns OpenAPI metadata', async () => {
    const response = await request(createApp()).get('/openapi.json').expect(200);

    expect(response.body).toMatchObject({
      openapi: '3.1.0',
      info: { title: 'Evivi API' },
    });
  });

  it('returns dev session user when dev auth is enabled', async () => {
    const response = await request(createApp())
      .get('/api/v1/session/me')
      .set('x-dev-user-role', 'ADMIN')
      .expect(200);

    expect(response.body.user).toMatchObject({
      id: 'dev-user',
      email: 'dev@evivi.local',
      role: 'ADMIN',
    });
  });

  it('validates Paystack checkout requests before config checks', async () => {
    const response = await request(createApp())
      .post('/api/v1/payments/paystack/checkout')
      .send({ email: 'not-an-email', amountCents: 100 })
      .expect(400);

    expect(response.body.error).toMatchObject({
      code: 'validation_error',
    });
  });

  it('returns a standard error when Paystack is not configured', async () => {
    const response = await request(createApp())
      .post('/api/v1/payments/paystack/checkout')
      .send({ email: 'customer@example.com', amountCents: 1000 })
      .expect(503);

    expect(response.body.error).toMatchObject({
      code: 'paystack_not_configured',
    });
  });

  it('creates a local upload intent shape', async () => {
    const response = await request(createApp())
      .post('/api/v1/uploads/intent')
      .send({ key: 'events/demo/image.jpg', contentType: 'image/jpeg', maxBytes: 1000 })
      .expect(201);

    expect(response.body.upload).toMatchObject({
      provider: 'local',
      key: 'events/demo/image.jpg',
    });
  });
});
