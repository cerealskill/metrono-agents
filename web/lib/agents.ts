export interface AgentMeta {
  name: string
  slug: string
  description: string
  category: string
  subcategory?: string
  tags: string[]
  model: string
  author: string
  version: string
  path: string
  soul: string
}

// In production (Vercel), agents are read from the pre-built registry JSON.
// To regenerate: node scripts/build-registry.js from repo root.
import agentsData from '../public/agents.json'

export function getAllAgents(): AgentMeta[] {
  return agentsData as AgentMeta[]
}

export function getAgentBySlug(slug: string): AgentMeta | undefined {
  return getAllAgents().find(a => a.slug === slug)
}

export const CATEGORY_ICONS: Record<string, string> = {
  tech: '🛠️',
  business: '💼',
  personal: '👤',
  creative: '🎨',
  finance: '💰',
  security: '🔐',
}
