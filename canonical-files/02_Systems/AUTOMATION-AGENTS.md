# Marée Creative - Intelligent Automation Agents

These Claude Code agents run automatically and make smart decisions based on YOUR real data.

---

## 🤖 AGENT 1: Performance Analyzer

**Runs:** Every Monday 10:00 AM  
**Does:** Analyzes last week's posts and tells you what worked

```
PROMPT: "Analyze performance data from ~/03_Analytics/meta-exports/
For each client, find:
1. Top 3 performing posts (by engagement rate)
2. Worst 3 performing posts (by engagement rate)
3. Best day of week for posting
4. Best time of day for posting
5. Which content format gets most engagement (Reel vs Carousel vs Static)
6. Which platforms drive most traffic to website

Output format:
## [Client Name]
- Top post: [title] - [X% engagement]
- Best day: [Day] 
- Best time: [Time]
- Best format: [Format] ([X% of engagement])
- Web traffic driver: [Platform]

Save to: ~/03_Analytics/performance-analysis/week-X.md"
```

**What you get:** Smart insights like "Post Channel South at 2 PM on Tuesdays (35% higher engagement)" — based on HER actual data.

---

## 🤖 AGENT 2: Optimal Time Recommender

**Runs:** Every Monday 11:00 AM (after Performance Analyzer)  
**Does:** Suggests best posting times per client per platform

```
PROMPT: "Based on performance analysis from ~/03_Analytics/performance-analysis/
For each client + platform combination, recommend:
1. Best time to post (within business hours)
2. Best day(s) to post
3. Posting frequency (posts per week)
4. Confidence level (based on data volume)

Format recommendation as:
## Posting Schedule Recommendations

### Channel South
- Instagram: Tuesday & Thursday at 2:00 PM (High confidence - 20+ data points)
- Facebook: Friday at 10:00 AM (Medium confidence - 8 data points)

Recommendation: Update ~/02_Systems/content-calendars/[client].md with these optimal times

Save recommendations to: ~/03_Analytics/posting-time-recommendations.md"
```

**What you get:** Calendar automatically suggests "Post this Tuesday at 2 PM because your data shows engagement spikes then"

---

## 🤖 AGENT 3: Content Diversity Tracker

**Runs:** Every Friday 3:00 PM (before batching week)  
**Does:** Checks if you have good format mix, tells you what's missing

```
PROMPT: "Analyze all scheduled posts for next 2 weeks (from ~/02_Systems/content-calendars/)

For each client, calculate:
1. % of posts that are Reels
2. % of posts that are Carousels  
3. % of posts that are Static images
4. % of posts that are Stories
5. Is there good diversity? (Target: no format over 50%)

Then recommend:
- Which formats you're overusing
- Which formats you should add more of
- Specific posts to convert to different formats

Format as:
## Content Diversity Report

### Channel South (Next 2 weeks)
Current mix: 40% Reels, 30% Carousel, 20% Static, 10% Stories ✅ Good diversity

### Bellamare (Next 2 weeks)
Current mix: 80% Static, 20% Carousel ⚠️ Need more Reels
Recommendation: Convert 3 static posts to Reels (more engagement on video)

Save to: ~/03_Analytics/diversity-reports/week-X.md"
```

**What you get:** "You're posting too many static images for Channel South — add 2 more Reels this week"

---

## 🤖 AGENT 4: Trend & Agility Spotter

**Runs:** Every morning 8:00 AM  
**Does:** Finds trending topics relevant to each client, suggests content angles

```
PROMPT: "Search for trending topics relevant to these industries:
- Channel South: Hospitality, hotels, events, Gulfport local
- Bellamare: Real estate, development, mixed-use, Southeast market
- The Gallery Madison: Art, galleries, Madison events, community
- Germantown Village: Retail, shopping, community events
- Marée Creative: Design, branding, creative industry

For each client:
1. Find 3 trending topics this week (Twitter, TikTok, news)
2. Suggest a content angle for Marée to capitalize on
3. What post type works best (Reel, carousel, static)
4. Timeline: post today/tomorrow/this week?

Format as:
## Daily Trending Opportunities

### Channel South
- Trend: [Local event/news] 
  Angle: [How to angle this for their brand]
  Type: Reel (5-10 sec)
  Timing: Post today at 2 PM

Save to: ~/03_Analytics/trends/[date]-opportunities.md"
```

**What you get:** "Gulfport just announced a summer festival — here's how Channel South should respond with a post TODAY"

---

## 🤖 AGENT 5: Competitor Activity Monitor

**Runs:** Every Tuesday 9:00 AM  
**Does:** Checks what competitors are posting, suggests responses

```
PROMPT: "For each client, monitor competitor social accounts:

Channel South: Track other Gulfport hotels/venues (Holiday Inn, local restaurants)
Bellamare: Track other developers in Southeast (real estate competitors)
The Gallery Madison: Track other Madison galleries/art venues
Germantown Village: Track other retail centers in area
Marée Creative: Track other creative agencies/design studios

For each competitor monitored:
1. What did they post this week?
2. How much engagement did it get?
3. What's their posting pattern?
4. How does [client] compare?
5. What should [client] post to one-up them?

Format as:
## Competitive Intelligence

### Channel South
Competitor: Holiday Inn Gulfport
- They posted a summer pool party event (2K likes, 150 comments)
- Best time: Tuesday evening
- Suggestion: Channel South should post their events earlier/more frequently

Save to: ~/03_Analytics/competitor-analysis/week-X.md"
```

**What you get:** "Competitor posted about summer sale — you should post about YOUR summer offer within 24 hours"

---

## 🤖 AGENT 6: Production Pipeline Manager

**Runs:** Every Sunday 6:00 PM  
**Does:** Checks what's due this week, what's missing, alerts you

```
PROMPT: "Check ~/02_Systems/content-calendars/ for all posts scheduled this week.

For each post, verify:
1. Does hook exist? ✅ or ⚠️ MISSING
2. Does caption exist? ✅ or ⚠️ MISSING
3. Does content suggestion exist? ✅ or ⚠️ MISSING
4. Asset status: Ready ✅ | In Progress ⚠️ | Missing ❌
5. Is platform specified? ✅ or ⚠️ MISSING

Then create a Production Checklist:
## This Week's Production Checklist

### URGENT (Missing assets - due this week)
- Monday: Channel South - [Post title] - MISSING ASSET
  Action: Create in Canva, upload to Meta

### ON TRACK (Ready to post)
- Tuesday: Bellamare - [Post title] ✅ Ready
  Action: Post at 2:00 PM Tuesday

### IN PROGRESS (Being created)
- Wednesday: Gallery Madison - [Post title] ⚠️ Draft in Canva
  Action: Finalize today, upload tomorrow

Save to: ~/02_Systems/production-checklist-week-X.md
Send notification: 'Production checklist ready - see what needs this week'"
```

**What you get:** "You have 3 assets missing for this week — here's what to create in Canva TODAY"

---

## 🤖 AGENT 7: Weekly Intelligence Report

**Runs:** Every Friday 4:00 PM  
**Does:** Compiles everything into one smart brief for you

```
PROMPT: "Create a comprehensive Friday Intelligence Report combining:
1. Performance Analysis (best posts, worst posts)
2. Optimal Times (this week's best posting times)
3. Diversity Report (format balance)
4. Trending Opportunities (what to capitalize on next week)
5. Competitor Moves (what competitors did this week)
6. Production Status (what's ready, what's in progress, what's missing)

Format as:
---
# FRIDAY INTELLIGENCE BRIEF

## 🎯 TOP INSIGHTS
- [1 sentence on biggest opportunity]
- [1 sentence on biggest risk/missing content]
- [1 sentence on next week's focus]

## 📊 BY THE NUMBERS
- Total posts this week: X
- Avg engagement rate: X%
- Best performing format: [Format]
- Posts still in draft: X

## 🚀 OPPORTUNITIES FOR NEXT WEEK
1. [Trend to capitalize on]
2. [Content gap to fill]
3. [Competitor to one-up]

## ⚠️ WHAT NEEDS ATTENTION
- [Production item due]
- [Format balance issue]
- [Data-driven insight]

## 📅 NEXT WEEK'S FOCUS
- Batch [Client] (theme: [theme])
- Post at optimal times: [times per client]
- Emphasize [format that's underutilized]

---

Save to: ~/03_Analytics/intelligence-reports/week-X.md
Subject: 'Weekly Intelligence Brief - Smart recommendations for next week'"
```

**What you get:** One Friday email that says: "Here's what worked, here's what to do next week, here's the specific times/formats to focus on"

---

## 🔧 HOW TO SET THESE UP

### In Claude Code:

```bash
# Agent 1: Performance Analyzer
/schedule create "performance-analyzer" \
  --run "Every Monday 10:00 AM" \
  --prompt "[Use AGENT 1 prompt above]"

# Agent 2: Optimal Time Recommender
/schedule create "time-recommender" \
  --run "Every Monday 11:00 AM" \
  --prompt "[Use AGENT 2 prompt above]"

# Agent 3: Diversity Tracker
/schedule create "diversity-tracker" \
  --run "Every Friday 3:00 PM" \
  --prompt "[Use AGENT 3 prompt above]"

# Agent 4: Trend Spotter
/schedule create "trend-spotter" \
  --run "Every day 8:00 AM" \
  --prompt "[Use AGENT 4 prompt above]"

# Agent 5: Competitor Monitor
/schedule create "competitor-monitor" \
  --run "Every Tuesday 9:00 AM" \
  --prompt "[Use AGENT 5 prompt above]"

# Agent 6: Production Manager
/schedule create "production-manager" \
  --run "Every Sunday 6:00 PM" \
  --prompt "[Use AGENT 6 prompt above]"

# Agent 7: Weekly Intelligence Report
/schedule create "intelligence-report" \
  --run "Every Friday 4:00 PM" \
  --prompt "[Use AGENT 7 prompt above]"
```

---

## 📊 WHAT GETS UPDATED

Every agent output updates these files:
- `~/03_Analytics/performance-analysis/` — What worked
- `~/03_Analytics/posting-time-recommendations.md` — When to post
- `~/03_Analytics/diversity-reports/` — Format balance
- `~/03_Analytics/trends/` — What's trending
- `~/03_Analytics/competitor-analysis/` — Competitor moves
- `~/02_Systems/production-checklist-week-X.md` — What needs doing
- `~/03_Analytics/intelligence-reports/` — Weekly brief

---

## 🔔 WHAT YOU GET NOTIFIED ABOUT

Via Cowork:
- **Monday 11:30 AM:** "Optimal times ready — see posting schedule"
- **Friday 3:30 PM:** "Production checklist ready — here's what needs assets"
- **Friday 4:30 PM:** "Intelligence brief ready — smart recommendations inside"
- **Daily 8:30 AM:** "Trending opportunities ready — see what to post today"

---

## ✅ THE WORKFLOW

```
MON 10 AM → Performance Analysis runs (what worked last week)
MON 11 AM → Time Recommender runs (best times to post)
      ↓
TUE 9 AM  → Competitor Monitor runs (what competitors did)
      ↓
EVERY 8 AM → Trend Spotter runs (daily opportunities)
      ↓
FRI 3 PM  → Diversity Tracker runs (format balance check)
      ↓
FRI 4 PM  → Production Manager runs (what needs this week)
      ↓
FRI 5 PM  → Intelligence Report runs (combined brief)
      ↓
YOU GET NOTIFICATIONS WITH SMART RECOMMENDATIONS
```

---

## 🎯 YOU JUST HAVE TO:

1. **Monday:** Read optimal times → use them when batching
2. **Friday:** Read production checklist → create missing assets
3. **Friday:** Read intelligence brief → this is your entire strategy for next week
4. **Daily:** Check trending opportunities → capitalize if relevant

Everything else is automated. The system learns from YOUR data and tells you what to do.
