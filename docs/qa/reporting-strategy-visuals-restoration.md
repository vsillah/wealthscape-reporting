# Reporting Strategy visual restoration — 16 September 2026

## Final behavior

Section 5 now shows 15 reporting-specific outcomes with importance and satisfaction proxies (0–10) and computed opportunity scores (0–20). The four-quadrant map, score-ranked view, dropdown and All outcomes reset share selection. Non-selected points are muted; reset restores equal emphasis. Selected detail includes scores, provenance, contextual source links, proposed UX response, bounded synthetic demo coverage and a profile-preserving Reporting outputs link.

The map reuses the earlier `ReportingOpportunityMap` and collision-aware plot from `d5ca161`, with derived/inferred marker shapes. Its full scale uses a disclosed 5/10 quadrant boundary. Expanded scale preserves the satisfaction boundary between underserved opportunity and table stakes. Two new assumptions fall in table stakes; no values were fabricated to populate the other two quadrants.

The section remains separate from account maintenance. Account-maintenance values were not reused. The five executive themes remain as recommendation groupings, linked to representative detailed outcomes. The headline count now reads 15.

Section 4 customer-context evidence now separates the metric being shown from the customer/workflow context and the downstream strategy implication. The large value is labelled as the source metric, the card headline describes the customer context, and the implication states what the strategy should test. The 41.4-hour Kitces figure is explicitly framed as an illustrative senior-advisor workweek, not a measured reporting-preparation baseline.

## Score provenance

Every rating is a management estimate, not a customer survey result. Nine pairs retain earlier local strategy ratings from `wealthscape-intelligence/src/WealthscapePrototype.jsx` at `6bbae9f`; the description is narrowed to reporting where needed:

| Reporting outcome | Earlier input | Importance | Satisfaction |
| --- | --- | ---: | ---: |
| R1 | ODI #5.1 | 9.5 | 2.0 |
| R2 | ODI #5.3 | 9.4 | 2.0 |
| R3 | BD-HA #1 | 9.4 | 2.5 |
| R5 | BD-HA #2 | 9.1 | 2.7 |
| R7 | BD-HA #5 | 8.6 | 3.2 |
| R8 | BD-HA #4 | 8.8 | 3.1 |
| R10 | ODI #15 | 8.5 | 2.8 |
| R13 | ODI #8.2 | 8.8 | 2.6 |
| R14 | ODI #8.4 | 8.1 | 3.2 |

R4, R6, R9, R11, R12 and R15 are new discovery assumptions dated 16 September 2026. Each records its rationale in `reportingOutcomes.js` and selected detail. Public references support the workflow context, not the numeric ratings. The legend explicitly reports no sourced customer measurements. These common reporting estimates are not profile-specific research.

Opportunity = importance + max(importance − satisfaction, 0). The ranked bars use the common 0–20 range. Customer validation is required before investment prioritization; the prototype does not establish measured dissatisfaction or production capabilities.

## Historical comparison and competitor preservation

- `c3632a3`: interactive outcomes ranked by legacy synthesis scores.
- `d5ca161`: importance/satisfaction map, reset, scale control, evidence grid and reporting journey.
- `b31a229`: five ordinal executive themes replaced the broader score sets.
- `6bbae9f`: initial PR #37 restored qualitative exploration and the competitor capability explorer.
- This revision restores scored exploration with explicit provenance and a reporting-specific set of 15 outcomes.

The nine-vendor/four-capability explorer, evidence grid, reference cards, Fidelity incumbent baseline, source links and no-product-audit caveats remain intact.

## Validation

- `npm --prefix wealthscape-intelligence ci` — installed locked dependencies. npm reported two existing high-severity dependency advisories; dependency changes are outside this UI revision.
- `npm --prefix wealthscape-intelligence run build` — pass.
- `node --test wealthscape-intelligence/src/*.test.js` — 41 pass, 0 fail.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 42 pass, 0 fail after the customer-context card clarification.
- `git diff --check` — pass.
- 16 September follow-up: `git diff --check` — pass.
- Integrated Browser: `http://127.0.0.1:5182/#view=strategy&profileId=bd-home-office&strategyTrack=reporting`.
- Visual inspection at 1440×1000, 768×1024 and 390×844. Tablet/mobile document widths equal viewport widths. The map deliberately scrolls horizontally on small screens, with the region labelled accordingly.
- Clicked all 15 map points: correct ID, scores and detail for each.
- Checked selected-point muting, All outcomes reset, dropdown synchronization, full/expanded map, score ranking and ranked selection. Selecting the last ranked item revealed its previously offscreen detail; this recovery was fixed and retested.
- Clicked build/customize/generate outcome links and verified the destination URL preserves `profileId=bd-home-office` and the correct `reportTab`.
- Competitor regression: all four capability filters retain nine cards, evidence-grid view retains 36 interactive cells, reference-card view renders, and Fidelity access-controls detail preserves the explicit Not assessed boundary.
- No live workflow/customer-data smoke, production deployment or merge performed. Captain preview verification and human acceptance remain next.

## Local visual evidence

Screenshots from the actual local route are in `/private/tmp/wealthscape-pr37-scored-qa/`:

- `outcomes-all-desktop.png`
- `outcome-selected-desktop.png`
- `ranked-selected-desktop.png`
- `outcome-selected-mobile.png`
- `competitor-tablet.png`

To reproduce: open the route above, select section 5, inspect R6 and R12, switch to Ranked outcomes, choose R15, then reset All outcomes. Open section 2 to compare capability filters, Fidelity evidence and the preserved alternative views.
