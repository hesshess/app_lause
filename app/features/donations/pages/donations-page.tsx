import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/donations-page";
import { DonaCard } from "../components/dona-card";
import { Button } from "~/common/components/ui/button";
import { DONATION_RANGES_TYPES, DONATION_REGIONS_TYPES, DONATION_TYPES } from "../constants";
import { Link, useSearchParams } from "react-router";

export function loader(_args: Route.LoaderArgs) {
  return {};
}

export function action(_args: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Donations | app_lause" },
    { name: "description", content: "Browse donation opportunities" },
  ];
};

export default function DonationsPage(_props: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams, { preventScrollReset: true });
  }
  return (
    <div className="space-y-20">
      <Hero
        title="Donations"
        description="Support organizations and causes making a difference."
      />
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-3 col-span-4 gap-5">
          {Array.from({ length: 11 }).map((_, index) => (
            <DonaCard
              key={`donaId-${index}`}
              id={`donaId-${index}`}
              organizationLogoSrc="https://github.com/unicef.png"
              organizationName="Unicef"
              postedAt="11 hours ago"
              title="Support Children in Crisis"
              tags={["Regular Donation", "Singular Donation"]}
              amountLabel="$10 / month"
              locationLabel="Gaza Strip, Palestine"
              donateButtonLabel="Donate now"
            />
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
           <div className="flex flex-wrap gap-2">
             {DONATION_TYPES.map((type)=>(
              <Button variant ="outline" onClick={()=>onFilterClick("type", type.value)} className={type.value === searchParams.get("type") ? "bg-accent" : ""}>{type.label}</Button>
            ))}
           </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
           <div className="flex flex-wrap gap-2">
             {DONATION_REGIONS_TYPES.map((region)=>(
              <Button variant ="outline" onClick={()=>onFilterClick("region", region.value)} className={region.value === searchParams.get("region") ? "bg-accent" : ""}>{region.label}</Button>
            ))}
           </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
           <div className="flex flex-wrap gap-2">
             {DONATION_RANGES_TYPES.map((range)=>(
              <Button variant ="outline" onClick={()=>onFilterClick("range", range)} className={range === searchParams.get("range") ? "bg-accent" : ""}>{range}</Button>
            ))}
           </div>
          </div>
        </div>
      </div>
    </div>
  );
}
