import { getAllAgents, getAgentBySlug, CATEGORY_ICONS, BUNDLE_FILES } from '@/lib/agents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CopyInstall from '@/components/CopyInstall'
import FileTabs from '@/components/FileTabs'
import ThemeToggle from '@/components/ThemeToggle'

export async function generateStaticParams() {
  return getAllAgents().map(a => ({ slug: a.slug }))
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()

  const installCmd = `curl -fsSL https://raw.githubusercontent.com/cerealskill/metrono-agents/main/install.sh | bash -s ${agent.slug}`

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm capitalize mb-1" style={{ color: 'var(--text-muted)' }}>
                {CATEGORY_ICONS[agent.category]} {agent.category}
                {agent.subcategory && ` / ${agent.subcategory}`}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {agent.name}
              </h1>
              <p className="max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {agent.description}
              </p>
            </div>
            <span
              className="text-sm px-3 py-1 rounded-full self-start shrink-0"
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main: File browser */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Bundle files
          </h2>
          <FileTabs files={agent.files} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Donate */}
          <div className="flex justify-center">
          <a
            href="https://www.flow.cl/app/web/pagarBtnPago.php?token=gyd282p"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:brightness-110 active:scale-95"
            style={{ background: 'var(--coral-mid)', color: '#ffffff' }}
          >
            ❤️ Donate to author
          </a>
          </div>

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
            <a
              href={`/api/download/${agent.slug}`}
              download={`${agent.slug}.tar.gz`}
              className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:brightness-110 active:scale-95"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"/>
                <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.97a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.779a.749.749 0 1 1 1.06-1.06l1.97 1.97Z"/>
              </svg>
              Download .tar.gz
            </a>
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
