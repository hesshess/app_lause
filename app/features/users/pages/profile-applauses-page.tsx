import { ApplauseCard } from "~/features/applauses/components/applause-card";
import type { Route } from "./+types/profile-applauses-page";

export function loader({ params }: Route.LoaderArgs) {
  return { username: params.username };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.username}'s Applauses | app_lause` },
    {
      name: "description",
      content: "View self-growth actions recognized by this user",
    },
  ];
};

export default function ProfileApplausesPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ApplauseCard
          key={`growth-action-${index}`}
          id={`growth-action-${index}`}
          title="Kept a morning reflection streak for 7 days"
          description="A small routine that helped create more focus, awareness, and momentum."
          commentsCount={12}
          viewsCount={12}
          applauseCount={120}
        />
      ))}
    </div>
  );
}
