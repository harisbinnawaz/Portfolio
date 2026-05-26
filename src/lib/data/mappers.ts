import type {
  DbAchievement,
  DbExperience,
  DbMechanicsVideo,
  DbTechnicalCategory,
  DbTechnicalSkill,
} from "@/types/database";
import type { AchievementItem, ExperienceItem, VideoItem } from "@/types";

const ACHIEVEMENT_CATEGORIES = ["Award", "Leadership", "Sports", "Society"] as const;
const ACHIEVEMENT_ICONS = ["trophy", "users", "map", "shield", "award"] as const;
const ACHIEVEMENT_SIZES = ["large", "medium", "small"] as const;

function asAchievementCategory(
  value: string
): AchievementItem["category"] {
  return ACHIEVEMENT_CATEGORIES.includes(value as AchievementItem["category"])
    ? (value as AchievementItem["category"])
    : "Award";
}

function asAchievementIcon(value: string): AchievementItem["icon"] {
  return ACHIEVEMENT_ICONS.includes(value as AchievementItem["icon"])
    ? (value as AchievementItem["icon"])
    : "award";
}

function asAchievementSize(value: string): AchievementItem["size"] {
  return ACHIEVEMENT_SIZES.includes(value as AchievementItem["size"])
    ? (value as AchievementItem["size"])
    : "medium";
}

export function mapExperience(row: DbExperience): ExperienceItem {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    location: row.location,
    type: row.employment_type,
    outcomes: row.outcomes,
    techStack: row.tech_stack,
    highlight: row.highlight,
  };
}

export function mapMechanicsVideo(row: DbMechanicsVideo): VideoItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    techStack: row.tech_stack,
    category: row.category,
    videoSrc: row.video_url,
    thumbnailSrc: row.thumbnail_url,
  };
}

export function mapAchievement(row: DbAchievement): AchievementItem {
  return {
    id: row.id,
    label: row.label,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    pdfLink: row.pdf_link,
    category: asAchievementCategory(row.category),
    icon: asAchievementIcon(row.icon),
    size: asAchievementSize(row.size),
  };
}

export function mapTechArsenal(
  categories: DbTechnicalCategory[],
  skills: DbTechnicalSkill[]
): Record<string, { name: string; proficiency: string }[]> {
  const sortedCategories = [...categories].sort((a, b) => a.sort_order - b.sort_order);
  const result: Record<string, { name: string; proficiency: string }[]> = {};

  for (const category of sortedCategories) {
    const categorySkills = skills
      .filter((s) => s.category_id === category.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({ name: s.name, proficiency: s.proficiency }));
    result[category.name] = categorySkills;
  }

  return result;
}

export function sortMechanicsForGallery(videos: VideoItem[], featuredId?: string): VideoItem[] {
  const sorted = [...videos];
  if (featuredId) {
    const idx = sorted.findIndex((v) => v.id === featuredId);
    if (idx > 0) {
      const [featured] = sorted.splice(idx, 1);
      if (featured) sorted.unshift(featured);
    }
  }
  return sorted;
}
