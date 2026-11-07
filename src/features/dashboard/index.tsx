import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useProgressStore } from '../../store/useProgressStore'
import { LEVELS } from '../../config/constants'
import type { ScenarioId } from '../../types'
import { getAllScenarios } from '../../content/scenarios'

interface DashboardProps {
  onSelectScenario: (id: ScenarioId) => void
}

export function Dashboard({ onSelectScenario }: DashboardProps) {
  const { xp, level, completedScenarios } = useProgressStore()
  const currentLevel = LEVELS.find((l) => l.level === level) || LEVELS[0]
  const availableScenarios = getAllScenarios()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-700">Italian Work Game</h1>
            <p className="text-sm text-slate-500">Impara lavorando</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-slate-700">Livello {level}</div>
            <div className="text-xs text-slate-500">{currentLevel.title} · {xp} XP</div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Scegli uno scenario</h2>
          <div className="grid gap-4">
            {availableScenarios.map((s) => {
              const done = completedScenarios.includes(s.id)
              return (
                <Card key={s.id} onClick={() => onSelectScenario(s.id)}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-1">
                        {s.category}
                      </div>
                      <h3 className="font-semibold text-slate-900">{s.titleIt}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{s.titleBn}</p>
                      <p className="text-xs text-slate-400 mt-2">
                        ~{s.estimatedMinutes} min · Difficoltà {'★'.repeat(s.difficulty)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {done && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Completato
                        </span>
                      )}
                      <Button size="sm" onClick={() => onSelectScenario(s.id)}>
                        {done ? 'Ripeti' : 'Inizia'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="card bg-primary-50 border-primary-100">
          <h3 className="font-semibold text-primary-800 mb-1">Come funziona</h3>
          <p className="text-sm text-primary-700">
            Scegli uno scenario reale di lavoro → interagisci con i dialoghi → fai le scelte → 
            impara il vocabolario → completa il quiz. Guadagni XP e sali di livello.
          </p>
        </section>
      </main>
    </div>
  )
}