# Data Schema — the discovery → prototype contract

The odi-synthesis agent emits these exact shapes, and the prototype kit consumes
them unchanged. They mirror the constants in
`wealthscape-intelligence/src/WealthscapePrototype.jsx` (search `MARKET_SIGNALS`,
`OUTCOMES`, `JOB_MAP`, `RECOMMENDATIONS`).

## Scoring helpers (canonical — do not redefine per project)

```js
const oppScore = o => o.imp + Math.max(o.imp - o.sat, 0);   // o.imp, o.sat ∈ [0,10]
const oppColor = v => v >= 16 ? T.green : v >= 14 ? T.indigo : T.slate;
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

// headline metrics for the hero
const STRAT_STATS = [
  { value:"11", label:"High-opportunity outcomes" },
  // ...
];
```

## Consistency rules
- `OUTCOMES[].id` values referenced in `RECOMMENDATIONS[].outcomes` must exist.
- `layer` values must match real prototype layer ids (the nav items).
- Never store a precomputed opportunity number that disagrees with `oppScore()`;
  always derive it. (This is the one inconsistency we fixed in the Wealthscape data.)
- Importance is typically 8.0–9.5 for a job worth funding; satisfaction 2–4 when
  underserved. To preserve a target opportunity score while spreading points on the
  matrix, adjust `imp`, not `sat`, since `opp = 2·imp − sat` while `sat < imp`.
