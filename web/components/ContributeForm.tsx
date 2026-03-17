'use client'
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['tech', 'business', 'personal', 'creative']
const SUBCATEGORIES: Record<string, string[]> = {
  tech: ['sre', 'dev', 'security', 'data', 'devops'],
  business: ['sales', 'marketing', 'ops', 'finance'],
  personal: ['productivity', 'health', 'learning', 'finance'],
  creative: ['content', 'design', 'writing', 'music'],
}
const MODELS = ['claude-sonnet-4.5', 'gpt-4o', 'gemini-pro', 'openrouter/auto', 'github-copilot/claude-sonnet-4.6']

const SOUL_TEMPLATE = `# SOUL.md — {name}

_Who am I? What do I do?_

## Core Truths

**Describe the agent's core behavior and values here.**

## Vibe

How does this agent communicate? What's their style?
`

const IDENTITY_TEMPLATE = `# IDENTITY.md

- **Name:** {name}
- **Creature:** {description}
- **Vibe:** Professional, direct, helpful
- **Emoji:** 🤖
`

export default function ContributeForm() {
  const { data: session } = useSession()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [prUrl, setPrUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'tech',
    subcategory: 'dev',
    tags: '',
    model: 'claude-sonnet-4.5',
    soul: SOUL_TEMPLATE,
    identity: IDENTITY_TEMPLATE,
    user: '# USER.md\n\n- **Name:** (your user\'s name)\n- **Notes:** (add context here)\n',
    agents: '# AGENTS.md\n\n## Every Session\n\n1. Read `SOUL.md`\n2. Read `USER.md`\n',
    heartbeat: '# HEARTBEAT.md\n\n# Add periodic tasks here\n',
    tools: '# TOOLS.md\n\n## Local Notes\n\n(Add environment-specific notes here)\n',
    bootstrap: '# BOOTSTRAP.md\n\n_First run instructions._\n\nIntroduce yourself and set up the workspace.\n',
  })

  const set = (k: keyof typeof form, v: string) => {
    setForm(f => {
      const next = { ...f, [k]: v }
      if (k === 'name') {
        next.slug = v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      }
      return next
    })
  }

  const inputStyle = {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    borderRadius: '0.75rem',
    padding: '0.625rem 0.875rem',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '0.375rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setPrUrl(data.pr)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🔐</p>
        <p className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>Sign in to contribute</p>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>You need a Google account to submit an agent</p>
        <button
          onClick={() => signIn('google')}
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-semibold"
          style={{ background: 'var(--cyan-bright)', color: '#0a0f1a' }}
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  if (prUrl) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🎉</p>
        <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>PR submitted!</p>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Your agent is under review. Once approved it will appear in the catalog.</p>
        <a
          href={prUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-medium"
          style={{ background: 'var(--bg-elevated)', color: 'var(--cyan-bright)', border: '1px solid var(--border)' }}
        >
          View PR on GitHub →
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['Basic info', 'Files', 'Review'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all"
              style={step > i + 1
                ? { background: 'var(--cyan-mid)', color: '#0a0f1a' }
                : step === i + 1
                ? { background: 'var(--cyan-bright)', color: '#0a0f1a' }
                : { background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }
              }
            >
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className="text-sm hidden sm:block" style={{ color: step === i + 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {label}
            </span>
            {i < 2 && <div className="w-8 h-px mx-1" style={{ background: 'var(--border)' }} />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic info */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>Agent name</label>
            <input style={inputStyle} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Rafa DevOps" />
          </div>
          <div>
            <label style={labelStyle}>Slug <span style={{ color: 'var(--text-muted)', textTransform: 'none', fontWeight: 400 }}>— auto-generated</span></label>
            <input style={{ ...inputStyle, color: 'var(--text-muted)' }} value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="rafa-devops" />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <input style={inputStyle} value={form.description} onChange={e => set('description', e.target.value)} placeholder="A DevOps engineer specialized in CI/CD pipelines" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category} onChange={e => { set('category', e.target.value); set('subcategory', SUBCATEGORIES[e.target.value][0]) }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Subcategory</label>
              <select style={inputStyle} value={form.subcategory} onChange={e => set('subcategory', e.target.value)}>
                {(SUBCATEGORIES[form.category] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tags <span style={{ color: 'var(--text-muted)', textTransform: 'none', fontWeight: 400 }}>— comma separated</span></label>
            <input style={inputStyle} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="devops, ci-cd, kubernetes" />
          </div>
          <div>
            <label style={labelStyle}>Preferred model</label>
            <select style={inputStyle} value={form.model} onChange={e => set('model', e.target.value)}>
              {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button
            disabled={!form.name || !form.slug || !form.description}
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
            style={{ background: 'var(--cyan-bright)', color: '#0a0f1a' }}
          >
            Next: Edit files →
          </button>
        </div>
      )}

      {/* Step 2: Files */}
      {step === 2 && (
        <div className="space-y-5">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Edit the 7 bundle files. SOUL.md is the most important — it defines the agent's personality.</p>
          {([
            ['soul', '🧠 SOUL.md'],
            ['identity', '🪪 IDENTITY.md'],
            ['user', '👤 USER.md'],
            ['agents', '🤖 AGENTS.md'],
            ['heartbeat', '💓 HEARTBEAT.md'],
            ['tools', '🔧 TOOLS.md'],
            ['bootstrap', '🚀 BOOTSTRAP.md'],
          ] as const).map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <textarea
                style={{ ...inputStyle, height: key === 'soul' ? '200px' : '100px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.75rem' }}
                value={form[key]}
                onChange={e => set(key, e.target.value)}
              />
            </div>
          ))}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-medium text-sm" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--cyan-bright)', color: '#0a0f1a' }}>
              Next: Review →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="rounded-xl p-4 space-y-2" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Name</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{form.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Slug</span>
              <span style={{ color: 'var(--cyan-bright)', fontFamily: 'monospace' }}>{form.slug}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Path</span>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>agents/{form.category}/{form.subcategory}/{form.slug}/</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: 'var(--text-muted)' }}>Contributor</span>
              <span style={{ color: 'var(--text-secondary)' }}>{session.user?.name}</span>
            </div>
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            This will open a Pull Request on GitHub. Once reviewed and merged, your agent will appear in the catalog.
          </p>

          {error && (
            <div className="rounded-xl p-3 text-sm" style={{ background: '#2d0000', border: '1px solid #ff4d4d', color: '#ff4d4d' }}>
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl font-medium text-sm" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60"
              style={{ background: 'var(--cyan-bright)', color: '#0a0f1a' }}
            >
              {loading ? 'Submitting...' : '🚀 Submit PR'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
