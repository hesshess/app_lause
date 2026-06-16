import { Link, redirect } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/common/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { Route } from "./+types/dashboard-applause-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";


export const meta = () => {
  return [
    { title: `Applause Dashboard| app_lause` },
    { name: "description", content: "Review a dashboard item" },
  ];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { error } = await client
    .from("applauses")
    .select("applause_id")
    .eq("profile_id", userId)
    .eq("applause_id", +params.applauseId)
    .single();
  if (error) {
    throw redirect("/my/dashboard/applauses");
  }
  const { data, error: rcpError } = await client.rpc("get_applause_stats", {
    applause_id: params.applauseId,
  });
  if (rcpError) {
    throw error;
  }
  return {
    chartData: data,
  };
};

const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;


export default function DashboardApplausePage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-full xl:w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={loaderData.chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 15, right: 15 }}
              />
              <Area
                dataKey="applause_views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="applause_visits"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{ minWidth: "200px" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
