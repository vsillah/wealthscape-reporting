# Data Schema — the discovery → prototype contract

The odi-synthesis agent emits these exact shapes, and the prototype kit consumes
them unchanged. They mirror the constants in
`wealthscape-intelligence/src/WealthscapePrototype.jsx` (search `MARKET_SIGNALS`,
`OUTCOMES`, `JOB_MAP`, `RECOMMENDATIONS`).

## Scoring helpers (canonical — do not redefine per project)

```js
const oppScore = o => o.imp + Math.max(o.imp - o.sat, 0);   // o.imp, o.sat ∈ [0,10]
const oppColor = v => v >= 16 ? T.green : v >= 14 ? T.indigo : T.slate;

// Capability comparison: how well the CURRENT Fidelity stack does each capability today.
const ratingColor = r => r === "strong" ? T.green : r === "partial" ? T.amber : T.red;
const ratingLabel = r => r === "strong" ? "Has it" : r === "partial" ? "Partial" : "Gap";

// Build-vs-buy resolution: how to close each capability gap.
const callColor = c => ({ build:T.green, buy:T.indigo, partner:T.amber, wrap:T.emerald }[c] || T.slate);
const callLabel = c => ({ build:"Build", buy:"Buy", partner:"Partner", wrap:"Wrap" }[c] || c);
```

## Shapes

```js
// 5–7 external signals
const MARKET_SIGNALS = [
  { tag:"Tool Sprawl", stat:"12 apps", source:"Kitces 2025", icon:Layers,
    body:"One or two sentences. Every stat must be sourced." },
  // ...
];

// 4–6 persona pains, each with a measurable cost
const CUSTOMER_PAINS = [
  { metric:"~2 hrs", pain:"What hurts and why, in the executor's words." },
  // ...
];

// 5–7 rows comparing the incumbent (current Fidelity tech) to best-in-class.
// rating = how well the CURRENT Fidelity stack does this capability TODAY:
//   "none"    → Fidelity doesn't do it (red)
//   "partial" → Fidelity does it incompletely / manually (amber)
//   "strong"  → Fidelity is at or near best-in-class (green)
// Every `fidelity` and `competitor` claim must be sourced; flag ASSUMED values.
const CAPABILITY_MATRIX = [
  { capability:"Digital subscription & good-order automation",
    fidelity:"One-phrase current-state of the Fidelity stack",
    rating:"partial",
    competitor:"Who does it best + how (named competitor)",
    source:"Citable source",
    gap:"The measurable delta and why it matters" },
  // ...
];

// 8–12 outcome statements. imp/sat ∈ [0,10]; opp derived via oppScore().
// layer = the prototype surface id that serves it; sub = optional deep-link payload.
const OUTCOMES = [
  { id:"ODI #1", imp:9.5, sat:2.0,
    text:"Minimize the time to <verb> <object> <clarifier>",
    layer:"reports", sub:{ reportTab:"generate" } },
  // ...
];

// the 8 universal job steps, each owned by a layer
const JOB_MAP = [
  { n:1, step:"Define",   goal:"…", layer:"morning" },
  { n:2, step:"Locate",   goal:"…", layer:"morning" },
  { n:3, step:"Prepare",  goal:"…", layer:"integrations" },
  { n:4, step:"Confirm",  goal:"…", layer:"reports" },
  { n:5, step:"Execute",  goal:"…", layer:"reports" },
  { n:6, step:"Monitor",  goal:"…", layer:"insights" },
  { n:7, step:"Modify",   goal:"…", layer:"reports" },
  { n:8, step:"Conclude", goal:"…", layer:"portal" },
];

// 4–6 recommendations, each tied to outcomes + the surface that delivers it
const RECOMMENDATIONS = [
  { n:1, title:"Imperative phrased as a move",
    surface:"Morning Brief", layer:"morning", sub:null,
    outcomes:["ODI #1","ODI #7"],
    body:"What the surface does and why it closes the gap." },
  // ...
];

// 5–7 rows — one per key capability gap. Resolves CAPABILITY_MATRIX gaps into an action.
//   role     : "core" (a differentiator) | "context" (table stakes)
//   maturity : external-solution maturity — "high" | "med" | "low"
//   urgency  : competitive / regulatory clock — "high" | "med" | "low" (usually tracks opp score)
//   call     : "build" | "buy" | "partner" | "wrap" (a differentiated layer over a bought/partnered core)
const BUILD_BUY = [
  { gap:"Matches a CAPABILITY_MATRIX capability", role:"context", maturity:"high", urgency:"high",
    call:"partner", outcomes:["ODI #1"],
    rationale:"Why this call follows from role × maturity × urgency, in 1–2 sentences." },
  // ...
];

// headline metrics for the hero
const STRAT_STATS = [
  { value:"11", label:"High-opportunity outcomes" },
  // ...
];
```

## Consistency rules
- `OUTCOMES[].id` values referenced in `RECOMMENDATIONS[].outcomes` must exist.
- `layer` values must match real prototype layer ids (the nav items).
- `CAPABILITY_MATRIX[].rating` is one of `"none" | "partial" | "strong"` and is read
  through `ratingColor()` / `ratingLabel()` — never hardcode the color. Each capability
  should trace to a related market signal or outcome (a `gap` here is the same gap an
  underserved `OUTCOMES` row measures), so the matrix and the opportunity list agree.
- `BUILD_BUY[].gap` should match a `CAPABILITY_MATRIX[].capability` (resolve each key
  gap), and its `outcomes` ids must exist in `OUTCOMES`. `call` is read through
  `callColor()` / `callLabel()` — never hardcode. Apply the decision logic consistently:
  core + low maturity → `build`; core + high maturity → `buy` or `wrap`; context + high
  maturity → `partner`; sequence the calls by `urgency` (which tracks the opp score).
- Never store a precomputed opportunity number that disagrees with `oppScore()`;
  always derive it. (This is the one inconsistency we fixed in the Wealthscape data.)
- Importance is typically 8.0–9.5 for a job worth funding; satisfaction 2–4 when
  underserved. To preserve a target opportunity score while spreading points on the
  matrix, adjust `imp`, not `sat`, since `opp = 2·imp − sat` while `sat < imp`.
