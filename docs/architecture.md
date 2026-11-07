# Architecture — Italian Work Game

Professional, modular, agency-style structure designed for:
- Extremely cheap upgrades (minimal token cost)
- Easy addition of new scenarios, quizzes, AI, backend later
- Clear separation of concerns
- Free deployment (Vercel / Netlify)

## High-level layers

1. **Content Layer** (`src/content/`)
   - Pure data. No React. No logic.
   - Scenarios, dialogues, vocabulary, quizzes
   - Adding a new restaurant scene = just drop a new file here

2. **Feature Layer** (`src/features/`)
   - scenario-player → plays a scenario
   - quiz → handles questions
   - progress → XP, levels, completion
   - ai-integration → free API keys (Groq, Gemini, etc.)
   - dashboard → home & overview

3. **Component Layer** (`src/components/`)
   - ui/ → dumb reusable atoms
   - game/ → game-specific visual pieces
   - layout/ → shells

4. **Service Layer** (`src/services/`)
   - storage, AI clients, audio helpers

5. **State** (`src/store/`)
   - Single source of truth for progress & current game state

## Tech Stack (locked for now)
- Vite + React + TypeScript
- Tailwind CSS
- Zustand (lightweight store)
- LocalStorage for persistence
- Ready for free AI APIs later

## Upgrade paths (all cheap)
- New scenario → only `src/content/`
- New UI component → only `src/components/`
- New feature → only `src/features/`
- Backend later → add `src/services/api.ts` + optional serverless functions
- AI generation → only touch `src/features/ai-integration/`

This design keeps future changes isolated and cheap.