import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import type { ScenarioId } from '../../types'
import { getScenario, worldMeta } from '../../content/scenarios'

interface ScenarioPlayerProps {
  scenarioId: ScenarioId
  onExit: () => void
}

function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'it-IT'
    u.rate = 0.9
    speechSynthesis.cancel()
    speechSynthesis.speak(u)
  } catch {}
}

export function ScenarioPlayer({ scenarioId, onExit }: ScenarioPlayerProps) {
  const scenario = getScenario(scenarioId)
  const { completeScenario, addXp, recordPlayToday } = useProgressStore()
  const [stepIndex, setStepIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Scenario non trovato</p>
          <Button onClick={onExit}>Torna indietro</Button>
        </div>
      </div>
    )
  }

  const meta = worldMeta[scenario.category] || worldMeta.everyday
  const step = scenario.steps[stepIndex]
  const isLast = stepIndex >= scenario.steps.length - 1
  const totalChoices = scenario.steps.filter((s) => s.type === 'choice').length

  const handleChoice = (choiceId: string) => {
    if (showFeedback) return
    setSelectedChoice(choiceId)
    setShowFeedback(true)
    const choice = step.choices?.find((c) => c.id === choiceId)
    if (choice?.isCorrect) {
      addXp(5)
      setCorrectCount((c) => c + 1)
    }
    if (choice) speak(choice.textIt)
  }

  const goNext = () => {
    if (isLast) {
      completeScenario(scenarioId)
      recordPlayToday()
      setFinished(true)
      return
    }
    setSelectedChoice(null)
    setShowFeedback(false)
    setStepIndex((i) => i + 1)
  }

  if (finished) {
    const score = totalChoices > 0 ? Math.round((correctCount / totalChoices) * 100) : 100
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="h-1.5 flex">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-500" />
        </div>
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-10 flex flex-col items-center text-center">
          <div className="text-6xl mb-3">{score >= 80 ? '🏆' : '👏'}</div>
          <h2 className="text-2xl font-bold text-slate-900">Scenario completato!</h2>
          <p className="text-slate-500 mt-1">{scenario.titleIt}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600">{correctCount}/{totalChoices}</div>
              <div className="text-xs text-slate-500">Risposte corrette</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-amber-600">+{50 + correctCount * 5}</div>
              <div className="text-xs text-slate-500">XP guadagnati</div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Continua così. Ogni giorno un po’ ti avvicina al lavoro in Italia.
          </p>
          <div className="mt-8 w-full space-y-3">
            <Button className="w-full" size="lg" onClick={() => { setFinished(false); setStepIndex(0); setCorrectCount(0); setSelectedChoice(null); setShowFeedback(false) }}>
              Riprova scenario
            </Button>
            <Button className="w-full" variant="secondary" size="lg" onClick={onExit}>
              Altri scenari
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="h-1.5 flex">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>

      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onExit}
          className="text-slate-500 active:text-slate-800 text-sm font-medium min-h-[44px] min-w-[44px] flex items-center"
        >
          ← Esci
        </button>
        <div className="text-sm font-medium text-slate-700 truncate max-w-[55%]">
          {meta.emoji} {scenario.titleIt}
        </div>
        <div className="text-xs text-slate-400 min-w-[44px] text-right">
          {stepIndex + 1}/{scenario.steps.length}
        </div>
      </header>

      <div className="h-1.5 bg-slate-200">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / scenario.steps.length) * 100}%`, backgroundColor: meta.color }}
        />
      </div>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 flex flex-col">
        {step.type === 'dialogue' && step.line && (
          <div className="mb-6">
            <div className="rounded-2xl px-4 py-3 bg-white border-2 border-slate-200 max-w-[92%]">
              <p className="text-xs text-slate-400 mb-1">NPC</p>
              <p className="font-semibold text-lg text-slate-900">{step.line.textIt}</p>
              {step.line.textBn && (
                <p className="text-sm text-green-700 mt-2 font-medium">{step.line.textBn}</p>
              )}
              <button
                onClick={() => speak(step.line!.textIt)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1.5 rounded-lg active:scale-95"
              >
                🔊 Ascolta
              </button>
            </div>
          </div>
        )}

        {step.type === 'choice' && step.choices && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600 mb-1">Cosa rispondi?</p>
            {step.choices.map((choice) => {
              const isSelected = selectedChoice === choice.id
              const showResult = showFeedback && isSelected
              const showCorrect = showFeedback && choice.isCorrect
              return (
                <button
                  key={choice.id}
                  disabled={showFeedback}
                  onClick={() => handleChoice(choice.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all min-h-[56px] active:scale-[0.99] ${
                    showResult
                      ? choice.isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      : showCorrect
                        ? 'border-green-400 bg-green-50'
                        : 'border-slate-200 bg-white hover:border-primary-300'
                  }`}
                >
                  <p className="font-semibold text-slate-800">{choice.textIt}</p>
                  {choice.textBn && (
                    <p className={`text-sm mt-0.5 ${showFeedback ? 'text-slate-600' : 'text-slate-400'}`}>
                      {choice.textBn}
                    </p>
                  )}
                  {showResult && (
                    <p className={`text-sm mt-2 font-medium ${choice.isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                      {choice.isCorrect ? '✓ ' : '✗ '}
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
          <div className="card bg-amber-50 border-amber-200">
            <h3 className="font-bold text-amber-900">{step.info.titleIt}</h3>
            {step.info.titleBn && (
              <p className="text-sm text-amber-700 mt-0.5">{step.info.titleBn}</p>
            )}
            <p className="mt-3 text-slate-700 whitespace-pre-line">{step.info.bodyIt}</p>
            {step.info.bodyBn && (
              <p className="mt-2 text-sm text-slate-500">{step.info.bodyBn}</p>
            )}
          </div>
        )}

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
