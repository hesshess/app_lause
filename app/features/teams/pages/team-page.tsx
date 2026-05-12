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
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";


export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Team ${params.teamId} | app_lause` },
    { name: "description", content: "View a growth team and apply to join" },
  ];
};
export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const team = await getTeamById(client, { teamId: Number(params.teamId) });
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
      <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-6 xl:gap-20">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:col-span-4 xl:grid-cols-4">
          {[
            {
              title: "Team name",
              value: loaderData.team.name,
            },
            {
              title: "Team size",
              value: loaderData.team.size,
            },
            {
              title: "Open spots",
              value: loaderData.team.open_spots
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                 <CardContent className="p-0 capitalize font-bold text-2xl">
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
              {loaderData.team.roles.split(",").map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Team description
              </CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                     <p>{loaderData.team.description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="space-y-5 rounded-lg border p-6 shadow-sm xl:col-span-2">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {loaderData.team.team_leader.name[0]}
              </AvatarFallback>
              {loaderData.team.team_leader.avatar ? (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col">
                         <h4 className="text-lg font-medium">
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.team.team_leader.role}
              </Badge>
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
