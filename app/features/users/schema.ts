import {
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", { id: uuid().primaryKey() });

export const roles = pgEnum("role", [
  "habit-builder",
  "mindful-learner",
  "accountability-partner",
  "growth-coach",
  "reflective-writer",
  "other",
]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text().notNull(),
  bio: text().notNull(),
  role: roles().default("habit-builder").notNull(),
  stats: jsonb().$type<{ followers: number; following: number }>(),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
export const follows = pgTable("follows", {
  follower_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  following_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
});
