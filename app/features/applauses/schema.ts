import {
  bigint,
  check,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const applauseCategories = pgEnum("applause_category", [
  "mindset",
  "wellness",
  "focus",
  "routine",
  "reflection",
  "learning",
  "creativity",
  "relationships",
  "energy",
]);

export const categories = pgTable("categories", {
  category_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  value: applauseCategories().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const applauses = pgTable("applauses", {
  applause_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  tagline: text().notNull(),
  description: text().notNull(),
  icon: text().notNull(),
  url: text().notNull(),
  stats: jsonb().notNull().default({ views: 0, praises: 0, upvotes: 0 }),
  profile_id: uuid()
    .references(() => profiles.profile_id, { onDelete: "cascade" })
    .notNull(),
  category_id: bigint({ mode: "number" }).references(
    () => categories.category_id,
    { onDelete: "no action" },
  ),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const applause_upvotes = pgTable(
  "applause_upvotes",
  {
    applause_id: bigint({ mode: "number" }).references(
      () => applauses.applause_id,
      {
        onDelete: "cascade",
      },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.applause_id, table.profile_id] })],
);

export const praises = pgTable(
  "praises",
  {
    praise_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    applause_id: bigint({ mode: "number" }).references(
      () => applauses.applause_id,
      {
        onDelete: "cascade",
      },
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    rating: integer().notNull(),
    content: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)],
);
