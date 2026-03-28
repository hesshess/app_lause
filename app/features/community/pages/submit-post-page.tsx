import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-post-page";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Post | app_lause" },
    { name: "description", content: "Share a story, action, or reflection with the community" },
  ];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Share Your Story"
        description="Share an action, reflection, or small change that mattered to you"
      />

      <Form className="mx-auto flex max-w-3xl flex-col gap-10">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="(40 characters or less)"
          required
          placeholder="i.e I started walking every morning for 7 days"
        />

        <SelectPair
          required
          name="category"
          label="Category"
          description="Select the category that best fits your post"
          placeholder="i.e Self Growth"
          options={[
            { label: "Self Growth", value: "self-growth" },
            { label: "Wellness", value: "wellness" },
            { label: "Mindset", value: "mindset" },
            { label: "Routine", value: "routine" },
            { label: "Reflection", value: "reflection" },
          ]}
        />

        <InputPair
          label="Content"
          name="content"
          id="content"
          description="(1000 characters or less)"
          required
          placeholder="i.e For the past week, I tried taking a short walk every morning before checking my phone. It felt like a small action, but it changed the way I started my day."
          textArea
        />

        <Button className="mx-auto">Share Post</Button>
      </Form>
    </div>
  );
}