# Evivi API

Node.js, Express, Prisma, PostgreSQL, and Redis backend starter.

## Local Services

```powershell
npm run backend:up
npm run api:migrate
npm run api:seed
npm run api:dev
```

The API runs on `http://localhost:4000`.

Useful endpoints:

- `GET /`
- `GET /health`
- `GET /health/ready`
- `POST /payments/paystack/checkout`
- `POST /api/v1/payments/paystack/checkout`

## Docker

```powershell
docker compose -f infra/docker-compose.yml up -d --build
docker compose -f infra/docker-compose.yml logs -f api
```

Run migrations from the host for now:

```powershell
npm run api:migrate
```
