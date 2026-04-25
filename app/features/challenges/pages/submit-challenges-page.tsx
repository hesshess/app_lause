import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-challenges-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import {
  CHALLENGE_DURATION_RANGES,
  CHALLENGE_PARTICIPATION_TYPES,
  CHALLENGE_TYPES,
} from "../constants";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit a Challenge | app_lause" },
    { name: "description", content: "Create a new challenge" },
  ];
};

export default function SubmitChallengesPage() {
  return (
    <div>
      <Hero
        title="Create a Challenge"
        description="Start a challenge that helps people take small actions for themselves"
      />

      <Form className="mx-auto flex max-w-6xl flex-col items-center gap-10">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <InputPair
            label="Challenge Title"
            description="(40 characters max)"
            name="title"
            maxLength={40}
            type="text"
            id="title"
            required
            placeholder="i.e 7-Day Morning Walk Challenge"
          />

          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="i.e A simple challenge to help you start your day with energy and clarity."
            textArea
          />

          <InputPair
            id="goal"
            label="Goal"
            description="(200 characters max)"
            name="goal"
            maxLength={200}
            type="text"
            required
            placeholder="i.e Build a healthier morning routine"
            textArea
          />

          <InputPair
            id="instructions"
            label="Instructions"
            description="(400 characters max, comma separated if needed)"
            name="instructions"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Walk for 20 minutes every morning, take a photo, and reflect on how you feel"
            textArea
          />

          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="i.e Better mood, more energy, improved focus"
            textArea
          />

          <InputPair
            id="tags"
            label="Tags"
            description="(100 characters max, comma separated)"
            name="tags"
            maxLength={100}
            type="text"
            required
            placeholder="i.e wellness, mindset, routine"
            textArea
          />

          <InputPair
            id="hostName"
            label="Host Name"
            description="(40 characters max)"
            name="hostName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Hess"
          />

          <InputPair
            id="thumbnailUrl"
            label="Thumbnail URL"
            description="Paste an image URL for the challenge cover"
            name="thumbnailUrl"
            type="url"
            required
            placeholder="i.e https://example.com/challenge-cover.png"
          />

          <InputPair
            id="location"
            label="Location"
            description="(40 characters max)"
            name="location"
            maxLength={40}
            type="text"
            required
            placeholder="i.e Online, Seoul, Montreal"
          />

          <SelectPair
            label="Challenge Type"
            description="Select the type of challenge"
            name="challengeType"
            required
            placeholder="Select the type of challenge"
            options={CHALLENGE_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />

          <SelectPair
            label="Participation Type"
            description="Choose how people will join this challenge"
            name="participationType"
            required
            placeholder="Select participation type"
            options={CHALLENGE_PARTICIPATION_TYPES.map((type) => ({
              label: type.label,
              value: type.value,
            }))}
          />

          <SelectPair
            label="Duration"
            description="Select the challenge duration"
            name="duration"
            required
            placeholder="Select the challenge duration"
            options={CHALLENGE_DURATION_RANGES.map((range) => ({
              label: range,
              value: range,
            }))}
          />
        </div>

        <Button type="submit" className="w-full max-w-sm" size="lg">
          Create Challenge
        </Button>
      </Form>
    </div>
  );
}
