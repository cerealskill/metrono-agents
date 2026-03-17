#!/usr/bin/env node
// scripts/build-registry.js
// Can be run from repo root OR from web/ directory
// Generates web/public/agents.json from agents/**/meta.yaml

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

// Detect if running from web/ or from repo root
const cwd = process.cwd()
const isInWeb = cwd.endsWith('/web')

const AGENTS_DIR = isInWeb
  ? path.join(cwd, '..', 'agents')
  : path.join(cwd, 'agents')

const OUT_FILE = isInWeb
  ? path.join(cwd, 'public', 'agents.json')
  : path.join(cwd, 'web', 'public', 'agents.json')

function walkAgents(dir, base = '') {
  const agents = []
  if (!fs.existsSync(dir)) return agents

  for (const entry of fs.readdirSync(dir)) {
    if (entry.startsWith('_')) continue
    const fullPath = path.join(dir, entry)
    const relPath = base ? `${base}/${entry}` : entry

    if (fs.statSync(fullPath).isDirectory()) {
      const metaFile = path.join(fullPath, 'meta.yaml')
      if (fs.existsSync(metaFile)) {
        const meta = yaml.load(fs.readFileSync(metaFile, 'utf-8'))
        const soulFile = path.join(fullPath, 'SOUL.md')
        const soul = fs.existsSync(soulFile) ? fs.readFileSync(soulFile, 'utf-8') : ''
        agents.push({ ...meta, path: relPath, soul })
      } else {
        agents.push(...walkAgents(fullPath, relPath))
      }
    }
  }
  return agents
}

const agents = walkAgents(AGENTS_DIR)
fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(agents, null, 2))
console.log(`✓ Generated agents.json with ${agents.length} agents → ${OUT_FILE}`)
