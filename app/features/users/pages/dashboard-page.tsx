import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/dashboard-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Dashboard | app_lause" },
    { name: "description", content: "Track your self-growth progress" },
  ];
};

export default function DashboardPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Review your actions, ideas, teams, and growth momentum in one place.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Actions shared", value: 12 },
          { label: "Challenges joined", value: 4 },
          { label: "Growth teams", value: 2 },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <Button asChild>
        <Link to="/my/dashboard/ideas">View saved ideas</Link>
      </Button>
    </div>
  );
}
