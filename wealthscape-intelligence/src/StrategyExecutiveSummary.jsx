import { ArrowUpRight, ClipboardCheck, Compass, Flag } from "lucide-react";
import "./StrategyExecutiveSummary.css";

const summaries = {
  maintenance: {
    conclusion: "Prioritize shared validation and exception resolution, then extend to household authority.",
    rationale: "A maintenance request crosses account scope, authority, evidence and review. A common servicing path is the strongest starting investment hypothesis: reduce incomplete submissions, make ownership visible and confirm the change through to completion. Fund discovery and a bounded pilot before committing to a broader rollout.",
    findings: {
      1: "Market benchmarks support better servicing and integration; they do not establish maintenance-specific savings.",
      2: "Validate the complete maintenance job: documented features alone cannot prove authority coverage or exception handling.",
      3: "Direct research with service associates and home-office teams is the critical evidence gap.",
      4: "Data re-entry, incomplete submissions and exception resolution are the leading priorities to validate.",
      5: "Every authority handoff needs an owner, a recovery path and confirmation that the change is complete.",
      0: "Shared validation is the prerequisite for broader authority handling; sequence investment around that dependency.",
      7: "Pilot the common validation path and measure rework before expanding across maintenance functions.",
      8: "Assess reusable internal services first; cost the remaining build and partner options before a sourcing decision.",
    },
    assumptions: [
      ["Demand and servicing model", "Validate request volumes, failure points and differences across custody, clearing and assisted servicing. Fidelity’s organizational complexity and handoffs may change the priority order."],
      ["Systems, data and economics", "Confirm tech debt, account and party data constraints, authority records, reusable services and cost-to-integrate. Current evidence does not establish delivery effort or return on investment."],
      ["Controls and accountability", "Validate the compliance process and security architecture for permissions, authority, review and evidence retention. Name operating ownership for exceptions, support and policy changes."],
    ],
    steps: [
      ["Establish an internal baseline", "Observe service associates, advisors and home-office reviewers. Measure assisted volume, incomplete submissions, rework and time to resolution by request type."],
      ["Assess the servicing architecture", "Map account identity, authority, validators and audit services with engineering and data owners. Compare reuse, build and partner costs against actual constraints."],
      ["Scope one accountable pilot", "Choose a bounded maintenance request and servicing population. Agree on operational ownership, escalation, compliance review and security requirements before connecting systems."],
      ["Make the scale decision", "Set success and stop thresholds against the baseline. At the proposed ninety-day gate, review completion quality, support burden and cost before extending to household authority."],
    ],
  },
  reporting: {
    conclusion: "Prioritize governed client report production, with traceable data and accountable review from assembly to delivery.",
    rationale: "Reporting value depends on the work around the document: reconciling source data, resolving blockers, explaining results and obtaining approval. Start with a bounded reporting workflow and prove that it reduces preparation and review effort while preserving the evidence behind every client report.",
    findings: {
      thesis: "Back a measured reporting pilot with clear data ownership and review responsibilities before funding production integration.",
      market: "The reviewed market spans assembly, narrative and delivery; vendor announcements require capability-level verification.",
      capabilities: "Evaluate the gaps between connected capabilities, including reconciliation, permissions and approval, rather than feature counts.",
      customer: "Advisor, client and home-office needs point to different reporting jobs; validate them by segment and servicing model.",
      outcomes: "Unify, Explain, Unblock, Route and Prove frame the opportunity; their priority remains a strategic hypothesis.",
      job: "Carry source context and ownership through preparation, review, delivery and follow-up to reduce avoidable handoffs.",
      recommendations: "Sequence the selected profile’s recommendations around trusted data, visible blockers and governed report release.",
      sourcing: "Reuse established data and control services where they fit; compare specialist partners against integration and ownership costs.",
      governance: "Confirm applicable approval, disclosure and recordkeeping controls before report release becomes operational.",
      measurement: "Set preparation, rework and audit-retrieval baselines; use measured pilot results to decide whether to scale or stop.",
      sources: "Public research establishes market context; source caveats and unverified claims remain visible in the evidence register.",
    },
    assumptions: [
      ["Demand and operating model", "Validate reporting frequency, segment needs and the split of work among advisors, service teams and home office. Fidelity’s organizational complexity and servicing model may change the proposed workflow."],
      ["Data, architecture and cost", "Assess tech debt, data constraints, lineage, reconciliation and entitlement services. Validate cost-to-integrate and support costs before choosing an assembly or narrative solution."],
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
      <h3 className="strategy-executive-label">Findings by section</h3>
      <div className="strategy-executive-findings">
        {sections.map((section, index) => (
          <button type="button" key={section.id} className="strategy-executive-finding" onClick={() => onJump(section.id)} aria-label={`Read section ${index + 1}: ${section.label}`}>
            <span className="strategy-executive-number">{String(index + 1).padStart(2, "0")}</span>
            <span><strong>{section.label}</strong><span className="strategy-executive-finding-text">{summary.findings[section.id]}</span></span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="strategy-executive-decisions">
        <section aria-labelledby={`${track}-assumptions-heading`}>
          <h3 id={`${track}-assumptions-heading`}><ClipboardCheck size={19} aria-hidden="true" />Assumptions to validate</h3>
          <p className="strategy-executive-boundary">This strategy draws on external market research and synthetic prototype evidence. Fidelity-specific discovery must validate the assumptions below before final implementation guidance or a funding commitment.</p>
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
