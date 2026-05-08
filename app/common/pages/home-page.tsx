import { Link, type MetaFunction } from "react-router";

import { ApplauseCard } from "~/features/applauses/components/applause-card";
import { PostCard } from "~/features/community/components/post-card";
import { ChallengeCard } from "~/features/challenges/components/challenge-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Button } from "../components/ui/button";
import { getApplausesByDateRange } from "~/features/applauses/queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/home-page";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getChallenges } from "~/features/challenges/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | app_lause" },
    { name: "description", content: "Welcome to app_lause" },
  ];
};

export const loader = async () => {
  const applauses = await getApplausesByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    // limit: 7,
  });
  const posts = await getPosts({
    limit: 7,
    sorting: "newest",
  });
  const ideas = await getGptIdeas({ limit: 7 });
  const challenges = await getChallenges({ limit: 7 });

  return { applauses, posts, ideas, challenges };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
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
        {loaderData.applauses.map((applause, index) => (
          <ApplauseCard
            key={applause.applause_id}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.description}
            reviewsCount={applause.reviews}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            Reflections, lessons, and progress from the community.{" "}
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all allpauses &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            avatarSrc={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next breakthrough
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Latest Challenges
          </h2>
          <p className="text-xl font-light text-foreground">
            Join focused challenges built around consistency and growth
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/challenges">Explore all challenges &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
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
