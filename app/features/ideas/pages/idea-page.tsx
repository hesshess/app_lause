import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `IdeasGPT | app_lause` },
    { name: "description", content: "Find ideas for your next good deed" },
  ];
};

export default function IdeaPage({ params: { ideaId } }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea : ${ideaId}`} />
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          Start a monthly “Cook & Care” initiative where neighbors prepare extra
          home-cooked meals together at a local community center and deliver
          them to elderly residents living alone. Volunteers can sign up for
          cooking, packaging, or delivery roles. Along with each meal, include a
          handwritten note of encouragement.
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon />
            <span>123</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span>12 hours ago</span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>45</span>
          </Button>
        </div>
        <Button size="lg">Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
