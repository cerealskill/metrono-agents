import { getAllAgents } from '@/lib/agents'
import AgentSearch from '@/components/AgentSearch'
import ThemeToggle from '@/components/ThemeToggle'
import AuthButton from '@/components/AuthButton'
import Link from 'next/link'

export default function Home() {
  const agents = getAllAgents()

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

          {/* Top nav */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-sm font-mono font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                PickUp! a Agents
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contribute"
                className="text-sm px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ background: 'var(--cyan-bright)', color: 'var(--btn-text)' }}
              >
                + New Agent
              </Link>
              <a
                href="https://github.com/cerealskill/metrono-agents"
                target="_blank"
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                }}
              >
                <svg height="14" viewBox="0 0 16 16" width="14" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
              </a>
              <AuthButton />
              <ThemeToggle />
            </div>
          </div>

          {/* Headline */}
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full mb-6"
              style={{
                background: 'var(--bg-elevated)',
                color: 'var(--cyan-bright)',
                border: '1px solid var(--border-hover)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--cyan-bright)' }}
              />
              {agents.length} production-ready bundles
            </div>

            <h1
              className="text-5xl font-bold leading-tight mb-4"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              OpenClaw agents,{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan-bright), var(--cyan-mid))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                ready to deploy.
              </span>
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Drop-in workspace bundles for{' '}
              <a href="https://openclaw.ai" style={{ color: 'var(--cyan-bright)' }} className="hover:opacity-80 transition-opacity">
                OpenClaw
              </a>
              . Each agent ships with SOUL, IDENTITY, MEMORY conventions and a full bootstrap — so you can start working immediately.
            </p>
          </div>

        </div>
      </div>

      {/* Search bar + grid (seamlessly continues the hero bg, then transitions to bg-deep) */}
      <AgentSearch agents={agents} />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <p>
            Built for{' '}
            <a href="https://openclaw.ai" style={{ color: 'var(--cyan-bright)' }} className="hover:opacity-80 transition-opacity">
              OpenClaw
            </a>
            {' '}·{' '}
            <a
              href="https://github.com/cerealskill/metrono-agents"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:opacity-80 transition-opacity"
            >
              Contribute on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
