"use client";

import { useState } from "react";

const SOCIAL_LINKS = [
  { label: "GitHub", handle: "[Insert GitHub Handle]", href: "[Insert GitHub URL]" },
  { label: "LinkedIn", handle: "[Insert LinkedIn Handle]", href: "[Insert LinkedIn URL]" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to form submission API (Resend / Formspree / Server Action)
  };

  return (
    <footer id="contact" className="px-6 pb-8 pt-section md:px-16 lg:px-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-serif text-2xl text-luxury-ivory">[Insert Full Name]</h2>
          <p className="mt-2 font-sans text-sm text-luxury-silver/70">
            [Insert Professional Title]
          </p>
          <p className="mt-4 font-sans text-sm font-light text-luxury-warm/70">
            [Insert Full Degree Name]
          </p>
          <p className="font-sans text-sm font-light text-luxury-warm/70">
            [Insert University Name]
          </p>
          <p className="mt-2 font-mono text-xs text-luxury-silver/50">CGPA: 3.28</p>

          <ul className="mt-8 space-y-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-luxury-warm/80 transition-colors hover:text-luxury-gold"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-luxury-gold/60">
                    {link.label}
                  </span>
                  <span className="font-sans text-sm">{link.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs text-luxury-silver/50">
              Full Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-charcoal-600/40 bg-charcoal-800 px-4 py-3 font-sans text-sm text-luxury-warm outline-none placeholder:text-luxury-silver/30 focus:border-luxury-gold/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs text-luxury-silver/50">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-charcoal-600/40 bg-charcoal-800 px-4 py-3 font-sans text-sm text-luxury-warm outline-none placeholder:text-luxury-silver/30 focus:border-luxury-gold/50"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block font-mono text-xs text-luxury-silver/50">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-charcoal-600/40 bg-charcoal-800 px-4 py-3 font-sans text-sm text-luxury-warm outline-none placeholder:text-luxury-silver/30 focus:border-luxury-gold/50"
              placeholder="Subject"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs text-luxury-silver/50">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full resize-y border border-charcoal-600/40 bg-charcoal-800 px-4 py-3 font-sans text-sm text-luxury-warm outline-none placeholder:text-luxury-silver/30 focus:border-luxury-gold/50"
              placeholder="Your message"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-luxury-gold py-3 font-sans text-sm font-medium text-charcoal-950 transition-colors hover:bg-luxury-warm"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="divider my-10" />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-luxury-silver/30">
          © {year} [Insert Full Name]. All rights reserved.
        </p>
        <p className="font-mono text-xs text-luxury-silver/30">Crafted with precision.</p>
      </div>
    </footer>
  );
}
