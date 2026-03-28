import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/team-page";

export function loader({ params }: Route.LoaderArgs) {
  return { teamId: params.teamId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Team ${params.teamId} | app_lause` },
    { name: "description", content: "View a volunteer team" },
  ];
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Team Profile</h1>
        <p className="text-muted-foreground">
          You are viewing team <strong>{loaderData.teamId}</strong>.
        </p>
        <p className="text-lg leading-7 text-foreground">
          This route is ready for team details, member information, and joining
          actions.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to="/teams">Back to teams</Link>
      </Button>
    </div>
  );
}
