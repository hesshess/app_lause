import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/challenge-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { DateTime } from "luxon";
import { getChallengeById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({data}) => {
  return [
    { title: `${data.challenge.title}  | app_lause` },
    {
      name: "description",
    },
  ];
};

export const loader = async ({ request,params }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const challenge = await getChallengeById(client, {challengeId: Number(params.challengeId)});
  return { challenge };
};

export default function ChallengePage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="h-60 w-full rounded-lg bg-linear-to-tr from-primary/80 to-primary/10"></div>

      <div className="-mt-16 grid grid-cols-1 items-start gap-10 lg:-mt-24 xl:-mt-30 xl:grid-cols-6 xl:gap-20">
        <div className="space-y-10 xl:col-span-4">
          <div className="space-y-5">
            <div className="relative left-4 size-24 overflow-hidden rounded-full border-white bg-white sm:left-6 sm:size-32 lg:left-10 lg:size-40">
              <img
                src={loaderData.challenge.thumbnail_url}
                className="h-full w-full object-cover"
                alt="Challenge cover"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{loaderData.challenge.title}</h1>
              <h4 className="text-lg text-muted-foreground">
                {loaderData.challenge.goal}
              </h4>
            </div>
          </div>

          <div className="flex gap-2 capitalize">
            <Badge variant={"secondary"}>{loaderData.challenge.challenge_type}</Badge>
            <Badge variant={"secondary"}>{loaderData.challenge.location}</Badge>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">{loaderData.challenge.overview}</p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Instructions</h4>
<p className="text-lg">{loaderData.challenge.instructions}</p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="list-inside list-disc text-lg text-muted-foreground">
              {loaderData.challenge.benefits.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Tags</h4>
            <ul className="list-inside list-disc text-lg text-muted-foreground">
              {loaderData.challenge.tags.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5 rounded-lg border p-6 xl:sticky xl:top-20 xl:col-span-2 xl:mt-40">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Duration</span>
                   <span className="text-2xl font-medium">
              {loaderData.challenge.duration}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Participation</span>
          <span className="text-2xl font-medium capitalize">
              {loaderData.challenge.participation_type}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-2xl font-medium capitalize">
              {loaderData.challenge.challenge_type}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              Posted {DateTime.fromISO(loaderData.challenge.created_at).toRelative()}
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>

          <Button className="w-full">Join Challenge</Button>
        </div>
      </div>
    </div>
  );
}
