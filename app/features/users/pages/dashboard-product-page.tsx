import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/dashboard-product-page";

export function loader({ params }: Route.LoaderArgs) {
  return { productId: params.productId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Product ${params.productId} | app_lause` },
    { name: "description", content: "Review a dashboard item" },
  ];
};

export default function DashboardProductPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Dashboard Item
        </h1>
        <p className="text-muted-foreground">
          You are viewing item <strong>{loaderData.productId}</strong>.
        </p>
        <p className="text-lg leading-7">
          Use this page to review the details, progress, and next steps for one
          of your growth items.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to="/my/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
