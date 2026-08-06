import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

import { sentryOnBuildEnd } from "@sentry/react-router";

const shouldUploadSentrySourceMaps =
  Boolean(process.env.SENTRY_AUTH_TOKEN) &&
  process.env.VERCEL === "1" &&
  process.env.GITHUB_ACTIONS !== "true";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  presets: [vercelPreset()],
  buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
    if (!shouldUploadSentrySourceMaps) return;

    await sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest });
  },
} satisfies Config;
