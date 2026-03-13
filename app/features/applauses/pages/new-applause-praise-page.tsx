import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import type { Route } from "./+types/new-applause-praise-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `New Praise for ${params.applauseId} | app_lause` },
    { name: "description", content: "Create a praise for an applause" },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  return { applauseId: params.applauseId };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  return { message: formData.get("message")?.toString() ?? "" };
}

export default function NewApplausePraisePage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Add Praise"
        description={`Write a praise for applause ${loaderData.applauseId}`}
      />
      <Form method="post" className="mx-auto flex max-w-2xl flex-col gap-4">
        <Textarea
          name="message"
          placeholder="Share what makes this applause worth celebrating"
          rows={6}
        />
        <Button type="submit">Submit praise</Button>
      </Form>
    </div>
  );
}
