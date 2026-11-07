# Italian Work Game

**Impara italiano lavorando** — Restaurant · Magazzino · Fabbrica · Vita reale

A fun, interactive, scenario-based Italian learning web app built specifically for real job situations in Padova (and Italy in general).

## Features (v0.1)
- Real-life work scenarios with interactive dialogues and choices
- Bengali + English support for explanations
- XP / Level system
- Progress saved in browser
- Clean, mobile-first UI
- Extremely modular structure (easy & cheap to upgrade)

## Project Structure (LOCKED)

See `RULES.md` and `docs/architecture.md`.

**Never change the folder structure unless the user explicitly asks to restructure.**

```
src/
├── content/          ← All scenarios, vocab, quizzes (DATA ONLY)
├── components/       ← UI pieces
├── features/         ← Self-contained features
├── services/         ← AI, storage, etc.
├── store/            ← Global state
├── types/            ← TypeScript types
├── config/           ← Constants
└── utils/            ← Helpers
```

## Quick Start

```bash
cd italian-work-game
npm install
npm run dev
```

Then open the local URL (usually http://localhost:5173).

## iPhone / iOS Web App (PWA)

This app is ready to be installed on iPhone like a real app:

1. Open the site in **Safari** on your iPhone
2. Tap the **Share** button (square with arrow)
3. Scroll and tap **Add to Home Screen**
4. Name it “IT Work” (or whatever you like) → Add

It opens fullscreen (no Safari bars) with its own icon.

Already included for iPhone:
- Safe area support (notch + home indicator)
- Large touch targets (44–52px)
- `apple-mobile-web-app-capable`
- Standalone display mode
- Matching theme color
- Proper icons (192 + 512)

## How to add new content (cheapest way)
1. Create a new file in `src/content/scenarios/<category>/`
2. Export a `Scenario` object
3. Register it in the scenario registry (later we will make this automatic)

## Future upgrades (all isolated)
- More scenarios → only touch `src/content/`
- AI generation with free APIs → only `src/features/ai-integration/` + `src/services/ai.ts`
- Backend / accounts → add services + optional serverless
- New UI components → only `src/components/`

## Tech
- Vite + React + TypeScript
- Tailwind CSS
- Zustand (persist)
- Free to deploy on Vercel / Netlify

---

Built for Sajib — practical Italian for real jobs in Padova.