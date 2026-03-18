import { Form } from "react-router";
import type { Route } from "./+types/submit-donations-page";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Donation | app_lause" },
    { name: "description", content: "Create a new donation campaign" },
  ];
};

export default function SubmitDonationsPage(_props: Route.ComponentProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Submit Donation</h1>
        <p className="text-muted-foreground">
          Share a donation campaign so others can support the cause.
        </p>
      </div>
      <Form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Campaign title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            name="organization"
            placeholder="Organization name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goal">Goal</Label>
          <Input id="goal" name="goal" placeholder="$10,000" />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
