# Wealthscape Lifecycle Intelligence

## Official competitor logo labels — 10 September 2026

Use the seven official local logo assets as chart controls, preserving intrinsic aspect ratios and bounded hit targets. Tooltips and accessible button names retain each platform name; a failed image visibly falls back to the name without changing selection behavior. Hover, focus and selected states remain distinct. Three leader anchors moved to keep mobile points unobstructed; scores, tabs and evidence are unchanged.

Asset provenance and SHA-256 hashes are in `wealthscape-intelligence/public/competitor-brands/README.md`; runtime mappings are in `competitorBrandAssets.js`. No third-party logo requests occur at runtime. The actual Wealthscape mark, current BNY Pershing lockup and TradePMR by Robinhood lockup are explicit. SVGs contain static artwork only. Schwab clips only excess white canvas; other logos use uncropped containment. Full SEI source and small rendering were compared. Light-route and temporary dark-backing visual checks passed; this app has no separate dark-theme control, and the temporary QA page was removed.

Validation: all 11 focused tests (brand assets, competitor values/evidence, outcomes and guide), production build and `git diff --check` pass. Actual lane screenshots at 390/1280px showed all seven loaded logos, readable bounded marks, no logo-label overlap and no horizontal overflow. All seven logo selections work; Altruist's missing-file fallback displayed its accessible name and remained selectable, then the asset was restored. Captain completes final 805/1208px checks. No commit or publication from this lane.

## Compact competitor comparison preference — 10 September 2026

Keep the competitor graph visually balanced with its inspector. Use a 520 × 500 viewBox with shared chart geometry and uniform scaling, giving a 458px-high graph at the 1208px desktop viewport. Keep fixed 12px name annotations and aligned leader lines; do not stretch circles or add blank-height filler. Smaller widths stack the map and inspector.

Keep the platform dropdown, name, side-by-side scores, and historical-assessment caveat available across **Position**, **Evidence**, and **Assumptions** tabs. Default to Position and retain the active tab when changing platforms. Position holds the assessment basis and survey boundary; Evidence holds documented strengths/limits and vendor-reported feedback; Assumptions holds explicitly labeled appeal/friction hypotheses and the validation question. Tabs have linked panels, roving focus, Arrow Left/Right wrapping, and Home/End support. Place the selected platform and survey sources/date/type in one full-width strip below the comparison grid, two columns on desktop and stacked on mobile. The strip remains visible across tabs and is named for the selected platform. No duplicated source list, nested scroll area, or decorative card stack.

Validation: existing 10 focused tests, build, and `git diff --check` pass. Integrated Browser checks at 1208/805/390px verified the taller geometry, round points, zero name-label intersections, no horizontal overflow, compact score/tab rows, all seven name selections, Enter selection for all seven points, dropdown synchronization, default Position, retained tab while comparing platforms, single visible tab panel, Arrow Right and Home/End focus, and two persistent source links on each tab. Source content and numerical scores are unchanged. The layout-only diff remains uncommitted for captain publication and human QA.

## Named competitor map and evidence context — 10 September 2026

All seven competitor names remain visible beside their points, using fixed 12px HTML buttons and leader lines. Name buttons, keyboard-accessible points, and the dropdown share one selection. The Frames D2 identities and satisfaction/capability coordinates are unchanged. Desktop places the map beside the detail; 805px and 390px stack them.

Each selected platform separates the measured T3 satisfaction snapshot from the historical, unvalidated capability assessment and its basis. Current vendor strengths, documented limits/evidence gaps, and source date/type are distinct from **Assumption** statements about possible user appeal and friction. Each panel ends with a specific question to validate. These hypotheses do not explain the survey rating. Altruist's reported client confusion around separate transfer requests is explicitly vendor-reported feedback, not independent customer research. Fidelity's detailed Service Center documentation is counterevidence that requires revalidating the historical 2/5 assessment; no absence claim or score refresh is made.

| Platform | Public evidence and publication date | Scope retained |
| --- | --- | --- |
| All seven | [T3 / Inside Information 2026](https://t3technologyhub.com/wp-content/uploads/2026/03/2026-T3-Inside-Information-Software-Survey.pdf#page=84), printed pp. 81–82 | Broad custodial satisfaction; no maintenance-specific causal attribution. |
| Schwab | [Digital authority workflow](https://advisorservices.schwab.com/whats-new/account-management/digital-workflows), February 2026 | Firm authority across up to 20 accounts; not third-party POA. |
| Altruist | [April product release](https://altruist.com/news/april-2024/), 29 April 2024 | Post-opening beneficiary edits; dated signing prerequisites; vendor-reported transfer confusion. |
| TradePMR | [Account-opening enhancements](https://www.tradepmr.com/blog/tradepmr-enhances-new-account-opening-capabilities-to-support-advisor-growth), 7 October 2024 | CRM prefill, household envelopes, parallel signing; onboarding scope. |
| Wealthscape | [Fidelity Service Center help](https://www2.advisorchannel.com/wc/channel/jsp/sp3help/content/fwchlpCSServiceDashboard.htm), undated | Action queues, statuses, alerts, searches and history; entitlements apply. |
| SEI | [Dedicated RIA service](https://www.seic.com/financial-advisors/custodian-revolution/dedicated-ria-service), undated | Relationship manager/service liaison claims; no response-time measurement. |
| Pershing | [BNY NetX overview](https://www.bny.com/pershing/us/en/platforms/netx.html), undated | Advisor platform and investor account access; firm-specific feature availability needs validation. |
| Goldman | [Modern client experiences](https://www.goldmansachs.com/what-we-do/ficc-and-equities/custody-solutions/our-solutions/modern-client-experiences), undated | Supported onboarding, transfer/bank-link requests and status dashboard; not all existing-account maintenance. |

Vendor pages checked 10 September 2026. Raw decks and private exports remain outside the repository. The revised executive study's slides 15, 17 and 27 constrain interpretation of the earlier Frames map.

Validation: `node --test wealthscape-intelligence/src/maintenanceCompetitors.test.js wealthscape-intelligence/src/maintenanceOutcomeSolutions.test.js wealthscape-intelligence/src/maintenanceGuide.test.js` — 10 passing tests. `npm --prefix wealthscape-intelligence run build` and `git diff --check` pass. Integrated Browser visual checks at 1208/805/390px show readable labels, no label intersections or horizontal overflow. Name clicks, Enter on a chart point, and dropdown changes synchronize selection/detail; captain separately checked all seven names and source links. No live account/provider actions, authenticated vendor teardown, primary interviews, commit, merge, or production promotion. Changes remain uncommitted for captain publication and human QA.


## Unified outcomes and opportunities — 10 September 2026

Visual preference: quadrant labels are secondary annotations; outcome points lead. Use fixed 12px, regular-weight, muted-slate HTML annotations over the chart so text remains readable at every viewport without scaling the font. Annotations do not intercept point interactions; the SVG retains the accessible quadrant description.

Current artifact rule: Account maintenance has **eight** full-scroll research sections. **Outcomes & opportunities** replaces the separate Desired outcomes and Opportunity matrix sections and their redundant cross-jump. Market, capability, customer, unified outcomes, job map, findings, recommendations, and resolution remain in research-first order. All three diagrams and the scenario/tour footer remain available.

One controlled selection now drives the dropdown and clickable, keyboard-accessible chart. Each of the 15 stable outcome IDs has a plain-language problem description, proposed UX response, implemented or adjacent demo coverage, and a profile-safe destination. All outcomes resets every point to equal emphasis and removes the selected solution/link. The unchanged outcome registry remains exported for MaintenanceGuide. At stacked widths the chart/legend are followed by the selector/detail; desktop retains the chart beside the detail. The redundant outcome list is removed. The chart uses a 520 × 440 viewBox with a taller plotting area, uniform scaling for circular points, and quadrant overlays derived from the same geometry.

Latest layout verification: 1208/805/390px visual checks passed with desktop split and stacked smaller layouts, circular points, fixed 12px quadrant labels, no horizontal overflow, 15 dropdown choices plus All outcomes, chart click/Enter selection, dropdown/reset, and the signature workflow destination. The focused 8 tests, build, and diff check passed. Changes remain uncommitted for captain QA and publication.

Source versions remain separate: Selected detail opportunity scores retain the revised executive study's slide 18 values; the chart and selected importance/satisfaction fields retain Frames coordinates. No scores are recomputed. The source Frames code (chart `s1`, lines 142–145) divides both 1–5 axes at **3**. High importance/low satisfaction is Opportunity / underserved; high/high is Table stakes; low/high is Overserved; low/low is Ignore. Its prose claims all 15 are underserved, but outcomes 12 (satisfaction 3.5) and 15 (3.12) fall in Table stakes at that divider. The UI follows the actual coordinates and explicitly notes the inconsistency. Raw source artifacts stay outside the repository.

Routing covers intake, account scope, missing evidence/signatures, blocked queue/ownership, status dashboard, review timeline, and reporting prerequisites. Stale-data detection, legal POA recognition, bulk migration, signature capture, and live bank instructions are labeled as unimplemented capabilities with adjacent demo patterns. The destination helper receives `visibleCases` only. If a matching fixture is absent, it explains the fallback and opens scoped readiness or intake without selecting an inaccessible case.

Validation: `node --test wealthscape-intelligence/src/maintenanceOutcomeSolutions.test.js wealthscape-intelligence/src/maintenanceGuide.test.js` (8 passing tests), `npm --prefix wealthscape-intelligence run build`, and `git diff --check`. Tests cover all 15 descriptions/scores, four-profile route scope, empty-scope fallback, selection/reset normalization, source quadrant boundaries/orientation, and guide guards. Browser QA verified shared chart/dropdown selection, All outcomes reset, eight navigation choices, three diagrams, desktop/stacked layout, and all 15 Hybrid links. Captain separately verified all 15 Home Office destinations, 390/805/1280 visuals, section Previous/Next, and scenario/tour launch/exit. No live-data/provider test, commit, merge, or production promotion in this revision; captain publication and human QA remain.

## Maintenance research guides — 10 September 2026

The Account maintenance Strategy footer now offers **Run Scenario** and **Take Tour**, alongside the existing reporting-track experience. Maintenance guides preserve the global profile. They use a separate `MC-GUIDE` Baobab fixture and separate report state; ordinary session cases and reports are never reset or overwritten. The temporary fixture is scoped with `createdFor` for each of the four profiles.

The eight-step scenario follows command center → blocked queue → account scope → three evidence attestations → human confirmation → timeline → report generation → generated output. Next and operational navigation share the same gates. A timeline/report shortcut cannot skip incomplete evidence or human review; the final step requires an actual generated guide report. Previous preserves guide work. Restart replaces only guide state with a fresh blocked case, three unchecked attestations, and no output. Exit/completion returns to Account maintenance Strategy and discards guide state. Changing profile exits to Strategy in the new scope. Unrelated navigation exits; browser history never resurrects an orphan guide case.

The seven-step tour uses the same implemented surfaces but keeps case controls read-only. It ends at a blocked reporting prerequisite; it does not describe the request as completed. The global reporting Scenario/Tour remain their existing reporting demonstrations.

Every stop shows target outcome IDs, a primary outcome label from the existing outcome registry, a research insight, and the UX rationale. Extended production boundaries and source attribution are expandable. All research remains directional and tied to the August 18 executive-study snapshot. No raw/private content, legal recognition, eSignature validation, provider call, or external send is introduced.

The guide docks beside the workspace at desktop and above it at narrow widths, reserving space rather than covering operational actions. Its explanation area scrolls independently; Previous/Next/Restart remain available. Target outlines attach after the routed surface mounts, including evidence/review/timeline subpanels. The guide owns target scrolling while active.

Validation and reproduction: see [maintenance guide QA](qa/maintenance-guide/README.md). Work remains local on `codex/strategy-research-tabs` for captain review/publication to draft PR #34; no merge or production promotion.

## Strategy hierarchy and leadership walkthrough — 10 September 2026

Artifact-specific rule: **Lifecycle Intelligence** is the umbrella product. **Account maintenance** and **Reporting modernization** are peer Strategy research tracks. Account maintenance is the default. Keep the global shell profile selector as the only profile control. Keep operational dashboards functionality-driven; put strategic findings, provenance, prioritization, and sourcing questions in Strategy.

Maintenance research should have leadership parity with reporting research. Render all eight sections by default in research-first order: market research, capability comparison, customer research, outcomes & opportunities, job map, findings/takeaways, recommendations, and resolution strategy. Use a full scrollable page with a compact sticky jump selector and Previous/Next anchors; do not paginate or hide the research sections. Use meaningful icons and restrained evidence accents. Preserve selected outcome shading, All outcomes reset, platform selection, and journey context.

The `MaintenanceResearch` component renders all eight sections and three diagrams together. Anchors scroll to the section below the sticky navigation; the selected item follows scrolling in the actual shell scroll container. Each recommendation maps outcome IDs to a UX decision, implemented synthetic behavior, a persona-scoped destination, and a proposed production owner, dependency, and validation gate. When a matching fixture is outside the current profile, the link opens that profile's readiness view with an explanation instead of selecting an inaccessible case. Resolution adds discovery actions, sourcing decision criteria, and proposed baseline/research/pilot milestones. These remain proposals, not a completed internal assessment. The existing route contract uses zero-based stage strings: `2` is Exception routing, `3` is Human review.

### Source mapping for this revision

All three raw artifacts were inspected read-only under `/Users/vambahsillah/Downloads/`; none is copied into the repository or bundle. Hashes match the provenance table below.

| Artifact | Inspected evidence | Product use |
| --- | --- | --- |
| `Account_Maintenance_Frames.html` | D1 outcome coordinates/provenance and D2 competitor snapshot; chart descriptions | Preserve existing Frames charts and selection behavior. Do not replace their values with executive-study values. |
| `Wealthscape_Account_Maintenance_Executive_4.pptx` | Slides 2–30, with particular attention to 12–18 findings, 19–23 ranking/sequence, 24–25 argument/risks, and 27–30 limitations/register | Takeaways, market synthesis, customer methodology, separate revised outcome ranking, dependency sequence, ninety-day baseline gate, proposed sourcing workshop. |
| `Wealthscape_Account_Maintenance_Executive.pptx` | Opening executive summary, scope, and market findings | Version comparison only. Later corrections take precedence; original rounded scores and broad regulatory claims are not promoted. |

Research origin remains Claude Desktop project **Wealthscape Market Research**. The UI names the executive study and date instead of repeating a raw export filename. No Claude chat, forum identity, private source text, or deck is shipped.

Public source links verified during this revision: [Kitces 2025](https://www.kitces.com/kitces-report-independent-financial-advisor-technology-fintech-software-tools-research-2025/), [T3 2026 survey](https://t3technologyhub.com/wp-content/uploads/2026/03/2026-T3-Inside-Information-Software-Survey.pdf), [Schwab digital workflows](https://advisorservices.schwab.com/whats-new/account-management/digital-workflows), [Altruist April 2024](https://altruist.com/news/april-2024/), and [FINRA 3110](https://www.finra.org/rules-guidance/rulebooks/finra-rules/3110). Vendor descriptions are attributed and scoped; Altruist's April release explicitly describes post-opening beneficiary designation edits. Schwab firm LPOA-IA is not treated as third-party POA. The unlinked DeVoe numeric claim was omitted from the shipped walkthrough.

### Evidence and decision boundaries

- The Frames and revised executive-study scores are separate snapshots. The new desired-outcome list uses slide 18 scores; the existing matrix uses Frames coordinates. Neither is a direct maintenance survey.
- The job map is derived and the journey is assessed. Primary CSA interviews, needs-based segmentation, internal maturity mapping, and Build/Partner/Acquire evaluation remain incomplete.
- Resolution options are explicitly proposed workshop questions. There is no completed sourcing assessment, approved vendor choice, or acquisition case.
- The case is parity/position and an operating hypothesis, not proven churn reduction or productivity ROI. Missing volume, cost, maintenance NIGO, rework, and CSA time constrain sizing.
- Dependency sequences validation before household authority despite the latter's higher score. The ninety-day measurement gate can resize the program.
- Missing public vendor documentation is not proof of missing capability. Regulatory scope must be confirmed for each workflow; proposals do not fund the roadmap.

Local review route: `http://127.0.0.1:5195/#view=strategy&profileId=bd-hybrid-advisor`. The existing server was reused and not stopped.

### Validation for the full-scroll revision

Historical checks below preceded the eight-section consolidation; current consolidation validation is recorded above. The combined section retains one Kitces/T3 source footer and the revised study's methodology formula, explicitly separate from Frames coordinates.

- Captain follow-up reproduced a sticky-control focus-scroll race: Previous from Resolution could skip Recommendations. Anchor jumps now complete immediately and preserve navigation intent during control interaction; wheel, touch, content/scrollbar pointer input, and page-scroll keys resume scroll tracking. Retested Resolution → Previous → Recommendations → Next → Resolution at 1280/768/390, rapid sequential selections, and mobile manual-scroll recovery into Opportunity matrix. All nine sections remain rendered.
- `npm --prefix wealthscape-intelligence run build` and `git diff --check` passed.
- Integrated Codex Browser: full page renders nine sections and three diagrams. Inspected desktop recommendations at 1280, tablet capability comparison at 768, and mobile job map/journey and resolution at 390 pixels; document width equaled viewport width. Sticky section navigation remained below the shell and tracked manual scrolling through the actual content container.
- Exercised section jumps, Next, platform selection, inferred outcome emphasis, and All outcomes reset. Prior revision also verified Previous/Next boundaries, sourced/derived outcomes, internal jumps, and research-track selection persistence; these controls are retained.
- All four recommendation links were clicked under Hybrid Advisor: validation and household authority opened MC-101 evidence, enterprise opened MC-104 overview, and compliance opened scoped readiness because no matching fixture was visible. Lifecycle and report bridge links retained the profile; reporting selected MC-101 and held generation with an actionable prerequisite.
- Both synthetic queue links preserved `bd-hybrid-advisor`: Blocked returned 2 of 3 requests at Exception routing; Ready for review returned 1 of 3 at Human review.
- Publisher-link click handlers and hrefs were exercised; primary publisher pages were inspected separately. External new-tab behavior is controlled by the browser host. No browser console errors observed.
- Current local visual evidence: `/tmp/wealthscape-strategy-qa/desktop-fullscroll-recommendations.png` and `/tmp/wealthscape-strategy-qa/mobile-fullscroll-journey.png`. Earlier paginated screenshots are superseded. No raw source artifact was copied into the bundle.
- No live customer-data smoke, provider calls, merge, or deployment. Captain review and human QA remain. Research limitations above remain product-decision gates, not implementation failures.

## Continuous account lifecycle

The default product story is account change intake -> authority/signature evidence -> exception routing -> human review -> trusted account context -> reporting output. The shell, browser title, Strategy, and Build Case use Lifecycle Intelligence as the product hierarchy.

- Lifecycle keeps persona-specific queues and counts operational. The six-stage journey shows where work goes next.
- Account Maintenance captures synthetic household scope, routes owners, records checklist attestations, and requires a demo reviewer to confirm completion.
- Reporting outputs selects maintenance cases as report context. Empty scope or any incomplete selected case holds generation and the portfolio studio. Resolve prerequisite links take the user to the corresponding evidence packet.
- Continue to report carries the completed case into the report selection. Generation copies household, change, selected account IDs, evidence reference, owner, and review history into a session-only account change report. The report ID is written back to the maintenance timeline.
- Download evidence JSON exports the generated synthetic snapshot. Reports remain available in the current session when navigating away and back. Reload resets the demo.
- The existing portfolio Report Builder remains intact behind the same maintenance prerequisite gate. Its market charts still use independent illustrative data; they are explicitly distinguished from the maintenance-driven account change report. Existing tour/scenario mode retains the original reporting demonstration.

The four personas retain separate case scopes: RIA household follow-through, home-office owner lanes, OSJ supervisory docket, and hybrid registration context. These are demonstration views, not entitlement controls.

## Strategy and investment logic

Strategy now leads with account lifecycle orchestration and includes:

- Five operational deep links.
- A 15-outcome importance/satisfaction map with Sourced, Derived, and Inferred labels retained from the Frames artifact, plus a selectable outcome detail.
- Competitive positioning with survey satisfaction separated from assessed public maintenance capability. Platform details are selectable; missing documentation is not presented as proof of missing functionality.
- An illustrative journey curve with authority/signature and service-wait troughs, plus a client/operations/home-office swimlane.
- Existing reporting/persona research preserved under an expandable detail section.

Build Case leads with maintenance investment logic, before the existing prototype delivery economics:

- Five weighted dimensions and four initiative scorecards from the executive deck.
- Explicit distinction between ranking and dependency sequence: household authority scores 4.25, but validation/exceptions at 3.75 must precede the multi-account extension.
- NOW/NEXT/LATER planning gates over an assessed 24-month horizon, including a month-three volume/rework measurement gate.
- Editable assumptions for change volume, percentage-point rework reduction, minutes per rework, and hourly cost. Output is illustrative capacity value, not cash savings or ROI. Delivery and ongoing operating cost categories remain visible.

No direct maintenance survey category and no internal maintenance volume/cost baseline are available. Those caveats remain adjacent to claims and in the scaling disclosure. No legal applicability determination is made by the prototype.

## Provenance

User-designated origin: Claude Desktop project Wealthscape Market Research; Account Maintenance Frames; Wealthscape account maintenance executive. Inspected local exports remain outside the repository:

| Export | SHA-256 | Use |
| --- | --- | --- |
| Account_Maintenance_Frames.html | `9c75845bbf32bbf697048a6f335f5770ac883f31223828fc8e318d50a3b9ec20` | 15-outcome and competitor snapshot |
| Wealthscape_Account_Maintenance_Executive.pptx | `b4ccf518f58da27c41417d65a46bbc377a3d31e053d116620c36f9bc1e1c36a0` | Original qualitative direction |
| Wealthscape_Account_Maintenance_Executive_4.pptx | `163fc515281cb9de6db90d950ec58bf86b880f384f110ed0bb75cc99ee44b4b0` | Slides 6/10 journey; 19/20 scorecard; 23 phases; 25/30 assumptions |

The Frames and later deck differ on some numeric scores. The app labels the map as the Frames snapshot rather than combining versions silently. Chart values are reproduced as source-reported proxies, not independently verified current findings.

Research families retained: Kitces 2025; T3/Inside Information 2026; FINRA 3110/4311; SEA Rule 17a-3(a)(17); J.D. Power 2026; Schwab, Altruist, and Axos materials; Reddit/Apify methodology. Regulatory proposals are excluded from enacted-rule framing. Raw private source text, identities, forum exports, and original decks are not shipped.

## Boundaries

All maintenance/report data is synthetic and session-only. Checkboxes simulate attestations; they do not verify documents or signatures. No provider submission, financial-account mutation, or real customer-data processing occurs. Production requires classification, account entitlements, redaction, durable audit trails, provenance, reviewer identity, and human review gates.

## Run and review

```sh
npm --prefix wealthscape-intelligence ci
npm --prefix wealthscape-intelligence run dev -- --host 127.0.0.1 --port 5187
```

Start: `http://127.0.0.1:5187/#view=morning&profileId=ria`

1. Switch all four personas on Lifecycle; inspect operating queues and the shared journey.
2. Open Reporting outputs. MC-101 is selected and generation is held.
3. Choose Resolve prerequisite for Cedar. Check the missing signature and change-evidence attestations; confirm demo review.
4. Choose Continue to report, then Generate account report. Verify MC-101, DEMO-01/02, owner, and review history in the report.
5. Download evidence JSON. Return to maintenance and inspect the generation event and report link in Status timeline.
6. Select an additional blocked case to verify the generation hold. Clear all selections to verify the empty-scope guard.
7. Explore Strategy's outcome selector, competitor selector, journey view, and legacy research disclosure.
8. Open Build Case; compare priority with phase order and change Value assumptions. Zero volume must yield zero modeled capacity.

## Validation - September 9, 2026 revision

- `npm --prefix wealthscape-intelligence run build` passed.
- `git diff --check` passed.
- Integrated Codex Browser visual inspection of Lifecycle, Account Maintenance, Reporting outputs, Strategy, and Build Case at desktop 1280px, tablet 768px, and mobile 390px. Mobile chart labels and journey density refined after inspection.
- Persona switching, blocked -> evidence -> reviewer confirmation -> generated report -> maintenance timeline flow passed.
- Mixed/empty report selections held generation; portfolio studio enforced the same prerequisite gate.
- Generated LR-001 JSON inspected with Python assertions: MC-101 Complete, two scoped accounts, all evidence checks true, human review event present.
- Opportunity and competitor selectors, research tabs, and investment tabs exercised. Value assumptions: 2,000 changes x 10 percentage points x 20 minutes / 60 = 66.7 modeled hours and $3,667 at $55/hour. Zero-volume case yielded zero.
- No browser console errors in final capture.
- Earlier queue routing, intake scope guard, search/filter recovery, and strategy deep-link QA remain documented in PR history; handlers preserved.

Existing nanoid/postcss dependency audit findings remain outside this scoped change; no dependencies changed. No live provider/customer-data test or production deployment was performed. A full replay of the old reporting tour/scenario and integration with the other open economics/theme lanes remains a captain check.

Implementation revision complete; captain review and human QA remain. Do not merge this implementation lane automatically.

## KPI and lifecycle interaction polish

- Lifecycle KPI cards open persona-scoped Open, Blocked, Ready for review, and Complete queues. Queue context shows the selected status and matching count, with Clear filters recovery including empty results.
- Lifecycle stages and KPIs provide hover and keyboard-focus feedback, with reduced-motion support. Stage destinations retain an explicit opened-stage indicator through reload.
- Validation: production build and `git diff --check` passed. Integrated Browser checks at 1280px and 390px covered all four KPI destinations, filter recovery, RIA and home-office scope counts, persisted Human review context, and Report output context. Mobile page width matched its 390px viewport; no browser console errors observed. Hover and keyboard-focus appearance were visually inspected.
- This refinement remains ready for captain review; no merge, production deployment, or live customer-data test was performed.

## Interactive operating flow refinement

- Added Lucide symbols to the six lifecycle stages while preserving readable labels and destination context.
- Added a connected three-handoff flow on the command center. Counts and proportional bars derive from the current persona's requests; hover and keyboard focus reveal next actions and current owners. Clicking opens the corresponding Blocked, Ready for review, or Complete queue. This is a current-state distribution, not a throughput or historical conversion metric.
- Production build and `git diff --check` passed. Integrated Browser visual QA at 1280px, 768px, and 390px found no visible horizontal overflow. Verified all three flow destinations, empty-review recovery, mobile blocker navigation, existing Open changes KPI drilldown, hover insight changes, keyboard focus, and readable stage icons. No browser console errors observed.
- No live workflow/customer-data smoke or deployment was performed. Captain review and human QA remain; this lane must not merge.

## Outcome-map selection contrast

Selected outcomes render above the other points with an outer ring, full-opacity category styling, and a stronger number label. Other bubbles use lighter fills and borders with dark number labels. Sourced/derived colors and inferred dashed outlines remain. The existing dropdown controls selection; points remain a non-interactive chart. A text status identifies the highlighted outcome.

Validation: production build and `git diff --check` passed. Integrated Browser QA at 1280px and 390px verified dropdown selection changes across derived (5), inferred (3), and sourced (12) outcomes, matching chart emphasis and detail text, and no visible horizontal overflow or console errors. No live customer-data smoke or deployment. Captain review and human QA remain.

## All-outcomes reset

The outcome selector now defaults to All outcomes and can return there after any selection. All bubbles use full evidence-category styling without a selection ring; the status and detail panel show a neutral comparison summary. Selecting a specific outcome restores selected-versus-muted styling. Source caveats remain visible.

Validation: production build and `git diff --check` passed. Integrated Browser QA at 1280px and 390px covered All outcomes, derived outcome 5, inferred outcome 3, sourced outcome 12, and clearing back to All outcomes. No visible horizontal overflow or console errors observed. No deployment or live customer-data smoke; captain review and human QA remain.


## Contextual maintenance tour — September 10, 2026

The seven-stop read-only maintenance tour now uses a floating dialog and a measured spotlight instead of the scenario sidebar. Each stop separates a proposed desired result with stable outcome IDs, a source-qualified current gap, and the proposed UI solution. Proposed desired results describe the intended experience, not completed or validated research outcomes. Source and production boundaries are expandable. Previous, Next, Restart, Exit, and final Finish remain available in a fixed dialog footer; long copy scrolls within the dialog. The existing eight-step interactive scenario retains its original gates and layout.

Targets are intentionally narrow: blocked KPI, Baobab queue row, account scope, evidence packet, disabled human review gate, captured history, and report-generation hold. DOM mounting, resize, and scroll trigger fresh measurement. Step changes discard the prior spotlight; unavailable targets show a retry explanation and disable advancement. The floating panel reserves an upper target band and becomes a bottom sheet at narrow widths. Motion respects reduced-motion preferences.

The background is inert during the tour. Initial focus enters the dialog, Tab is contained, Escape exits, and focus returns to the launch control when available. Exit and Restart discard only the isolated guide fixture. Tour checks remain false, the request remains Blocked, and the tour generates no reports.

Validation in this implementation lane:
- Production build passed: `npm --prefix wealthscape-intelligence run build`.
- All 14 tests passed: `node --test wealthscape-intelligence/src/competitorBrandAssets.test.js wealthscape-intelligence/src/maintenanceCompetitors.test.js wealthscape-intelligence/src/maintenanceOutcomeSolutions.test.js wealthscape-intelligence/src/maintenanceGuide.test.js wealthscape-intelligence/src/maintenanceTourGeometry.test.js`. This includes the existing 11 tests and new viewport geometry, absent-target, and seven-stop contract coverage.
- Integrated Browser inspection at 1280 × 720 confirmed the first two stops spotlight the actual blocked KPI and Baobab row with dimming and no dialog overlap. The background inert attribute was observed.
- Captain is checking all seven stops at 1208, 805, and 390 widths, source expansion, keyboard/focus behavior, and scenario/reporting regressions; those checks are pending in this lane's record. No MP4 has been produced in this lane.

Changes remain uncommitted for captain review. No merge, deployment, live provider workflow, or customer-data smoke was performed.

Captain subsequently reported all seven tour stops passing at desktop, 805px, and 390px widths; the second 805px target settled after a transient measurement. Captain also reported focus wrapping, Escape and focus restoration, and the eight-step scenario evidence, review, and report gates passing. Reporting regression and review media remain outside this lane's confirmed evidence.


## Maintenance Strategy visual parity refinement

Adapted Reporting Strategy's existing icon tiles, accented reference cards, colored role regions, numeric bars, and numbered recommendations. Maintenance source text and caveats remain intact. Capability cards separate documented vendor references, questions requiring Wealthscape validation, and strategic implications; no competitive rating or new feature absence claim was added. Role panels contain the existing role labels and research limitations, without fictional biography.

Outcomes now offer mutually exclusive Opportunity map and Ranked outcomes presentations with shared selection and inspector. The ranked view retains all 15 published executive-study scores and IDs on one explicitly labeled 0–10 scale. It does not recompute Frames coordinates. All outcomes reset clears either presentation. At stacked widths the inspector appears before the ranking. The existing journey retains every role/stage entry under three numbered non-interactive phase headings. Recommendations retain their profile-scoped routes and gain numbered headings and stronger action treatment.

Validation: existing 14 tests plus one ranked-score/ID/source-order contract test passed (15 total), production build passed, and git diff --check passed. Integrated Browser visual checks covered 1280 × 720 (market widgets, capability cards, ranking), 805 × 900 (persona regions, stacked inspector, journey), and 390 × 844 (rank bars, personas, journey, recommendation action). Verified rank selection survives switching to map, reset clears the inspector and removes the alternative list from the map view, and the validation recommendation opens the scoped case. Browser was restored to 1280 × 720.

Exact local QA entry: `http://127.0.0.1:5195/#view=strategy&profileId=bd-hybrid-advisor`. Use Jump to section for Market research, Capability comparison, Customer research, Outcomes & opportunities, Job map, and Recommendations. Verified recommendation destination: `http://127.0.0.1:5195/#view=maintenance&profileId=bd-hybrid-advisor&caseId=MC-101&panel=evidence&maintenanceView=queue`.

No reporting redesign, tour/scenario logic change, production deployment, or live customer-data smoke. Changes remain uncommitted for captain review; review media capture and full captain regression remain next.
