import type { Route } from "./+types/donation-page";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `Donation ${params.donaId} | app_lause` },
    { name: "description", content: "View details for a donation campaign" },
  ];
};

export default function DonationPage({
  params: { donaId },
}: Route.ComponentProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-bold">Donation {donaId}</h1>
      <p className="text-muted-foreground">
        This page will show the full details, beneficiary information, and
        contribution progress for the selected donation campaign.
      </p>
    </div>
  );
}
