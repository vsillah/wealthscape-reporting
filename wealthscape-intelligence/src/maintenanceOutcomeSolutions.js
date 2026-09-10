// IDs and executive-study scores retain the 18 Aug 2026 slide 18 snapshot.
// Frames coordinates live in LifecycleExperience and are never recomputed here.
export const outcomeSolutions = [
  {
    id: 1,
    score: 8,
    problem:
      "A service associate enters the same account details more than once while making a change.",
    ux: "Capture the household request and affected accounts together, then carry that scope through review and reporting.",
    demo: "Household intake collects synthetic scope and rejects an empty account selection. It does not prefill data from a live account system.",
    action: "Open household intake",
    kind: "intake",
  },
  {
    id: 2,
    score: 7.86,
    problem:
      "A request comes back because required information or evidence was missing.",
    ux: "Show the missing checks beside the request before it reaches human review.",
    demo: "The case checklist holds completion until all three attestations are present and a reviewer confirms. These checks do not inspect documents.",
    action: "Inspect missing evidence",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-101", "MC-102", "MC-104"],
  },
  {
    id: 3,
    score: 7.46,
    problem:
      "An exception waits while staff work out who owns it and what must happen next.",
    ux: "Group blocked requests into an actionable queue with a visible owner and recovery path.",
    demo: "The blocked queue, case owner control, and timeline operate on session data. Service responses and resolution-time savings are not measured.",
    action: "Open exception queue",
    kind: "queue",
    adjacent: true,
  },
  {
    id: 4,
    score: 7.26,
    problem:
      "One household change can require staff to repeat the work for several accounts.",
    ux: "Keep affected accounts visible in one request so review covers the intended scope.",
    demo: "A case shows multiple synthetic accounts together. There is no live multi-account transaction, entitlement engine, or partial-failure recovery.",
    action: "Inspect household scope",
    kind: "case",
    panel: "overview",
    preferred: ["MC-101", "MC-104", "MC-105"],
    adjacent: true,
  },
  {
    id: 5,
    score: 6.48,
    problem:
      "Beneficiary instructions may need to be updated consistently across eligible household accounts.",
    ux: "Review the account list and beneficiary evidence together before confirming the request.",
    demo: "The beneficiary fixture shows scope and evidence attestations. Beneficiary eligibility and live cross-account updates are proposed capabilities.",
    action: "Inspect beneficiary evidence",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-101"],
    adjacent: true,
    fallback: "intake",
  },
  {
    id: 6,
    score: 6.22,
    problem:
      "Outdated account information may remain unnoticed until a review or examination.",
    ux: "Expose the record needing attention, its review owner, and the evidence behind a currency decision.",
    demo: "The periodic-review fixture illustrates an overdue status and evidence packet. It does not detect stale data or evaluate regulatory obligations.",
    action: "Inspect periodic review",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-103"],
    adjacent: true,
  },
  {
    id: 7,
    score: 5.54,
    problem:
      "An acquired book creates account-mapping and authority work that staff must reconcile.",
    ux: "Keep affected registrations, ownership, and unresolved authority visible in a conversion case.",
    demo: "The acquisition fixture illustrates one mixed-registration request. Bulk migration, reconciliation, and rollback remain proposed engineering work.",
    action: "Inspect conversion ownership",
    kind: "case",
    panel: "overview",
    preferred: ["MC-104"],
    adjacent: true,
  },
  {
    id: 8,
    score: 6.58,
    problem:
      "A request depends on service staff, but the next owner or required intervention is unclear.",
    ux: "Name the responsible team and keep its blocker and case history beside the work.",
    demo: "Case ownership can be changed in this session. No request is submitted to Fidelity or another provider.",
    action: "Inspect service routing",
    kind: "case",
    panel: "overview",
    preferred: ["MC-102", "MC-104"],
  },
  {
    id: 9,
    score: 6.2,
    problem:
      "Staff call service to learn where a request stands or who has it.",
    ux: "Expose current status, queue counts, and ownership in the command center.",
    demo: "The dashboard counts visible synthetic requests and links to their work queues. It has no live service-status feed.",
    action: "Open lifecycle command center",
    kind: "dashboard",
  },
  {
    id: 10,
    score: 5.52,
    problem:
      "The wrong authority evidence can delay a change or require another client follow-up.",
    ux: "Place authority requirements beside account scope and keep the review decision explicit.",
    demo: "The authority checklist is an attestation pattern. Legal POA recognition, authority-type rules, and account entitlements are not implemented.",
    action: "Inspect authority checklist",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-104", "MC-101"],
    adjacent: true,
  },
  {
    id: 11,
    score: 6.84,
    problem:
      "Paper handling adds repeated collection and review work to an account change.",
    ux: "Make required evidence and its completion status visible in one packet.",
    demo: "The packet groups synthetic checklist attestations. It does not ingest paper, classify documents, or remove a legal paper requirement.",
    action: "Inspect evidence packet",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-101", "MC-102", "MC-104"],
    adjacent: true,
  },
  {
    id: 12,
    score: 6.5,
    problem:
      "A change waits for a client signature and staff must chase the missing evidence.",
    ux: "Show the missing signature check and next action at the point where the request is blocked.",
    demo: "The beneficiary case exposes a signature attestation and holds review while it is missing. No signature is requested, captured, or legally validated.",
    action: "Inspect signature blocker",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-101"],
    adjacent: true,
  },
  {
    id: 13,
    score: 5.58,
    problem:
      "A periodic account review can be missed when due work is difficult to find.",
    ux: "Keep the review status, owner, and recorded history accessible from the request.",
    demo: "The periodic-review fixture has an overdue label and timeline. There is no scheduling engine, legal timer, or automated compliance assessment.",
    action: "Inspect review history",
    kind: "case",
    panel: "timeline",
    preferred: ["MC-103"],
    adjacent: true,
  },
  {
    id: 14,
    score: 5.64,
    problem:
      "Staff cannot easily tell whether a submitted change is complete and usable downstream.",
    ux: "Separate review completion from submission and make report generation depend on completed evidence.",
    demo: "Reporting prerequisites use current checks and human confirmation. A completed request can produce a synthetic account-change report; no production record is certified.",
    action: "Inspect reporting prerequisites",
    kind: "report",
    preferred: ["MC-105", "MC-106", "MC-103", "MC-101"],
  },
  {
    id: 15,
    score: 4.68,
    problem:
      "Standing instructions or bank links need account-specific evidence before they can be changed.",
    ux: "Keep the affected account, missing bank-link evidence, and responsible service team together.",
    demo: "The standing-instruction fixture shows a bank-link evidence blocker. No bank verification, payment instruction, or money movement occurs.",
    action: "Inspect bank-link evidence",
    kind: "case",
    panel: "evidence",
    preferred: ["MC-102"],
    adjacent: true,
    fallback: "intake",
  },
];

export const normalizeOutcomeSelection = (value) =>
  Number.isInteger(value) && value >= -1 && value < 15 ? value : -1;

// Receives already-scoped cases. Never searches outside the current profile.
export function outcomeDestination(outcomeId, profileId, scopedCases) {
  const solution = outcomeSolutions.find((row) => row.id === outcomeId);
  if (!solution) return null;
  const sub = { profileId };
  if (solution.kind === "dashboard")
    return { layer: "morning", sub, label: solution.action };
  if (solution.kind === "intake")
    return {
      layer: "maintenance",
      sub: { ...sub, maintenanceView: "intake" },
      label: solution.action,
    };
  if (
    solution.kind === "queue" &&
    scopedCases.some((c) => c.status === "Blocked")
  )
    return {
      layer: "maintenance",
      sub: {
        ...sub,
        maintenanceView: "queue",
        statusFilter: "Blocked",
        lifecycleStage: "2",
      },
      label: solution.action,
    };
  const item = solution.preferred
    ?.map((id) => scopedCases.find((c) => c.id === id))
    .find(Boolean);
  if (item)
    return {
      layer: solution.kind === "report" ? "reports" : "maintenance",
      sub: {
        ...sub,
        caseId: item.id,
        ...(solution.kind === "report"
          ? {}
          : { panel: solution.panel, maintenanceView: "queue" }),
      },
      label: solution.action,
      context: `${item.id} · ${item.household} · ${item.status}`,
    };
  const view = solution.fallback || "readiness";
  return {
    layer: "maintenance",
    sub: { ...sub, maintenanceView: view },
    label:
      view === "intake"
        ? "Explore scoped household intake"
        : "Open scoped reporting readiness",
    fallback: true,
    context: `No matching ${solution.kind === "queue" ? "blocked request" : "fixture"} is visible in this profile. This link opens ${view === "intake" ? "household intake" : "reporting readiness"} to inspect the adjacent workflow; it does not demonstrate the missing capability.`,
  };
}
