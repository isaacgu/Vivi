# Evivi Tech Stack

This is the first assembled stack pass, based on `Evivi_Tech_Stack_v2_Mobile (1).docx` and validated against current public docs on 2026-06-01 where the choice could affect setup.

## Build Direction

Evivi starts as a native mobile marketplace with a TypeScript-first codebase:

- Android and iOS via Expo + React Native.
- REST API via Node.js + Express for MVP speed.
- PostgreSQL for marketplace data and Prisma for typed migrations.
- Redis for rate limiting, hot data, queues, and session-adjacent workflows.
- SA-first payments with Paystack hosted checkout first, then Ozow for dedicated instant EFT.

## Stack Table

| Area | Starting choice | Notes |
| --- | --- | --- |
| Mobile | React Native + Expo SDK 55 | Expo template is scaffolded in `apps/mobile`. |
| Navigation | Expo Router + React Navigation packages | Expo Router sits on React Navigation and keeps routing simple. |
| Styling | React Native StyleSheet first; NativeWind later | Keep the MVP lean until the design system settles. |
| State | Zustand | Add when cross-screen state is needed. |
| API client | Axios | Add once the API contract stabilizes. |
| Backend | Node.js + Express + TypeScript | Express selected over NestJS for MVP speed. |
| API style | REST | Matches the current stack document and keeps mobile integration simple. |
| Database | PostgreSQL | Local service defined in `infra/docker-compose.yml`. |
| ORM | Prisma 7 | Schema lives in `apps/api/prisma/schema.prisma`; datasource config lives in `apps/api/prisma.config.ts`. |
| Cache | Redis | Local service defined in `infra/docker-compose.yml`. |
| Auth | Auth0 or Supabase Auth | Decision intentionally left open until account/vendor flows are clearer. |
| Payments | Paystack checkout + Ozow | Paystack hosted checkout is the safer first mobile integration path because it covers non-card methods through checkout. |
| Media | S3 + CloudFront, Cloudinary later | Start with S3-compatible object boundaries before adding transforms. |
| Monitoring | Sentry + CloudWatch | Add after first deployable API/mobile builds. |
| CI/CD | GitHub Actions + EAS | Add once repo secrets and environments exist. |
| Cloud target | AWS + Cloudflare | AWS target: ECS/RDS/S3/CloudFront; Cloudflare for DNS/security. |

## Source Checks

- Expo's current create-project guide points new non-Expo-Go projects at SDK 56, while also noting SDK 55 for Expo Go device testing during the transition. This scaffold uses SDK 55 because the source stack calls out Expo Go manual QA.
- Expo EAS CLI can be run via `npx eas-cli@latest` or installed globally.
- Paystack docs describe mobile hosted checkout/WebView as an option and note hosted checkout exposes non-card payment methods that SDK-only card flows may not.
- Paystack South Africa pricing should be rechecked before launch; the source document's fee assumptions are not hard-coded here.

## Open Decisions

- Auth provider: choose Auth0 for enterprise/social-auth maturity or Supabase Auth if Evivi wants a tighter Postgres-adjacent platform.
- Marketplace payouts: verify Paystack subaccounts, Ozow payout needs, and whether Stripe Connect is actually required for non-ZAR sellers.
- Hosting mode: start with local Docker, then choose ECS Fargate versus EC2 once traffic and ops budget are clearer.
- Media pipeline: decide whether Cloudinary is needed at MVP or whether S3 object variants are enough initially.
