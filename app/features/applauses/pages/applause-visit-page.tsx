import client from "~/supa-client";
import { redirect } from "react-router";
import type { Route } from "./+types/applause-visit-page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { error, data } = await client
    .from("applauses")
    .select("url")
    .eq("applause_id", Number(params.applauseId))
    .single();
  if (data) {
    await client.rpc("track_event", {
      event_type: "applause_visit",
      event_data: {
        applause_id: params.applauseId,
      },
    });
    return redirect(data.url);
  }
};