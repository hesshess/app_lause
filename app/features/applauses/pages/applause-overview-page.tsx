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

export default function ApplauseOverviewPage({
  params: { applauseId },
}: Route.ComponentProps) {
  return (
      <div className="space-y-5">
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
          <h3 className="text-lg font-bold">
            How did it make the world a little better?
          </h3>
          <p className="text-mmuted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis nulla minima autem, alias sequi tempore deserunt vel
            rerum ut maiores? Fugit commodi, alias natus harum adipisci et
            neque. Porro, voluptates.
          </p>
        </div>
      </div>
  );
}
