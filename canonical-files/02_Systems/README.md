# 📊 Marée Creative Content Command Center

**Your single source of truth for managing 5 clients, 11 platforms, and +20 posts/week without losing your mind.**

---

## 🚀 Quick Start (Do This First)

### 1. Open the Dashboard
```
~/02_Systems/content-command-center/dashboard.html
```
**What you see:** All 5 accounts at a glance — posts scheduled, assets ready, engagement window reminder.

### 2. Read This Week's Checklist
```
~/02_Systems/weekly-checklist.md
```
**What's inside:** Daily actions with checkboxes, batching schedule, engagement window times.

### 3. Start Batching
- Pick a client from the checklist (Tuesday = Channel South)
- Open: `~/02_Systems/content-calendars/[client].md`
- Follow the template (90-minute batching session)
- Save as you go

---

## 📁 System Structure

### 02_Systems/ (Your Command Center)
```
content-command-center/
├── dashboard.html (open this every morning)
├── data.json (all 5 clients' info + goals)
└── styles.css

content-calendars/
├── channel-south.md (ready to fill in)
├── bellamare.md
├── gallery-madison.md
├── germantown-village.md
└── maree-creative.md

weekly-checklist.md (your daily guide)
README.md (this file)
```

### 03_Analytics/
```
meta-exports/ (where you upload Meta CSVs)
│
performance-reports/ (auto-generated snapshots)
│
baselines.json (your monthly goals per client)
│
equity-tracking.md (proves your impact)
```

### 04_Research/
```
weekly-briefs/ (auto-generated Monday mornings)
├── week-26_channel-south.md
├── week-26_bellamare.md
└── ... (one per client)
```

---

## 📅 Weekly Workflow at a Glance

| Day | What | Where | Time |
|-----|------|-------|------|
| **MON** | Read news briefs + plan | Briefs in `04_Research/` | 30 min |
| **TUE** | Batch Channel South | `02_Systems/content-calendars/` | 90 min |
| **WED** | Batch Bellamare | `02_Systems/content-calendars/` | 90 min |
| **THU** | Batch Gallery + Germantown | `02_Systems/content-calendars/` | 180 min |
| **FRI** | Post + Engagement Window | 9:30-10 AM only | 30 min |
| **MON** | Upload analytics + repeat | `03_Analytics/meta-exports/` | 30 min |

**Total time: ~5.5 hours/week** (batching only, not constant monitoring)

---

## ⏰ Engagement Window

**9:30 AM - 10:00 AM (ONLY TIME YOU CHECK SOCIAL)**

This is your designated 30-minute window to check comments, reply to DMs, and respond to engagement. Everything else is NO-PHONE time.

### The 30-Minute Breakdown
```
9:30-9:35 AM: Channel South (comments + top 2 DMs)
9:35-9:40 AM: Bellamare (comments + top 2 DMs)
9:40-9:43 AM: Gallery Madison (comments + top 1 DM)
9:43-9:48 AM: Germantown Village (comments + top 2 DMs)
9:48-9:55 AM: Marée Creative (comments + all DMs)
9:55-10:00 AM: Flag urgent items, wrap up
```

---

## 🎬 How to Batch Content (90 Min Session)

### Setup (15 min)
- [ ] Open content calendar: `~/02_Systems/content-calendars/[client].md`
- [ ] Read brand profile: `~/02_Clients/[client]/`
- [ ] Read narrative brief: `~/02_Clients/[client]/NARRATIVE-BRIEF.md`
- [ ] Review this week's news brief: `~/04_Research/weekly-briefs/`
- [ ] Set timer for 90 minutes

### Ideation (30 min)
- [ ] Create 10-14 post ideas (this is 2 weeks of content)
- [ ] For each post, write:
  - **Hook:** One-liner that grabs attention
  - **Caption:** Full text
  - **Format:** Carousel / Reel / Static / Story
  - **Schedule time:** (Example: "Tuesday 10am")

### Documentation (20 min)
- [ ] Fill in the content calendar template for each post
- [ ] Mark asset status: ☐ Not started | ⚠️ Draft | ✅ Ready
- [ ] Note any holidays/events that apply

### Asset Creation (20 min)
- [ ] Open Canva
- [ ] Use the client's brand template (saves time)
- [ ] Create quick mockups (don't perfect — speed > perfection)
- [ ] Upload to Meta scheduler
- [ ] Mark ✅ Ready in calendar

### Wrap (5 min)
- [ ] Save calendar file
- [ ] Close Canva
- [ ] You're done — that client has 2 weeks of content

---

## 📊 Analytics & Reporting

### Monthly Update Process (Every First Monday)

1. **Export from Meta Business Suite**
   ```
   Export → CSV for each client
   Download all 5 files
   ```

2. **Upload CSVs**
   ```
   Drag to: ~/03_Analytics/meta-exports/
   File naming: 2026-06_[client-name].csv
   ```

3. **Claude Auto-Parser Runs**
   ```
   Claude reads all CSVs
   Generates performance snapshot
   Updates dashboard
   ```

4. **Read Performance Report**
   ```
   Open: ~/03_Analytics/performance-reports/2026-06_snapshot.md
   Read in ~3 minutes
   ```

5. **Update Equity Tracking**
   ```
   Open: ~/03_Analytics/equity-tracking.md
   Add this month's wins + learnings
   Save for December raise conversation
   ```

### Goals Per Client (Monthly)

| Client | Followers | Engagement | Notes |
|--------|-----------|------------|-------|
| Channel South | +50 | 4%+ | Hospitality venue |
| Bellamare | +100 | 5%+ | Real estate dev |
| Gallery Madison | +150 | 4%+ | Arts + community |
| Germantown Village | +75 | 4%+ | Retail + community |
| Marée Creative | +75 | 5%+ | Your agency |

---

## 🚨 If You Get Behind

### I Only Have 2 Hours
- Batch 1 client only (90 min batching + 30 min assets)
- Push other clients to next week

### I Only Have 30 Minutes
- Skip batching, do engagement window only (9:30-10 AM)
- Batching can wait — engagement is non-negotiable

### The Dashboard Feels Overwhelming
- Close it. Open the weekly checklist instead.
- Checklist is your actual roadmap (dashboard is just status).

### I'm Stuck on a Post Idea
- Check the news brief for that client
- Look at their past top-performing posts
- Use their narrative brief as a prompt ("What story are we telling?")

---

## 📝 Content Calendar Template

When you open a calendar file (e.g., `channel-south.md`), you'll see this structure:

```markdown
# Channel South - Content Calendar

**Weekly Posts:** 7
**Monthly Goal:** +50 followers | 4%+ engagement

## 📅 Week of June 24 - June 30

### MONDAY (June 24) - 10:00 AM
**Hook:** [Brief 1-liner]
**Caption:** [Full text]
**Format:** ☐ Carousel | ☐ Reel | ☐ Static | ☐ Story
**Asset Status:** ☐ Not started | ☐ Draft | ✅ Ready
```

Just fill it in as you batch. Don't overthink it.

---

## 🎯 Your Weekly Victory Checklist

Before you close out each Friday:

- [ ] All 5 clients have 2 weeks of content scheduled
- [ ] Assets are 100% ready
- [ ] Engagement window completed (9:30-10 AM)
- [ ] Weekly notes saved
- [ ] No social media after 10 AM (hard boundary)

---

## 🔗 Quick Links

| Item | Location |
|------|----------|
| Dashboard | `~/02_Systems/content-command-center/dashboard.html` |
| Weekly Checklist | `~/02_Systems/weekly-checklist.md` |
| Content Calendars | `~/02_Systems/content-calendars/` |
| News Briefs | `~/04_Research/weekly-briefs/` |
| Analytics Data | `~/03_Analytics/meta-exports/` |
| Performance Reports | `~/03_Analytics/performance-reports/` |
| Equity Tracking | `~/03_Analytics/equity-tracking.md` |
| Brand Profiles | `~/02_Clients/[client]/` |

---

## 💡 ADHD-Friendly Tips

1. **Use the checklist, not the dashboard.** Dashboard is for status; checklist is for action.
2. **Set a timer for batching.** 90 minutes, then stop. Do something else.
3. **The engagement window is sacred.** 9:30-10 AM, nothing else. After 10 AM, phone goes away.
4. **Batch once per client per month.** You're not doing daily work — you're doing strategic sessions.
5. **Keep a "wins" list.** Screenshot top posts, note what worked. Use for equity tracking.
6. **If you miss Monday news briefs, skip them.** One week won't break the system.

---

## ❓ FAQ

**Q: What if I don't finish batching on Tuesday?**  
A: That client just gets fewer posts that week. It's OK. The system is flexible.

**Q: Can I batch all 5 clients at once?**  
A: No. Batch one at a time (90 min each). Your brain will thank you.

**Q: What if Meta changes the export format?**  
A: Update the CSV file naming convention and Claude's parser will adapt.

**Q: Where do I store Canva drafts?**  
A: They stay in Canva. Only upload finals to Meta + save as link in the calendar.

**Q: What if a client asks for urgent content?**  
A: Add it to next batching session. Urgent = next week.

---

## 📞 Support

- **Lost?** Re-read the weekly checklist.
- **Confused about a template?** Check the Channel South example.
- **Want to adjust schedules?** Update the calendars — the system is yours.
- **Need to scale?** After 3 months, we add Phase 2 (auto news monitoring).

---

**You've got this. Start with Monday's checklist.**
