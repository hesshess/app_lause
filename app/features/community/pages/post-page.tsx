import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/post-page";

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

export default function PostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Community Post
        </h1>
        <p className="text-muted-foreground">
          You are viewing post <strong>{loaderData.postId}</strong>.
        </p>
        <p className="text-lg leading-7 text-foreground">
          This placeholder route is ready for the detailed post content,
          replies, and moderation actions.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to="/community">Back to community</Link>
      </Button>
    </div>
  );
}
