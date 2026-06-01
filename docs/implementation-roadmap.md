# Implementation Roadmap

## 0. Repo Foundation

- Keep mobile and API under one Git repo.
- Use local Docker for PostgreSQL and Redis.
- Keep environment examples in each app folder.
- Add ADRs for decisions that affect cost, security, or vendor lock-in.

## 1. API Foundation

- Build health/readiness endpoints.
- Finalize Prisma MVP schema for users, vendors, events, gifts, and payments.
- Add request validation with Zod.
- Add Paystack checkout initialization from the server.
- Add webhook verification before accepting real payment events.

## 2. Mobile Foundation

- Replace Expo starter content with Evivi screens and navigation.
- Add API client with environment-based base URL.
- Add secure token storage when auth is selected.
- Add first customer journey: event discovery, gift contribution, payment checkout.

## 3. Auth And Accounts

- Pick Auth0 or Supabase Auth.
- Implement email/password and social login.
- Store mobile tokens with Expo SecureStore.
- Add vendor/admin roles to API authorization.

## 4. Payments

- Start with Paystack hosted checkout for mobile.
- Verify payment status server-side before marking contributions paid.
- Add Ozow once instant EFT requirements are confirmed.
- Add payout/subaccount model after vendor onboarding is defined.

## 5. Deployment

- Add GitHub Actions for API tests/builds.
- Add EAS build profiles for development, preview, and production.
- Add AWS deployment path for API, database, object storage, logs, and secrets.
- Add Cloudflare DNS and SSL routing.
