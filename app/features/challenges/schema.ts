import {
  bigint,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  CHALLENGE_DURATION_RANGES,
  CHALLENGE_PARTICIPATION_TYPES,
  CHALLENGE_TYPES,
} from "./constants";

export const challengeTypes = pgEnum(
  "challenge_type",
  CHALLENGE_TYPES.map((type) => type.value) as [string, ...string[]],
);
export const challengeParticipationTypes = pgEnum(
  "challenge_participation_type",
  CHALLENGE_PARTICIPATION_TYPES.map((type) => type.value) as [
    string,
    ...string[],
  ],
);
export const challengeDurationRanges = pgEnum(
  "challenge_duration",
  [...CHALLENGE_DURATION_RANGES] as [string, ...string[]],
);

export const challenges = pgTable("challenges", {
  challenge_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  overview: varchar().notNull(),
  goal: varchar().notNull(),
  instructions: text().notNull(),
  benefits: text().notNull(),
  tags: text().notNull(),
  host_name: varchar().notNull(),
  thumbnail_url: text().notNull(),
  location: varchar().notNull(),
  challenge_type: challengeTypes().notNull(),
  participation_type: challengeParticipationTypes().notNull(),
  duration: challengeDurationRanges().notNull(),
  views_count: integer().notNull().default(0),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
