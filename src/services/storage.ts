// Simple wrapper — currently using Zustand persist.
// Later we can swap to cloud or other storage without touching features.

export function clearAllData() {
  localStorage.removeItem('italian-work-game-progress')
}