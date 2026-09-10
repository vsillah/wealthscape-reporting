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
    moment: "A life event becomes an account-maintenance request.",
    experience:
      "Neutral entry point: account scope and requirements still need to be established.",
    handoff:
      "Client to operations: describe the requested change and affected accounts.",
    response:
      "Capture the request once and keep the account scope visible for the next owner.",
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
    moment: "The request reaches an authority or signature requirement.",
    experience:
      "Authority and signature handling are source-identified friction points; the exact requirement depends on the account and authority type.",
    handoff:
      "Client supplies authority; operations checks it against home-office policy.",
    response:
      "Show the missing requirement, responsible party, and recovery path beside the request.",
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
    moment: "The next owner can understand what the packet still needs.",
    experience:
      "Proposed reassurance: requirements and account scope are visible together, reducing uncertainty about the next action.",
    handoff:
      "Operations to the client or authorized party when additional evidence is needed.",
    response:
      "Keep missing checks and named ownership together; never imply an unchecked packet is complete.",
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
    moment: "An exception waits for service or review.",
    experience:
      "Service waiting is a source-identified friction point. The curve does not quantify the wait or its impact.",
    handoff:
      "Operations to the service or review owner, with home-office exception context where applicable.",
    response:
      "Expose request status, next owner, and retained rejection history without requiring repeated status chasing.",
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
    moment:
      "A reviewer can explain the decision and any unresolved prerequisite.",
    experience:
      "Proposed progress: review status is understandable and distinguishable from submission.",
    handoff:
      "Reviewer to operations: communicate the decision and supporting evidence.",
    response:
      "Retain the review record and keep unresolved checks visible before releasing account context.",
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
    moment:
      "The client receives confirmation tied to the reviewed account scope.",
    experience:
      "Proposed reassurance: completion and its supporting record can be retrieved.",
    handoff:
      "Operations confirms scope to the client; home office retains review evidence.",
    response:
      "Carry reviewed context into reporting while keeping the completion evidence accessible.",
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
