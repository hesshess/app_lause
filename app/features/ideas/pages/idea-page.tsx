import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { Form, redirect } from "react-router";
import { getLoggedInUserId } from "~/features/users/queries";
import { claimIdea } from "../mutations";

export const meta = ({
  loaderData: {
    idea: { idea_id, title },
  },
}: Route.MetaArgs) => {
  return [
    { title: `Idea #${idea_id}: ${title} | applause` },
    { name: "description", content: "Find ideas for your next applause" },
  ];
};
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const idea = await getGptIdea(client, {ideaId:Number(params.ideaId)});
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return { idea };
};  

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, { ideaId: Number(params.ideaId) });
  if (idea.is_claimed) {
    return { ok: false };
  }
  await claimIdea(client, { ideaId: params.ideaId, userId });
  return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
        <Hero title={`Idea #${loaderData.idea.idea_id}`} />
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">"{loaderData.idea.title}"</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon />
            <span>{loaderData.idea.views_count}</span>
          </div>
          <DotIcon className="w-4 h-4" />
           <span>
            {DateTime.fromISO(loaderData.idea.created_at).toRelative()}
          </span>
          <DotIcon className="w-4 h-4" />
          <Button variant="outline">
            <HeartIcon className="w-4 h-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
                {loaderData.idea.is_claimed ? null : (
          <Form method="post">
            <Button size="lg">Claim idea</Button>
          </Form>
        )}

      </div>
    </div>
  );
}
