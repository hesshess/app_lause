import { ApplauseCard } from "~/features/applauses/components/applause-card";
import type { Route } from "./+types/profile-applauses-page";
import { getUserApplauses } from "../queries";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const applauses = await getUserApplauses(params.username);
  return { applauses };
};

export default function ProfileApplausesPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
{loaderData.applauses.map((applause) => (
        <ApplauseCard
          key={applause.applause_id}
          id={applause.applause_id}
          name={applause.name}
          description={applause.tagline}
          praisesCount={applause.praises}
          viewsCount={applause.views}
          votesCount={applause.upvotes}
        />
      ))}
    </div>
  );
}
