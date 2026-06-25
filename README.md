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
dashboard-app/
├── pages/
│   ├── index.tsx           # Main dashboard overview
│   ├── clients/[id].tsx    # Per-client detail page
│   └── _app.tsx            # App wrapper
├── public/
│   └── data.json           # Master data (updated by agents)
├── styles/
│   └── dashboard.module.css # All styling
├── package.json
├── next.config.js
├── tsconfig.json
├── DEPLOY.md              # Vercel deployment guide
└── README.md              # This file
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

## 🤖 Automation Agents

Each agent runs on a schedule and updates `public/data.json`:

| Agent | Schedule | Updates | Purpose |
|-------|----------|---------|---------|
| Performance Analyzer | Mon 10 AM | Top posts, engagement metrics | Finds what worked last week |
| Time Recommender | Mon 11 AM | Optimal posting windows | Best time to post per platform |
| Diversity Tracker | Fri 3 PM | Content format balance | Ensures mix of Reels, Carousels, Stories, Static |
| Trend Spotter | Daily 8 AM | Trending topics | Relevant hashtags & news to tie into |
| Competitor Monitor | Tue 9 AM | Competitor activity | What competitors posted, what worked |
| Production Manager | Sun 6 PM | Asset status checklist | What's missing, what's ready |
| Intelligence Report | Fri 4 PM | Weekly summary | All insights in one brief |

**Setup:** See [AUTOMATION-AGENTS.md](../AUTOMATION-AGENTS.md) for Claude Code schedule commands.

---

## 🔄 Data Flow

```
Claude Code Agents update public/data.json
         ↓
git commit + push to GitHub (your repo)
         ↓
GitHub webhook → Vercel API
         ↓
Vercel rebuilds Next.js app in ~10 seconds
         ↓
Dashboard live-updates (no refresh needed)
```

**Important:** Only GitHub pushes trigger rebuilds. Manual edits to local data.json won't show until you commit & push.

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

## 📝 Adding Clients or Data

Edit `public/data.json` directly:

```json
{
  "clients": [
    {
      "id": "new-client",
      "name": "New Client Name",
      "color": "#color-code",
      "type": "Industry",
      "platforms": [
        {
          "name": "Instagram",
          "followers": 5000,
          "engagement": 4.2,
          "url": "https://instagram.com/..."
        }
      ],
      ...
    }
  ]
}
```

After editing:
```bash
git add public/data.json
git commit -m "chore: add new client"
git push origin main
```

Dashboard updates automatically within 30 seconds.

---

## ⚠️ Known Limitations

- Dashboard is **read-only** — agents update data, you view it
- No built-in post scheduling — that's in Hootsuite/Buffer/Later (agents monitor those)
- No authentication yet — deploy on private Vercel team or add Vercel Protection

---

## 📞 Questions?

- **Deployment issues?** See [DEPLOY.md](./DEPLOY.md)
- **Agent setup?** See [AUTOMATION-AGENTS.md](../AUTOMATION-AGENTS.md)
- **Data structure?** Check `public/data.json` comments
- **Design changes?** Edit `styles/dashboard.module.css`

---

**Built for Marée Creative's SMMA operation** — Designed for ADHD-friendly clarity, color coding, and zero ambiguity. ✨
