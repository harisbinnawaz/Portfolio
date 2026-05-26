"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { themeVarsFromSettings } from "@/lib/theme/defaults";
import type { DbSiteSettings } from "@/types/database";

interface ThemeProviderProps {
  initialSettings: Partial<DbSiteSettings> | null;
  children: React.ReactNode;
}

function applyTheme(settings: Partial<DbSiteSettings> | null) {
  const vars = themeVarsFromSettings(settings);
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function ThemeProvider({ initialSettings, children }: ThemeProviderProps) {
  useEffect(() => {
    applyTheme(initialSettings);

    if (!isSupabaseConfigured()) return;

    const supabase = createClient();

    const channel = supabase
      .channel("site_settings_theme")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_settings" },
        async () => {
          const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
          if (data) applyTheme(data);
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [initialSettings]);

  return <>{children}</>;
}
