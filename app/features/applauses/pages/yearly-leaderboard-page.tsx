import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ApplauseCard } from "~/features/applauses/components/applause-card";
import { Button } from "~/common/components/ui/button";
import ApplausePagination from "~/common/components/applause-pagination";
import { getApplausePagesByDateRange, getApplausesByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { APP_TIME_ZONE } from "~/lib/datetime";

const paramsSchema = z.object({
  year: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  });
  return [
    {
      title: `Best of ${date.toLocaleString({ year: "numeric" })} | app_lause`,
    },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
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
    year: parsedData.year,
  }, { zone: APP_TIME_ZONE }).startOf("year");
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
  const today = DateTime.now().startOf("year");
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
  const applauses = await getApplausesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getApplausePagesByDateRange(client, {
    startDate: date.startOf("year"),
    endDate: date.endOf("year"),
  });
  return {
    applauses,
    totalPages,
    ...parsedData,
  };
};

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });
  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("year"));
  return (
    <div className="space-y-10">
      <Hero title={`Best of ${urlDate.toLocaleString({ year: "numeric" })}`} />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/applauses/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: "2-digit" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/applauses/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({ year: "2-digit" })} &rarr;
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
            isUpvoted={applause.is_upvoted}
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
