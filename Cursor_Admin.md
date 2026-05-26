# Cursor_Admin.md — Dynamic CMS & Admin System Architecture
> **Portfolio Website — Dynamic Supabase-Powered CMS Platform**
> Feed this file into Cursor Composer/Agent. Execute sequentially and autonomously.
> Preserve the entire frontend visual identity, layout hierarchy, motion system, and “Quiet Luxury” aesthetic exactly as implemented.

---

# PRIME DIRECTIVES

1. NEVER alter the frontend visual language.
2. NEVER redesign layouts or change spacing systems.
3. NEVER remove Framer Motion animations.
4. NEVER replace Tailwind utility architecture.
5. NEVER introduce UI libraries like Material UI, Ant Design, Chakra, Bootstrap, DaisyUI, or ShadCN dashboards.
6. ONLY convert the data layer and theme system from static → dynamic.
7. Preserve all semantic HTML, accessibility, and typography hierarchy.
8. Keep the portfolio production-grade and editorial.
9. Use TypeScript strict mode everywhere.
10. Never use `any`.

---

# OBJECTIVE

Transform the current static Next.js App Router portfolio into a fully dynamic CMS-driven platform powered by Supabase.

The final system must include:

- Secure password-protected `/admin` dashboard
- Supabase Authentication
- Route-level protection middleware
- Relational PostgreSQL schema
- Dynamic CRUD management
- Supabase Storage integration
- Real-time dynamic theme variables
- Dynamic frontend rendering
- Zero dependency on `constants.ts`

The frontend experience must remain visually identical.

---

# PHASE 0 — INSTALLATION & ENVIRONMENT SETUP

## 0.1 Install Dependencies

Run:

```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
npm install @supabase/ssr
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
npm install lucide-react
npm install uuid
npm install date-fns
```

---

## 0.2 Create Environment Variables

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

# PHASE 1 — SUPABASE PROJECT SETUP

---

## 1.1 Create Supabase Project

Inside Supabase dashboard:

- Create new project
- Enable Email Authentication
- Disable public signups
- Manually create admin user

---

## 1.2 Create Storage Buckets

Inside Supabase Storage create:

| Bucket | Purpose |
|---|---|
| `videos` | MP4 mechanics videos |
| `thumbnails` | JPG/WEBP preview images |
| `certificates` | PDF certificates |
| `branding` | Optional future branding assets |

---

## 1.3 Bucket Policies

### Videos

Authenticated upload only.

Public read enabled.

### Thumbnails

Authenticated upload only.

Public read enabled.

### Certificates

Authenticated upload only.

Public read enabled.

---

# PHASE 2 — DATABASE ARCHITECTURE

Create all tables using SQL Editor in Supabase.

---

# 2.1 TABLE — experience

```sql
create table experience (
  id uuid primary key default gen_random_uuid(),

  role text not null,
  company text not null,
  period text not null,
  location text not null,
  employment_type text not null,

  outcomes text[] not null,
  tech_stack text[] not null,

  highlight text not null,

  sort_order integer default 0,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 2.2 TABLE — mechanics_videos

```sql
create table mechanics_videos (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text not null,

  tech_stack text[] not null,

  category text not null,

  video_url text not null,
  thumbnail_url text not null,

  featured boolean default false,

  sort_order integer default 0,

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 2.3 TABLE — achievements

```sql
create table achievements (
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

  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

---

# 2.4 TABLE — technical_categories

```sql
create table technical_categories (
  id uuid primary key default gen_random_uuid(),

  name text not null,

  sort_order integer default 0,

  created_at timestamp with time zone default now()
);
```

---

# 2.5 TABLE — technical_skills

```sql
create table technical_skills (
  id uuid primary key default gen_random_uuid(),

  category_id uuid references technical_categories(id) on delete cascade,

  name text not null,

  proficiency text not null,

  sort_order integer default 0,

  created_at timestamp with time zone default now()
);
```

---

# 2.6 TABLE — site_settings

This table controls dynamic styling and future CMS expansion.

```sql
create table site_settings (
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

  updated_at timestamp with time zone default now()
);
```

---

# 2.7 Seed Initial Theme Values

```sql
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
values (
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
);
```

---

# PHASE 3 — ROW LEVEL SECURITY (CRITICAL)

Enable RLS on ALL tables.

---

## 3.1 Public Read Policies

Frontend must be publicly readable.

Example:

```sql
create policy "Public read access"
on experience
for select
using (true);
```

Repeat for:

- mechanics_videos
- achievements
- technical_categories
- technical_skills
- site_settings

---

## 3.2 Authenticated Admin Policies

Authenticated users can CRUD.

Example:

```sql
create policy "Authenticated full access"
on experience
for all
to authenticated
using (true)
with check (true);
```

Repeat for all CMS tables.

---

# PHASE 4 — NEXT.JS SUPABASE CLIENTS

---

## 4.1 Create Directory Structure

```bash
src/lib/supabase/
```

Create:

```bash
client.ts
server.ts
middleware.ts
```

---

## 4.2 client.ts

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

---

## 4.3 server.ts

```ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

---

# PHASE 5 — AUTHENTICATION SYSTEM

---

## 5.1 Create Login Route

Create:

```bash
src/app/login/page.tsx
```

Build a minimalist executive login screen.

Design language:

- charcoal background
- serif typography
- luxury gold accents
- centered authentication card
- no generic dashboard styling

Fields:

- email
- password

Use Supabase auth:

```ts
supabase.auth.signInWithPassword()
```

On success:

```ts
redirect("/admin")
```

---

# PHASE 6 — MIDDLEWARE ROUTE PROTECTION

---

## 6.1 Create Root middleware.ts

```bash
src/middleware.ts
```

---

## 6.2 Middleware Logic

Protect ALL admin routes.

Behavior:

| Route | Behavior |
|---|---|
| `/admin/*` | Requires authenticated session |
| no session | redirect to `/login` |
| authenticated | continue |

Implementation:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !session
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

---

# PHASE 7 — ADMIN DASHBOARD ARCHITECTURE

---

# 7.1 Create Admin Route Structure

```bash
src/app/admin/
```

Pages:

```bash
/admin/page.tsx
/admin/experience/page.tsx
/admin/mechanics/page.tsx
/admin/achievements/page.tsx
/admin/arsenal/page.tsx
/admin/theme/page.tsx
```

---

# 7.2 Dashboard Design Language

IMPORTANT:

Admin panel aesthetic MUST align with frontend luxury branding.

DO NOT build a generic SaaS admin dashboard.

Use:

- charcoal palettes
- thin borders
- serif headings
- subtle hover states
- restrained spacing
- elegant typography
- editorial composition

NO:
- neon gradients
- analytics widgets
- rounded cartoon cards
- oversaturated UI
- glassmorphism overload

---

# PHASE 8 — EXPERIENCE CRUD

---

# 8.1 Experience Admin Features

Inside:

```bash
/admin/experience
```

Implement:

- Create Experience Entry
- Edit Existing Entry
- Delete Entry
- Reorder via sort_order
- Expandable outcome fields
- Dynamic tech stack tag input

---

# 8.2 Experience Form Fields

| Field | Type |
|---|---|
| role | text |
| company | text |
| period | text |
| location | text |
| employment_type | text |
| outcomes | array |
| tech_stack | array |
| highlight | text |

---

# PHASE 9 — MECHANICS VIDEO CMS

---

# 9.1 Mechanics Upload System

Inside:

```bash
/admin/mechanics
```

Features:

- Upload MP4 directly to Supabase bucket
- Upload thumbnail image
- Toggle featured item
- Category management
- Sort ordering

---

# 9.2 Upload Architecture

On upload:

1. Upload file to storage bucket
2. Retrieve public URL
3. Save URL into mechanics_videos table

Use:

```ts
supabase.storage.from("videos")
```

and

```ts
supabase.storage.from("thumbnails")
```

---

# 9.3 Video Form Fields

| Field | Type |
|---|---|
| title | text |
| description | textarea |
| tech_stack | tags |
| category | text |
| video | upload |
| thumbnail | upload |
| featured | boolean |

---

# PHASE 10 — ACHIEVEMENTS CMS

---

# 10.1 Achievement CRUD

Features:

- CRUD achievement cards
- Upload PDF certificates
- Choose card size
- Choose icon
- Sort ordering

---

# 10.2 PDF Upload

Use:

```ts
supabase.storage.from("certificates")
```

Store returned public URL.

---

# PHASE 11 — TECHNICAL ARSENAL CMS

---

# 11.1 Arsenal Architecture

Implement nested relational editing.

Admin should:

- Create categories
- Add skills to category
- Edit skill proficiency
- Delete categories
- Reorder skills

---

# PHASE 12 — DYNAMIC THEME SYSTEM

THIS IS A CRITICAL REQUIREMENT.

The admin panel must dynamically control the frontend visual palette.

---

# 12.1 CSS Variable Refactor

Refactor `globals.css`.

Replace hardcoded colors with CSS variables.

Example:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;

  --text-primary: #f5f0e8;
  --text-secondary: #9ca3af;

  --accent-primary: #b89c6e;
  --accent-secondary: #e8e0d0;

  --card-bg: #1a1a1a;
  --border-color: #2e2e2e;
}
```

---

# 12.2 Dynamic Theme Injection

Create:

```bash
src/components/providers/ThemeProvider.tsx
```

This provider:

1. Fetches `site_settings`
2. Injects CSS variables into `document.documentElement`
3. Updates instantly on admin save

Implementation concept:

```ts
document.documentElement.style.setProperty(
  "--bg-primary",
  settings.background_primary
);
```

Repeat for all variables.

---

# 12.3 Theme Admin Controls

Create:

```bash
/admin/theme
```

UI Requirements:

- Color picker inputs
- Live preview cards
- Save button
- Immediate frontend reflection

Editable variables:

| Variable |
|---|
| background_primary |
| background_secondary |
| text_primary |
| text_secondary |
| accent_primary |
| accent_secondary |
| card_background |
| border_color |

---

# PHASE 13 — FRONTEND DATA REFACTOR

CRITICAL:
DO NOT redesign components.

ONLY replace static imports with dynamic fetching.

---

# 13.1 Remove constants.ts Dependency

Delete static usage of:

```ts
EXPERIENCE
MECHANICS_VIDEOS
ACHIEVEMENTS
TECH_ARSENAL
```

Replace with Supabase queries.

---

# 13.2 Server Component Fetching

Use async server components wherever possible.

Example:

```ts
const supabase = await createClient();

const { data } = await supabase
  .from("experience")
  .select("*")
  .order("sort_order");
```

Pass fetched data into existing UI components.

---

# 13.3 Preserve Motion System

DO NOT alter:

- Framer Motion variants
- animations
- stagger timing
- scroll reveal behavior
- hover transitions

Data source changes only.

---

# PHASE 14 — REALTIME CONTENT REFRESH

OPTIONAL BUT PREFERRED.

Implement Supabase realtime subscriptions for:

- theme changes
- admin updates

So edits appear without rebuilds.

---

# PHASE 15 — PERFORMANCE & SECURITY

---

# 15.1 Security Requirements

NEVER expose:

- service role key
- admin secrets

Only use anon key client-side.

Service role ONLY server-side if needed.

---

# 15.2 Upload Restrictions

Validate:

| Type | Allowed |
|---|---|
| Video | mp4 |
| Image | jpg, png, webp |
| PDF | pdf |

Limit upload sizes.

---

# 15.3 Lazy Loading

Maintain performance:

- lazy load videos
- optimize images
- preserve Next.js optimization

---

# PHASE 16 — FINAL ARCHITECTURE

Final system architecture:

```text
Frontend (Next.js App Router)
        ↓
Dynamic Server Fetching
        ↓
Supabase PostgreSQL
        ↓
Supabase Storage
        ↓
Admin CMS Dashboard
        ↓
Dynamic Theme Variable Injection
```

---

# PHASE 17 — FINAL VERIFICATION

Before completion verify:

- [ ] `/admin` is fully protected
- [ ] login works securely
- [ ] CRUD works for all content types
- [ ] uploads work correctly
- [ ] videos stream correctly
- [ ] certificates open correctly
- [ ] theme colors update live
- [ ] frontend aesthetic remains identical
- [ ] no TypeScript errors
- [ ] no hydration warnings
- [ ] no console errors
- [ ] build passes successfully

Run:

```bash
npm run build
```

Project must compile without warnings.

---

# APPENDIX — NON-NEGOTIABLE VISUAL PRESERVATION

Cursor MUST NOT:

- redesign the hero
- change spacing rhythm
- alter typography hierarchy
- replace motion system
- introduce dashboard templates
- add analytics widgets
- add charts
- add glassmorphism overload
- add neon gradients
- add rounded playful UI
- change cinematic editorial feel

This project is an executive engineering portfolio — not a startup landing page.

---

# END OF Cursor_Admin.md
# Version 1.0 — Dynamic CMS Architecture Edition





ok done created 

now the Things missing from the Admin Panel are:

- Unable to edit the name, and unable to remove or add an already added thing



So write a new prompt that will  ask chat gpt to regenerate a new prompt for the antigravity to fix these issues

but make sure the current theme and lay out remains the same