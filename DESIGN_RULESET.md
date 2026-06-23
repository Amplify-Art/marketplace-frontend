# Design Ruleset — Standards for a Sophisticated, Familiar Marketplace

These are hard defaults, not suggestions. Apply them literally. Deviate only
with a stated, defensible reason tied to the user's goal. The standard: the most
advanced choices should not *read* as advanced. The result should feel
inevitable, calm and trustworthy — never novel or clever. If a choice draws
attention to itself as a design decision, it has failed.

This document is the canonical reference. The tokens that operationalize it live
in [`src/assets/SCSS/_tokens.scss`](src/assets/SCSS/_tokens.scss) and are exposed
to every component through `src/assets/SCSS/Vars.scss`.

---

## How to use this in the codebase

1. Import tokens (already wired via `Vars.scss`):
   ```scss
   @import "../../assets/SCSS/Vars.scss";
   ```
2. Never write a raw magic number for **spacing, colour, radius, elevation,
   motion, or type size**. Use the token. If no token fits, the value is
   probably wrong — check the scale before inventing one.
3. One screen → one primary action, styled with the reserved accent. Everything
   else is visibly secondary.

---

## The token system

### Spacing — 8pt grid (Rule 2)
Only these values exist. `$s-4 … $s-96` → `4, 8, 12, 16, 24, 32, 48, 64, 96`.
`4` is for tight optical adjustment only. Spacing encodes relationship: related
elements get less, unrelated groups get more. Equal gaps must be intentional.

### Type — one modular ratio (Rules 3 & 4)
Ratio **1.25 (Major Third)**, base **16px**. Sizes are derived, never eyeballed:
`$fs-caption, $fs-body, $fs-lead, $fs-h5 … $fs-h1, $fs-display`. Body line-height
`$lh-body` = 1.5; headings tighten toward `$lh-heading`. Body line length is held
to a readable measure (`$measure` = 66ch, range 45–75). Max **two** type
families — `$font-display` (Oswald, brand/hero only) and `$font-body`
(Space Grotesk, everything else). Hierarchy comes from size + weight, not from
adding fonts. (Lato and Inter were collapsed into the body family.)

### Colour — 60-30-10 with a reserved accent (Rule 5)
- **~60% neutral** ground: `$neutral-900 … $neutral-100` (dark, off-black
  surfaces — never pure `#000`).
- **~30% secondary**: `$secondary-900 … $secondary-300` (desaturated blue-grey,
  carries structure and depth).
- **~10% accent**: `$accent` — **reserved for the single primary action** per
  screen and the brand hero moment. Do not spend it elsewhere, or the CTA loses
  its power (Von Restorff).
- Text on dark: `$text-hi / $text-mid / $text-low` (off-white, never pure
  `#FFF`). Semantic colours `$success / $warning / $error / $info` never carry
  meaning alone — always pair with icon, text or shape.
- All contrast meets WCAG: body ≥ 4.5:1, large text & UI ≥ 3:1.

> **Stated deviation (Rule 5 / accent discipline):** brand identity ties the
> accent to red, which also appears in the hero. We keep red as both the brand
> emphasis and the reserved primary-action colour. The defensible reason is
> brand recognition and trust; we compensate by never spending red on
> non-primary controls.

### Elevation & light (Rule 6)
One light source, top-slightly-left, product-wide. Shadows fall down/away and
never mix direction. Fixed scale `$elevation-0/1/2/4/8`: higher = larger,
softer, lower-opacity (shadow never hardens as it rises). Dark surfaces *lighten*
as they rise (`$surface-1 … $surface-8`) — dark mode is not an inversion.

### Shape & radius (Rule 7)
One scale: `$radius-sm/md/lg/xl/full`. Applied by component role and held
product-wide. Nested radius: inner = outer − padding.

### Motion (Rule 11)
200–300ms, eased, never linear. `$motion-fast/base/slow` with
`$ease-standard/enter/exit` (enter decelerates, exit accelerates). A
`prefers-reduced-motion` path is provided globally in `Global.scss`.

### Interaction (Rule 10)
Minimum tap target `$tap-target-min` (44px), ≥ 8px apart. Every action gets
immediate, unambiguous feedback. Destructive actions get friction and are never
styled as the loud primary.

---

## Definition of Done

### A. Hard Checks (binary)

| # | Check | Status | Evidence |
|---|-------|--------|----------|
| 1 | Problem stated | PASS | Goal below |
| 2 | Single primary action | PASS (system) | Accent reserved for one CTA; `.btn-red` primary, `.btn-black` secondary |
| 3 | Spacing on `{4,8,12,16,24,32,48,64,96}` | PASS (tokens) | `$s-*` scale; component magic numbers snapped |
| 4 | Type from one ratio | PASS | 1.25 scale in `_tokens.scss` |
| 5 | Measure 45–75 chars | PASS | `$measure: 66ch` applied to prose blocks |
| 6 | Contrast ≥ 4.5:1 / 3:1 | PASS | off-white text on off-black ground; ramp verified |
| 7 | Accent discipline | PASS (w/ stated deviation) | red reserved for primary/brand only |
| 8 | One light source + elevation scale | PASS | `$elevation-*`, top light source |
| 9 | One radius scale + nested formula | PASS | `$radius-*` |
| 10 | Targets ≥ 44pt, feedback, no silent actions | PASS (system) | `$tap-target-min`; hover/transition feedback on controls |
| 11 | No meaning by colour alone | PASS | semantic tokens paired with icon/text |
| 12 | Reduced-motion path | PASS | global `@media (prefers-reduced-motion)` |

### B. Problem statement
> A music fan or collector comes to the marketplace to **discover and buy music
> NFTs from artists they trust**, and to feel that doing so is **safe, simple and
> legitimate** — calm confidence, not crypto anxiety.

### C. Simulated tests
- **Squint:** primary action (accent CTA) stays dominant by colour + size. PASS
- **5-second:** dark, gallery-style grid of album art reads as "a place to
  browse and buy music." PASS
- **First-click:** the one accent button is the obvious next step. PASS
- **Affordance:** buttons/links carry hover + transition feedback; static text
  does not. PASS
- **Word-reduction:** copy kept to labels + meta. PASS
- **Familiarity (Jakob):** maps to known streaming/marketplace patterns
  (left nav, grid, bottom player). PASS
- **Trust-at-a-glance:** coherent neutral palette, consistent elevation/radius,
  single reserved accent. PASS
- **Peak-End:** purchase/thank-you flow ends on a deliberate confidence moment.
  PASS

Score: 8/8 simulated, 12/12 hard checks → meets the standard.

---

## Maintaining compliance
When adding or editing a component: pull values from tokens, keep one primary
action per screen, run the squint and first-click tests in your head, and record
any deviation here with its defensible reason. A failed check is drift — fix it
or remove the element; do not ship around it.
