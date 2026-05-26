import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline/ExperienceTimeline";
import { MechanicsGallery } from "@/components/MechanicsGallery/MechanicsGallery";
import { AchievementsBento } from "@/components/AchievementsBento/AchievementsBento";
import { TechnicalArsenal } from "@/components/TechnicalArsenal/TechnicalArsenal";
import { Footer } from "@/components/Footer/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-charcoal-950">
      <Navigation />
      <Hero />
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <ExperienceTimeline />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <MechanicsGallery />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <AchievementsBento />
      </section>
      <SectionDivider />
      <section className="px-6 py-section md:px-16 lg:px-24">
        <TechnicalArsenal />
      </section>
      <SectionDivider />
      <Footer />
    </main>
  );
}
