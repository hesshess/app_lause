import { Link, type MetaFunction } from "react-router";

import { ApplauseCard } from "~/features/components/applause-card";
import { PostCard } from "~/features/community/components/post-card";
import { DonaCard } from "~/features/challenges/components/challenge-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | app_lause" },
    { name: "description", content: "Welcome to app_lause" },
  ];
};

export const loader = () => {
  return {};
};

export default function HomePage() {
  return (
    <div className="space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight  tracking-tight">
            Today's Applauses
          </h2>
          <p className="text-xl font-light text-foreground">
            The most recognized growth actions from today.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/applauses/leaderboards">
              Explore all allpauses &rarr;
            </Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <ApplauseCard
            key={`applause-${index}`}
            id={`applause-${index}`}
            title="asdf"
            description="asdf"
            commentsCount={12}
            viewsCount={12}
            applauseCount={120}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight  tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            Reflections, lessons, and progress from the community.{" "}
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all allpauses &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={`communityId-${index}`}
            id={`communityId-${index}`}
            title="What changed after I tracked one habit for 7 days"
            author="Hess"
            avatarSrc="https://github.com/apple.png"
            category="Reflection"
            postedAt="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight  tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next breakthrough
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="Create a 14-day evening reset routine with journaling, light stretching, and a simple next-day plan to help you end the day with more clarity and start the next one with less friction."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight  tracking-tight">
            Latest Challenges
          </h2>
          <p className="text-xl font-light text-foreground">
            Join focused challenges built around consistency and growth
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/challenges">Explore all challenges &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 11 }).map((_, index) => (
          <DonaCard
            key={`donaId-${index}`}
            id={`donaId-${index}`}
            organizationLogoSrc="https://github.com/unicef.png"
            organizationName="app_lause"
            postedAt="11 hours ago"
            title="7-Day Morning Walk Reset"
            tags={["Wellness", "Solo"]}
            amountLabel="7 days"
            locationLabel="Anywhere"
            donateButtonLabel="Join now"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight  tracking-tight">
            Find a team
          </h2>
          <p className="text-xl font-light text-foreground">
            Join teams that grow through accountability
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="bess"
            leaderAvatarSrc="https://github.com/hesshess.png"
            categories={["Seoul", "Habits", "Reflection"]}
            outro="more consistency and focus into their daily life."
            buttonLabel="Join team"
          />
        ))}
      </div>
    </div>
  );
}
