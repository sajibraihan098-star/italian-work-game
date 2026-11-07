import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import { LEVELS } from '../../config/constants'
import type { ScenarioId } from '../../types'
import { getAllScenarios, worldMeta } from '../../content/scenarios'

interface DashboardProps {
  onSelectScenario: (id: ScenarioId) => void
}

export function Dashboard({ onSelectScenario }: DashboardProps) {
  const { xp, level, completedScenarios, currentStreak } = useProgressStore()
  const currentLevel = LEVELS.find((l) => l.level === level) || LEVELS[0]
  const availableScenarios = getAllScenarios()
  const nextLevel = LEVELS.find((l) => l.level === level + 1)
  const xpForNext = nextLevel ? nextLevel.xpRequired - xp : 0
  const progressPct = nextLevel
    ? Math.min(100, ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100)
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pb-10">
      <div className="h-1.5 flex">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-primary-700 leading-tight">Italian Work Game</h1>
            <p className="text-xs text-slate-500">Impara lavorando</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full border border-orange-100">
              🔥 {currentStreak}
            </span>
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-100">
              ⭐ {xp}
            </span>
            <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-full border border-primary-100">
              Lv {level}
            </span>
          </div>
        </div>
        <div className="h-1.5 bg-slate-100">
          <div className="h-full bg-primary-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        <div className="mb-5">
          <p className="text-sm text-slate-500">
            {currentLevel.title}
            {nextLevel ? ` · ${xpForNext} XP al prossimo livello` : ' · Livello massimo!'}
          </p>
          <h2 className="text-xl font-bold text-slate-800 mt-1">Dove lavori oggi?</h2>
        </div>

        <div className="grid gap-3">
          {availableScenarios.map((s) => {
            const done = completedScenarios.includes(s.id)
            const meta = worldMeta[s.category] || worldMeta.everyday
            return (
              <div
                key={s.id}
                className="card !p-0 overflow-hidden border-l-4 cursor-pointer active:scale-[0.99] transition-transform"
                style={{ borderLeftColor: meta.color }}
                onClick={() => onSelectScenario(s.id)}
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="text-3xl">{meta.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: meta.color }}>
                      {meta.label}
                    </div>
                    <h3 className="font-semibold text-slate-900 truncate">{s.titleIt}</h3>
                    <p className="text-sm text-slate-500 truncate">{s.titleBn}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      ~{s.estimatedMinutes} min · {'★'.repeat(s.difficulty)}
                      {done && ' · ✓ Completato'}
                    </p>
                  </div>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); onSelectScenario(s.id) }}>
                    {done ? 'Ripeti' : 'Inizia'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <section className="mt-8 card bg-primary-50 border-primary-100">
          <h3 className="font-semibold text-primary-800 mb-1">Come funziona</h3>
          <p className="text-sm text-primary-700 leading-relaxed">
            Scegli uno scenario reale di lavoro → ascolta e rispondi → guadagna XP →
            mantieni la streak 🔥. Ogni giorno un po’ ti porta al lavoro in Italia.
          </p>
        </section>
      </main>
    </div>
  )
}
