import { redirect } from "react-router";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import {
  getSocialAuthCallbackUrl,
  oauthProviderSchema,
} from "~/features/auth/utils";
import type { Route } from "./+types/social-start-page";

const paramsSchema = z.object({
  provider: oauthProviderSchema,
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const { provider } = data;
  const redirectTo = getSocialAuthCallbackUrl(request.url, provider);
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
  if (url) {
    return redirect(url, { headers });
  }
  if (error) {
    throw error;
  }
};
