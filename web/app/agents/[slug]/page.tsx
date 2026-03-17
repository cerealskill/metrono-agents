import { getAllAgents, getAgentBySlug, CATEGORY_ICONS, BUNDLE_FILES } from '@/lib/agents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CopyInstall from '@/components/CopyInstall'
import FileTabs from '@/components/FileTabs'
import ThemeToggle from '@/components/ThemeToggle'

export async function generateStaticParams() {
  return getAllAgents().map(a => ({ slug: a.slug }))
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = getAgentBySlug(params.slug)
  if (!agent) notFound()

  const installCmd = `cp -r agents/${agent.path}/* ~/.openclaw/workspace/`

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-6">
            <Link
              href="/"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
            >
              ← Back to agents
            </Link>
            <ThemeToggle />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm capitalize mb-1" style={{ color: 'var(--text-muted)' }}>
                {CATEGORY_ICONS[agent.category]} {agent.category}
                {agent.subcategory && ` / ${agent.subcategory}`}
              </p>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {agent.name}
              </h1>
              <p className="max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {agent.description}
              </p>
            </div>
            <span
              className="text-sm px-3 py-1 rounded-full shrink-0"
              style={{
                background: 'var(--bg-elevated)',
                color: 'var(--cyan-mid)',
                border: '1px solid var(--border)',
              }}
            >
              {agent.model}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {agent.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: File browser */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Bundle files
          </h2>
          <FileTabs files={agent.files} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Install */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Install</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Copy bundle to your OpenClaw workspace.
            </p>
            <CopyInstall command={installCmd} />
          </div>

          {/* Bundle includes */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Includes</h3>
            <ul className="space-y-1.5">
              {BUNDLE_FILES.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--cyan-bright)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Info</h3>
            <dl className="space-y-2 text-sm">
              {[
                ['Author', agent.author],
                ['Version', agent.version],
                ['Model', agent.model],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt style={{ color: 'var(--text-muted)' }}>{label}</dt>
                  <dd style={{ color: 'var(--text-secondary)' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}
