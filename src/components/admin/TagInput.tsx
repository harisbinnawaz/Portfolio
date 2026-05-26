"use client";

import { useState } from "react";
import { adminInputClass, adminLabelClass } from "./admin-styles";

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function TagInput({ label, values, onChange, placeholder }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed || values.includes(trimmed)) return;
    onChange([...values, trimmed]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((v) => v !== tag));
  };

  return (
    <div>
      <span className={adminLabelClass}>{label}</span>
      <div className="flex gap-2">
        <input
          className={adminInputClass}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
        />
        <button type="button" onClick={addTag} className="border border-luxury-gold/40 px-3 text-sm text-luxury-gold">
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-sm bg-charcoal-700 px-2 py-1 font-sans text-xs text-luxury-silver/80"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-luxury-gold/70 hover:text-luxury-gold"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
