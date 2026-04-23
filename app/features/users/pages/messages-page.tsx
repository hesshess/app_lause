import { Link } from "react-router";
import type { Route } from "./+types/messages-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Messages | app_lause" },
    { name: "description", content: "View your messages" },
  ];
};

export default function MessagesPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Continue conversations with teammates and accountability partners.
        </p>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Link
            key={`message-${index}`}
            to={`/my/messages/message-${index}`}
            className="rounded-xl border p-5 transition-colors hover:bg-card/50"
          >
            <h2 className="font-semibold">Growth check-in</h2>
            <p className="text-sm text-muted-foreground">
              A quick message about this week&apos;s progress.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
