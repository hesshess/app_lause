import type { SupabaseClient } from "@supabase/supabase-js";
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

export const toggleApplauseUpvote = async (
  client: SupabaseClient<Database>,
  { applauseId, userId }: { applauseId: string; userId: string },
) => {
  const { count, error: countError } = await client
    .from("applause_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("applause_id", Number(applauseId))
    .eq("profile_id", userId);
  if (countError) throw countError;

  if (count === 0) {
    const { error } = await client.from("applause_upvotes").insert({
      applause_id: Number(applauseId),
      profile_id: userId,
    });
    if (error) throw error;
    return;
  }

  const { error } = await client
    .from("applause_upvotes")
    .delete()
    .eq("applause_id", Number(applauseId))
    .eq("profile_id", userId);
  if (error) throw error;
};
