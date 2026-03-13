import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import type { Route } from "./+types/applause-overview-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Applause ${params.applauseId} Overview | app_lause` },
    {
      name: "description",
      content: "Overview applause details and information",
    },
  ];
};

export default function ApplauseOverviewPage({params:{applauseId},}:Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold">Applause Title</h1>
            <p className="text-2xl text-light">Apㅔlause Description</p>
            <div className="mt-5 flex items-center gap-2 ">
              <div className="flex text-violet-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon className="size-4" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-5 ">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10">
            Visit Website
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote(100)
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to={`/applauses/${applauseId}/overview`}>Overview</Link> </Button>
        <Button variant="outline" asChild>
          <Link to={`/applauses/${applauseId}/praises`}>Praises</Link> </Button>
      </div>
      <div className="space-y-5" >
        <div className="space-y-1">
          <h3 className="text-lg font-bold">What good deed did you do?</h3>
          <p className="text-mmuted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis nulla minima autem, alias sequi tempore deserunt vel
            rerum ut maiores? Fugit commodi, alias natus harum adipisci et
            neque. Porro, voluptates.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">How did it make the world a little better?</h3>
          <p className="text-mmuted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis nulla minima autem, alias sequi tempore deserunt vel
            rerum ut maiores? Fugit commodi, alias natus harum adipisci et
            neque. Porro, voluptates.
          </p>
        </div>
      </div>
    </div>
  );
}
