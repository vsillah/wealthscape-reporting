export const GUIDE_CASE_ID = "MC-GUIDE";

export function createGuideCase(profileId) {
  return {
    id: GUIDE_CASE_ID,
    createdFor: profileId,
    household: "Baobab demo household",
    change: "Household contact update",
    accounts: ["Advisory · GUIDE-01", "Brokerage · GUIDE-02"],
    registration: "Mixed",
    owner: "Client service",
    due: "Today",
    checks: [false, false, false],
    status: "Blocked",
    blocker: "Evidence packet incomplete",
    events: [
      {
        text: "Isolated guide request captured; two synthetic accounts in scope",
        actor: "Demo service team",
        time: "09:00 demo",
      },
    ],
  };
}

const caseRoute = (panel) => ({
  layer: "maintenance",
  sub: { caseId: GUIDE_CASE_ID, panel, maintenanceView: "queue" },
});
export const maintenanceGuideSteps = [
  {
    title: "One request, a visible owner",
    layer: "morning",
    sub: {},
    target: "dashboard",
    outcomes: "8, 9",
    source: "Executive study · slides 18, 20–23",
    insight:
      "Status and service handoffs are shared maintenance needs. Their scores are directional proxies.",
    ux: "Queue counts and named owners show where a request waits. The temporary Baobab case is included in this profile's live demo counts.",
    action:
      "Inspect the command center, then open the blocked queue with Next.",
    proposal:
      "Production needs durable status events, entitlements, and measured service volume.",
  },
  {
    title: "Find the work that is blocked",
    layer: "maintenance",
    sub: { maintenanceView: "queue", statusFilter: "Blocked" },
    target: "queue",
    outcomes: "2, 3, 9",
    source: "Executive study · slides 18–23",
    insight:
      "Incomplete requests and exception resolution lead the investment discussion; outcome 3 remains inferred.",
    ux: "The status filter makes the blocked request retrievable. Search and queue counts operate on the isolated case during this guide.",
    action: "Locate Baobab in the queue. Next opens its account scope.",
    proposal:
      "A shared rejection contract and actionable recovery paths require operations validation.",
  },
  {
    title: "Keep the account scope together",
    ...caseRoute("overview"),
    target: "case",
    outcomes: "1, 4, 10",
    source: "Executive study · slides 6–10, 18, 21",
    insight:
      "Repeated handling and authority handoffs cross individual maintenance functions.",
    ux: "One case keeps both synthetic accounts, its owner, and its blocker together. Inspect Accounts in scope before continuing.",
    action: "Next opens the evidence packet for these two accounts.",
    proposal:
      "Legal authority, account entitlements, and partial-failure rules remain production work.",
  },
  {
    title: "Record each evidence check",
    ...caseRoute("evidence"),
    target: "evidence",
    gate: "checks",
    outcomes: "1, 2, 10, 12",
    source: "Executive study · slides 18, 20–23",
    insight:
      "Validation comes before household authority, despite authority's higher weighted score.",
    ux: "Missing checks appear beside the account scope. Mark all three synthetic attestations in the highlighted packet; Next never checks them for you.",
    action: "Select all three evidence checkboxes to unlock Next.",
    proposal:
      "No document or signature is verified here. Production requires approved rules and evidence sources.",
  },
  {
    title: "A person confirms completion",
    ...caseRoute("evidence"),
    target: "review",
    gate: "review",
    outcomes: "13, 14",
    source: "Executive study · slides 8, 18, 23",
    insight:
      "Submission and completion are different states. Outcome 14 is inferred and needs primary validation.",
    ux: "All checks make the request ready for review. Use Confirm demo review & complete to record the human decision.",
    action: "Confirm the demo review in the highlighted gate to unlock Next.",
    proposal:
      "Reviewer identity, applicable duties, retention, and audit retrieval need production controls.",
  },
  {
    title: "Read the completed context",
    ...caseRoute("timeline"),
    target: "timeline",
    outcomes: "9, 14",
    source: "Executive study · slides 6–10, 18",
    insight:
      "Confirmation closes the proposed job sequence; a submitted form alone cannot do that.",
    ux: "The timeline retains your actual demo checks and review event. Going back preserves this guide's work; Restart clears only this guide.",
    action:
      "Review the recorded events. Next follows this case into reporting.",
    proposal: "These session events are not a production audit repository.",
  },
  {
    title: "Carry evidence into the report",
    layer: "reports",
    sub: { caseId: GUIDE_CASE_ID },
    target: "report",
    gate: "report",
    outcomes: "9, 14",
    source: "Executive study · slides 18, 23; proposed UX synthesis",
    insight: "Visible completion should connect to a retrievable output.",
    ux: "The report builder uses the case's current checks and completion state. Generate account report creates an isolated snapshot of your reviewed accounts and history.",
    action: "Click Generate account report to unlock the final step.",
    proposal:
      "Production reporting requires durable records and source-of-record integration. No external delivery occurs.",
  },
  {
    title: "Review what the scenario proved",
    layer: "reports",
    sub: { caseId: GUIDE_CASE_ID },
    target: "output",
    outcomes: "1, 2, 9, 14",
    source: "Executive study · slides 23, 25, 27, 30",
    insight:
      "The study calls for a baseline and a ninety-day decision gate, not a claim of proven ROI.",
    ux: "This report reflects the checks and human review you completed. It demonstrates a connected synthetic path, not live account servicing.",
    action:
      "Return to research or Restart. Both discard only the guide's temporary case and output.",
    proposal:
      "Next research: direct/assisted volume, first-pass completion, rework, resolution time, and CSA interviews.",
  },
];

export function guideSteps(mode) {
  if (mode === "scenario") return maintenanceGuideSteps;
  return maintenanceGuideSteps.slice(0, 7).map((step, index) => ({
    ...step,
    gate: undefined,
    desiredOutcome: [
      "Know which maintenance request is blocked and who owns the next action.",
      "Find incomplete or rejected work without chasing status.",
      "Carry the correct account scope forward without re-entering the same information.",
      "Identify missing evidence and authority checks before submission.",
      "Know when a change is reviewed and complete, rather than merely submitted.",
      "Retrieve request status and the record behind a review decision.",
      "Carry reviewed account context into reporting while keeping unresolved prerequisites visible."
    ][index],
    targetLabel: ["blocked queue count", "Baobab request and owner", "two accounts in scope", "unchecked evidence packet", "disabled human review gate", "captured request history", "report generation hold"][index],
    gap: [
      "The source study identifies status visibility and service handoffs as shared needs; their frequency and maintenance-specific impact remain unmeasured.",
      "The study prioritizes incomplete requests and exception recovery. Resolution time is inferred, not a measured customer result.",
      "The research links repeated data handling with household scope and authority. Existing workflow coverage needs validation.",
      "The study prioritizes validation before household authority; missing evidence and authority checks remain problems to validate in maintenance workflows.",
      "Submission does not establish completion. The confirmation outcome is inferred and needs direct user research.",
      "The study identifies status visibility as a need; whether users can retrieve confirmation and the review record still needs direct validation.",
      "A blocked request cannot support a completed account report. Durable source records and report integration remain production work."
    ][index],
    ...(index === 3
      ? {
          ux: "The packet shows three unchecked synthetic attestations. The human review action remains disabled until all are present.",
          action: "Inspect the checks without changing them, then continue.",
        }
      : {}),
    ...(index === 4
      ? {
          ux: "The human review gate explains what is missing. This tour leaves the fixture blocked; Next changes the view, not the case status.",
          action: "Inspect the disabled review action, then continue.",
        }
      : {}),
    ...(index === 5
      ? {
          title: "Retain the request history",
          ux: "The timeline shows the captured request. It adds events only when an actual demo action changes the case.",
          action:
            "Next opens reporting prerequisites for this blocked request.",
        }
      : {}),
    ...(index === 6
      ? {
          title: "A report waits for its prerequisites",
          target: "prerequisites",
          ux: "The blocked case holds generation. Resolve prerequisite leads back to the evidence packet; a tour's Next button cannot complete a request.",
          action:
            "Inspect the held output, then return to research. Run Scenario to complete the hands-on flow.",
        }
      : {}),
  }));
}

export function guideGate(step, item, reports) {
  if (step.gate === "checks")
    return item?.checks.length === 3 && item.checks.every(Boolean);
  if (step.gate === "review")
    return item?.status === "Complete" && item.checks.every(Boolean);
  if (step.gate === "report")
    return (
      item?.status === "Complete" &&
      item.checks.every(Boolean) &&
      reports.some(
        (r) =>
          r.selectionKey === GUIDE_CASE_ID &&
          r.cases.length === 1 &&
          r.cases[0].status === "Complete",
      )
    );
  return true;
}

export function canVisitGuideStep(mode, current, next, item, reports) {
  const steps = guideSteps(mode);
  return (
    Number.isInteger(next) &&
    next >= 0 &&
    next < steps.length &&
    (next <= current ||
      steps.slice(0, next).every((step) => guideGate(step, item, reports)))
  );
}
