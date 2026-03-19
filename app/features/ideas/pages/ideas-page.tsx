import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | app_lause" },
    { name: "description", content: "Find ideas for your next good deed" },
  ];
};

export default function IdeasPage() {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" description="Find ideas for your next good deed" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="Start a monthly “Cook & Care” initiative where neighbors prepare extra home-cooked meals together at a local community center and deliver them to elderly residents living alone. Volunteers can sign up for cooking, packaging, or delivery roles. Along with each meal, include a handwritten note of encouragement."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      
    </div>
  );
}
