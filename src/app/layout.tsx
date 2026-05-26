import type { Metadata } from "next";
import { MotionSafe } from "@/components/providers/MotionSafe";
import "./globals.css";

export const metadata: Metadata = {
  title: "[Your Full Name] — Senior Software & Game Tools Engineer",
  description:
    "Portfolio of a seasoned Software & Game Tools Engineer specializing in real-time systems, engine tooling, and scalable architecture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "[Your Full Name] — Senior Software & Game Tools Engineer",
    description: "[Insert SEO meta description — 155 characters max]",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <MotionSafe>{children}</MotionSafe>
      </body>
    </html>
  );
}
