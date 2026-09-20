# Virtus — Luxury Dark Theme Overhaul

## What's new
- `src/styles/theme.css` — design tokens (obsidian bg, champagne gold accent, glass
  surfaces), imported by `src/index.css`.
- `src/components/AuroraBackground.jsx` — Three.js particle/aurora canvas, mouse-reactive,
  fixed behind all content at 0.75 opacity. **Requires `npm install three`.**
- `src/components/Sidebar.jsx` — fixed glass sidebar, gold gradient brand mark, active-route
  indicator, collapses to a mobile top bar under 860px.
- `src/components/BentoCard.jsx` — glass card with real cursor-tracking 3D tilt.
- `src/components/Footer.jsx` + `Footer.css` — animated dotted top strip, 4-column nav,
  oversized wordmark, built to spec with 980px/560px breakpoints.
- `src/components/Layout.jsx` — wraps AuroraBackground + Sidebar + content + Footer.

## Pages
- **Dashboard, Analytics** — fully rebuilt as bento-grid pages using `Layout` + `BentoCard`.
  Analytics keeps its original localStorage scoring logic untouched.
- **Mock Interviews, Coding Practice, Resume Builder, Job Tracker, Question Bank** — wrapped
  in `Layout` and recolored to the gold/glass palette. All functional logic (camera/mic,
  speech synthesis, fetch calls, resume state, filtering) is unchanged.
- Not touched: `Login`, `Signup`, `Profile`, `History`, `Flashcards`, `InterviewPlanner`,
  `InterviewRoom`, `BehavioralCoach`, `CompanyGuide`, `SalaryNegotiator`, `StarStoryBuilder`,
  `ResumeReview`, `Home.jsx`, `App.jsx`.

## Before you run it
1. `npm install three` (new dependency for the aurora background).
2. This zip is a `src/`-only extract — no `package.json` / Vite config was included, so I
   could not run a real build or dev server. All files pass an `esbuild` JSX/syntax check,
   but you should still eyeball layout in the browser before shipping.
