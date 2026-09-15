// Discovery proposals paired with inspectable synthetic surfaces. A related
// maintenance demo demonstrates a reusable interaction, not reporting coverage.
const demos = {
  relationship: {
    icon: "users",
    layer: "portal",
    sub: { portalTab: "overview" },
    action: "Inspect household overview",
    demonstrated:
      "The client portal shows a synthetic household portfolio, allocation, performance, and advisor message.",
    limitation:
      "The complete brokerage, advisory, planning, annuity, and cash relationship is not implemented.",
  },
  blockers: {
    icon: "alert",
    layer: "maintenance",
    sub: { maintenanceView: "queue", statusFilter: "Blocked" },
    action: "Inspect related blocked-work queue",
    demonstrated:
      "A profile-scoped maintenance queue filters blocked work and exposes the owner, missing checks, and case details.",
    limitation:
      "This is a related maintenance pattern. Reporting, suitability, and product-eligibility blockers are not unified here.",
  },
  routing: {
    icon: "route",
    layer: "maintenance",
    sub: { maintenanceView: "queue", statusFilter: "Open" },
    action: "Inspect related ownership workflow",
    demonstrated:
      "The open maintenance queue leads to synthetic cases with owner routing, evidence checks, and a session timeline.",
    limitation:
      "This demonstrates a handoff pattern; live reporting tasks, coaching, escalation, and service-level enforcement are not implemented.",
  },
  customize: {
    icon: "review",
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Inspect report customization",
    demonstrated:
      "The Customize tab provides a synthetic report-editing surface for reviewing presentation and narrative context.",
    limitation:
      "It does not prove approved language, enforced AI policy, supervisory sign-off, or durable retention.",
  },
  build: {
    icon: "report",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Inspect report assembly",
    demonstrated:
      "The Build tab lets the user choose a template and clients and inspect the resulting synthetic report preview.",
    limitation:
      "A report preview is not a production escalation packet or a verified source-of-record export.",
  },
  generate: {
    icon: "report",
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect generation pipeline",
    demonstrated:
      "The Generate tab exposes the simulated report pipeline and its visible stage progress.",
    limitation:
      "Stage completion does not establish policy approval, persistent audit records, production execution, or live delivery.",
  },
  analytics: {
    icon: "chart",
    layer: "insights",
    sub: {},
    action: "Inspect related analytics",
    demonstrated:
      "Analytics presents synthetic metrics and trend charts for the selected profile.",
    limitation:
      "These are illustrative views; prioritization, productivity savings, retention prediction, and customer impact are not validated.",
  },
  integrations: {
    icon: "layers",
    layer: "integrations",
    sub: {},
    action: "Inspect integration mapping demo",
    demonstrated:
      "The Integration Hub exposes provider categories, synthetic connection states, and inspectable mapping details.",
    limitation:
      "Connections are simulated. No live provider authorization, data reconciliation, or production entitlement check is established.",
  },
  delivery: {
    icon: "users",
    layer: "portal",
    sub: { portalTab: "documents" },
    action: "Inspect client document view",
    demonstrated:
      "The client portal's Documents tab displays synthetic report and document entries.",
    limitation:
      "Document visibility does not prove secure delivery, a client receipt, engagement measurement, or a messaging service.",
  },
};

// Order follows the existing profile strategy packet. Titles, IDs, and outcome
// mappings remain in that packet; the fields here qualify demo and delivery scope.
export const reportingRecommendationPlans = {
  "bd-hybrid-advisor": [
    [
      "relationship",
      "Product and data engineering: reconcile account identities and product context into one permissioned relationship view.",
      "Confirmed account ownership, product taxonomy, and consent boundaries.",
      "Reconcile a bounded household across products and explain every missing or conflicting record.",
    ],
    [
      "blockers",
      "Operations and platform engineering: connect reporting prerequisites to explicit blocker reasons, owners, and recovery steps.",
      "A shared status contract and accountable owners for data, suitability, and supervision checks.",
      "Trace each reporting hold to its source; prove correction updates the status and prevents premature generation.",
    ],
    [
      "customize",
      "Reporting and compliance owners: govern narrative templates, disclosures, review decisions, and version history for each account context.",
      "Approved content rules, source attribution, reviewer permissions, and a retention design.",
      "Review mixed brokerage/advisory examples; reject unsupported language and retrieve the exact approved version.",
    ],
    [
      "routing",
      "Operations and engineering: route reporting work by blocker type, team ownership, and due date, with escalation and retry handling.",
      "A durable task store, entitlement model, ownership rules, and service-level definitions.",
      "Follow one task through reassignment and escalation; retain its evidence and prevent duplicate or lost work.",
    ],
  ],
  "bd-home-office": [
    [
      "blockers",
      "Supervision and reporting owners: combine report exceptions, review status, and source evidence into an enterprise triage view.",
      "Agreed risk criteria, branch entitlements, and linked evidence records.",
      "Validate triage order with reviewers and trace each priority to its underlying evidence.",
    ],
    [
      "customize",
      "Compliance and AI platform owners: enforce approved use, narrative review, disclosure requirements, and accountable release decisions.",
      "A policy registry, model-use records, reviewer roles, and retained report versions.",
      "Test disallowed use and missing disclosures; show that release remains blocked until the required review completes.",
    ],
    [
      "analytics",
      "Product analytics and operations: connect reporting usage, exceptions, support work, and preparation time with agreed definitions.",
      "Instrumented events, privacy review, denominators, and a measured baseline.",
      "Reconcile dashboard counts to source events and separate adoption changes from measured time savings.",
    ],
    [
      "analytics",
      "Research and operations: investigate reporting friction as a possible retention signal before operationalizing a watchlist.",
      "Consented longitudinal data, validated labels, and an intervention owner.",
      "Measure false positives and test whether an intervention improves outcomes before treating a signal as predictive.",
    ],
  ],
  "bd-osj-principal": [
    [
      "blockers",
      "Branch operations: define report-exception severity, aging, and ownership so principals can prioritize actionable work.",
      "A common exception taxonomy, branch permissions, and source timestamps.",
      "Compare queue priority with reviewer judgment and test recovery for stale or misrouted exceptions.",
    ],
    [
      "routing",
      "Branch leadership: connect repeated reporting exceptions to reviewed coaching actions and documented follow-up.",
      "Reliable issue history, access boundaries, and an accountable coaching owner.",
      "Trace a repeated issue through coaching and follow-up without treating a synthetic pattern as a personnel finding.",
    ],
    [
      "build",
      "Branch and home-office teams: produce versioned escalation packets containing report context, evidence, ownership, and review history.",
      "A durable evidence store, export contract, permissions, and recipient acknowledgment.",
      "Transfer a packet across teams and verify completeness, version identity, access restrictions, and receipt.",
    ],
    [
      "analytics",
      "Product analytics and branch operations: define reporting workload and business-health measures with explicit denominators.",
      "Verified usage and exception events, privacy controls, and a baseline.",
      "Reconcile metrics to underlying work and test their usefulness before using them to allocate resources.",
    ],
  ],
  ria: [
    [
      "analytics",
      "Advisory operations and data engineering: assemble a prioritized reporting brief from validated signals and review obligations.",
      "Fresh source data, ranking criteria, permissions, and a review owner.",
      "Explain each priority and compare it with advisor judgment before claiming preparation-time savings.",
    ],
    [
      "routing",
      "Platform engineering: unify report-related signals into a durable alert store with ownership, resolution state, and recovery routes.",
      "Stable event IDs, deduplication, routing contracts, and delivery monitoring.",
      "Replay duplicate and delayed events; prove that each alert reaches the correct owner and resolution surface.",
    ],
    [
      "generate",
      "Reporting and compliance owners: operationalize generation with versioned inputs, governed narratives, review gates, and retained run evidence.",
      "Production data contracts, approved templates, reviewer permissions, and a retention policy.",
      "Reproduce an approved report and test failure, retry, review, and evidence retrieval before enabling delivery.",
    ],
    [
      "integrations",
      "Data engineering and security: authorize providers, reconcile source fields, and make freshness and entitlement checks explicit.",
      "Provider agreements, scoped credentials, data ownership, and reconciliation rules.",
      "Test missing, stale, conflicting, and unauthorized fields before allowing them into a client report.",
    ],
    [
      "delivery",
      "Client experience and operations: provide permissioned report delivery with version identity, receipts, and accountable follow-up.",
      "Client authentication, delivery consent, retained versions, and messaging ownership.",
      "Verify the intended recipient, revoke access, handle delivery failures, and distinguish availability from an actual client receipt.",
    ],
  ],
};

export function reportingRecommendationDetail(profile, item) {
  const plan = reportingRecommendationPlans[profile.id]?.[item.n - 1];
  const [key, production, dependency, gate] = plan || [
    "build",
    "Product and operations: validate this proposal against the existing reporting stack before implementation.",
    "A confirmed workflow owner and a source-data baseline.",
    "Define acceptance criteria and inspect a bounded reporting example.",
  ];
  return {
    ...demos[key],
    production,
    dependency,
    gate,
    sub: {
      ...demos[key].sub,
      profileId: profile.id,
      recommendationFocus: `${item.title} · Outcomes ${item.outcomes.join(", ")}`,
    },
  };
}
