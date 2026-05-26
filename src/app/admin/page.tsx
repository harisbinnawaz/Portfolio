import Link from "next/link";

const SECTIONS = [
  {
    href: "/admin/experience",
    title: "Professional Tenure",
    description: "Manage roles, outcomes, and technical highlights.",
  },
  {
    href: "/admin/mechanics",
    title: "Mechanics & Systems",
    description: "Upload videos, thumbnails, and feature flagship work.",
  },
  {
    href: "/admin/achievements",
    title: "Recognition",
    description: "Edit bento achievements and certificate PDFs.",
  },
  {
    href: "/admin/arsenal",
    title: "Technical Arsenal",
    description: "Organize skill categories and proficiency levels.",
  },
  {
    href: "/admin/theme",
    title: "Theme & Branding",
    description: "Control palette variables reflected across the portfolio.",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="font-serif text-display-lg text-luxury-ivory">Content Overview</h2>
      <p className="mt-3 max-w-xl font-sans text-sm font-light text-luxury-silver/70">
        Select a section to manage portfolio content. Changes sync to the public site via
        Supabase.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block h-full border border-charcoal-600/30 bg-charcoal-800/50 p-6 transition-colors hover:border-luxury-gold/30 hover:bg-charcoal-800"
            >
              <h3 className="font-serif text-xl text-luxury-ivory">{section.title}</h3>
              <p className="mt-2 font-sans text-sm font-light text-luxury-warm/70">
                {section.description}
              </p>
              <span className="mt-4 inline-block font-mono text-xs tracking-wide text-luxury-gold">
                Manage →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
