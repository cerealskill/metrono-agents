'use client'

import { useState, useMemo } from 'react'
import AgentCard from './AgentCard'
import { CATEGORY_ICONS } from '@/lib/agents'
import type { AgentMeta } from '@/lib/agents'

export default function AgentSearch({ agents }: { agents: AgentMeta[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(agents.map(a => a.category))).sort(),
    [agents]
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return agents.filter(a => {
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q)
      const matchesCat = !activeCategory || a.category === activeCategory
      return matchesQuery && matchesCat
    })
  }, [agents, query, activeCategory])

  const byCategory = useMemo(() => {
    return filtered.reduce((acc, agent) => {
      const cat = agent.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(agent)
      return acc
    }, {} as Record<string, AgentMeta[]>)
  }, [filtered])

  return (
    <>
      {/* Search bar — same bg as hero, seamless continuation */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-3">
          {/* Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: 'var(--text-muted)' }}>🔍</span>
            <input
              type="text"
              placeholder="Search by name, description or tags..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full rounded-xl pl-11 pr-10 py-3 text-sm transition-all duration-200 outline-none"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--cyan-mid)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                style={{ color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm px-3 py-1 rounded-full transition-all duration-150 font-medium"
              style={
                activeCategory === null
                  ? { background: 'var(--cyan-bright)', color: 'var(--btn-text)' }
                  : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
              }
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className="text-sm px-3 py-1 rounded-full transition-all duration-150 capitalize"
                style={
                  activeCategory === cat
                    ? { background: 'var(--cyan-bright)', color: 'var(--btn-text)', fontWeight: '600' }
                    : { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
                }
              >
                {CATEGORY_ICONS[cat] ?? '📦'} {cat}
              </button>
            ))}
            {(query || activeCategory) && (
              <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
            <p className="text-5xl mb-4">🤷</p>
            <p className="text-lg">No agents match &quot;{query}&quot;</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(null) }}
              className="mt-4 text-sm underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-secondary)' }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(byCategory).map(([category, categoryAgents]) => (
              <section key={category}>
                <h2 className="text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <span>{CATEGORY_ICONS[category] ?? '📦'}</span>
                  <span className="capitalize">{category}</span>
                  <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>({categoryAgents.length})</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryAgents.map(agent => (
                    <AgentCard key={agent.slug} agent={agent} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
