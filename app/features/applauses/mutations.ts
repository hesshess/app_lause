import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createApplauseReview = async (
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

export const createApplause = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    description,
    url,
    iconUrl,
    categoryId,
    userId,
  }: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    iconUrl: string;
    categoryId: number;
    userId: string;
  }
) => {
  const { data, error } = await client
    .from("applauses")
    .insert({
      name,
      tagline,
      description,
      url,
      icon: iconUrl,
      category_id: categoryId,
      profile_id: userId,
    })
    .select("applause_id")
    .single();
  if (error) throw error;
  return data.applause_id;
};