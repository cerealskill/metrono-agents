import { getAllAgents } from '@/lib/agents'
import AgentSearch from '@/components/AgentSearch'

export default function Home() {
  const agents = getAllAgents()

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">👾</span>
            <h1 className="text-4xl font-bold tracking-tight">metrono-agents</h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl">
            Production-ready OpenClaw agent bundles. Drop into your workspace and start working immediately.
          </p>
          <div className="flex gap-4 mt-6">
            <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full">
              {agents.length} agents
            </span>
            <a
              href="https://github.com/cerealskill/metrono-agents"
              target="_blank"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full transition-colors"
            >
              ★ GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Search + grid (client component) */}
      <AgentSearch agents={agents} />

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>
            Built for{' '}
            <a href="https://openclaw.ai" className="text-gray-400 hover:text-white transition-colors">
              OpenClaw
            </a>
            {' '}·{' '}
            <a
              href="https://github.com/cerealskill/metrono-agents"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contribute on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
