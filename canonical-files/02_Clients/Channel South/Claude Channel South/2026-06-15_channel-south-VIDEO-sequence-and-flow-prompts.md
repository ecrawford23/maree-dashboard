# Channel South — Investor/Marketing Video · Sequence + Google Flow Prompts
*Evie · 2026-06-15 · The build sheet for the ~1-min video in your "The Gallery / Pearl Midtown" format. Pipeline: Gemini + Google Flow (Veo). All facts verified against the social bible / carousel doc.*

---

## THE BRIEF (so it's in one place)
- **Client ask (Sunny Sethi, Jun 9):** produce a Channel South video "similar to the one for Madison — The Gallery" (your existing AI investor format). **Use: marketing + social media** — and the owner uses these in pitches to mayors / capital partners.
- **Reference:** your Gallery video — docsend.com/view/m6gtgxms2jwpqt3k. Match its pacing and restraint; swap in Channel South assets.
- **Not this:** the separate "Channel South *website* video" (groundbreaking footage, produced by Richard, already approved for the website). Different deliverable — don't merge them.
- **Assets:** 85 McKibbon renders now filed in `02_Clients/Channel South/Gulfport - Channel South/`, plus a 4K 48-sec architect flythrough (`Apt files/GCC Video_06-09-25.mp4`) you can use as real motion b-roll.

## FORMAT
- **Master:** 16:9, ~60–64 sec (matches The Gallery / investor + web use).
- **Then:** a 9:16 vertical cut for Reels/Stories (same shots, recropped, text repositioned). Build the 16:9 first; the vertical is step 2.
- **Structure:** short **heritage cold-open**, then **vision-forward** through the district. Strongest hook for both capital partners and social, and it reuses your "same ground rises again" spine. Easy to flip to vision-first if you'd rather.

---

## THE SEQUENCE — 8 shots (Veo generates 8-sec clips, so 1 shot = 1 clip)

> On-screen text = the *only* words; no VO needed (matches your format). Keep type to your Channel South register: the existing serif + script logo family, tracked-out caps for labels. Grade every clip to **one coastal-calm look** (warm, sunlit, calm — Alys-level restraint).

| # | Time | Asset (real file) | On-screen text | Motion / Flow direction |
|---|------|-------------------|----------------|--------------------------|
| 1 | 0:00–0:08 | **Heritage** — sepia archival Great Southern Hotel *(see asset gap)*; fallback = navy title card | "Gulfport, 1903." → "The world came to the waterfront." | Slow 5% push-in. Faint film grain. Sepia/warm. |
| 2 | 0:08–0:16 | `Exterior Renderings/GCC Multifam N 01 HiRes 16k.png` | "Today, that same ground rises again." | Slow aerial push toward the district at dawn. |
| 3 | 0:16–0:24 | `GCC North.png` or `GCC South.png` (establishing/aerial) | "Channel South — a $105M waterfront district in downtown Gulfport." | Gentle drone-style orbit, slight parallax. |
| 4 | 0:24–0:32 | `GCC Multifam S 01.png` / `GCC East 01.png` | "136 luxury residences at the water's edge." | Rising crane reveal up the façade. |
| 5 | 0:32–0:40 | `GCC East 02_Original.png` / `GCC South.png` (street level) | "17,637 sq ft of curated retail & dining. Streets made for walking." | Slow dolly down the pedestrian street, people-level. |
| 6 | 0:40–0:48 | `Hotel files/Hotel Holden Entry Rendering.jpg` or `GCC Hotel 01.png` | "Hotel Holden — a 114-room Marriott Tribute." | Push toward the entry, warm golden light. |
| 7 | 0:48–0:56 | **`Hotel files/Hotel Holden Rooftop Rendering.jpg`** (signature hero) | "A rooftop over Jones Park and the Harbor." | Slow reveal panning out to the water at sunset. |
| 8 | 0:56–1:04 | Channel South logo on deep navy (optional faint render behind) | "Same ground. New chapter." + "A Bellamare + AnderCorp development" + `channelsouth.com · @channelsouthms` | Logo fades up, gentle settle, hold. |

**Optional interior insert** (if you want 9 shots / a touch more "live here"): drop a lobby/amenity beat between 4 and 5 — `Interior Renderings/S Lobby 01.jpg`, `GCC Int_fitness.jpg`, or `Mail 01.jpg`. Text: "Designed for the way the coast lives." Slow dolly-in.

---

## GOOGLE FLOW / VEO — how to generate each clip
> **Full per-shot "bring-to-life" motion prompts:** `2026-06-15_channel-south-VIDEO-flow-motion-prompts.md`. **Per-shot still-enhancement prompts:** `2026-06-15_channel-south-VIDEO-image-prompt-pack.md`.
1. In Flow, use **Frames-to-Video / image-to-video**: upload the render as the **start frame** so Veo animates *your* architecture instead of inventing a building.
2. **Prompt pattern per shot** (paste, swap the bracketed bits):
   > *"Cinematic [slow aerial push-in / crane up / dolly down the street], photorealistic architectural render of a coastal mixed-use district, warm golden-hour light, calm and editorial, subtle atmosphere and water reflections, gentle camera motion only — buildings and structures stay locked and do not morph. 16:9, high detail."*
3. **Lock the architecture:** keep moves **short and slow**, generate **2–3 takes** per shot, keep the one where the building doesn't warp. Veo drifts on long/fast moves — that's the #1 QA risk.
4. Clips are ~8s; you need 8, so that's your minute. Stitch + add text + music in your editor (or Flow's timeline).
5. **Color grade** all clips to one LUT/look so renders from different sources match (biggest cohesion win).

---

## MUSIC + PACING
- **Tone:** cinematic, warm, building — soft piano + strings, a gentle percussion swell into the district reveal (shot 3), resolve on the rooftop (shot 7). ~70–80 BPM.
- **Cut on the music:** let the heritage open breathe, accelerate slightly through the district, land calm on the rooftop + logo.
- **License it:** Artlist / Epidemic Sound / Musicbed — keep the license receipt in the folder (these go in front of capital partners).

## BRANDING (Channel South, not Marée)
- **Logo:** the real Channel South serif + script lockup ("Gulfport, Mississippi"). Cream/white on the dark close, never stretched or recolored.
- **Palette / grade:** deep coastal teal-slate, Hotel Holden dusty blue, cream/sand, maritime navy + a brass accent. One accent per frame.
- **Type:** elegant serif/script display + clean caps labels (tracked out). Lots of white space; no trendy or heavy fonts.
- **Signature shot:** make the **rooftop over Jones Park & the Harbor** the recurring hero (your Wharf-ferris-wheel / Alys-arches equivalent).

---

## BEFORE FINAL — asset gaps + checks
- **Archival heritage image (shot 1):** not in the folder. Source 1–2 public-domain/licensed Great Southern Hotel photos (Gulfport library / Mississippi Dept. of Archives & History), or use the navy title-card fallback. Don't let Veo invent a "historic hotel" — accuracy matters here.
- **Flick Mars updated lobby render:** was still pending as of Jun 11 (per the renderings note). If you use an interior shot, confirm you have the latest before final.
- **Fact lock:** $105M · 136 residences · 17,637 sq ft retail/dining · Hotel Holden 114-room Marriott Tribute · Bellamare + AnderCorp. (All verified — but have Sunny/AJ confirm the $ and unit counts are still current before it goes to capital partners.)

## QA CHECKLIST (before send)
- [ ] No building warps/morphs in any clip (watch each at full screen)
- [ ] One consistent color grade across all 8 shots
- [ ] Text legible on every frame; logo lockup correct (cream on dark)
- [ ] Numbers match the fact-lock line above
- [ ] Music licensed; receipt saved to folder
- [ ] 16:9 master exports clean; then build the 9:16 social cut
- [ ] Watch once start-to-finish on mute (does it sell the place without words?)

## SEND / POST
1. **Internal approval first:** send the 16:9 draft to **AJ + Sunny** for sign-off (Sunny's the client voice; AJ approves Marée work). Note: AJ is away Jun 26–Jul 6 — get it to her before then.
2. On approval: post the social cut to IG/FB and hand the master to Sunny for the marketing/pitch use.
3. File the final + project file into the Channel South folder (`2026-06-DD_channel-south-investor-video_FINAL.mp4`).
