import { SectionHeading } from "@/components/ui/SectionHeading";
import type { AchievementItem } from "@/types";
import { BentoCard } from "./BentoCard";

interface AchievementsBentoProps {
  items: AchievementItem[];
}

export function AchievementsBento({ items }: AchievementsBentoProps) {
  return (
    <div id="recognition">
      <SectionHeading title="Recognition & Leadership" />

      <div className="grid grid-cols-6 gap-4">
        {items.map((item) => (
          <BentoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
