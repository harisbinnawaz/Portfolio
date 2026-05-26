import { ACHIEVEMENTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoCard } from "./BentoCard";

export function AchievementsBento() {
  return (
    <div id="recognition">
      <SectionHeading title="Recognition & Leadership" />

      <div className="grid grid-cols-6 gap-4">
        {ACHIEVEMENTS.map((item) => (
          <BentoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
