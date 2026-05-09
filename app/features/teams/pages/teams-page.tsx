import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Teams | app_lause" },
    { name: "description", content: "Find teams to grow with together" },
  ];
};

export const loader = async () => {
  const teams = await getTeams({ limit: 8 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Teams"
        description="Join a team built around habits, learning, and self-growth."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loaderData.teams.map((team) => (
          <TeamCard
           key={team.team_id}
            id={team.team_id}
            leaderUsername={team.leader_profile_id.username}
            leaderAvatarSrc={team.leader_profile_id.avatar}
            positions={team.roles.split(",")}
            projectDescription={team.description}
          />
        ))}
      </div>
    </div>
  );
}
