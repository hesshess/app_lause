import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/challenges-page";
import { ChallengeCard } from "../components/challenge-card";
import { Button } from "~/common/components/ui/button";
import {
  CHALLENGE_DURATION_RANGES,
  CHALLENGE_PARTICIPATION_TYPES,
  CHALLENGE_TYPES,
} from "../constants";
import { data, useSearchParams } from "react-router";
import { getChallenges } from "../queries";
import z from "zod";

const challengeTypeValues = ["mindset", "wellness", "focus"] as const;
const challengeParticipationTypeValues = ["solo", "pair", "group"] as const;

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Challenges | app_lause" },
    { name: "description", content: "Browse self-growth challenges" },
  ];
};

const searchParamsSchema = z.object({
  type: z.enum(challengeTypeValues).optional(),
  participationType: z.enum(challengeParticipationTypeValues).optional(),
  duration: z.enum(CHALLENGE_DURATION_RANGES).optional(),
});


export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if(!success) {
    throw data(
      {
        error_code:"invalid_search_params",
        message: "Invalid search params"
      },
      { status:400}
    );
  }
  const challenges = await getChallenges({
    limit:40,
    participationType: parsedData.participationType,
    type: parsedData.type,
    duration: parsedData.duration 
});
  return { challenges };
}



export default function ChallengesPage({
  loaderData,
}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams, { preventScrollReset: true });
  };
  return (
    <div className="space-y-20">
      <Hero
        title="Challenges"
        description="Join challenges designed to build consistency, focus, and momentum."
      />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {loaderData.challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.challenge_id}
              id={challenge.challenge_id}
              thumbnailSrc={challenge.thumbnail_url}
              hostName={challenge.host_name}
              postedAt={challenge.created_at}
              title={challenge.title}
              challengeTypeLabel={challenge.challenge_type}
              participationLabel={challenge.participation_type}
              tags={challenge.tags.split(",").map((tag) => tag.trim())}
              durationLabel={challenge.duration}
              locationLabel={challenge.location}
            />
          ))}
        </div>

        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={
                    type.value === searchParams.get("type") ? "bg-accent" : ""
                  }
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Participation
            </h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_PARTICIPATION_TYPES.map((type) => (
                <Button
                  key={type.value}
                  variant="outline"
                  onClick={() =>
                    onFilterClick("participationType", type.value)
                  }
                  className={
                    type.value === searchParams.get("participationType")
                      ? "bg-accent"
                      : ""
                  }
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">
              Duration
            </h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_DURATION_RANGES.map((range) => (
                <Button
                  key={range}
                  variant="outline"
                  onClick={() => onFilterClick("duration", range)}
                  className={
                    range === searchParams.get("duration") ? "bg-accent" : ""
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
