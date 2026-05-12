import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/applause-overview-layout";
import { getApplauseById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.applause.name} Overview | app_lause` },
    { name: "description", content: "View applause details and information" },
  ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const applause = await getApplauseById(client,{applauseId:Number(params.applauseId)});
  return { applause };
};

export default function ApplauseOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50">
            <img
              src={loaderData.applause.icon}
              alt={loaderData.applause.name}
              className="size-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold">{loaderData.applause.name}</h1>
            {/* <p className=" text-2xl font-light">{loaderData.applause.tagline}</p> */}
            <div className="mt-5 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-4"
                    fill={
                      i < Math.floor(loaderData.applause.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-muted-foreground ">
                {loaderData.applause.praises} praises
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button
            variant={"secondary"}
            size="lg"
            className="text-lg h-14 px-10"
            asChild
          >
            <Link to={`/applauses/${loaderData.applause.applause_id}/visit`}>
              Visit Website
            </Link>
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUpIcon className="size-4" />
            Upvote ({loaderData.applause.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2.5">
        <NavLink
          end
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground ",
            )
          }
          to={`/applauses/${loaderData.applause.applause_id}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground ",
            )
          }
          to={`/applauses/${loaderData.applause.applause_id}/praises`}
        >
          praises
        </NavLink>
      </div>
      <div>
        <Outlet
          context={{
            applause_id: loaderData.applause.applause_id,
            description: loaderData.applause.description,
            tagline: loaderData.applause.tagline,
            praises_cnt: loaderData.applause.praises,
          }}
        />
      </div>
    </div>
  );
}
