# Ember & Oak — Phase 1: Foundation Design

## Context

This is a portfolio project: a premium, Michelin-star-caliber fine-dining restaurant
website built to demonstrate senior-level Next.js/UI-UX capability. It is not for a
real client — all content, imagery, and branding are fictional.

The full project is broken into phases, each with its own spec/plan/implementation
cycle:

1. **Foundation** (this doc) — tooling, design system, shared layout & components
2. Home page
3. Menu page
4. Gallery page
5. Reservations page
6. About page
7. Contact + Testimonials pages
8. Polish pass (404, scroll-to-top, WhatsApp button wiring, newsletter, skeleton
   loaders, SEO/perf tuning that spans the whole site)

This document covers Phase 1 only.

## Restaurant concept

- **Name:** Ember & Oak
- **Concept:** Modern European fine dining — chef-driven seasonal tasting menus,
  wine pairings, warm hearth/wood-fire cooking motifs
- **Setting:** Copenhagen (fictional)
- Drives copy tone, imagery selection, and palette choices throughout every phase.

## Tech stack

- **Next.js 15**, App Router, TypeScript, React Server Components by default;
  Client Components only where interactivity requires it (forms, animations, menu
  filtering, lightbox, etc.)
- **Tailwind CSS v4** (CSS-based theme config) for styling
- **shadcn/ui** for accessible primitives (Button, Dialog, Sheet, Select, Calendar,
  Accordion, etc.), restyled to the custom theme rather than left default
- **Framer Motion** for animation (scroll reveals, stagger, parallax, micro-interactions)
- **next-themes** for dark/light mode (class strategy, system-preference default,
  no flash-of-wrong-theme)
- **next/font** with self-hosted Playfair Display (display/headings) + Inter
  (body/UI) — no runtime Google Fonts request
- Package manager: npm
- Images: Next.js `<Image>` with a curated list of hotlinked Unsplash photo URLs
  (`images.unsplash.com` added as a remote pattern in `next.config`). Curation
  happens per-phase as each page needs specific imagery categories (food,
  interiors, chefs, cocktails, etc.)

## Folder structure

```
app/
  layout.tsx            # root layout: fonts, ThemeProvider, Navbar, Footer, LoadingScreen, ScrollProgress, ScrollToTopButton, WhatsAppButton
  page.tsx               # home (placeholder in this phase, built out in Phase 2)
  not-found.tsx          # custom 404 (built out in Polish phase; bare stub now)
  about/page.tsx         # stub, built in Phase 6
  menu/page.tsx          # stub, built in Phase 3
  gallery/page.tsx       # stub, built in Phase 4
  reservations/page.tsx  # stub, built in Phase 5
  contact/page.tsx       # stub, built in Phase 7
  testimonials/page.tsx  # stub, built in Phase 7
components/
  ui/                    # shadcn primitives
  layout/                # Navbar, MobileDrawer, Footer, ScrollProgress, ScrollToTopButton, LoadingScreen
  shared/                # SectionHeading, Badge, CTABanner, Newsletter, WhatsAppButton
hooks/
  use-scroll-position.ts
  use-active-section.ts
lib/
  utils.ts               # cn() helper etc.
  animations.ts           # shared Framer Motion variants (fadeUp, stagger container, etc.)
constants/
  site.ts                # restaurant name, tagline, contact info, address, opening hours
  navigation.ts           # nav link definitions
types/
  index.ts               # shared TS types (added to incrementally per phase)
public/
  favicon, static icons
styles/
  globals.css             # Tailwind import + CSS variable theme tokens
```

Later phases add `sections/` (page-specific composed sections) and
`constants/menu-data.ts`, `constants/testimonials.ts`, `constants/gallery.ts` as
needed — not created in this phase since they'd be empty stubs.

## Design tokens

**Colors** — CSS variables mapped into the Tailwind theme, each with a light and
dark value, feeding shadcn's semantic token slots (`background`, `foreground`,
`primary`, `secondary`, `accent`, `muted`, `border`, `card`, etc.):

| Token | Light | Dark |
|---|---|---|
| background / foreground | Warm Cream `#F8F4ED` / Deep Charcoal `#1A1A1A` | Deep Charcoal `#1A1A1A` / Warm Cream `#F8F4ED` |
| primary | Rich Burgundy `#6B1F2B` | Burgundy, brightened for contrast on dark |
| accent | Gold `#C9A227` | Gold `#C9A227` (unchanged, used for icons/dividers/accents, never body text — fails AA on cream) |
| secondary | Olive Green `#556B2F` | Olive, brightened slightly for dark contrast |

All text/background pairings verified against WCAG AA contrast minimums.

**Typography**
- `font-display` → Playfair Display (headings)
- `font-sans` → Inter (body/UI)
- One shared type scale in the Tailwind theme (hero, section title, subsection,
  body, caption) used consistently across all pages — not redefined per page.

**Dark/light mode**: `next-themes`, class strategy, toggle lives in the Navbar.

## Shared layout & components built in this phase

- **Navbar** — transparent over hero imagery, solid + blurred background once
  scrolled, active-route highlighting, mobile hamburger opening a slide-in `Sheet`
  drawer, theme toggle, persistent "Reserve a Table" CTA button
- **Footer** — logo, nav links, contact details, opening hours, social icons,
  Newsletter signup (client-side validated, simulated success — no backend),
  Reservation CTA, copyright line
- **ScrollProgress** — thin fixed top bar reflecting scroll position
- **ScrollToTopButton** — fades in past a scroll threshold, smooth-scrolls to top
- **LoadingScreen** — brief branded splash (logo reveal) on initial load, then
  dismisses
- **WhatsAppButton** — floating fixed-position button linking to a placeholder
  `wa.me` URL
- **SectionHeading** — eyebrow text + Playfair display heading + optional
  subtext, reused by every page for consistent section hierarchy
- **Badge** — small pill component; instantiated later for "Popular" and dietary
  icons (vegetarian/vegan/gluten-free) once the Menu phase needs it
- **CTABanner** — reusable full-width reservation-prompt banner, reused across
  multiple pages
- **Button** — shadcn Button restyled with brand variants (primary/burgundy,
  gold-outline, ghost)

All Framer Motion entrance animations (fade-up, stagger-children) are defined once
in `lib/animations.ts` as reusable variants rather than hand-rolled per component.

## Error handling & edge cases

- Theme toggle: default to system preference; persist user choice in
  localStorage via next-themes; guard against hydration mismatch with the
  standard suppressHydrationWarning pattern.
- Newsletter/footer form: client-side email format validation; simulated
  submit (no network call) shows a success state then resets after a few
  seconds; no real backend in this phase or any later phase (confirmed:
  Reservations and Contact forms are front-end-only, simulated-success by
  design — no email service, no database).
- Mobile drawer: closes on route change and on Escape key; traps focus while
  open for accessibility.
- Images: every `<Image>` has descriptive alt text; remote Unsplash domain
  explicitly allow-listed in `next.config` (no wildcard hostnames).

## Testing / verification approach

- No automated test suite planned for this portfolio project (no CI, no real
  backend to test against). Verification is manual: run the dev server, check
  the layout renders correctly across mobile/tablet/desktop breakpoints, both
  theme modes, and that navbar/footer/loading-screen/scroll behaviors work as
  described, per the project's `verify` skill conventions.
- `tsc --noEmit` and `next build` must both pass cleanly as a baseline
  correctness check before the phase is considered done.

## Out of scope for this phase

- All page-specific content and sections (Home, Menu, Gallery, Reservations,
  About, Contact, Testimonials) — each is its own later phase.
- Custom 404 page content (stub only; full design in Polish phase).
- SEO metadata specifics beyond a sensible root-layout default (per-page
  metadata added as each page is built).
