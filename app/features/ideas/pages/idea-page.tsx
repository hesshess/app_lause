import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `IdeasGPT | app_lause` },
    { name: "description", content: "Find ideas for your next growth goal" },
  ];
};

export default function IdeaPage({ params: { ideaId } }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea : ${ideaId}`} />
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          Start a 14-day focus sprint where you choose one habit that matters,
          track it daily, write a short reflection at night, and review your
          progress at the end of each week to see what actually helps you stay
          consistent.
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
        <Button size="lg">Try this idea &rarr;</Button>
      </div>
    </div>
  );
}
