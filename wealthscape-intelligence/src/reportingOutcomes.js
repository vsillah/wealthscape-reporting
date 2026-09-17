// Reporting-only expansion of the retained strategy inputs. These are discovery
// estimates, not survey results. Legacy coordinates are retained only where the
// outcome still describes the same reporting job; other coordinates are new
// management estimates recorded on 2026-09-16.
export const reportingOutcomes = [
  {
    id: "R1",
    theme: "Unify",
    text: "Assemble a branded, client-ready report in one tool.",
    imp: 9.5,
    sat: 2.0,
    basis: "derived",
    origin: "Legacy ODI #5.1; original 9.5 / 2.0 ratings retained.",
    sources: ["addepar"],
    problem:
      "The report looks finished only after the team rebuilds client, template, content, and branding in multiple places.",
    jobMap:
      "Prepare / Execute: the advisor has to rebuild the branded package after choosing the client, period, and report purpose.",
    ux: "Keep client, template, content and generation in one reporting workspace.",
    tab: "build",
  },
  {
    id: "R2",
    theme: "Unify",
    text: "Reduce the tools needed to assemble and finish a report.",
    imp: 9.4,
    sat: 2.0,
    basis: "derived",
    origin:
      "Legacy ODI #5.3, narrowed to report assembly; original 9.4 / 2.0 ratings retained.",
    sources: ["addepar"],
    problem:
      "Assembly work is spread across output, narrative, and presentation tools before the report can be shared.",
    jobMap:
      "Prepare: report assembly sprawls across exports, narrative drafting, formatting, and presentation cleanup.",
    ux: "Carry report configuration forward without rebuilding the package in another tool.",
    tab: "build",
  },
  {
    id: "R3",
    theme: "Unify",
    text: "Include the client's full household and account context.",
    imp: 9.4,
    sat: 2.5,
    basis: "derived",
    origin:
      "BD-HA #1, applied to reporting scope; original 9.4 / 2.5 ratings retained.",
    sources: ["advisor360", "finraSnapshot"],
    problem:
      "The report can explain one sleeve of the relationship while omitting the broader household context.",
    jobMap:
      "Define / Locate: a household report starts without a clear view of included and excluded accounts.",
    ux: "Make included and missing accounts visible before report assembly.",
    tab: "build",
  },
  {
    id: "R4",
    theme: "Unblock",
    text: "Find missing or stale source data before generating a draft.",
    imp: 9.2,
    sat: 2.7,
    basis: "inferred",
    origin:
      "New management estimate from the Locate/Prepare job-map hypothesis; no measured reporting baseline.",
    sources: ["schwabStudy"],
    problem:
      "Stale prices, missing positions, and incomplete source data become visible after generation has already started.",
    jobMap:
      "Locate: missing or stale source data is discovered after draft generation begins, creating avoidable rework.",
    ux: "Show data freshness, missing inputs and the owner of each correction before generation.",
    tab: "generate",
  },
  {
    id: "R5",
    theme: "Explain",
    text: "Explain results in the right brokerage or advisory context.",
    imp: 9.1,
    sat: 2.7,
    basis: "derived",
    origin:
      "BD-HA #2; original 9.1 / 2.7 ratings retained as a reporting estimate.",
    sources: ["finraAI", "finra2210"],
    problem:
      "Narrative language can blur brokerage, advisory, product, and disclosure context if it is not tied to the account type.",
    jobMap:
      "Confirm: reviewers need to know which account rules and disclosure context apply before the narrative clears.",
    ux: "Bind narrative and disclosures to the selected account context.",
    tab: "customize",
  },
  {
    id: "R6",
    theme: "Explain",
    text: "Trace each narrative claim to its supporting data.",
    imp: 9.3,
    sat: 2.4,
    basis: "inferred",
    origin:
      "New management estimate from the proposed reporting control layer; vendor evidence does not establish a complete implementation.",
    sources: ["orion", "tamarac"],
    problem:
      "A reviewer cannot clear generated commentary confidently when claims are detached from the source data.",
    jobMap:
      "Confirm: generated claims cannot be approved if the supporting data is hard to inspect or retrieve.",
    ux: "Let the reviewer inspect the data behind each generated statement and reject unsupported claims.",
    tab: "customize",
  },
  {
    id: "R7",
    theme: "Explain",
    text: "Use approved language and disclosures in the report.",
    imp: 8.6,
    sat: 3.2,
    basis: "derived",
    origin: "BD-HA #5; original 8.6 / 3.2 ratings retained.",
    sources: ["finra2210", "marketing"],
    problem:
      "Approved language and disclosure rules sit outside the authoring flow, creating review friction late in the cycle.",
    jobMap:
      "Prepare / Confirm: approved language and disclosure rules are separated from the authoring step.",
    ux: "Apply approved language rules while authors customize the report.",
    tab: "customize",
  },
  {
    id: "R8",
    theme: "Route",
    text: "Send a reporting issue to its owner with the evidence attached.",
    imp: 8.8,
    sat: 3.1,
    basis: "derived",
    origin:
      "BD-HA #4, narrowed to reporting handoffs; original 8.8 / 3.1 ratings retained.",
    sources: ["schwabStudy"],
    problem:
      "Reporting blockers move between advisors, operations, and reviewers without the evidence needed to finish the work.",
    jobMap:
      "Modify / Confirm: blockers move between teams without the evidence, owner, or next action needed to resolve them.",
    ux: "Attach the blocker, due date, correction history and next action to the handoff.",
    tab: "generate",
  },
  {
    id: "R9",
    theme: "Prove",
    text: "Know who approved the exact report version ready for release.",
    imp: 9.4,
    sat: 2.8,
    basis: "inferred",
    origin:
      "New management estimate from the named-approval proposal; no observed approval-cycle baseline.",
    sources: ["finra2210"],
    problem:
      "The release-ready report can lack a visible record of who approved the exact version being sent.",
    jobMap:
      "Execute: the release-ready version needs a named approval decision before it can move to delivery.",
    ux: "Show a named review decision against an immutable report version before release.",
    tab: "generate",
  },
  {
    id: "R10",
    theme: "Prove",
    text: "Retrieve the sent report, approval and source history together.",
    imp: 8.5,
    sat: 2.8,
    basis: "derived",
    origin:
      "Legacy ODI #15, made specific to reporting evidence; original 8.5 / 2.8 ratings retained.",
    sources: ["finra2231"],
    problem:
      "The sent report, its source snapshot, and the approval record are difficult to retrieve together after delivery.",
    jobMap:
      "Conclude: the sent report must stay connected to its approval and source history for review and retrieval.",
    ux: "Keep the delivered version linked to its source snapshot, review and delivery record.",
    tab: "generate",
  },
  {
    id: "R11",
    theme: "Route",
    text: "Complete a reporting cycle with clear status and recovery steps.",
    imp: 8.7,
    sat: 3.4,
    basis: "inferred",
    origin:
      "New management estimate from the generation and delivery journey; deadlines and failure rates are unmeasured.",
    sources: ["addepar", "finra2231"],
    problem:
      "Teams cannot tell whether a report is waiting on data, review, generation, delivery, or follow-up.",
    jobMap:
      "Monitor: teams need one status for progress, failure reason, and the next recovery step.",
    ux: "Expose stage status, failure reasons and retry ownership for each package.",
    tab: "generate",
  },
  {
    id: "R12",
    theme: "Unify",
    text: "Reuse a consistent template and firm branding.",
    imp: 8.0,
    sat: 5.8,
    basis: "inferred",
    origin:
      "New management estimate. Public references describe template capabilities; assumed higher satisfaction still needs customer validation.",
    sources: ["addepar", "advyzon"],
    problem:
      "Reusable branding exists as an expectation, but teams still spend time reapplying section choices and design rules.",
    jobMap:
      "Prepare: teams spend time reapplying the same firm design, benchmark, and section set.",
    ux: "Start from a shared template with controlled branding and reusable sections.",
    tab: "build",
  },
  {
    id: "R13",
    theme: "Explain",
    text: "Let the client explore a report in context.",
    imp: 8.8,
    sat: 2.6,
    basis: "derived",
    origin: "Legacy ODI #8.2; original 8.8 / 2.6 ratings retained.",
    sources: ["portal"],
    problem:
      "Clients receive a static output without enough context to understand the numbers or take the next action.",
    jobMap:
      "Conclude: clients need report context and a direct path to ask the follow-up question.",
    ux: "Connect report content to an interactive client view with understandable context.",
    tab: "customize",
  },
  {
    id: "R14",
    theme: "Route",
    text: "Know whether the client received and opened the report.",
    imp: 8.1,
    sat: 3.2,
    basis: "derived",
    origin: "Legacy ODI #8.4; original 8.1 / 3.2 ratings retained.",
    sources: ["portal"],
    problem:
      "Delivery success is often treated as completion even when no one knows whether the client opened the report.",
    jobMap:
      "Monitor / Conclude: delivery success and actual client open behavior need separate status signals.",
    ux: "Separate delivery success from actual opening and offer a follow-up action.",
    tab: "generate",
  },
  {
    id: "R15",
    theme: "Unify",
    text: "Preview the chosen sections and date range before generating.",
    imp: 7.8,
    sat: 5.5,
    basis: "inferred",
    origin:
      "New management estimate from the report configuration workflow. Assumed higher satisfaction is not measured.",
    sources: ["advyzon"],
    problem:
      "Users generate before confirming the exact sections, date range, benchmark, and accounts included in the package.",
    jobMap:
      "Define / Prepare: users need to see exactly what will be included before generation begins.",
    ux: "Make the report scope and included sections inspectable before generation.",
    tab: "customize",
  },
].map((outcome) => ({
  ...outcome,
  scoreType: "Management estimate",
  coverage:
    outcome.tab === "build"
      ? "Synthetic client and template selection is implemented. Live reconciliation, shared template governance and source integration remain proposed."
      : outcome.tab === "customize"
        ? "Synthetic section, date and presentation controls are implemented. Claim attribution, policy enforcement and interactive client delivery remain proposed."
        : "A synthetic generation pipeline shows stage progress. Live recovery, ownership, approval, retention and delivery tracking remain proposed.",
}));

// Representative outcomes preserve the five recommendation-theme entry points.
export const reportingThemeOutcomeIds = {
  Unify: "R3",
  Explain: "R5",
  Unblock: "R4",
  Route: "R8",
  Prove: "R10",
};
