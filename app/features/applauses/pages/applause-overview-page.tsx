import { ChevronUpIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Link, useOutletContext } from "react-router";
import type { Route } from "./+types/applause-overview-page";
import client from "~/supa-client";

export const loader = async ({ params }: Route.LoaderArgs) => {
  await client.rpc("track_event", {
    event_type: "applause_view",
    event_data: {
      applause_id: params.applauseId,
    },
  });
  return null;
};

export default function ApplauseOverviewPage() {
  const { description, tagline } = useOutletContext<{
    description: string;
    tagline: string;
  }>();
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">
          What action or habit are you sharing?
        </h3>
        <p className="text-muted-foreground">{tagline}</p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How did it help you grow?</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
