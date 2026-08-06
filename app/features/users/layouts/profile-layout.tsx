import { Form, Link, NavLink, Outlet, useOutletContext } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import type { Route } from "./+types/profile-layout";
import { getUserProfile } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ params }) => {
  return [{ title: `${params.username}'s Profile | app_lause` }];
};


export const loader = async ({
  params,
  request,
}: Route.LoaderArgs ) => {
  const { client } = makeSSRClient(request);
  const user = await getUserProfile(client, { username: params.username });
  return { user };
};

export default function ProfileLayout({
  loaderData,
  params,
}: Route.ComponentProps & { params: { username: string } }) {
  const { isLoggedIn, username } = useOutletContext<{
    isLoggedIn: boolean;
    username?: string;
  }>();
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <Avatar className="size-24 sm:size-32 lg:size-40">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl">
              {loaderData.user.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
       <h1 className="text-2xl font-semibold">{loaderData.user.name}</h1>
             {isLoggedIn && username === params.username ? (
              <Button variant="outline" asChild>
                <Link to="/my/settings">Edit profile</Link>
              </Button>
            ) : null}
            {isLoggedIn && username !== params.username ? (
              <>
                <Button variant="secondary">Follow</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Message</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="space-y-4">
                      <span className="text-sm text-muted-foreground">
                        Send a message to John Doe
                      </span>
                      <Form className="space-y-4">
                        <Textarea
                          placeholder="Message"
                          className="resize-none"
                          rows={4}
                        />
                        <Button type="submit">Send</Button>
                      </Form>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
         <span className="text-sm text-muted-foreground">
              @{loaderData.user.username}
            </span>
            <Badge variant={"secondary"} className="capitalize">
              {loaderData.user.role}
            </Badge>
            <Badge variant={"secondary"}>100 followers</Badge>
            <Badge variant={"secondary"}>100 following</Badge>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {[
          { label: "About", to: `/users/${loaderData.user.username}` },
          {
            label: "Applauses",
            to: `/users/${loaderData.user.username}/applauses`,
          },
          { label: "Posts", to: `/users/${loaderData.user.username}/posts` },
        ].map((item) => (
          <NavLink
            end
            key={item.label}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-accent text-foreground",
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-3xl">
          <Outlet
          context={{
            headline: loaderData.user.headline,
            bio: loaderData.user.bio,
          }}
        />
      </div>
    </div>
  );
}
