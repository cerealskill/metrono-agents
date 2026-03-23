import { AGENTS_DATA } from './agents-data'

export const BUNDLE_FILES = ['SOUL.md', 'IDENTITY.md', 'USER.md', 'AGENTS.md', 'HEARTBEAT.md', 'TOOLS.md', 'BOOTSTRAP.md'] as const
export type BundleFile = typeof BUNDLE_FILES[number]

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
  lang?: string
  soul: string
  files: Record<BundleFile, string>
}

export function getAllAgents(): AgentMeta[] {
  return AGENTS_DATA as unknown as AgentMeta[]
}

export function getAgentsByLang(lang: string): AgentMeta[] {
  return getAllAgents().filter(a => (a.lang ?? 'EN').toUpperCase() === lang.toUpperCase())
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
