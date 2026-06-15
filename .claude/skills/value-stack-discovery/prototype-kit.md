# Prototype Kit — scaffolding the artifact

Turns synthesized data into a deployable Vite + React prototype with a Strategy
tab. The canonical template is this repo's
`wealthscape-intelligence/src/WealthscapePrototype.jsx` — clone its patterns
rather than reinventing them.

## Reusable assets to lift verbatim

From the reference file, these are component-agnostic and should be copied as-is:
- The **`T` design-token object** (colors).
- **`useBreakpoint()`** hook.
- **`StratSection({ eyebrow, title, intro, children })`** — section wrapper.
- **`StrategyLayer`** — the full Strategy tab (hero, market research, **capability
  comparison**, customer research, ranked outcomes, job map, opportunity matrix,
  recommendations, closing CTA). It is already data-driven by the schema shapes, so for
  a new component you swap the data constants and the component renders unchanged.
- The **capability-comparison block** inside `StrategyLayer` — a Fidelity-vs-best-in-class
  table driven by `CAPABILITY_MATRIX`, with the `ratingColor()` / `ratingLabel()` chip
  showing where the current Fidelity stack has a gap. Lift it verbatim; swap the data.
- The **opportunity-matrix block** inside `StrategyLayer` (the absolutely-positioned
  scatter with the underserved-zone gradient and tiered legend).
- The **deep-link mechanism**: shell owns `deepLink` state; `onNavigate(layer, sub)`
  switches layer and sets `{ ...sub, _ts: Date.now() }`.

## Steps

1. **Scaffold the app** (if no existing prototype for this component):
   ```bash
   npm create vite@latest <component>-prototype -- --template react
   cd <component>-prototype && npm i recharts lucide-react
   ```
   Set `index.html` `<title>` and add `<meta name="robots" content="noindex,nofollow">`.

2. **Port the kit**: copy `T`, `useBreakpoint`, `StratSection`, and `StrategyLayer`
   into a single `*Prototype.jsx`. Replace the data constants (`MARKET_SIGNALS`,
   `CAPABILITY_MATRIX`, `CUSTOMER_PAINS`, `OUTCOMES`, `JOB_MAP`, `RECOMMENDATIONS`,
   `STRAT_STATS`) with the synthesized values for this component, and bring the
   `ratingColor()` / `ratingLabel()` helpers.

3. **Build the recommended layers**: each `RECOMMENDATIONS[].surface` becomes a nav
   layer/tab. Start with a stub per layer, then flesh out the 1–2 highest-opportunity
   surfaces enough to demonstrate the top recommendations. Wire `onNavigate` so the
   Strategy tab's job-map cards and recommendation buttons jump to real surfaces.

4. **Add the Strategy tab to the nav**: append `{ id:"strategy", icon:Layers,
   label:"Strategy", badge:null }` to `navItems`, add it to `layerLabels`, and render
   `<StrategyLayer .../>` with `onNavigate`, `onStartTour`, `onStartScenario`.

5. **Verify**: `npm run build` must pass with zero errors before committing.

## HUD positioning (carry the fixes forward)
If you add a guided tour or scenario HUD, reuse the corner-based positioning from
the reference: place the panel in the quadrant farthest from the
target/spotlight's centre, and poll for targets that mount late. Do not pin a HUD
to a fixed corner — it will cover action buttons.

## Delivery
- Develop on a feature branch; build clean.
- Commit with a clear message; open a PR only if asked.
- Merge with **regular merge commits** (`merge_method: "merge"`), never squash —
  squash rewrites `main` history and forces conflict resolution on the next PR.
