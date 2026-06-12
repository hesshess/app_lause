import type { Database } from "~/supa-client";
import { applauseListSelect } from "../applauses/queries";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `,
    )
    .eq("username", username)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string },
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        headline,
        bio,
        role
        `,
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserApplauses = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from("applauses")
    .select(
      `
        ${applauseListSelect},profiles!applauses_profile_id_profiles_profile_id_fk!inner(profile_id)
    `,
    )
    .eq("profiles.username", username);
  if (error) {
    throw error;
  }
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string },
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) {
    throw error;
  }
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};

export const getApplausesByUserId = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string },
) => {
  const { data, error } = await client
    .from("applauses")
    .select(`name, applause_id`)
    .eq("profile_id", userId);
  if (error) {
    throw error;
  }
  return data;
};
