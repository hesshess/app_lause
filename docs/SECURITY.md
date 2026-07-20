# Security Notes

This document summarizes security-related practices and review points for app-lause.

## Security Goals

- Keep secrets out of source control.
- Use Supabase row-level security and policies for data protection.
- Avoid exposing server stack traces to users in production.
- Reduce noisy bot traffic and expected route misses in monitoring.
- Keep browser-only integrations out of server startup paths.
- Treat production observability as part of the security posture.

## Secrets And Environment Variables

Secrets must be configured through the hosting provider or local `.env` files and should not be committed.

Sensitive variables include:

```text
DATABASE_URL
SUPABASE_SERVICE_ROLE_KEY
OPENAI_API_KEY
SENTRY_AUTH_TOKEN
HEADER_SECRET_KEY
HEADER_SECRET_VAL
```

Public browser variables must still be reviewed carefully. `VITE_*` variables are exposed to the client bundle and should only contain values that are safe to publish.

Examples of expected public variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_TOSS_CLIENT_KEY
```

## Supabase Access Model

The app uses separate Supabase access patterns:

- Browser client for client-safe operations.
- SSR client for authenticated server requests with cookie handling.
- Service-role admin client for server-only privileged operations.

The service-role key must never be exposed to browser code.

## Row-Level Security

SQL security policies are stored in:

```text
app/sql/security/policies.sql
```

Security review should confirm that table access is controlled by Supabase RLS policies and that user-owned data cannot be read or modified by unrelated users.

## Error Handling Policy

Production error handling should avoid leaking sensitive information.

Current approach:

- User-facing production errors are generic.
- Detailed stack traces are shown only in development.
- Expected `404` errors are not sent to Sentry.
- Server-grade route errors are sent to Sentry.
- Vercel runtime logging is enabled for early production debugging.

## Sentry Data Collection

Sentry helps identify production failures, but captured data must be reviewed carefully. The public demo keeps error reporting enabled while disabling default PII, user information, HTTP bodies, and Session Replay.

Current controls:

- Do not intentionally log access tokens, session cookies, passwords, or service keys.
- Keep default PII and user information disabled.
- Keep HTTP request and response body collection disabled.
- Keep Session Replay disabled unless its masking behavior is tested for this application.
- Keep `SENTRY_AUTH_TOKEN` as a server/build environment variable only.

## Public Demo Side Effects

Public routes should be safe to visit repeatedly and should not trigger external writes through a `GET` loader. The previous unauthenticated welcome-email route was removed from the public runtime. Any future email flow must use an authenticated, validated action with appropriate abuse controls.

## OAuth Security

OAuth redirects are generated from request origin to support local and production environments without hardcoded localhost values.

Review points:

- Supabase redirect allowlist should include only expected local and production callback URLs.
- Provider dashboards should use the Supabase auth callback URL.
- Production custom domains should use HTTPS.

## Bot And Probe Traffic

Automated requests for paths such as `/wp-admin/install.php` are common on public domains.

Recommended handling:

- Treat them as expected internet background noise unless there is evidence of successful access.
- Return safe `404` responses for unknown routes.
- Avoid sending expected probe traffic to Sentry as high-severity application errors.
- Use Cloudflare firewall rules for obvious malicious or abusive patterns.

## Payment Prototype Review

The current applause promotion checkout is an integration prototype and is not considered production-ready payment infrastructure. The public demo uses the provider's anonymous customer value to render the browser widget and calculate a preview amount, but it does not request or confirm a payment.

Review points:

- Client keys may be public if designed by the provider for browser usage.
- Public demo code must not contain or transmit personal customer details.
- Payment request and confirmation remain disabled until the server can validate authoritative order data.
- Secret payment keys must stay server-side.
- Order ownership, amount, currency, and promotion details must be validated from server-authoritative data.
- Payment confirmation must be idempotent and persisted before access or promotion is granted.
- Provider webhooks, failure recovery, cancellation, and refunds require explicit handling.
- Payment metadata should not include sensitive personal data.
- Live payment processing requires integration tests and a dedicated security review.

## Production Checklist

Before deploying major changes, review:

- No secrets are committed.
- Required Vercel environment variables are configured.
- Supabase RLS policies match the intended access model.
- Sentry does not capture sensitive request data intentionally.
- OAuth redirect URLs are scoped to known local and production domains.
- Browser-only SDKs are not imported at server module startup.
- Cloudflare firewall rules do not block legitimate users.
