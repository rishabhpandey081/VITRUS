# Virtus — Luxury Dark Theme Overhaul (Complete)

## Shared system
- `src/styles/theme.css` — design tokens (obsidian #030305 bg, champagne gold #e2b714
  accent, glass surfaces), imported by `src/index.css`.
- `src/components/AuroraBackground.jsx` — Three.js particle/aurora canvas, mouse-reactive,
  fixed behind all content at 0.75 opacity. **Requires `npm install three`.**
- `src/components/Sidebar.jsx` — fixed glass sidebar for authenticated pages, gold gradient
  brand mark, active-route indicator, collapses to a mobile top bar under 860px.
- `src/components/PublicShell.jsx` — aurora background without the sidebar, for pre-auth
  pages (Login, Signup).
- `src/components/BentoCard.jsx` — glass card with cursor-tracking 3D tilt.
- `src/components/Footer.jsx` + `Footer.css` — animated dotted top strip, 4-column nav,
  oversized wordmark, built to spec with 980px/560px breakpoints.
- `src/components/Layout.jsx` — wraps AuroraBackground + Sidebar + content + Footer.

## Every page is now on the theme
- **Dashboard, Analytics** — fully rebuilt bento-grid pages.
- **Mock Interviews, Coding Practice, Resume Builder, Job Tracker, Question Bank,
  Profile, History, Flashcards, Interview Planner, Interview Room, Behavioral Coach,
  Company Guide, Salary Negotiator, STAR Story Builder, Resume Review** — all wrapped in
  `Layout` (or `PublicShell` for Login/Signup) and reskinned to the glass/gold system.
  All functional logic (camera/mic, speech synthesis, fetch calls, localStorage,
  filtering, form state) is unchanged from the original.
- **Login, Signup** — rebuilt on `PublicShell` (aurora background, no sidebar), matching
  glass-card auth forms.
- **App.jsx** (the landing page actually rendered by `main.jsx`) — its CSS classes
  (`topbar`, `hero`, `pill`, etc.) had no styles at all in the original upload; I wrote
  `App.css` from scratch in the obsidian/gold system and swapped the background video for
  the same `AuroraBackground` component, plus added the `Footer`.

## Left untouched — flagging this
- **`src/Home.jsx`** is not imported anywhere in the app (`main.jsx` only renders `App`,
  and nothing else references `Home`). Its content is also an unrelated business — a UK
  managed-IT-services landing page ("Northgate IT", SLA tables, helpdesk pricing) — not
  Virtus copy. I left it alone rather than reskin unrelated marketing copy under the
  Virtus brand; let me know if you actually use this file somewhere and want it redone.

## Before you run it
1. `npm install three` (new dependency for the aurora background).
2. This zip is a `src/`-only extract — no `package.json`, Vite config, or top-level
   router file was included (pages use `useNavigate`/`Link` from `react-router-dom` but
   no `<BrowserRouter>`/`<Routes>` exists in this extract), so I could not run a real
   build or dev server. Every one of the 31 JSX files passes an `esbuild` JSX/syntax
   check, but you should still eyeball layout in the browser before shipping.
