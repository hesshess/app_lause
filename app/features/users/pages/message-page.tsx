import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/message-page";

export function loader({ params }: Route.LoaderArgs) {
  return { messageId: params.messageId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Message ${params.messageId} | app_lause` },
    { name: "description", content: "View a message" },
  ];
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Message</h1>
        <p className="text-muted-foreground">
          You are reading <strong>{loaderData.messageId}</strong>.
        </p>
        <div className="rounded-xl border p-6">
          Let&apos;s keep the momentum going. What is one small action you want
          to complete before the next check-in?
        </div>
      </div>
      <Button asChild variant="outline">
        <Link to="/my/messages">Back to messages</Link>
      </Button>
    </div>
  );
}
