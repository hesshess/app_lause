import { Form, Link, useOutletContext } from "react-router";
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
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import z from "zod";
import { getLoggedInUserId } from "~/features/users/queries";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.post.title} on ${data.post.topic_name} | app_lause` },
    { name: "description", content: "Post a community post" },
  ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  const [post, replies] = await Promise.all([
    getPostById(client, { postId: Number(params.postId) }),
    getReplies(client, { postId: Number(params.postId) }),
  ]);
  return { post, replies };
};

const formSchema = z.object({
  reply: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }
  const { reply } = data;
  await createReply(client, {
    postId: params.postId,
    content: reply,
    userId,
  });
  return {
    ok: true,
  };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
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
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/postId`}>{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-10 items-start xl:grid-cols-6 xl:gap-20">
        <div className="space-y-10 xl:col-span-4">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className="space-y-10 lg:space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className="size-5" />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at, {
                      zone: "utc",
                    }).toRelative()}
                  </span>
                  <DotIcon className="size-5" />
                  <span>{loaderData.post.replies} replies</span>
                </div>
                <p className="text-muted-foreground lg:w-3/4">
                  {loaderData.post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-5 w-3/4"
                  method="post"
                >
                  <Avatar className="size-14">
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                    <AvatarImage src={avatar} />
                  </Avatar>
                  <div className="flex flex-col gap-5 items-end w-full">
                    <Textarea
                      name="content"
                      placeholder="Write a reply"
                      className="w-full resize-none"
                      rows={5}
                    />
                    <Button>Reply</Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-10">
                <h4 className="font-semibold">
                  {loaderData.post.replies} Replies
                </h4>
                <div className="flex flex-col gap-5">
                  {loaderData.replies.map((reply) => (
                    <Reply
                      username={reply.user.name}
                      avatarUrl={reply.user.avatar}
                      content={reply.content}
                      timestamp={reply.created_at}
                      topLevel={true}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5 rounded-lg border p-6 shadow-sm xl:col-span-2">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className="flex flex-col items-start">
              <h4 className="text-lg font-medium">
                {loaderData.post.author_name}
              </h4>
              <Badge variant="secondary" className="capitalize">
                {loaderData.post.author_role}
              </Badge>
            </div>
          </div>
          <div className="gap-2 text-sm flex flex-col">
            <span>
              🌱 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at, {
                zone: "utc",
              }).toRelative()}{" "}
              ago
            </span>
            <span>👏 Shared {loaderData.post.applauses} applauses</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow Journey
          </Button>
        </aside>
      </div>
    </div>
  );
}
