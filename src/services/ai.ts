/**
 * AI Integration placeholder.
 * Later you can plug any free API here (Groq, Gemini free tier, OpenRouter, etc.)
 * Keep all AI logic inside this file + features/ai-integration.
 */

export interface AIGenerateOptions {
  scenarioType: 'restaurant' | 'magazzino' | 'fabbrica' | 'everyday'
  difficulty: 1 | 2 | 3
  topic?: string
}

export async function generateScenarioWithAI(_options: AIGenerateOptions) {
  // Placeholder — will be implemented when user adds free API key
  throw new Error('AI generation not configured yet. Add your free API key in features/ai-integration.')
}