import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline/ExperienceTimeline";
import { MechanicsGallery } from "@/components/MechanicsGallery/MechanicsGallery";
import { AchievementsBento } from "@/components/AchievementsBento/AchievementsBento";
import { TechnicalArsenal } from "@/components/TechnicalArsenal/TechnicalArsenal";
import { Footer } from "@/components/Footer/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  getAchievements,
  getExperience,
  getMechanicsVideos,
  getTechArsenal,
} from "@/lib/data/fetch";

export default async function HomePage() {
  const [experience, mechanics, achievements, arsenal] = await Promise.all([
    getExperience(),
    getMechanicsVideos(),
    getAchievements(),
    getTechArsenal(),
  ]);

  return (
    <main className="min-h-screen bg-charcoal-950">
      <Navigation />
      <Hero />
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <ExperienceTimeline items={experience} />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <MechanicsGallery items={mechanics.items} featuredId={mechanics.featuredId} />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <AchievementsBento items={achievements} />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <TechnicalArsenal arsenal={arsenal} />
      </section>
      <SectionDivider />
      <Footer />
    </main>
  );
}
