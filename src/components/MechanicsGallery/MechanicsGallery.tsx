"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { sortMechanicsForGallery } from "@/lib/data/mappers";
import type { VideoItem } from "@/types";
import { VideoCard } from "./VideoCard";

interface MechanicsGalleryProps {
  items: VideoItem[];
  featuredId?: string;
  subtitle?: string;
}

export function MechanicsGallery({
  items,
  featuredId,
  subtitle = "[Insert 1-sentence description of what this body of work represents — engineering depth, breadth of systems, etc.]",
}: MechanicsGalleryProps) {
  const sorted = sortMechanicsForGallery(items, featuredId);

  return (
    <div id="mechanics">
      <SectionHeading title="Mechanics & Systems" subtitle={subtitle} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {sorted.map((item, index) => (
          <div key={item.id} className={index === 0 ? "lg:col-span-2" : undefined}>
            <VideoCard item={item} isHero={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
