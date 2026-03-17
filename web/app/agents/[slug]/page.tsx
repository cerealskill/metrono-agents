import { getAllAgents, getAgentBySlug, CATEGORY_ICONS } from '@/lib/agents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CopyInstall from '@/components/CopyInstall'

export async function generateStaticParams() {
  const agents = getAllAgents()
  return agents.map(a => ({ slug: a.slug }))
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = getAgentBySlug(params.slug)
  if (!agent) notFound()

  const soul = agent.soul
  const installCmd = `cp -r agents/${agent.path}/* ~/.openclaw/workspace/`

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm mb-6 inline-block transition-colors">
            ← Back to agents
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-500 text-sm capitalize">
                  {CATEGORY_ICONS[agent.category]} {agent.category}
                  {agent.subcategory && ` / ${agent.subcategory}`}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{agent.name}</h1>
              <p className="text-gray-400 mt-2 max-w-2xl">{agent.description}</p>
            </div>
            <span className="text-sm bg-gray-800 border border-gray-700 text-gray-400 px-3 py-1 rounded-full">
              {agent.model}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {agent.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-800 text-gray-500 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: SOUL.md preview */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">SOUL.md</h2>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-mono">
              {soul || 'No SOUL.md found.'}
            </pre>
          </div>
        </div>

        {/* Sidebar: Install */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Install</h3>
            <p className="text-gray-400 text-sm mb-4">
              Copy the bundle to your OpenClaw workspace. The BOOTSTRAP.md will guide you through setup.
            </p>
            <CopyInstall command={installCmd} />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Bundle includes</h3>
            <ul className="space-y-1">
              {['SOUL.md', 'IDENTITY.md', 'USER.md', 'AGENTS.md', 'HEARTBEAT.md', 'TOOLS.md', 'BOOTSTRAP.md'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Info</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Author</dt>
                <dd className="text-gray-300">{agent.author}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Version</dt>
                <dd className="text-gray-300">{agent.version}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Model</dt>
                <dd className="text-gray-300">{agent.model}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}
