"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TagInput } from "@/components/admin/TagInput";
import {
  adminButtonGhostClass,
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";
import type { DbExperience } from "@/types/database";

const emptyForm = (): Omit<DbExperience, "id" | "created_at" | "updated_at"> => ({
  role: "",
  company: "",
  period: "",
  location: "",
  employment_type: "",
  outcomes: [],
  tech_stack: [],
  highlight: "",
  sort_order: 0,
});

export default function AdminExperiencePage() {
  const [items, setItems] = useState<DbExperience[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
  };

  const startEdit = (row: DbExperience) => {
    setEditingId(row.id);
    setForm({
      role: row.role,
      company: row.company,
      period: row.period,
      location: row.location,
      employment_type: row.employment_type,
      outcomes: row.outcomes,
      tech_stack: row.tech_stack,
      highlight: row.highlight,
      sort_order: row.sort_order,
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { ...form, updated_at: new Date().toISOString() };

    let saveError: string | null = null;
    if (editingId) {
      const { error: updateError } = await supabase
        .from("experience")
        .update(payload)
        .eq("id", editingId);
      saveError = updateError?.message ?? null;
    } else {
      const { error: insertError } = await supabase.from("experience").insert(payload);
      saveError = insertError?.message ?? null;
    }

    setSaving(false);
    if (saveError) {
      setError(saveError);
      return;
    }
    resetForm();
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("experience").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else await load();
  };

  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Experience</h2>
      <p className="mt-2 font-sans text-sm text-luxury-silver/60">
        Create and edit professional tenure entries.
      </p>

      <form onSubmit={(e) => void save(e)} className="mt-8 space-y-4 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
        <h3 className="font-serif text-lg text-luxury-ivory">
          {editingId ? "Edit Entry" : "New Entry"}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["role", "Role"],
              ["company", "Company"],
              ["period", "Period"],
              ["location", "Location"],
              ["employment_type", "Employment Type"],
              ["highlight", "Highlight Metric"],
              ["sort_order", "Sort Order"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className={adminLabelClass}>{label}</label>
              <input
                className={adminInputClass}
                value={key === "sort_order" ? String(form.sort_order) : String(form[key])}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    [key]: key === "sort_order" ? Number(e.target.value) : e.target.value,
                  }))
                }
                required={key !== "sort_order"}
                type={key === "sort_order" ? "number" : "text"}
              />
            </div>
          ))}
        </div>
        <TagInput label="Outcomes" values={form.outcomes} onChange={(outcomes) => setForm((f) => ({ ...f, outcomes }))} />
        <TagInput label="Tech Stack" values={form.tech_stack} onChange={(tech_stack) => setForm((f) => ({ ...f, tech_stack }))} />
        {error && <p className="text-sm text-red-400/90">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={adminButtonPrimaryClass}>
            {saving ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className={adminButtonGhostClass}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-luxury-gold/60">
          Existing Entries
        </h3>
        {loading && <p className="text-sm text-luxury-silver/50">Loading…</p>}
        {items.map((row) => (
          <div
            key={row.id}
            className="flex flex-wrap items-center justify-between gap-3 border border-charcoal-600/30 bg-charcoal-800/30 px-5 py-4"
          >
            <div>
              <p className="font-serif text-luxury-ivory">{row.role}</p>
              <p className="text-sm text-luxury-gold">{row.company}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => startEdit(row)} className={adminButtonGhostClass}>
                Edit
              </button>
              <button
                type="button"
                onClick={() => void remove(row.id)}
                className="border border-red-900/40 px-4 py-2 text-sm text-red-300/80 hover:border-red-700/50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
