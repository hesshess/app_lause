import {
  bigint,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { TEAM_STAGES } from "./constans";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const teamStage = pgEnum(
  "team_stage",
  TEAM_STAGES.map((stage) => stage.value) as [string, ...string[]]
);

export const teams = pgTable(
  "teams",
  {
    team_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    name: text().notNull(),
    stage: teamStage().notNull(),
    size: integer().notNull(),
    open_spots: integer().notNull(),
    roles: text().notNull(),
    description: text().notNull(),
    leader_profile_id: uuid()
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      })
      .notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    check("team_name_check", sql`LENGTH(${table.name}) <= 20`),
    check("team_size_check", sql`${table.size} BETWEEN 1 AND 100`),
    check("open_spots_check", sql`${table.open_spots} BETWEEN 1 AND 100`),
    check("team_description_check", sql`LENGTH(${table.description}) <= 200`),
  ]
);
