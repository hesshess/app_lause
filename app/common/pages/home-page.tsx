import { Link, type MetaFunction } from "react-router";
import { ArrowRightIcon, GithubIcon } from "lucide-react";

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
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "app_lause | A social platform for shared growth" },
    {
      name: "description",
      content:
        "Share personal-growth actions, celebrate progress, and build better habits with the app_lause community.",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const [applauses, posts, ideas, challenges, teams] = await Promise.all([
    getApplausesByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      // limit: 7,
    }),
    getPosts(client, {
      limit: 7,
      sorting: "newest",
    }),
    getGptIdeas(client, { limit: 7 }),
    getChallenges(client, { limit: 7 }),
    getTeams(client, { limit: 7 }),
  ]);
  return { applauses, posts, ideas, challenges, teams };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-40">
      <section className="relative overflow-hidden rounded-3xl border bg-muted/30 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/30 blur-3xl"
        />
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)] lg:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              A production-oriented full-stack project
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Turn small steps into shared progress.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                app_lause is a social growth platform where people share
                meaningful actions, celebrate progress, join challenges, and
                build better habits together.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/applauses">
                  Explore the app
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href="https://github.com/hesshess/app_lause"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon aria-hidden="true" />
                  View source on GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-4 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="font-semibold">Built across the full stack</p>
            <p className="text-sm leading-6 text-muted-foreground">
              Server-rendered routes, authenticated data flows, relational
              database features, deployment, and production monitoring.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Core technologies">
              {[
                "React",
                "TypeScript",
                "React Router",
                "Supabase",
                "PostgreSQL",
                "Sentry",
              ].map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
            id={applause.applause_id}
            name={applause.name}
            description={applause.tagline}
            praisesCount={applause.praises}
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
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.leader_profile_id.username}
            leaderAvatarSrc={team.leader_profile_id.avatar}
            categories={team.roles.split(",")}
            outro={team.description}
          />
        ))}
      </div>
    </div>
  );
}
