import { useState, useEffect, useRef } from 'react'
import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import type { ScenarioId } from '../../types'
import { getScenario, worldMeta } from '../../content/scenarios'

interface ScenarioPlayerProps {
  scenarioId: ScenarioId
  onExit: () => void
}

/** Prefer a soft Italian voice (female if available) */
function getItalianVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  const it = voices.filter((v) => v.lang.startsWith('it'))
  // Prefer female / soft names commonly used on iOS & Android
  const preferred = it.find((v) =>
    /alice|elsa|federica|silvia|paola|female|donna|soft/i.test(v.name)
  )
  return preferred || it[0] || null
}

function speak(text: string, onEnd?: () => void) {
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'it-IT'
    u.rate = 0.88
    u.pitch = 1.05
    const voice = getItalianVoice()
    if (voice) u.voice = voice
    if (onEnd) u.onend = onEnd
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
  const [showBn, setShowBn] = useState(true)
  const [animKey, setAnimKey] = useState(0)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Load voices (needed on some browsers)
  useEffect(() => {
    speechSynthesis.getVoices()
    const h = () => speechSynthesis.getVoices()
    speechSynthesis.addEventListener('voiceschanged', h)
    return () => speechSynthesis.removeEventListener('voiceschanged', h)
  }, [])

  // Auto-play NPC line when dialogue step appears
  useEffect(() => {
    if (!scenario || finished) return
    const step = scenario.steps[stepIndex]
    if (step?.type === 'dialogue' && step.line) {
      const t = setTimeout(() => speak(step.line!.textIt), 350)
      return () => clearTimeout(t)
    }
  }, [stepIndex, scenarioId, finished])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [stepIndex, showFeedback, selectedChoice])

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
    // Play the chosen answer once
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
    setAnimKey((k) => k + 1)
    setStepIndex((i) => i + 1)
  }

  const replayCurrent = () => {
    if (step.type === 'dialogue' && step.line) speak(step.line.textIt)
    if (step.type === 'choice' && selectedChoice) {
      const c = step.choices?.find((x) => x.id === selectedChoice)
      if (c) speak(c.textIt)
    }
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
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-10 flex flex-col items-center text-center animate-fade-in">
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
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setFinished(false)
                setStepIndex(0)
                setCorrectCount(0)
                setSelectedChoice(null)
                setShowFeedback(false)
                setAnimKey((k) => k + 1)
              }}
            >
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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Flag stripe */}
      <div className="h-1.5 flex shrink-0">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-3 py-2.5 flex items-center gap-2 shrink-0">
        <button
          onClick={onExit}
          className="text-slate-500 active:text-slate-800 text-sm font-medium min-h-[44px] px-2 flex items-center"
        >
          ← Esci
        </button>
        <div className="flex-1 text-center min-w-0">
          <div className="text-sm font-semibold text-slate-800 truncate">
            {meta.emoji} {scenario.titleIt}
          </div>
          <div className="text-[11px] text-slate-400">
            {stepIndex + 1} / {scenario.steps.length}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowBn((v) => !v)}
            className={`text-xs font-bold min-h-[40px] px-2.5 rounded-lg border ${
              showBn ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
            title="Mostra/nascondi Bengali"
          >
            বাংলা
          </button>
          <button
            onClick={replayCurrent}
            className="text-xs font-bold min-h-[40px] px-2.5 rounded-lg border bg-amber-50 text-amber-800 border-amber-200 active:scale-95"
            title="Ripeti audio"
          >
            🔊
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="h-1 bg-slate-200 shrink-0">
        <div
          className="h-full transition-all duration-400 ease-out"
          style={{
            width: `${((stepIndex + 1) / scenario.steps.length) * 100}%`,
            backgroundColor: meta.color,
          }}
        />
      </div>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto max-w-lg mx-auto w-full px-3 py-4 space-y-3">
        {/* Info card */}
        {step.type === 'info' && step.info && (
          <div
            key={`info-${animKey}`}
            className="rounded-2xl bg-amber-50 border border-amber-200 p-4 animate-slide-up"
          >
            <h3 className="font-bold text-amber-900">{step.info.titleIt}</h3>
            {showBn && step.info.titleBn && (
              <p className="text-sm text-amber-700 mt-0.5">{step.info.titleBn}</p>
            )}
            <p className="mt-2 text-slate-700 whitespace-pre-line text-[15px]">{step.info.bodyIt}</p>
            {showBn && step.info.bodyBn && (
              <p className="mt-1.5 text-sm text-slate-500">{step.info.bodyBn}</p>
            )}
          </div>
        )}

        {/* NPC dialogue bubble */}
        {step.type === 'dialogue' && step.line && (
          <div key={`dlg-${animKey}`} className="flex gap-2 animate-slide-up">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-lg shrink-0 mt-1">
              👤
            </div>
            <div className="flex-1 max-w-[85%]">
              <div className="rounded-2xl rounded-tl-md bg-white border border-slate-200 px-3.5 py-2.5 shadow-sm">
                <p className="font-semibold text-[16px] text-slate-900 leading-snug">
                  {step.line.textIt}
                </p>
                {showBn && step.line.textBn && (
                  <p className="text-sm text-green-700 mt-1.5 font-medium">{step.line.textBn}</p>
                )}
              </div>
              <div className="flex gap-2 mt-1.5 ml-1">
                <button
                  onClick={() => speak(step.line!.textIt)}
                  className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full active:scale-95"
                >
                  🔊 Ripeti
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Choice step: question prompt + options as chat replies */}
        {step.type === 'choice' && step.choices && (
          <div key={`ch-${animKey}`} className="space-y-3 animate-slide-up">
            <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Cosa rispondi?
            </p>

            {/* After answer: show only the correct path + feedback */}
            {showFeedback ? (
              <div className="space-y-3">
                {step.choices
                  .filter((c) => c.id === selectedChoice || c.isCorrect)
                  .map((choice) => {
                    const isMine = choice.id === selectedChoice
                    const isGood = choice.isCorrect
                    return (
                      <div
                        key={choice.id}
                        className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-slide-up`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm border-2 ${
                            isGood
                              ? 'bg-green-50 border-green-400 rounded-tr-md'
                              : 'bg-red-50 border-red-300 rounded-tr-md'
                          }`}
                        >
                          <p className="font-semibold text-[15px] text-slate-900">{choice.textIt}</p>
                          {showBn && choice.textBn && (
                            <p className="text-sm text-slate-600 mt-1">{choice.textBn}</p>
                          )}
                          {isMine && (
                            <p
                              className={`text-sm mt-2 font-medium ${
                                isGood ? 'text-green-700' : 'text-red-600'
                              }`}
                            >
                              {isGood ? '✓ ' : '✗ '}
                              {choice.feedbackIt}
                              {showBn && choice.feedbackBn ? ` — ${choice.feedbackBn}` : ''}
                            </p>
                          )}
                          <button
                            onClick={() => speak(choice.textIt)}
                            className="mt-2 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full active:scale-95"
                          >
                            🔊
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            ) : (
              /* Before answer: all options as tappable bubbles */
              <div className="space-y-2.5">
                {step.choices.map((choice, idx) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice.id)}
                    className="w-full text-left flex justify-end animate-slide-up"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="max-w-[90%] rounded-2xl rounded-tr-md bg-primary-600 text-white px-3.5 py-3 shadow-md active:scale-[0.98] transition-transform border-2 border-primary-700">
                      <p className="font-semibold text-[15px] leading-snug">{choice.textIt}</p>
                      {showBn && choice.textBn && (
                        <p className="text-sm text-primary-100 mt-1 opacity-90">{choice.textBn}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Bottom action bar */}
      <div className="shrink-0 bg-white border-t border-slate-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto flex gap-2">
          {(step.type !== 'choice' || showFeedback) && (
            <Button className="flex-1" size="lg" onClick={goNext}>
              {isLast ? 'Completa ✓' : 'Continua →'}
            </Button>
          )}
          {step.type === 'choice' && !showFeedback && (
            <p className="flex-1 text-center text-sm text-slate-400 py-3">
              Tocca una risposta
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
