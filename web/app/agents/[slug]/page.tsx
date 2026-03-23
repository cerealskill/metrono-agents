import { getAllAgents } from '@/lib/agents'
import { notFound } from 'next/navigation'
import AgentDetailContent from '@/components/AgentDetailContent'

export async function generateStaticParams() {
  const slugs = new Set(getAllAgents().map(a => a.slug))
  return Array.from(slugs).map(slug => ({ slug }))
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const matches = getAllAgents().filter(a => a.slug === slug)
  if (matches.length === 0) notFound()

  return <AgentDetailContent agents={matches} />
}
