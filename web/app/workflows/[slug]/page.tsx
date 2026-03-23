import { getAllWorkflows } from '@/lib/workflows'
import { notFound } from 'next/navigation'
import WorkflowDetailContent from '@/components/WorkflowDetailContent'

export async function generateStaticParams() {
  const slugs = new Set(getAllWorkflows().map(w => w.slug))
  return Array.from(slugs).map(slug => ({ slug }))
}

export default async function WorkflowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const matches = getAllWorkflows().filter(w => w.slug === slug)
  if (matches.length === 0) notFound()

  return <WorkflowDetailContent workflows={matches} />
}
