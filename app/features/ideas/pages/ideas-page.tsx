import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | app_lause" },
    { name: "description", content: "Find ideas for your next growth goal" },
  ];
};

export const loader = async () => {
  const ideas = await getGptIdeas({ limit: 20 });
  return { ideas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="IdeasGPT"
        description="Find ideas for your next growth goal"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id}
            title={idea.title}
            viewsCount={idea.views_count}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
