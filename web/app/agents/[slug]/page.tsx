import { getAllAgents } from '@/lib/agents'
import { notFound } from 'next/navigation'
import AgentDetailContent from '@/components/AgentDetailContent'

// Generate only the first 50 agents statically; the rest are rendered on-demand
export async function generateStaticParams() {
  const slugs = [...new Set(getAllAgents().map(a => a.slug))].slice(0, 50)
  return slugs.map(slug => ({ slug }))
}

// Allow dynamic rendering for slugs not pre-generated
export const dynamicParams = true

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const matches = getAllAgents().filter(a => a.slug === slug)
  if (matches.length === 0) notFound()

  return <AgentDetailContent agents={matches} />
}
