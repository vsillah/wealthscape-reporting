# Report templates and entry-point sweep

## Scope

Four synthetic Chen household reports share one inspect-only comparison dialog:
Quarterly Review, Annual Report, Ad-Hoc Update and Client Proposal. Each has a
standard three-section view and an expanded eight-section review copy. Template
selection is retained in `reportTemplate` alongside `reportTab` and `profileId`.

## Report content

| Template | Distinct contents |
| --- | --- |
| Quarterly Review | Through-June YTD performance, allocation drift, stale ETF price, review before release |
| Annual Report | FY 2024 returns, year-end balances, retirement/college goals, annual beneficiary review, estimated alternatives valuation |
| Ad-Hoc Update | June month-to-date event context, cash coverage and unconfirmed withdrawal timing |
| Client Proposal | Proposed $2.5M account, allocation from cash, 0.85% fee illustration, suitability/eligibility questions; no return forecast |

All contents are synthetic. Generating completes a local timed sequence, not a
custodian sync, validation service, compliance decision or delivery operation.
The delivery composer is labeled as a simulation and does not send messages.

## Entry points

| Surface / action | Result |
| --- | --- |
| Reports / template card | Selects report template and updates URL context |
| Reports / Build / Review | Opens selected template comparison |
| Reports / Generate Report / Generate report | Opens the selected generation step; no delivery occurs |
| Reports / Generate / Preview | Opens selected template comparison after generation |
| Reports / Generate / Review delivery | Opens the selected template's simulated delivery package |
| Delivery package / Preview attachment | Opens the same selected report; closing returns to the package |
| Reports / Customize / Preview standard report | Opens the standard quarterly comparison; in-editor styling remains a separate local preview |
| Other templates / Customize / Preview report | Opens selected comparison; explicit text explains that section editing is available only for Quarterly Review |
| Client Portal / View Q2 Report | Opens quarterly comparison from Overview or Messages |
| Client Portal / Documents / View | Opens quarterly, annual, ad-hoc or proposal comparison matching the row |
| Client Portal / Q1 message / Open documents | Opens document list; missing archive is explicitly identified |
| RIA Morning Brief / Report | Opens Reporting outputs with profile and quarterly context |
| Alert actions promising reports / portal | Preserve active profile and update the URL to the target screen |
| Strategy / Open Reporting outputs, Build report, Customize report, Generate report | Existing deliberate report-tab destinations retained; tabs now reach the shared report experience |
| Strategy / related pilot and research links | Existing dashboard, maintenance, integration or portal context retained where that is what the label promises |
| Account Maintenance / Continue to report, View account report | Existing case-specific account-change report preserved with prerequisite gating |
| Account-change report / Download evidence JSON | Existing functional synthetic evidence download preserved |

## Explicitly unavailable / deferred

- PDF export is disabled with a visible `PDF export unavailable` label. Review
  opens an inspectable report, without pretending that an HTML preview is a PDF.
- Q1 archived report, Investment Policy Statement and Account Opening Documents
  have disabled actions and visible missing-file explanations; they never open
  an unrelated Q2 report.
- Reports use one synthetic household per template. Multi-household generation,
  persistence and real account data are outside this slice.
- Custom styling/sections in the quarterly editor do not alter the standardized
  comparison copy. Save-as-template persistence remains outside this slice.
- Scheduling, messaging, integrations, unrelated generic client View buttons
  and production release enforcement are outside the narrowed template request.

## Validation

- `npm --prefix wealthscape-intelligence run build`
- `node --test wealthscape-intelligence/src/*.test.js`
- `git diff --check`
- Focused model tests cover distinct template purposes, allocation totals,
  chart/metric agreement, proposal fee arithmetic, pipeline/report consistency,
  missing-file handling, and URL round trips for all four templates and three
  requested profiles across Build/Generate/Customize.
- Browser checks passed at 1280, 768 and 390px: all four templates selected in
  Build, generated, opened, switched between current/pipeline and closed safely.
  Annual planning, ad-hoc cash context and proposal fees/allocation were visually
  inspected. No report-modal horizontal overflow.
- Shared controls exercised: Build Review, Generate Preview, delivery attachment,
  four available portal document types, portal Overview and Messages Q2 links,
  Q1 Open documents, quarterly/other-template Customize previews, Strategy Open
  Reporting outputs / Generate report / Inspect report customization.
- URL/profile checks covered home office, hybrid advisor and RIA. Tablet annual
  and mobile proposal/quarterly report layouts were visually inspected.
- Source inspection covered RIA Morning Brief Report and case-specific account
  maintenance links. Their unrelated full scenario/prerequisite workflows were
  not rerun in this bounded template follow-up.

## Client Portal growth-axis follow-up

- Replace the zero-based area chart with a line chart spanning $3.8M–$4.4M,
  with $0.2M ticks and an explicit axis-range label. The range leaves padding
  around the $3.95M–$4.28M observations; the line avoids a filled-area implication
  when zero is outside the displayed range. Tooltips show whole-dollar values.
- Align the synthetic January and June endpoints to $3,950,400 and $4,284,500
  so the chart agrees with the displayed +$334,100 change and portfolio total.
- Integrated-browser visual review passed at 1280, 768 and 390px. All six months
  and four million-dollar ticks are visible; the March dip and subsequent rise
  are clear. Mobile document width equals viewport width (390px).
- Opened Client Portal Performance: percentage bars retain their appropriate
  zero baseline. Source inspection also covered book-level AUA and report/customize
  performance charts; these distinct metrics and the inactive proposal projection
  branch remain unchanged. Report templates, profile routing and preview flows
  are unchanged and were not exhaustively replayed for this axis-only follow-up.
- Build, all 37 tests and diff whitespace checks passed. No domain helper exists
  for this fixed synthetic series; visual QA covers the display change without
  adding a test that duplicates inline configuration. No live data or MP4.
