/**
 * Content Registry
 * All scenarios are registered here.
 * When adding a new scenario, just import and add it to the map.
 * This is the ONLY place that needs to know about all scenarios.
 */

import { restaurantScenario1 } from './restaurant/scenario-1'
import type { Scenario } from '../../types'

export const scenarios: Record<string, Scenario> = {
  'restaurant-1': restaurantScenario1,
  // Future:
  // 'magazzino-1': magazzinoScenario1,
  // 'fabbrica-1': fabbricaScenario1,
}

export function getScenario(id: string): Scenario | undefined {
  return scenarios[id]
}

export function getAllScenarios(): Scenario[] {
  return Object.values(scenarios)
}