import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const toggleIdeaLike = async (
  client: SupabaseClient<Database>,
  { ideaId, userId }: { ideaId: number; userId: string },
) => {
  const { data: existingLike, error: lookupError } = await client
    .from("idea_likes")
    .select("idea_id")
    .eq("idea_id", ideaId)
    .eq("profile_id", userId)
    .maybeSingle();
  if (lookupError) throw lookupError;

  const { error } = existingLike
    ? await client
        .from("idea_likes")
        .delete()
        .eq("idea_id", ideaId)
        .eq("profile_id", userId)
        .select("idea_id")
        .single()
    : await client.from("idea_likes").insert({
        idea_id: ideaId,
        profile_id: userId,
      });
  if (error) throw error;
};

export const claimIdea = async (
  client: SupabaseClient<Database>,
  { ideaId, userId }: { ideaId: string; userId: string }
) => {
  const { error } = await client
    .from("ideas")
    .update({ claimed_by: userId, claimed_at: new Date().toISOString() })
    .eq("idea_id", Number(ideaId));
  if (error) {
    throw error;
  }
};

export const insertIdeas = async (
  client: SupabaseClient<Database>,
  ideas: string[]
) => {
  const { error } = await client.from("ideas").insert(
    ideas.map((title) => ({
      title,
    }))
  );
  if (error) {
    throw error;
  }
};
