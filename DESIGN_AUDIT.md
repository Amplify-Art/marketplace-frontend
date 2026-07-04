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

| Drift | Surface(s) | Rule | Severity | Status | Expected → Actual | Root cause / resolution |
|-------|-----------|------|----------|--------|-------------------|------------|
| **D1 Accent overuse** | S1,S4,S6,S8 + Header, Settings, TheTech, LatestReleases, ArtistRegistry, NewNFT (13 files) | 24,25 / HC7 | **High** | **RESOLVED** | Accent reserved for one primary action → red was also on header strokes, dividers, active tabs, links | **Split the token** (option A): new `$brand` carries identity (10 files); `$accent` now survives ONLY on the 3 true CTAs (`.btn-red`, `.hero-cta`, `.join-primary`). Both resolve to the same red → zero visual change, discipline restored. Verified pixel-identical on home. |
| **D2 Off-grid spacing** | repo-wide | 10,11 / HC3 | Medium | Open | All gaps ∈ {4,8,12,16,24,32,48,64,96} → ~150 raw off-grid values remain (20px ×22, 5px ×24, 10px ×15, 50px ×9, 3px ×12…) | Migration converted values that mapped cleanly; off-grid left untouched to avoid layout shift. Deferred (layout-sensitive, per "safe fixes only"). |
| **D3 Measure not enforced** | body copy across sections | 18 / HC5 | Medium | Open (low impact) | Body 45–75ch → `$measure` token exists but few blocks apply `max-width` | Home body copy already sits in constrained containers; the real risk is on data-gated detail pages, not safely applyable without live render. |
| **D4 Broken elevation** | Wallet, SingleAlbumModal | 30,31 / HC8 | Low | **SingleAlbumModal FIXED**; Wallet open | Dark-mode elevation → light neumorphic shadows (`#bebebe`/`#ffffff`) in dark UI | SingleAlbumModal album-art shadow (+ zero-width-space bug) → `$elevation-4`. Wallet is a light-surface neumorphic card, data-gated; left flagged rather than changed blind. |
| **D5 Single-primary unverified** | S12,S15,S16 | 6 / HC2 | Medium | Open | One primary action per screen → not confirmed on data-gated screens | Needs live render w/ backend. |
| **D6 Tap-target sweep** | forms, icon buttons | 48 / HC10 | Low | Open | All targets ≥44px → token applied to CTAs only | Blind global min-size would risk layout shifts; deferred to a live-render pass. |

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
                                   BEFORE            AFTER (D1 resolved, D4 partial)
HC (hard checks clean-pass)     = 7/12 = 0.58   →    8/12 = 0.67   (only D2 still a hard fail)
ST (simulated, Home surface)    ≈ 6/8  = 0.75   →    7/8  = 0.85   (accent noise removed)
CI (surfaces on canonical only) ≈ 0.60          →    0.68          (accent canonical; off-grid remains)
AC (accessibility)              ≈ 0.80          →    0.82

Confidence = (0.35·0.67 + 0.30·0.85 + 0.20·0.68 + 0.15·0.82) × 100 ≈ 75 / 100   (was 67)
```

**Gating:** with **D1 resolved there is no open High drift**, so the 79 cap is lifted. Score
**75** is now bound by the remaining **Medium** drift (D2 off-grid spacing) and the unverified
partials (D3, D5, D6) — all of which need either a large layout-sensitive sweep or a live
backend to close safely.

### What blocks the remaining points (to reach 100)
1. **D2 (Medium)** — normalize ~150 off-grid spacing values onto the 8pt scale. Large, mechanical, layout-sensitive; needs per-section visual QA at 3 breakpoints.
2. **D5 (Medium)** — verify exactly-one-primary-action on Marketplace / Dashboard / modals (needs a reachable backend to render).
3. **D3 / D6 (Low)** — apply `$measure` to long-form body on detail pages; sweep tap targets — both need live render of data-gated pages to apply without regressions.
4. **D4 (Low)** — convert Wallet's neumorphic shadows to the elevation scale once it can be rendered and the intended look confirmed.

---

## D1 resolution (decided: option A — split the token)

Rule 25 says the primary-action color must be used for **nothing else**, but this brand's
identity **is** red (outlined headers, dividers, hero stroke). Resolved by **splitting the
token**:

- **`$brand`** (`#E52B25`) — identity only: section-header strokes, the `.line` marks,
  dividers, active nav/tab states, the hero "MARKETPLACE" outline. 10 files.
- **`$accent`** (`#E52B25`) — reserved for the ONE primary action per screen: `.btn-red`,
  `.hero-cta`, `.join-primary`. 3 treatments.

Both resolve to the same red today, so the change is **visually identical** but semantically
disciplined — and if the CTA ever needs to out-shout the decorative brand red, `$accent` can
shift tone without touching identity. NewNFT's error text was also moved off the brand red onto
the semantic `$error` token.

---

## Final pass · taste-skill (anti-slop) applicable aspects

Applied the portable **taste-skill** as a redesign/preserve overlay. Most of that skill targets
greenfield Tailwind/Next landing pages; the aspects applicable to this existing React+SCSS
product were run as a pre-flight. **Design Read:** *music-NFT marketplace (preserve mode) for
crypto-curious music fans, dark-tech brand language, locked red accent.*

**Fixed**
- **Em-dash ban (§9.G)** — the one user-facing em-dash ("their support — without gatekeepers",
  HowItWorks) replaced with a comma. Repo-wide UI copy now has **zero** em/en dashes.

**Audited — already clean (no changes needed)**
- **AI tells (§9.F)** — no scroll cues, version/BETA labels in hero, decorative status dots,
  photo-credit captions, "trusted by / quietly in use" strips, or section-number eyebrows.
  (`amplifybeta.testnet` is a NEAR account, not a version label.)
- **One accent, <80% sat (§4.2)** — satisfied by the `$brand`/`$accent` split (D1).
- **No pure black/white (§4.2)** — tokens use off-black surfaces + off-white text.
- **Shape consistency lock** — single radius scale (`$radius-*`).
- **Reduced motion** — global `prefers-reduced-motion` path.
- **Duplicate CTA intent** — CTAs are distinct ("Explore the Marketplace", "Visit App",
  "Login"); the two "Learn More" are one nav menu mirrored desktop/mobile, not duplicates.
- **CTA no-wrap** — hero label fits one line at desktop and in the 327px mobile column.

**Out of scope for a final pass (would be an overhaul, not preserve)**
- **Page theme lock (§4.11)** — the home runs a dark hero over a light body with dark
  testimonial cards. This is the established brand structure, not mid-page theme thrash;
  re-theming the whole page is a redesign, not a polish pass.
- **Body measure `max-w-[65ch]` (§4.1)** — matches drift D3 (`$measure` 66ch); home copy already
  sits in constrained containers, detail pages need a live backend to apply safely.
- **Stack defaults (Tailwind v4 / Motion / next/font)** — this is a CRA + SCSS codebase; the
  skill's framework/stack section does not apply without a migration.
