import { redirect } from "react-router";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/social-start-page";

const paramsSchema = z.object({
  provider: z.enum(["github", "kakao", "google"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const { provider } = data;
  const base_url = new URL(request.url);
  const redirectTo = `${base_url.origin}/auth/social/${provider}/complete`;
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
