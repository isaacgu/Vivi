# Backend Readiness

This backend is prepared to wait for frontend-specific requirements without blocking on UI details.

## Ready Now

- Docker Compose services for API, PostgreSQL, and Redis.
- API Dockerfile for container builds.
- Prisma schema for users, vendors, events, gift contributions, and payments.
- Initial migration workflow through Prisma.
- Seed workflow with stable demo records.
- Health endpoints for liveness and readiness.
- Paystack checkout route stub that refuses requests until `PAYSTACK_SECRET_KEY` is set.
- Versioned route aliases under `/api/v1`.

## Local Bootstrap

```powershell
npm run backend:up
npm run api:migrate
npm run api:seed
npm run api:dev
```

Then check:

```powershell
Invoke-WebRequest http://localhost:4000/health/ready -UseBasicParsing
```

## Frontend Contract Starting Points

- API base URL: `http://localhost:4000`
- Mobile env key: `EXPO_PUBLIC_API_URL`
- Versioned API base URL: `http://localhost:4000/api/v1`
- Database: PostgreSQL on `localhost:5432`
- Cache: Redis on `localhost:6379`

## Still Waiting On Frontend/Product Inputs

- Exact screen flows and data payloads.
- Auth provider final choice.
- Vendor onboarding and payout model.
- Final event/gift catalog fields.
- File upload/media requirements.
