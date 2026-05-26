-- Portfolio CMS — run in Supabase SQL Editor
-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── TABLES ───────────────────────────────────────────────────────────────────

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  location text not null,
  employment_type text not null,
  outcomes text[] not null default '{}',
  tech_stack text[] not null default '{}',
  highlight text not null,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists mechanics_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tech_stack text[] not null default '{}',
  category text not null,
  video_url text not null,
  thumbnail_url text not null,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  title text not null,
  subtitle text not null,
  description text not null,
  pdf_link text,
  category text not null,
  icon text not null,
  size text not null,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists technical_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists technical_skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references technical_categories(id) on delete cascade,
  name text not null,
  proficiency text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text,
  seo_description text,
  background_primary text,
  background_secondary text,
  text_primary text,
  text_secondary text,
  accent_primary text,
  accent_secondary text,
  card_background text,
  border_color text,
  updated_at timestamptz default now()
);

-- ─── SEED THEME ─────────────────────────────────────────────────────────────

insert into site_settings (
  site_title,
  seo_description,
  background_primary,
  background_secondary,
  text_primary,
  text_secondary,
  accent_primary,
  accent_secondary,
  card_background,
  border_color
)
select
  '[Your Full Name] — Senior Software & Game Tools Engineer',
  'Portfolio of a seasoned Software & Game Tools Engineer specializing in real-time systems and architecture.',
  '#0a0a0a',
  '#111111',
  '#f5f0e8',
  '#9ca3af',
  '#b89c6e',
  '#e8e0d0',
  '#1a1a1a',
  '#2e2e2e'
where not exists (select 1 from site_settings limit 1);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

alter table experience enable row level security;
alter table mechanics_videos enable row level security;
alter table achievements enable row level security;
alter table technical_categories enable row level security;
alter table technical_skills enable row level security;
alter table site_settings enable row level security;

-- Public read
create policy "Public read experience" on experience for select using (true);
create policy "Public read mechanics_videos" on mechanics_videos for select using (true);
create policy "Public read achievements" on achievements for select using (true);
create policy "Public read technical_categories" on technical_categories for select using (true);
create policy "Public read technical_skills" on technical_skills for select using (true);
create policy "Public read site_settings" on site_settings for select using (true);

-- Authenticated full access
create policy "Authenticated full access experience" on experience for all to authenticated using (true) with check (true);
create policy "Authenticated full access mechanics_videos" on mechanics_videos for all to authenticated using (true) with check (true);
create policy "Authenticated full access achievements" on achievements for all to authenticated using (true) with check (true);
create policy "Authenticated full access technical_categories" on technical_categories for all to authenticated using (true) with check (true);
create policy "Authenticated full access technical_skills" on technical_skills for all to authenticated using (true) with check (true);
create policy "Authenticated full access site_settings" on site_settings for all to authenticated using (true) with check (true);

-- ─── STORAGE BUCKETS (run in Storage UI or via API) ─────────────────────────────
-- Create buckets: videos, thumbnails, certificates, branding
-- Policies: public read, authenticated insert/update/delete
