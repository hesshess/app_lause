CREATE TYPE "public"."team_stage" AS ENUM('starting', 'first-members', 'active', 'expanding');--> statement-breakpoint
CREATE TABLE "teams" (
	"team_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teams_team_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"stage" "team_stage" NOT NULL,
	"size" integer NOT NULL,
	"open_spots" integer NOT NULL,
	"roles" text NOT NULL,
	"description" text NOT NULL,
	"leader_profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_name_check" CHECK (LENGTH("teams"."name") <= 20),
	CONSTRAINT "team_size_check" CHECK ("teams"."size" BETWEEN 1 AND 100),
	CONSTRAINT "open_spots_check" CHECK ("teams"."open_spots" BETWEEN 1 AND 100),
	CONSTRAINT "team_description_check" CHECK (LENGTH("teams"."description") <= 200)
);
--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_leader_profile_id_profiles_profile_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;