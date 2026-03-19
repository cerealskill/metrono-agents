'use client'

import { useState } from 'react'
import { BUNDLE_FILES, type BundleFile } from '@/lib/agents'

const FILE_ICONS: Record<BundleFile, string> = {
  'SOUL.md': '🧠',
  'IDENTITY.md': '🪪',
  'USER.md': '👤',
  'AGENTS.md': '🤖',
  'HEARTBEAT.md': '💓',
  'TOOLS.md': '🔧',
  'BOOTSTRAP.md': '🚀',
}

const FILE_DESC: Record<BundleFile, string> = {
  'SOUL.md': 'Personality, tone & core values',
  'IDENTITY.md': 'Name, creature type & avatar',
  'USER.md': 'Info about the human this agent helps',
  'AGENTS.md': 'Workspace rules & memory conventions',
  'HEARTBEAT.md': 'Periodic background tasks',
  'TOOLS.md': 'Local tool config & notes',
  'BOOTSTRAP.md': 'First-run setup guide',
}

export default function FileTabs({ files }: { files: Record<BundleFile, string> }) {
  const [active, setActive] = useState<BundleFile>('SOUL.md')
  const activeContent = files[active] ?? ''
  const lines = activeContent.split('\n')
  const totalLines = activeContent ? lines.length : 0
  const totalWords = activeContent.trim() ? activeContent.trim().split(/\s+/).length : 0

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex overflow-x-auto gap-1 pb-1 mb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {BUNDLE_FILES.map(fname => (
          <button
            key={fname}
            onClick={() => setActive(fname)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-150 shrink-0"
            style={
              active === fname
                ? {
                    background: 'var(--cyan-bright)',
                    color: 'var(--btn-text)',
                    fontWeight: '600',
                  }
                : {
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }
            }
          >
            <span>{FILE_ICONS[fname]}</span>
            <span>{fname.replace('.md', '')}</span>
          </button>
        ))}
      </div>

      {/* File description */}
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
        {FILE_DESC[active]}
      </p>

      {/* Content */}
      <div
        className="rounded-xl p-6 overflow-auto"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }}
      >
        {activeContent ? (
          <div className="text-sm leading-relaxed font-mono" style={{ color: 'var(--text-primary)' }}>
            {lines.map((line, idx) => (
              <div key={idx} className="grid" style={{ gridTemplateColumns: '36px 1fr' }}>
                <span
                  className="select-none pr-2 text-right"
                  style={{ color: 'var(--text-muted)', borderRight: '1px solid var(--border)' }}
                >
                  {idx + 1}
                </span>
                <span className="pl-2 whitespace-pre-wrap break-words">{line || ' '}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
            This file is empty in the bundle.
          </p>
        )}
      </div>

      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
        Lines: {totalLines} | Works: {totalWords}
      </p>
    </div>
  )
}
