/**
 * AI Integration Feature
 * 
 * This is the ONLY place where free AI APIs will be connected.
 * You will later paste your free API key (Groq / Gemini / OpenRouter etc.) here.
 * 
 * Keep all generation logic isolated so the rest of the app stays clean.
 */

export function AIIntegrationPanel() {
  return (
    <div className="card">
      <h3 className="font-semibold">AI Content Generator</h3>
      <p className="text-sm text-slate-500 mt-1">
        Coming soon — connect any free API key to generate new scenarios automatically.
      </p>
    </div>
  )
}