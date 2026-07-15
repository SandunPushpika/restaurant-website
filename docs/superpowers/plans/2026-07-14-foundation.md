# Ember & Oak — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Next.js 15 project, design-token system, and shared layout/components that every later page phase (Home, Menu, Gallery, Reservations, About, Contact, Testimonials, Polish) will build on.

**Architecture:** A single Next.js App Router project. Server Components by default; `"use client"` only where interactivity/hooks are required (theme, scroll, drawer, forms, motion). Design tokens live as CSS variables in `app/globals.css`, mapped into Tailwind's `@theme` so every utility class (`bg-primary`, `text-section`, etc.) is theme-aware and flips automatically between light/dark via a `.dark` class on `<html>` (managed by `next-themes`).

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4, Framer Motion, next-themes, Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-slot`) for hand-authored shadcn-style `Button`/`Sheet`, `class-variance-authority`, `clsx` + `tailwind-merge`, `lucide-react`, `tw-animate-css`, `next/font` (self-hosted Playfair Display + Inter).

## Global Constraints

- Restaurant identity: name **Ember & Oak**, modern European fine dining, fictional setting **Copenhagen**. Use this name/tagline everywhere placeholder branding is needed — never generic "Restaurant Name" placeholders.
- Colors (light / dark), verbatim from the spec: background `#F8F4ED` / `#1A1A1A`, foreground `#1A1A1A` / `#F8F4ED`, primary (burgundy) `#6B1F2B` / brightened for dark contrast, accent (gold) `#C9A227` (unchanged both modes, never used for body text — fails AA on cream), secondary (olive) `#556B2F` / brightened for dark contrast.
- Fonts: Playfair Display for headings (`font-display`), Inter for body/UI (`font-sans`), self-hosted via `next/font/google`.
- No backend, no database, no email service anywhere in this project. Reservation/Contact/Newsletter forms are front-end-only with simulated success states (confirmed decision — do not add API routes or network calls for form submission in this or any later phase).
- No automated test suite (confirmed decision for this portfolio project). Verification per task is: `npx tsc --noEmit` (must pass with zero errors), `npm run build` (must succeed) where the task produces buildable routes, and a manual dev-server check for anything visual/interactive — exact steps are given in each task.
- Package manager: npm.
- Images: any `next/image` usage pointing at Unsplash must use `images.unsplash.com` (already allow-listed in `next.config.ts` by Task 1) — no other remote image hosts without adding them to the allow-list first.
- Every exported component/util must be TypeScript-typed (no `any`).
- Do not run `git add`/`git commit` at any point in this plan — leave changes uncommitted for the user to commit manually.

---

## File Structure Overview

```
package.json, tsconfig.json, next.config.ts, postcss.config.mjs, .gitignore
app/
  layout.tsx, page.tsx, not-found.tsx, globals.css
  about/page.tsx, menu/page.tsx, gallery/page.tsx,
  reservations/page.tsx, contact/page.tsx, testimonials/page.tsx
components/
  ui/button.tsx, ui/sheet.tsx
  layout/navbar.tsx, layout/footer.tsx, layout/theme-provider.tsx,
  layout/theme-toggle.tsx, layout/scroll-progress.tsx,
  layout/scroll-to-top-button.tsx, layout/loading-screen.tsx
  shared/section-heading.tsx, shared/badge.tsx, shared/cta-banner.tsx,
  shared/newsletter.tsx, shared/whatsapp-button.tsx
hooks/use-scroll-position.ts
lib/utils.ts, lib/animations.ts, lib/fonts.ts
constants/site.ts, constants/navigation.ts
types/index.ts
```

---

### Task 1: Project scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a runnable Next.js project (`npm run dev` / `npm run build` both work); `@/*` path alias resolving to project root; `images.unsplash.com` allow-listed for `next/image`.

- [ ] **Step 1: Initialize package.json**

Run: `npm init -y`

Then replace its `scripts` section (keep name/version/etc. as generated) so the file contains at least:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

- [ ] **Step 2: Install core dependencies**

Run:
```bash
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss@4 @tailwindcss/postcss postcss
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create postcss.config.mjs**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 6: Create .gitignore**

```
node_modules
.next
out
.env*.local
npm-debug.log*
```

- [ ] **Step 7: Create app/globals.css (bare Tailwind import for now — Task 3 adds the full token system)**

```css
@import "tailwindcss";
```

- [ ] **Step 8: Create app/layout.tsx (minimal — Task 10 replaces this with the full wiring)**

```tsx
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Ember & Oak",
  description: "Modern European fine dining in Copenhagen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Create app/page.tsx (minimal placeholder)**

```tsx
export default function Home() {
  return <main>Ember &amp; Oak</main>;
}
```

- [ ] **Step 10: Verify the project builds**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

Run: `npm run build`
Expected: build completes successfully, output lists route `/`.

---

### Task 2: Design-system primitives (Button, Sheet, theme provider/toggle)

**Files:**
- Create: `lib/utils.ts`
- Create: `components/ui/button.tsx`, `components/ui/sheet.tsx`
- Create: `components/layout/theme-provider.tsx`, `components/layout/theme-toggle.tsx`

**Interfaces:**
- Consumes: nothing new from Task 1 besides the project existing.
- Produces: `cn(...inputs: ClassValue[]): string` from `@/lib/utils`; `Button` (props: `variant?: "primary" | "gold-outline" | "ghost"`, `size?: "default" | "sm" | "lg"`, `asChild?: boolean`, plus native button attrs) and `buttonVariants` from `@/components/ui/button`; `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent` (`side?: "top"|"bottom"|"left"|"right"`), `SheetHeader`, `SheetTitle` from `@/components/ui/sheet`; `ThemeProvider` from `@/components/layout/theme-provider`; `ThemeToggle` from `@/components/layout/theme-toggle`. Later tasks (Navbar, Footer, CTABanner, root layout) import all of these.

- [ ] **Step 1: Install dependencies**

```bash
npm install @radix-ui/react-dialog @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react framer-motion next-themes tw-animate-css
```

- [ ] **Step 2: Create lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Create components/ui/button.tsx**

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        "gold-outline":
          "border border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-foreground hover:bg-foreground/10",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 4: Create components/ui/sheet.tsx**

```tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(
  props: React.ComponentProps<typeof SheetPrimitive.Trigger>
) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(
  props: React.ComponentProps<typeof SheetPrimitive.Portal>
) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  );
}

const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background shadow-xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-4 right-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-display text-lg text-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
};
```

- [ ] **Step 5: Create components/layout/theme-provider.tsx**

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 6: Create components/layout/theme-toggle.tsx**

```tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="size-11" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-11 rounded-full p-0"
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
```

- [ ] **Step 7: Verify types**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

---

### Task 3: Design tokens (colors, typography, fonts)

**Files:**
- Modify: `app/globals.css`
- Create: `lib/fonts.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: Tailwind utilities `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `bg-secondary`, `text-secondary-foreground`, `bg-accent`, `text-accent-foreground`, `bg-muted`, `text-muted-foreground`, `border-border`, `bg-card`, `text-card-foreground`, `font-display`, `font-sans`, `text-hero`, `text-section`, `text-subsection` (each with paired line-height baked in) — used by every component from Task 6 onward. `inter` and `playfair` font objects (each with a `.variable` CSS class) exported from `@/lib/fonts`, consumed by `app/layout.tsx` in Task 10.

- [ ] **Step 1: Replace app/globals.css with the full token system**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #f8f4ed;
  --foreground: #1a1a1a;
  --primary: #6b1f2b;
  --primary-foreground: #f8f4ed;
  --secondary: #556b2f;
  --secondary-foreground: #f8f4ed;
  --accent: #c9a227;
  --accent-foreground: #1a1a1a;
  --muted: #ece5d8;
  --muted-foreground: #57534e;
  --border: #ddd3c0;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
}

.dark {
  --background: #1a1a1a;
  --foreground: #f8f4ed;
  --primary: #8a2c3b;
  --primary-foreground: #f8f4ed;
  --secondary: #6f8a3d;
  --secondary-foreground: #1a1a1a;
  --accent: #c9a227;
  --accent-foreground: #1a1a1a;
  --muted: #2a2926;
  --muted-foreground: #c7c0b3;
  --border: #3a3733;
  --card: #211f1d;
  --card-foreground: #f8f4ed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --font-display: var(--font-playfair);
  --font-sans: var(--font-inter);

  --text-hero: 4.5rem;
  --text-hero--line-height: 1.05;
  --text-section: 2.75rem;
  --text-section--line-height: 1.15;
  --text-subsection: 1.5rem;
  --text-subsection--line-height: 1.3;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

- [ ] **Step 2: Create lib/fonts.ts**

```ts
import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

Run: `npm run build`
Expected: build completes successfully.

---

### Task 4: Site constants and shared types

**Files:**
- Create: `types/index.ts`, `constants/site.ts`, `constants/navigation.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: types `NavLink { label: string; href: string }`, `OpeningHoursEntry { days: string; hours: string }`, `SocialLink { label: string; href: string }` from `@/types`; `siteConfig` (object with `name`, `tagline`, `description`, `url`, `address.{line1,line2}`, `phone`, `email`, `whatsappNumber`), `openingHours: OpeningHoursEntry[]`, `socialLinks: SocialLink[]` from `@/constants/site`; `mainNavLinks: NavLink[]` from `@/constants/navigation`. Consumed by Navbar, Footer, WhatsAppButton, root layout metadata (Tasks 7–10).

- [ ] **Step 1: Create types/index.ts**

```ts
export interface NavLink {
  label: string;
  href: string;
}

export interface OpeningHoursEntry {
  days: string;
  hours: string;
}

export interface SocialLink {
  label: string;
  href: string;
}
```

- [ ] **Step 2: Create constants/site.ts**

```ts
import type { OpeningHoursEntry, SocialLink } from "@/types";

export const siteConfig = {
  name: "Ember & Oak",
  tagline: "Modern European fine dining, Copenhagen",
  description:
    "Ember & Oak is a modern European fine-dining restaurant in Copenhagen, offering chef-driven seasonal tasting menus and curated wine pairings in a warm, hearth-lit setting.",
  url: "https://emberandoak.example.com",
  address: {
    line1: "14 Nyhavn Kaj",
    line2: "1051 Copenhagen K, Denmark",
  },
  phone: "+45 33 12 34 56",
  email: "reservations@emberandoak.example.com",
  whatsappNumber: "4533123456",
} as const;

export const openingHours: OpeningHoursEntry[] = [
  { days: "Tuesday – Thursday", hours: "17:30 – 22:00" },
  { days: "Friday – Saturday", hours: "17:30 – 23:00" },
  { days: "Sunday – Monday", hours: "Closed" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/emberandoak" },
  { label: "Facebook", href: "https://facebook.com/emberandoak" },
];
```

- [ ] **Step 3: Create constants/navigation.ts**

```ts
import type { NavLink } from "@/types";

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

---

### Task 5: Shared Framer Motion variants

**Files:**
- Create: `lib/animations.ts`

**Interfaces:**
- Consumes: `Variants` type from `framer-motion`.
- Produces: `fadeUp`, `fadeIn`, `staggerContainer`, `scaleIn` (all `Variants`) from `@/lib/animations`, consumed by `SectionHeading`, `CTABanner`, and every later phase's page sections.

- [ ] **Step 1: Create lib/animations.ts**

```ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

---

### Task 6: Shared components (SectionHeading, Badge, CTABanner)

**Files:**
- Create: `components/shared/section-heading.tsx`, `components/shared/badge.tsx`, `components/shared/cta-banner.tsx`

**Interfaces:**
- Consumes: `cn` (`@/lib/utils`), `fadeUp` (`@/lib/animations`), `Button` (`@/components/ui/button`).
- Produces: `SectionHeading` (props: `eyebrow?: string`, `title: string`, `subtitle?: string`, `align?: "left" | "center"`, `className?: string`), `Badge` (props: `children: ReactNode`, `variant?: "popular" | "vegetarian" | "vegan" | "gluten-free" | "default"`, `className?: string`), `CTABanner` (props: `title: string`, `subtitle?: string`, `ctaLabel?: string`, `ctaHref?: string`) — all consumed by later page phases (Menu badges, every page's section headings, reservation CTAs).

- [ ] **Step 1: Create components/shared/section-heading.tsx**

```tsx
"use client";

import { motion } from "framer-motion";

import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-section text-foreground">{title}</h2>
      {subtitle ? (
        <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create components/shared/badge.tsx**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant =
  | "popular"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "default";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  popular: "bg-primary text-primary-foreground",
  vegetarian: "bg-secondary text-secondary-foreground",
  vegan: "bg-secondary text-secondary-foreground",
  "gluten-free": "border border-accent text-accent bg-transparent",
  default: "bg-muted text-muted-foreground",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create components/shared/cta-banner.tsx**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  title,
  subtitle,
  ctaLabel = "Reserve a Table",
  ctaHref = "/reservations",
}: CTABannerProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="bg-primary px-6 py-20 text-center text-primary-foreground"
    >
      <h2 className="font-display text-section">{title}</h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{subtitle}</p>
      ) : null}
      <Button asChild variant="gold-outline" size="lg" className="mt-8">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </motion.section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

---

### Task 7: Navbar with mobile drawer, theme toggle, scroll behavior

**Files:**
- Create: `hooks/use-scroll-position.ts`, `components/layout/navbar.tsx`

**Interfaces:**
- Consumes: `Button` (`@/components/ui/button`), `Sheet`/`SheetTrigger`/`SheetContent`/`SheetHeader`/`SheetTitle` (`@/components/ui/sheet`), `ThemeToggle` (`@/components/layout/theme-toggle`), `mainNavLinks` (`@/constants/navigation`), `siteConfig` (`@/constants/site`), `cn` (`@/lib/utils`).
- Produces: `useScrollPosition(threshold?: number): boolean` from `@/hooks/use-scroll-position` (reused by `ScrollToTopButton` in Task 9); `Navbar` component from `@/components/layout/navbar`, consumed by root layout in Task 10.

- [ ] **Step 1: Create hooks/use-scroll-position.ts**

```ts
"use client";

import { useEffect, useState } from "react";

export function useScrollPosition(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
```

- [ ] **Step 2: Create components/layout/navbar.tsx**

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNavLinks } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollPosition();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-foreground"
        >
          {siteConfig.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {mainNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button asChild variant="primary" size="sm">
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="size-11 rounded-full p-0"
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-6 px-6">
                {mainNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg font-medium uppercase tracking-wide",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto px-6 pb-6">
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/reservations">Reserve a Table</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Manual verification (temporary wiring)**

Temporarily replace the contents of `app/page.tsx` with:

```tsx
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24">Ember &amp; Oak</main>
    </>
  );
}
```

Run: `npm run dev`, open `http://localhost:3000`.

Check, in order:
1. Navbar background is transparent at the top of the page.
2. Scroll down more than 24px — navbar background becomes solid/blurred.
3. Shrink the browser window below 768px width — desktop nav links and desktop CTA disappear, hamburger icon appears.
4. Click the hamburger — a drawer slides in from the right with the nav links and a "Reserve a Table" button.
5. Press `Escape` — the drawer closes.
6. Click a nav link inside the drawer — the drawer closes and the route changes; the clicked link is highlighted in burgundy when its route is active.
7. Click the theme toggle — icon switches between sun/moon and the page background/text colors flip.

Stop the dev server once confirmed.

---

### Task 8: Footer with Newsletter

**Files:**
- Create: `components/shared/newsletter.tsx`, `components/layout/footer.tsx`

**Interfaces:**
- Consumes: `Button` (`@/components/ui/button`), `cn` (`@/lib/utils`), `mainNavLinks` (`@/constants/navigation`), `siteConfig`/`openingHours`/`socialLinks` (`@/constants/site`).
- Produces: `Newsletter` (props: `className?: string`) from `@/components/shared/newsletter`; `Footer` component from `@/components/layout/footer`, consumed by root layout in Task 10.

- [ ] **Step 1: Create components/shared/newsletter.tsx**

```tsx
"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "success" | "error";

export function Newsletter({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
    window.setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="Your email address"
          className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <Button type="submit" variant="primary" size="default">
          Subscribe
        </Button>
      </form>
      {status === "success" ? (
        <p role="status" className="text-sm text-secondary">
          Thank you for subscribing!
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-primary">
          Please enter a valid email address.
        </p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Create components/layout/footer.tsx**

```tsx
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { Newsletter } from "@/components/shared/newsletter";
import { mainNavLinks } from "@/constants/navigation";
import { openingHours, siteConfig, socialLinks } from "@/constants/site";

const socialIcons: Record<string, typeof Instagram> = {
  Instagram: Instagram,
  Facebook: Facebook,
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="font-display text-2xl">{siteConfig.name}</span>
          <p className="text-sm text-background/70">{siteConfig.tagline}</p>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-background/30 transition-colors hover:border-accent hover:text-accent"
                >
                  {Icon ? <Icon className="size-4" /> : null}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Navigate</h3>
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-background/70 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Visit</h3>
          <div className="flex items-start gap-2 text-sm text-background/70">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-background/70">
            <Phone className="size-4 shrink-0" />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-background/70">
            <Mail className="size-4 shrink-0" />
            <span>{siteConfig.email}</span>
          </div>
          <ul className="mt-2 flex flex-col gap-1 text-sm text-background/70">
            {openingHours.map((entry) => (
              <li key={entry.days} className="flex justify-between gap-4">
                <span>{entry.days}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg">Stay in touch</h3>
          <p className="text-sm text-background/70">
            Seasonal menus, events, and private dining news.
          </p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-background/20 px-6 py-6 text-center text-xs text-background/50">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Manual verification (temporary wiring)**

Temporarily append `<Footer />` to `app/page.tsx` (import it from `@/components/layout/footer`).

Run: `npm run dev`, open `http://localhost:3000`, scroll to the bottom.

Check, in order:
1. Footer shows four columns on desktop width, stacks to one column on mobile width (<768px).
2. Opening hours and contact details match `constants/site.ts`.
3. Type an invalid email (e.g. `abc`) into the newsletter field and submit — an error message appears in burgundy.
4. Type a valid email and submit — the field clears and a "Thank you for subscribing!" message appears in olive, then disappears after ~4 seconds.

Stop the dev server once confirmed.

---

### Task 9: ScrollProgress, ScrollToTopButton, WhatsAppButton, LoadingScreen

**Files:**
- Create: `components/layout/scroll-progress.tsx`, `components/layout/scroll-to-top-button.tsx`, `components/shared/whatsapp-button.tsx`, `components/layout/loading-screen.tsx`

**Interfaces:**
- Consumes: `useScrollPosition` (`@/hooks/use-scroll-position`), `siteConfig` (`@/constants/site`).
- Produces: `ScrollProgress`, `ScrollToTopButton`, `LoadingScreen` from `@/components/layout/*`; `WhatsAppButton` from `@/components/shared/whatsapp-button` — all consumed by root layout in Task 10.

- [ ] **Step 1: Create components/layout/scroll-progress.tsx**

```tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-accent"
    />
  );
}
```

- [ ] **Step 2: Create components/layout/scroll-to-top-button.tsx**

```tsx
"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useScrollPosition } from "@/hooks/use-scroll-position";

export function ScrollToTopButton() {
  const visible = useScrollPosition(480);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create components/shared/whatsapp-button.tsx**

```tsx
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/constants/site";

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
```

- [ ] **Step 4: Create components/layout/loading-screen.tsx**

```tsx
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig } from "@/constants/site";

export function LoadingScreen() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-3xl text-foreground"
          >
            {siteConfig.name}
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Verify types**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

---

### Task 10: Root layout wiring, page stubs, custom 404, final verification

**Files:**
- Modify: `app/layout.tsx`, `app/page.tsx`
- Create: `app/not-found.tsx`, `app/about/page.tsx`, `app/menu/page.tsx`, `app/gallery/page.tsx`, `app/reservations/page.tsx`, `app/contact/page.tsx`, `app/testimonials/page.tsx`

**Interfaces:**
- Consumes: every component/util produced by Tasks 1–9.
- Produces: a fully wired site shell — every route in the file list above renders with Navbar/Footer/LoadingScreen/ScrollProgress/ScrollToTopButton/WhatsAppButton present, ready for later phases to fill in page content in place of each placeholder.

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ScrollToTopButton } from "@/components/layout/scroll-to-top-button";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/constants/site";
import { inter, playfair } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTopButton />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace app/page.tsx with the home placeholder**

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Ember &amp; Oak — home page coming in Phase 2.
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Create the remaining page stubs**

`app/about/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        About — coming soon.
      </p>
    </div>
  );
}
```

`app/menu/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Menu — coming soon.
      </p>
    </div>
  );
}
```

`app/gallery/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Gallery — coming soon.
      </p>
    </div>
  );
}
```

`app/reservations/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reservations" };

export default function ReservationsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Reservations — coming soon.
      </p>
    </div>
  );
}
```

`app/contact/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Contact — coming soon.
      </p>
    </div>
  );
}
```

`app/testimonials/page.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <p className="font-display text-2xl text-foreground">
        Testimonials — coming soon.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Create app/not-found.tsx**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24 text-center">
      <h1 className="font-display text-4xl text-foreground">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-primary underline underline-offset-4">
        Return home
      </Link>
    </div>
  );
}
```

- [ ] **Step 5: Verify types and build**

Run: `npx tsc --noEmit`
Expected: no output, exit code 0.

Run: `npm run build`
Expected: build succeeds and lists routes `/`, `/about`, `/menu`, `/gallery`, `/reservations`, `/contact`, `/testimonials`, `/_not-found`.

- [ ] **Step 6: Full manual verification**

Run: `npm run dev`, open `http://localhost:3000`.

Check, in order:
1. On load, the branded loading screen appears briefly then fades to reveal the home placeholder.
2. Navbar is transparent at top, becomes solid+blurred on scroll; theme toggle flips the entire page (including footer) between light and dark.
3. Visit `/about`, `/menu`, `/gallery`, `/reservations`, `/contact`, `/testimonials` — each renders its placeholder with Navbar/Footer present, and the corresponding nav link is highlighted in burgundy.
4. Visit a nonexistent route, e.g. `http://localhost:3000/does-not-exist` — the custom 404 page renders with a working "Return home" link.
5. Resize the window through mobile (375px), tablet (768px), desktop (1280px), and ultra-wide (1920px) — no layout breakage or horizontal scroll at any width.
6. Scroll down more than 480px — the scroll-to-top button fades in; click it and confirm a smooth scroll to top.
7. Confirm the WhatsApp button is visible in the bottom-left corner on every page.

Stop the dev server once confirmed.

---

## Phase 1 Complete

Once Task 10's verification passes, the project has: a working Next.js 15 + Tailwind v4 + TypeScript setup, the full color/typography token system with dark mode, and a functioning shared shell (Navbar, Footer, loading screen, scroll progress/scroll-to-top, WhatsApp button, theme toggle) across every route stub. Phase 2 (Home page) begins by replacing the `app/page.tsx` placeholder with real sections.
