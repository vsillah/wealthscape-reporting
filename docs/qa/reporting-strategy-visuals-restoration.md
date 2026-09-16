# Reporting Strategy visual restoration — 16 September 2026

## Final behavior

Section 5 now shows 15 reporting-specific outcomes with importance and satisfaction proxies (0–10) and computed opportunity scores (0–20). The four-quadrant map, score-ranked view, dropdown and All outcomes reset share selection. Non-selected points are muted; reset restores equal emphasis. Selected detail includes a short problem blurb, scores, provenance, where the issue appears in the job map, proposed UX response, bounded synthetic demo coverage, contextual source links and a profile-preserving Reporting outputs link.

The map reuses the earlier `ReportingOpportunityMap` and collision-aware plot from `d5ca161`, with derived/inferred marker shapes. Its full scale uses a disclosed 5/10 quadrant boundary. Expanded scale preserves the satisfaction boundary between underserved opportunity and table stakes. Two new assumptions fall in table stakes; no values were fabricated to populate the other two quadrants.

The ranked-outcomes view now anchors each opportunity score at the end of its bar with a visible marker and score chip, so adjacent scores can be compared without relying only on the text line below the chart.

The score chip now sits in a dedicated bar row instead of floating above the bar, which keeps the outcome statement readable in the ranked list.

The ranked-outcomes list is now bounded to its own internal scroll region on desktop and tablet widths. This keeps the outcome detail panel visible while reviewers move through all 15 ranked cards.

The ranked-outcomes list and right-side detail panel now share the same desktop height. Ranked cards keep their natural height and scroll inside the list; they are not compressed to fit the fixed panel height.

The section remains separate from account maintenance. Account-maintenance values were not reused. The five executive themes remain as recommendation groupings, linked to representative detailed outcomes. The headline count now reads 15.

Section 4 customer-context evidence now separates the metric being shown from the customer/workflow context and the downstream strategy implication. The large value is labelled as the source metric, the card headline describes the customer context, and the implication states what the strategy should test. The 41.4-hour Kitces figure is explicitly framed as an illustrative senior-advisor workweek, not a measured reporting-preparation baseline.

Section 2 competitor-research evidence now uses the same structure. The large value is labelled as the source metric, the card headline states the competitive context, and the interpretation is labelled "Competitive read" to avoid presenting a recommendation where the section should only explain advantage, disadvantage, parity, or uncertainty.

Section 2 competitor-research cards and section 4 customer-context cards now also include compact iconography and an explicit sentiment signal. Up-right signals identify potential advantage or demand tailwind, down-right signals identify competitive pressure or friction, and side-to-side signals identify neutral, mixed or validation-needed evidence. The signal summary sits above the source context so reviewers can see the takeaway before reading the source detail.

Section 2 now starts the competitor presentation with a real-logo capability comparison map. The map plots a directional advisor-satisfaction proxy against the count of public-source SaaS reporting capabilities described in the retained evidence, and it keeps that proxy layer separate from the tabular evidence model. Selecting a logo, dot or dropdown option updates the in-context inspector with scores, position rationale, capability coverage and assumptions. The existing tabular evidence, capability cards and reference cards remain available through the same view switch.

Reporting competitor logos use local copies of public/official assets rather than generated wordmark treatments. The added assets are Addepar, Advyzon, Envestnet, Orion and SS&C Black Diamond; existing local Wealthscape, Altruist, Schwab and BNY Pershing assets are reused. Source URLs, SHA-256 hashes and passive-SVG handling notes are recorded in `wealthscape-intelligence/public/competitor-brands/README.md`.

The default competitor capability map no longer renders static vendor-specific reference cards or the control-layer thesis below the map. Those items now appear only inside the explicit Reference cards view, so the All platforms state stays neutral and competitor-specific content appears only after a selected platform or selected presentation mode creates context.

The competitor capability map now keeps confidence out of the axes. The X-axis remains advisor satisfaction proxy, the Y-axis remains reporting workflow breadth, quadrant labels use "workflow coverage" language, and map markers use solid, dashed or dotted outlines plus a legend to show public-evidence confidence.

Section 4 customer context now uses a synthetic Jordan Williams advisor photo for the RIA persona instead of a generic icon. The right-side entries now read as quote-style synthesized pain points, with phase and metric pills plus a "Where it shows up" line tying each pain point to the reporting job map. Non-Jordan profiles retain the neutral persona icon so the image is not reused for the wrong identity.

The Jordan Williams card now treats the persona details as designed UI instead of plain text: the profile facts render as compact cards, the persona is labelled as a JTBD persona, and three advisor needs are surfaced with functional, social and emotional framing. Each need ties back to a reporting job phase so the left side of the customer-context layout carries the same research structure as the pain cards on the right.

Section 6 job map now uses the same visual philosophy as the Account Maintenance journey: an illustrative curve with positive, neutral and friction symbols, selectable milestones, and a compact proposed-sequence swimlane for client events, operations work and handoffs. Selecting a milestone highlights the corresponding stage group and keeps the surrounding stages visible for context.

The reporting job-map milestone icons now anchor directly to the curve coordinates. Labels remain below the markers, but the positive, neutral and friction symbols sit on the line instead of floating above or below it.

The Account Maintenance executive findings now read as research-backed takeaways instead of section labels. The leadership recommendation names a shared validation-and-exception pilot, and the section findings explain what the market, competitor, customer, outcome, job-map, recommendation and sourcing evidence implies before the reader opens each detailed section.

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

Opportunity = importance + max(importance − satisfaction, 0). The ranked bars use the common 0–20 range. Customer validation is required before investment prioritization; the prototype does not establish measured dissatisfaction or production capabilities. The outcome detail panel uses compact derived/inferred labels so the selected outcome can stay focused on user context, job-map location and proposed workflow.

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
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 43 pass, 0 fail after the competitor-research card clarification.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 43 pass, 0 fail after adding competitor and customer sentiment/icon signals.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after reporting outcome UX parity updates.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after reporting outcome UX parity updates.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=ranked-bars-no-overlap#view=strategy&profileId=ria&strategyTrack=reporting` — ranked outcomes R9, R4 and R5 inspected; score chips remain on the bar row and do not cover outcome statements.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after ranked bar score no-overlap update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after ranked bar score no-overlap update.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=ranked-scroll#view=strategy&profileId=ria&strategyTrack=reporting` — ranked outcomes scroll internally; verified 460px visible list region, 3,129px scroll height, and bottom cards reachable while the detail panel remains visible.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=ranked-equal-height#view=strategy&profileId=ria&strategyTrack=reporting` — ranked outcomes and outcome detail panels both render at 678px high with 0px height delta; ranked cards retain 197px natural height and scroll inside a 3,129px list.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after ranked-outcomes internal scroll update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after ranked-outcomes internal scroll update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after equal-height ranked-outcomes overflow fix.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after equal-height ranked-outcomes overflow fix.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=reporting-parity-local#view=strategy&profileId=ria&strategyTrack=reporting` — section 4 customer context renders the Jordan Williams synthetic portrait as an image asset, shows 5 pain-point cards, exposes phase/metric pills and job-map "Where it shows up" labels, and has no horizontal overflow at 1109px (`documentWidth` = `viewportWidth` = 1109).
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after customer persona photo and pain-point update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after customer persona photo and pain-point update.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=reporting-parity-local#view=strategy&profileId=ria&strategyTrack=reporting` — section 4 customer context now shows structured persona facts and 3 JTBD advisor need cards: functional, social and emotional. Verified no horizontal overflow at 1109px (`documentWidth` = `viewportWidth` = 1109).
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 14 pass, 0 fail after persona needs and profile-card styling update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 44 pass, 0 fail after persona needs and profile-card styling update.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=reporting-capability-map-local#view=strategy&profileId=ria&strategyTrack=reporting` — section 2 competitor research renders the real-logo capability map; verified no new browser errors while selecting Advyzon, switching the inspector to Evidence, and toggling back to the tabular evidence view.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=reporting-jobmap-parity-local#view=strategy&profileId=ria&strategyTrack=reporting` — section 6 job map renders the Account Maintenance-style curve, compact milestone symbols, proposed-sequence swimlane and selected Prepare-state highlight without oversized icon overflow.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=reporting-jobmap-parity-local#view=strategy&profileId=ria&strategyTrack=reporting` — section 2 default All platforms capability-map state no longer shows static Orion, Envestnet, BlackRock or control-layer cards below the selector.
- 16 September follow-up: actual human-QA walkthrough recorded at `http://127.0.0.1:5198/?qa=actual-humanqa-walkthrough#view=strategy&profileId=ria&strategyTrack=reporting` — the MP4 shows the exact route loading, executive finding expansion, jump into competitor research, competitor-map selection, evidence-tab interaction and job-map scroll. This supersedes still-frame MP4 captures for the human-QA handoff.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=jobmap-icons-on-line#view=strategy&profileId=ria&strategyTrack=reporting` — reporting job-map marker centers align with the curve coordinates with max measured delta 0.01px, no browser console errors, and phase clicks still update the selected state.
- 16 September follow-up: in-app Browser QA at `http://127.0.0.1:5198/?qa=maintenance-findings-brief#view=strategy&profileId=ria&strategyTrack=lifecycle` — account-maintenance executive findings include the revised market, customer, outcomes and recommendation takeaways; four drawers expanded; the detailed Outcomes section reuses the revised finding; no browser console errors or horizontal overflow at 1280px.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 15 pass, 0 fail after adding the real-logo reporting capability map.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 15 pass, 0 fail after the reporting job-map visual parity update.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 15 pass, 0 fail after removing static competitor-specific details from the default map state.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingEvidence.test.js wealthscape-intelligence/src/reportingResearch.test.js` — 18 pass, 0 fail after anchoring reporting job-map icons to the curve.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 48 pass, 0 fail after anchoring reporting job-map icons to the curve.
- 16 September follow-up: `node --test wealthscape-intelligence/src/reportingResearch.test.js` — 15 pass, 0 fail after revising account-maintenance executive findings.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 49 pass, 0 fail after revising account-maintenance executive findings.
- 16 September follow-up: `node --test wealthscape-intelligence/src/*.test.js` — 45 pass, 0 fail after adding the real-logo reporting capability map.
- `git diff --check` — pass.
- 16 September follow-up: `git diff --check` — pass.
- 16 September follow-up: `git diff --check` — pass after customer persona photo and pain-point update.
- 16 September follow-up: `git diff --check` — pass after persona needs and profile-card styling update.
- 16 September follow-up: `git diff --check` — pass after adding the real-logo reporting capability map.
- 16 September follow-up: `git diff --check` — pass after the reporting job-map visual parity update.
- 16 September follow-up: `git diff --check` — pass after removing static competitor-specific details from the default map state.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after reporting outcome UX parity updates.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after ranked bar score no-overlap update.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after ranked-outcomes internal scroll update.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after equal-height ranked-outcomes overflow fix.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after customer persona photo and pain-point update.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after persona needs and profile-card styling update.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after the real-logo reporting capability map.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after the reporting job-map visual parity update.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after removing static competitor-specific details from the default map state.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after anchoring reporting job-map icons to the curve.
- 16 September follow-up: `npm --prefix wealthscape-intelligence run build` — pass after rerunning with sandbox escalation for Vite's local `.vite-temp` write after revising account-maintenance executive findings.
- Integrated Browser: `http://127.0.0.1:5182/#view=strategy&profileId=bd-home-office&strategyTrack=reporting`.
- Integrated Browser: `http://127.0.0.1:5198/?qa=reporting-parity-local#view=strategy&profileId=ria&strategyTrack=reporting`.
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

Additional 16 September parity evidence is in `/private/tmp/wealthscape-pr37-humanqa-ux-parity/`:

- `wealthscape-pr37-reporting-outcomes-parity.mp4`
- `01-selected-outcome.png`
- `02-selected-detail-jobmap.png`
- `03-all-outcomes-reset.png`
- `04-ranked-outcomes.png`

To reproduce: open `http://127.0.0.1:5198/?qa=reporting-parity-local#view=strategy&profileId=ria&strategyTrack=reporting`, select section 5, choose R2 from the map or dropdown, confirm non-selected outcomes are muted, confirm the derived/inferred provenance legend remains outside the problem description, review the job-map context and UX response in the selected detail panel, reset All outcomes, then switch to Ranked outcomes.

Ranked-bar score marker evidence is in `/private/tmp/wealthscape-pr37-humanqa-ranked-bars/wealthscape-pr37-ranked-bar-score-markers.mp4`.

Ranked-bar no-overlap follow-up evidence is in `/private/tmp/wealthscape-pr37-humanqa-ranked-bars-no-overlap/`:

- `wealthscape-pr37-ranked-bar-score-no-overlap.mp4`
- `reporting-ranked-bars-clean-target-no-overlap.png`

Ranked-outcomes internal scroll evidence is in `/private/tmp/wealthscape-pr37-humanqa-ranked-scroll/`:

- `wealthscape-pr37-ranked-outcomes-internal-scroll.mp4`
- `ranked-scroll-top.png`
- `ranked-scroll-bottom.png`

Ranked-outcomes equal-height and overflow fix evidence is in `/private/tmp/wealthscape-pr37-humanqa-ranked-equal-height/`:

- `wealthscape-pr37-ranked-outcomes-equal-height-fixed.mp4`
- `ranked-equal-height-fixed.png`

Customer-context persona photo and pain-point evidence is in `/private/tmp/wealthscape-pr37-humanqa-customer-persona/`:

- `wealthscape-pr37-customer-persona-approved-photo.mp4`
- `customer-persona-approved-photo.jpg`

Customer-context persona needs evidence is in `/private/tmp/wealthscape-pr37-humanqa-persona-needs/`:

- `wealthscape-pr37-persona-needs.mp4`
- `persona-needs-top.jpg`
- `persona-needs-local.jpg`

Reporting competitor real-logo capability-map evidence is in `/private/tmp/wealthscape-pr37-humanqa-reporting-capability-map/`:

- `wealthscape-pr37-reporting-capability-map-real-logos.mp4`
- `01-capability-map-real-logos.jpg`
- `02-advyzon-selected.jpg`
- `03-advyzon-evidence-tab.jpg`
- `04-tabular-evidence-toggle.jpg`

Reporting job-map parity evidence is in `/private/tmp/wealthscape-pr37-reporting-jobmap-parity-qa/`:

- `reporting-jobmap-parity-evidence.mp4`
- `01-reporting-jobmap-all-stages.png`
- `02-reporting-jobmap-prepare-selected.png`

Reporting job-map icon alignment evidence is in `/private/tmp/wealthscape-pr37-jobmap-icons-on-line/`:

- `wealthscape-pr37-jobmap-icons-on-line.mp4`
- `reporting-jobmap-icons-on-line.png`
- `marker-alignment.json`

Account-maintenance executive-findings evidence is in `/private/tmp/wealthscape-pr37-maintenance-findings-brief/`:

- `wealthscape-pr37-maintenance-findings-brief.mp4`
- `maintenance-findings-summary.png`
- `maintenance-outcomes-section-finding.png`
- `browser-check.json`

Actual human-QA walkthrough evidence is in `/private/tmp/wealthscape-pr37-humanqa-walkthrough/`:

- `wealthscape-pr37-actual-humanqa-walkthrough.mp4`

Competitor static-content cleanup evidence is in `/private/tmp/wealthscape-pr37-competitor-static-cleanup/`:

- `competitor-static-cleanup-evidence.mp4`
- `01-competitor-map-all-platforms-clean.png`

Competitor confidence-axis cleanup evidence is in `/private/tmp/wealthscape-pr37-competitor-confidence-axis/`:

- `competitor-confidence-axis-evidence.mp4`
- `01-competitor-confidence-axis.png`

Executive findings alignment evidence:

- `/private/tmp/wealthscape-pr37-findings-alignment.mp4`
- `/private/tmp/wealthscape-pr37-findings-alignment.png`

The competitor static-content cleanup, competitor confidence-axis cleanup and executive-findings alignment MP4s above are supporting still-frame captures only. They are not the human-QA walkthrough artifact.
