"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadToBucket } from "@/lib/storage/upload";
import { TagInput } from "@/components/admin/TagInput";
import {
  adminButtonGhostClass,
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";
import type { DbMechanicsVideo } from "@/types/database";

const emptyForm = (): Omit<
  DbMechanicsVideo,
  "id" | "created_at" | "updated_at" | "video_url" | "thumbnail_url"
> & { video_url: string; thumbnail_url: string } => ({
  title: "",
  description: "",
  tech_stack: [],
  category: "",
  video_url: "",
  thumbnail_url: "",
  featured: false,
  sort_order: 0,
});

export default function AdminMechanicsPage() {
  const [items, setItems] = useState<DbMechanicsVideo[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("mechanics_videos")
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
    setVideoFile(null);
    setThumbFile(null);
  };

  const startEdit = (row: DbMechanicsVideo) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      description: row.description,
      tech_stack: row.tech_stack,
      category: row.category,
      video_url: row.video_url,
      thumbnail_url: row.thumbnail_url,
      featured: row.featured,
      sort_order: row.sort_order,
    });
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      let videoUrl = form.video_url;
      let thumbnailUrl = form.thumbnail_url;

      if (videoFile) videoUrl = await uploadToBucket(supabase, "videos", videoFile);
      if (thumbFile) thumbnailUrl = await uploadToBucket(supabase, "thumbnails", thumbFile);

      if (!videoUrl || !thumbnailUrl) {
        throw new Error("Video and thumbnail are required.");
      }

      if (form.featured) {
        await supabase.from("mechanics_videos").update({ featured: false }).neq("id", editingId ?? "");
      }

      const payload = {
        title: form.title,
        description: form.description,
        tech_stack: form.tech_stack,
        category: form.category,
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
        featured: form.featured,
        sort_order: form.sort_order,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("mechanics_videos")
          .update(payload)
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("mechanics_videos").insert(payload);
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
    if (!confirm("Delete this mechanics video?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("mechanics_videos").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else await load();
  };

  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Mechanics & Systems</h2>
      <p className="mt-2 font-sans text-sm text-luxury-silver/60">
        Upload MP4 demos and thumbnails to Supabase Storage.
      </p>

      <form onSubmit={(e) => void save(e)} className="mt-8 space-y-4 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
        <h3 className="font-serif text-lg text-luxury-ivory">
          {editingId ? "Edit Video" : "New Video"}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Title</label>
            <input className={adminInputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Category</label>
            <input className={adminInputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Sort Order</label>
            <input type="number" className={adminInputClass} value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 font-sans text-sm text-luxury-warm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
              Featured (hero slot)
            </label>
          </div>
        </div>
        <div>
          <label className={adminLabelClass}>Description</label>
          <textarea className={`${adminInputClass} min-h-[100px]`} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
        </div>
        <TagInput label="Tech Stack" values={form.tech_stack} onChange={(tech_stack) => setForm((f) => ({ ...f, tech_stack }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Video (MP4)</label>
            <input type="file" accept="video/mp4,.mp4" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} className="block w-full text-sm text-luxury-silver/60" />
            {form.video_url && <p className="mt-1 truncate text-xs text-luxury-silver/40">{form.video_url}</p>}
          </div>
          <div>
            <label className={adminLabelClass}>Thumbnail</label>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)} className="block w-full text-sm text-luxury-silver/60" />
            {form.thumbnail_url && <p className="mt-1 truncate text-xs text-luxury-silver/40">{form.thumbnail_url}</p>}
          </div>
        </div>
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
        {loading && <p className="text-sm text-luxury-silver/50">Loading…</p>}
        {items.map((row) => (
          <div key={row.id} className="flex flex-wrap items-center justify-between gap-3 border border-charcoal-600/30 bg-charcoal-800/30 px-5 py-4">
            <div>
              <p className="font-serif text-luxury-ivory">{row.title}</p>
              <p className="text-xs text-luxury-gold/70">{row.category}{row.featured ? " · Featured" : ""}</p>
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
