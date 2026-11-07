import { useState, useEffect, useRef } from 'react'
import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import type { ScenarioId, ScenarioStep, Choice } from '../../types'
import { getScenario, worldMeta } from '../../content/scenarios'

interface ScenarioPlayerProps {
  scenarioId: ScenarioId
  onExit: () => void
}

type ChatMsg = {
  id: string
  role: 'npc' | 'player' | 'system' | 'feedback'
  textIt: string
  textBn?: string
  isCorrect?: boolean
  feedbackIt?: string
  feedbackBn?: string
}

function getItalianVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  const it = voices.filter((v) => v.lang.startsWith('it'))
  const preferred = it.find((v) =>
    /alice|elsa|federica|silvia|paola|female|donna|soft|sara/i.test(v.name)
  )
  return preferred || it[0] || null
}

function speak(text: string, slow = false) {
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'it-IT'
    u.rate = slow ? 0.7 : 0.9
    u.pitch = 1.08
    const voice = getItalianVoice()
    if (voice) u.voice = voice
    speechSynthesis.speak(u)
  } catch {}
}

const sceneArt: Record<string, { bg: string; emoji: string; label: string }> = {
  restaurant: {
    bg: 'from-orange-100 via-amber-50 to-red-50',
    emoji: '🍝🪑🍷',
    label: 'Ristorante',
  },
  magazzino: {
    bg: 'from-sky-100 via-blue-50 to-indigo-50',
    emoji: '📦🚚🏭',
    label: 'Magazzino',
  },
  fabbrica: {
    bg: 'from-emerald-100 via-green-50 to-teal-50',
    emoji: '🏭⚙️🦺',
    label: 'Fabbrica',
  },
  everyday: {
    bg: 'from-violet-100 via-purple-50 to-fuchsia-50',
    emoji: '🏙️🚌☕',
    label: 'Vita reale',
  },
}

export function ScenarioPlayer({ scenarioId, onExit }: ScenarioPlayerProps) {
  const scenario = getScenario(scenarioId)
  const { completeScenario, addXp, recordPlayToday, xp, currentStreak, level } = useProgressStore()

  const [stepIndex, setStepIndex] = useState(0)
  const [chat, setChat] = useState<ChatMsg[]>([])
  const [choices, setChoices] = useState<Choice[] | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [waitingNext, setWaitingNext] = useState(false)
  const [finished, setFinished] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showBn, setShowBn] = useState(true)
  const [slowMode, setSlowMode] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [bigText, setBigText] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    speechSynthesis.getVoices()
    const h = () => speechSynthesis.getVoices()
    speechSynthesis.addEventListener('voiceschanged', h)
    return () => speechSynthesis.removeEventListener('voiceschanged', h)
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat, choices, waitingNext])

  // Start scenario
  useEffect(() => {
    if (!scenario || startedRef.current) return
    startedRef.current = true
    processStep(0)
  }, [scenario])

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Button onClick={onExit}>Torna indietro</Button>
      </div>
    )
  }

  const meta = worldMeta[scenario.category] || worldMeta.everyday
  const art = sceneArt[scenario.category] || sceneArt.everyday
  const totalChoices = scenario.steps.filter((s) => s.type === 'choice').length
  const textSize = bigText ? 'text-lg' : 'text-[15px]'

  function processStep(index: number) {
    if (!scenario) return
    if (index >= scenario.steps.length) {
      completeScenario(scenarioId)
      recordPlayToday()
      setFinished(true)
      return
    }
    setStepIndex(index)
    setChoices(null)
    setSelectedId(null)
    setWaitingNext(false)
    setHintOpen(false)

    const step = scenario.steps[index]

    if (step.type === 'info' && step.info) {
      const msg: ChatMsg = {
        id: `info-${index}`,
        role: 'system',
        textIt: `${step.info.titleIt}\n${step.info.bodyIt}`,
        textBn: step.info.titleBn
          ? `${step.info.titleBn}\n${step.info.bodyBn || ''}`
          : step.info.bodyBn,
      }
      setChat((c) => [...c, msg])
      setWaitingNext(true)
      return
    }

    if (step.type === 'dialogue' && step.line) {
      const msg: ChatMsg = {
        id: `dlg-${index}`,
        role: 'npc',
        textIt: step.line.textIt,
        textBn: step.line.textBn,
      }
      setChat((c) => [...c, msg])
      if (autoPlay) setTimeout(() => speak(step.line!.textIt, slowMode), 280)
      // After dialogue, auto-advance to next step shortly or wait
      // We treat dialogue as something that then needs Continua unless next is choice
      setWaitingNext(true)
      return
    }

    if (step.type === 'choice' && step.choices) {
      setChoices(step.choices)
      return
    }

    // fallback
    setWaitingNext(true)
  }

  function handleChoice(choice: Choice) {
    if (selectedId) return
    setSelectedId(choice.id)
    setChoices(null)

    const playerMsg: ChatMsg = {
      id: `p-${stepIndex}-${choice.id}`,
      role: 'player',
      textIt: choice.textIt,
      textBn: choice.textBn,
      isCorrect: choice.isCorrect,
    }
    setChat((c) => [...c, playerMsg])
    speak(choice.textIt, slowMode)

    if (choice.isCorrect) {
      addXp(5)
      setCorrectCount((n) => n + 1)
    }

    const fb: ChatMsg = {
      id: `fb-${stepIndex}`,
      role: 'feedback',
      textIt: choice.feedbackIt,
      textBn: choice.feedbackBn,
      isCorrect: choice.isCorrect,
    }
    setTimeout(() => {
      setChat((c) => [...c, fb])
      setWaitingNext(true)
    }, 400)
  }

  function goNext() {
    processStep(stepIndex + 1)
  }

  function replayLastNpc() {
    const last = [...chat].reverse().find((m) => m.role === 'npc' || m.role === 'player')
    if (last) speak(last.textIt, slowMode)
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
              <div className="text-xs text-slate-500">Corrette</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-amber-600">+{50 + correctCount * 5}</div>
              <div className="text-xs text-slate-500">XP</div>
            </div>
          </div>
          <div className="mt-8 w-full space-y-3">
            <Button className="w-full" size="lg" onClick={() => window.location.reload()}>
              Riprova
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
    <div className="min-h-screen bg-slate-100 flex flex-col max-h-[100dvh]">
      {/* Flag */}
      <div className="h-1.5 flex shrink-0">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-2 py-2 flex items-center gap-1 shrink-0">
        <button onClick={onExit} className="min-h-[44px] px-2 text-sm font-medium text-slate-600">
          ← Esci
        </button>
        <div className="flex-1 text-center min-w-0">
          <div className="text-sm font-bold text-slate-800 truncate">
            {meta.emoji} {scenario.titleIt}
          </div>
          <div className="text-[10px] text-slate-400">
            Step {stepIndex + 1}/{scenario.steps.length} · ⭐{xp} · 🔥{currentStreak} · Lv{level}
          </div>
        </div>
        <div className="flex gap-0.5">
          <IconBtn active={showBn} onClick={() => setShowBn((v) => !v)} title="Bengali">বাং</IconBtn>
          <IconBtn active={slowMode} onClick={() => setSlowMode((v) => !v)} title="Slow">🐢</IconBtn>
          <IconBtn active={autoPlay} onClick={() => setAutoPlay((v) => !v)} title="Auto audio">🔊</IconBtn>
          <IconBtn active={bigText} onClick={() => setBigText((v) => !v)} title="Big text">Aa</IconBtn>
        </div>
      </header>

      {/* Visual scene */}
      <div className={`shrink-0 bg-gradient-to-br ${art.bg} px-4 py-4 border-b border-slate-200`}>
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <div className="text-4xl animate-pulse-soft">{art.emoji}</div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{art.label}</div>
            <div className="font-semibold text-slate-800">{scenario.titleIt}</div>
            {showBn && <div className="text-sm text-slate-500">{scenario.titleBn}</div>}
          </div>
          <div className="ml-auto">
            <div className="w-12 h-12 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-xl shadow-sm">
              {meta.emoji}
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto mt-3 h-1.5 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((stepIndex + 1) / scenario.steps.length) * 100}%`,
              backgroundColor: meta.color,
            }}
          />
        </div>
      </div>

      {/* Chat box */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-lg mx-auto px-3 py-3 space-y-3">
          {chat.map((m) => (
            <ChatBubble
              key={m.id}
              msg={m}
              showBn={showBn}
              textSize={textSize}
              onReplay={() => speak(m.textIt, slowMode)}
            />
          ))}

          {/* Live choices */}
          {choices && !selectedId && (
            <div className="space-y-2 pt-1 animate-slide-up">
              <p className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Cosa rispondi?
              </p>
              {choices.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleChoice(c)}
                  className="w-full text-left flex justify-end"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="max-w-[88%] rounded-2xl rounded-br-md bg-primary-600 text-white px-3.5 py-2.5 shadow-md active:scale-[0.98] border border-primary-700">
                    <p className={`font-semibold leading-snug ${textSize}`}>{c.textIt}</p>
                    {showBn && c.textBn && (
                      <p className="text-sm text-primary-100 mt-1 opacity-90">{c.textBn}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="shrink-0 bg-white border-t border-slate-200 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="max-w-lg mx-auto flex flex-wrap gap-2 items-center">
          <button
            onClick={replayLastNpc}
            className="min-h-[44px] px-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm font-bold active:scale-95"
          >
            🔊 Ripeti
          </button>
          <button
            onClick={() => setHintOpen((v) => !v)}
            className="min-h-[44px] px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-bold"
          >
            💡 Hint
          </button>
          {waitingNext && (
            <Button className="flex-1 min-w-[120px]" size="lg" onClick={goNext}>
              {stepIndex + 1 >= scenario.steps.length ? 'Completa ✓' : 'Continua →'}
            </Button>
          )}
          {!waitingNext && choices && (
            <p className="flex-1 text-center text-sm text-slate-400">Tocca una risposta</p>
          )}
        </div>
        {hintOpen && (
          <div className="max-w-lg mx-auto mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            Ascolta bene la domanda. Scegli la risposta più educata e utile per il lavoro.
            {showBn && ' — প্রশ্ন ভালো করে শোনো। কাজের জন্য সবচেয়ে ভদ্র ও দরকারি উত্তর বেছে নাও।'}
          </div>
        )}
      </div>
    </div>
  )
}

function IconBtn({
  children,
  active,
  onClick,
  title,
}: {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
  title: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`min-h-[40px] min-w-[36px] px-1.5 rounded-lg text-xs font-bold border ${
        active
          ? 'bg-primary-50 text-primary-700 border-primary-200'
          : 'bg-slate-50 text-slate-500 border-slate-200'
      }`}
    >
      {children}
    </button>
  )
}

function ChatBubble({
  msg,
  showBn,
  textSize,
  onReplay,
}: {
  msg: ChatMsg
  showBn: boolean
  textSize: string
  onReplay: () => void
}) {
  if (msg.role === 'system') {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 px-3.5 py-3 animate-slide-up">
        <p className={`font-medium text-amber-900 whitespace-pre-line ${textSize}`}>{msg.textIt}</p>
        {showBn && msg.textBn && (
          <p className="text-sm text-amber-700 mt-1.5 whitespace-pre-line">{msg.textBn}</p>
        )}
      </div>
    )
  }

  if (msg.role === 'feedback') {
    return (
      <div
        className={`rounded-xl px-3 py-2 text-sm font-medium animate-slide-up ${
          msg.isCorrect
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}
      >
        {msg.isCorrect ? '✓ ' : '✗ '}
        {msg.textIt}
        {showBn && msg.textBn ? ` — ${msg.textBn}` : ''}
      </div>
    )
  }

  const isNpc = msg.role === 'npc'
  return (
    <div className={`flex gap-2 animate-slide-up ${isNpc ? '' : 'justify-end'}`}>
      {isNpc && (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm shrink-0 mt-1">
          👤
        </div>
      )}
      <div className={`max-w-[82%] ${isNpc ? '' : 'order-first'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 shadow-sm border ${
            isNpc
              ? 'bg-white border-slate-200 rounded-tl-md'
              : msg.isCorrect === false
                ? 'bg-red-50 border-red-300 rounded-tr-md'
                : msg.isCorrect
                  ? 'bg-green-50 border-green-400 rounded-tr-md'
                  : 'bg-primary-600 text-white border-primary-700 rounded-tr-md'
          }`}
        >
          <p
            className={`font-semibold leading-snug ${textSize} ${
              isNpc || msg.isCorrect !== undefined ? 'text-slate-900' : ''
            }`}
          >
            {msg.textIt}
          </p>
          {showBn && msg.textBn && (
            <p
              className={`text-sm mt-1 ${
                isNpc || msg.isCorrect !== undefined ? 'text-green-700' : 'text-primary-100'
              }`}
            >
              {msg.textBn}
            </p>
          )}
        </div>
        <button
          onClick={onReplay}
          className="mt-1 ml-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full active:scale-95"
        >
          🔊
        </button>
      </div>
    </div>
  )
}
