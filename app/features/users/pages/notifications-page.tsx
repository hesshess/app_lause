import { NotificationCard } from "../components/notification-card";
import type { Route } from "./+types/notifications-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Notifications | app_lause" },
    { name: "description", content: "View your notifications" },
  ];
};

export default function NotificationsPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarUrl="https://github.com/hesshess.png"
          avatarFallback="H"
          userName="Hess"
          message=" invited you to a weekly reflection check-in."
          timestamp="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}
