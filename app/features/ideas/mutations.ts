import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

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