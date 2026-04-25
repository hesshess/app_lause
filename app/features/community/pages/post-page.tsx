import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/post-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Textarea } from "~/common/components/ui/textarea";
import { Reply } from "../components/reply";
import { Badge } from "~/common/components/ui/badge";

export function loader({ params }: Route.LoaderArgs) {
  return { postId: params.postId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Post ${params.postId} | app_lause` },
    { name: "description", content: "View a community post" },
  ];
};

export default function PostPage() {
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Self Growth</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">
                I started walking every morning for 7 days
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-10 items-start xl:grid-cols-6 xl:gap-20">
        <div className="space-y-10 xl:col-span-4">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-10 lg:space-y-20">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  I started walking every morning for 7 days
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@hess</span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground lg:w-3/4">
                  For the past 7 days, I made myself go outside for a short walk
                  every morning before checking my phone. It felt small at
                  first, but it changed the tone of my whole day. I felt calmer,
                  more awake, and more present. I used to think doing something
                  good had to be for someone else, but I am part of the world
                  too. Taking care of myself turned out to be a meaningful
                  action, and now I want to keep going.
                </p>
              </div>
              <Form className="flex w-full items-start gap-5 lg:w-3/4">
                <Avatar className="size-14">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/hesshess.png" />
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button>Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    username="Hess"
                    avatarUrl="https://github.com/hesshess.png"
                    content="I really love this perspective. We often think good actions only count when they help someone else, but taking care of yourself matters too. This inspired me to start a small morning routine of my own."
                    timestamp="12 hours ago"
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5 rounded-lg border p-6 shadow-sm xl:col-span-2">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/hesshess.png" />
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Hess</h4>
              <Badge variant="secondary">Self Growth</Badge>
            </div>
          </div>
          <div className="gap-2 text-sm flex flex-col">
            <span>🌱 Joined 3 months ago</span>
            <span>👏 Shared 10 actions</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow Journey
          </Button>
        </aside>
      </div>
    </div>
  );
}
