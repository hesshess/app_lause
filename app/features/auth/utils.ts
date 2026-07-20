import z from "zod";

export const oauthProviderSchema = z.enum(["github", "kakao", "google"]);

export type OAuthProvider = z.infer<typeof oauthProviderSchema>;

export function getSocialAuthCallbackUrl(
  requestUrl: string,
  provider: OAuthProvider,
) {
  const requestOrigin = new URL(requestUrl).origin;
  return `${requestOrigin}/auth/social/${provider}/complete`;
}
