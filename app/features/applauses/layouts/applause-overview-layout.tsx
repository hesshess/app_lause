import { ChevronUpIcon, HeartIcon } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

export default function ApplauseOverviewLayout() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
          <div className="size-24 rounded-xl bg-primary/50 shadow-xl sm:size-32 xl:size-40"></div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl">Applause Title</h1>
            <p className="text-lg text-light sm:text-xl xl:text-2xl">Applause Description</p>
            <div className="mt-5 flex items-center gap-2 ">
              <div className="flex text-violet-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HeartIcon className="size-4" fill="currentColor" />
                ))}
              </div>
              <span className="text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Button variant="secondary" size="lg" className="h-14 text-lg sm:px-10">
            Visit Website
          </Button>
          <Button size="lg" className="h-14 text-lg sm:px-10">
            <ChevronUpIcon className="size-4" />
            Upvote(100)
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <NavLink
          end
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            )
          }
          to={`/applauses/1/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "outline" }),
              isActive && "bg-accent text-foreground",
            )
          }
          to={`/applauses/1/praises`}
        >
          Praises
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
