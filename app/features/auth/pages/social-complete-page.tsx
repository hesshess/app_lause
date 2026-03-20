import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/social-complete-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.provider} Complete | app_lause` },
    {
      name: "description",
      content: `Complete ${params.provider} social authentication`,
    },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  return { provider: params.provider };
}

export async function action({ params }: Route.ActionArgs) {
  return { provider: params.provider };
}

export default function SocialCompletePage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight capitalize">
          {loaderData.provider} connected
        </h1>
        <p className="text-muted-foreground">
          The social sign-in flow for {loaderData.provider} is ready for the next
          step.
        </p>
      </div>
      <Button asChild className="w-full">
        <Link to="/auth/login">Back to login</Link>
      </Button>
    </div>
  );
}
