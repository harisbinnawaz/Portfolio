import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { DEFAULT_SITE_SETTINGS } from "@/lib/theme/defaults";
import {
  mapAchievement,
  mapExperience,
  mapMechanicsVideo,
  mapTechArsenal,
} from "@/lib/data/mappers";
import type { DbSiteSettings } from "@/types/database";
import type { AchievementItem, ExperienceItem, VideoItem } from "@/types";

export async function getSiteSettings(): Promise<DbSiteSettings | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();

  return data;
}

export async function getExperience(): Promise<ExperienceItem[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data) return [];
  return data.map(mapExperience);
}

export async function getMechanicsVideos(): Promise<{
  items: VideoItem[];
  featuredId: string | undefined;
}> {
  if (!isSupabaseConfigured()) return { items: [], featuredId: undefined };

  const supabase = await createClient();
  const { data } = await supabase
    .from("mechanics_videos")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data) return { items: [], featuredId: undefined };

  const featured = data.find((row) => row.featured);
  const items = data.map(mapMechanicsVideo);

  return { items, featuredId: featured?.id };
}

export async function getAchievements(): Promise<AchievementItem[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("sort_order", { ascending: true });

  if (!data) return [];
  return data.map(mapAchievement);
}

export async function getTechArsenal(): Promise<
  Record<string, { name: string; proficiency: string }[]>
> {
  if (!isSupabaseConfigured()) return {};

  const supabase = await createClient();

  const [{ data: categories }, { data: skills }] = await Promise.all([
    supabase.from("technical_categories").select("*").order("sort_order", { ascending: true }),
    supabase.from("technical_skills").select("*").order("sort_order", { ascending: true }),
  ]);

  if (!categories || !skills) return {};
  return mapTechArsenal(categories, skills);
}

export function resolveSiteSettings(row: DbSiteSettings | null): Omit<
  DbSiteSettings,
  "id" | "updated_at"
> & { id?: string } {
  if (!row) return { ...DEFAULT_SITE_SETTINGS };
  return {
    id: row.id,
    site_title: row.site_title ?? DEFAULT_SITE_SETTINGS.site_title,
    seo_description: row.seo_description ?? DEFAULT_SITE_SETTINGS.seo_description,
    background_primary: row.background_primary ?? DEFAULT_SITE_SETTINGS.background_primary,
    background_secondary: row.background_secondary ?? DEFAULT_SITE_SETTINGS.background_secondary,
    text_primary: row.text_primary ?? DEFAULT_SITE_SETTINGS.text_primary,
    text_secondary: row.text_secondary ?? DEFAULT_SITE_SETTINGS.text_secondary,
    accent_primary: row.accent_primary ?? DEFAULT_SITE_SETTINGS.accent_primary,
    accent_secondary: row.accent_secondary ?? DEFAULT_SITE_SETTINGS.accent_secondary,
    card_background: row.card_background ?? DEFAULT_SITE_SETTINGS.card_background,
    border_color: row.border_color ?? DEFAULT_SITE_SETTINGS.border_color,
  };
}
