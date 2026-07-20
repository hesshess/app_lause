import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import {
  getApplausesByUserId,
  getLoggedInUserId,
} from "~/features/users/queries";

import type { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

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
  const widgets = useRef<TossPaymentsWidgets | null>(null);
  const initedToss = useRef<boolean>(false);
  useEffect(() => {
    const initToss = async () => {
      if (initedToss.current) return;
      initedToss.current = true;
      const { ANONYMOUS, loadTossPayments } = await import(
        "@tosspayments/tosspayments-sdk"
      );
      const toss = await loadTossPayments(
        import.meta.env.VITE_TOSS_CLIENT_KEY!,
      );
      widgets.current = await toss.widgets({
        customerKey: ANONYMOUS,
      });
      await widgets.current.setAmount({
        value: 0,
        currency: "KRW",
      });
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);
  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * 1000,
          currency: "KRW",
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);
  return (
    <div>
      <Hero
        title="Promote Your Applause"
        description="Highlight your progress so more people can discover and try it."
      />
      <div className="grid grid-cols-6 gap-10">
        <div className="col-span-3 mx-auto w-1/2 flex flex-col gap-10 items-start">
          <SelectPair
            required
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
        </div>
        <aside className="col-span-3 px-20 flex flex-col items-center">
          <div id="toss-payment-methods" className="w-full" />
          <div id="toss-payment-agreement" />
          <Button className="w-full" type="button" disabled>
            Checkout disabled in public demo (
            {(totalDays * 1000).toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
            )
          </Button>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            The widget is shown for integration preview only. No payment
            request or confirmation is sent.
          </p>
        </aside>
      </div>
    </div>
  );
}
