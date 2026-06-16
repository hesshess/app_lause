import { makeSSRClient } from "~/supa-client";
import { NotificationCard } from "../components/notification-card";
import type { Route } from "./+types/notifications-page";
import { getLoggedInUserId, getNotifications } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Notifications | app_lause" },
    { name: "description", content: "View your notifications" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, { userId });
  return { notifications };
};

export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            id={notification.notification_id}
            key={notification.notification_id}
            avatarUrl={notification.source?.avatar ?? ""}
            avatarFallback={notification.source?.name?.[0] ?? ""}
            userName={notification.source?.name ?? ""}
            type={notification.type}
            applauseName={notification.applause?.name ?? ""}
            postTitle={notification.post?.title ?? ""}
            payloadId={
              notification.applause?.applause_id ?? notification.post?.post_id
            }
            timestamp={DateTime.fromISO(notification.created_at).toRelative()!}
            seen={notification.seen}
          />
        ))}
      </div>
    </div>
  );
}
