CREATE TYPE "public"."applause_category" AS ENUM('mindset', 'wellness', 'focus', 'routine', 'reflection', 'learning', 'creativity', 'relationships', 'energy');--> statement-breakpoint
CREATE TYPE "public"."challenge_duration" AS ENUM('1 - 3 days', '4 - 7 days', '1 - 2 weeks', '2 - 4 weeks', '1 - 2 months', '2 months+');--> statement-breakpoint
CREATE TYPE "public"."challenge_participation_type" AS ENUM('solo', 'pair', 'group');--> statement-breakpoint
CREATE TYPE "public"."challenge_type" AS ENUM('mindset', 'wellness', 'focus');--> statement-breakpoint
CREATE TYPE "public"."community_topic" AS ENUM('self-growth', 'wellness', 'mindset', 'routine', 'reflection');--> statement-breakpoint
CREATE TYPE "public"."team_stage" AS ENUM('starting', 'first-members', 'active', 'expanding');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('follow', 'praise', 'reply', 'mention');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('habit-builder', 'mindful-learner', 'accountability-partner', 'growth-coach', 'reflective-writer', 'other');--> statement-breakpoint
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
	"stats" jsonb DEFAULT '{"views":0,"praises":0}'::jsonb NOT NULL,
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
--> statement-breakpoint
CREATE TABLE "post_replies" (
	"post_reply_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "post_replies_post_reply_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"post_id" bigint,
	"parent_id" bigint,
	"profile_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_upvotes" (
	"post_id" bigint,
	"profile_id" uuid,
	CONSTRAINT "post_upvotes_post_id_profile_id_pk" PRIMARY KEY("post_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"post_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "posts_post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"upvotes" bigint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"topic_id" bigint NOT NULL,
	"profile_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"topic_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "topics_topic_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"value" "community_topic" NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idea_likes" (
	"idea_id" bigint,
	"profile_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "idea_likes_idea_id_profile_id_pk" PRIMARY KEY("idea_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "ideas" (
	"idea_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ideas_idea_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"views_count" integer DEFAULT 0 NOT NULL,
	"claimed_at" timestamp,
	"claimed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "follows" (
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_room_members" (
	"message_room_id" bigint NOT NULL,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "message_room_members_message_room_id_profile_id_pk" PRIMARY KEY("message_room_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "message_rooms" (
	"message_room_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "message_rooms_message_room_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"message_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "messages_message_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"message_room_id" bigint NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"is_seen" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notifications_notification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"source_id" uuid,
	"applause_id" bigint,
	"post_id" bigint,
	"target_id" uuid NOT NULL,
	"type" "notification_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"avatar" text,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"headline" text,
	"bio" text,
	"role" "role" DEFAULT 'habit-builder' NOT NULL,
	"stats" jsonb,
	"views" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applause_upvotes" ADD CONSTRAINT "applause_upvotes_applause_id_applauses_applause_id_fk" FOREIGN KEY ("applause_id") REFERENCES "public"."applauses"("applause_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applause_upvotes" ADD CONSTRAINT "applause_upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applauses" ADD CONSTRAINT "applauses_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applauses" ADD CONSTRAINT "applauses_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praises" ADD CONSTRAINT "praises_applause_id_applauses_applause_id_fk" FOREIGN KEY ("applause_id") REFERENCES "public"."applauses"("applause_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "praises" ADD CONSTRAINT "praises_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_parent_id_post_replies_post_reply_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."post_replies"("post_reply_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_replies" ADD CONSTRAINT "post_replies_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_upvotes" ADD CONSTRAINT "post_upvotes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_topic_id_topics_topic_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("topic_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_likes" ADD CONSTRAINT "idea_likes_idea_id_ideas_idea_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."ideas"("idea_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "idea_likes" ADD CONSTRAINT "idea_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_claimed_by_profiles_profile_id_fk" FOREIGN KEY ("claimed_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_leader_profile_id_profiles_profile_id_fk" FOREIGN KEY ("leader_profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profiles_profile_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profiles_profile_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_room_members" ADD CONSTRAINT "message_room_members_message_room_id_message_rooms_message_room_id_fk" FOREIGN KEY ("message_room_id") REFERENCES "public"."message_rooms"("message_room_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_room_members" ADD CONSTRAINT "message_room_members_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_message_room_id_message_rooms_message_room_id_fk" FOREIGN KEY ("message_room_id") REFERENCES "public"."message_rooms"("message_room_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_profiles_profile_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_source_id_profiles_profile_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_target_id_profiles_profile_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;