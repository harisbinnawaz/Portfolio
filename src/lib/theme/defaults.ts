import type { DbSiteSettings } from "@/types/database";

export const DEFAULT_SITE_SETTINGS: Omit<DbSiteSettings, "id" | "updated_at"> = {
  site_title: "[Your Full Name] — Senior Software & Game Tools Engineer",
  seo_description:
    "Portfolio of a seasoned Software & Game Tools Engineer specializing in real-time systems, engine tooling, and scalable architecture.",
  background_primary: "#0a0a0a",
  background_secondary: "#111111",
  text_primary: "#f5f0e8",
  text_secondary: "#9ca3af",
  accent_primary: "#b89c6e",
  accent_secondary: "#e8e0d0",
  card_background: "#1a1a1a",
  border_color: "#2e2e2e",
};

export function themeVarsFromSettings(
  settings: Partial<DbSiteSettings> | null
): Record<string, string> {
  const s = { ...DEFAULT_SITE_SETTINGS, ...settings };
  return {
    "--bg-primary": s.background_primary ?? DEFAULT_SITE_SETTINGS.background_primary!,
    "--bg-secondary": s.background_secondary ?? DEFAULT_SITE_SETTINGS.background_secondary!,
    "--text-primary": s.text_primary ?? DEFAULT_SITE_SETTINGS.text_primary!,
    "--text-secondary": s.text_secondary ?? DEFAULT_SITE_SETTINGS.text_secondary!,
    "--accent-primary": s.accent_primary ?? DEFAULT_SITE_SETTINGS.accent_primary!,
    "--accent-secondary": s.accent_secondary ?? DEFAULT_SITE_SETTINGS.accent_secondary!,
    "--card-bg": s.card_background ?? DEFAULT_SITE_SETTINGS.card_background!,
    "--border-color": s.border_color ?? DEFAULT_SITE_SETTINGS.border_color!,
  };
}

export function themeStyleObject(
  settings: Partial<DbSiteSettings> | null
): Record<string, string> {
  return themeVarsFromSettings(settings);
}
