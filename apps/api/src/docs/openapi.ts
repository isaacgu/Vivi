export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Evivi API',
    version: '0.1.0',
  },
  servers: [{ url: 'http://localhost:4000' }],
  paths: {
    '/health': {
      get: {
        summary: 'API liveness check',
        responses: { '200': { description: 'API is online' } },
      },
    },
    '/health/ready': {
      get: {
        summary: 'API readiness check',
        responses: { '200': { description: 'Database and cache are reachable' } },
      },
    },
    '/api/v1/events': {
      get: {
        summary: 'List events',
        responses: { '200': { description: 'Event list' } },
      },
    },
    '/api/v1/session/me': {
      get: {
        summary: 'Current authenticated user',
        responses: {
          '200': { description: 'Current user' },
          '401': { description: 'Authentication required' },
        },
      },
    },
    '/api/v1/payments/paystack/checkout': {
      post: {
        summary: 'Initialize Paystack hosted checkout',
        responses: {
          '201': { description: 'Checkout created' },
          '503': { description: 'Paystack is not configured' },
        },
      },
    },
    '/api/v1/payments/paystack/webhook': {
      post: {
        summary: 'Receive Paystack webhook',
        responses: {
          '202': { description: 'Webhook accepted' },
          '401': { description: 'Invalid signature' },
        },
      },
    },
    '/api/v1/uploads/intent': {
      post: {
        summary: 'Create upload target',
        responses: {
          '201': { description: 'Upload target created' },
          '401': { description: 'Authentication required' },
        },
      },
    },
  },
} as const;
