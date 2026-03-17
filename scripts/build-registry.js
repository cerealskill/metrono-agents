#!/usr/bin/env node
// scripts/build-registry.js
// Run from repo root: node scripts/build-registry.js
// Generates web/public/agents.json from agents/**/meta.yaml

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const AGENTS_DIR = path.join(__dirname, '..', 'agents')
const OUT_FILE = path.join(__dirname, '..', 'web', 'public', 'agents.json')

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
fs.writeFileSync(OUT_FILE, JSON.stringify(agents, null, 2))
console.log(`✓ Generated agents.json with ${agents.length} agents → ${OUT_FILE}`)
