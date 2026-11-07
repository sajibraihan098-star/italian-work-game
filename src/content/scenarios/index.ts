import { restaurantScenario1 } from './restaurant/scenario-1'
import { restaurantScenario2 } from './restaurant/scenario-2'
import { magazzinoScenario1 } from './magazzino/scenario-1'
import { fabbricaScenario1 } from './fabbrica/scenario-1'
import type { Scenario } from '../../types'

export const scenarios: Record<string, Scenario> = {
  'restaurant-1': restaurantScenario1,
  'restaurant-2': restaurantScenario2,
  'magazzino-1': magazzinoScenario1,
  'fabbrica-1': fabbricaScenario1,
}

export function getScenario(id: string): Scenario | undefined {
  return scenarios[id]
}

export function getAllScenarios(): Scenario[] {
  return Object.values(scenarios)
}

export const worldMeta = {
  restaurant: { emoji: '🍝', color: '#e5483a', label: 'Ristorante' },
  magazzino: { emoji: '📦', color: '#2f8fd8', label: 'Magazzino' },
  fabbrica: { emoji: '🏭', color: '#1f9d55', label: 'Fabbrica' },
  everyday: { emoji: '🏙️', color: '#8b5cf6', label: 'Vita reale' },
} as const
