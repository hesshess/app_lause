import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/challenges-page";
import { DonaCard } from "../components/challenge-card";
import { Button } from "~/common/components/ui/button";
import {
  CHALLENGE_DURATION_RANGES,
  CHALLENGE_PARTICIPATION_TYPES,
  CHALLENGE_TYPES,
} from "../constants";
import { Link, useSearchParams } from "react-router";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Challenges | app_lause" },
    { name: "description", content: "Browse self-growth challenges" },
  ];
};

export default function ChallengesPage(_props: Route.ComponentProps) {
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
          {Array.from({ length: 20 }).map((_, index) => (
            <DonaCard
              key={`donaId-${index}`}
              id={`donaId-${index}`}
              organizationLogoSrc="https://github.com/unicef.png"
              organizationName="app_lause"
              postedAt="11 hours ago"
              title="7-Day Morning Walk Challenge"
              tags={["Wellness", "Solo"]}
              amountLabel="7 days"
              locationLabel="Anywhere"
              donateButtonLabel="Join now"
            />
          ))}
        </div>

        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_TYPES.map((type) => (
                <Button
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
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_PARTICIPATION_TYPES.map((region) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("region", region.value)}
                  className={
                    region.value === searchParams.get("region")
                      ? "bg-accent"
                      : ""
                  }
                >
                  {region.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {CHALLENGE_DURATION_RANGES.map((range) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("range", range)}
                  className={
                    range === searchParams.get("range") ? "bg-accent" : ""
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
