import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-post-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  return {
    title: formData.get("title")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
  };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | app_lause" },
    { name: "description", content: "Create a new community post" },
  ];
};

export default function SubmitPostPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Start a Discussion"
        description="Share a question, story, or update with the community."
      />
      <Form className="mx-auto flex max-w-3xl flex-col gap-6">
        <InputPair
          id="title"
          label="Title"
          description="Give your post a short, clear title"
          name="title"
          required
          type="text"
          placeholder="i.e How do you organize neighborhood cleanups?"
        />
        <InputPair
          id="content"
          label="Content"
          description="Write the details you want the community to see"
          name="content"
          required
          type="text"
          textArea
          placeholder="Share enough context so others can respond helpfully."
        />
        <Button type="submit" className="w-full max-w-sm self-center">
          Publish post
        </Button>
      </Form>
    </div>
  );
}
