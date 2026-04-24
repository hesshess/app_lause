import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export function loader({ params }: Route.LoaderArgs) {
  return { username: params.username };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.username}'s Posts | app_lause` },
    {
      name: "description",
      content: "View reflections and posts from this user",
    },
  ];
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={`postId-${index}`}
          id={`postId-${index}`}
          title="What I learned from tracking one habit for a week"
          author={loaderData.username ?? "Nico"}
          avatarSrc="https://github.com/apple.png"
          category="Reflection"
          postedAt="12 hours ago"
          expanded
        />
      ))}
    </div>
  );
}
