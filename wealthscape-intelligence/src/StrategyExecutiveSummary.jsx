import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Compass,
  ShieldCheck,
} from "lucide-react";
import "./StrategyExecutiveSummary.css";

const summaries = {
  maintenance: {
    conclusion: "Fund a shared validation-and-exception pilot before expanding account-maintenance automation.",
    rationale: "The research points to a servicing-quality problem: incomplete requests, unclear authority, ownership gaps, review evidence and completion proof. Fund a bounded pilot that proves fewer rejected requests and clearer ownership before extending automation across household authority.",
    brief: {
      recommendation:
        "Approve a 90-day validation-and-exception pilot before expanding account-maintenance automation.",
      context:
        "Do not fund broad automation yet. Fund the proof that requests arrive complete, ownership is visible, and exception handling measurably improves.",
      ask: "Authorize one bounded pilot, one baseline workstream, and one decision gate.",
      reasons: [
        {
          label: "Quality",
          sentence: "Pilot approval should depend on request quality and repeated handling.",
          body: "Custody and clearing peers raise expectations around guided workflows, status visibility, and service recovery. The decision should be based on request quality and repeated handling, not broad satisfaction alone.",
          findingGroups: [
            ["Observed signals", [2]],
            ["Decision implications", [1, 6]],
          ],
        },
        {
          label: "Ownership",
          sentence: "Authority and exception ownership are where the job breaks.",
          body: "The strongest cross-section signal is not a missing form. It is unclear authority, rejected work, missing owners, and weak proof that the account change completed.",
          findingGroups: [
            ["Observed signals", [3, 5]],
            ["Decision implications", [0]],
          ],
        },
        {
          label: "Discipline",
          sentence: "Test one account-change path before expanding.",
          body: "The ODI-informed read points to exception control and household authority as underserved opportunities. Scale should wait for internal economics and measured pilot outcomes.",
          findingGroups: [
            ["Observed signals", [4]],
            ["Decision implications", [7, 8, 9]],
          ],
        },
      ],
      nextStep:
        "Baseline volume, rework, resolution time, reviewer burden, and support cost. At the ninety-day gate, decide whether completion quality and operating cost justify expanding into household authority.",
    },
    findings: {
      1: ["Measure request quality, repeated handling, and ownership before expanding automation.", "T3 and Kitces point to platform satisfaction, integration and repeated handling as competitive context. The finding is that maintenance strategy should measure request quality, repeated handling and ownership instead of treating satisfaction as the answer by itself."],
      2: ["Schwab and Altruist show guided workflows, notifications, and retained records.", "Schwab and Altruist public references show adjacent digital workflows, beneficiary updates, notifications and records. The competitive gap to inspect is the full path across scope, authority, rejected work, evidence retention and cross-team recovery."],
      3: ["Advisor-facing research points to missing authority, unclear status, and uncertain completion.", "Forum themes and advisor-survey synthesis reveal where the advisor-facing work hurts: missing authority, unclear status and uncertain completion. Use those themes to focus discovery on who owns the next action and how completion becomes visible."],
      4: ["Thirteen candidate outcomes show high importance and low satisfaction.", "Thirteen of fifteen candidate outcomes sit in high-importance, low-satisfaction territory. The strongest proto-segments are exception control and household authority; no overserved cluster currently supports a stripped-down or low-cost disruptive strategy."],
      5: ["The account-change job should be tracked from request definition through confirmation.", "The job map treats the requested change as the stable unit of progress: define the change, locate account scope, prepare requirements, confirm authority, execute, monitor, modify and conclude. Each transition needs a named owner, visible missing evidence and proof that the account scope changed correctly."],
      0: ["Household authority should wait until request validation and recovery paths are proven.", "Household authority scores high, but multi-account changes amplify the same missing-information and exception problems. Shared request checks, recovery paths and completion evidence are the prerequisite to scaling account-change automation."],
      9: ["Funding decisions need Fidelity request volume, rework, cost, and control data.", "Assumptions around demand, architecture, controls and ODI validity should be validated in a separate workstream before the recommendation is treated as implementation guidance."],
      7: ["Start with exception control, then expand only if validation confirms the same unmet needs.", "Start with exception control because it is the clearest underserved cluster. If formal ODI validation shows the same pattern across segments, expand the shared validation-and-exception layer into a broader servicing platform."],
      8: ["Build-or-buy decisions should compare identity, authority, validation, audit, and exception-service costs.", "Identity, authority, validation, audit and retention services determine whether to reuse, build, partner or acquire. The decision turns on integration cost, support ownership and the cost of operating exceptions."],
      6: ["Each claim needs traceable sources before it becomes a recommendation.", "The source engine weighs customer proximity, source reputation and corroborating signals. Claims that fail the challenge review stay as validation questions instead of becoming findings, recommendations or client-ready guidance."],
    },
    assumptions: [
      ["Demand and servicing model", "Validate request volumes, failure points and differences across custody, clearing and assisted servicing. Fidelity’s organizational complexity and handoffs may change the priority order."],
      ["Systems, data and economics", "Confirm technology debt, account and party data constraints, authority records, reusable services, support burden and cost-to-integrate. Current evidence does not establish delivery effort or return on investment."],
      ["Controls and accountability", "Validate the compliance process and security architecture for permissions, authority, review and evidence retention. Name operating ownership for exceptions, support and policy changes."],
      ["ODI research validity", "Treat current scores as directional synthesis, not validated ODI measurement. Run a formal desired-outcome survey, then apply factor and cluster analysis to reveal needs-based segments before final prioritization."],
    ],
    steps: [
      ["Establish an internal baseline", "Observe service associates, advisors and home-office reviewers. Measure assisted volume, incomplete submissions, rework and time to resolution by request type."],
      ["Run ODI validation research", "Translate the candidate outcomes into stable, solution-neutral desired-outcome statements. Survey importance and satisfaction, then analyze segments before locking the opportunity map."],
      ["Assess the servicing architecture", "Map account identity, authority, validators and audit services with engineering and data owners. Compare reuse, build and partner costs against actual constraints."],
      ["Scope one accountable pilot", "Choose a bounded maintenance request and servicing population. Agree on operational ownership, escalation, compliance review and security requirements before connecting systems."],
      ["Make the scale decision", "Set success and stop thresholds against the baseline. At the proposed ninety-day gate, review completion quality, support burden and cost before extending to household authority."],
    ],
    sourceConfidence: {
      headline: "Research is scored before it becomes strategy.",
      body: "Claims are checked for proximity, reputation and corroboration before they can shape recommendations.",
      metrics: [
        ["3", "confidence factors"],
        ["4", "source tiers"],
        ["2", "review gates"],
      ],
    },
  },
  reporting: {
    conclusion: "Prioritize governed client report production, with traceable data and accountable review from assembly to delivery.",
    rationale: "Reporting value depends on the work around the document: reconciling source data, resolving blockers, explaining results and obtaining approval. Start with a bounded reporting workflow and prove that it reduces preparation and review effort while preserving the evidence behind every client report.",
    brief: {
      recommendation:
        "Approve a bounded governed-reporting pilot before expanding AI-assisted client report production.",
      context:
        "Do not treat generated report text as the product. Fund the workflow that proves data, review, approval, and delivery can stay controlled from assembly through follow-up.",
      ask: "Authorize one report type, one client segment, and one measured release path.",
      reasons: [
        {
          label: "Workflow",
          sentence: "The hard work sits around the report.",
          body: "Preparation, reconciliation, review, delivery, and follow-up create the effort. A finished document is not complete until the right reviewer approves it and delivery is traceable.",
          findingGroups: [
            ["Observed signals", ["customer", "outcomes", "job"]],
            ["Decision implications", ["thesis"]],
          ],
        },
        {
          label: "Controls",
          sentence: "AI output needs trusted data, approval, and delivery controls.",
          body: "Vendor claims are useful context, but Fidelity still needs to verify source data, entitlements, disclosures, and review evidence before report generation becomes operational.",
          findingGroups: [
            ["Observed signals", ["market", "capabilities", "governance", "sources"]],
            ["Decision implications", ["sourcing"]],
          ],
        },
        {
          label: "Measurement",
          sentence: "Expand only after preparation time, rework, and audit retrieval improve.",
          body: "Preparation time, rework, support burden, and audit retrieval should be measured before funding broader report automation.",
          findingGroups: [
            ["Observed signals", ["recommendations"]],
            ["Decision implications", ["measurement"]],
          ],
        },
      ],
      nextStep:
        "Choose one report workflow, baseline effort and exceptions, then gate expansion on reconciled data, approval evidence, controlled delivery, and acceptable support cost.",
    },
    findings: {
      thesis: ["The pilot should show whether reporting takes less preparation time without weakening review.", "Test assembly through delivery in one bounded workflow; broader funding should depend on measured effort reduction and retained review evidence."],
      market: ["Report generators still need reconciled data, reviewer approval, and controlled delivery.", "Vendors already advertise report drafting and delivery. Test whether their reports use reconciled data, receive the right review and reach the intended client; verify each claim before selecting a tool."],
      capabilities: ["Test whether report data, access checks and approvals work together.", "A product feature list cannot prove that report values reconcile to their sources or that only authorized staff can approve them. Test those connections against Fidelity’s systems."],
      customer: ["Advisors, clients and reviewers need different things from the same report.", "Advisors need preparation efficiency, clients need understandable results and home office needs review evidence; validate the tradeoffs within a defined segment."],
      outcomes: ["Reports need household context, clear results, blocked-work status, owners, and completion proof.", "Unify context, Explain results, Unblock work, Route ownership and Prove completion; validate which failure creates the greatest burden before ranking investment."],
      job: ["A finished report file still needs approval, delivery and follow-up.", "Source preparation, review, delivery and follow-up determine completion; carry evidence and ownership through the whole path to address avoidable rework."],
      recommendations: ["Missing data and review holds are prerequisites to expanding report delivery.", "Sequence the profile-specific recommendations around those prerequisites, then test accountable routing and controlled delivery in the pilot."],
      sourcing: ["Tool selection should compare reconciliation, permissions, support, and integration cost.", "Reuse suitable data and control services; compare specialist partners on reconciliation, permissions, support burden and total cost-to-integrate."],
      governance: ["Client reports need checked sources and the required reviewer’s approval.", "Make applicable disclosures, review and retention part of the workflow design; compliance and security must confirm the controls before operational use."],
      measurement: ["Expand only after preparation time, rework, and audit retrieval improve.", "Track preparation time, rework and audit retrieval alongside support cost; agree success and stop thresholds before the pilot starts."],
      sources: ["Fidelity-specific volume, cost, staffing, and system constraints still need to be measured.", "Public research and synthetic examples frame hypotheses; internal discovery must resolve applicability, feasibility and economics before final guidance."],
    },
    assumptions: [
      ["Demand and operating model", "Validate reporting frequency, segment needs and the split of work among advisors, service teams and home office. Fidelity’s organizational complexity and servicing model may change the proposed workflow."],
      ["Data, architecture and cost", "Assess technology debt, data constraints, lineage, reconciliation and entitlement services. Validate cost-to-integrate and support burden before choosing an assembly or narrative solution."],
      ["Approval and release ownership", "Confirm the compliance process, security architecture and operating ownership for content review, delivery, retention and incidents. The proposed controls have not received internal approval."],
    ],
    steps: [
      ["Validate the reporting workload", "Interview advisors, operations and reviewers. Baseline preparation time, revisions, data exceptions and audit retrieval for a defined report type."],
      ["Trace systems and data", "Map source records, reconciliation, permissions and retention with platform and data owners. Identify reusable services and cost the integration gaps."],
      ["Agree on the pilot contract", "Choose one report type and client segment. Assign data, content, review and support owners; obtain compliance and security review of the proposed release path."],
      ["Gate production and expansion", "Agree on success and stop thresholds before the pilot. Require reliable data, review evidence, controlled delivery and acceptable operating cost before broader funding."],
    ],
    sourceConfidence: {
      headline: "Source controls sit behind the report strategy.",
      body: "Public sources, synthetic examples and internal discovery needs are separated before the strategy uses them. Low-confidence claims remain in the source register or validation backlog.",
      metrics: [
        ["3", "confidence factors"],
        ["15+", "public sources"],
        ["2", "review gates"],
      ],
    },
  },
};

export function StrategySectionFinding({ track, sectionId }) {
  const [headline, implication] = getStrategySectionFinding(track, sectionId);
  return (
    <div className="strategy-section-finding">
      <h3>{headline}</h3>
      <p>{implication}</p>
    </div>
  );
}

export function getStrategySectionFinding(track, sectionId) {
  const finding = summaries[track]?.findings?.[sectionId];
  if (finding) return finding;
  return [
    "Finding not yet mapped.",
    "This section needs an executive finding before the strategy summary is ready for review.",
  ];
}

function ExecutiveFinding({ track, section, index, onJump }) {
  const [expanded, setExpanded] = useState(false);
  const detailId = `${track}-finding-detail-${section.id}`;
  const headlineId = `${track}-finding-headline-${section.id}`;
  const finding = getStrategySectionFinding(track, section.id);
  return (
    <article className="strategy-executive-finding" aria-labelledby={headlineId}>
      <span className="strategy-executive-number">{String(index + 1).padStart(2, "0")}</span>
      <div className="strategy-executive-finding-body">
        <span className="strategy-executive-section-label">{section.label}</span>
        <strong id={headlineId}>{finding[0]}</strong>
        <div className="strategy-executive-finding-actions">
          <button type="button" className="strategy-executive-disclosure" aria-expanded={expanded} aria-controls={detailId} aria-label={`Why it matters: ${section.label}`} onClick={() => setExpanded(value => !value)}>
            Why it matters <ChevronDown size={14} aria-hidden="true" />
          </button>
          <button type="button" className="strategy-executive-jump" aria-label={`Read section ${index + 1}: ${section.label}`} onClick={() => onJump(section.id)}>
            Read section <ArrowUpRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div id={detailId} className="strategy-executive-finding-detail" hidden={!expanded}>{finding[1]}</div>
      </div>
    </article>
  );
}

function normalizeReason(reason, index) {
  if (!Array.isArray(reason)) return reason;
  return {
    label: String(index + 1),
    sentence: reason[0],
    body: reason[1],
    findingGroups: [],
  };
}

function ExecutiveSupportFinding({ track, section, onJump }) {
  const finding = getStrategySectionFinding(track, section.id);
  return (
    <article className="strategy-executive-support-finding">
      <span>{section.label}</span>
      <strong>{finding[0]}</strong>
      <button type="button" onClick={() => onJump(section.id)}>
        Read section <ArrowUpRight size={14} aria-hidden="true" />
      </button>
    </article>
  );
}

export default function StrategyExecutiveSummary({ track, sections, onJump }) {
  const summary = summaries[track];
  const [findingView, setFindingView] = useState("aligned");
  const brief = summary.brief || {
    recommendation: summary.conclusion,
    context: summary.rationale,
    ask: "Approve the next validation gate.",
    reasons: [],
    nextStep: "",
  };
  const sourceSection = sections.find((section) =>
    /source confidence|source appendix|source register/i.test(section.label),
  );
  const recommendationSection = sections.find((section) =>
    /recommendation/i.test(section.label),
  );
  const assumptionsSection = sections.find((section) =>
    /assumptions|next steps|roadmap|decision gates/i.test(section.label),
  );
  const sectionById = new Map(sections.map((section) => [String(section.id), section]));
  const reasonGroups = brief.reasons.map((reason, index) => normalizeReason(reason, index));
  return (
    <section className="strategy-executive" aria-labelledby={`${track}-executive-heading`}>
      <header className="strategy-executive-heading">
        <span className="strategy-executive-icon"><Compass size={24} aria-hidden="true" /></span>
        <div><span className="am-eyebrow">Leadership brief</span><h2 id={`${track}-executive-heading`}>Executive summary</h2></div>
      </header>
      <div className="strategy-executive-memo">
        <div className="strategy-executive-memo-head">
          <div>
            <span className="am-eyebrow">Recommendation</span>
            <h3>{brief.recommendation}</h3>
            <p>{brief.context}</p>
          </div>
          <aside className="strategy-executive-ask">
            <span className="am-eyebrow">Leadership ask</span>
            <strong>{brief.ask}</strong>
          </aside>
        </div>
        <div className="strategy-executive-reasons" aria-label="Recommendation reasons">
          <div className="strategy-executive-reasons-head">
            <span className="strategy-executive-reasons-label">Why this is the right next move</span>
            <div className="strategy-executive-view-toggle" aria-label="Findings view">
              <button
                type="button"
                aria-pressed={findingView === "aligned"}
                onClick={() => setFindingView("aligned")}
              >
                By recommendation
              </button>
              <button
                type="button"
                aria-pressed={findingView === "section"}
                onClick={() => setFindingView("section")}
              >
                By section
              </button>
            </div>
          </div>
          {findingView === "aligned" && reasonGroups.map((reason, index) => (
            <article className="strategy-executive-reason" key={reason.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h4>
                  <em>{reason.label}:</em>{" "}
                  {reason.sentence}
                </h4>
                <p>{reason.body}</p>
                {(reason.findingGroups?.length > 0 || reason.findings?.length > 0) && (
                  <div className="strategy-executive-support-groups" aria-label={`${reason.label} supporting findings`}>
                    {(reason.findingGroups || [["Supporting findings", reason.findings]]).map(([groupLabel, findingIds]) => {
                      const groupSections = findingIds
                        .map((findingId) => sectionById.get(String(findingId)))
                        .filter(Boolean);
                      if (groupSections.length === 0) return null;
                      return (
                        <details className="strategy-executive-support-group" key={`${reason.label}-${groupLabel}`}>
                          <summary>
                            <span>{groupLabel}</span>
                            <strong>{groupSections.length}</strong>
                            <ChevronDown size={15} aria-hidden="true" />
                          </summary>
                          <div className="strategy-executive-support-findings">
                            {groupSections.map((section) => {
                              return (
                                <ExecutiveSupportFinding
                                  key={`${reason.label}-${groupLabel}-${section.id}`}
                                  track={track}
                                  section={section}
                                  onJump={onJump}
                                />
                              );
                            })}
                          </div>
                        </details>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          ))}
          {findingView === "section" && (
            <section className="strategy-executive-section-findings" aria-label="Findings by section">
              <h3 className="strategy-executive-label">Findings by section</h3>
              <div className="strategy-executive-findings">
                {sections.map((section, index) => (
                  <ExecutiveFinding key={`${track}-${section.id}`} track={track} section={section} index={index} onJump={onJump} />
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="strategy-executive-next-gate">
          <div>
            <span className="am-eyebrow">Next analysis gate</span>
            <p>{brief.nextStep}</p>
          </div>
          <div className="strategy-executive-next-actions">
            {recommendationSection && (
              <button type="button" onClick={() => onJump(recommendationSection.id)}>
                Review recommendation <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            )}
            {assumptionsSection && (
              <button type="button" onClick={() => onJump(assumptionsSection.id)}>
                Check decision gates <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
      {summary.sourceConfidence && (
        <aside
          className="strategy-source-confidence"
          aria-label="Source confidence controls"
        >
          <span className="strategy-source-confidence-icon">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <div className="strategy-source-confidence-copy">
            <span className="am-eyebrow">Source confidence control</span>
            <h3>{summary.sourceConfidence.headline}</h3>
            <p>{summary.sourceConfidence.body}</p>
          </div>
          <div className="strategy-source-confidence-metrics">
            {summary.sourceConfidence.metrics.map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                {label}
              </span>
            ))}
          </div>
          {sourceSection && (
            <button
              type="button"
              className="strategy-source-confidence-jump"
              onClick={() => onJump(sourceSection.id)}
            >
              Inspect source engine <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          )}
        </aside>
      )}
    </section>
  );
}
