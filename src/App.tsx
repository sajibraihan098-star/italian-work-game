import { useState } from 'react'
import { Dashboard } from './features/dashboard'
import { ScenarioPlayer } from './features/scenario-player'
import type { ScenarioId } from './types'

function App() {
  const [currentScenarioId, setCurrentScenarioId] = useState<ScenarioId | null>(null)

  if (currentScenarioId) {
    return (
      <ScenarioPlayer
        scenarioId={currentScenarioId}
        onExit={() => setCurrentScenarioId(null)}
      />
    )
  }

  return <Dashboard onSelectScenario={setCurrentScenarioId} />
}

export default App