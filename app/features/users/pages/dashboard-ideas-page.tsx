import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/dashboard-ideas-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "My Ideas | app_lause" },
    { name: "description", content: "Review your saved growth ideas" },
  ];
};

export default function DashboardIdeasPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Saved Ideas</h1>
        <p className="text-muted-foreground">
          Keep track of ideas you want to turn into habits, routines, or
          challenges.
        </p>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`idea-${index}`} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Build a reflection routine</h2>
            <p className="text-muted-foreground">
              Save 10 minutes each evening to review what worked, what changed,
              and what to try tomorrow.
            </p>
          </div>
        ))}
      </div>
      <Button asChild variant="outline">
        <Link to="/ideas">Explore more ideas</Link>
      </Button>
    </div>
  );
}
