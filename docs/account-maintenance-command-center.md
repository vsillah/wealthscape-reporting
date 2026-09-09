# Wealthscape Lifecycle Intelligence

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
