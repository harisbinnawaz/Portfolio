export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  outcomes: string[];
  techStack: string[];
  highlight: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  videoSrc: string;
  thumbnailSrc: string;
  category: string;
}

export interface AchievementItem {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  pdfLink: string | null;
  category: "Award" | "Leadership" | "Sports" | "Society";
  icon: "trophy" | "users" | "map" | "shield" | "award";
  size: "large" | "medium" | "small";
}

export interface TechSkill {
  name: string;
  proficiency: string;
}

export type TechArsenal = Record<string, TechSkill[]>;
