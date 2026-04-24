import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/message-page";
import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { MessageBubble } from "../components/message-bubble";
import { Textarea } from "~/common/components/ui/textarea";
import { SendIcon } from "lucide-react";

export function loader({ params }: Route.LoaderArgs) {
  return { messageId: params.messageId };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Message ${params.messageId} | app_lause` },
  ];
};

export default function MessagePage() {
    return (
     <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/stevejobs.png" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <CardTitle className="text-xl">Steve Jobs</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/stevejobs.png"
            avatarFallback="S"
            content="this is a message from steve jobs in iheaven, make sure to reply because if you don't, you will be punished."
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Write a message..."
              rows={2}
              className="resize-none"
            />
            <Button type="submit" size="icon" className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}