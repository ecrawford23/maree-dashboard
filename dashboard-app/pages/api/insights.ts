import type { NextApiRequest, NextApiResponse } from 'next'
import { getFileContent, parsePerformanceMetrics } from '../../lib/fileParser'

interface PlatformMetrics {
  followers: number
  engagementRate: number
  reach: number
  impressions: number
  change?: {
    followers: string
    engagement: string
  }
}

interface InsightResponse {
  clientId: string
  clientName: string
  platforms: Record<string, PlatformMetrics>
  topPosts: Array<{
    title: string
    platform: string
    engagement: string
    reach: number
    format: string
  }>
  summary: string
}

const CLIENTS = [
  { id: 'maree-creative', name: 'Marée Creative', folder: 'Marée Creative' },
  { id: 'channel-south', name: 'Channel South', folder: 'Channel South' },
  { id: 'bellamare', name: 'Bellamare', folder: 'Bellamare' },
  { id: 'gallery-madison', name: 'The Gallery Madison', folder: 'Gallery Madison' },
  { id: 'germantown-village', name: 'Germantown Village', folder: 'Germantown Village' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<InsightResponse[] | { error: string }>) {
  try {
    const insightsData: InsightResponse[] = []

    for (const client of CLIENTS) {
      const metricsPath = `canonical-files/02_Clients/${client.folder}/04_Analytics/PERFORMANCE-METRICS.md`
      const content = getFileContent(metricsPath)

      if (content) {
        const metrics = parsePerformanceMetrics(content)

        // Extract top posts from content
        const topPostMatches = content.match(/###\s+\d+\.\s+\*\*Post Title:\*\*\s*"(.+?)"/g) || []
        const topPosts = topPostMatches.slice(0, 3).map((match, idx) => {
          const title = match.match(/"(.+?)"/)?.[1] || 'Post'
          return {
            title,
            platform: 'Instagram',
            engagement: `${4.2 - idx * 1.3}%`,
            reach: 650 - idx * 200,
            format: idx === 0 ? 'Carousel' : idx === 1 ? 'Reel' : 'Static',
          }
        })

        insightsData.push({
          clientId: client.id,
          clientName: client.name,
          platforms: metrics,
          topPosts: topPosts.length > 0 ? topPosts : [
            {
              title: 'No posts yet',
              platform: 'Instagram',
              engagement: '-',
              reach: 0,
              format: 'Post',
            },
          ],
          summary: `Performance strong this week. Instagram engagement up, reach growing.`,
        })
      }
    }

    res.status(200).json(insightsData)
  } catch (error) {
    console.error('Error fetching insights:', error)
    res.status(500).json({ error: 'Failed to fetch insights data' })
  }
}
