import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/challenge-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Challenge Details | app_lause` },
    { name: "description", content: "View details for a self-growth challenge" },
  ];
};

export default function ChallengePage() {
  return (
    <div>
      <div className="h-60 w-full rounded-lg bg-linear-to-tr from-primary/80 to-primary/10"></div>

      <div className="-mt-30 grid grid-cols-6 items-start gap-20">
        <div className="col-span-4 space-y-10">
          <div className="space-y-5">
            <div className="relative left-10 size-40 overflow-hidden rounded-full border-white bg-white">
              <img
                src="https://github.com/octocat.png"
                className="h-full w-full object-cover"
                alt="Challenge cover"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold">7-Day Morning Walk Challenge</h1>
              <h4 className="text-sm text-muted-foreground">
                Created by Hess
              </h4>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary">Wellness</Badge>
            <Badge variant="secondary">Solo</Badge>
            <Badge variant="secondary">1 Week</Badge>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg text-muted-foreground">
              This challenge helps you build a healthier morning routine by
              taking a short walk every day for seven days. The goal is to start
              your day with more energy, clarity, and consistency through one
              small action.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Goal</h4>
            <p className="text-lg text-muted-foreground">
              Build a simple habit that helps you feel more awake, focused, and
              grounded each morning.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">How It Works</h4>
            <ul className="list-inside list-disc text-lg text-muted-foreground">
              {[
                "Walk for at least 20 minutes every morning",
                "Upload a short reflection or photo each day",
                "Track your progress for 7 days",
                "Encourage others by sharing your experience",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Why Join</h4>
            <ul className="list-inside list-disc text-lg text-muted-foreground">
              {[
                "Create a healthier daily rhythm",
                "Improve your mood and energy",
                "Stay accountable through small actions",
                "Turn personal growth into shared inspiration",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">What You’ll Need</h4>
            <ul className="list-inside list-disc text-lg text-muted-foreground">
              {[
                "Comfortable walking shoes",
                "A safe walking route",
                "10–20 minutes each morning",
                "A willingness to stay consistent",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sticky top-20 col-span-2 mt-40 space-y-5 rounded-lg border p-6">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-2xl font-medium">7 days</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Participation</span>
            <span className="text-2xl font-medium">Solo</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Category</span>
            <span className="text-2xl font-medium">Wellness</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">Posted 2 days ago</span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>

          <Button className="w-full">Join Challenge</Button>
        </div>
      </div>
    </div>
  );
}
