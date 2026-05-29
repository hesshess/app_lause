import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/applause-praises-page";
import { PraiseCard } from "../components/praise-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreatePraiseDialog from "~/features/applauses/components/create-praise-dialog";
import { useOutletContext } from "react-router";
import { getPraises } from "../queries";
import { makeSSRClient } from "~/supa-client";
import z from "zod";
import { getLoggedInUserId } from "~/features/users/queries";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Applause ${params.applauseId} Praises | app_lause` },
    { name: "description", content: "Praises for a single applause" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const praises = await getPraises(client, {
    applauseId: Number(params.applauseId),
  });
  return { praises };
};

const formSchema = z.object({
  praise: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  await createProductReview(client, {
    applauseId: params.applauseId,
    praise: data.praise,
    rating: data.rating,
    userId,
  });
  return {
    ok: true,
  };
};


export default function ApplausePraisesPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { praise_count } = useOutletContext<{
    praise_count: string;
  }>();
    const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);
  return (
     <Dialog open={open} onOpenChange={setOpen}>
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
