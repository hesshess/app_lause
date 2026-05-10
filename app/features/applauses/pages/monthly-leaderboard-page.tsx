import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import z from "zod";
import { Hero } from "~/common/components/hero";
import { ApplauseCard } from "~/features/applauses/components/applause-card";
import { Button } from "~/common/components/ui/button";
import ApplausePagination from "~/common/components/applause-pagination";
import { getApplausePagesByDateRange, getApplausesByDateRange } from "../queries";
import { PAGE_SIZE } from "../constant";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params, data }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  });
  return [
    {
      title: `Best of ${date.toLocaleString({ month: "long", year: "2-digit" })} | app_lause`,
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
    year: parsedData.year,
    month: parsedData.month,
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
  const today = DateTime.now().setZone("Asia/Seoul").startOf("month");
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
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
    page: Number(url.searchParams.get("page") || 1),
  });
  const totalPages = await getApplausePagesByDateRange({
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
  });
  return {
    applauses,
    totalPages,
    ...parsedData,
  };
};

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));
  return (
    <div className="space-y-10">
      <Hero
        title={`Best of ${urlDate.toLocaleString({ month: "long", year: "2-digit" })}`}
      />
      <div className="flex items-center justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/applauses/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr;{" "}
            {previousMonth.toLocaleString({ month: "long", year: "2-digit" })}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link
              to={`/applauses/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({ month: "long", year: "2-digit" })}{" "}
              &rarr;
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
