import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/challenge-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `Challenge Details | app_lause` },
    { name: "description", content: "View details for a challenge campaign" },
  ];
};

export default function ChallengePage() {
  return (
    <div>
      <div className="bg-linear-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 gap-20 items-start -mt-30">
        <div className="col-span-4 space-y-10">
          <div className="space-y-5">
            <div className="size-40 bg-white rounded-full border-white overflow-hidden relative left-10">
              <img
                src="https://github.com/unicef.png"
                className="object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold">Support Children in Crisis</h1>
            <h4 className="text-sm text-muted-foreground">Unicef</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Matching</Badge>
            <Badge variant="secondary">Africa</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptates corrupti ut quis cum alias unde consequuntur possimus
              modi quasi dolor, dolorum ea tenetur suscipit culpa tempora
              voluptatibus omnis? Numquam, sequi!
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {["asdfasdf", "asdfasf", "asdfasf", "fasfasdf"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {["asdfasdf", "asdfasf", "asdfasf", "fasfasdf"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {["asdfasdf", "asdfasf", "asdfasf", "fasfasdf"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {["asdfasdf", "asdfasf", "asdfasf", "fasfasdf"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 sticky top-20 border rounded-lg mt-40 p-6 space-y-5">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Range</span>
            <span className="text-2xl font-medium">$10 ~ $50</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Region</span>
            <span className="text-2xl font-medium">Africa</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Recurring</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">Posted 2 days ago</span>
            <DotIcon className="size-4"/>
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>
            <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
