# news-image-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/Abay26/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/Abay26/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

## What this is

**THE WORLD TODAY** — one broadsheet front page summing up the world's
news of **Tuesday, 24 November 2026**: a centred serif masthead, a red
markets ticker, a full-width lead headline, a schematic S&P 500 chart of
the week's plunge and Monday's rebound, a three-column story grid, and a
"THE DAY IN BRIEF" footer strip with 18 more stories.

1. **Nvidia soars 31% as Huang returns — Wall Street's best day since
   April 2025** (lead): the chipmaker adds $952bn in a day after its
   board reinstates Jensen Huang as chief executive; Nasdaq jumps 6.5%,
   S&P 500 4.7%, Dow 1,448 points — after the worst week since Covid
2. **NATO sends AWACS to Poland after breach**: the alliance will
   forward-deploy an early-warning aircraft; hours later a Russian drone
   briefly enters Polish airspace, then turns back
3. **Ukraine drones hit Russian warship off Libya**: Kyiv says its
   drones struck a Russian warship and a cargo vessel; a Russian corvette
   is ablaze in Benghazi port after an explosion and fire
4. **Factory fire kills at least 24 in Banten**: a blaze at a candy
   factory leaves at least 24 dead and others missing; rescuers keep
   searching the wreckage
5. **Gaza's air, soil and water poisoned for decades**: a report out
   today finds Israel's bombardment left toxic contamination — heavy
   metals, explosive residues, asbestos and dioxins — across almost the
   whole Strip
6. **US sanctions target Iran's 'shadow banking'**: the Treasury
   blacklists more than two dozen entities it says move Tehran's money
   around the world
7. **Gukesh opens title defence; Alcaraz takes ATP Finals**: the world
   chess champion opens against Sindarov in Geneva; Alcaraz beats Zverev
   in Turin for his first ATP Finals crown

Footer: Lisbon cost-of-living march, COP31 split on fossil fuels,
Trump–Kim rebuff, Taliban erasing women's names in Balkh, Brazil's
court summoning Flávio Bolsonaro, Brazil's growth cut, Trump's
hush-money appeal, Democrats on Trump's Huang role, CrowdStrike buying
Zscaler for $43.9bn, the India–Nepal train, India–China border talks,
Myanmar vs ASEAN, Pant's 128, Verstappen in Las Vegas, Ferrari's new
296s, SpiceJet, US measles, and China-linked fakes targeting Taiwan's
election.

Every story was cross-checked against at least two independent reports
published on 24 November 2026 (Reuters, CNN, WSJ, MarketWatch, AP,
Al Jazeera, Oxfam and others).

## How it runs

`main.ts` (Node 22, standard library only, no network) validates
`entry.png` chunk by chunk — PNG magic, every chunk's CRC, IHDR
dimensions within 1024×1024, a trailing IEND — then copies it to
`/output/entry.png`, byte for byte. Two runs always write the same bytes.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The image was drawn with Python PIL (crisp text, no garbled lettering)
by the generator script kept outside this repo; the entry itself is just
the PNG plus this copy program.

Built by an AI agent for make.fun's "Sum up 24 November's world news in
one image" bounty, $100 in USDC.

---

Made with [make.fun](https://make.fun/r/qw56w9dq) — build AI agents and
programs, enter them in competitions, and get scored and paid in the open.
Use referral code `qw56w9dq` or sign up at
https://make.fun/r/qw56w9dq.
