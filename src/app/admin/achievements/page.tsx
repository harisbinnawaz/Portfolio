"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadToBucket } from "@/lib/storage/upload";
import {
  adminButtonGhostClass,
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";
import type { DbAchievement } from "@/types/database";

const CATEGORIES = ["Award", "Leadership", "Sports", "Society"] as const;
const ICONS = ["trophy", "users", "map", "shield", "award"] as const;
const SIZES = ["large", "medium", "small"] as const;

const emptyForm = (): Omit<DbAchievement, "id" | "created_at" | "updated_at"> => ({
  label: "",
  title: "",
  subtitle: "",
  description: "",
  pdf_link: null,
  category: "Award",
  icon: "award",
  size: "medium",
  sort_order: 0,
});

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<DbAchievement[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("achievements")
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
    setPdfFile(null);
  };

  const startEdit = (row: DbAchievement) => {
    setEditingId(row.id);
    setForm({
      label: row.label,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      pdf_link: row.pdf_link,
      category: row.category,
      icon: row.icon,
      size: row.size,
      sort_order: row.sort_order,
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      let pdfLink = form.pdf_link;
      if (pdfFile) pdfLink = await uploadToBucket(supabase, "certificates", pdfFile);

      const payload = {
        ...form,
        pdf_link: pdfLink,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("achievements")
          .update(payload)
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("achievements").insert(payload);
        if (insertError) throw insertError;
      }

      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    }

    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this achievement?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("achievements").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else await load();
  };

  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Achievements</h2>

      <form onSubmit={(e) => void save(e)} className="mt-8 space-y-4 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Label</label>
            <input className={adminInputClass} value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Title</label>
            <input className={adminInputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Subtitle</label>
            <input className={adminInputClass} value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Sort Order</label>
            <input type="number" className={adminInputClass} value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} />
          </div>
          <div>
            <label className={adminLabelClass}>Category</label>
            <select className={adminInputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClass}>Icon</label>
            <select className={adminInputClass} value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}>
              {ICONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClass}>Size</label>
            <select className={adminInputClass} value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}>
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={adminLabelClass}>Description</label>
          <textarea className={`${adminInputClass} min-h-[80px]`} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
        </div>
        <div>
          <label className={adminLabelClass}>Certificate PDF (optional)</label>
          <input type="file" accept="application/pdf,.pdf" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)} className="block w-full text-sm text-luxury-silver/60" />
          {form.pdf_link && <p className="mt-1 truncate text-xs text-luxury-silver/40">{form.pdf_link}</p>}
        </div>
        {error && <p className="text-sm text-red-400/90">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={adminButtonPrimaryClass}>
            {saving ? "Saving…" : editingId ? "Update" : "Create"}
          </button>
          {editingId && <button type="button" onClick={resetForm} className={adminButtonGhostClass}>Cancel</button>}
        </div>
      </form>

      <div className="mt-10 space-y-3">
        {loading && <p className="text-sm text-luxury-silver/50">Loading…</p>}
        {items.map((row) => (
          <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal-600/30 bg-charcoal-800/30 px-5 py-4">
            <div>
              <p className="font-serif text-luxury-ivory">{row.title}</p>
              <p className="text-sm text-luxury-gold/70">{row.label} · {row.size}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => startEdit(row)} className={adminButtonGhostClass}>Edit</button>
              <button type="button" onClick={() => void remove(row.id)} className="border border-red-900/40 px-4 py-2 text-sm text-red-300/80">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
