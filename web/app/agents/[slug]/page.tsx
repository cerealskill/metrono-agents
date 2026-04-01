import { getAllAgents } from '@/lib/agents'
import { notFound } from 'next/navigation'
import AgentDetailContent from '@/components/AgentDetailContent'

export const dynamic = 'force-dynamic'

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const matches = getAllAgents().filter(a => a.slug === slug)
  if (matches.length === 0) notFound()

  return <AgentDetailContent agents={matches} />
}
