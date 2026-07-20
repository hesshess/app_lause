# app-lause

**A full-stack social growth platform for turning personal progress into shared momentum.**

[Live Demo](https://app-lause.xyz) · [GitHub Repository](https://github.com/hesshess/app_lause)

app-lause lets people share personal-growth actions, receive encouragement from the community, join challenges, and discover AI-generated ideas for building better habits.

I built this production-oriented portfolio project to demonstrate end-to-end product development: responsive interfaces, server-rendered React, authenticated data flows, relational database design, third-party integrations, deployment, and monitoring.

## Highlights

- Full-stack TypeScript application with React Router server rendering, loaders, and actions
- Email OTP and social OAuth authentication backed by Supabase
- Community features supported by PostgreSQL views, policies, triggers, and typed queries
- Responsive, accessible UI built with Tailwind CSS and Shadcn-style components
- Production deployment on Vercel with Sentry monitoring and Cloudflare configuration

## Engineering Case Study

[Read how I diagnosed and stabilized the React Router SSR deployment on Vercel.](docs/PRODUCTION_CASE_STUDY.md)

## Product Overview

app-lause helps users turn personal progress into visible, community-supported actions.

Core user flows include:

- Create and browse applauses for personal growth actions
- View daily, weekly, monthly, and yearly leaderboards
- Join community discussions around progress and reflection
- Discover AI-generated personal-growth ideas
- Create and browse challenges and accountability teams
- Sign in with email OTP or social OAuth providers
- Preview an applause promotion flow with a Toss Payments checkout prototype
- Manage user profile, notifications, messages, and dashboard pages

## Tech Stack

- React 19 and React Router 7 for SSR routing, loaders, actions, and route modules
- TypeScript for application code and generated route types
- Supabase for authentication, database access, SQL views, policies, triggers, and typed clients
- PostgreSQL and Drizzle tooling for database workflow
- Tailwind CSS and Shadcn-style UI components for styling
- OpenAI for structured personal-growth idea generation
- Toss Payments SDK for a client-side checkout integration prototype
- Sentry for client/server error monitoring
- Vercel for production deployment
- Cloudflare for DNS, proxying, SSL, and firewall configuration

## Payment Prototype Scope

The applause promotion flow is a technical prototype, not a production commerce feature. The public demo renders the client-side payment widget and calculates promotion-period pricing, but it does not initiate or confirm a payment.

It is not presented as accepting live customer payments. A production release would require server-authoritative order and price validation, persistent payment state, idempotent confirmation, webhook reconciliation, failure and refund handling, security review, and automated integration tests.

## Architecture Highlights

[View the system diagram and detailed runtime boundaries.](docs/ARCHITECTURE.md)

### React Router SSR

The app uses React Router route modules with server loaders and actions for data loading, mutations, authentication callbacks, and redirects. Routes are organized by feature area under `app/features`.

### Feature-Based Structure

```text
app/
├── common/          # Shared UI, navigation, homepage, reusable form fields
├── features/        # Domain features such as applauses, auth, community, ideas, teams
├── lib/             # Shared utilities such as datetime configuration
├── sql/             # SQL functions, migrations, policies, triggers, and views
├── root.tsx         # Root layout, loader, and error boundary
└── routes.ts        # Route configuration
```

### Supabase Integration

The project uses Supabase SSR clients for authenticated server requests and typed database access. SQL assets are kept in the repository to document the backend model, including policies, triggers, views, and functions.

### Error Monitoring

Sentry is integrated on both client and server entry points. Root error handling separates expected route errors from server failures to reduce monitoring noise.

Current error handling strategy:

- Ignore expected `404` route misses from Sentry reporting
- Report `500+` route errors
- Report unexpected JavaScript errors in production
- Keep detailed stack traces visible only in development
- Keep Vercel runtime logging enabled during early production monitoring

### Production Runtime Safety

The project includes fixes and patterns for production deployment issues encountered during SSR builds and serverless runtime execution, including:

- Avoiding browser-only SDK imports in the server startup path
- Using request-origin-based OAuth redirects instead of hardcoded localhost URLs
- Centralizing application timezone and locale settings
- Preserving Vite build manifest output for Vercel React Router deployments

## Key Engineering Decisions

### Environment-Aware OAuth Redirects

Social login callbacks use the current request origin so the same code works locally and in production.

```ts
const baseUrl = new URL(request.url);
const redirectTo = `${baseUrl.origin}/auth/social/${provider}/complete`;
```

### SSR-Safe Third-Party SDK Loading

The browser-only SDK used by the payment prototype is loaded from a client-side effect instead of being imported into the server bundle at module startup.

### Centralized Datetime Configuration

Datetime locale and timezone are configured in one shared module so leaderboard calculations and formatting are easier to reason about.

### Monitoring Noise Reduction

The root error boundary only reports server-grade route failures to Sentry, avoiding expected client errors and bot-driven 404 noise.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run type checks:

```bash
npm run typecheck
```

Run automated tests once:

```bash
npm run test:run
```

Run tests in watch mode while developing:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Environment Variables

The app expects environment variables for Supabase, OpenAI, Sentry, the Toss Payments client widget, and database access.

Common variables include:

```text
DATABASE_URL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
OPENAI_API_KEY
SENTRY_AUTH_TOKEN
VITE_TOSS_CLIENT_KEY
HEADER_SECRET_KEY
HEADER_SECRET_VAL
```

Secrets should be configured through the hosting provider and never committed to the repository.

## Deployment Notes

Production deployment is handled through Vercel from the `main` branch. The custom domain is configured through Cloudflare, with Cloudflare managing DNS/proxy behavior, SSL, and firewall rules.

After changing environment variables in Vercel, a new production deployment is required for the changes to take effect.

## What This Project Demonstrates

- Full-stack TypeScript development with React Router SSR
- Server loaders/actions and authenticated data flows
- Supabase-backed relational application design
- OAuth and OTP authentication patterns
- Production debugging with Vercel runtime logs and Sentry
- Monitoring design that avoids noisy expected errors
- SSR-safe loading of a browser-only third-party SDK
- Practical deployment and DNS/security operations
- Feature-based application organization suitable for scaling
