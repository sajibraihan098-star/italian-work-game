import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProgress, ScenarioId } from '../types'
import { STORAGE_KEY, XP_PER_SCENARIO, LEVELS } from '../config/constants'

interface ProgressState extends UserProgress {
  addXp: (amount: number) => void
  completeScenario: (id: ScenarioId) => void
  masterVocabulary: (ids: string[]) => void
  recordPlayToday: () => void
  resetProgress: () => void
}

const initialState: UserProgress = {
  completedScenarios: [],
  xp: 0,
  level: 1,
  currentStreak: 0,
  lastPlayedDate: undefined,
  vocabularyMastered: [],
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayISO() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function calculateLevel(xp: number): number {
  let level = 1
  for (const l of LEVELS) {
    if (xp >= l.xpRequired) level = l.level
  }
  return level
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      addXp: (amount) => {
        const newXp = get().xp + amount
        set({
          xp: newXp,
          level: calculateLevel(newXp),
        })
      },

      completeScenario: (id) => {
        const { completedScenarios, addXp, recordPlayToday } = get()
        if (!completedScenarios.includes(id)) {
          set({ completedScenarios: [...completedScenarios, id] })
          addXp(XP_PER_SCENARIO)
        }
        recordPlayToday()
      },

      masterVocabulary: (ids) => {
        const current = get().vocabularyMastered
        const newIds = ids.filter((id) => !current.includes(id))
        if (newIds.length) {
          set({ vocabularyMastered: [...current, ...newIds] })
        }
      },

      recordPlayToday: () => {
        const { lastPlayedDate, currentStreak } = get()
        const today = todayISO()
        if (lastPlayedDate === today) return
        const newStreak = lastPlayedDate === yesterdayISO() ? currentStreak + 1 : 1
        set({ lastPlayedDate: today, currentStreak: newStreak })
      },

      resetProgress: () => set(initialState),
    }),
    {
      name: STORAGE_KEY,
    }
  )
)
