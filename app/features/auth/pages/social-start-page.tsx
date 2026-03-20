import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/social-start-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.provider} Login | app_lause` },
    {
      name: "description",
      content: `Start ${params.provider} social authentication`,
    },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  return { provider: params.provider };
}

export async function action({ params }: Route.ActionArgs) {
  return { provider: params.provider };
}

export default function SocialStartPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight capitalize">
          Continue with {loaderData.provider}
        </h1>
        <p className="text-muted-foreground">
          Start the social login flow for {loaderData.provider}.
        </p>
      </div>
      <Form method="post">
        <Button type="submit" className="w-full capitalize">
          Continue with {loaderData.provider}
        </Button>
      </Form>
    </div>
  );
}
