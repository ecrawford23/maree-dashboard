import type { NextApiRequest, NextApiResponse } from 'next'
import { getFileContent, parseCalendar } from '../../lib/fileParser'

interface CalendarPost {
  date: string
  time: string
  title: string
  platform: string
  format: string
  status: string
  caption: string
  engagement?: {
    likes: number
    comments: number
    shares: number
    rate: string
  }
}

interface CalendarResponse {
  clientId: string
  clientName: string
  week: string
  posts: CalendarPost[]
}

const CLIENTS = [
  { id: 'maree-creative', name: 'Marée Creative', folder: 'Marée Creative' },
  { id: 'channel-south', name: 'Channel South', folder: 'Channel South' },
  { id: 'bellamare', name: 'Bellamare', folder: 'Bellamare' },
  { id: 'gallery-madison', name: 'The Gallery Madison', folder: 'Gallery Madison' },
  { id: 'germantown-village', name: 'Germantown Village', folder: 'Germantown Village' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<CalendarResponse[] | { error: string }>) {
  try {
    const calendarData: CalendarResponse[] = []

    for (const client of CLIENTS) {
      const calendarPath = `canonical-files/02_Clients/${client.folder}/03_Deliverables/SOCIAL-CALENDAR.md`
      const content = getFileContent(calendarPath)

      if (content) {
        const posts = parseCalendar(content)

        calendarData.push({
          clientId: client.id,
          clientName: client.name,
          week: 'Week of June 24–30, 2026',
          posts: posts as CalendarPost[],
        })
      }
    }

    res.status(200).json(calendarData)
  } catch (error) {
    console.error('Error fetching calendar:', error)
    res.status(500).json({ error: 'Failed to fetch calendar data' })
  }
}
