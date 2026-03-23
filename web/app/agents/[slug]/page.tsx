import { getAllAgents, getAgentBySlug } from '@/lib/agents'
import { notFound } from 'next/navigation'
import AgentDetailContent from '@/components/AgentDetailContent'

export async function generateStaticParams() {
  return getAllAgents().map(a => ({ slug: a.slug }))
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) notFound()

  return <AgentDetailContent agent={agent} />
}
