import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { auth } from '@/auth'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// GET /api/stars/[slug] — public, returns { total, userVote }
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const session = await auth()

  const total = (await redis.get<number>(`stars:${slug}`)) ?? 0

  let userVote = 0
  if (session?.user?.email) {
    userVote = (await redis.get<number>(`vote:${slug}:${session.user.email}`)) ?? 0
  }

  return NextResponse.json({ total, userVote })
}

// POST /api/stars/[slug] — authenticated, body: { stars: 1-5 }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const { stars } = await request.json()

  if (!stars || stars < 1 || stars > 5) {
    return NextResponse.json({ error: 'Stars must be 1-5' }, { status: 400 })
  }

  const userKey = `vote:${slug}:${session.user.email}`
  const prevVote = (await redis.get<number>(userKey)) ?? 0

  // Adjust total: subtract old vote, add new
  const totalKey = `stars:${slug}`
  const currentTotal = (await redis.get<number>(totalKey)) ?? 0
  const newTotal = Math.max(0, currentTotal - prevVote + stars)

  await redis.set(totalKey, newTotal)
  await redis.set(userKey, stars)

  // Track voter count separately
  const countKey = `votes:${slug}`
  if (prevVote === 0) {
    await redis.incr(countKey)
  }
  const count = (await redis.get<number>(countKey)) ?? 1

  return NextResponse.json({ total: newTotal, userVote: stars, count })
}
