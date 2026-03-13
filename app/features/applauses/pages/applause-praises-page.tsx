import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/applause-praises-page";

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Applause ${params.applauseId} Praises | app_lause` },
    { name: "description", content: "Praises for a single applause" },
  ];
};

export function loader({ params }: Route.LoaderArgs) {
  return { applauseId: params.applauseId };
}

export function action(_args: Route.ActionArgs) {
  return null;
}

export default function ApplausePraisesPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Applause Praises"
        description={`Praises for applause ${loaderData.applauseId}`}
      />
    </div>
  );
}
