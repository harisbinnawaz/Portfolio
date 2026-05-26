"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/mechanics", label: "Mechanics" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/arsenal", label: "Arsenal" },
  { href: "/admin/theme", label: "Theme" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-luxury-warm">
      <header className="border-b border-charcoal-600/30 bg-charcoal-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-luxury-gold/60">
              Portfolio CMS
            </p>
            <h1 className="font-serif text-2xl text-luxury-ivory">Executive Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-sans text-sm text-luxury-silver/60 hover:text-luxury-ivory">
              View Site
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="border border-charcoal-600/40 px-4 py-2 font-sans text-sm text-luxury-warm/70 hover:border-luxury-gold/40"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[220px_1fr] md:px-10">
        <nav className="space-y-1">
          {NAV.map((item) => {
            const active =
              "exact" in item && item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block border-l-2 px-4 py-2.5 font-sans text-sm transition-colors",
                  active
                    ? "border-luxury-gold bg-charcoal-800/60 text-luxury-ivory"
                    : "border-transparent text-luxury-silver/60 hover:border-charcoal-600 hover:text-luxury-warm"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
