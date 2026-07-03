import type { Route } from "./+types/upvote-applause-page";
import { toggleApplauseUpvote } from "../mutations";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  await toggleApplauseUpvote(client, {
    applauseId: params.applauseId,
    userId,
  });
  return {
    ok: true,
  };
};
