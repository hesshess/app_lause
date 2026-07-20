import { describe, expect, it } from "vitest";

import {
  getSocialAuthCallbackUrl,
  type OAuthProvider,
} from "./utils";

describe("getSocialAuthCallbackUrl", () => {
  it.each<OAuthProvider>(["github", "google", "kakao"])(
    "uses the request origin for the %s callback",
    (provider) => {
      const callbackUrl = getSocialAuthCallbackUrl(
        "https://app-lause.xyz/auth/social/start?source=login",
        provider,
      );

      expect(callbackUrl).toBe(
        `https://app-lause.xyz/auth/social/${provider}/complete`,
      );
    },
  );

  it("supports local development origins", () => {
    expect(
      getSocialAuthCallbackUrl(
        "http://localhost:5173/auth/social/github",
        "github",
      ),
    ).toBe("http://localhost:5173/auth/social/github/complete");
  });
});
