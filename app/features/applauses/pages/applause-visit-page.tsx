import { redirect } from "react-router";
import type { Route } from "./+types/applause-visit-page";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const { error, data } = await client
    .from("applauses")
    .select("url")
    .eq("applause_id", Number(params.applauseId))
    .single();
  if (data) {
    const { error: trackEventError } = await client.rpc("track_event", {
      event_type: "applause_visit",
      event_data: {
        applause_id: params.applauseId,
      },
    });
    if (trackEventError) {
      throw trackEventError;
    }
    return redirect(data.url);
  }
};
