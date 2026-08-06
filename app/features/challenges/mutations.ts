import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "~/supa-client";
import type { formSchema } from "./pages/submit-challenges-page";

export const createChallenge = async (
  client: SupabaseClient<Database>,
  data: z.infer<typeof formSchema>
) => {
  const { data: challengeData, error } = await client
    .from("challenges")
    .insert({
      title: data.title,
      overview: data.overview,
      goal: data.goal,
      instructions: data.instructions,
      benefits: data.benefits,
      tags: data.tags,
      host_name: data.host_name,
      thumbnail_url: data.thumbnail_url,
      location: data.location,
      challenge_type: data.challenge_type as
        | "mindset"
        | "wellness"
        | "focus",
      participation_type: data.participation_type as "solo" | "pair" | "group",
      duration: data.duration,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return challengeData;
};
