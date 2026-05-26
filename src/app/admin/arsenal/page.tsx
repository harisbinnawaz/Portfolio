"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  adminButtonGhostClass,
  adminButtonPrimaryClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/admin-styles";
import type { DbTechnicalCategory, DbTechnicalSkill } from "@/types/database";

export default function AdminArsenalPage() {
  const [categories, setCategories] = useState<DbTechnicalCategory[]>([]);
  const [skills, setSkills] = useState<DbTechnicalSkill[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [skillForm, setSkillForm] = useState({ category_id: "", name: "", proficiency: "", sort_order: 0 });
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [{ data: cats }, { data: sk }] = await Promise.all([
      supabase.from("technical_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("technical_skills").select("*").order("sort_order", { ascending: true }),
    ]);
    setCategories(cats ?? []);
    setSkills(sk ?? []);
    if (cats?.[0]) {
      setSkillForm((f) => (f.category_id ? f : { ...f, category_id: cats[0].id }));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("technical_categories")
      .insert({ name: newCategory.trim(), sort_order: categories.length });
    if (insertError) setError(insertError.message);
    else {
      setNewCategory("");
      await load();
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete category and all its skills?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("technical_categories").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else await load();
  };

  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const payload = {
      category_id: skillForm.category_id,
      name: skillForm.name,
      proficiency: skillForm.proficiency,
      sort_order: skillForm.sort_order,
    };

    let saveError: string | null = null;
    if (editingSkillId) {
      const { error: updateError } = await supabase
        .from("technical_skills")
        .update(payload)
        .eq("id", editingSkillId);
      saveError = updateError?.message ?? null;
    } else {
      const { error: insertError } = await supabase.from("technical_skills").insert(payload);
      saveError = insertError?.message ?? null;
    }

    if (saveError) {
      setError(saveError);
      return;
    }

    setSkillForm({ category_id: skillForm.category_id, name: "", proficiency: "", sort_order: 0 });
    setEditingSkillId(null);
    await load();
  };

  const startEditSkill = (skill: DbTechnicalSkill) => {
    setEditingSkillId(skill.id);
    setSkillForm({
      category_id: skill.category_id,
      name: skill.name,
      proficiency: skill.proficiency,
      sort_order: skill.sort_order,
    });
  };

  const deleteSkill = async (id: string) => {
    const supabase = createClient();
    await supabase.from("technical_skills").delete().eq("id", id);
    await load();
  };

  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Technical Arsenal</h2>

      <section className="mt-8 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
        <h3 className="font-serif text-lg text-luxury-ivory">Categories</h3>
        <div className="mt-4 flex gap-2">
          <input
            className={adminInputClass}
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="button" onClick={() => void addCategory()} className={adminButtonPrimaryClass}>
            Add
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between border border-charcoal-600/20 px-4 py-2">
              <span className="text-luxury-warm">{cat.name}</span>
              <button type="button" onClick={() => void deleteCategory(cat.id)} className="text-xs text-red-300/80">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <form onSubmit={(e) => void saveSkill(e)} className="mt-8 space-y-4 border border-charcoal-600/30 bg-charcoal-800/40 p-6">
        <h3 className="font-serif text-lg text-luxury-ivory">
          {editingSkillId ? "Edit Skill" : "Add Skill"}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Category</label>
            <select
              className={adminInputClass}
              value={skillForm.category_id}
              onChange={(e) => setSkillForm((f) => ({ ...f, category_id: e.target.value }))}
              required
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelClass}>Skill Name</label>
            <input className={adminInputClass} value={skillForm.name} onChange={(e) => setSkillForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Proficiency</label>
            <input className={adminInputClass} value={skillForm.proficiency} onChange={(e) => setSkillForm((f) => ({ ...f, proficiency: e.target.value }))} required />
          </div>
          <div>
            <label className={adminLabelClass}>Sort Order</label>
            <input type="number" className={adminInputClass} value={skillForm.sort_order} onChange={(e) => setSkillForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} />
          </div>
        </div>
        {error && <p className="text-sm text-red-400/90">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" className={adminButtonPrimaryClass}>
            {editingSkillId ? "Update Skill" : "Add Skill"}
          </button>
          {editingSkillId && (
            <button
              type="button"
              onClick={() => {
                setEditingSkillId(null);
                setSkillForm({ category_id: skillForm.category_id, name: "", proficiency: "", sort_order: 0 });
              }}
              className={adminButtonGhostClass}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 space-y-6">
        {categories.map((cat) => (
          <div key={cat.id}>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-luxury-gold/60">{cat.name}</h4>
            <ul className="mt-2 space-y-2">
              {skills
                .filter((s) => s.category_id === cat.id)
                .map((skill) => (
                  <li key={skill.id} className="flex items-center justify-between border border-charcoal-600/20 px-4 py-2">
                    <span className="text-sm text-luxury-warm">
                      {skill.name} <span className="text-luxury-silver/50 italic">— {skill.proficiency}</span>
                    </span>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEditSkill(skill)} className={adminButtonGhostClass}>
                        Edit
                      </button>
                      <button type="button" onClick={() => void deleteSkill(skill.id)} className="text-xs text-red-300/80">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
