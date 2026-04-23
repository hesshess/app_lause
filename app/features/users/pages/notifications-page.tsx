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
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          Notifications
        </h1>
        <p className="text-muted-foreground">
          Stay updated on replies, team invites, challenge reminders, and
          progress check-ins.
        </p>
      </div>
      <div className="grid gap-4">
        {[
          "Your weekly reflection reminder is ready.",
          "A team invited you to join their accountability circle.",
          "Someone replied to your community post.",
        ].map((notification) => (
          <div key={notification} className="rounded-xl border p-5">
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}
