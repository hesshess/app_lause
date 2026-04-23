import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.username}'s Profile | app_lause` },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  return { username: params.username };
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          @{loaderData.username} is building better routines through small,
          consistent actions and weekly reflection.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          Focused on self-growth, accountability, and turning everyday progress
          into habits that last.
        </p>
      </div>
    </div>
  );
}
