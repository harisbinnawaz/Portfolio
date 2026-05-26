import type { Metadata } from "next";
import { MotionSafe } from "@/components/providers/MotionSafe";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteSettings, resolveSiteSettings } from "@/lib/data/fetch";
import { themeStyleObject } from "@/lib/theme/defaults";
import { DEFAULT_SITE_SETTINGS } from "@/lib/theme/defaults";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const row = await getSiteSettings();
  const settings = resolveSiteSettings(row);

  const title = settings.site_title ?? DEFAULT_SITE_SETTINGS.site_title ?? "Portfolio";
  const description =
    settings.seo_description ?? DEFAULT_SITE_SETTINGS.seo_description ?? "";

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const row = await getSiteSettings();
  const settings = resolveSiteSettings(row);
  const themeStyle = themeStyleObject(settings);

  return (
    <html lang="en" className="dark" style={themeStyle}>
      <body className="font-sans antialiased">
        <ThemeProvider initialSettings={row}>
          <MotionSafe>{children}</MotionSafe>
        </ThemeProvider>
      </body>
    </html>
  );
}
