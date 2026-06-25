#!/usr/bin/env python3
"""Tatiana Vargas — Ridgewood Court proposal (Marée v2 look, repositioning/marketing scope)."""
import base64, os, random
from PIL import Image
from weasyprint import HTML

BASE = "/sessions/gifted-dreamy-brahmagupta/mnt/Downloads--Maree Creative"
BRAND_PNG = f"{BASE}/00_Brand/logos/png"
FONTS = f"{BASE}/01_Templates/Proposal/assets/fonts-embedded.css"
OUT = "/sessions/gifted-dreamy-brahmagupta/mnt/outputs"
OUT_PDF = f"{OUT}/Tatiana-RidgewoodCourt-Proposal-DRAFT.pdf"

NAVY, CREAM, COASTAL, STEEL, NAVY60 = "#2C4154", "#F5F1E8", "#A6C0C9", "#3E6B7D", "#6B7986"

def uri(name):
    with open(f"{BRAND_PNG}/{name}.png", "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode()
LOGO_STACKED_WHITE = uri("maree_stacked_white")
LOGO_HORIZ_NAVY = uri("maree_horizontal_navy")
LOGO_HORIZ_WHITE = uri("maree_horizontal_white")
LOGO_SUBMARK_WHITE = uri("maree_submark_white")
FONT_FACES = open(FONTS).read()

def grain_uri(size=340, amax=32):
    p = f"{OUT}/_grain_t.png"; img = Image.new("RGBA", (size, size)); px = img.load()
    for y in range(size):
        for x in range(size):
            v = random.randint(0, 255); px[x, y] = (v, v, v, random.randint(0, amax))
    img.save(p)
    with open(p, "rb") as f: return "data:image/png;base64," + base64.b64encode(f.read()).decode()
GRAIN = grain_uri()

CSS = f"""
{FONT_FACES}
@page {{ size: Letter; margin: 0; }}
* {{ box-sizing: border-box; }}
html, body {{ margin: 0; padding: 0; }}
body {{ font-family: 'Montserrat', Helvetica, Arial, sans-serif; color: {NAVY}; }}
.page {{ position: relative; width: 8.5in; height: 11in; overflow: hidden; background: {CREAM}; page-break-after: always; }}
.page:last-child {{ page-break-after: auto; }}
.page.navy {{ background: {NAVY}; color: {CREAM}; }}
.grain {{ position:absolute; inset:0; background-image:url('{GRAIN}'); background-size:300px; background-repeat:repeat; opacity:.55; pointer-events:none; z-index:2; }}
.pad {{ position: absolute; inset: 1.05in 1.0in 1.15in; z-index:3; }}
.eyebrow {{ font-size: 10.5px; letter-spacing: .3em; text-transform: uppercase; font-weight: 600; color: {STEEL}; }}
.navy .eyebrow {{ color: {COASTAL}; }}
.h-display {{ font-family: 'Poiret One', cursive; font-weight: 400; line-height: 1.08; letter-spacing: .01em; color:{NAVY}; }}
.navy .h-display {{ color:{CREAM}; }}
h1.title {{ font-family: 'Poiret One', cursive; font-weight: 400; margin: 0; }}
p {{ line-height: 1.75; font-weight: 400; font-size: 12px; color: {NAVY}; margin: 0 0 12px; }}
.navy p {{ color: {CREAM}; }}
.lead {{ font-size: 13px; line-height: 1.85; margin: 0 0 14px; }}
.measure {{ max-width: 5in; }}
.fill {{ color: {STEEL}; font-style: italic; font-weight: 600; }}
.navy .fill {{ color: {COASTAL}; }}
strong, b {{ font-weight: 600; }}
.rule {{ width: 44px; height: 2px; background: {COASTAL}; border: 0; margin: 14px 0 26px; }}
.kicker {{ margin-bottom: 14px; }}
.h-lg {{ font-size: 36px; margin: 0; }}
.h-md {{ font-size: 31px; margin: 0; }}
.foot {{ position: absolute; left: 1.0in; right: 1.0in; bottom: 0.7in; display: flex; justify-content: space-between; align-items: center; z-index:6; }}
.foot img {{ height: 20px; opacity: .9; }}
.foot .pg {{ font-size: 10px; letter-spacing: .25em; color: {NAVY60}; font-weight: 600; }}
.navy .foot .pg {{ color: {COASTAL}; }}
.svc {{ border-top: 1px solid rgba(44,65,84,.2); padding: 13px 0; }}
.svc .n {{ font-family:'Poiret One',cursive; font-size:18px; color:{NAVY}; }}
.svc .n span {{ color:{STEEL}; }}
.svc p {{ margin: 4px 0 0; font-size: 11.5px; }}
.svc .subs {{ margin: 5px 0 0; font-size: 10.5px; line-height: 1.65; color: {NAVY}; }}
.optional {{ border:1px solid rgba(44,65,84,.25); border-left:3px solid {COASTAL}; border-radius:3px; padding:13px 16px; }}
.optional .opt-label {{ font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:{STEEL}; font-weight:600; }}
.optional .opt-title {{ font-family:'Poiret One',cursive; font-size:16px; color:{NAVY}; margin:2px 0 4px; }}
table.quote {{ width:100%; max-width:5in; border-collapse:collapse; margin-top:4px; }}
table.quote td {{ font-size:12.5px; padding:10px 0; border-bottom:1px solid rgba(44,65,84,.14); }}
table.quote td.amt {{ text-align:right; font-weight:600; white-space:nowrap; }}
table.quote tr.sub td {{ color:{NAVY60}; border-bottom:none; padding:6px 0; }}
table.quote tr.total td {{ font-weight:700; font-size:14px; border-top:2px solid {NAVY}; border-bottom:none; padding-top:12px; }}
.phase {{ display:grid; grid-template-columns: 1.3in 1fr; gap:16px; padding:13px 0; border-top:1px solid rgba(44,65,84,.2); align-items:start; }}
.phase .ph {{ font-family:'Poiret One',cursive; font-size:17px; color:{STEEL}; }}
.phase p {{ margin:0; font-size:11.5px; }}
.invest-box {{ border:1px solid rgba(44,65,84,.25); border-radius:3px; padding:22px 24px; max-width:5in; margin-top:4px; }}
.invest-box .fee {{ font-family:'Poiret One',cursive; font-size:34px; color:{NAVY}; }}
.invest-box .feesub {{ font-size:11px; letter-spacing:.06em; color:{NAVY60}; margin-top:2px; }}
.terms {{ margin-top: 16px; font-size: 11px; color: {NAVY}; line-height: 1.7; }}
.sigline {{ border-bottom:1px solid {NAVY}; height:34px; margin-top:28px; }}
.sigcap {{ font-size:9px; letter-spacing:.16em; text-transform:uppercase; color:{NAVY60}; margin-top:5px; }}
"""

def footer(pg, white=False):
    logo = LOGO_HORIZ_WHITE if white else LOGO_HORIZ_NAVY
    return f'<div class="foot"><img src="{logo}"><span class="pg">{pg}</span></div>'

def cover():
    return f"""
<section class="page navy">
  <img src="{LOGO_SUBMARK_WHITE}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:6.2in;opacity:.06;z-index:1;">
  <div class="grain"></div>
  <img src="{LOGO_STACKED_WHITE}" style="position:absolute;top:1.05in;left:1.0in;width:2.25in;z-index:3;">
  <div style="position:absolute;left:1.0in;bottom:2.5in;right:1.0in;z-index:3;">
    <div class="eyebrow" style="margin-bottom:16px;">Prepared For</div>
    <h1 class="title" style="font-size:28px;color:{CREAM};opacity:.85;">A Proposal for</h1>
    <h1 class="title" style="font-size:54px;color:{CREAM};margin-top:4px;">Ridgewood Court</h1>
    <hr class="rule" style="margin:20px 0;">
    <div class="eyebrow" style="letter-spacing:.18em;color:{COASTAL};">Bellamare Property Solutions, LLC &nbsp;·&nbsp; Attn: Tatiana Vargas</div>
  </div>
  <div style="position:absolute;left:1.0in;bottom:1.1in;right:1.0in;z-index:3;">
    <p style="font-size:11px;color:{CREAM};opacity:.9;margin:0;font-weight:500;letter-spacing:.16em;text-transform:uppercase;">
      Brand Repositioning, Marketing &amp; Lease-Up Strategy</p>
  </div>
</section>"""

def note():
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">A Note to Begin</div>
    <h1 class="h-display h-md">A note to begin.</h1>
    <hr class="rule">
    <div class="measure">
      <p class="lead">Tatiana, thank you for trusting us with Ridgewood Court.</p>
      <p class="lead">Before we talk deliverables or timelines, we want to be clear on what we heard. You
        have a well-located center with strong bones, real daily traffic, and recognizable anchors. The
        opportunity now is not to reinvent it. It is to reposition how it is seen and fill it with the
        right tenants.</p>
      <p class="lead">The pages that follow are built around that. Ridgewood Court does not need a
        relaunch. It needs a clear brand, intentional marketing, and a focused lease-up strategy that
        protects what is already working while bringing in what is missing.</p>
      <p class="lead">That is exactly the kind of work Marée was built to do, and we are glad to be doing
        it with you.</p>
      <p style="margin-top:26px;font-family:'Poiret One',cursive;font-size:20px;line-height:1.2;color:{NAVY};">Anna Jane Stanley</p>
      <div class="eyebrow" style="margin-top:4px;">Marée Creative</div>
    </div>
  </div>
  {footer("02")}
</section>"""

def opportunity():
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">The Opportunity</div>
    <h1 class="h-display h-lg">What we heard.</h1>
    <hr class="rule">
    <div class="measure">
      <p class="lead">Ridgewood Court sits on one of the metro's busiest retail corridors, minutes from
        the interstate and surrounded by national draws. It already has loyal anchors and steady foot
        traffic. What it does not yet have is a clear identity or a story that tells shoppers and tenants
        why to choose it.</p>
      <p class="lead">The center is underleased, and the open spaces are the whole opportunity. Filling
        them with the right mix does two things at once: it protects the anchors already in place and it
        turns the center into a destination rather than a stop.</p>
      <p class="lead"><strong>Our role:</strong> reposition the brand, market it with intention, and give
        you a lease-up strategy you can actually run on. Reposition, not relaunch.</p>
    </div>
  </div>
  {footer("03")}
</section>"""

def about():
    return f"""
<section class="page navy">
  <div class="grain"></div>
  <div class="pad">
    <div class="eyebrow kicker">Who We Are</div>
    <h1 class="h-display" style="font-size:34px;">Built inside development.</h1>
    <hr class="rule" style="margin:18px 0 26px;">
    <div class="measure" style="max-width:4.7in;">
      <p class="lead">Marée is a creative placemaking and brand studio, and a Bellamare Development
        company. We do not advise from the outside. We have leased space, filled centers, and stood
        behind the decisions that make a property work.</p>
      <p class="lead">That is the lens we bring to Ridgewood Court. We approach it the way an owner
        would, because we have been one. Every recommendation is made with leasing, traffic, and the
        bottom line in mind.</p>
    </div>
  </div>
  {footer("04", white=True)}
</section>"""

def services():
    items = [
        ("Brand Repositioning Strategy", ["Property assessment &amp; market positioning review", "Brand narrative &amp; positioning statement", "Target audience definition", "Messaging framework", "Brand voice development"]),
        ("Brand Identity", ["Core brand values", "Key messaging pillars", "Color palette", "Typography recommendations", "Brand identity guide"]),
        ("Public Positioning Framework", ["Current perception assessment &amp; key challenges", "Public sentiment guidelines", "“Approachable under new management” positioning", "Tenant- &amp; customer-facing messaging"]),
        ("12-Month Lease-Up Marketing Plan", ["Quarterly marketing initiatives", "Leasing-focused campaign recommendations", "Community engagement opportunities", "Event program &amp; activation", "Budget recommendations &amp; implementation roadmap"]),
        ("Local SEO Audit", ["Local SEO audit", "Google Business Profile recommendations", "Search-visibility improvement opportunities", "Content recommendations"]),
    ]
    rows = "".join(f'<div class="svc"><div class="n"><span>{i+1:02d} ·</span> {n}</div><div class="subs">{" · ".join(subs)}</div></div>' for i,(n,subs) in enumerate(items))
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">Scope of Work</div>
    <h1 class="h-display h-md">What's included.</h1>
    <hr class="rule">
    {rows}
    <div class="optional" style="margin-top:16px;">
      <div class="opt-label">Optional · Ongoing</div>
      <div class="opt-title">Monthly Social Media Management</div>
      <div class="subs">Content calendar · Content creation · Posting 1–2×/week &amp; account management · Community engagement · Monthly reporting</div>
    </div>
  </div>
  {footer("05")}
</section>"""

def approach():
    phases = [
        ("Discover", "We learn the site, the market, the audience, and the gaps. We confirm who the center should serve and what the right tenant mix looks like."),
        ("Reposition", "We build the brand: identity, story, and voice, positioned as convenient, family-friendly value with everyday experiences that pull from the whole corridor."),
        ("Launch", "The marketing plan goes live, social pages open, leasing materials roll out, and the first events bring people through the doors."),
        ("Manage", "Ongoing social, content, events, and search optimization, with monthly check-ins so the strategy keeps adjusting to what's working."),
    ]
    rows = "".join(f'<div class="phase"><div class="ph">{n}</div><p>{d}</p></div>' for n,d in phases)
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">Our Approach</div>
    <h1 class="h-display h-md">Our approach to Ridgewood.</h1>
    <hr class="rule">
    <p class="measure" style="margin-bottom:8px;">We lead with what the trade area already proves it
      wants, value and family-friendly experiences, and make landing a strong national tenant the first
      lease-up priority. The goal is a center that families choose for errands, outings, and everyday
      life, not a concept that fights the market.</p>
    {rows}
  </div>
  {footer("06")}
</section>"""

def investment():
    rows = [
        ("Brand Repositioning Strategy", "$1,500"),
        ("Brand Identity", "$650"),
        ("Public Positioning Framework", "$1,500"),
        ("12-Month Lease-Up Marketing Plan", "$1,500"),
        ("Local SEO Audit", "$500"),
    ]
    body = "".join(f'<tr><td>{n}</td><td class="amt">{a}</td></tr>' for n, a in rows)
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">Investment</div>
    <h1 class="h-display h-md">The investment.</h1>
    <hr class="rule">
    <table class="quote">
      <tbody>{body}
        <tr class="sub"><td>Value</td><td class="amt">$5,650</td></tr>
        <tr class="sub"><td>Affiliate Credit</td><td class="amt">– $2,650</td></tr>
        <tr class="total"><td>One-Time Project Investment</td><td class="amt">$3,000</td></tr>
      </tbody>
    </table>
    <div class="optional" style="margin-top:18px;max-width:5in;">
      <div class="opt-label">Optional · Ongoing</div>
      <div class="opt-title">Social Media Management &nbsp;·&nbsp; <span style="font-family:Montserrat;font-weight:600;font-size:13px;">$1,200 / month</span></div>
      <div class="subs">Billed monthly in advance · may be added at any time</div>
    </div>
    <p class="terms" style="max-width:5in;">A 50% deposit of $1,500 commences the work; the balance is
      billed per phase milestones. Each phase includes two rounds of review; additional rounds at
      $250/hour. Production (signage, fabrication, renderings, printed collateral) is scoped and billed
      separately. Valid for 60 days from issue and governed by the Marée Creative Engagement &amp;
      Services Agreement.</p>
  </div>
  {footer("07")}
</section>"""

def agreement():
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">To Proceed</div>
    <h1 class="h-display h-md">Ready when you are.</h1>
    <hr class="rule">
    <p class="measure">Approve this quote and we will issue the Marée Creative Engagement &amp; Services
      Agreement along with the deposit invoice to begin. The scope, deliverables, and fees in this
      proposal carry into that agreement on acceptance.</p>
    <p class="measure" style="margin-top:4px;">Ridgewood Court has everything it needs to win in its
      corridor. Let's give it the brand and the strategy to match.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:26px;max-width:5.4in;">
      <div><div class="sigline"></div><div class="sigcap">Approved by (Client) &amp; date</div></div>
      <div><div class="sigline"></div><div class="sigcap">Marée Creative &amp; date</div></div>
    </div>
  </div>
  {footer("08")}
</section>"""

def next_steps():
    return f"""
<section class="page">
  <div class="pad">
    <div class="eyebrow kicker">If This Feels Right</div>
    <h1 class="h-display h-md">Here's what happens next.</h1>
    <hr class="rule">
    <p class="measure">Sign and we begin. We open with a short kickoff to align on the vision and the
      target tenant mix, then move straight into repositioning the brand and standing up the marketing
      and social presence. You will have a direct line to us the whole way.</p>
    <p class="measure" style="margin-top:6px;">Ridgewood Court has everything it needs to win in its
      corridor. Let's give it the brand and the strategy to match.</p>
  </div>
  <div class="foot"><img src="{LOGO_HORIZ_NAVY}"><span class="pg">09</span></div>
</section>"""

def back_cover():
    return f"""
<section class="page navy">
  <div class="grain"></div>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:3;">
    <img src="{LOGO_SUBMARK_WHITE}" style="width:1.5in;margin-bottom:40px;opacity:.95;">
    <div class="eyebrow" style="text-align:center;color:{COASTAL};line-height:2.3;">
      aj@bellamaredevelopment.com<br>
      mareecreative.com &nbsp;·&nbsp; @mareecreative_<br>
      A Bellamare Development Company
    </div>
  </div>
</section>"""

PAGES = [cover(), note(), opportunity(), about(), services(), approach(), investment(), agreement(), back_cover()]
html = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Tatiana — Ridgewood Court Proposal</title><style>{CSS}</style></head><body>{''.join(PAGES)}</body></html>"""
HTML(string=html).write_pdf(OUT_PDF)
print("wrote", OUT_PDF, os.path.getsize(OUT_PDF), "bytes")
