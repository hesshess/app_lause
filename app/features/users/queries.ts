import client from "~/supa-client";
import { features } from "process";
import { applauseListSelect } from "../applauses/queries";

export const getUserProfile = async (username: string) => {
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

export const getUserApplauses = async (username: string) => {
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

export const getUserPosts = async (username: string) => {
  const { data, error } = await client
    .from("posts")
    .select(
      `
*,
author:profile_id!inner(username)
`,
    )
    .eq("profile_id.username", username);
  if (error) {
    throw error;
  }
  return data;
};
