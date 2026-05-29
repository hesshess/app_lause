import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createProductReview = async (
  client: SupabaseClient<Database>,
  {
    applauseId,
    praise,
    rating,
    userId,
  }: { applauseId: string; praise: string; rating: number; userId: string }
) => {
  const { error } = await client.from("praises").insert({
    applause_id: +applauseId,
    content: praise,
    rating,
    profile_id: userId,
  });
  if (error) {
    throw error;
  }
};