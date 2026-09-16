import { ArrowUpRight, ClipboardCheck, Compass, Flag } from "lucide-react";
import "./StrategyExecutiveSummary.css";

const summaries = {
  maintenance: {
    conclusion: "Prioritize shared validation and exception resolution, then extend to household authority.",
    rationale: "A maintenance request crosses account scope, authority, evidence and review. A common servicing path is the strongest starting investment hypothesis: reduce incomplete submissions, make ownership visible and confirm the change through to completion. Fund discovery and a bounded pilot before committing to a broader rollout.",
    findings: {
      1: ["Platform ratings cannot establish the maintenance business case.", "The research measures broader platform experience; size this investment with internal servicing volumes, failure rates and handling costs."],
      2: ["Public feature lists cannot establish end-to-end maintenance parity.", "Authority types, account states and recovery paths determine whether a change can finish; test those boundaries before declaring a competitive gap."],
      3: ["The people doing the work remain the largest research blind spot.", "Advisor surveys and forum themes provide indirect evidence. Observe service associates and home-office reviewers before committing to requirements."],
      4: ["Submission quality is the first investment hypothesis.", "Re-entry, incomplete information and exception resolution lead the directional priorities; validate their frequency and burden before funding automation."],
      5: ["Completion depends on accountable handoffs from request to confirmation.", "Authority, review and exception recovery cross teams. Give each transition a named owner and evidence that the requested change took effect."],
      0: ["Validation must precede household authority, even when authority scores higher.", "Multi-account actions inherit submission and exception risks; sequence the roadmap by this dependency rather than score alone."],
      7: ["One shared validation pilot can test the case for broader investment.", "Start with a bounded maintenance function and compare first-pass completion and rework with the baseline before expanding authority or servicing scope."],
      8: ["A sourcing decision is premature until internal reuse and integration costs are known.", "Inventory existing validation, identity and audit services; build or partner only for confirmed gaps with an accountable support owner."],
    },
    assumptions: [
      ["Demand and servicing model", "Validate request volumes, failure points and differences across custody, clearing and assisted servicing. Fidelity’s organizational complexity and handoffs may change the priority order."],
      ["Systems, data and economics", "Confirm technology debt, account and party data constraints, authority records, reusable services, support burden and cost-to-integrate. Current evidence does not establish delivery effort or return on investment."],
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
      thesis: ["The investment case rests on reducing reporting work while preserving control.", "Test assembly through delivery in one bounded workflow; broader funding should depend on measured effort reduction and retained review evidence."],
      market: ["Generation alone is an insufficient basis for differentiation.", "The reviewed vendors already describe assembly, narrative and delivery capabilities; focus the competitive thesis on reliable coordination and verify vendor claims."],
      capabilities: ["The strategic gap to test lies between data, permissions and approval.", "Feature coverage cannot prove a report is reconciled and ready to release. Assess those handoffs against Fidelity’s actual systems before choosing a solution."],
      customer: ["One reporting workflow will not fit every stakeholder’s job.", "Advisors need preparation efficiency, clients need understandable results and home office needs review evidence; validate the tradeoffs within a defined segment."],
      outcomes: ["Reliable execution is the common thread across the five proposed outcomes.", "Unify context, Explain results, Unblock work, Route ownership and Prove completion; validate which failure creates the greatest burden before ranking investment."],
      job: ["Document creation is only one step in the reporting job.", "Source preparation, review, delivery and follow-up determine completion; carry evidence and ownership through the whole path to address avoidable rework."],
      recommendations: ["Trusted data and visible blockers must come before scaled report release.", "Sequence the profile-specific recommendations around those prerequisites, then test accountable routing and controlled delivery in the pilot."],
      sourcing: ["Integration economics should determine the sourcing choice.", "Reuse suitable data and control services; compare specialist partners on reconciliation, permissions, support burden and total cost-to-integrate."],
      governance: ["Release readiness requires verified evidence and an accountable approval path.", "Make applicable disclosures, review and retention part of the workflow design; compliance and security must confirm the controls before operational use."],
      measurement: ["The strategy has no defensible scale case until the pilot beats a measured baseline.", "Track preparation time, rework and audit retrieval alongside support cost; agree success and stop thresholds before the pilot starts."],
      sources: ["External evidence supports a direction, not a Fidelity implementation mandate.", "Public research and synthetic examples frame hypotheses; internal discovery must resolve applicability, feasibility and economics before final guidance."],
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
            <span><span className="strategy-executive-section-label">{section.label}</span><strong>{summary.findings[section.id][0]}</strong><span className="strategy-executive-finding-text">{summary.findings[section.id][1]}</span></span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
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
