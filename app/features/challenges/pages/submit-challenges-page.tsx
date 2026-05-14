import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-challenges-page";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import {
  CHALLENGE_DURATION_RANGES,
  CHALLENGE_PARTICIPATION_TYPES,
  CHALLENGE_TYPES,
} from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import z from "zod";
import { createChallenge } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit a Challenge | app_lause" },
    { name: "description", content: "Create a new challenge" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  title: z.string().max(40),
  overview: z.string().max(400),
  goal: z.string().max(400),
  instructions: z.string().max(400),
  benefits: z.string().max(400),
  tags: z.string().max(400),
  host_name: z.string().max(40),
  thumbnail_url: z.string().max(40),
  location: z.string().max(40),
  challenge_type: z.enum(
    CHALLENGE_TYPES.map((type) => type.value) as [string, ...string[]],
  ),
  participation_type: z.enum(
    CHALLENGE_PARTICIPATION_TYPES.map((location) => location.value) as [
      string,
      ...string[],
    ],
  ),
  duration: z.enum(CHALLENGE_DURATION_RANGES),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success){
    return{
      fieldErrors: error.flatten().fieldErrors,
    }
  }
  const {challenge_id} = await createChallenge(client, data);
  return redirect(`/challenge/${challenge_id}`);
};

export default function SubmitChallengesPage({actionData}: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Create a Challenge"
        description="Start a challenge that helps people take small actions for themselves"
      />

      <Form className="mx-auto flex max-w-6xl flex-col items-center gap-10"  method="post">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <InputPair
            label="Challenge Title"
            description="(40 characters max)"
            name="title"
            maxLength={40}
            type="text"
            id="title"
            required
            defaultValue="i.e 7-Day Morning Walk Challenge"
          />
        {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.title}</p>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            defaultValue="i.e A simple challenge to help you start your day with energy and clarity."
            textArea
          />
    {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.overview}</p>
          )}
          <InputPair
            id="goal"
            label="Goal"
            description="(200 characters max)"
            name="goal"
            maxLength={200}
            type="text"
            required
            defaultValue="i.e Build a healthier morning routine"
            textArea
          />
  {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.goal}
            </p>
          )}
          <InputPair
            id="instructions"
            label="Instructions"
            description="(400 characters max, comma separated if needed)"
            name="instructions"
            maxLength={400}
            type="text"
            required
            defaultValue="i.e Walk for 20 minutes every morning, take a photo, and reflect on how you feel"
            textArea
          />
    {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.instructions}
            </p>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            defaultValue="i.e Better mood, more energy, improved focus"
            textArea
          />
     {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
          )}
          <InputPair
            id="tags"
            label="Tags"
            description="(100 characters max, comma separated)"
            name="tags"
            maxLength={100}
            type="text"
            required
            defaultValue="i.e wellness, mindset, routine"
            textArea
          />
     {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.tags}</p>
          )}
          <InputPair
            id="hostName"
            label="Host Name"
            description="(40 characters max)"
            name="host_name"
            maxLength={40}
            type="text"
            required
            defaultValue="i.e Hess"
          />
     {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.host_name}</p>
          )}
          <InputPair
            id="thumbnailUrl"
            label="Thumbnail URL"
            description="Paste an image URL for the challenge cover"
            name="thumbnail_url"
            type="url"
            required
            defaultValue="i.e https://example.com/challenge-cover.png"
          />
 {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.thumbnail_url}
            </p>
          )}
          <InputPair
            id="location"
            label="Location"
            description="(40 characters max)"
            name="location"
            maxLength={40}
            type="text"
            required
            defaultValue="i.e Online, Seoul, Montreal"
          />
  {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors.location}
            </p>
          )}
          <SelectPair
            label="Challenge Type"
            description="Select the type of challenge"
            name="challenge_type"
            required
            placeholder="Select the type of challenge"
            options={CHALLENGE_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
 {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.challenge_type}</p>
          )}
          <SelectPair
            label="Participation Type"
            description="Choose how people will join this challenge"
            name="participation_type"
            required
            placeholder="Select participation type"
            options={CHALLENGE_PARTICIPATION_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />
 {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.participation_type}</p>
          )}
          <SelectPair
            label="Duration"
            description="Select the challenge duration"
            name="duration"
            required
            placeholder="Select the challenge duration"
            options={CHALLENGE_DURATION_RANGES.map((range) => ({
              label: range,
              value: range,
            }))}
          />
           {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">{actionData.fieldErrors.duration}</p>
          )}
        </div>

        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Challenge
        </Button>
      </Form>
    </div>
  );
}
