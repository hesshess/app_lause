import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role:
      | "habit-builder"
      | "mindful-learner"
      | "accountability-partner"
      | "growth-coach"
      | "reflective-writer"
      | "other";
    headline: string;
    bio: string;
  },
) => {
  const { error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);
  if (error) {
    throw error;
  }
};
