export interface DbExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  employment_type: string;
  outcomes: string[];
  tech_stack: string[];
  highlight: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbMechanicsVideo {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  video_url: string;
  thumbnail_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbAchievement {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  pdf_link: string | null;
  category: string;
  icon: string;
  size: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DbTechnicalCategory {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface DbTechnicalSkill {
  id: string;
  category_id: string;
  name: string;
  proficiency: string;
  sort_order: number;
  created_at: string;
}

export interface DbSiteSettings {
  id: string;
  site_title: string | null;
  seo_description: string | null;
  background_primary: string | null;
  background_secondary: string | null;
  text_primary: string | null;
  text_secondary: string | null;
  accent_primary: string | null;
  accent_secondary: string | null;
  card_background: string | null;
  border_color: string | null;
  updated_at: string;
}
