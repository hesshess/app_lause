import { ApplauseCard } from "~/features/applauses/components/applause-card";
import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { getApplausesByDateRange } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | app_lause" },
    { name: "description", content: "Top applauses leaderBoard" },
  ];
};
export const loader = async () => {
  const [dailyApplauses, weeklyApplauses, monthlyApplauses, yearlyApplauses] =
    await Promise.all([
      getApplausesByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
      }),
      getApplausesByDateRange({
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
        limit: 7,
      }),
      getApplausesByDateRange({
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
        limit: 7,
      }),
      getApplausesByDateRange({
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
        limit: 7,
      }),
    ]);
  return { dailyApplauses, weeklyApplauses, monthlyApplauses, yearlyApplauses };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        description="The most recognized growth actions on app_lause"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-lg font-light text-foreground sm:text-xl">
            The most recognized growth actions by day.
          </p>
        </div>
        {loaderData.dailyApplauses.map((applause) => (
          <ApplauseCard
            key={applause.applause_id.toString()}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.description}
            reviewsCount={applause.reviews}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
        <Button variant="link" asChild className="self-center p-0 text-lg">
          <Link to="/applauses/leaderboards/daily">
            Explore all applauses &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-lg font-light text-foreground sm:text-xl">
            The most recognized growth actions by week.
          </p>
        </div>
        {loaderData.weeklyApplauses.map((applause) => (
          <ApplauseCard
            key={applause.applause_id.toString()}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.description}
            reviewsCount={applause.reviews}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
        <Button variant="link" asChild className="self-center p-0 text-lg">
          <Link to="/applauses/leaderboards/weekly">
            Explore all applauses &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-lg font-light text-foreground sm:text-xl">
            The most recognized growth actions by month.
          </p>
        </div>
        {loaderData.monthlyApplauses.map((applause) => (
          <ApplauseCard
            key={applause.applause_id.toString()}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.description}
            reviewsCount={applause.reviews}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
        <Button variant="link" asChild className="self-center p-0 text-lg">
          <Link to="/applauses/leaderboards/monthly">
            Explore all applauses &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-lg font-light text-foreground sm:text-xl">
            The most recognized growth actions by year.
          </p>
        </div>
        {loaderData.yearlyApplauses.map((applause) => (
          <ApplauseCard
            key={applause.applause_id.toString()}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.description}
            reviewsCount={applause.reviews}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
        <Button variant="link" asChild className="self-center p-0 text-lg">
          <Link to="/applauses/leaderboards/yearly">
            Explore all applauses &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
