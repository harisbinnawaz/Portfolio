"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { themeVarsFromSettings } from "@/lib/theme/defaults";
import { DEFAULT_SITE_SETTINGS } from "@/lib/theme/defaults";
import {
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";
import type { DbSiteSettings } from "@/types/database";

const COLOR_FIELDS = [
  { key: "background_primary", label: "Background Primary" },
  { key: "background_secondary", label: "Background Secondary" },
  { key: "text_primary", label: "Text Primary" },
  { key: "text_secondary", label: "Text Secondary" },
  { key: "accent_primary", label: "Accent Primary" },
  { key: "accent_secondary", label: "Accent Secondary" },
  { key: "card_background", label: "Card Background" },
  { key: "border_color", label: "Border Color" },
] as const;

type ColorKey = (typeof COLOR_FIELDS)[number]["key"];

export default function AdminThemePage() {
  const [settingsId, setSettingsId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...DEFAULT_SITE_SETTINGS });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const applyPreview = useCallback((values: typeof form) => {
    const vars = themeVarsFromSettings(values);
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
    if (data) {
      setSettingsId(data.id);
      setForm({
        site_title: data.site_title ?? DEFAULT_SITE_SETTINGS.site_title,
        seo_description: data.seo_description ?? DEFAULT_SITE_SETTINGS.seo_description,
        background_primary: data.background_primary ?? DEFAULT_SITE_SETTINGS.background_primary!,
        background_secondary: data.background_secondary ?? DEFAULT_SITE_SETTINGS.background_secondary!,
        text_primary: data.text_primary ?? DEFAULT_SITE_SETTINGS.text_primary!,
        text_secondary: data.text_secondary ?? DEFAULT_SITE_SETTINGS.text_secondary!,
        accent_primary: data.accent_primary ?? DEFAULT_SITE_SETTINGS.accent_primary!,
        accent_secondary: data.accent_secondary ?? DEFAULT_SITE_SETTINGS.accent_secondary!,
        card_background: data.card_background ?? DEFAULT_SITE_SETTINGS.card_background!,
        border_color: data.border_color ?? DEFAULT_SITE_SETTINGS.border_color!,
      });
      applyPreview({
        site_title: data.site_title ?? DEFAULT_SITE_SETTINGS.site_title,
        seo_description: data.seo_description ?? DEFAULT_SITE_SETTINGS.seo_description,
        background_primary: data.background_primary ?? DEFAULT_SITE_SETTINGS.background_primary!,
        background_secondary: data.background_secondary ?? DEFAULT_SITE_SETTINGS.background_secondary!,
        text_primary: data.text_primary ?? DEFAULT_SITE_SETTINGS.text_primary!,
        text_secondary: data.text_secondary ?? DEFAULT_SITE_SETTINGS.text_secondary!,
        accent_primary: data.accent_primary ?? DEFAULT_SITE_SETTINGS.accent_primary!,
        accent_secondary: data.accent_secondary ?? DEFAULT_SITE_SETTINGS.accent_secondary!,
        card_background: data.card_background ?? DEFAULT_SITE_SETTINGS.card_background!,
        border_color: data.border_color ?? DEFAULT_SITE_SETTINGS.border_color!,
      });
    }
  }, [applyPreview]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateColor = (key: ColorKey, value: string) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      applyPreview(next);
      return next;
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const payload: Partial<DbSiteSettings> = {
      ...form,
      updated_at: new Date().toISOString(),
    };

    if (settingsId) {
      const { error } = await supabase.from("site_settings").update(payload).eq("id", settingsId);
      if (error) setMessage(error.message);
      else setMessage("Theme saved. Changes are live on the portfolio.");
    } else {
      const { data, error } = await supabase.from("site_settings").insert(payload).select("id").single();
      if (error) setMessage(error.message);
      else {
        setSettingsId(data.id);
        setMessage("Theme created.");
      }
    }

    setSaving(false);
  };

  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Theme & Branding</h2>
      <p className="mt-2 font-sans text-sm text-luxury-silver/60">
        Adjust palette variables. Preview updates instantly.
      </p>

      <form onSubmit={(e) => void save(e)} className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
          <div>
            <label className={adminLabelClass}>Site Title</label>
            <input
              className={adminInputClass}
              value={form.site_title ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, site_title: e.target.value }))}
            />
          </div>
          <div>
            <label className={adminLabelClass}>SEO Description</label>
            <textarea
              className={`${adminInputClass} min-h-[80px]`}
              value={form.seo_description ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, seo_description: e.target.value }))}
            />
          </div>

          {COLOR_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className={adminLabelClass}>{label}</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  value={form[key] ?? "#000000"}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="h-10 w-14 cursor-pointer border border-charcoal-600/40 bg-transparent"
                  aria-label={label}
                />
                <input
                  className={adminInputClass}
                  value={form[key] ?? ""}
                  onChange={(e) => updateColor(key, e.target.value)}
                />
              </div>
            </div>
          ))}

          {message && <p className="text-sm text-luxury-gold/80">{message}</p>}
          <button type="submit" disabled={saving} className={adminButtonPrimaryClass}>
            {saving ? "Saving…" : "Save Theme"}
          </button>
        </div>

        <div className="border border-charcoal-600/30 bg-charcoal-800/40 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-luxury-gold/60">
            Live Preview
          </p>
          <div className="mt-6 space-y-4 rounded-sm border border-charcoal-600/30 p-6" style={{ background: form.card_background ?? undefined }}>
            <h3 className="font-serif text-2xl" style={{ color: form.text_primary ?? undefined }}>
              Editorial Headline
            </h3>
            <p className="font-sans text-sm" style={{ color: form.text_secondary ?? undefined }}>
              Secondary body copy reflecting your engineering narrative.
            </p>
            <span
              className="inline-block px-4 py-2 font-sans text-sm font-medium"
              style={{
                background: form.accent_primary ?? undefined,
                color: form.background_primary ?? undefined,
              }}
            >
              Primary Action
            </span>
            <div className="h-px w-full" style={{ background: form.border_color ?? undefined }} />
            <p className="font-mono text-xs" style={{ color: form.accent_secondary ?? undefined }}>
              Accent secondary · luxury warm tone
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
