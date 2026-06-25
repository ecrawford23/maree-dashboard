# Channel South Video — Image Upload + Gemini Prompt Pack
*Evie · 2026-06-15 · Step 1 of the pipeline: upload each render to Gemini, run the realism prompt to get a photoreal still, THEN take that still into Google Flow (Veo) for motion. Shot order + motion prompts live in the companion sheet: `2026-06-15_channel-south-VIDEO-sequence-and-flow-prompts.md`.*

> **Folder for all uploads:** `02_Clients/Channel South/Gulfport - Channel South/`

---

## THE ONE RULE (paste this into every prompt)
Renders get "redrawn" if you don't lock them. Start every Gemini prompt with:

> **"Enhance this architectural rendering into a photorealistic photograph. Keep the building's architecture, proportions, rooflines, window layout, materials, and signage EXACTLY as shown — do not redesign, move, add, or remove any structure or text. Only improve realism: lighting, sky, atmosphere, reflections, vegetation, people, and vehicles."**

And end every prompt with this quality + guard tail:

> **"Make it look like a real photograph, NOT a 3D render. Shot on a full-frame DSLR, 35mm lens at f/4, natural shallow depth of field, subtle sensor grain, faint lens vignetting, true-to-life color (not over-saturated), believable soft shadows and highlights. No added or altered buildings, no distorted faces or bodies, no warped windows, no extra text, no watermark, no logos."**

Run **2–3 generations** per shot and keep the one where the building stays true. Then send that still to Flow.

---

## ⚠️ THE BIG ONE — KILL THE "AI RENDER" LOOK
Right now every render reads as CGI. Enhancing the light alone won't fix it — you have to tell Gemini to **impersonate a real camera and add real-world imperfection.** Add this block to every exterior prompt (trim as needed):

> **"This currently looks like a CG architectural render — convert it into a believable real-world photograph. Add the imperfections that make photos real: subtle dirt, weathering, and wear on pavement and façades; slightly uneven, non-repeating landscaping with real plant texture; natural asymmetry; faint atmospheric haze for depth; real photographic depth of field with the background slightly soft; gentle lens characteristics (very slight vignette, a touch of chromatic aberration at the edges); fine camera grain. People look candid and varied — different clothing, natural mid-stride poses, NOT posed or identical, kept at mid-to-far distance. Cars look used and real, not showroom-clean, with accurate reflections. Light is directional and natural with true contrast — not the flat even glow of a render."**

**The CGI tells to name + remove:** plastic/repeating plants · waxy or cloned people · showroom cars · flat even lighting · everything in perfect focus · over-saturated "video-game" color · spotless surfaces · smooth gradient skies with no real clouds.

**If a result still looks fake,** run it again with: *"This still looks like a 3D render. Push further toward a real photograph — stronger depth of field, real camera grain, natural lighting imperfections, surface wear and grime, more candid imperfect people."* It's iterative; expect 2–4 passes on the daytime shots.

**One trade-off to know:** the harder you push realism (grime, depth of field, candid people, new sky), the more freedom Gemini takes — and the more it may nudge the architecture. For the **investor master**, keep the building dead-accurate (lean on the lock line, push realism moderately). For the **social cut**, you can push realism harder since vibe beats millimeter-accuracy there. Compare each result against the original render before you accept it.

---

## 🎯 GOING FULL HYPER-REAL ("off the camera")
Straight truth: a single text prompt in a chat image tool rarely reaches "indistinguishable from reality." That look comes from **(1) surgical photographic language + (2) a realism UPSCALE pass that paints in micro-detail.** The upscale is the secret — it's what adds skin pores, brick grain, leaf veins, and glass smudges, which is the texture your eye reads as "real."

### Stage A — surgical realism prompt (replace the generic version with this)
Be specific like a photographer, not a designer. Template:

> *"Convert this architectural render into an indistinguishable-from-reality photograph, as if shot on a **Sony A7R V with a 35mm f/2.8 lens, ISO 200, golden hour**. Physically accurate light: warm raking sunlight, long soft shadows, real dynamic range with slightly blown sky highlights and soft shadow detail. Real materials — glass with faint smudges and true reflections, brick with mortar and stain variation, concrete with hairline cracks and water marks, metal with micro-scratches, foliage with individual irregular leaves and some browning. Real humans with visible skin texture, pores, flyaway hair, natural asymmetry, varied ages/body types, wrinkled clothing, candid mid-motion poses — never mannequin-like or symmetrical. Subtle film grain, gentle lens vignette, shallow depth of field with soft background. [LOCK the architecture per the one rule.]"*

> **Negatives to append:** *"avoid CGI, 3D render, video-game look, plastic, waxy skin, perfect symmetry, oversaturation, flat uniform lighting, HDR halos, sterile cleanliness, repeated identical people or plants."*

### Stage B — the realism upscale (do NOT skip — this is the difference-maker)
Take Stage A's result and run it through a **photoreal upscaler at medium "creativity,"** which hallucinates true micro-detail:
- **Best at render→photo:** Magnific AI (photorealism mode), Krea "Enhance," or Flux-based realism upscalers — these are *built* for turning archviz into photographs and beat any chat tool at it.
- **Also good:** Topaz Photo AI (adds real grain + sharpening), or Gemini/Imagen's own upscale.
Two upscale passes at moderate strength usually does more than ten prompt rewrites.

### Stage C — work in pieces for the hero shots
For Rooftop + Hotel Entry, **crop into sections** (the diners, the façade, the harbor) and enhance each separately, then recombine — close crops let the model add far more real texture than one wide pass. The wider the frame, the less per-object detail.

### The honest ceilings
- **Close-up faces** are the hardest tell. Keep people **mid-to-far** distance; don't hero a single face. This alone removes most "AI people" giveaways.
- **Exact-building accuracy vs. full photorealism pull against each other.** Investor master = accuracy first. Social = realism first.
- If Gemini plateaus after ~4 passes, that's the tool's ceiling — switch to Magnific/Krea for the final realism, not more prompting.

---

## SHOT 1 · Heritage open *(no render — read this)*
There's **no archival Great Southern Hotel image** in the folder, and Gemini will *invent* a fake "historic hotel" if you ask it to — which you can't put in front of capital partners. Two honest options:
- **Best:** source one real 1903 Great Southern Hotel photo (Mississippi Dept. of Archives & History, or Gulfport library), then in Gemini just say: *"Restore and lightly enhance this vintage photograph; warm sepia tone, gentle film grain; do not alter the building or add elements."*
- **Fallback:** skip the photo, open on a deep-navy title card with the text and a faint maritime texture. No Gemini needed.

---

## SHOT 2 · The turn / district hero
**Upload:** `GCC Multifam N 01 HiRes 16k.png` *(or `GCC Multifam N 01.png` if the 16k is too large to upload)*
**Already golden-hour and aerial — light enhancement only.**

> [ONE RULE intro] Push the golden-hour dusk light a touch warmer and more cinematic; deepen the wet-street reflections; add subtle haze and depth in the background; make the sky a soft gradient of warm peach into pale blue with a few realistic clouds; ensure the people on the sidewalk and the cars look natural and in scale; lush, healthy palms and landscaping. Coastal, calm, editorial. [QUALITY tail]

---

## SHOT 3 · Establishing wide (the whole district)
**Upload:** `GCC South.png`
**Flat blue-sky daytime — give it mood.**

> [ONE RULE intro] Transform the flat midday lighting into warm late-afternoon golden hour; replace the plain blue sky with a soft, atmospheric sky — gentle clouds catching warm light over the water; add realistic reflections and subtle movement to the water/road in the foreground; add light atmospheric haze for depth so the district reads as a real waterfront skyline; a few tasteful cars with motion. [QUALITY tail]

---

## SHOT 4 · Residences
**Upload:** `GCC East 02_Original.png` *(the multifam entry/courtyard with the porte-cochère)*
**Daytime — warm it and add life.**

> [ONE RULE intro] Shift to warm early-evening light with the building's interior and entry lights beginning to glow; richer, photoreal materials on the façade and pavers; lush coastal landscaping; a couple walking toward the entrance, natural and in scale; soft golden reflections on the driveway; shallow depth of field on the foreground planting. [QUALITY tail]

---

## SHOT 5 · Retail + walkable street
**Upload:** `GCC East 01.png` *(boulevard / street-level wide of the district)*
**Dramatic clouds already — push the street life.**

> [ONE RULE intro] Warm the light toward late afternoon; keep the dramatic sky but make the clouds photoreal and softly lit; add believable street life — a few pedestrians, a cyclist, cars with gentle motion blur; wet-street reflections; storefront and signage windows lit and inviting; crisp, healthy street trees and palms. Make it feel like a lived-in, walkable waterfront district. [QUALITY tail]

---

## SHOT 6 · Hotel Holden
**Upload:** `Hotel files/Hotel Holden Entry Rendering.jpg`
**Already a beautiful dusk hero — barely touch it.**

> [ONE RULE intro] Preserve the existing sunset mood; gently enhance the warm window glow and the pink-and-violet sky so it feels photographed, not rendered; deepen the wet-street and foreground reflections; make the palms and entry landscaping lush and realistic; guests near the entrance natural and in scale; keep the "HOLDEN" signage exactly as is. [QUALITY tail]

---

## SHOT 7 · Rooftop — the signature hero (closer)
**Upload:** `Hotel files/Hotel Holden Rooftop Rendering.jpg`
**Your icon shot. Make it the most photoreal frame in the film.**

> [ONE RULE intro] Elevate to a photoreal golden-hour/blue-hour rooftop scene: warm, inviting terrace lighting and candle/table glow; a vivid but believable sunset sky over the harbor; the marina, lighthouse, and Jones Park greens crisp and atmospheric in the distance; guests dining and talking look completely natural, varied, and in scale; subtle bokeh on foreground lights; gentle warm reflections. Aspirational, calm, editorial — the feeling of the best evening on the coast. [QUALITY tail]

---

## OPTIONAL extra exterior (if you want a 9th beat)
**Upload:** `GCC Hotel 01.png` *(hotel from the street, golden hour)* — same approach as Shot 6.

## OPTIONAL interiors *(advanced — clay models, higher risk)*
`Interior Renderings/S Lobby 01.jpg` and `GCC Int_fitness.jpg` are **untextured gray models**. To use them you're asking Gemini to invent materials, which usually changes the design. If you try it, be explicit:
> "Apply realistic materials and lighting to this gray model. Keep the exact layout, furniture placement, millwork, and the ship artwork unchanged. Light oak and warm wood tones, soft coastal palette, warm evening interior lighting, photoreal." *(Generate several; expect to discard most.)*
I'd hold interiors for v2 unless you get cleaner color renders from the design team.

---

## AFTER THE STILLS
1. Drop each approved still into **Google Flow (Veo)** as the start frame and run its motion prompt (companion sheet, the table column "Motion / Flow direction").
2. Keep moves slow and short so the architecture doesn't warp.
3. Assemble → one color grade across all clips → text → licensed music → QA.

## QUICK ORDER TO WORK IN
1. Shots 6 + 7 first (Hotel Entry + Rooftop) — least enhancement, fastest wins, and #7 is your hero.
2. Then 2 (Multifam aerial).
3. Then 3, 4, 5 (the daytime ones that need sky/light work).
4. Decide Shot 1 (archival vs title card) and any interiors last.
