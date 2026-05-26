"use client";

import { MECHANICS_VIDEOS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "./VideoCard";

export function MechanicsGallery() {
  return (
    <div id="mechanics">
      <SectionHeading
        title="Mechanics & Systems"
        subtitle="[Insert 1-sentence description of what this body of work represents — engineering depth, breadth of systems, etc.]"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {MECHANICS_VIDEOS.map((item, index) => (
          <div key={item.id} className={index === 0 ? "lg:col-span-2" : undefined}>
            <VideoCard item={item} isHero={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
