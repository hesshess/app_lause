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
RESEND_API_KEY
SENTRY_AUTH_TOKEN
TOSS_SECURITY_KEY
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

Sentry helps identify production failures, but captured data must be reviewed carefully.

Review points:

- Do not intentionally log access tokens, session cookies, passwords, or service keys.
- Review whether user information or request bodies should be disabled in Sentry data collection.
- Keep `SENTRY_AUTH_TOKEN` as a server/build environment variable only.
- Review Session Replay sampling before relying on it in production.

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

## Payment Integration

Payment SDKs should be loaded only where needed and should avoid server startup paths when they are browser-oriented.

Review points:

- Client keys may be public if designed by the provider for browser usage.
- Secret payment keys must stay server-side.
- Payment confirmation should be validated server-side.
- Payment metadata should not include sensitive personal data.

## Production Checklist

Before deploying major changes, review:

- No secrets are committed.
- Required Vercel environment variables are configured.
- Supabase RLS policies match the intended access model.
- Sentry does not capture sensitive request data intentionally.
- OAuth redirect URLs are scoped to known local and production domains.
- Browser-only SDKs are not imported at server module startup.
- Cloudflare firewall rules do not block legitimate users.
