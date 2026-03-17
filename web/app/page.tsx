import { getAllAgents, CATEGORY_ICONS } from '@/lib/agents'
import AgentCard from '@/components/AgentCard'

export default function Home() {
  const agents = getAllAgents()

  const byCategory = agents.reduce((acc, agent) => {
    const cat = agent.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(agent)
    return acc
  }, {} as Record<string, typeof agents>)

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

      {/* Agent grid by category */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {Object.entries(byCategory).map(([category, categoryAgents]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span>{CATEGORY_ICONS[category] ?? '📦'}</span>
              <span className="capitalize">{category}</span>
              <span className="text-gray-500 text-sm font-normal">({categoryAgents.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAgents.map(agent => (
                <AgentCard key={agent.slug} agent={agent} />
              ))}
            </div>
          </section>
        ))}
      </div>

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
