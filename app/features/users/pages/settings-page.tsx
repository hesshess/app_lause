import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/settings-page";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { useState, type ChangeEvent } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | app_lause" },
    {
      name: "description",
      content: "Manage your self-growth profile and preferences",
    },
  ];
};

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20 ">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-6 xl:gap-20">
        <div className="flex flex-col gap-10 xl:col-span-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Edit growth profile</h2>
            <p className="text-muted-foreground">
              Help others understand what you are building, practicing, and
              improving.
            </p>
          </div>
          <Form className="flex w-full flex-col gap-5 lg:w-2/3 xl:w-1/2">
            <InputPair
              label="Name"
              description="Your public display name"
              required
              id="name"
              name="name"
              placeholder="i.e Alex Kim"
            />
            <SelectPair
              label="Growth identity"
              description="Choose the identity that best describes your current focus"
              name="role"
              placeholder="Select your growth identity"
              options={[
                { label: "Habit Builder", value: "habit-builder" },
                { label: "Mindful Learner", value: "mindful-learner" },
                {
                  label: "Accountability Partner",
                  value: "accountability-partner",
                },
                { label: "Growth Coach", value: "growth-coach" },
                { label: "Reflective Writer", value: "reflective-writer" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Headline"
              description="A short summary of your current growth focus"
              required
              id="headline"
              name="headline"
              placeholder="i.e Building calmer mornings and a consistent writing habit."
              textArea
            />
            <InputPair
              label="Bio"
              description="Share your current growth goal or routine"
              required
              id="bio"
              name="bio"
              placeholder="i.e I am building a consistent morning routine and practicing weekly reflection."
              textArea
            />
            <Button className="w-full">Save growth profile</Button>
          </Form>
        </div>
        <aside className="rounded-lg border p-6 shadow-md xl:col-span-2">
          <Label className="flex flex-col gap-1">
            Profile photo
            <small className="text-muted-foreground">
              This appears on your public growth profile.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-32 overflow-hidden rounded-full shadow-xl sm:size-40">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Selected profile preview"
                  className="object-cover w-full h-full"
                />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-full sm:w-1/2"
              onChange={onChange}
              required
              name="icon"
            />
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className=" text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className=" text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update profile photo</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
