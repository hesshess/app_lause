import { Form, redirect } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-team-page";
import SelectPair from "~/common/components/select-pair";
import { TEAM_STAGES } from "../constans";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Team | app_lause" },
    { name: "description", content: "Create a new team for self-growth" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.enum(
      TEAM_STAGES.map((type) => type.value) as [string, ...string[]],
    ),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string(),
  description: z.string().min(1).max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam(client, userId, {
    ...data,
  });
  return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Team"
        description="Start a team and gather people around a shared growth goal."
      />
      <Form
        className="mx-auto flex max-w-screen-2xl flex-col items-center gap-10"
        method="post"
      >
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <InputPair
            label="What is your team name?"
            description="(20 characters max)"
            placeholder="i.e Morning Reset Circle"
            name="name"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.name}</p>
          )}
          <SelectPair
            label="What kind of team is this?"
            description="Select the stage your team is in"
            name="stage"
            required
            placeholder="Select your team stage"
            options={TEAM_STAGES}
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.stage}</p>
          )}
          <InputPair
            label="How many people are already on your team?"
            description="(1-100)"
            name="size"
            max={100}
            min={1}
            type="number"
            id="size"
            required
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.size}</p>
          )}
          <InputPair
            label="How many new members are you looking for?"
            description="(1-100)"
            name="openSpots"
            max={100}
            min={1}
            type="number"
            id="openSpots"
            required
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.equity}</p>
          )}
          <InputPair
            label="What kinds of help are you looking for?"
            placeholder="Accountability partners, writers, builders, listeners"
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.roles}</p>
          )}
          <InputPair
            label="What is your team working on?"
            description="(200 characters max)"
            placeholder="i.e We help each other build better routines through daily check-ins, weekly reflection, and shared goals."
            name="description"
            maxLength={200}
            type="text"
            id="description"
            required
            textArea
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.description}</p>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Team
        </Button>
      </Form>
    </div>
  );
}
