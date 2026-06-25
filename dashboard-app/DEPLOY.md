# Marée Creative SMMA Dashboard — Deployment Guide

## Overview
This is a production-ready Next.js 14 app that syncs with Claude Code automation agents via GitHub. When agents update `public/data.json`, Vercel automatically rebuilds and deploys.

---

## 🚀 Quick Start

### 1. Create GitHub Repository
```bash
cd ~/Downloads/Maree\ Creative/dashboard-app
git init
git add .
git commit -m "Initial dashboard setup with all clients"
git remote add origin https://github.com/YOUR_USERNAME/maree-dashboard.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to https://vercel.com/new
2. Import the GitHub repository
3. Choose **Next.js** framework preset
4. Click "Deploy"

Vercel automatically detects the Next.js config and handles everything.

### 3. Verify Deployment
After ~2–3 minutes, your dashboard should be live at a URL like:
```
https://maree-dashboard-xxxxx.vercel.app
```

---

## 🔄 GitHub + Vercel Integration

### How It Works
1. Claude Code agents update `/public/data.json` locally
2. You (or Claude Code) commit and push to GitHub: `git push origin main`
3. Vercel webhook triggers automatically
4. Vercel rebuilds the Next.js app with fresh data
5. Dashboard live-updates within 30 seconds

### Enable GitHub Auto-Deploy
Vercel auto-enables this when you import a GitHub repo. To verify:
1. Log in to https://vercel.com
2. Select your project
3. Go to **Settings** → **Git**
4. Confirm "Deploy on every push" is ON

---

## 📝 Claude Code Agent Setup

### How Agents Update Data

Each Claude Code agent should update `public/data.json` after running. Example:

```bash
# Agent runs analysis
# ... generates insights ...

# Agent commits changes
git add public/data.json
git commit -m "chore(perf-analyzer): Update engagement metrics for week of June 24"
git push origin main
```

### Agent File Paths

All agents should reference these paths:

| Agent | Updates | Path |
|-------|---------|------|
| Performance Analyzer | Top posts, engagement metrics | `public/data.json` → `automationStatus.performanceAnalyzer` |
| Time Recommender | Posting schedules | `public/data.json` → `engagementWindow` |
| Diversity Tracker | Content format balance | `public/data.json` → `clients[].posts[].type` |
| Trend Spotter | Trending topics | `public/data.json` → Add to each client's keywords |
| Competitor Monitor | Competitor activity | `public/data.json` → `clients[].competitors` |
| Production Manager | Asset status | `public/data.json` → `clients[].assetsReady` |
| Intelligence Report | Weekly summary | Create `weekly-report.json` in root |

### Example Agent Workflow

```javascript
// After agent completes task:
const fs = require('fs');

// Read current data
const data = JSON.parse(fs.readFileSync('public/data.json', 'utf-8'));

// Update it
data.automationStatus.performanceAnalyzer = {
  name: 'Performance Analyzer',
  lastRun: new Date().toLocaleString(),
  nextRun: 'Next Monday 10:00 AM',
  status: 'active'
};

// Write back
fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));

// Commit & push
exec('git add public/data.json && git commit -m "chore: update performance metrics" && git push origin main');
```

---

## 🔗 Deployment Checklist

- [ ] GitHub repo created and connected to Vercel
- [ ] First deployment successful (check Vercel dashboard)
- [ ] Dashboard accessible at live URL
- [ ] GitHub webhook triggers rebuilds (test by editing data.json locally, committing, and watching Vercel logs)
- [ ] All 5 clients visible on dashboard
- [ ] Client detail pages load correctly
- [ ] Automation status shows all 7 agents

---

## 📊 Data Flow

```
Claude Code Agents
       ↓
  Update local data.json
       ↓
  git push to GitHub
       ↓
  GitHub webhook → Vercel
       ↓
  Vercel rebuilds Next.js app
       ↓
  Dashboard live-updates
```

---

## 🛠️ Development

### Run Locally
```bash
npm install
npm run dev
# Opens http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## 🚨 Troubleshooting

### Dashboard not updating after push?
1. Check Vercel **Deployments** tab — is a new build running?
2. Check GitHub **Actions** — any failed commits?
3. Hard-refresh your browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)
4. Check browser console for errors: **F12** → **Console**

### Build failing on Vercel?
1. Go to Vercel dashboard → your project → **Deployments**
2. Click the failed build to see logs
3. Common issues:
   - Invalid JSON in `public/data.json` — validate with `npm run lint`
   - Missing dependencies — re-run `npm install`
   - TypeScript errors — check pages/*.tsx for syntax

### Agents can't commit?
Ensure agents have:
- Git configured: `git config --global user.name "Claude Code"`
- SSH key set up for GitHub
- Correct repo path: `/Users/eviecrawford/Downloads/Maree\ Creative/dashboard-app`

---

## 📞 Support

For Vercel issues: https://vercel.com/docs
For Next.js questions: https://nextjs.org/docs
For GitHub sync help: https://docs.github.com/en/get-started/getting-started-with-git
