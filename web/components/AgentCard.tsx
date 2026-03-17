import Link from 'next/link'
import { AgentMeta } from '@/lib/agents'

export default function AgentCard({ agent }: { agent: AgentMeta }) {
  return (
    <Link href={`/agents/${agent.slug}`}>
      <div className="group border border-gray-800 rounded-xl p-5 bg-gray-900 hover:border-gray-600 hover:bg-gray-800 transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              {agent.name}
            </h3>
            {agent.subcategory && (
              <span className="text-xs text-gray-500 capitalize">{agent.subcategory}</span>
            )}
          </div>
          <span className="text-xs bg-gray-800 border border-gray-700 text-gray-400 px-2 py-1 rounded-full">
            {agent.model}
          </span>
        </div>

        <p className="text-gray-400 text-sm flex-1 leading-relaxed">{agent.description}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {agent.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-600">by {agent.author}</span>
          <span className="text-xs text-blue-500 group-hover:text-blue-400">View →</span>
        </div>
      </div>
    </Link>
  )
}
