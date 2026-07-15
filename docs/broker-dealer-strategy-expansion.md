# Broker-Dealer Strategy Expansion Research Packet

This packet extends the Wealthscape Reporting 2.0 ODI strategy from an independent RIA advisor lens into three broker-dealer operating profiles. It is intended to feed the profile registry and Strategy tab data without changing the React app in this lane.

## Source Anchors

- Live prototype: `https://wealthscape-reporting.vercel.app`
- App source: `wealthscape-intelligence/src/WealthscapePrototype.jsx`
- Original reporting build trail: PR #1 and PR #6, Claude session `session_011feHy7wcr9TsiiXT2JNYEd`
- Discovery toolkit trail: PR #9, Claude session `session_015C2a22nbet8gC6JzSJtJp2`
- Methodology: `.claude/skills/value-stack-discovery/`

## External Research Signals

1. **Broker-dealer scale and consolidation**
   - Signal: FINRA-registered broker-dealers declined to 3,249 in 2024 while gross broker-dealer revenues rose to $641.0B and pre-tax net income rose to $75.8B.
   - Source: SIFMA 2025 Capital Markets Fact Book and SIFMA Fact Book summary.
   - Product implication: broker-dealer platforms are serving fewer, larger, more complex firms; scalable supervisory and advisor-productivity tooling matters more than point features.

2. **Regulatory pressure is broader than reporting**
   - Signal: FINRA's 2026 Annual Regulatory Oversight Report highlights GenAI, cybersecurity and cyber-enabled fraud, senior investors, communications/sales practices, market integrity, and third-party risk.
   - Source: FINRA 2026 Annual Regulatory Oversight Report.
   - Product implication: broker-dealer workflows need supervision, records, and risk context embedded into daily work, not bolted onto a separate compliance console.

3. **GenAI creates productivity upside and supervision burden**
   - Signal: FINRA says existing rules are technology-neutral and apply to GenAI usage; member firms must supervise, govern, and mitigate risk at user and enterprise levels.
   - Source: FINRA 2026 GenAI topic page and Fidelity Institutional AI research.
   - Product implication: broker-dealer AI should have visible policy status, approved-use boundaries, and review queues, while still helping advisors and principals work faster.

4. **Communications retention remains a live operating issue**
   - Signal: SIFMA requested modernization of communications and records-retention rules for broker-dealers, investment advisers, and security-based swap dealers.
   - Source: SIFMA October 2025 communications retention comment letter.
   - Product implication: off-channel communications, public communications, and client-ready report narratives should be tied to retention and review evidence.

5. **Advisor mobility raises platform-retention stakes**
   - Signal: hybrid RIA and independent RIA channels have grown quickly, and broker-dealer advisor movement is often driven by technology flexibility, support model, custody choice, and independence.
   - Source: Cerulli independent-affiliation press coverage, Schwab RIA benchmarking, and industry advisor-movement reporting.
   - Product implication: broker-dealer home offices need adoption and friction telemetry that shows where advisors are at risk of leaving or bypassing the platform.

6. **Wealth management expectations are expanding**
   - Signal: Fidelity's 2026 wealth-management trends emphasize AI, new asset classes, cybersecurity, M&A, and how wealthy investors measure success.
   - Source: Fidelity Institutional Wealth Management Trends for 2026.
   - Product implication: broker-dealer reporting should handle multi-product, multi-affiliation, and supervision-aware workflows rather than only advisor-branded report generation.

## Profile 1: Broker-Dealer Home Office

- **Persona:** Maya Okonkwo, Head of Advisor Platform Strategy at a national independent broker-dealer.
- **Firm profile:** 8,000 affiliated reps, multi-custodial clearing, mixed brokerage/advisory revenue, centralized supervision and product governance.
- **Core job:** Help advisors serve clients and grow while keeping the firm inside supervisory, records, product, and platform-risk boundaries.
- **Primary pains:**
  - Risk signals live in separate supervision, trading, communications, and advisor-platform systems.
  - Home office learns about advisor friction after support tickets, complaints, or attrition risk is already visible.
  - AI adoption is happening faster than policy, review, and retention workflows can keep up.
  - Platform investments are hard to prioritize because adoption, risk, and revenue impact are not in one view.

### Home Office ODI Outcomes

| ID | Importance | Satisfaction | Outcome |
| --- | ---: | ---: | --- |
| BD-HO #1 | 9.4 | 2.3 | Minimize the time to identify the highest-risk advisor, branch, product, or communications issue requiring home-office action. |
| BD-HO #2 | 9.2 | 2.6 | Increase confidence that advisor-facing AI activity is approved, supervised, retained, and explainable. |
| BD-HO #3 | 9.1 | 2.8 | Minimize the number of systems required to connect platform adoption, supervision load, advisor productivity, and revenue impact. |
| BD-HO #4 | 8.9 | 3.0 | Minimize the delay between a field friction signal and a product, training, or supervision intervention. |
| BD-HO #5 | 8.8 | 3.1 | Increase the likelihood that advisor-retention risk is detected before a recruiting event or custodian shift. |
| BD-HO #6 | 8.6 | 3.2 | Minimize the effort required to prove that a supervisory action was completed with the right evidence. |

### Home Office Recommendations

- Build a **Supervision Command Center** that ranks risk by branch, advisor, product, communication type, and AI-policy status.
- Add **advisor productivity and adoption telemetry** beside risk so platform leaders can see whether controls are reducing or adding friction.
- Create **policy-aware AI review trails** for report narratives, communications, and next-best-action suggestions.
- Add a **retention and field-friction watchlist** that flags declining adoption, rising exceptions, and support escalations.

## Profile 2: OSJ / Branch Principal

- **Persona:** Kwame Nkrumah, OSJ principal overseeing 42 reps across three offices.
- **Firm profile:** Regional supervisory unit inside a national broker-dealer, mixed experienced reps and newer producers, local compliance accountability.
- **Core job:** Keep rep activity review-ready while helping advisors resolve exceptions and serve clients without waiting on the home office.
- **Primary pains:**
  - Exception queues are sorted by system timestamp, not local client, rep, or revenue impact.
  - OSJ staff spend time translating home-office alerts into rep-level coaching and next steps.
  - Local principals cannot easily see which reps are creating repeated friction or need training.
  - Escalations lose context as they move between branch, home office, and advisor.

### OSJ ODI Outcomes

| ID | Importance | Satisfaction | Outcome |
| --- | ---: | ---: | --- |
| BD-OSJ #1 | 9.3 | 2.4 | Minimize the time to triage the branch exceptions that are most likely to block client service or create regulatory risk. |
| BD-OSJ #2 | 9.0 | 2.8 | Minimize the effort required to translate home-office findings into rep-specific action and coaching. |
| BD-OSJ #3 | 8.9 | 3.0 | Increase visibility into repeated rep friction patterns before they become audit findings or client complaints. |
| BD-OSJ #4 | 8.7 | 3.1 | Minimize context lost when escalating a branch issue to home office supervision or product support. |
| BD-OSJ #5 | 8.5 | 3.3 | Increase confidence that every reviewed exception has a complete evidence trail. |

### OSJ Recommendations

- Build a **Branch Exception Workbench** with severity, client impact, aging, rep pattern, and next action.
- Add a **rep coaching panel** that turns repeated exceptions into local training suggestions.
- Add **escalation packets** that carry evidence, owner, due date, and home-office status.
- Add **local growth visibility** so principals can balance compliance load with advisor productivity and client service.

## Profile 3: Hybrid Advisor / Team

- **Persona:** Amina Diallo, hybrid advisor leading a five-person team with brokerage, advisory, annuity, and planning relationships.
- **Firm profile:** $680M advisory assets, brokerage trails, annuity/insurance cases, multiple account types, centralized broker-dealer supervision.
- **Core job:** Serve clients through a mixed brokerage/advisory book while producing clear, compliant, client-ready recommendations and reports.
- **Primary pains:**
  - The advisory and brokerage sides of the client relationship feel like separate operating systems.
  - Account opening and product workflows require repeated status checks across forms, suitability, supervision, and operations.
  - Client reports do not clearly explain why brokerage, advisory, annuity, and planning pieces belong together.
  - Advisor teams do not know which client action is blocked by supervision, product eligibility, or missing data.

### Hybrid Advisor ODI Outcomes

| ID | Importance | Satisfaction | Outcome |
| --- | ---: | ---: | --- |
| BD-HA #1 | 9.4 | 2.5 | Minimize the time to understand a client's full brokerage, advisory, planning, and product relationship in one view. |
| BD-HA #2 | 9.1 | 2.7 | Minimize the effort required to produce a client-ready explanation that is compliant across brokerage and advisory contexts. |
| BD-HA #3 | 9.0 | 2.9 | Increase visibility into what is blocking an account, product, or recommendation workflow. |
| BD-HA #4 | 8.8 | 3.1 | Minimize the number of handoffs needed to resolve suitability, eligibility, or supervision questions. |
| BD-HA #5 | 8.6 | 3.2 | Increase confidence that client communications and report narratives match the approved product and account context. |

### Hybrid Advisor Recommendations

- Build a **Relationship 360 view** that unifies advisory, brokerage, planning, annuity, and cash positions.
- Add a **workflow-blocker strip** for account opening, product approvals, suitability, missing signatures, and supervision holds.
- Add **context-aware report narratives** that distinguish advisory recommendations, brokerage activity, and product disclosures.
- Add a **team action queue** that routes each blocker to the right advisor, CSA, principal, or home-office team.

## Capability Matrix

| Capability | Current Fidelity / Wealthscape posture | Rating | Best-in-class reference | Gap |
| --- | --- | --- | --- | --- |
| Advisor-branded reporting | Stronger in the current prototype than legacy Wealthscape, but still advisor/RIA-centered. | partial | Addepar, Advyzon, Envestnet reporting ecosystems | Needs broker-dealer role context, supervision state, and multi-affiliation reporting. |
| Enterprise supervision and evidence trail | Existing prototype has report-pipeline audit concepts but not supervisory queues. | partial | FINRA-focused regtech, Smarsh/Global Relay-style communications review, enterprise surveillance stacks | Needs integrated supervision workbench and retention/evidence status. |
| AI governance and review | Current prototype flags AI narrative compliance review but lacks policy-aware enterprise controls. | partial | Enterprise AI governance plus broker-dealer supervision programs | Needs approved-use status, user activity visibility, and review queues. |
| Advisor productivity telemetry | Current prototype shows book/client signals, not field adoption or platform friction. | none | Large wealth platforms and CRM/product analytics stacks | Needs adoption, exception, support, and revenue context in one view. |
| Branch/OSJ exception triage | Not represented in current RIA prototype. | none | Broker-dealer supervision dashboards and workflow systems | Needs branch principal queue, coaching, and escalation flow. |
| Hybrid brokerage/advisory client view | Current prototype assumes independent RIA reporting relationship. | partial | Integrated wealth platforms that combine brokerage, advisory, planning, and product workflows | Needs relationship-level context and product/suitability blockers. |

## Build / Buy / Partner Calls

| Gap | Role | Maturity | Urgency | Call | Rationale |
| --- | --- | --- | --- | --- | --- |
| Enterprise supervision and evidence trail | context | high | high | partner | Broker-dealer supervision/retention rails are mature and regulated; Wealthscape should wrap them into advisor and branch workflows. |
| AI governance and review | core | medium | high | wrap | The differentiated move is policy-aware AI inside daily reporting and supervision workflows, built over enterprise governance controls. |
| Advisor productivity telemetry | core | medium | medium | build | Fidelity can differentiate by combining Wealthscape usage, support, exceptions, and custody/clearing context. |
| Branch/OSJ exception triage | core | medium | high | build | The branch-principal experience is a workflow differentiator and should be native to the broker-dealer prototype. |
| Hybrid brokerage/advisory client view | core | high | high | wrap | Data rails may already exist in clearing/custody and planning/reporting systems; the value is the unified client-facing experience. |

## Prototype Data Guidance

- Keep RIA as the default profile and preserve existing tour/scenario behavior.
- Add profile-specific Strategy data first; profile-specific workflow panels can arrive after the registry exists.
- Broker-dealer profile labels should be explicit: `RIA Advisor`, `BD Home Office`, `OSJ Principal`, `Hybrid Advisor`.
- The Strategy tab should make profile differences immediately visible through hero copy, persona card, outcomes, and recommendations.
- Avoid claiming production integration. This is strategy/prototype content, not live Wealthscape data.

## Citations

- FINRA 2026 Annual Regulatory Oversight Report: `https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report`
- FINRA GenAI topic: `https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/gen-ai`
- SIFMA 2025 Capital Markets Fact Book: `https://www.sifma.org/research/statistics/fact-book`
- SIFMA Fact Book summary: `https://www.sifma.org/news/blog/top-10-takeaways-from-sifmas-2025-capital-markets-fact-book`
- SIFMA communications-retention comment: `https://www.sifma.org/advocacy/letters/modernizing-communications-and-record-retention-rules-for-broker-dealersinvestment-advisers-and-security-based-swap-dealers-sifma-and-sifma-amg`
- Fidelity Wealth Management Trends 2026: `https://clearingcustody.fidelity.com/insights/topics/running-your-business/wealth-management-trends-for-2026`
- Fidelity AI in Wealth Management: `https://clearingcustody.fidelity.com/insights/topics/running-your-business/the-current-state-of-ai-in-wealth-management`
