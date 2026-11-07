# PROJECT RULES — NEVER BREAK THIS STRUCTURE

These rules are permanent.  
Any change to folder structure, file placement, or architecture requires **explicit user instruction** that clearly says “change the structure” or “restructure”.

## 1. Core Principle
- Content is data → lives only in `src/content/`
- UI is presentation → lives only in `src/components/`
- Game logic & features → live only in `src/features/`
- Shared utilities & services → live in their dedicated folders
- Never mix content with components or logic

## 2. Folder Responsibilities (strict)

| Folder | Purpose | Allowed content |
|--------|---------|-----------------|
| `src/content/` | All learning material | scenarios, dialogues, vocabulary, quizzes (JSON or TS data only) |
| `src/components/ui/` | Reusable pure UI atoms | Button, Card, Modal, ProgressBar, etc. |
| `src/components/game/` | Game-specific UI pieces | DialogueBubble, ChoiceButton, ScenarioScene, etc. |
| `src/components/layout/` | Page shells | Header, Footer, GameLayout, etc. |
| `src/features/` | Self-contained features | Each feature has its own folder with index + internal files |
| `src/services/` | External & side effects | AI API, localStorage, audio, etc. |
| `src/store/` | Global state | Zustand or simple store only |
| `src/hooks/` | Custom React hooks | useProgress, useScenario, etc. |
| `src/types/` | TypeScript types only | |
| `src/config/` | Constants & configuration | |
| `src/utils/` | Pure helper functions | |
| `public/assets/` | Static images, sounds, icons | |

## 3. Adding New Content (the easy way)
- New scenario → create folder under `src/content/scenarios/<name>/`
- Put `scenario.ts` (or `.json`) + optional `quiz.ts` inside
- Never put React components inside content folders

## 4. Adding New Features
- Create a new folder under `src/features/<feature-name>/`
- Export a clean public API from `index.ts`
- Keep feature self-contained

## 5. Token Efficiency Rules
- Prefer data files (JSON/TS objects) over hard-coded JSX
- Keep components small and focused
- Never duplicate content across files
- When generating new scenarios, only touch files inside `src/content/`

## 6. Forbidden without explicit permission
- Moving or renaming the main folders listed above
- Putting scenario data inside components
- Putting UI code inside content folders
- Creating new top-level folders under `src/` without asking

## 7. How to request changes
User must say something clear like:
- “Change the structure…”
- “Restructure the project…”
- “Move X to Y…”
- “Add a new top-level folder called…”

Until then, this structure is locked.