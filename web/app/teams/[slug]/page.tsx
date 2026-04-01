import { getAllTeams } from '@/lib/teams'
import { notFound } from 'next/navigation'
import TeamDetailContent from '@/components/TeamDetailContent'

export const dynamic = 'force-dynamic'

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hit = getAllTeams().find(t => t.slug === slug)
  if (!hit) notFound()

  // Get all language variants via groupId
  const matches = getAllTeams().filter(t => t.groupId === hit.groupId)

  return <TeamDetailContent teams={matches} />
}
