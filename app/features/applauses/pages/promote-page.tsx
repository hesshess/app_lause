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

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Applause | app_lause" },
    { name: "description", content: "Promote your applause" },
  ];
};

export default function PrmotePage() {
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
        description="Promote your good deed and turn it into a community campaign."
      />
      <Form className="max-w-lg mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select an applause"
          description="Select the applause you want to promote"
          name="applause"
          placeholder="Select an applause"
          options={[
            {
              label: "Weekend Park Cleanup with Local Families",
              value: "weekend-park-cleanup",
            },
            {
              label: "Meal Delivery for Seniors Living Alone",
              value: "meal-delivery-for-seniors",
            },
            {
              label: "Free Digital Skills Class for Seniors",
              value: "digital-skills-class-for-seniors",
            },
            {
              label: "School Supply Donation for Children",
              value: "school-supply-donation",
            },
            {
              label: "Community Library Book Drive",
              value: "community-library-book-drive",
            },
            {
              label: "Neighborhood Kindness Challenge",
              value: "neighborhood-kindness-challenge",
            },
            {
              label: "Volunteer Dog Walking for Animal Shelters",
              value: "volunteer-dog-walking",
            },
            {
              label: "Winter Care Package for the Homeless",
              value: "winter-care-package",
            },
          ]}
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col">
            Select a range of dates for promotion
            <small className="text-muted-foreground text-center">
              Minimum duration is 3 days.
            </small>
          </Label>

          <Calendar
            captionLayout="dropdown-months"
            defaultMonth={new Date()}
            startMonth={new Date()}
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to checkout (${totalDays})
        </Button>
      </Form>
    </div>
  );
}
