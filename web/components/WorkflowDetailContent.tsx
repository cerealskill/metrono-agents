'use client'

import { Fragment } from 'react'
import { useI18n } from '@/lib/i18n'
import type { WorkflowMeta } from '@/lib/workflows'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageToggle from '@/components/LanguageToggle'

function renderInlineMarkdown(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return (
        <strong key={i} style={{ color: 'var(--md-strong-color)', fontWeight: 700 }}>
          {part}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

function renderLineMarkdown(line: string) {
  const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
  if (headingMatch) {
    const level = headingMatch[1].length
    const text = headingMatch[2]
    const size = level === 1 ? '1.05rem' : level === 2 ? '1rem' : '0.95rem'
    return (
      <span style={{ color: 'var(--cyan-bright)', fontWeight: 700, fontSize: size }}>
        <span style={{ opacity: 0.8 }}>{'#'.repeat(level)} </span>
        {renderInlineMarkdown(text)}
      </span>
    )
  }
  return renderInlineMarkdown(line)
}

export default function WorkflowDetailContent({ workflows }: { workflows: WorkflowMeta[] }) {
  const { t, lang } = useI18n()

  const workflow = workflows.find(w => w.lang.toUpperCase() === lang) ?? workflows[0]
  const lines = workflow.orchestration.split('\n')
  const totalLines = lines.length
  const totalWords = workflow.orchestration.trim() ? workflow.orchestration.trim().split(/\s+/).length : 0

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-start justify-between mb-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/findbot-logo.png" alt="FindBOT" style={{ width: 100, height: 100, objectFit: 'contain' }} />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>FindBOT</span>
                <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--cyan-bright)' }}>AI AGENTS</span>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
              ⚡ {t.tabWorkflows}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {workflow.name}
            </h1>
            {workflow.objective && (
              <p className="max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {workflow.objective}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t.workflowOrchestration}
        </h2>

        <div
          className="rounded-xl p-6 overflow-auto"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="text-sm leading-relaxed font-mono" style={{ color: 'var(--text-primary)' }}>
            {lines.map((line, idx) => (
              <div key={idx} className="grid" style={{ gridTemplateColumns: '36px 1fr' }}>
                <span
                  className="select-none pr-2 text-right"
                  style={{ color: 'var(--text-muted)', borderRight: '1px solid var(--border)' }}
                >
                  {idx + 1}
                </span>
                <span className="pl-2 whitespace-pre-wrap break-words">{line ? renderLineMarkdown(line) : ' '}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          {t.linesCount}: {totalLines} | {t.wordsCount}: {totalWords}
        </p>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>
            {t.builtFor}{' '}
            <a href="https://openclaw.ai" style={{ color: 'var(--cyan-bright)' }} className="hover:opacity-80 transition-opacity">
              OpenClaw
            </a>
            {' '}·{' '}
            <a
              href="https://github.com/cerealskill/openclaw-agents"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:opacity-80 transition-opacity"
            >
              {t.contributeGH}
            </a>
            {' '}·{' '}
            <a
              href="https://soul.md/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#e63946' }}
              className="hover:opacity-80 transition-opacity font-semibold"
            >
              Soul.md
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
