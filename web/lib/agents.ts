import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const AGENTS_DIR = path.join(process.cwd(), '..', 'agents')

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
  path: string // relative path in repo
}

function walkAgents(dir: string, base = ''): AgentMeta[] {
  const agents: AgentMeta[] = []
  if (!fs.existsSync(dir)) return agents

  for (const entry of fs.readdirSync(dir)) {
    if (entry.startsWith('_')) continue
    const fullPath = path.join(dir, entry)
    const relPath = base ? `${base}/${entry}` : entry

    if (fs.statSync(fullPath).isDirectory()) {
      const metaFile = path.join(fullPath, 'meta.yaml')
      if (fs.existsSync(metaFile)) {
        const raw = fs.readFileSync(metaFile, 'utf-8')
        const meta = yaml.load(raw) as Omit<AgentMeta, 'path'>
        agents.push({ ...meta, path: relPath })
      } else {
        agents.push(...walkAgents(fullPath, relPath))
      }
    }
  }
  return agents
}

export function getAllAgents(): AgentMeta[] {
  return walkAgents(AGENTS_DIR)
}

export function getAgentBySlug(slug: string): AgentMeta | undefined {
  return getAllAgents().find(a => a.slug === slug)
}

export function getAgentReadme(agentPath: string): string {
  const soulPath = path.join(AGENTS_DIR, agentPath, 'SOUL.md')
  if (fs.existsSync(soulPath)) {
    return fs.readFileSync(soulPath, 'utf-8')
  }
  return ''
}

export const CATEGORY_ICONS: Record<string, string> = {
  tech: '🛠️',
  business: '💼',
  personal: '👤',
  creative: '🎨',
  finance: '💰',
  security: '🔐',
}
