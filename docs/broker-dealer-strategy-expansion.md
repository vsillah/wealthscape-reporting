# Broker-Dealer Strategy Expansion Research Packet

This packet extends the Wealthscape Reporting 2.0 ODI strategy from an independent RIA advisor lens into three broker-dealer operating profiles. It is intended to feed the profile registry and Strategy tab data without changing the React app in this lane.

## Source Anchors

- Live prototype: `https://wealthscape-reporting.vercel.app`
- App source: `wealthscape-intelligence/src/WealthscapePrototype.jsx`
- Original reporting build trail: PR #1 and PR #6, Claude session `session_011feHy7wcr9TsiiXT2JNYEd`
- Discovery toolkit trail: PR #9, Claude session `session_015C2a22nbet8gC6JzSJtJp2`
- Methodology: `.claude/skills/value-stack-discovery/`
- Increment policy: treat this packet as the approved baseline and add dated research refreshes below instead of recreating the packet from scratch.

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

## Incremental Research Update - July 15, 2026

This update preserves the baseline broker-dealer packet and adds current market, customer, and capability signals that should inform the next Strategy data or prototype lanes. It does not require React app changes by itself.

### Source Facts

| Signal | Source fact | Product implication |
| --- | --- | --- |
| FINRA's 2026 snapshot confirms concentration and dual registration | FINRA reports 639,723 registered representatives in 2025, up 5% since 2021, while member-firm counts declined through concentration. Its companion analysis says more than half of FINRA-registered representatives, 331,802 people, were dually registered as broker-dealer and investment-adviser representatives at year-end 2025. | Broker-dealer profile work should treat dual brokerage/advisory workflows as the norm, not an edge case, and should prioritize cross-registration supervision, disclosure, and relationship context. |
| Broker-dealer scale keeps concentrating | SIFMA's 2025 Capital Markets Fact Book reports 3,249 FINRA-registered broker-dealers in 2024, down 1.5% year over year, while gross revenues rose 5.9% to $641.0B and pre-tax net income rose 41.3% to $75.8B. | Home-office workflows should assume fewer, larger, more operationally complex firms that need supervision, analytics, and advisor productivity in one operating view. |
| FINRA made GenAI and AI agents explicit 2026 supervision topics | FINRA's 2026 report adds a GenAI section, says securities rules remain technology-neutral, and identifies agent risks around autonomy, scope, auditability, data sensitivity, domain knowledge, rewards, bias, hallucinations, and privacy. | AI-assisted report narratives, advisor workflows, and agent actions need policy status, prompt/output logging where appropriate, human review, and traceable evidence. |
| Communication retention modernization now has supplemental cost evidence | SIFMA and SIFMA AMG's May 4, 2026 supplement says survey data supports the view that current communications-retention rules drive over-retention, high costs, and operational inefficiency. Respondents included broker-dealers and dual registrants from fewer than 500 to more than 20,000 employees. | Wealthscape should distinguish retained client-facing recommendations from operational noise and expose retention rationale, not only archive status. |
| Effective firm AI is becoming an advisor-satisfaction driver | J.D. Power's 2026 advisor study reports average satisfaction of 632 for employee advisors and 688 for independent advisors, rising to 781 and 826 respectively when advisors use firm-provided AI tools they find effective. | Advisor-retention telemetry should track whether AI tools are usable, approved, and trained, because bad AI rollouts can become a platform-retention risk. |
| Advisor teams are now a core operating pattern | J.D. Power reports 40% of employee advisors and 35% of independent advisors work on teams; among independent advisors under 50, 49% work on teams. | Hybrid-advisor workflows should route blockers by team role, not only by individual advisor, and support shared evidence trails. |
| Independent and hybrid channels keep raising the technology bar | Cerulli's 2026 wealth-management technology report says independent and hybrid RIAs continue to outgrow other retail wealth channels and that 27% of independent RIA practices identify as heavy technology users. | Broker-dealers should treat platform UX, open integrations, and speed of workflow resolution as retention defenses against independent-channel migration. |
| Competitive platforms are moving toward AI explainability and workflow context | Envestnet's May 2026 release adds AI-powered data automation, AI explainability, insight exploration, and deeper MoneyGuide integration into proposal workflows and client records. Addepar positions unified public/private investment data and intelligent workflows as answers to operational drag. | Wealthscape reporting should not stop at better report output; the differentiated move is explainable insight, plan/proposal context, and next action inside the report workflow. |
| Communications surveillance vendors are leaning into AI and channel controls | Global Relay's 2026 Industry Insights says 66% of surveyed compliance and surveillance respondents are banning communications channels, 37% cite comprehensive channel monitoring as the biggest compliance challenge, and 54% of non-users intend to introduce AI for compliance or surveillance in the next year. | Build the advisor/branch experience layer, but partner or wrap mature communications capture, retention, and surveillance rails. |
| Fidelity's own 2026 trend framing points to cyber trust and M&A pressure | Fidelity Institutional says HNW clients increasingly expect cybersecurity and data-use transparency, and that 2024 purchased assets for RIA and broker-dealer M&A transactions totaled $909.7B. | Broker-dealer reporting should include client-friendly data governance proof and acquisition-ready operating metrics for firms scaling through M&A. |

### Assumptions To Keep Separate From Source Facts

- The current prototype remains RIA-centered in its production UI; this update only reviewed and changed docs.
- Persona names, firm sizes, and satisfaction scores remain illustrative discovery inputs unless validated with customer interviews or proprietary firm data.
- ODI scores below are synthesis estimates from the cited public signals. They should be re-scored if Fidelity provides advisor research, support-ticket data, supervision volumes, or Wealthscape usage analytics.
- Vendor references describe public positioning and capability direction, not verified integration availability inside Fidelity's current stack.

### Customer Pain Updates

| Persona | New or sharpened pain | Evidence anchor |
| --- | --- | --- |
| BD Home Office | AI now creates a double bind: advisors expect productivity help, but home office must prove approval, model/version context, supervision, data handling, and retention treatment. | FINRA 2026 GenAI topic; J.D. Power 2026 advisor satisfaction; Global Relay 2026 Industry Insights. |
| BD Home Office | Communications retention has shifted from "archive everything" toward "prove why this needed retention, review, or exclusion," especially for dual registrants and AI-generated artifacts. | SIFMA 2025 comment letter and May 2026 supplemental data. |
| OSJ / Branch Principal | Branch principals need to see whether exceptions are caused by repeated rep behavior, unclear AI/tool guidance, channel-policy violations, or home-office process lag. | FINRA 2026 supervision and communications topics; Global Relay channel-monitoring findings. |
| OSJ / Branch Principal | Team-based advisory structures make exception routing harder because the person who created a client artifact may not be the best owner for remediation. | J.D. Power 2026 team-structure findings. |
| Hybrid Advisor / Team | Advisors need firm-approved AI and data-policy clarity they can explain to clients without turning every client meeting into a compliance lesson. | J.D. Power 2026 AI satisfaction; Fidelity 2026 cyber/data-governance trend. |
| Hybrid Advisor / Team | Multi-account proposals now compete against platforms that pull held-away accounts, plan data, risk context, and proposal workflows closer together. | Envestnet R2 2026 release; Addepar wealth-management positioning. |

### ODI Outcome Additions

Opportunity score formula: `Opportunity = Importance + max(Importance - Satisfaction, 0)`.

| ID | Persona | Importance | Satisfaction | Opportunity | Outcome |
| --- | --- | ---: | ---: | ---: | --- |
| BD-HO #7 | Home Office | 9.3 | 2.4 | 16.2 | Minimize the time to prove the policy status, data source, model/version context, and review history for every AI-assisted advisor workflow. |
| BD-HO #8 | Home Office | 9.1 | 2.5 | 15.7 | Minimize the effort required to distinguish communications that require retention from operational noise, AI artifacts, and non-client-facing collaboration. |
| BD-HO #9 | Home Office | 8.9 | 2.8 | 15.0 | Increase confidence that third-party platform, surveillance, and AI vendors have current risk, data-access, and outage evidence attached to the relevant workflow. |
| BD-OSJ #6 | OSJ Principal | 8.8 | 2.7 | 14.9 | Minimize the time to route a branch exception to the right team member based on client impact, rep pattern, compliance policy, and home-office dependency. |
| BD-OSJ #7 | OSJ Principal | 8.6 | 3.0 | 14.2 | Increase visibility into whether an exception reflects training need, policy ambiguity, channel misuse, or repeated supervisory behavior. |
| BD-HA #6 | Hybrid Advisor | 9.0 | 2.8 | 15.2 | Minimize the effort required to explain firm-approved AI use, data handling, and cyber protections in client-ready language. |
| BD-HA #7 | Hybrid Advisor | 8.9 | 2.9 | 14.9 | Minimize the number of manual re-entry steps needed to combine held-away accounts, plan context, proposal data, and client-ready reporting. |

### Updated Broker-Dealer Job Map

| Step | Home Office Job | OSJ / Branch Principal Job | Hybrid Advisor / Team Job |
| --- | --- | --- | --- |
| Define | Determine which advisor, branch, product, AI use, vendor, or communication risk deserves attention. | Determine which local exception or rep pattern creates the highest client or regulatory risk. | Determine which client relationship, account, product, or planning moment needs action. |
| Locate | Gather platform usage, supervision, communications, vendor-risk, support, and revenue signals. | Gather exception details, rep history, client impact, prior coaching, and home-office status. | Gather brokerage, advisory, planning, held-away, suitability, and product workflow inputs. |
| Prepare | Normalize signals into a shared priority model with source and policy context. | Organize issues into local action queues with owner, due date, severity, and escalation path. | Prepare a client-ready view with approved data, disclosures, and workflow blockers. |
| Confirm | Verify retention status, AI approval, model/version context, vendor risk, and supervisory evidence. | Verify that the right principal, rep, CSA, or home-office team owns the next action. | Verify that recommendations match product eligibility, account type, disclosures, and supervision status. |
| Execute | Trigger intervention, review, training, vendor follow-up, or platform change. | Resolve, coach, escalate, or document the exception. | Deliver the report, proposal, or client action with approved narrative and evidence. |
| Monitor | Watch adoption, exception trends, advisor satisfaction, surveillance backlog, and vendor reliability. | Monitor aging exceptions, repeat behavior, coaching completion, and branch workload. | Monitor blockers, client follow-up, account status, and team handoffs. |
| Modify | Tune policy, workflow, training, vendor controls, or product priorities. | Adjust routing, coaching, escalation, or branch procedures. | Revise the narrative, product path, account workflow, or team assignment. |
| Conclude | Preserve evidence and close the loop with measurable risk, productivity, and retention impact. | Close the exception with a complete evidence trail and learning note. | Close the client workflow with the next action, evidence, and retained communication context. |

### Capability Matrix Deltas

| Capability | Baseline rating | July 2026 delta | Updated call |
| --- | --- | --- | --- |
| Dual broker-dealer/adviser operating model | partial | FINRA's 2026 snapshot shows dual registration is now the predominant representative model. | Treat hybrid brokerage/advisory context as a required data and workflow dimension across home-office, OSJ, and advisor profiles. |
| AI governance and review | partial | FINRA now explicitly calls out AI agents, prompt/output monitoring, model context, human review, and auditability. | Wrap enterprise AI governance with a broker-dealer workflow layer for report narratives, advisor actions, and branch review. |
| Communications retention and surveillance | partial | SIFMA's May 2026 supplement strengthens the cost/over-retention case, while Global Relay data shows channel bans and monitoring difficulty remain active. | Partner for capture, archive, surveillance, and legal hold rails; build a retention-rationale and review-status layer inside Wealthscape workflows. |
| Advisor productivity telemetry | none | J.D. Power links effective firm AI to satisfaction and loyalty, making AI adoption quality a retention signal. | Build telemetry that connects AI usage, training, effectiveness, support tickets, exceptions, and advisor satisfaction. |
| Team-based advisor workflow | partial | Teaming has become common enough that individual-only task routing is no longer adequate. | Build team-aware blocker ownership, evidence trails, and client-service handoffs. |
| Planning/proposal/reporting context | partial | Envestnet and Addepar are moving toward unified data, explainability, planning integration, and insight in the workflow. | Wrap existing custody/reporting data with plan/proposal context and explainable next actions. |
| Third-party risk visibility | none | FINRA highlights third-party vendor attacks/outages and vendor inventories as a member-firm risk area. | Build vendor-risk context into the home-office command view; partner for specialist vendor-risk monitoring where needed. |

### Recommendation Updates

1. **Add an AI Evidence Ledger to broker-dealer reporting workflows.** Tie report narrative, summarization, proposal support, and future agent actions to policy status, data source, model/version context, human review, retained artifacts, and exception owner. Serves BD-HO #2, BD-HO #7, BD-HA #6.
2. **Build a Retention Rationale Panel, not just an archive badge.** Show why a communication, AI artifact, or collaboration record is retained, excluded, pending review, or escalated. Serves BD-HO #6, BD-HO #8, BD-OSJ #5.
3. **Treat advisor AI effectiveness as a retention signal.** Add dashboard fields for firm AI usage, training completion, perceived effectiveness, support load, and exception impact. Serves BD-HO #3, BD-HO #5, BD-HO #7.
4. **Make branch work queues team-aware.** Route each blocker to advisor, CSA, principal, or home office based on role and client impact, while preserving evidence across handoffs. Serves BD-OSJ #1, BD-OSJ #4, BD-OSJ #6, BD-HA #7.
5. **Extend Relationship 360 into Plan/Proposal/Report 360.** Combine brokerage, advisory, held-away, planning, proposal, suitability, disclosure, and client-ready narrative state in one workflow. Serves BD-HA #1, BD-HA #2, BD-HA #3, BD-HA #7.
6. **Expose third-party risk inside the home-office operating view.** Connect vendor outages, data-access scope, due-diligence status, and affected advisor workflows to platform-risk prioritization. Serves BD-HO #1, BD-HO #3, BD-HO #9.

### Build / Buy / Partner Refresh

| Gap | Role | Maturity | Urgency | Call | Rationale |
| --- | --- | --- | --- | --- | --- |
| AI evidence ledger | core | medium | high | build | The evidence model must map to Wealthscape reporting, profile data, advisor workflow, and supervision context. Use enterprise model-risk controls where available, but own the broker-dealer workflow layer. |
| Communications capture, retention, and surveillance rails | context | high | high | partner | Mature regulated vendors already cover capture, archive, legal hold, supervision, and audit trails. Wealthscape should surface status and rationale rather than rebuild rails. |
| Retention rationale and review-status layer | core | medium | high | build | The differentiator is making retention decisions understandable at the point of advisor, branch, and home-office work. |
| Advisor AI effectiveness and retention telemetry | core | low | medium | build | Public research shows the signal matters, but the valuable data comes from internal Wealthscape usage, support, training, exception, and satisfaction sources. |
| Planning/proposal/reporting integration | core | high | high | wrap | Competitors show this is becoming table stakes. Fidelity likely has relevant internal rails, so the near-term move is a unified experience layer over existing planning, account, and reporting data. |
| Vendor-risk monitoring | context | high | medium | partner | Use specialist vendor-risk systems for monitoring and evidence collection, then expose affected workflows and owners in the home-office command view. |

### Prototype Guidance From This Refresh

- Add a future `AI Evidence` subpanel under BD Home Office before expanding autonomous agent actions.
- Use status labels such as `Approved AI`, `Human Review Required`, `Retention Pending`, `Retained`, `Excluded by Policy`, and `Vendor Risk Open`.
- Keep source labels explicit in the Strategy tab: `Source fact`, `Assumption`, `Recommendation`, and `Prototype implication`.
- Do not claim live vendor integrations, live surveillance data, or production AI governance without implementation proof.

## Citations

- FINRA 2026 Annual Regulatory Oversight Report: `https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report`
- FINRA GenAI topic: `https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/gen-ai`
- FINRA 2026 Industry Snapshot release: `https://www.finra.org/media-center/newsreleases/2026/finra-publishes-2026-industry-snapshot`
- FINRA 2026 Industry Snapshot analysis: `https://www.finra.org/media-center/blog/four-insights-from-finras-2026-industry-snapshot`
- SIFMA 2025 Capital Markets Fact Book: `https://www.sifma.org/research/statistics/fact-book`
- SIFMA Fact Book summary: `https://www.sifma.org/news/blog/top-10-takeaways-from-sifmas-2025-capital-markets-fact-book`
- SIFMA communications-retention comment: `https://www.sifma.org/advocacy/letters/modernizing-communications-and-record-retention-rules-for-broker-dealersinvestment-advisers-and-security-based-swap-dealers-sifma-and-sifma-amg`
- SIFMA communications-retention supplemental data: `https://www.sifma.org/advocacy/letters/data-supporting-the-modernization-of-the-communications-retention-requirements`
- J.D. Power 2026 U.S. Financial Advisor Satisfaction Study: `https://www.jdpower.com/business/press-releases/2026-u-s-financial-advisor-satisfaction-study/`
- Cerulli State of U.S. Wealth Management Technology 2026: `https://www.cerulli.com/reports/state-of-us-wealth-management-technology-2026`
- Envestnet R2 2026 wealth platform release: `https://newsroom.envestnet.com/2026-05-19-LIVE-FROM-ELEVATE-2026-Envestnet-Unveils-AI-Driven-Enhancements-and-Accelerates-Financial-Planning-Integration-for-Advisors-on-its-Wealth-Management-Platform`
- Global Relay Industry Insights 2026: `https://www.globalrelay.com/resources/guides-reports/industry-insights-2026/`
- Global Relay broker-dealer solutions: `https://www.globalrelay.com/solutions/finance/broker-dealers/`
- Addepar wealth management positioning: `https://addepar.com/wealth-management`
- Fidelity Wealth Management Trends 2026: `https://clearingcustody.fidelity.com/insights/topics/running-your-business/wealth-management-trends-for-2026`
- Fidelity AI in Wealth Management: `https://clearingcustody.fidelity.com/insights/topics/running-your-business/the-current-state-of-ai-in-wealth-management`
