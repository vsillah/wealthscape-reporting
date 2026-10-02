export const strategyEvidenceTracks = {
  reporting: {
    label: "Reporting modernization",
    shortLabel: "Reporting",
    summary:
      "Reporting confidence depends on proving source data, entitlement checks, reviewer approval and retained evidence around the report workflow.",
    metrics: [
      ["18", "claims in ledger"],
      ["6", "public-safe lifts"],
      ["2", "approval locks"],
      ["55", "modeled current floor"],
    ],
    claims: [
      {
        id: "RR-C01",
        section: "Leadership decision",
        type: "Synthesis",
        score: 58,
        sourceClass: "Derived synthesis",
        claim:
          "Reporting work is not only document generation; the investment question is source reconciliation, blockers, review and delivery evidence.",
        challenge: "Trace strategy-packet source to each supporting sentence before this claim can become client-ready.",
      },
      {
        id: "RR-C02",
        section: "Competitor research",
        type: "Capability",
        score: 72,
        sourceClass: "Primary vendor docs",
        claim:
          "Public competitor evidence supports batch generation, client portal delivery, branded templates and permission-aware report workflows.",
        challenge: "Run product teardown or RFI evidence before treating vendor documentation as parity proof.",
      },
      {
        id: "RR-C03",
        section: "Reporting controls",
        type: "Governance",
        score: 62,
        sourceClass: "Regulatory and derived controls",
        claim:
          "Client reports require checked sources, approved claims, reviewer decisions, retention and retrieval before generated narrative can scale.",
        challenge: "Map the exact report audience, disclosure duty and reviewer path before implementation.",
      },
      {
        id: "RR-C04",
        section: "Recommendations",
        type: "Recommendation",
        score: 54,
        sourceClass: "Synthetic prototype plus strategy packet",
        claim:
          "A bounded reporting workflow should be tested before funding broad reporting automation.",
        challenge: "Needs baseline preparation time, review loops and adoption evidence.",
      },
      {
        id: "RR-C05",
        section: "Outcomes & opportunities",
        type: "Outcome model",
        score: 48,
        sourceClass: "Management estimate",
        claim:
          "Reporting opportunity scores are directional and should not be used as measured ODI evidence.",
        challenge: "Score cap remains until outcome importance and satisfaction are measured.",
      },
      {
        id: "RR-C06",
        section: "Roadmap & decision gates",
        type: "Locked input",
        score: 44,
        sourceClass: "Approval-gated internal data",
        claim:
          "The business case depends on Fidelity preparation time, rework rate, review burden, support cost and production usage.",
        challenge: "Locked until approved internal telemetry or a bounded pilot supplies the data.",
      },
    ],
    challengeResults: [
      ["Pass", "Public source reachability", "Vendor, regulatory and strategy-packet references can be traced from the source register."],
      ["Warn", "Claim-source fit", "Vendor documentation supports capability existence, not product depth or Fidelity implementation readiness."],
      ["Warn", "ODI discipline", "Outcome scores are management estimates and should stay capped until formal importance and satisfaction research is run."],
      ["Locked", "Operational baseline", "Preparation time, review burden, support cost and production adoption require approved internal data or pilot telemetry."],
    ],
    backlog: [
      ["Build now", "Normalize every reporting insight into a claim ledger record with source, score, section and approval status.", "+5"],
      ["Build now", "Run challenge agents for broken links, unsupported claims, contradictions, source independence and recency.", "+4"],
      ["Public-safe", "Complete competitor product teardown notes for report generation, portal delivery, permissions and review evidence.", "+6"],
      ["Licensed", "Add entitled market research uploads for reporting workflow, advisor technology and client reporting benchmarks.", "+5"],
      ["Locked", "Instrument Fidelity preparation time, review loops, report defects, usage, support volume and cost-to-serve.", "+12"],
    ],
    locks: [
      ["Internal telemetry", "Requires executive, data-owner, legal and compliance approval before ingestion."],
      ["Production workflow evidence", "Requires approved pilot telemetry or production-equivalent workflow logs."],
      ["Formal ODI survey", "Requires research approval and a statistically valid sample before outcome scores can graduate."],
    ],
    scorePath: [
      ["Current floor", 55, "Public sources, synthetic prototype and strategy packet support directional framing."],
      ["Public-safe lift", 64, "Claim ledger, challenge agents and product teardown improve traceability without internal data."],
      ["Licensed lift", 72, "Paid advisor-tech and reporting workflow research strengthens external comparators."],
      ["Approved-data lift", 84, "Pilot telemetry and internal workflow measures can support executive investment decisions."],
    ],
  },
  maintenance: {
    label: "Account maintenance",
    shortLabel: "Maintenance",
    summary:
      "Account maintenance confidence depends on moving from public market and capability signals to direct workflow evidence, approved telemetry and formal ODI validation.",
    metrics: [
      ["24", "claims in ledger"],
      ["7", "public-safe lifts"],
      ["3", "approval locks"],
      ["57", "modeled section average"],
    ],
    claims: [
      {
        id: "AM-C01",
        section: "Market research",
        type: "Market context",
        score: 70,
        sourceClass: "Public research and disclosures",
        claim:
          "Custody and clearing market signals support measuring request quality, repeated handling and ownership before expanding automation.",
        challenge: "Keep as market context until Fidelity workflow telemetry is approved.",
      },
      {
        id: "AM-C02",
        section: "Capability comparison",
        type: "Capability",
        score: 60,
        sourceClass: "Primary vendor docs",
        claim:
          "Schwab and Altruist public documentation show adjacent guided workflows, notifications and retained records.",
        challenge: "Vendor docs do not prove full feature completeness or Fidelity parity.",
      },
      {
        id: "AM-C03",
        section: "Customer research",
        type: "Customer signal",
        score: 60,
        sourceClass: "Advisor-facing forum and survey themes",
        claim:
          "Advisor-facing research points to missing authority, unclear status and uncertain completion.",
        challenge: "Needs primary interviews or workflow observation before becoming requirements.",
      },
      {
        id: "AM-C04",
        section: "Outcomes & opportunities",
        type: "Outcome model",
        score: 57,
        sourceClass: "Directional ODI proxy",
        claim:
          "Thirteen candidate outcomes show high importance and low satisfaction in the current directional map.",
        challenge: "Cap score until importance, satisfaction, factor analysis and cluster analysis are completed.",
      },
      {
        id: "AM-C05",
        section: "Job map",
        type: "Derived journey",
        score: 53,
        sourceClass: "Derived synthesis",
        claim:
          "The account-change job should be tracked from request definition through confirmation.",
        challenge: "Needs observed journey frequency and role-by-role workflow evidence.",
      },
      {
        id: "AM-C06",
        section: "Resolution strategy",
        type: "Decision frame",
        score: 48,
        sourceClass: "Approval-gated internal data",
        claim:
          "Build, reuse, partner and acquisition options depend on internal platform maturity, data constraints, cost and controls.",
        challenge: "Locked until executive-approved discovery validates the internal architecture and cost model.",
      },
    ],
    challengeResults: [
      ["Pass", "Public source reachability", "Custodian, clearing, T3, Kitces and regulatory sources are traceable from the appendix."],
      ["Warn", "Customer proximity", "Most current evidence is one step removed from Fidelity maintenance work."],
      ["Warn", "ODI discipline", "Current outcome placement is directional and should not be treated as a completed ODI study."],
      ["Locked", "Internal telemetry", "Request volume, NIGO reasons, repeat handling, cycle time, effort and cost require approval."],
      ["Locked", "Formal ODI study", "Survey, factor analysis and cluster analysis require research approval and participant access."],
    ],
    backlog: [
      ["Build now", "Normalize every maintenance section finding, outcome, recommendation and caveat into the claim ledger.", "+5"],
      ["Build now", "Run challenge agents for claim-source fit, contradiction checks, source independence, recency and synthetic labels.", "+4"],
      ["Public-safe", "Expand peer benchmark repository for Schwab, Pershing, LPL, Altruist, Apex, Axos and TradePMR.", "+6"],
      ["Licensed", "Add entitled custody, clearing and advisor-tech research where it answers a specific market or peer gap.", "+5"],
      ["Approval-gated", "Intake approved interviews, observations, usability sessions and task diaries.", "+7"],
      ["Locked", "Ingest Fidelity request telemetry, NIGO reasons, handoffs, cycle time, effort, escalations and support cost.", "+15"],
      ["Locked", "Run formal desired-outcome survey with factor and cluster analysis.", "+12"],
    ],
    locks: [
      ["Fidelity telemetry", "Highest ROI lift, but requires executive, legal, compliance and data-owner approval."],
      ["Primary workflow research", "Requires participant approval, privacy handling and a research protocol."],
      ["Formal ODI analytics", "Requires approved survey sample, data capture and statistical analysis before scores graduate."],
    ],
    scorePath: [
      ["Current average", 57, "Current section scores are directional and mostly public-source or derived synthesis."],
      ["Public-safe lift", 66, "Claim ledger, challenge agents and peer teardown improve traceability without internal data."],
      ["Licensed lift", 73, "Paid custody, clearing and advisor-tech research strengthens external evidence."],
      ["Approved-data lift", 86, "Internal telemetry, primary workflow research and formal ODI can support executive-grade confidence."],
    ],
  },
};

export const strategyEvidenceTrackOptions = Object.entries(strategyEvidenceTracks).map(
  ([id, track]) => [id, track.shortLabel],
);
