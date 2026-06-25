import type { NextApiRequest, NextApiResponse } from 'next'
import { getFileContent, parseGrowthTracker, parseSocialAudit, parseNarrativeBrief, CLIENT_FILE_PATHS, INTELLIGENCE_INSIGHTS } from '../../lib/fileParser'

interface ClientData {
  id: string
  name: string
  color: string
  type: string
  location: string
  handle: string
  sourceDoc: string
  auditDate: string
  platforms: Array<{ name: string; followers: number; engagement: number; url: string }>
  monthlyGoal: { followers: number; engagement: string }
  competitors: string[]
  keywordsFocus: string[]
  thisWeekPosts: number
  assetsReady: number
  nextBatch: string
  status: string
  topPost: { title: string; engagement: string; reach: string }
  contentThemes: string[]
  intelligence: {
    rule: string
    insight: string
    action: string
  }
}

const CLIENT_METADATA: Record<string, Partial<ClientData>> = {
  'maree-creative': {
    name: 'Marée Creative',
    color: '#8b5cf6',
    type: 'Creative Agency',
    location: 'Southeast',
    handle: '@mareecreative_',
    competitors: ['Other Southeast creative agencies', 'Design studios', 'Branding consultants'],
  },
  'channel-south': {
    name: 'Channel South',
    color: '#667eea',
    type: 'Hospitality/Events',
    location: 'Gulfport, MS',
    handle: '@channelsouthms',
    competitors: ['Holiday Inn Gulfport', 'Local waterfront venues', 'Regional event spaces'],
  },
  'bellamare': {
    name: 'Bellamare',
    color: '#10b981',
    type: 'Real Estate Development',
    location: 'Southeast',
    handle: '@bellamaredevelopment',
    competitors: ['Fidelity Development', 'Southmark Development', 'National developers'],
  },
  'gallery-madison': {
    name: 'The Gallery Madison',
    color: '#f59e0b',
    type: 'Mixed-Use / Arts & Entertainment',
    location: 'Madison, MS',
    handle: '@thegallerymadison',
    competitors: ['Battery Atlanta', 'Halcyon, Alpharetta', 'Avalon, Alpharetta'],
  },
  'germantown-village': {
    name: 'Germantown Village',
    color: '#ec4899',
    type: 'Retail/Community Center',
    location: 'Gluckstadt, MS',
    handle: '@germantownvillage',
    competitors: ['The District at Eastover', 'Madison County retail centers', 'Jackson area shopping'],
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clients: ClientData[] = []

    // Parse each client's canonical files
    for (const [clientId, metadata] of Object.entries(CLIENT_METADATA)) {
      const paths = CLIENT_FILE_PATHS[clientId]
      if (!paths) continue

      // Read tracker or narrative to get baseline metrics
      let trackerData: any = {}
      let narrativeData: any = {}

      if (paths.tracker) {
        const trackerContent = getFileContent(paths.tracker)
        if (trackerContent) {
          trackerData = parseGrowthTracker(trackerContent)
        }
      }

      if (paths.narrative) {
        const narrativeContent = getFileContent(paths.narrative)
        if (narrativeContent) {
          narrativeData = parseNarrativeBrief(narrativeContent)
        }
      }

      if (paths.audit) {
        const auditContent = getFileContent(paths.audit)
        if (auditContent) {
          const auditData = parseSocialAudit(auditContent)
          trackerData = { ...trackerData, ...auditData }
        }
      }

      // Rotate through intelligence insights for visual interest
      const insights = Object.values(INTELLIGENCE_INSIGHTS)
      const insightIndex = clients.length % insights.length
      const currentInsight = insights[insightIndex]

      const client: ClientData = {
        id: clientId,
        name: metadata.name || 'Unknown',
        color: metadata.color || '#gray',
        type: metadata.type || 'Unknown',
        location: metadata.location || 'Unknown',
        handle: metadata.handle || '',
        sourceDoc: paths.tracker || paths.narrative || paths.audit || '',
        auditDate: '2026-06-24',
        platforms: [
          {
            name: 'Instagram',
            followers: trackerData.followers || 0,
            engagement: trackerData.engagementRate || 3.5,
            url: `https://instagram.com/${metadata.handle?.replace('@', '') || clientId}`,
          },
        ],
        monthlyGoal: {
          followers: trackerData.monthlyFollowerGoal || 50,
          engagement: '3.5%',
        },
        competitors: metadata.competitors || [],
        keywordsFocus: narrativeData.contentPillars || [],
        thisWeekPosts: 0,
        assetsReady: 0,
        nextBatch: 'TBD',
        status: 'Loading',
        topPost: { title: 'Loading...', engagement: 'TBD', reach: 'TBD' },
        contentThemes: narrativeData.contentPillars || [],
        intelligence: {
          rule: currentInsight.rule,
          insight: currentInsight.insight,
          action: currentInsight.action,
        },
      }

      clients.push(client)
    }

    res.status(200).json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ error: 'Failed to fetch client data' })
  }
}
