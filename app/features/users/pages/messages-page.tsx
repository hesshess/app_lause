import { Link } from "react-router";
import type { Route } from "./+types/messages-page";
import { MessageCircleIcon } from "lucide-react";

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
<div className="h-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl text-muted-foreground font-semibold">
        Click on a message in the sidebar to view it.
      </h1>
    </div>
  );
}
