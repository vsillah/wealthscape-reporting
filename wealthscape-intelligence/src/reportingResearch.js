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
// This comparison records evidence coverage, not vendor quality or satisfaction.
export const reportingComparisonColumns = [
  "Report design",
  "Batch generation",
  "Client delivery",
  "Access controls",
];
export const reportingComparison = [
  {
    name: "Addepar",
    cells: [
      {
        described: true,
        reference: 0,
        note: "The reporting update describes shared templates and report creation workflows.",
      },
      {
        described: false,
        reference: 0,
        note: "Scheduled batch generation was not assessed in the retained Addepar reference. This is not evidence of a missing capability.",
      },
      {
        described: true,
        reference: 0,
        note: "The reporting update describes coordinated report distribution workflows.",
      },
      {
        described: true,
        reference: 0,
        note: "The reporting update describes permissions as part of firm-wide reporting workflows.",
      },
    ],
  },
  {
    name: "Advyzon",
    cells: [
      {
        described: true,
        reference: 1,
        note: "The portfolio-management page describes branded report components and configurable investment data.",
      },
      {
        described: true,
        reference: 1,
        note: "The portfolio-management page describes scheduled batch report generation.",
      },
      {
        described: true,
        reference: 2,
        note: "The portal page describes branded access, interactive reports, and client action items.",
      },
      {
        described: false,
        reference: 2,
        note: "Detailed permission controls were not assessed in the retained Advyzon references. Validate them in a product teardown.",
      },
    ],
  },
];

export function reportingQuadrant(outcome) {
  if (outcome.imp >= 5)
    return outcome.sat < 5 ? "Underserved opportunity" : "Table stakes";
  return outcome.sat < 5 ? "Lower priority" : "Overserved";
}
// Coordinates preserve source values. Label displacement prevents overlapping
// buttons; the chart retains an anchor and leader line to each exact coordinate.
export function reportingPlot(outcomes, zoom = false) {
  const bounds = zoom
    ? {
        xMin: Math.max(
          0,
          Math.floor(Math.min(...outcomes.map((o) => o.sat))) - 0.5,
        ),
        xMax: Math.min(
          10,
          Math.ceil(Math.max(...outcomes.map((o) => o.sat))) + 0.5,
        ),
        yMin: Math.max(
          0,
          Math.floor(Math.min(...outcomes.map((o) => o.imp))) - 0.5,
        ),
        yMax: 10,
      }
    : { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
  const points = [];
  for (const outcome of outcomes) {
    const x =
      70 + ((outcome.sat - bounds.xMin) / (bounds.xMax - bounds.xMin)) * 480;
    const y =
      365 - ((outcome.imp - bounds.yMin) / (bounds.yMax - bounds.yMin)) * 300;
    let label = { x, y };
    outer: for (let ring = 0; ring < 12; ring++) {
      for (let angle = 0; angle < 8; angle++) {
        const candidate = {
          x: Math.max(
            82,
            Math.min(538, x + Math.cos((angle * Math.PI) / 4) * ring * 29),
          ),
          y: Math.max(
            77,
            Math.min(353, y + Math.sin((angle * Math.PI) / 4) * ring * 29),
          ),
        };
        if (
          points.every(
            (point) =>
              Math.hypot(
                point.label.x - candidate.x,
                point.label.y - candidate.y,
              ) >= 28,
          )
        ) {
          label = candidate;
          break outer;
        }
      }
    }
    points.push({
      id: outcome.id,
      x,
      y,
      label,
      quadrant: reportingQuadrant(outcome),
    });
  }
  return { bounds, points };
}

export const reportingJourney = [
  {
    step: "Define",
    label: "Agree the reporting need",
    tone: "neutral",
    client:
      "A review date, market event, or client question creates a reporting request.",
    operations:
      "Confirm audience, period, accounts, and purpose before work begins.",
    friction: "An unclear brief becomes a late scope change.",
    handoff: "Advisor → reporting owner: a written scope and due date.",
    response:
      "Capture audience, account scope, and report type in the builder.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Define report scope",
    proof: "Agreed scope, reporting period, recipient, and accountable owner.",
  },
  {
    step: "Locate",
    label: "Find the right inputs",
    tone: "friction",
    client: "The client expects the report to explain the whole relationship.",
    operations:
      "Locate positions, prices, transactions, and account context for the agreed period.",
    friction:
      "Missing or inconsistent inputs send the team back to source systems.",
    handoff:
      "Reporting owner → data owner: a list of required and missing inputs.",
    response:
      "Show source coverage and mapping before the report is assembled.",
    layer: "integrations",
    action: "Inspect source mapping",
    proof: "Input inventory with source, as-of time, coverage, and exceptions.",
  },
  {
    step: "Prepare",
    label: "Assemble a consistent draft",
    tone: "neutral",
    client: "The report should use familiar branding and relevant sections.",
    operations: "Apply a reusable template to reconciled data.",
    friction: "Repeated exports and manual formatting create rework.",
    handoff:
      "Data owner → report preparer: an accepted input set and unresolved exceptions.",
    response:
      "Keep report composition, data choices, and reusable sections in one workspace.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Assemble the report",
    proof: "Template version, selected sections, and accepted input set.",
  },
  {
    step: "Confirm",
    label: "Resolve review friction",
    tone: "friction",
    client:
      "The explanation needs to fit the client’s account and product context.",
    operations:
      "Confirm data completeness, disclosures, narrative accuracy, and review ownership.",
    friction:
      "A reviewer may return the draft without a clear correction owner.",
    handoff:
      "Preparer → reviewer → correction owner: a specific issue and resolution record.",
    response: "Keep the draft, review context, and requested changes together.",
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Review report content",
    proof:
      "Named reviewer, completed checks, exceptions, and approval decision.",
  },
  {
    step: "Execute",
    label: "Generate the output",
    tone: "positive",
    client: "The client is waiting for a usable, consistent report.",
    operations: "Generate from the reviewed inputs and retain a run record.",
    friction: "An opaque failure can trigger another manual rebuild.",
    handoff:
      "Reviewer → report operator: the approved version and generation status.",
    response:
      "Make pipeline stages and failures inspectable; retain the output version.",
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect generation",
    proof: "Input and output versions, run status, and generation history.",
  },
  {
    step: "Monitor",
    label: "Check delivery readiness",
    tone: "neutral",
    client: "The client needs to know what is ready and what needs follow-up.",
    operations: "Track completion, exceptions, and delivery status separately.",
    friction: "A completed job may be mistaken for a delivered or read report.",
    handoff:
      "Report operator → advisor: output status and outstanding delivery work.",
    response:
      "Separate processing status from client engagement; define pilot measures.",
    layer: "insights",
    action: "Inspect monitoring concepts",
    proof:
      "Definitions and records for generated, reviewed, delivered, and viewed states.",
  },
  {
    step: "Modify",
    label: "Revise with context",
    tone: "friction",
    client: "A client question or review finding requires a correction.",
    operations:
      "Change the relevant content while preserving the reason and review history.",
    friction:
      "Corrections can create competing versions or repeat earlier checks.",
    handoff:
      "Advisor / reviewer → preparer: requested change, owner, and due date.",
    response:
      "Revise the report in context and route material changes through review again.",
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Revise the report",
    proof: "Change reason, new version, and renewed review where required.",
  },
  {
    step: "Conclude",
    label: "Deliver and follow through",
    tone: "positive",
    client: "The client reads the explanation and asks the next question.",
    operations: "Deliver the approved version and assign follow-up ownership.",
    friction:
      "A static attachment can separate the conversation from its evidence.",
    handoff:
      "Advisor → client → advisor: report context and a traceable next action.",
    response:
      "Present the report in the client portal with contextual follow-up.",
    layer: "portal",
    action: "Inspect client delivery",
    proof:
      "Approved output, delivery record, follow-up owner; live receipt is outside this demo.",
  },
];
