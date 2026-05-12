import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

type ChallengeType = Database["public"]["Enums"]["challenge_type"];
type ChallengeParticipationType =
  Database["public"]["Enums"]["challenge_participation_type"];
type ChallengeDuration = Database["public"]["Enums"]["challenge_duration"];

export const getChallenges = async (client: SupabaseClient<Database>,{
  limit,
  type,
  participationType,
  duration,
}: {
  limit: number;
  type?: ChallengeType;
  participationType?: ChallengeParticipationType;
  duration?: ChallengeDuration;
}) => {
  const baseQuery = client
    .from("challenges")
    .select(
      `
    challenge_id,
    title,
    overview,
    host_name,
    thumbnail_url,
    location,
    challenge_type,
    participation_type,
    duration,
    tags,
    views_count,
    created_at
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (type) {
    baseQuery.eq("challenge_type", type);
  }
  if (participationType) {
    baseQuery.eq("participation_type", participationType);
  }
  if (duration) {
    baseQuery.eq("duration", duration);
  }
  const { data, error } = await baseQuery;
  if (error) {
    throw error;
  }
  return data;
};


export const getChallengeById = async (client: SupabaseClient<Database>,{challengeId}:{challengeId: number}) => {
  const { data, error } = await client
    .from("challenges")
    .select("*")
    .eq("challenge_id", challengeId)
    .single();
  if (error) throw error;
  return data;
};