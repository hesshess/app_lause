import type { Route } from "./+types/applause-page";

export function loader(_args: Route.LoaderArgs) {
    return {};
}

export function action(_args: Route.ActionArgs) {
    return {};
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "applause page | app_lause" },
        { name: "description", content: "applause page" },
    ];
};

export default function Page(_props: Route.ComponentProps) {
    return (
        <div className="px-20 py-10">
            <h1 className="text-3xl font-bold capitalize">applause page</h1>
        </div>
    );
}
