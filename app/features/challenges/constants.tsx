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
    label: "Productivity",
    value: "productivity",
  },
] as const;

export const CHALLENGE_PARTICIPATION_TYPES = [
  {
    label: "Solo",
    value: "solo",
  },
  {
    label: "With Friends",
    value: "with-friends",
  },
  {
    label: "Community",
    value: "community",
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
