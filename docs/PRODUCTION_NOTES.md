# Production Notes

This document records production-oriented decisions, deployment behavior, and operational lessons for app-lause.

## Deployment Flow

The app is deployed to Vercel from the `main` branch.

Typical flow:

```text
Merge PR into main
→ GitHub updates main
→ Vercel detects the change
→ Vercel runs the production build
→ Successful deployment serves the custom domain
```

The production custom domain is managed through Cloudflare.

## Hosting And Infrastructure

- Vercel hosts the React Router SSR application.
- Cloudflare manages DNS, proxying, SSL behavior, and firewall rules.
- Supabase provides authentication and database services.
- Sentry collects application errors from client and server runtimes.

## Environment Variables

Production environment variables are configured in Vercel, not committed to the repository.

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

Important operational note: after adding or changing Vercel environment variables, a new production deployment is required before the running app receives those changes.

## Monitoring

Sentry is used for error reporting across both browser and server paths.

Monitoring goals:

- Capture unexpected production failures.
- Keep expected route misses out of error noise.
- Preserve Vercel runtime logs during early production monitoring.
- Avoid exposing stack traces or sensitive details to users in production.

Current root error reporting behavior:

- `404` route misses are not reported.
- `500+` route errors are reported.
- Unexpected JavaScript errors are reported.
- Stack traces are visible only in development.

## Source Maps

The Vite Sentry plugin uploads source maps only during Vercel deployments that provide `SENTRY_AUTH_TOKEN`. Local and GitHub Actions builds skip the upload path.

Operational considerations:

- `SENTRY_AUTH_TOKEN` must be stored as a Vercel environment variable.
- Source map upload requires network access to Sentry during build.
- Sentry removes generated source maps after the deployment upload so they are not served as public build assets.

## OAuth Redirects

Social auth redirects are built from the incoming request origin.

This avoids hardcoded localhost redirects and supports both local and production environments.

Local Supabase redirect URLs should include callback paths such as:

```text
http://localhost:5173/auth/social/github/complete
http://localhost:5173/auth/social/google/complete
http://localhost:5173/auth/social/kakao/complete
```

Production redirect URLs should include callback paths such as:

```text
https://app-lause.xyz/auth/social/github/complete
https://app-lause.xyz/auth/social/google/complete
https://app-lause.xyz/auth/social/kakao/complete
```

Provider dashboards usually point to the Supabase auth callback URL, while Supabase controls the final app redirect allowlist.

## Known Production Lessons

### Browser-Only SDKs Can Crash SSR Startup

A browser-oriented package imported at the top level of a route module can be included in the server bundle. If that package is not compatible with the server runtime, the Vercel serverless function can fail before serving any route.

Preferred pattern:

- Keep type-only imports at module scope when safe.
- Dynamically import browser-only SDKs from client-side effects.

### Runtime Errors Are Not Always Build Errors

A successful `npm run build` does not guarantee that the production serverless runtime will start correctly. Runtime logs are required when Vercel reports `FUNCTION_INVOCATION_FAILED`.

### Bot Probe Requests Are Expected

Requests such as `/wp-admin/install.php` are common automated probes. These should not be treated as successful attacks by default, but the app should still return safe responses and avoid noisy monitoring events.

## Verification Checklist

Before or after deployment, verify:

- `npm run typecheck` passes.
- `npm run build` completes successfully.
- Vercel receives a new deployment from `main`.
- Required production environment variables exist.
- Social auth works for configured providers.
- Sentry receives test errors from the intended runtime.
- Expected `404` traffic does not flood Sentry.
- Cloudflare firewall rules do not block legitimate users.
