import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ApplauseCard } from "~/features/applauses/components/applause-card";
import { Button } from "~/common/components/ui/button";
import ApplausePagination from "~/common/components/applause-pagination";
import {
  getApplausePagesByDateRange,
  getApplausesByDateRange,
} from "../queries";
import { PAGE_SIZE } from "../constant";

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});
export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  })
    .setZone("Asia/Seoul")
    .setLocale("ko");
  return [
    {
      title: `Best of week ${date.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${date.endOf("week").toLocaleString(DateTime.DATE_SHORT)} | app_lause`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      {
        error_code: "invalid_params",
        message: "Invalid params",
      },
      { status: 400 },
    );
  }

  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
  }).setZone("Asia/Seoul");
  if (!date.isValid) {
    throw data(
      {
        error_code: "invalid_date",
        message: "Invalid date",
      },
      {
        status: 400,
      },
    );
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("week");
  if (date > today) {
    throw data(
      {
        error_code: "future_date",
        message: "Future date",
      },
      { status: 400 },
    );
  }
  const url = new URL(request.url);
  const applauses = await getApplausesByDateRange({
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getApplausePagesByDateRange({
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
  });
  return {
    applauses,
    totalPages,
    ...parsedData
  };
};

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });
  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("week"));
  return (
    <div className="space-y-10">
      <Hero
        title={`Best of week ${urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/applauses/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}
          >
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/applauses/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}
            >
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-3xl mx-auto">
        {loaderData.applauses.map((applause) => (
          <ApplauseCard
            key={applause.applause_id}
            id={applause.applause_id.toString()}
            name={applause.name}
            description={applause.tagline}
            praisesCount={applause.praises}
            viewsCount={applause.views}
            votesCount={applause.upvotes}
          />
        ))}
      </div>
      <ApplausePagination totalPages={loaderData.totalPages} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
