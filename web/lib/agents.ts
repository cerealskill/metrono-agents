import fs from 'fs'
import path from 'path'

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

function loadAgents(): AgentMeta[] {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'agents.json')
    const raw = fs.readFileSync(jsonPath, 'utf-8')
    return JSON.parse(raw) as AgentMeta[]
  } catch {
    return []
  }
}

export function getAllAgents(): AgentMeta[] {
  return loadAgents()
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
