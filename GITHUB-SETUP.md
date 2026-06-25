# GitHub Setup — Live Data Sync for Dashboard

**Goal:** Commit your canonical audit/strategy files to GitHub so the Vercel dashboard reads from them and auto-updates whenever you (or Claude Code agents) push changes.

---

## 🎯 The Flow

```
Your Local Files (canonical source)
    ↓ git push origin main
GitHub Repository
    ↓ webhook
Vercel API Routes
    ↓ reads files from GitHub
Dashboard
    ↓ displays live metrics
```

**Result:** When agents update files and push, dashboard auto-reflects within 30 seconds.

---

## 📁 Files to Commit to GitHub

Your dashboard app needs access to these canonical files. Commit them to the same GitHub repo as the app code (under a `/canonical-files/` directory or at the repo root).

### Directory Structure to Commit

```
maree-dashboard/ (your GitHub repo)
├── dashboard-app/
│   ├── pages/
│   ├── lib/
│   ├── public/
│   └── ... (app code)
│
└── canonical-files/                    ← NEW: All audit/strategy files
    ├── _SOCIAL/
    │   ├── 2026_0624_MAREE-IG-AUDIT-DEEP.md
    │   ├── Gallery Madison/
    │   │   ├── 2026-06-24_NARRATIVE-BRIEF_Gallery-Madison-July-IG-FB.md
    │   │   ├── 2026-06-24_GALLERY-COMPETITOR-AUDIT.md
    │   │   └── 2026-06-24_JULY-CALENDAR_Gallery-Madison-30day.md
    │   └── [+ other Germantown files]
    │
    └── 02_Clients/
        ├── Channel South/
        │   └── 2026_0624_Organic-Growth-Tracker.md
        ├── Bellamare/Social Media/
        │   └── 2026_0624_Organic-Growth-Tracker.md
        └── Germantown Village/
            └── 00_Intake & Discovery/
                └── GERMANTOWN-NARRATIVE-BRIEF-JULY-2026.md
```

---

## 🚀 Step 1: Create GitHub Repository

```bash
# Create new repo at github.com/your-username/maree-dashboard
# OR use existing repo

# Clone it locally
git clone https://github.com/your-username/maree-dashboard.git
cd maree-dashboard
```

---

## 📦 Step 2: Copy Files into Repo

```bash
# Create canonical-files directory
mkdir -p canonical-files/_SOCIAL
mkdir -p canonical-files/02_Clients

# Copy your actual files into canonical-files/
# (Replace paths with your actual locations)

cp -r ~/Downloads/Maree\ Creative/_SOCIAL/* canonical-files/_SOCIAL/
cp -r ~/Downloads/Maree\ Creative/02_Clients/* canonical-files/02_Clients/

# Copy dashboard app code into repo/
cp -r ~/Downloads/Maree\ Creative/dashboard-app/* ./dashboard-app/
```

---

## 🔗 Step 3: Update API File Paths

The API needs to know where to find the canonical files in the GitHub repo. Update `lib/fileParser.ts`:

```typescript
export const CLIENT_FILE_PATHS: Record<string, Record<string, string>> = {
  'maree-creative': {
    audit: 'canonical-files/_SOCIAL/2026_0624_MAREE-IG-AUDIT-DEEP.md',
    narrative: 'canonical-files/_SOCIAL/2026_0624_MAREE-Social-Narrative-Brief.md',
    calendar: 'canonical-files/_SOCIAL/2026-07-24_Maree-Social-Calendar-July.xlsx',
  },
  'channel-south': {
    tracker: 'canonical-files/02_Clients/Channel South/2026_0624_Organic-Growth-Tracker.md',
    audit: 'canonical-files/02_Clients/Channel South/Claude Channel South/2026-06-15_channel-south-social-audit-DEEP.md',
  },
  // ... etc
}
```

---

## ✅ Step 4: Commit & Push

```bash
# From maree-dashboard repo root
git add .
git commit -m "feat: add canonical files + dashboard app"
git push origin main
```

---

## 🔄 Step 5: Deploy to Vercel

```bash
# Create Vercel project connected to GitHub repo
vercel link

# Deploy
vercel --prod

# OR: Vercel auto-deploys on every git push
```

**That's it.** Vercel now has access to all your files and the API reads from them.

---

## 🤖 How Claude Code Agents Update Files

### When an agent runs (e.g., Performance Analyzer):

1. **Agent reads** your local files (same files as in GitHub)
2. **Agent updates** the metrics in the files
3. **Agent commits:**
   ```bash
   git add canonical-files/02_Clients/Bellamare/2026_0624_Organic-Growth-Tracker.md
   git commit -m "chore(perf-analyzer): update engagement metrics"
   git push origin main
   ```
4. **GitHub webhook** fires → Vercel gets notified
5. **Vercel rebuilds** → API re-reads updated files
6. **Dashboard auto-refreshes** (no manual action needed)

---

## 🔍 How Vercel Reads Your Files

The API routes (`/api/clients`, `/api/dashboard`) use Node.js `fs` module to read files from the repo:

```typescript
// In pages/api/clients.ts
const fileContent = getFileContent('canonical-files/02_Clients/Channel South/2026_0624_Organic-Growth-Tracker.md')
const metrics = parseGrowthTracker(fileContent)
```

**Vercel has full repo access** so this works on the deployed server just like locally.

---

## 📊 What Gets Parsed

Each file type has a parser that extracts metrics:

| File Type | Metric Extracted | Parser Function |
|---|---|---|
| `Organic-Growth-Tracker.md` | Followers, goals, posting frequency | `parseGrowthTracker()` |
| `*-AUDIT-DEEP.md` | Engagement rate, best posting time | `parseSocialAudit()` |
| `NARRATIVE-BRIEF-*.md` | Content pillars, expected growth | `parseNarrativeBrief()` |
| Calendar files | Post count, themes (future expansion) | `parseCalendar()` |

**Add more parsers** as needed for other file types.

---

## 🚨 Troubleshooting

### Dashboard shows old data?
1. Check if files were committed to GitHub: `git log canonical-files/`
2. Check Vercel deployment: https://vercel.com/your-project/deployments
3. Force rebuild: `vercel --prod`

### API returns 404?
1. Verify file paths in `lib/fileParser.ts` match your repo structure
2. Check `canonical-files/` directory exists in repo root
3. Make sure files are committed (not gitignored)

### Agents can't commit?
1. Ensure agent has git configured: `git config --global user.email "claude@anthropic.com"`
2. SSH key or personal token set up for GitHub
3. Correct repo path in agent script

---

## 🔄 Weekly Workflow (After Setup)

**Every Monday:**
1. Agents run on schedule → update canonical files
2. Agents commit & push
3. GitHub webhook → Vercel rebuild
4. Dashboard auto-updates (you see fresh metrics)

**No manual syncing. No API keys. Just git push.**

---

## 📝 Example: Agent Updating Metrics

```bash
# Agent runs at 10 AM Monday
# Reads: canonical-files/02_Clients/Bellamare/2026_0624_Organic-Growth-Tracker.md
# Updates followers from 192 → 210
# Rewrites the file with new metrics

# Then:
git add canonical-files/02_Clients/Bellamare/2026_0624_Organic-Growth-Tracker.md
git commit -m "chore(performance-analyzer): Bellamare +18 followers (192→210)"
git push origin main

# Vercel rebuilds in ~10 seconds
# Dashboard shows 210 followers for Bellamare
# ✅ Done. All auto.
```

---

## 🎯 Key Benefits

✅ **Single source of truth** — GitHub repo  
✅ **Live updates** — agents push → dashboard reflects within 30 sec  
✅ **No manual sync** — git push triggers Vercel rebuild  
✅ **Audit trail** — every change is a git commit  
✅ **Easy rollback** — revert file to any prior commit  
✅ **Team-ready** — multiple people can push updates  

---

Ready to set up? Follow Steps 1–5 above. Once pushed, test by opening your Vercel deployment URL.
