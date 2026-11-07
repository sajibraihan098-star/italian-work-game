import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import type { ScenarioId } from '../../types'
import { getScenario } from '../../content/scenarios'

interface ScenarioPlayerProps {
  scenarioId: ScenarioId
  onExit: () => void
}

export function ScenarioPlayer({ scenarioId, onExit }: ScenarioPlayerProps) {
  const scenario = getScenario(scenarioId)
  const { completeScenario, addXp } = useProgressStore()
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Scenario non trovato</p>
          <Button onClick={onExit}>Torna indietro</Button>
        </div>
      </div>
    )
  }

  const step = scenario.steps[stepIndex]
  const isLast = stepIndex >= scenario.steps.length - 1

  const handleChoice = (choiceId: string) => {
    setSelectedChoice(choiceId)
    setShowFeedback(true)
    const choice = step.choices?.find((c) => c.id === choiceId)
    if (choice?.isCorrect) {
      addXp(5)
    }
  }

  const goNext = () => {
    if (isLast) {
      completeScenario(scenarioId)
      onExit()
      return
    }
    setSelectedChoice(null)
    setShowFeedback(false)
    setStepIndex((i) => i + 1)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between safe-top">
        <button 
          onClick={onExit} 
          className="text-slate-500 active:text-slate-800 text-sm font-medium min-h-[44px] min-w-[44px] flex items-center"
        >
          ← Esci
        </button>
        <div className="text-sm font-medium text-slate-700 truncate max-w-[55%]">
          {scenario.titleIt}
        </div>
        <div className="text-xs text-slate-400 min-w-[44px] text-right">
          {stepIndex + 1}/{scenario.steps.length}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-slate-200">
        <div
          className="h-full bg-primary-500 transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / scenario.steps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col">
        {step.type === 'dialogue' && step.line && (
          <div className="mb-6">
            <div className={`rounded-2xl px-4 py-3 max-w-[90%] ${
              step.line.speaker === 'npc'
                ? 'bg-white border border-slate-200 self-start'
                : 'bg-primary-600 text-white self-end ml-auto'
            }`}>
              <p className="font-medium">{step.line.textIt}</p>
              {step.line.textBn && (
                <p className="text-sm mt-1 opacity-80">{step.line.textBn}</p>
              )}
            </div>
          </div>
        )}

        {step.type === 'choice' && step.choices && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-2">Scegli la risposta migliore:</p>
            {step.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id
              const showResult = showFeedback && isSelected
              return (
                <button
                  key={choice.id}
                  disabled={showFeedback}
                  onClick={() => handleChoice(choice.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all min-h-[56px] active:scale-[0.99] ${
                    showResult
                      ? choice.isCorrect
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-300 bg-red-50'
                      : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50 active:bg-primary-50'
                  }`}
                >
                  <p className="font-medium text-slate-800">{choice.textIt}</p>
                  {choice.textBn && (
                    <p className="text-sm text-slate-500 mt-0.5">{choice.textBn}</p>
                  )}
                  {showResult && (
                    <p className={`text-sm mt-2 ${choice.isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                      {choice.feedbackIt}
                      {choice.feedbackBn && ` — ${choice.feedbackBn}`}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {step.type === 'info' && step.info && (
          <div className="card bg-amber-50 border-amber-100">
            <h3 className="font-semibold text-amber-900">{step.info.titleIt}</h3>
            {step.info.titleBn && (
              <p className="text-sm text-amber-700 mt-0.5">{step.info.titleBn}</p>
            )}
            <p className="mt-2 text-slate-700">{step.info.bodyIt}</p>
            {step.info.bodyBn && (
              <p className="mt-1 text-sm text-slate-500">{step.info.bodyBn}</p>
            )}
          </div>
        )}

        {/* Next button — extra bottom padding for iPhone home indicator */}
        <div className="mt-auto pt-6 pb-6">
          {(step.type !== 'choice' || showFeedback) && (
            <Button className="w-full" size="lg" onClick={goNext}>
              {isLast ? 'Completa scenario ✓' : 'Continua'}
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}