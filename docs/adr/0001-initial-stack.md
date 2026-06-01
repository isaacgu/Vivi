# ADR 0001: Initial Mobile Marketplace Stack

Status: Accepted for MVP assembly

Date: 2026-06-01

## Context

Evivi needs a mobile-first stack for Android and iOS users in South Africa, with local payment support, startup-friendly setup cost, and a path to marketplace growth.

## Decision

- Use Expo + React Native for the mobile app.
- Use Node.js + Express + TypeScript for the MVP backend.
- Use PostgreSQL + Prisma for relational marketplace data.
- Use Redis for rate limiting, hot data, and later async workflows.
- Use Paystack hosted checkout as the first payment integration path.
- Keep Auth0 versus Supabase Auth open until auth, vendor, and admin requirements are clearer.

## Consequences

- The team gets a fast mobile loop without maintaining separate native codebases.
- Express keeps the first API small and direct; NestJS can be revisited when module boundaries become painful.
- Hosted checkout keeps sensitive payment handling server-driven and gives better access to non-card payment methods during MVP.
- Some cloud choices remain deferred so local development can start immediately.

## Follow-ups

- Verify current Paystack/Ozow commercial terms before production launch.
- Add payment webhook signature verification before real money flows.
- Add CI/CD once GitHub repo settings and deployment environments exist.
