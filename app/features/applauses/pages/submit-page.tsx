import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Applause | app_lause" },
    { name: "description", content: "Submit your applauses" },
  ];
};

export default function SubmitPage(_props: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <Hero
        title="Submit Your Product"
        description="Share your good deed with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-2xl mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your applause"
            id="name"
            name="name"
            type="text"
            placeholder="Name of your good deed"
          />
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your good deed"
          />
          <InputPair
            label="URL"
            description="The URL of your applause"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your applause"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your applause"
          />
          <SelectPair
            label="Category"
            description="The category of your applause"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "Volunteering", value: "volunteering" },
              { label: "Helping Neighbors", value: "helping-neighbors" },
              { label: "Environmental Action", value: "environment" },
              { label: "Charity Donation", value: "donation" },
              { label: "Community Service", value: "community-service" },
              { label: "Kindness Challenge", value: "kindness" },
              { label: "Education Support", value: "education" },
              { label: "Animal Rescue", value: "animal-rescue" },
              { label: "Food Sharing", value: "food-sharing" },
            ]}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-4xl shadow-2xl overflow-hidden">
            {icon ? (
              <img src={icon} className="object-cover w-full h-full" />
            ) : null}
          </div>
          <Label className="flex flex-col gap-1">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your applause.
            </small>
          </Label>
          <Input
            type="file"
            onChange={onChange}
            required
            name="icon"
          />
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>Recomended size: 128x128px</span>
            <span>Allowed formats: PNG, JPEG</span>
            <span>Max file size: 1MB</span>
          </div>
          <Button type="submit" className="w-xs" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
