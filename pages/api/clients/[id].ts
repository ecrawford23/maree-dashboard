import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

interface UpdatePayload {
  thisWeekPosts?: number
  assetsReady?: number
  status?: string
  followers?: number
  engagement?: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const updates: UpdatePayload = req.body

  try {
    // Map client ID to their canonical file
    const fileMap: Record<string, string> = {
      'channel-south': 'canonical-files/02_Clients/Channel South/2026_0624_Organic-Growth-Tracker.md',
      'bellamare': 'canonical-files/02_Clients/Bellamare/Social Media/2026_0624_Organic-Growth-Tracker.md',
      'maree-creative': 'canonical-files/_SOCIAL/2026_0624_MAREE-IG-AUDIT-DEEP.md',
      'gallery-madison': 'canonical-files/_SOCIAL/Gallery Madison/2026-06-24_NARRATIVE-BRIEF_Gallery-Madison-July-IG-FB.md',
      'germantown-village': 'canonical-files/02_Clients/Germantown Village/00_Intake & Discovery/GERMANTOWN-NARRATIVE-BRIEF-JULY-2026.md',
    }

    const filePath = fileMap[id as string]
    if (!filePath) {
      return res.status(404).json({ error: 'Client not found' })
    }

    const fullPath = path.join(process.cwd(), '..', '..', filePath)

    // Read the file
    let content = fs.readFileSync(fullPath, 'utf-8')

    // Update metrics in the file content
    if (updates.thisWeekPosts !== undefined) {
      // Update posts count in tracker
      content = content.replace(
        /\*\*Posts to date:\*\*\s*(\d+)/,
        `**Posts to date:** ${updates.thisWeekPosts}`
      )
    }

    if (updates.status !== undefined) {
      // Update status
      content = content.replace(
        /\*\*Status:\*\*\s*(.+?)(\n|$)/,
        `**Status:** ${updates.status}\n`
      )
    }

    if (updates.followers !== undefined) {
      // Update followers
      content = content.replace(
        /\*\*Followers:\*\*\s*(\d+)/,
        `**Followers:** ${updates.followers}`
      )
    }

    // Write back to file
    fs.writeFileSync(fullPath, content, 'utf-8')

    // Return success
    res.status(200).json({
      success: true,
      message: 'Client data updated',
      file: filePath,
      updates,
    })
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(500).json({ error: 'Failed to update client data' })
  }
}
