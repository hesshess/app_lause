import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Teams | app_lause" },
    { name: "description", content: "Find teams to volunteer with" },
  ];
};

export default function TeamsPage(_props: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Teams"
        description="Find people who want to do good work together."
      />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <TeamCard
            key={`team-${index}`}
            id={`team-${index}`}
            leaderUsername="hess"
            leaderAvatarSrc="https://github.com/hesshess.png"
            categories={["Seoul", "Education", "Mentoring"]}
            outro="your talent to the children."
            buttonLabel="Join team"
          />
        ))}
      </div>
    </div>
  );
}
