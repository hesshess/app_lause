import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { data, redirect } from "react-router";
import { z } from "zod";
import { toggleIdeaLike } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | app_lause" },
    { name: "description", content: "Find ideas for your next growth goal" },
  ];
};

export const loader = async ({request}:Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const ideas = await getGptIdeas(client, { limit: 20 });
  return { ideas };
};

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }
  const formData = await request.formData();
  const result = z.coerce.number().int().positive().safeParse(formData.get("ideaId"));
  if (!result.success) {
    return data({ error: "Invalid idea" }, { status: 400 });
  }

  const { client, headers } = makeSSRClient(request);
  const { data: authData, error: authError } = await client.auth.getUser();
  if (authError || !authData.user) {
    return redirect("/auth/login", { headers });
  }

  try {
    await toggleIdeaLike(client, {
      ideaId: result.data,
      userId: authData.user.id,
    });
  } catch {
    return data(
      { error: "Could not update your like. Please try again." },
      { status: 500, headers },
    );
  }
  return data({ error: null }, { headers });
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="IdeasGPT"
        description="Find ideas for your next growth goal"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id}
            title={idea.title}
            viewsCount={idea.views_count}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
