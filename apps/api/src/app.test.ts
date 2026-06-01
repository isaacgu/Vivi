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
});
