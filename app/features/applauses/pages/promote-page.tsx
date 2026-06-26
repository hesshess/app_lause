import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import {
  getApplausesByUserId,
  getLoggedInUserId,
} from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Applause | app_lause" },
    { name: "description", content: "Promote your applause" },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const applauses = await getApplausesByUserId(client, { userId });

  return {
    applauseOptions: applauses.map((applause) => ({
      label: applause.name,
      value: String(applause.applause_id),
    })),
  };
}

export default function PrmotePage({ loaderData }: Route.ComponentProps) {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days",
        ).days
      : 0;
  return (
    <div>
      <Hero
        title="Promote Your Applause"
        description="Highlight your progress so more people can discover and try it."
      />
      <div className="grid grid-cols-6">
        <Form className="col-span-4 mx-auto flex flex-col gap-10 items-center">
          <SelectPair
            label="Select an applause"
            description="Select the applause you want to promote"
            name="applause"
            placeholder="Select an applause"
            options={loaderData.applauseOptions}
          />

          <div className="flex flex-col gap-2 items-center w-full">
            <Label className="flex flex-col gap-1">
              Select a range of dates for promotion{" "}
              <small className="text-muted-foreground text-center ">
                Minimum duration is 3 days.
              </small>
            </Label>

            <Calendar
              mode="range"
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              min={3}
              disabled={{ before: new Date() }}
            />
          </div>
          <Button disabled={totalDays === 0}>
            Go to checkout (${totalDays * 20})
          </Button>
        </Form>
        <aside className="col-span-2"></aside>
      </div>
    </div>
  );
}
