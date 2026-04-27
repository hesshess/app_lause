CREATE TYPE "public"."applause_category" AS ENUM('mindset', 'wellness', 'focus', 'routine', 'reflection', 'learning', 'creativity', 'relationships', 'energy');--> statement-breakpoint
CREATE TABLE "applause_upvotes" (
	"applause_id" bigint,
	"profile_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applause_upvotes_applause_id_profile_id_pk" PRIMARY KEY("applause_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "applauses" (
	"applause_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applauses_applause_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"icon" text NOT NULL,
	"url" text NOT NULL,
	"applause_count" integer DEFAULT 0 NOT NULL,
	"views_count" integer DEFAULT 0 NOT NULL,
	"praises_count" integer DEFAULT 0 NOT NULL,
	"profile_id" uuid NOT NULL,
	"category_id" bigint,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"category_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"value" "applause_category" NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "praises" (
	"praise_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "praises_praise_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"applause_id" bigint,
	"profile_id" uuid,
	"rating" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rating_check" CHECK ("praises"."rating" BETWEEN 1 AND 5)
);
--> statement-breakpoint
ALTER TABLE "applause_upvotes" ADD CONSTRAINT "applause_upvotes_applause_id_applauses_applause_id_fk" FOREIGN KEY ("applause_id") REFERENCES "public"."applauses"("applause_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applause_upvotes" ADD CONSTRAINT "applause_upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applauses" ADD CONSTRAINT "applauses_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applauses" ADD CONSTRAINT "applauses_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praises" ADD CONSTRAINT "praises_applause_id_applauses_applause_id_fk" FOREIGN KEY ("applause_id") REFERENCES "public"."applauses"("applause_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praises" ADD CONSTRAINT "praises_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;