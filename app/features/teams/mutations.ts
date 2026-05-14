import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

import type z from "zod";
import type { formSchema } from "./pages/submit-team-page";

export const createTeam = async (
  client: SupabaseClient<Database>,
  userId: string,
  team: z.infer<typeof formSchema>
) => {
  const { data, error } = await client
    .from("teams")
    .insert({
      leader_profile_id: userId,
      size: team.size,
      name: team.name,
      stage: team.stage as
        | "starting"
        | "first-members"
        | "active"
        | "expanding",
      description: team.description,
      roles: team.roles,
      open_spots: team.equity,
    })
    .select("team_id")
    .single();
  if (error) {
    throw error;
  }
  return data;
};