# Account maintenance command center

## Scope

This prototype makes account maintenance the default operating layer before reporting. It uses synthetic household labels and DEMO account identifiers only. There is no persistence, provider call, signature request, real document validation, or change to a financial account.

- RIA: household follow-through and reporting holds.
- Home office: owner-based service lanes and cross-office exceptions.
- OSJ principal: supervisory review docket and evidence coverage.
- Hybrid advisor: mixed-registration service work.

The shared session state feeds the lifecycle dashboard, work queue, evidence packet, status timeline, and reporting-readiness banner. All three evidence attestations must be checked before the demo reviewer can complete a change. Completed requests are read-only. Report Builder still uses its independent fixture data; its banner explicitly states that maintenance changes are not applied to the report.

The original reporting tour/scenario remains available through the existing controls and temporarily shows the original Morning Brief. The Build Case product-cycle tabs and cost model are unchanged. Mobile navigation prioritizes Lifecycle, Maintenance, Report, and Strategy; all other workspaces remain in the navigation drawer.

## Provenance

User-designated origin: Claude Desktop project **Wealthscape Market Research**, artifact **Account Maintenance Frames**, presentation **Wealthscape account maintenance executive**.

Inspected local exports (not copied into the repository):

| Export | SHA-256 |
| --- | --- |
| Account_Maintenance_Frames.html | `9c75845bbf32bbf697048a6f335f5770ac883f31223828fc8e318d50a3b9ec20` |
| Wealthscape_Account_Maintenance_Executive.pptx | `b4ccf518f58da27c41417d65a46bbc377a3d31e053d116620c36f9bc1e1c36a0` |

The source materials prioritize cross-cutting validation/exception handling, household scope, evidence currency, and acquisition servicing. The implementation uses those qualitative directions. The exports differ in their opportunity-quadrant wording, so no opportunity scores or quadrant totals were imported. The deck explicitly separates sourced, derived, and inferred findings and acknowledges adjacent-category proxies; these are not direct measurements of maintenance performance.

Research families retained in the strategy disclosure: Kitces 2025; T3/Inside Information 2026; FINRA 3110/4311; SEA Rule 17a-3(a)(17); J.D. Power 2026; Schwab, Altruist, and Axos competitor materials; Reddit/Apify forum methodology. This lane did not independently revalidate those external sources or present legal conclusions. Private source text, forum exports, and raw research files are excluded.

Production controls remain future work: classification, account entitlements, redaction, durable audit logs, document provenance, reviewer identity and separation of duties. Persona switching and deep links are demonstration navigation, not authorization controls.

## Review routes

Run from the scoped worktree:

```sh
npm --prefix wealthscape-intelligence ci
npm --prefix wealthscape-intelligence run dev -- --host 127.0.0.1 --port 5187
```

- Lifecycle: `http://127.0.0.1:5187/#view=morning&profileId=ria`
- Queue: `http://127.0.0.1:5187/#view=maintenance&profileId=ria`
- Evidence: `http://127.0.0.1:5187/#view=maintenance&profileId=ria&caseId=MC-101&panel=evidence`
- Strategy: `http://127.0.0.1:5187/#view=strategy&profileId=ria`

## Validation — September 9, 2026

Passed:

- `npm --prefix wealthscape-intelligence run build`
- `git diff --check`
- Integrated Codex Browser visual inspection at 1280px desktop, 1024px compact desktop, 768px tablet, and 390px mobile.
- All four personas selected: differing case scopes, counts, service-team routing, supervisory docket, and mixed-registration context verified.
- MC-101: completion disabled while evidence missing; check remaining items; complete; timeline contains the evidence actions and review; lifecycle and Report Builder readiness both update; completed evidence controls disabled.
- Owner routing: MC-102 moved from Fidelity service to Supervision with visible feedback and removal from the original owner-filtered queue.
- Search no-match state, clear-filter recovery, complete-status filter and counts.
- Household intake with empty account scope disabled; select one trust demo account and create an Authority update; resulting request retains exact scope and missing-evidence gate.
- Intake and evidence lifecycle shortcuts.
- All five strategy links: intake, authority, routing, evidence, timeline. Browser Back returns to strategy and restores persona.
- Mobile queue, evidence, strategy links, reporting banner, and navigation; tablet header crowding fixed and rechecked.
- Browser console error capture returned no errors during the final check.

`npm --prefix wealthscape-intelligence audit --json` reports two existing high-severity dependency entries, nanoid and postcss. No dependency or lockfile changes are included. Captain should track remediation separately.

Not validated: live providers, customer data, real entitlements, durable evidence, production deployment, and a complete replay of the older report-generation tour/scenario. No merge was performed. Review compatibility with open Build Case compliance/cost-model and theme PRs before integration.

## Captain handoff

1. Open Lifecycle and switch all four personas.
2. Open MC-101 from the RIA queue, select Authority & evidence, observe the blocked completion control, check the missing evidence, and confirm demo review.
3. Open Status timeline, then Lifecycle and Report Builder; verify readiness changes while the report itself remains a separate fixture.
4. Start household change, clear all account selections to see the guard, then create a request with chosen demo scope.
5. Open Strategy and try each maintenance tie-back.
6. Check mobile navigation and tablet header at the viewport sizes above; then review the older report tour/scenario and the other open PR integrations before merge.

Implementation complete; captain review and human QA remain. State resets on page reload.
