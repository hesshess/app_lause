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
        description="Highlight your progress so more people can discover and try it."
      />
      <Form className="max-w-lg mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select an applause"
          description="Select the applause you want to promote"
          name="applause"
          placeholder="Select an applause"
          options={[
            {
              label: "7-Day Morning Reflection Streak",
              value: "morning-reflection-streak",
            },
            {
              label: "Evening Digital Detox Routine",
              value: "evening-digital-detox",
            },
            {
              label: "30-Minute Deep Work Sprint",
              value: "deep-work-sprint",
            },
            {
              label: "Weekly Self-Review Habit",
              value: "weekly-self-review",
            },
            {
              label: "Daily Reading Reset",
              value: "daily-reading-reset",
            },
            {
              label: "Mindful Walking Break",
              value: "mindful-walking-break",
            },
            {
              label: "Focus Block Planning Routine",
              value: "focus-block-planning",
            },
            {
              label: "Sunday Reset Checklist",
              value: "sunday-reset-checklist",
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
