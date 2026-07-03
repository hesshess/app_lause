import { ChevronUpIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { data, Link, useOutletContext } from "react-router";
import type { Route } from "./+types/applause-overview-page";
import { makeSSRClient } from "~/supa-client";

const VIEW_COOKIE_MAX_AGE = 60 * 30;

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const cookieName = `applause_view_${params.applauseId}`;
  const hasRecentView = request.headers
    .get("Cookie")
    ?.split(";")
    .some((cookie) => cookie.trim().startsWith(`${cookieName}=`));

  if (!hasRecentView) {
    await client.rpc("track_event", {
      event_type: "applause_view",
      event_data: {
        applause_id: params.applauseId,
      },
    });
    headers.append(
      "Set-Cookie",
      `${cookieName}=1; Path=/; Max-Age=${VIEW_COOKIE_MAX_AGE}; SameSite=Lax`,
    );
  }

  return data(null, { headers });
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
