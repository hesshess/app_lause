import { DateTime } from "luxon";
import { PAGE_SIZE } from "./constant";
import type { Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export const applauseListSelect = `
  applause_id,
  name,
  tagline,
  upvotes:stats->>upvotes,
  views:stats->>views,
  praises:stats->>praises
`;

export const getApplausesByDateRange = async (
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
    page = 1,
  }: {
    startDate: DateTime;
    endDate: DateTime;
    page?: number;
  },
) => {
  const { data, error } = await client
    .from("applauses")
    .select(applauseListSelect)
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getApplausePagesByDateRange = async (
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
  }: {
    startDate: DateTime;
    endDate: DateTime;
  },
) => {
  const { count, error } = await client
    .from("applauses")
    .select(`applause_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description");
  if (error) throw error;
  return data;
};

export const getCategory = async (
  client: SupabaseClient<Database>,
  { categoryId }: { categoryId: number },
) => {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getApplausesByCategory = async (
  client: SupabaseClient<Database>,
  {
    categoryId,
    page,
  }: {
    categoryId: number;
    page: number;
  },
) => {
  const { data, error } = await client
    .from("applauses")
    .select(applauseListSelect)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getCategoryPages = async (
  client: SupabaseClient<Database>,
  { categoryId }: { categoryId: number },
) => {
  const { count, error } = await client
    .from("applauses")
    .select(`applause_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getApplausesBySearch = async (
  client: SupabaseClient<Database>,
  {
    query,
    page,
  }: {
    query: string;
    page: number;
  },
) => {
  const { data, error } = await client
    .from("applauses")
    .select(applauseListSelect)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getPagesBySearch = async (
  client: SupabaseClient<Database>,
  { query }: { query: string },
) => {
  const { count, error } = await client
    .from("applauses")
    .select(`applause_id`, { count: "exact", head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getApplauseById = async (
  client: SupabaseClient<Database>,
  { applauseId }: { applauseId: number },
) => {
  const { data, error } = await client
    .from("applause_overview_view")
    .select("*")
    .eq("applause_id", applauseId)
    .single();
  if (error) throw error;
  return data;
};

export const getPraises = async (
  client: SupabaseClient<Database>,
  { applauseId }: { applauseId: number },
) => {
  const { data, error } = await client
    .from("praises")
    .select(
      `
        praise_id,
        rating,
        content,
        created_at,
        user:profiles!inner(
          name,username,avatar
        )
      `,
    )
    .eq("applause_id", applauseId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};
