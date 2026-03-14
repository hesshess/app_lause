import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/applause-praises-page";
import { PraiseCard } from "../components/praise-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreatePraiseDialog from "~/features/components/create-praise-dialog";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Applause ${params.applauseId} Praises | app_lause` },
    { name: "description", content: "Praises for a single applause" },
  ];
};

export default function ApplausePraisesPage() {
  return (
    <Dialog>
      <div className="space-y-10 max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">10 Praises</h2>
          <DialogTrigger>
            <Button variant="secondary">Write a Praise</Button>
          </DialogTrigger>
        </div>
        <div className="space-y-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <PraiseCard
              avatarSrc="https://github.com/ebs.png"
              handle="@username"
              username="Hess Wang"
              rating={5}
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id hic nulla autem iusto illo earum dolorum velit sint cumque. Eaque cupiditate itaque nihil quibusdam fugiat ipsum sit delectus soluta ad!"
              postedAt="10 days ago"
            />
          ))}
        </div>
      </div>
      <CreatePraiseDialog />
    </Dialog>
  );
}
