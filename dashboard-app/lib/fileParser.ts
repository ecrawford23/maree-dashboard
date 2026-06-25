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
 * Map of canonical file locations for each client (REAL structure)
 * These point to ~/Downloads/Maree Creative/02_Clients/[CLIENT]/
 */
export const CLIENT_FILE_PATHS: Record<string, Record<string, string>> = {
  'maree-creative': {
    narrative: 'canonical-files/02_Clients/Marée Creative/00_Intake & Discovery/NARRATIVE-BRIEF.md',
    calendar: 'canonical-files/02_Clients/Marée Creative/03_Deliverables/SOCIAL-CALENDAR.md',
    audit: 'canonical-files/02_Clients/Marée Creative/00_Intake & Discovery/SOCIAL-AUDIT.md',
  },
  'channel-south': {
    narrative: 'canonical-files/02_Clients/Channel South/00_Intake & Discovery/NARRATIVE-BRIEF.md',
    calendar: 'canonical-files/02_Clients/Channel South/03_Deliverables/SOCIAL-CALENDAR.md',
    audit: 'canonical-files/02_Clients/Channel South/00_Intake & Discovery/COMPETITIVE-AUDIT.md',
  },
  'bellamare': {
    narrative: 'canonical-files/02_Clients/Bellamare/00_Intake & Discovery/NARRATIVE-BRIEF.md',
    calendar: 'canonical-files/02_Clients/Bellamare/03_Deliverables/SOCIAL-CALENDAR.md',
    audit: 'canonical-files/02_Clients/Bellamare/00_Intake & Discovery/COMPETITIVE-AUDIT.md',
  },
  'gallery-madison': {
    narrative: 'canonical-files/02_Clients/Gallery Madison/00_Intake & Discovery/NARRATIVE-BRIEF.md',
    calendar: 'canonical-files/02_Clients/Gallery Madison/03_Deliverables/SOCIAL-CALENDAR.md',
    audit: 'canonical-files/02_Clients/Gallery Madison/00_Intake & Discovery/COMPETITIVE-AUDIT.md',
  },
  'germantown-village': {
    narrative: 'canonical-files/02_Clients/Germantown Village/00_Intake & Discovery/NARRATIVE-BRIEF.md',
    calendar: 'canonical-files/02_Clients/Germantown Village/03_Deliverables/SOCIAL-CALENDAR.md',
    audit: 'canonical-files/02_Clients/Germantown Village/00_Intake & Discovery/COMPETITIVE-AUDIT.md',
  },
};

/**
 * Agent output files (company-wide intelligence)
 */
export const AGENT_OUTPUT_PATHS = {
  performance: 'canonical-files/03_Analytics/performance-analysis/PERFORMANCE-ANALYSIS.md',
  postingSchedule: 'canonical-files/03_Analytics/POSTING-SCHEDULE-RECOMMENDATIONS.md',
  trends: 'canonical-files/03_Analytics/trends/TODAYS-OPPORTUNITIES.md',
  competitors: 'canonical-files/03_Analytics/competitor-analysis/WEEKLY-COMPETITOR-MOVES.md',
  productionChecklist: 'canonical-files/02_Systems/production-checklists/PRODUCTION-CHECKLIST-THIS-WEEK.md',
  diversityReport: 'canonical-files/02_Systems/production-checklists/DIVERSITY-REPORT-CURRENT-WEEK.md',
  intelligenceBrief: 'canonical-files/03_Analytics/intelligence-reports/FRIDAY-INTELLIGENCE-BRIEF.md',
};

/**
 * Intelligence rules that should be displayed with metrics
 * Maps to AGENT-INTELLIGENCE-RULES.md
 */
export const INTELLIGENCE_INSIGHTS = {
  authenticity: {
    rule: 'Authenticity > Polish',
    insight: 'Founder/team content (phone videos, casual) gets 3x engagement vs designed graphics',
    action: 'Test 60% authentic / 40% designed content split',
  },
  engagementDepth: {
    rule: 'Engagement Depth > Reach',
    insight: '50 real comments beats 10 posts with zero engagement',
    action: 'Aim for >0.1 comments per like. Respond to comments <2 hours for 3x conversion',
  },
  distribution: {
    rule: 'Distribution > Creation',
    insight: 'One great piece repurposed across 5 platforms beats 5 mediocre native pieces',
    action: 'Create once, distribute 5 ways (IG Reel, TikTok, LinkedIn carousel, YouTube Short, email)',
  },
  hook: {
    rule: 'First 1-2 Seconds = Make or Break',
    insight: 'TikTok/Reels with 0-2s hooks get 4x algorithmic push vs slow intros',
    action: 'Lead with text/visual hook in frame 1. No setup, no buildup',
  },
  niche: {
    rule: 'Niche Consistency',
    insight: 'Jumping between topics kills algorithmic growth. One niche = 2-3x faster growth',
    action: 'Stick to one topic for 80% of posts. Maximize algorithmic familiarity',
  },
  testThenPay: {
    rule: 'Test Organic Before Paid',
    insight: 'Run content 3-5 days organically first. Prove it resonates before spending on ads',
    action: 'Use 70% of effort on organic testing. Amplify winners with 30% paid budget',
  },
};

/**
 * Parse PERFORMANCE-METRICS.md to extract real Meta API data
 */
export function parsePerformanceMetrics(content: string) {
  const metrics: Record<string, any> = {};

  // Extract platform sections
  const platformMatches = content.match(/## (Instagram|Facebook|TikTok|LinkedIn)/g) || [];

  for (const platform of platformMatches) {
    const platformName = platform.replace('## ', '');
    const platformSection = content.split(platform)[1]?.split('##')[0] || '';

    const followerMatch = platformSection.match(/\| Followers\s*\|\s*(\d+)/);
    const engagementMatch = platformSection.match(/\| Engagement Rate\s*\|\s*([\d.]+)%/);
    const reachMatch = platformSection.match(/\| Reach.*?\|\s*(\d+)/);
    const impressionsMatch = platformSection.match(/\| Impressions.*?\|\s*(\d+)/);

    metrics[platformName.toLowerCase()] = {
      followers: followerMatch ? parseInt(followerMatch[1]) : 0,
      engagementRate: engagementMatch ? parseFloat(engagementMatch[1]) : 0,
      reach: reachMatch ? parseInt(reachMatch[1]) : 0,
      impressions: impressionsMatch ? parseInt(impressionsMatch[1]) : 0,
    };
  }

  return metrics;
}

/**
 * Parse SOCIAL-CALENDAR.md to extract scheduled posts with status
 */
export function parseCalendar(content: string) {
  const posts: Array<any> = [];
  const postMatches = content.match(/###\s+\d+:\d+\s+(.*?)(?=###|\n##|\Z)/gs) || [];

  for (const match of postMatches) {
    const titleMatch = match.match(/\*\*Title:\*\*\s*(.+)/);
    const platformMatch = match.match(/\*\*Platform:\*\*\s*(.+)/);
    const statusMatch = match.match(/\*\*Status:\*\*\s*(.+)/);
    const formatMatch = match.match(/\*\*Format:\*\*\s*(.+)/);
    const captionMatch = match.match(/\*\*Caption:\*\*\s*"(.+?)"/);

    if (titleMatch) {
      posts.push({
        title: titleMatch[1].trim(),
        platform: platformMatch ? platformMatch[1].trim() : 'Instagram',
        status: statusMatch ? statusMatch[1].trim() : 'Draft',
        format: formatMatch ? formatMatch[1].trim() : 'Post',
        caption: captionMatch ? captionMatch[1].trim() : '',
      });
    }
  }

  return posts;
}
