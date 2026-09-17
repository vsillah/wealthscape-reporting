import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ClipboardCheck,
  Compass,
  Flag,
  Layers3,
} from "lucide-react";
import "./StrategyExecutiveSummary.css";

const summaries = {
  maintenance: {
    conclusion: "Fund a shared validation-and-exception pilot before expanding account-maintenance automation.",
    rationale: "The research does not point to one missing screen. It points to repeated servicing failures around incomplete requests, authority, ownership, review evidence and completion proof. Market and competitor sources make the case for better servicing quality, while the outcome synthesis frames candidate outcomes that still need formal ODI validation. Start with a bounded pilot that proves fewer rejected requests and clearer ownership before extending automation across household authority.",
    findings: {
      1: ["Market research says servicing quality matters, but it does not isolate account maintenance.", "T3 and Kitces point to platform satisfaction, integration and repeated handling as competitive context. They justify a servicing-quality hypothesis, not a maintenance-specific ROI claim; internal volume, failure and cost baselines still need to size the investment."],
      2: ["Competitor evidence shows guided maintenance exists, but not that complex changes finish end to end.", "Schwab and Altruist public references show adjacent digital workflows, beneficiary updates, notifications and records. They do not prove household authority, third-party POA, rejected work, evidence retention or cross-team recovery work across every account state."],
      3: ["Customer research surfaces authority, waiting and confirmation friction, but the operating personas remain unvalidated.", "Forum themes and advisor-survey synthesis reveal where the work can hurt: missing authority, unclear status and uncertain completion. The study still needs service-associate and reviewer interviews before translating those themes into requirements."],
      4: ["Candidate outcomes concentrate opportunity around incomplete requests and exception recovery.", "The highest-value directional outcomes cluster around establishing scope, collecting requirements, resolving rejected work and proving completion. A formal ODI survey should test importance and satisfaction, then use factor and cluster analysis to confirm segments before these scores become investment evidence."],
      5: ["The maintenance job structure should stay stable while solutions change.", "The job map treats the requested change as the stable unit of progress: define the change, locate account scope, prepare requirements, confirm authority, execute, monitor, modify and conclude. Each transition needs a named owner, visible missing evidence and proof that the account scope changed correctly."],
      0: ["The cross-section finding is dependency sequencing: validate the request first, then expand authority.", "Household authority scores high, but multi-account changes amplify the same missing-information and exception problems. Shared request checks, recovery paths and completion evidence are the prerequisite to scaling account-change automation."],
      7: ["The recommendation is a measured pilot, not a blanket rebuild of account maintenance.", "Start with one bounded maintenance function and compare first-pass completion, rework, exception aging and resolution quality against a baseline before expanding authority, servicing scope or automation depth."],
      8: ["The sourcing decision depends on reusable services and internal economics, not vendor feature parity alone.", "Inventory identity, authority, validation, audit and retention services before choosing build, partner or acquire. Public research can frame the options; Fidelity’s tech debt, operating ownership, support burden and integration cost determine the decision."],
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
  },
  reporting: {
    conclusion: "Prioritize governed client report production, with traceable data and accountable review from assembly to delivery.",
    rationale: "Reporting value depends on the work around the document: reconciling source data, resolving blockers, explaining results and obtaining approval. Start with a bounded reporting workflow and prove that it reduces preparation and review effort while preserving the evidence behind every client report.",
    findings: {
      thesis: ["Reporting investment should reduce preparation work without weakening review.", "Test assembly through delivery in one bounded workflow; broader funding should depend on measured effort reduction and retained review evidence."],
      market: ["AI-drafted reports need trusted data, review and delivery controls.", "Vendors already advertise report drafting and delivery. Test whether their reports use reconciled data, receive the right review and reach the intended client; verify each claim before selecting a tool."],
      capabilities: ["Test whether report data, access checks and approvals work together.", "A product feature list cannot prove that report values reconcile to their sources or that only authorized staff can approve them. Test those connections against Fidelity’s systems."],
      customer: ["Advisors, clients and reviewers need different things from the same report.", "Advisors need preparation efficiency, clients need understandable results and home office needs review evidence; validate the tradeoffs within a defined segment."],
      outcomes: ["Reports must explain the household and make unfinished work visible.", "Unify context, Explain results, Unblock work, Route ownership and Prove completion; validate which failure creates the greatest burden before ranking investment."],
      job: ["A finished report file still needs approval, delivery and follow-up.", "Source preparation, review, delivery and follow-up determine completion; carry evidence and ownership through the whole path to address avoidable rework."],
      recommendations: ["Resolve missing data and review holds before expanding report delivery.", "Sequence the profile-specific recommendations around those prerequisites, then test accountable routing and controlled delivery in the pilot."],
      sourcing: ["Choose reporting tools by their connection costs and ongoing support needs.", "Reuse suitable data and control services; compare specialist partners on reconciliation, permissions, support burden and total cost-to-integrate."],
      governance: ["Client reports need checked sources and the required reviewer’s approval.", "Make applicable disclosures, review and retention part of the workflow design; compliance and security must confirm the controls before operational use."],
      measurement: ["Expand the reporting pilot only after measured gains and control checks pass.", "Track preparation time, rework and audit retrieval alongside support cost; agree success and stop thresholds before the pilot starts."],
      sources: ["Fidelity’s systems, costs and staffing still need internal assessment.", "Public research and synthetic examples frame hypotheses; internal discovery must resolve applicability, feasibility and economics before final guidance."],
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
  },
};

const methodologyBoundaries = {
  maintenance: [
    [
      "Stable job structure",
      "Use the account-change job as the stable frame over time: define, locate, prepare, confirm, execute, monitor, modify and conclude. Interfaces and vendors can change without changing the core job.",
    ],
    [
      "Directional outcomes only",
      "Current outcome scores are synthesis estimates from secondary research and executive-study inputs. They should guide discovery, not stand in for a statistically valid ODI opportunity score.",
    ],
    [
      "Survey and segmentation next",
      "A formal ODI survey should measure importance and satisfaction for each desired outcome, then use factor and cluster analysis to identify needs-based segments and real priority order.",
    ],
    [
      "Quadrant strategy",
      "Underserved outcomes are candidates for investment, table-stakes outcomes must be maintained, overserved outcomes can be simplified or deprioritized, and low-importance gaps should usually be ignored.",
    ],
  ],
  reporting: [
    [
      "Stable job structure",
      "Use the reporting job as the stable frame over time: define, locate, prepare, confirm, execute, monitor, modify and conclude. Report formats can change without changing the underlying job.",
    ],
    [
      "Directional outcomes only",
      "Reporting scores are retained synthesis estimates. They frame discovery and prototype coverage, but they are not a statistically validated ODI survey result.",
    ],
    [
      "Survey and segmentation next",
      "A formal ODI survey should measure importance and satisfaction, then apply factor and cluster analysis before segment-specific funding decisions.",
    ],
    [
      "Quadrant strategy",
      "Use underserved, table-stakes, overserved and lower-priority zones as strategy prompts, not proof. The next research step decides which zone each outcome truly occupies.",
    ],
  ],
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

export default function StrategyExecutiveSummary({ track, sections, onJump }) {
  const summary = summaries[track];
  return (
    <section className="strategy-executive" aria-labelledby={`${track}-executive-heading`}>
      <header className="strategy-executive-heading">
        <span className="strategy-executive-icon"><Compass size={24} aria-hidden="true" /></span>
        <div><span className="am-eyebrow">Leadership brief</span><h2 id={`${track}-executive-heading`}>Executive summary</h2></div>
      </header>
      <div className="strategy-executive-conclusion">
        <span className="am-eyebrow">Recommendation</span>
        <h3>{summary.conclusion}</h3>
        <p>{summary.rationale}</p>
      </div>
      <section className="strategy-methodology" aria-labelledby={`${track}-method-heading`}>
        <div className="strategy-methodology-heading">
          <Layers3 size={18} aria-hidden="true" />
          <div>
            <span className="am-eyebrow">ODI / JTBD method boundary</span>
            <h3 id={`${track}-method-heading`}>Use the method as a research frame; validate the scores before scaling.</h3>
          </div>
        </div>
        <dl>
          {methodologyBoundaries[track].map(([title, text]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <h3 className="strategy-executive-label">Findings by section</h3>
      <div className="strategy-executive-findings">
        {sections.map((section, index) => (
          <ExecutiveFinding key={`${track}-${section.id}`} track={track} section={section} index={index} onJump={onJump} />
        ))}
      </div>
      <div className="strategy-executive-decisions">
        <section aria-labelledby={`${track}-assumptions-heading`}>
          <h3 id={`${track}-assumptions-heading`}><ClipboardCheck size={19} aria-hidden="true" />Assumptions to validate</h3>
          <p className="strategy-executive-boundary">External market research and synthetic prototype evidence are sufficient to frame investment hypotheses. Fidelity-specific discovery must establish operational fit, feasibility and economics before final implementation guidance or a commitment to scale.</p>
          <dl>{summary.assumptions.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        </section>
        <section aria-labelledby={`${track}-next-steps-heading`}>
          <h3 id={`${track}-next-steps-heading`}><Flag size={19} aria-hidden="true" />Next steps</h3>
          <ol>{summary.steps.map(([title, text]) => <li key={title}><strong>{title}</strong><p>{text}</p></li>)}</ol>
        </section>
      </div>
    </section>
  );
}
