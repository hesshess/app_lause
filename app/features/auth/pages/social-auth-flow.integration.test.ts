import { beforeEach, describe, expect, it, vi } from "vitest";

const authMocks = vi.hoisted(() => ({
  exchangeCodeForSession: vi.fn(),
  makeSSRClient: vi.fn(),
  signInWithOAuth: vi.fn(),
}));

vi.mock("~/supa-client", () => ({
  makeSSRClient: authMocks.makeSSRClient,
}));

import { loader as completeSocialAuth } from "./social-complete-page";
import { loader as startSocialAuth } from "./social-start-page";

const sessionCookie = "sb-session=test-session; Path=/; HttpOnly";

describe("social authentication route flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    authMocks.makeSSRClient.mockImplementation(() => ({
      client: {
        auth: {
          exchangeCodeForSession: authMocks.exchangeCodeForSession,
          signInWithOAuth: authMocks.signInWithOAuth,
        },
      },
      headers: new Headers({ "Set-Cookie": sessionCookie }),
    }));
  });

  it("starts OAuth with the current origin and forwards session headers", async () => {
    const providerUrl = "https://github.com/login/oauth/authorize?client_id=test";
    authMocks.signInWithOAuth.mockResolvedValue({
      data: { url: providerUrl },
      error: null,
    });

    const response = await startSocialAuth({
      params: { provider: "github" },
      request: new Request("https://app-lause.xyz/auth/social/github"),
    } as Parameters<typeof startSocialAuth>[0]);

    expect(authMocks.signInWithOAuth).toHaveBeenCalledWith({
      provider: "github",
      options: {
        redirectTo:
          "https://app-lause.xyz/auth/social/github/complete",
      },
    });
    expect(response).toBeInstanceOf(Response);
    expect(response?.status).toBe(302);
    expect(response?.headers.get("Location")).toBe(providerUrl);
    expect(response?.headers.get("Set-Cookie")).toBe(sessionCookie);
  });

  it("exchanges the callback code and returns the user to the homepage", async () => {
    authMocks.exchangeCodeForSession.mockResolvedValue({ error: null });

    const response = await completeSocialAuth({
      params: { provider: "github" },
      request: new Request(
        "https://app-lause.xyz/auth/social/github/complete?code=oauth-code",
      ),
    } as Parameters<typeof completeSocialAuth>[0]);

    expect(authMocks.exchangeCodeForSession).toHaveBeenCalledWith("oauth-code");
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/");
    expect(response.headers.get("Set-Cookie")).toBe(sessionCookie);
  });

  it("returns invalid providers and callbacks to login before Supabase runs", async () => {
    const invalidProviderResponse = await startSocialAuth({
      params: { provider: "linkedin" },
      request: new Request("https://app-lause.xyz/auth/social/linkedin"),
    } as Parameters<typeof startSocialAuth>[0]);
    const missingCodeResponse = await completeSocialAuth({
      params: { provider: "github" },
      request: new Request(
        "https://app-lause.xyz/auth/social/github/complete",
      ),
    } as Parameters<typeof completeSocialAuth>[0]);

    expect(invalidProviderResponse?.headers.get("Location")).toBe(
      "/auth/login",
    );
    expect(missingCodeResponse.headers.get("Location")).toBe("/auth/login");
    expect(authMocks.makeSSRClient).not.toHaveBeenCalled();
  });
});
