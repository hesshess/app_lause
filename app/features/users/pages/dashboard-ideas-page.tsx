import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/dashboard-ideas-page";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { getClaimedIdeas } from "~/features/ideas/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Ideas | app_lause" },
    { name: "description", content: "Review your saved growth ideas" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id}
            title={idea.title}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
