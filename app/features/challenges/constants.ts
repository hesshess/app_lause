export const CHALLENGE_TYPES = [
  {
    label: "Mindset",
    value: "mindset",
  },
  {
    label: "Wellness",
    value: "wellness",
  },
  {
    label: "Focus",
    value: "focus",
  },
] as const;

export const CHALLENGE_PARTICIPATION_TYPES = [
  {
    label: "Solo",
    value: "solo",
  },
  {
    label: "Pair",
    value: "pair",
  },
  {
    label: "Group",
    value: "group",
  },
] as const;

export const CHALLENGE_DURATION_RANGES = [
  "1 - 3 days",
  "4 - 7 days",
  "1 - 2 weeks",
  "2 - 4 weeks",
  "1 - 2 months",
  "2 months+",
] as const;
