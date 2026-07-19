# Production Case Study: Stabilizing React Router SSR on Vercel

## Summary

Moving app-lause from local development to Vercel exposed failures at three different boundaries: build output, serverless startup, and environment-specific authentication. The most important incident was a production function failure caused by a browser-only payment SDK entering the server bundle.

I traced the failures through build output and Vercel runtime logs, separated browser code from the server startup path, made OAuth redirects environment-aware, and added monitoring that reports actionable failures without treating expected `404` traffic as an application incident.

| Area | Stack |
| --- | --- |
| Application | React 19, React Router 7 SSR, TypeScript |
| Data and authentication | Supabase, PostgreSQL |
| Infrastructure | Vercel, Cloudflare |
| Integrations | Toss Payments SDK, Sentry |

## Context

app-lause uses React Router route modules for both UI rendering and server loaders/actions. Vercel packages those modules for a Node.js serverless runtime, so every module reachable from a route can affect server startup—even when part of that route is intended only for the browser.

The application worked locally, but the first production deployment surfaced a sequence of issues:

- The deployment adapter needed the Vite manifest to remain available in the build output.
- An incorrect React Email package import blocked a production build.
- The serverless function could fail at startup even after a successful build.
- Social login redirected users to a hardcoded localhost callback.

This made the key debugging question: **did the failure happen while building, while starting the server runtime, or after handling a request?**

## Investigation

I used the production build output to resolve compilation and packaging problems first. Once the build completed, I used Vercel runtime logs to investigate `FUNCTION_INVOCATION_FAILED` separately instead of treating it as another build error.

Tracing the route import graph led to the applause promotion page. It imported the Toss Payments browser SDK at module scope. Because React Router also includes route modules in the SSR build, Node.js could evaluate that dependency before the page reached a browser.

The production review also uncovered a separate environment bug in social authentication: the OAuth callback URL was fixed to `http://localhost:5173`, so the same code could not complete login on the deployed domain.

## Solution

### 1. Keep browser-only code out of server startup

The runtime import was changed to a type-only module import plus a dynamic SDK import inside `useEffect`.

```tsx
import type { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

useEffect(() => {
  const initToss = async () => {
    const { loadTossPayments } = await import(
      "@tosspayments/tosspayments-sdk"
    );

    const toss = await loadTossPayments(
      import.meta.env.VITE_TOSS_CLIENT_KEY!,
    );

    // Initialize the browser widget here.
  };

  initToss();
}, []);
```

This preserves TypeScript support while ensuring the executable SDK is loaded only after the component mounts in a browser. See the current [promotion route](../app/features/applauses/pages/promote-page.tsx).

### 2. Generate OAuth callbacks from the request origin

The callback now uses the incoming request origin rather than a localhost constant.

```ts
const baseUrl = new URL(request.url);
const redirectTo = `${baseUrl.origin}/auth/social/${provider}/complete`;
```

The same route can now initiate authentication in local and deployed environments. See the current [social authentication route](../app/features/auth/pages/social-start-page.tsx).

### 3. Make the deployment output explicit

The Vite configuration preserves the manifest required by the deployment workflow.

```ts
build: {
  manifest: true,
},
```

This makes the production build artifact predictable for the Vercel React Router adapter. See [vite.config.ts](../vite.config.ts).

### 4. Report actionable failures

Sentry was added to the browser and server runtime paths. The root error boundary reports unexpected exceptions and `500+` route failures while leaving expected `404`, `401`, and `403` responses out of high-severity monitoring.

This keeps automated probe traffic, such as requests for WordPress admin paths, from overwhelming the errors that need investigation. See the [root error boundary](../app/root.tsx).

## Outcome

- The SSR bundle no longer evaluates the payment SDK during server startup.
- Production OAuth callbacks adapt to the active application origin.
- Build artifacts explicitly include the Vite manifest needed by the deployment flow.
- Client and server failures are observable without reporting every expected route miss.
- The repository now includes a repeatable [production verification checklist](./PRODUCTION_NOTES.md#verification-checklist).

No performance percentage or incident-rate claim is included because production traffic was not measured at a scale that would make those numbers meaningful.

## What I Learned

1. **A successful build does not prove that an SSR runtime can start.** Build logs and runtime logs answer different questions.
2. **Route modules are part of the server dependency graph.** Browser-only packages need explicit client boundaries.
3. **Environment assumptions should come from the request or configuration.** Hardcoded local URLs fail as soon as the application is deployed.
4. **Monitoring needs a signal strategy.** Capturing every expected error can make real failures harder to find.

## Next Improvements

- Add a post-deployment smoke test for the homepage, authentication start, and promotion page.
- Add automated checks that start the built server bundle, not only `npm run build`.
- Track Sentry releases and source maps in CI with a deployment-scoped auth token.
- Add integration coverage for OAuth callback generation across approved environments.
