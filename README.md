# Vivi

Evivi is a mobile-first celebration marketplace for South Africa. This repo starts the stack from the mobile tech-stack document:

- `apps/mobile`: Expo + React Native mobile app scaffold.
- `apps/api`: Node.js + Express + Prisma API scaffold.
- `infra`: Local Docker services for PostgreSQL and Redis.
- `docs`: Stack decisions, implementation roadmap, and ADRs.

## Quick Start

```powershell
Copy-Item apps/api/.env.example apps/api/.env
npm --prefix apps/api install
npm run backend:up
npm run api:migrate
npm run api:seed
npm run api:dev

npm --prefix apps/mobile run start
```

## Docker Backend

The repo includes an API Docker image definition at `apps/api/Dockerfile` and a full local backend stack in `infra/docker-compose.yml`.

Build the API image:

```powershell
docker compose -f infra/docker-compose.yml build api
```

Run the full backend stack:

```powershell
docker compose -f infra/docker-compose.yml up -d --build
```

This starts:

- `evivi-api` on `http://localhost:4000`
- `evivi-postgres` on `localhost:5432`
- `evivi-redis` on `localhost:6379`

Check backend readiness:

```powershell
Invoke-WebRequest http://localhost:4000/health/ready -UseBasicParsing
```

Stop the stack:

```powershell
docker compose -f infra/docker-compose.yml down
```

The local API image name is `evivi-api:latest`.

Optional database/cache tools:

```powershell
docker compose -f infra/docker-compose.yml --profile tools up -d pgadmin redisinsight
```

- pgAdmin: `http://localhost:5050`
- Redis Insight: `http://localhost:5540`

For browser preview of the mobile app:

```powershell
npm --prefix apps/mobile run web
```

## Current Stack

- Mobile: React Native, Expo SDK 55, Expo Router, React Navigation packages.
- API: Node.js, Express, TypeScript, Prisma.
- Data: PostgreSQL, Redis.
- Payments: Paystack hosted checkout first, Ozow planned for instant EFT specialization.
- Cloud target: AWS with ECS/RDS/S3/CloudFront, Cloudflare DNS/security.

See [docs/tech-stack.md](docs/tech-stack.md), [docs/backend-readiness.md](docs/backend-readiness.md), and [docs/implementation-roadmap.md](docs/implementation-roadmap.md).
