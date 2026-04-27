CREATE TYPE "public"."challenge_duration" AS ENUM('1 - 3 days', '4 - 7 days', '1 - 2 weeks', '2 - 4 weeks', '1 - 2 months', '2 months+');--> statement-breakpoint
CREATE TYPE "public"."challenge_participation_type" AS ENUM('solo', 'pair', 'group');--> statement-breakpoint
CREATE TYPE "public"."challenge_type" AS ENUM('mindset', 'wellness', 'focus');--> statement-breakpoint
CREATE TABLE "challenges" (
	"challenge_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "challenges_challenge_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"overview" varchar NOT NULL,
	"goal" varchar NOT NULL,
	"instructions" text NOT NULL,
	"benefits" text NOT NULL,
	"tags" text NOT NULL,
	"host_name" varchar NOT NULL,
	"thumbnail_url" text NOT NULL,
	"location" varchar NOT NULL,
	"challenge_type" "challenge_type" NOT NULL,
	"participation_type" "challenge_participation_type" NOT NULL,
	"duration" "challenge_duration" NOT NULL,
	"views_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
