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
      {/* Search bar + category filters */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-4 space-y-4">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search agents by name, description, or tags..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              activeCategory === null
                ? 'bg-white text-gray-900 font-medium'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-sm px-3 py-1 rounded-full transition-colors capitalize ${
                activeCategory === cat
                  ? 'bg-white text-gray-900 font-medium'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {CATEGORY_ICONS[cat] ?? '📦'} {cat}
            </button>
          ))}
        </div>

        {/* Results count when searching */}
        {(query || activeCategory) && (
          <p className="text-gray-500 text-sm">
            {filtered.length === 0
              ? 'No agents found'
              : `${filtered.length} agent${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        )}
      </div>

      {/* Agent grid */}
      <div className="max-w-6xl mx-auto px-6 py-4 space-y-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-5xl mb-4">🤷</p>
            <p className="text-lg">No agents match &quot;{query}&quot;</p>
            <button
              onClick={() => { setQuery(''); setActiveCategory(null) }}
              className="mt-4 text-sm text-gray-400 hover:text-white underline transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          Object.entries(byCategory).map(([category, categoryAgents]) => (
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
          ))
        )}
      </div>
    </>
  )
}
