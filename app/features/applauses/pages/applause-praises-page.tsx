import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/applause-praises-page";
import { PraiseCard } from "../components/praise-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreatePraiseDialog from "~/features/applauses/components/create-praise-dialog";
import { useOutletContext } from "react-router";
import { getPraises } from "../queries";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Applause ${params.applauseId} Praises | app_lause` },
    { name: "description", content: "Praises for a single applause" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const praises = await getPraises(params.applauseId);
  return { praises };
};

export default function ProductPraisesPage({
  loaderData,
}: Route.ComponentProps) {
  const { praise_count } = useOutletContext<{
    praise_count: string;
  }>();
  return (
    <Dialog>
      <div className="space-y-10 max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {praise_count} {praise_count === "1" ? "praise" : "praises"}
          </h2>
          <DialogTrigger>
            <Button variant="secondary">Write a Praise</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {loaderData.praises.map((praise) => (
            <PraiseCard
            key={praise.praise_id}
              username={praise.user.name}
              handle={praise.user.username}
              avatarSrc={praise.user.avatar}
              rating={praise.rating}
              content={praise.content}
              postedAt={praise.created_at}
            />
          ))}
        </div>
      </div>
      <CreatePraiseDialog />
    </Dialog>
  );
}
