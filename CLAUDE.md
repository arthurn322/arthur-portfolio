# Arthur Nguyen — Portfolio Site

Architectural-drawing-themed single-page portfolio + gallery. Built so the owner can edit/publish from any computer with internet access. 🤖

## Stack

| Layer | What |
|---|---|
| Framework | Astro 4 (static site generator) |
| Styling | Tailwind CSS + global CSS in the `Sheet.astro` layout |
| Images | Astro `<Image>` component (auto-resize, lazy-load, modern formats) |
| Fonts | Google Fonts — Cormorant Garamond, JetBrains Mono, Architects Daughter, Inter |
| Hosting | Cloudflare Pages (deploys on every push to `main`) |

## Architecture conventions

**Visual vocabulary** — every interactive piece should fit the architectural drawing metaphor:

| Element | Convention |
|---|---|
| Section header | Numbered bubble (`T-01`) + leader line + hand-drawn-style label |
| Reference labels | `JetBrains Mono`, uppercase, 0.2em+ letter-spacing |
| Body copy | `Cormorant Garamond` (serif) for prose, `Inter` for utility text |
| Hand-written notes | `Architects Daughter` for the redline feel |
| Color palette | Paper `#f6f1e8`, ink `#2a2520`, oak/oak-dark `#c8a878 / #8a6a44`, red watermark `#b8463a` |
| Lines that animate in | Use `clip-path: inset(...)` or `transform: scaleX(...)` triggered by `.reveal.is-visible` |
| Mobile breakpoint | 640px — ornaments scaled or hidden, never just rescaled to fit |

**File layout:**

```
src/
  layouts/Sheet.astro       ← drawing-sheet chrome, all global CSS, all JS
                              (parallax handler, IntersectionObserver, sheet-nav toggle)
  pages/
    index.astro             ← T-01 (hero), A-01 (about), C-01 (contact)
    gallery.astro           ← G-01 (auto-discovers photos in src/assets/gallery/)
  data/sheets.ts            ← single source of truth for the sheet list / Index nav
  assets/
    arthur-hero.jpg         ← hero portrait
    gallery/                ← drop photos here; .gitkeep marks the folder
```

## Gallery — drop-and-forget rule

| What | How |
|---|---|
| Where photos live | `src/assets/gallery/` |
| Filename convention | **NONE.** Phone defaults (`IMG_YYYYMMDD_HHMMSS.jpg`) work — they sort alphabetically = chronologically |
| Sort order | Descending by filename → newest at top of `/gallery` page |
| Captions | None (intentional simplicity) |
| To add photos via GitHub web UI | Open repo → `src/assets/gallery/` → "Add file → Upload files" → commit |
| To add photos via Cloudflare/Codespaces | Same — just drag into the folder, commit |

Do not add caption/order metadata files unless the owner explicitly asks. The whole point of the workflow is zero-friction.

## Dev workflow

```bash
npm install          # first time only
npm run dev          # local at http://localhost:4321
npm run dev -- --host  # also exposes on LAN — phone access via http://<PC-IP>:4321
npm run build        # production build → ./dist
npm run preview      # serve ./dist locally for sanity-check before deploy
```

**Mobile testing:**

| Method | Use when |
|---|---|
| Chrome/Edge DevTools (F12 → device toolbar) | Quick checks |
| Real phone on same Wi-Fi (`--host`) | Real touch interactions, native deep-links (FB Messenger, IG DM) |
| Responsively App (responsively.app) | Side-by-side multiple viewports |
| Cache-bust with `?v=N` query param | Mobile browser stubbornly caches — force fresh load |

**Reduced-motion** is respected — all parallax + animation effects disable under `prefers-reduced-motion: reduce`.

## Picking the project up on another machine

1. Install **Git for Windows** (or built-in on Mac/Linux) and **Node.js 20+**
2. `git clone <repo URL>` (HTTPS — GitHub will ask for a PAT, or use GitHub CLI / Desktop)
3. `cd arthur-portfolio-test && npm install`
4. `npm run dev` → start editing
5. `git add . && git commit -m "..." && git push` → triggers Cloudflare Pages auto-deploy

**Browser-only editing** (no install required):
- Quick fix: open repo on github.com, press `.` to launch web VS Code in browser
- Full dev environment: GitHub Codespaces (free tier: 60 hrs/month) — full Linux box in the browser with npm + dev server running

## Active design decisions worth knowing

| Decision | Why |
|---|---|
| Single shared `Sheet.astro` layout | Avoids duplicate chrome across pages — one place to tweak |
| `import.meta.glob({ eager: true })` for gallery | Build-time discovery, no manifest file to maintain |
| Floating top-right Index nav (`▦ Index N`) | Persistent nav without a traditional header — fits drawing-sheet feel |
| LinkedIn link → profile page (not direct DM) | LinkedIn has no `ig.me`-style deep link; user taps "Message" on profile |
| Watermark hidden on mobile only via scaled-down variant | Overflow:hidden on `.drawing-sheet` clips it, but visible at all sizes |
| `/rewind` enabled (`fileCheckpointingEnabled: true` in `~/.claude/settings.json`) | One-command undo for any local edit Claude makes |

## Owner communication preferences

| Preference | Rule |
|---|---|
| Tone | Robot-like, no human-like sentiments |
| Acronyms | Spell out on first use in parentheses |
| Tables | Default to condensed 3-column when applicable |
| Emojis | Use as visual anchors only, not decoration 🤖 |
| Hardware | Confirm which machine before assuming software is installed |

## What NOT to do

- Don't introduce a CMS, a database, or a backend — the site is intentionally static
- Don't add naming conventions or sidecar files for gallery photos
- Don't add JS frameworks (React/Vue/etc.) — Astro's island model is enough
- Don't break the drawing-sheet visual metaphor for the sake of "modern" UX patterns
- Don't commit `node_modules/` or `dist/` (already in `.gitignore` from Astro's scaffold)
