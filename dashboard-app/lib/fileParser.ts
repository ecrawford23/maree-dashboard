import fs from 'fs';
import path from 'path';

/**
 * Parse Organic-Growth-Tracker.md to extract baseline metrics
 * Reads from: 02_Clients/[client]/[path]/Organic-Growth-Tracker.md
 */
export function parseGrowthTracker(content: string) {
  const followers = content.match(/\*\*Followers:\*\*\s*(\d+)/);
  const postsToDate = content.match(/\*\*Posts to date:\*\*\s*(\d+)/);
  const monthlyGoal = content.match(/Followers:\s*\+(\d+)/);

  return {
    followers: followers ? parseInt(followers[1]) : 0,
    postsToDate: postsToDate ? parseInt(postsToDate[1]) : 0,
    monthlyFollowerGoal: monthlyGoal ? parseInt(monthlyGoal[1]) : 0,
  };
}

/**
 * Parse social audit markdown to extract engagement metrics
 * Reads from: _SOCIAL/[file]-AUDIT-DEEP.md
 */
export function parseSocialAudit(content: string) {
  const followers = content.match(/\*\*Total followers\*\*\s*\|\s*(\d+)/);
  const engagement = content.match(/\*\*Accounts engaged\*\*\s*\|\s*([0-9.]+)%/);
  const bestTime = content.match(/\*\*Best time to post\*\*\s*\|\s*(.+?)\s*\|/);

  return {
    followers: followers ? parseInt(followers[1]) : 0,
    engagementRate: engagement ? parseFloat(engagement[1]) : 0,
    bestTimeToPost: bestTime ? bestTime[1].trim() : 'Not specified',
  };
}

/**
 * Parse narrative brief to extract strategy and goals
 * Reads from: _SOCIAL/[client]/NARRATIVE-BRIEF-*.md or 02_Clients/[client]/NARRATIVE-BRIEF-*.md
 */
export function parseNarrativeBrief(content: string) {
  const expectedFollowers = content.match(/Expected audience growth:\s*(\d+)/);
  const contentPillars = content.match(/## .*?PILLARS.*?\n([\s\S]+?)##/);
  const postingFrequency = content.match(/\*\*Frequency:\*\*\s*(.+?)\n/);

  let pillars: string[] = [];
  if (contentPillars) {
    const pillarText = contentPillars[1];
    const pillarMatches = pillarText.match(/###\s+\d+\.\s+(.+?)\n/g);
    if (pillarMatches) {
      pillars = pillarMatches.map(p => p.replace(/###\s+\d+\.\s+/, '').replace(/\n/, ''));
    }
  }

  return {
    expectedFollowers: expectedFollowers ? parseInt(expectedFollowers[1]) : 0,
    contentPillars: pillars,
    postingFrequency: postingFrequency ? postingFrequency[1].trim() : 'Not specified',
  };
}

/**
 * Get file content from repo (Vercel will have access via git)
 */
export function getFileContent(relativePath: string): string | null {
  try {
    const fullPath = path.join(process.cwd(), '..', '..', relativePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf-8');
    }
  } catch (error) {
    console.error(`Error reading file: ${relativePath}`, error);
  }
  return null;
}

/**
 * Map of canonical file locations for each client
 */
export const CLIENT_FILE_PATHS: Record<string, Record<string, string>> = {
  'maree-creative': {
    audit: '_SOCIAL/2026_0624_MAREE-IG-AUDIT-DEEP.md',
    narrative: '_SOCIAL/2026_0624_MAREE-Social-Narrative-Brief.md',
    calendar: '_SOCIAL/2026-07-24_Maree-Social-Calendar-July.xlsx',
  },
  'channel-south': {
    tracker: '02_Clients/Channel South/2026_0624_Organic-Growth-Tracker.md',
    audit: '02_Clients/Channel South/Claude Channel South/2026-06-15_channel-south-social-audit-DEEP.md',
    calendar: '02_Clients/Channel South/2026-06-17_channel-south-CONTENT-BATCH-ready.md',
  },
  'bellamare': {
    tracker: '02_Clients/Bellamare/Social Media/2026_0624_Organic-Growth-Tracker.md',
    calendar: '02_Clients/Bellamare/Social Media/2026_0624_Bellamare-July-Social-Calendar.md',
  },
  'gallery-madison': {
    narrative: '_SOCIAL/Gallery Madison/2026-06-24_NARRATIVE-BRIEF_Gallery-Madison-July-IG-FB.md',
    audit: '_SOCIAL/Gallery Madison/2026-06-24_GALLERY-COMPETITOR-AUDIT.md',
    calendar: '_SOCIAL/Gallery Madison/2026-06-24_JULY-CALENDAR_Gallery-Madison-30day.md',
  },
  'germantown-village': {
    narrative: '02_Clients/Germantown Village/00_Intake & Discovery/GERMANTOWN-NARRATIVE-BRIEF-JULY-2026.md',
    calendar: '02_Clients/Germantown Village/03_Deliverables/GV-July-2026-Social-Calendar.docx',
  },
};
