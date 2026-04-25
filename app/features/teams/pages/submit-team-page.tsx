import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-team-page";
import SelectPair from "~/common/components/select-pair";


export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Team | app_lause" },
    { name: "description", content: "Create a new team for self-growth" },
  ];
};

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Team"
        description="Start a team and gather people around a shared growth goal."
      />
      <Form className="mx-auto flex max-w-screen-2xl flex-col items-center gap-10">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <InputPair
            label="What is your team name?"
            description="(20 characters max)"
            placeholder="i.e Morning Reset Circle"
            name="name"
            maxLength={20}
            type="text"
            id="name"
            required
          />
          <SelectPair
            label="What kind of team is this?"
            description="Select the stage your team is in"
            name="stage"
            required
            placeholder="Select your team stage"
            options={[
              { label: "Just starting", value: "starting" },
              { label: "Looking for first members", value: "first-members" },
              { label: "Already active", value: "active" },
              { label: "Growing the circle", value: "expanding" },
            ]}
          />
          <InputPair
            label="How many people are already on your team?"
            description="(1-100)"
            name="size"
            max={100}
            min={1}
            type="number"
            id="size"
            required
          />
          <InputPair
            label="How many new members are you looking for?"
            description="(1-100)"
            name="openSpots"
            max={100}
            min={1}
            type="number"
            id="openSpots"
            required
          />
          <InputPair
            label="What kinds of help are you looking for?"
            placeholder="Accountability partners, writers, builders, listeners"
            description="(comma separated)"
            name="roles"
            type="text"
            id="roles"
            required
          />
          <InputPair
            label="What is your team working on?"
            description="(200 characters max)"
            placeholder="i.e We help each other build better routines through daily check-ins, weekly reflection, and shared goals."
            name="description"
            maxLength={200}
            type="text"
            id="description"
            required
            textArea
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Team
        </Button>
      </Form>
    </div>
  );
}
