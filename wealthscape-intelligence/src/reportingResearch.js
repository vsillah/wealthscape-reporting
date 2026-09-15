// Reporting strategy synthesis. Scores and personas come from the existing
// strategy packet; they are discovery inputs, not measured customer results.
export const reportingScore = (outcome) =>
  outcome.imp + Math.max(outcome.imp - outcome.sat, 0);
export const reportingSources = {
  packet: {
    label: "Broker-dealer strategy packet · July 2026",
    href: "https://github.com/vsillah/wealthscape-reporting/blob/main/docs/broker-dealer-strategy-expansion.md",
  },
  addepar: {
    label: "Addepar · reporting workflows, June 2026",
    href: "https://addepar.com/blog/enhanced-reporting-transforms-operations",
  },
  advyzon: {
    label: "Advyzon · portfolio management and reporting",
    href: "https://www.advyzon.com/advyzon-portfolio-management/",
  },
  portal: {
    label: "Advyzon · client portal",
    href: "https://www.advyzon.com/client-portal/",
  },
};
export const reportingCompetitors = [
  {
    name: "Addepar",
    focus: "Reporting at firm scale",
    icon: "layers",
    source: "addepar",
    evidence:
      "Addepar describes coordinated templates, permissions, and report distribution workflows.",
    implication:
      "Test whether shared templates and clear ownership reduce repeat assembly for each reporting cycle.",
    gap: "The prototype shows report configuration and generation. Firm-wide permissions and distribution controls still require validation.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Inspect report assembly",
  },
  {
    name: "Advyzon",
    focus: "Portfolio reporting",
    icon: "chart",
    source: "advyzon",
    evidence:
      "Advyzon describes branded report components, scheduled batch generation, and portal sharing.",
    implication:
      "Make reusable report composition the baseline; measure the remaining manual preparation work.",
    gap: "The prototype demonstrates one report pipeline. Scheduled batch processing is not implemented.",
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect generation",
  },
  {
    name: "Advyzon",
    focus: "Client delivery",
    icon: "users",
    source: "portal",
    evidence:
      "Advyzon describes a branded portal with interactive reports and client action items.",
    implication:
      "Connect the report to a client conversation and a clear next step.",
    gap: "The client portal is a synthetic interaction demo. Live delivery and client engagement measurement are outside this prototype.",
    layer: "portal",
    sub: {},
    action: "Inspect client portal",
  },
];

const outcomeGaps = {
  "BD-HA #1":
    "Relationship context is split across advisory, brokerage, planning, and product workflows.",
  "BD-HA #2":
    "Report preparation must reconcile distinct account contexts and disclosure requirements.",
  "BD-HA #3":
    "The team cannot quickly distinguish a missing-data issue from a suitability or supervision hold.",
  "BD-HA #4":
    "Handoffs lose the owner, evidence, or next action needed to resolve a blocker.",
  "BD-HA #5":
    "A polished narrative alone does not establish that product and account context were reviewed.",
  "BD-HO #1":
    "Risk signals reach the home office through separate systems and queues.",
  "BD-HO #2":
    "AI narrative activity lacks a single view of policy status and review ownership.",
  "BD-HO #3":
    "Adoption, supervision workload, and business context are difficult to assess together.",
  "BD-HO #4":
    "Field friction needs a named intervention owner before the issue can be resolved.",
  "BD-HO #5":
    "Fragmented support and adoption signals make retention concerns difficult to investigate.",
  "BD-HO #6":
    "Closure status alone does not explain which evidence supported the supervisory action.",
  "BD-OSJ #1":
    "Local exception queues need client impact and severity alongside age.",
  "BD-OSJ #2":
    "Home-office findings require translation into an action the rep can complete.",
  "BD-OSJ #3":
    "Repeated exceptions need rep-level context before coaching can be targeted.",
  "BD-OSJ #4":
    "Branch-to-home-office escalation can separate the issue from its supporting context.",
  "BD-OSJ #5":
    "Reviewed exceptions need a traceable evidence and closure record.",
  "ODI #5.1":
    "Branded report assembly is spread across output, narrative, and presentation tools.",
  "ODI #5.3":
    "Separate providers and field mappings create reconciliation work.",
  "ODI #13":
    "An insight can lose its client context when the advisor changes tools.",
  "ODI #7":
    "Event signals need to identify the affected client and a useful next action.",
  "ODI #8":
    "Manual watchlists make allocation and tax-window review difficult to repeat.",
  "ODI #8.2":
    "Static output gives the client little room to explore the report.",
  "ODI #1":
    "The advisor must assemble a daily priority list from scattered signals.",
  "ODI #12":
    "Client review and engagement signals need a consistent follow-up path.",
  "ODI #15":
    "Report completion alone does not explain the validation and review history.",
  "ODI #8.1":
    "Client questions can lose the report context when they move to another channel.",
  "ODI #8.4":
    "Advisors need a reliable signal that a delivered report has been viewed.",
};
const reportOutcomeTabs = {
  "BD-HA #2": "customize",
  "BD-HA #5": "customize",
  "BD-HO #2": "customize",
  "BD-HO #6": "generate",
  "BD-OSJ #4": "build",
  "BD-OSJ #5": "generate",
};
export function reportingOutcomeDetail(outcome, strategy) {
  const recommendation = strategy.recommendations.find((item) =>
    item.outcomes.includes(outcome.id),
  );
  const reportTab = reportOutcomeTabs[outcome.id];
  const layer = reportTab
    ? "reports"
    : outcome.layer === "strategy"
      ? "morning"
      : outcome.layer;
  return {
    problem: outcome.text,
    gap:
      outcomeGaps[outcome.id] ||
      "This outcome needs a validated baseline and a confirmed workflow owner.",
    response:
      recommendation?.body ||
      "Preserve the signal, affected client, and next action in one reviewable workflow.",
    layer,
    sub: reportTab ? { reportTab } : outcome.sub || {},
    action:
      layer === "reports"
        ? `Open ${reportTab || outcome.sub?.reportTab || "build"} report tab`
        : `Open ${layer === "morning" ? "lifecycle dashboard" : layer === "portal" ? "client portal" : layer === "integrations" ? "integration hub" : "analytics"}`,
    evidence: outcome.id.startsWith("BD-")
      ? "Broker-dealer strategy packet: illustrative persona and synthesis scores. UX response is a proposed interpretation of the mapped recommendation."
      : "Legacy reporting strategy inputs: outcome ratings are retained as directional estimates; a supporting interview dataset is not linked in this prototype.",
    limitation:
      layer === "reports"
        ? "Implemented demo: report configuration and a simulated generation pipeline. Policy approval, retention, and live delivery are not established by this screen."
        : layer === "morning"
          ? "Related demo: the lifecycle dashboard shows synthetic maintenance readiness. The full reporting priority and relationship view remains a proposed extension."
          : "Implemented demo: synthetic data and interactions. Live data, predictive accuracy, and operational outcomes have not been validated.",
  };
}
export const reportingStepDetails = [
  {
    layer: "morning",
    action: "Open lifecycle dashboard",
    detail:
      "Start with the client or operating priority that makes a report necessary.",
    proof: "A named objective and the affected relationship.",
  },
  {
    layer: "morning",
    action: "Inspect lifecycle context",
    detail:
      "Gather the relevant client signals before choosing report content.",
    proof: "The accounts, products, and open issues in scope.",
  },
  {
    layer: "integrations",
    action: "Inspect data preparation",
    detail:
      "Review the connected-data model and field mapping that would feed reporting.",
    proof: "A source and owner for each required data field.",
  },
  {
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Review report context",
    detail:
      "Check the narrative, disclosures, and report sections before generation.",
    proof: "A human review decision and a list of unresolved checks.",
  },
  {
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect report generation",
    detail:
      "Follow the simulated pipeline from assembled inputs to a report preview.",
    proof: "An output linked to its generation and review history.",
  },
  {
    layer: "insights",
    action: "Open analytics",
    detail:
      "Inspect illustrative monitoring signals and decide which measures belong in a pilot.",
    proof:
      "Defined measures for reporting effort, exceptions, and client response.",
  },
  {
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Revise report assembly",
    detail: "Adjust content or scope when review uncovers a gap.",
    proof: "A revision with a clear reason and another review when required.",
  },
  {
    layer: "portal",
    action: "Inspect client delivery",
    detail:
      "Show the report in the client experience and preserve the next conversation.",
    proof:
      "A delivery and follow-up record; live receipt is outside this demo.",
  },
];
