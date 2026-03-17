import { getAllAgents } from '@/lib/agents'
import AgentSearch from '@/components/AgentSearch'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const agents = getAllAgents()

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* Hero */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">👾</span>
                <h1
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  metrono-agents
                </h1>
              </div>
              <p className="text-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                Production-ready OpenClaw agent bundles. Drop into your workspace and start working immediately.
              </p>
              <div className="flex gap-3 mt-6 flex-wrap">
                <span
                  className="text-sm px-3 py-1 rounded-full font-medium"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--cyan-bright)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {agents.length} agents
                </span>
                <a
                  href="https://github.com/cerealskill/metrono-agents"
                  target="_blank"
                  className="text-sm px-3 py-1 rounded-full transition-colors"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  ★ GitHub
                </a>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Search + grid */}
      <AgentSearch agents={agents} />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
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
