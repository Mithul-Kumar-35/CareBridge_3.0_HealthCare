export const LANGUAGE_PROMPT = { en: 'English', hi: 'Hindi', ta: 'Tamil' }
export const MAP_AI_DEFAULTS = { enabled: false, language: 'en', model: 'openai/gpt-4o-mini', endpoint: '/openrouter' }
export const RETIRED_MODELS = []
export const routeFacts = (plan, path) => ({ minutes: Math.max(1, path.length - 1) * 2, steps: path.length - 1, floorsChanged: 0, liftLegs: 0, stairLegs: 0 })
export const compareRoutes = () => ({ fastest: null, accessible: null, sameRoute: true, extraMinutes: 0 })
export const checkOpenRouter = async () => ({ ok: false, hasKey: false })
export const askOpenRouter = async () => ({ ok: false, message: 'AI route explanations are unavailable in this workspace.' })
