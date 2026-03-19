import type { Route } from "./+types/submit-challenges-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Challenge | app_lause" },
    { name: "description", content: "Create a new challenge" },
  ];
};

export default function SubmitChallengesPage() {
  return (
    <div className="max-w-2xl space-y-6">
    </div>
  );
}
