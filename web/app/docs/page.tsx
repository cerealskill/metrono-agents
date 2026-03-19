import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function DocsPage() {
  const guides = [
    {
      title: 'Getting Started',
      read: '3 min read',
      desc: 'Instala un agent bundle en minutos y entiende la estructura base de archivos.',
    },
    {
      title: 'Cloud to Local Migration',
      read: '5 min read',
      desc: 'Migra tu configuración desde cloud a local sin perder identidad ni memoria.',
    },
    {
      title: 'Cloud to Cloud Migration',
      read: '6 min read',
      desc: 'Mueve tu setup entre entornos cloud manteniendo continuidad operativa.',
    },
    {
      title: 'Backup Best Practices',
      read: '7 min read',
      desc: 'Versionado, rotación y recomendaciones para respaldos seguros de agentes.',
    },
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      <header style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img src="/findbot-logo.png" alt="FindBOT logo" className="shrink-0" style={{ width: 42, height: 42, objectFit: 'contain' }} />
            <div className="flex flex-col leading-none">
              <span className="text-sm sm:text-base font-bold" style={{ color: 'var(--text-primary)' }}>FindBOT</span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--cyan-bright)' }}>Docs</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
            >
              ← Volver
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
          FINDER DOCS
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Documentation</h1>
        <p className="text-base sm:text-lg max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          Guías prácticas para instalar, migrar y respaldar tus agentes OpenClaw.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {guides.map((g) => (
            <article
              key={g.title}
              className="rounded-2xl p-5"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{g.read}</p>
              <h2 className="text-xl font-semibold mb-2">{g.title}</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          <p className="mb-3">
            <a href="/" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Finder</a>
            {' '}·{' '}
            <a href="/docs" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Docs</a>
            {' '}·{' '}
            <a href="/privacy" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Privacy</a>
          </p>
          <p>
            © 2026 FindBOT - Built for{' '}
            <a href="https://openclaw.ai" style={{ color: '#e63946' }} className="hover:opacity-80 transition-opacity">
              OpenClaw
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
