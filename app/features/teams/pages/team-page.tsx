import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/team-page";
import { Hero } from "~/common/components/hero";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import InputPair from "~/common/components/input-pair";

export function loader({ params }: Route.LoaderArgs) {
  return { teamId: params.teamId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Team ${params.teamId} | app_lause` },
    { name: "description", content: "View a growth team and apply to join" },
  ];
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero
        title="Join Lynn's team"
        description="Grow with a small group that keeps each other consistent."
      />
      <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-6 xl:gap-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:col-span-4 xl:grid-cols-4">
          {[
            {
              title: "Team name",
              value: "Morning Reset Circle",
            },
            {
              title: "Focus",
              value: "Self Growth",
            },
            {
              title: "Team size",
              value: 3,
            },
            {
              title: "Open spots",
              value: 4,
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="text-lg list-disc list-inside">
                  {[
                    "Habit accountability partners",
                    "Morning routine builders",
                    "Reflective journalers",
                    "Weekly check-in buddies",
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team mission
              </CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                <p>
                  Morning Reset Circle helps people build better routines
                  through shared check-ins, weekly reflection, and steady
                  accountability around the habits they want to keep.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="space-y-5 rounded-lg border p-6 shadow-sm xl:col-span-2">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/inthetiger.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Lynn</h4>
              <Badge variant="secondary">Growth Coach</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              description="Share what you are working on and how you want to grow"
              name="introduction"
              type="text"
              id="introduction"
              required
              textArea
              placeholder="i.e. I want to build a steady morning routine and would love a team that values weekly reflection and accountability."
            />
            <Button type="submit" className="w-full">
              Apply to join
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
