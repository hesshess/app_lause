import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "hess-wang",
  project: "app-lause",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};

const shouldUploadSentrySourceMaps =
  Boolean(process.env.SENTRY_AUTH_TOKEN) &&
  process.env.VERCEL === "1" &&
  process.env.GITHUB_ACTIONS !== "true";

export default defineConfig((config) => {
  return {
    build: {
      manifest: true,
    },
    server: {
      allowedHosts: ["antiques-celebrities-falls-mom.trycloudflare.com"],
    },
    plugins: [
      reactRouter(),
      tailwindcss(),
      tsconfigPaths(),
      ...(shouldUploadSentrySourceMaps
        ? [sentryReactRouter(sentryConfig, config)]
        : []),
    ],
  };
});
