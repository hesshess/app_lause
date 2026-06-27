import { redirect } from "react-router";
import type { Route } from "./+types/promote-fail-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promotion Payment Failed | app_lause" },
    { name: "description", content: "Payment failure for applause promotion" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const params = new URLSearchParams();
  const code = url.searchParams.get("code");
  const message = url.searchParams.get("message");
  const orderId = url.searchParams.get("orderId");

  if (code) params.set("code", code);
  if (message) params.set("message", message);
  if (orderId) params.set("orderId", orderId);

  return redirect(`/applauses/promote?${params.toString()}`);
}

export async function action({}: Route.ActionArgs) {
  return null;
}

export default function PromoteFailPage(_: Route.ComponentProps) {
  return null;
}
