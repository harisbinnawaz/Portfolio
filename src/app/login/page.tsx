"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { adminInputClass, adminLabelClass, adminButtonPrimaryClass } from "@/components/admin/admin-styles";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-950 px-6">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184,156,110,0.4) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-md border border-charcoal-600/40 bg-charcoal-900/80 p-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold/60">
          Secure Access
        </p>
        <h1 className="mt-3 font-serif text-3xl text-luxury-ivory">Admin Sign In</h1>
        <div className="my-6 h-px w-12 bg-luxury-gold/50" />

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
          <div>
            <label htmlFor="email" className={adminLabelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              className={adminInputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className={adminLabelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className={adminInputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="font-sans text-sm text-red-400/90">{error}</p>}
          <button type="submit" disabled={loading} className={`w-full ${adminButtonPrimaryClass}`}>
            {loading ? "Signing in…" : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
