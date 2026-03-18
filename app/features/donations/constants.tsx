export const DONATION_TYPES = [
  {label:"One-time",
    value: "one-time",
  },
  {label:"Recurring",
    value: "recurring",
  },
  {label:"Goal-based",
    value: "goal-based",
  },
  {label:"Matching",
    value: "matching",
  },
] as const;

export const DONATION_REGIONS_TYPES = [
  {label: "Global", value:"global"},
  {label: "Asia", value:"asia"},
  {label: "Europe", value:"europe"},
  {label: "North America", value:"namerica"},
  {label: "South America", value:"samerica"},
  {label: "Africa", value:"africa"},
  {label: "Oceania", value:"oceania"},
] as const;

export const DONATION_PARTICIPATION_TYPES = [
  {label: "In Person", value:"inperson"},
  {label: "Online", value:"online"},
  {label: "Hybrid", value:"hybrid"},
] as const;

export const DONATION_GOAL_RANGES_TYPES = [
  "Under $100",
  "$100 - $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000+",
] as const;

export const DONATION_RANGES_TYPES = [
  "Under $50",
  "$50 - $200",
  "$200 - $500",
  "$500 - $1,000",
  "$1,000+",
] as const;