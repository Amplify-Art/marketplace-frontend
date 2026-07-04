# Design Quality Audit — marketplace-frontend

> Produced by running the **Design Quality & Validation Agent** procedure against the
> live codebase, enforcing `DESIGN_RULESET.md` (59 rules + §13 Definition of Done).
> Every finding below is grounded in file inspection or live measurement, not opinion.
> This is the canonical register + drift log. Status date: 2026-07-04.

---

## Coverage & method

- **Reachable surfaces** (rendered + inspected live at 375 / 768 / 1440px): Home and its 9
  sections, Albums, Artists, Marketplace, Login, Nominate. Overflow, focus, and hierarchy
  checked with a headless browser.
- **Code-audited (not live-rendered — auth/data-gated, no backend in this env):** Artist
  Dashboard, User Dashboard, Wallet, Settings, Profile, Search Result, Transaction List/Sign,
  Support Card, album/song modals. Audited by reading SCSS + JSX against the rules.
- **Objective checks** (spacing, accent, contrast, elevation, radius, motion, color-independence)
  run as repo-wide greps/measurements — counts are exact.

---

## PHASE 1–2 · Design Register (primary surfaces)

| ID | Surface | User goal & emotional target | Single primary action | Applicable rules |
|----|---------|------------------------------|-----------------------|------------------|
| S1 | Home / hero (Banner) | "Understand this is a music NFT marketplace and enter it" — curious, invited | **Explore the Marketplace** ✅ | 6,23,24,25,36,37,57 |
| S2 | Home / Partners | "Trust this is legitimate" — reassured | none (informational) | 46,58 |
| S3 | Home / Latest Releases | "See what's new, want to browse" — enticed | Card → album | 40,43,46 |
| S4 | Home / We Are For | "See myself in this" — belonging | none | 12,23,24 |
| S5 | Home / Testimonials | "Believe others trust it" — reassured | none (carousel) | 46,53,58 |
| S6 | Home / How It Works | "Understand the flow" — oriented | none (explainer) | 43,44,101 |
| S7 | Home / The Tech | "Trust the infrastructure" — confident | none | 24,58 |
| S8 | Home / The Team | "Know real people back this" — trust | Member → profile | 40,58 |
| S9 | Home / Join Us (closing) | "Take the next step" — decided | **Join Us / Explore** ✅ (fixed) | 6,25,57 |
| S10 | Albums grid | "Find an album to buy" — focused | Album card | 36,38,43,46,48 |
| S11 | Artists grid | "Find an artist" — focused | Artist card | 36,43,46 |
| S12 | Marketplace | "Browse/buy listed NFTs" — decisive | Buy/list action | 6,25,40,48,52 |
| S13 | Login | "Sign in with my wallet" — safe | Wallet connect | 6,25,48,50 |
| S14 | Nominate artist | "Nominate someone" — purposeful | Submit | 6,44,47,52 |
| S15 | Artist Dashboard | "See my sales at a glance" — in control | New NFT | 6,38,45,52 |
| S16 | Album/Song modal | "Preview & decide to buy" — engaged | Buy / play | 6,40,48,49 |

Deferred surfaces (data-gated, tracked but not yet audited live): User Dashboard, Wallet,
Settings, Profile, Search Result, Transaction Sign, Support Card.

---

## PHASE 3 · Drift Log (findings, grounded)

| Drift | Surface(s) | Rule | Severity | Expected → Actual | Root cause |
|-------|-----------|------|----------|-------------------|------------|
| **D1 Accent overuse** | S1,S4,S6,S8 + Header, Settings, TheTech, LatestReleases, ArtistRegistry, NewNFT (13 files) | 24,25 / HC7 | **High** | Accent (red) reserved for the one primary action → red also used for section-header strokes/underlines, dividers, active tabs, inline links | Brand red and primary-action color are the **same token** (`$accent`); identity and CTA roles are conflated |
| **D2 Off-grid spacing** | repo-wide | 10,11 / HC3 | Medium | All gaps ∈ {4,8,12,16,24,32,48,64,96} → ~150 raw off-grid values remain (20px ×22, 5px ×24, 10px ×15, 50px ×9, 3px ×12…) | Migration converted values that mapped cleanly; off-grid values left untouched to avoid layout shift |
| **D3 Measure not enforced** | body copy across sections | 18 / HC5 | Medium | Body 45–75ch → `$measure` token exists but few text blocks apply `max-width` | Token defined, not consumed |
| **D4 Broken elevation** | Wallet, SingleAlbumModal | 30,31 / HC8 | Low | One top-left light source, dark-mode elevation → light neumorphic shadows (`#bebebe`, `#ffffff`, `#f3f3f3`) in a dark UI | Pre-token hardcoded shadows |
| **D5 Single-primary unverified** | S12,S15,S16 | 6 / HC2 | Medium | Exactly one primary action per screen → not yet confirmed on data-gated screens | Needs live render w/ backend |
| **D6 Tap-target sweep** | forms, icon buttons | 48 / HC10 | Low | All targets ≥44px → token applied to CTAs only, not swept everywhere | Partial application |

### Checks that PASS (verified)
- **HC4 Type scale** — all sizes derive from one ratio (1.25) in `_tokens.scss`; surfaces migrated. ✅
- **HC6 Contrast** — core pairings spot-verified: `$text-hi`/`$text-mid` on `$neutral-900` clear 4.5:1; hero CTA (white on `$accent`, 20px semibold) clears the 3:1 large-text bar. `$text-low` only used for disabled/placeholder (exempt). ✅
- **HC9 Radius** — one scale, applied by role. ✅
- **HC11 Color-independence** — txn amounts pair red/green with `+`/`−` sign + "NEAR". ✅
- **HC12 Reduced motion** — global `prefers-reduced-motion` block neutralizes animation/transition. ✅
- **§57 Peak-End** — closing "Join Us" CTA rebuilt with one confident primary + clean ending; dead login link repaired. ✅
- **Responsive** — no horizontal overflow at 375/768px across all 6 reachable routes. ✅

---

## PHASE 6 · Design Confidence Score

```
HC (hard checks clean-pass)     = 7/12  = 0.58   (fails: D1 accent, D2 spacing; partials D3,D5,D6)
ST (simulated, Home surface)    ≈ 6/8   = 0.75   (word-reduction + trust-at-a-glance held back by accent noise)
CI (surfaces on canonical only) ≈ 0.60          (accent + off-grid dilute canonical consistency)
AC (accessibility)              ≈ 0.80          (contrast/focus/reduced-motion/color-independence pass; tap-target sweep partial)

Confidence = (0.35·0.58 + 0.30·0.75 + 0.20·0.60 + 0.15·0.80) × 100 ≈ 67 / 100
```

**Gating:** one open **High** drift (D1 accent discipline) caps Confidence at **79**. Current
score **67** sits below the cap, so the binding constraints are the two hard-check failures
(D1, D2) plus the unverified partials (D3, D5, D6).

### What blocks the remaining points
1. **D1 (High)** — resolve accent discipline. *Requires a brand decision* (see below). Biggest single lever.
2. **D2 (Medium)** — normalize off-grid spacing onto the 8pt scale. Large, mechanical, layout-sensitive.
3. **D3 / D6** — apply `$measure` to body blocks; sweep tap targets. Small, safe.
4. **D5** — verify single-primary-action on data-gated screens (needs a reachable backend).

---

## The one decision that gates D1

The ruleset says the primary-action color must be used for **nothing else** (Rule 25). This
brand's identity **is** red — the outlined section headers, dividers, and hero stroke are its
signature. Those two facts collide. Three defensible resolutions:

- **A — Split the token.** Introduce `$brand` (identity: headers, strokes, dividers) distinct
  from `$accent` (the single CTA per screen). Keeps the look, restores discipline. *Most correct.*
- **B — Reduce decorative red.** Demote header strokes/links/dividers to neutral, leaving red
  only for CTAs. Stricter, but changes the brand's signature look.
- **C — Documented waiver.** Accept brand red as a stated deviation; ensure each screen's CTA
  still wins by size/placement. Lowest effort, D1 stays open (Confidence capped at 79).
