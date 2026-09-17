export const journeyPhases = [
  "Establish scope",
  "Resolve and review",
  "Confirm completion",
];
export const journeyStakeholders = [
  {
    id: "client",
    label: "Client",
    steps: ["Life event", "Authority / signature", "Receives confirmation"],
  },
  {
    id: "operations",
    label: "Operations",
    steps: ["Capture once", "Route rejected work", "Confirm account scope"],
  },
  {
    id: "home-office",
    label: "Home office",
    steps: ["Policy context", "Review exceptions", "Retain review evidence"],
  },
];
const proposedBoundary =
  "Illustrative proposed experience, not an observed sentiment or measured improvement. Validate with service associates and account workflows.";
const frictionBoundary =
  "Executive deck, slides 6 and 10: directional forum evidence identifies this friction. Frequency, severity, and curve height are not measured satisfaction.";
export const journeyMilestones = [
  {
    id: "capture",
    label: "Capture request",
    kind: "neutral",
    x: 35,
    y: 35,
    phase: 0,
    stakeholders: ["client", "operations"],
    job: "Define the requested account change and affected account scope before work branches into separate servicing paths.",
    moment: "A life event becomes an account-maintenance request.",
    experience:
      "Neutral entry point: account scope and requirements still need to be established.",
    handoff:
      "Client to operations: describe the requested change and affected accounts.",
    response:
      "Capture the request once and keep the account scope visible for the next owner.",
    outcomes: [
      {
        id: 1,
        label: "Data re-entry across a change",
        reason: "Scope captured once reduces repeated entry across the request.",
      },
      {
        id: 4,
        label: "One change across a household",
        reason: "The affected accounts need to stay visible as one request.",
      },
      {
        id: 9,
        label: "Status without calling service",
        reason: "The request needs an observable starting state and owner.",
      },
    ],
    boundary: proposedBoundary,
  },
  {
    id: "authority",
    label: "Authority / signature",
    kind: "friction",
    x: 160,
    y: 100,
    phase: 1,
    stakeholders: ["client", "operations", "home-office"],
    job: "Confirm whether the right person, policy path, and account authority are present before the request can advance.",
    moment: "The request reaches an authority or signature requirement.",
    experience:
      "Authority and signature handling are source-identified friction points; the exact requirement depends on the account and authority type.",
    handoff:
      "Client supplies authority; operations checks the requirements; the home office defines policy and review.",
    response:
      "Name the owner and recovery path for every handoff so a missing signature or policy exception can move forward.",
    outcomes: [
      {
        id: 2,
        label: "Rejected for incomplete information",
        reason: "Missing authority should be visible before the request is rejected.",
      },
      {
        id: 10,
        label: "Right authority the first time",
        reason: "Authority type and account scope need to match the policy path.",
      },
      {
        id: 12,
        label: "Client signature turnaround",
        reason: "A waiting signature needs an accountable next action.",
      },
    ],
    boundary: frictionBoundary,
  },
  {
    id: "packet",
    label: "Clarify requirements",
    kind: "positive",
    x: 275,
    y: 45,
    phase: 1,
    stakeholders: ["client", "operations"],
    job: "Make the evidence packet understandable enough that the next owner knows what is complete and what is still missing.",
    moment: "The next owner can understand what the packet still needs.",
    experience:
      "Proposed reassurance: requirements and account scope are visible together, reducing uncertainty about the next action.",
    handoff:
      "Operations to the client or authorized party when additional evidence is needed.",
    response:
      "Keep missing checks and named ownership together; never imply an unchecked packet is complete.",
    outcomes: [
      {
        id: 2,
        label: "Rejected for incomplete information",
        reason: "The packet should expose missing checks before review.",
      },
      {
        id: 11,
        label: "Paper required per change",
        reason: "Required evidence needs a visible completion state.",
      },
      {
        id: 15,
        label: "Standing instruction / bank link",
        reason: "Account-specific evidence needs to travel with the request.",
      },
    ],
    boundary: proposedBoundary,
  },
  {
    id: "service",
    label: "Waiting on service",
    kind: "friction",
    x: 395,
    y: 120,
    phase: 1,
    stakeholders: ["operations", "home-office"],
    job: "Resolve the exception by making ownership, blocker state, and recovery steps visible while the work waits.",
    moment: "An exception waits for service or review.",
    experience:
      "Service waiting is a source-identified friction point. The curve does not quantify the wait or its impact.",
    handoff:
      "Operations to the service or review owner, with home-office exception context where applicable.",
    response:
      "Expose request status, next owner, and retained rejection history without requiring repeated status chasing.",
    outcomes: [
      {
        id: 3,
        label: "Exception resolution time",
        reason: "Blocked work needs a queue state and route to resolution.",
      },
      {
        id: 8,
        label: "Actions needing Fidelity to act",
        reason: "The responsible service owner should be explicit.",
      },
      {
        id: 9,
        label: "Status without calling service",
        reason: "The advisor or operations team should not need a status chase.",
      },
    ],
    boundary: frictionBoundary,
  },
  {
    id: "review",
    label: "Review decision",
    kind: "positive",
    x: 540,
    y: 35,
    phase: 1,
    stakeholders: ["operations", "home-office"],
    job: "Review the request decision, unresolved prerequisites, and retained evidence before treating the change as usable.",
    moment:
      "A reviewer can explain the decision and any unresolved prerequisite.",
    experience:
      "Proposed progress: review status is understandable and distinguishable from submission.",
    handoff:
      "Reviewer to operations: communicate the decision and supporting evidence.",
    response:
      "Retain the review record and keep unresolved checks visible before releasing account context.",
    outcomes: [
      {
        id: 6,
        label: "Detect stale data before an exam",
        reason: "Review readiness depends on current, inspectable evidence.",
      },
      {
        id: 13,
        label: "Periodic review missed",
        reason: "Review work needs an owner and visible history.",
      },
      {
        id: 14,
        label: "Confirming a change is complete",
        reason: "Submission and completion should not be treated as the same state.",
      },
    ],
    boundary: proposedBoundary,
  },
  {
    id: "confirmation",
    label: "Confirm completion",
    kind: "positive",
    x: 640,
    y: 25,
    phase: 2,
    stakeholders: ["client", "operations", "home-office"],
    job: "Conclude the job by confirming the intended account state, notifying the client, and retaining the proof behind the decision.",
    moment:
      "The client receives confirmation tied to the reviewed account scope.",
    experience:
      "Proposed reassurance: completion and its supporting record can be retrieved.",
    handoff:
      "Operations confirms scope to the client; home office retains review evidence.",
    response:
      "Treat the job as complete only when the right account scope is confirmed and review evidence can be retrieved.",
    outcomes: [
      {
        id: 9,
        label: "Status without calling service",
        reason: "Completion status needs to be visible after the work closes.",
      },
      {
        id: 14,
        label: "Confirming a change is complete",
        reason: "The account state and completion evidence should be retrievable.",
      },
      {
        id: 4,
        label: "One change across a household",
        reason: "The final confirmation should match the intended account scope.",
      },
    ],
    boundary: proposedBoundary,
  },
];
export function nextJourneySelection(current, id) {
  return current === id || !journeyMilestones.some((item) => item.id === id)
    ? null
    : id;
}
export function journeyCellState(selectedId, phase, stakeholder) {
  const selected = journeyMilestones.find((item) => item.id === selectedId);
  if (!selected) return "equal";
  return selected.phase === phase &&
    (!stakeholder || selected.stakeholders.includes(stakeholder))
    ? "selected"
    : "muted";
}
