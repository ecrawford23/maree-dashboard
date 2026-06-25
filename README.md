# 📊 Marée Creative — Social Media Command Center

A production-ready SMMA dashboard for managing 5 clients' social media strategy, content calendars, performance tracking, and automation.

**Live Dashboard:** Deploys to Vercel with automatic updates from Claude Code agents.

---

## ✨ Features

✅ **5 Real Clients** — Channel South, Bellamare, The Gallery Madison, Germantown Village, Marée Creative  
✅ **Color-Coded Organization** — Each client has unique color for quick visual scanning  
✅ **Weekly Overview** — At-a-glance stats: posts scheduled, assets ready, avg engagement  
✅ **Per-Client Pages** — Deep dive into each client's platforms, goals, competitors, content themes  
✅ **Engagement Window** — Real-time optimal posting times (via Performance Analyzer agent)  
✅ **Progress Bars & Charts** — ADHD-friendly visual design (no text walls)  
✅ **7 Automation Agents** — Performance analysis, trend spotting, competitor monitoring, production tracking  
✅ **GitHub Sync** — Agents push updates → Vercel rebuilds → dashboard live-updates  

---

## 🗂️ Project Structure

```
maree-dashboard/
├── pages/
│   ├── index.tsx           # Main dashboard overview
│   ├── clients/[id].tsx    # Per-client detail page
│   ├── api/clients.ts      # API endpoint (reads canonical files)
│   └── _app.tsx            # App wrapper
├── canonical-files/        # Single source of truth (synced by agents)
│   ├── 02_Clients/[CLIENT]/
│   │   ├── 00_Intake & Discovery/
│   │   ├── 03_Deliverables/
│   │   └── 04_Analytics/
│   └── 03_Analytics/       # Shared agent outputs
├── styles/
│   └── dashboard.module.css # All styling
├── lib/
│   └── fileParser.ts       # Parse markdown files
├── package.json
├── next.config.js
├── tsconfig.json
├── vercel.json             # Vercel config
└── README.md               # This file
```

---

## 🚀 Getting Started

### Local Development
```bash
npm install
npm run dev
# Opens http://localhost:3000
```

### Deploy to Vercel
See [DEPLOY.md](./DEPLOY.md) for step-by-step instructions.

TL;DR:
1. Push to GitHub
2. Import repo at https://vercel.com/new
3. Deploy (automatic Next.js detection)
4. Agents commit updates → dashboard auto-updates

---

## 📊 Dashboard Pages

### Main Dashboard (`/`)
- **Overview** — Total posts, assets ready, assets missing, avg engagement
- **Alerts** — What needs attention this week
- **Client Grid** — All 5 clients with status, progress bars, metrics
- **Automation Status** — All 7 agents with last run & next run times

### Client Detail (`/clients/[id]`)
- **Platforms** — Followers & engagement per platform with links
- **This Week's Posts** — Scheduled count, assets ready, next batch due
- **Top Performing Post** — Best engagement from last week
- **Content Themes** — What works for this client
- **SEO Keywords** — Monitored search terms
- **Competitors** — Accounts to track

---

## 🤖 Automation Agents (M/W/F Schedule)

Each agent runs on schedule and updates `canonical-files/`:

| Agent | Schedule | Output File | Purpose |
|-------|----------|---------|---------|
| Performance Analyzer | Mon 10 AM | `03_Analytics/performance-analysis/PERFORMANCE-ANALYSIS.md` | Top posts, engagement metrics |
| Time Recommender | Mon 11 AM | `03_Analytics/POSTING-SCHEDULE-RECOMMENDATIONS.md` | Optimal posting windows |
| Production Manager | Mon 12:30 PM | `02_Systems/production-checklists/PRODUCTION-CHECKLIST-THIS-WEEK.md` | Asset status checklist |
| Trend Spotter | Wed 8 AM | `03_Analytics/trends/WEEKLY-OPPORTUNITIES.md` | Trending topics & news |
| Competitor Monitor | Wed 9 AM | `03_Analytics/competitor-analysis/WEEKLY-COMPETITOR-MOVES.md` | Competitor activity |
| Diversity Tracker | Fri 3 PM | `02_Systems/production-checklists/DIVERSITY-REPORT-CURRENT-WEEK.md` | Format balance analysis |
| Intelligence Report | Fri 4 PM | `03_Analytics/intelligence-reports/FRIDAY-INTELLIGENCE-BRIEF.md` | Weekly synthesis brief |

**Setup:** See [MARÉE-AGENT-SYSTEM.md](../MARÉE-AGENT-SYSTEM.md) for exact prompts and Claude Code commands.

---

## 🔄 Data Flow

```
Claude Code Agents update canonical-files/
         ↓
git commit + push to GitHub (your repo)
         ↓
GitHub webhook → Vercel API
         ↓
Vercel rebuilds Next.js app in ~10 seconds
         ↓
Dashboard reads from GitHub raw URLs → live-updates
```

**Important:** Only GitHub pushes trigger rebuilds. Local edits won't show until you commit & push.

---

## 📱 Design System

### Colors (Client-Coded)
- Channel South: `#667eea` (Blue)
- Bellamare: `#10b981` (Green)
- Gallery Madison: `#f59e0b` (Amber)
- Germantown Village: `#ec4899` (Pink)
- Marée Creative: `#8b5cf6` (Purple)

### Components
- **Progress Bars** — Visual status at a glance
- **Status Badges** — "Exceeding", "On Track", "Below Goal"
- **Metric Grids** — 2-3 columns of key numbers
- **Alert Box** — Yellow highlight for items needing attention
- **Section Titles** — Bold, uppercase, scannable

---

## 🛠️ Tech Stack

- **Next.js 14** — React framework with SSR & static generation
- **TypeScript** — Type-safe components
- **CSS Modules** — Isolated styling (styles/dashboard.module.css)
- **Vercel** — Deployment platform
- **GitHub** — Version control + webhooks

---

## 📝 Adding Client Data

Data lives in `canonical-files/02_Clients/[CLIENT]/`:

### Client Folder Structure
```
canonical-files/02_Clients/[CLIENT]/
├── 00_Intake & Discovery/
│   ├── NARRATIVE-BRIEF.md         # Brand overview & strategy
│   ├── COMPETITIVE-AUDIT.md       # Competitor analysis
│   └── SOCIAL-AUDIT.md            # Current channel audit
├── 03_Deliverables/
│   └── SOCIAL-CALENDAR.md         # Scheduled posts with status
├── 04_Analytics/
│   └── PERFORMANCE-METRICS.md     # Meta API data + insights
└── _Archive/                       # Old versions (date-stamped)
```

### To Add a New Client
1. Create folder: `canonical-files/02_Clients/[NEW_CLIENT]/`
2. Create subdirectories (00_*, 03_*, 04_*)
3. Add markdown files with client data
4. Push to GitHub
```bash
git add canonical-files/02_Clients/[NEW_CLIENT]/
git commit -m "feat: add [new-client] data"
git push origin main
```

Dashboard auto-updates within 30 seconds.

---

## ⚠️ Known Limitations

- Dashboard is **read-only** — agents update canonical-files, dashboard reads live
- Agent automation requires Claude Code setup (scheduled tasks with git push access)
- No built-in post scheduling — agents monitor Hootsuite/Buffer/Later
- No authentication yet — deploy on private Vercel team or add Vercel Protection

---

## 📞 Questions?

- **Deployment issues?** See [DEPLOY.md](./DEPLOY.md)
- **Agent setup?** See [MARÉE-AGENT-SYSTEM.md](../MARÉE-AGENT-SYSTEM.md)
- **Data structure?** Check `canonical-files/` folder structure above
- **Design changes?** Edit `styles/dashboard.module.css`
- **File parsing?** See `lib/fileParser.ts` for markdown parsing logic

---

**Built for Marée Creative's SMMA operation** — Designed for ADHD-friendly clarity, color coding, and zero ambiguity. ✨
