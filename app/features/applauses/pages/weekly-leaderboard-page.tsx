import type { Route } from "./+types/leaderboard-page";

export function loader(_args: Route.LoaderArgs) {
    return {};
}

export function action(_args: Route.ActionArgs) {
    return {};
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "leaderboard page | app_lause" },
        { name: "description", content: "leaderboard page" },
    ];
};

export default function Page(_props: Route.ComponentProps) {
    return (
        <div className="px-20 py-10">
            <h1 className="text-3xl font-bold capitalize">leaderboard page</h1>
        </div>
    );
}
