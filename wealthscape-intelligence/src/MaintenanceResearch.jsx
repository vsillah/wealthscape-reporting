import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Columns3,
  Users,
  ListChecks,
  Route,
  ChartScatter,
  Lightbulb,
  Milestone,
  Workflow,
  ShieldCheck,
  GitBranch,
  Database,
  ArrowRight,
  FlaskConical,
  ClipboardCheck,
} from "lucide-react";
import { LifecycleResearch, outcomes } from "./LifecycleExperience";
import { visibleCases } from "./AccountMaintenance";

const sources = {
  altruist: ["Altruist · April 2024", "https://altruist.com/news/april-2024/"],
  kitces: [
    "Kitces 2025 research",
    "https://www.kitces.com/kitces-report-independent-financial-advisor-technology-fintech-software-tools-research-2025/",
  ],
  t3: [
    "T3 / Inside Information 2026",
    "https://t3technologyhub.com/wp-content/uploads/2026/03/2026-T3-Inside-Information-Software-Survey.pdf",
  ],
  schwab: [
    "Schwab digital workflows",
    "https://advisorservices.schwab.com/whats-new/account-management/digital-workflows",
  ],
  supervision: [
    "FINRA 3110",
    "https://www.finra.org/rules-guidance/rulebooks/finra-rules/3110",
  ],
};
const sections = [
  { id: 1, label: "Market research", icon: BookOpen, tone: "research" },
  { id: 2, label: "Capability comparison", icon: Columns3, tone: "research" },
  { id: 3, label: "Customer research", icon: Users, tone: "research" },
  { id: 4, label: "Desired outcomes", icon: ListChecks, tone: "research" },
  { id: 5, label: "Job map", icon: Route, tone: "derived" },
  { id: 6, label: "Opportunity matrix", icon: ChartScatter, tone: "derived" },
  { id: 0, label: "Findings & takeaways", icon: Lightbulb, tone: "derived" },
  { id: 7, label: "Recommendations", icon: Milestone, tone: "decision" },
  { id: 8, label: "Resolution strategy", icon: Workflow, tone: "decision" },
];
const deckScores = [
  8, 7.86, 7.46, 7.26, 6.48, 6.22, 5.54, 6.58, 6.2, 5.52, 6.84, 6.5, 5.58, 5.64,
  4.68,
];
function Evidence({ slide, links = [], children }) {
  return (
    <div className="mr-evidence">
      <span>
        Account maintenance executive study, 18 Aug 2026 · slides {slide}
      </span>
      {children && <p>{children}</p>}
      <div className="mr-source-links">
        {links.map((key) => (
          <a key={key} href={sources[key][1]} target="_blank" rel="noreferrer">
            {sources[key][0]} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
function Cards({ rows }) {
  return (
    <div className="mr-cards">
      {rows.map(([title, text]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

const recommendationMap = [
  {
    title: "Validation and exceptions",
    phase: "NOW",
    score: "3.75",
    icon: GitBranch,
    outcomes: "1, 2, 3, 8, 9",
    preferred: ["MC-101", "MC-102", "MC-104", "MC-103"],
    action: "Inspect validation workflow",
    panel: "evidence",
    ux: "Capture household scope once, show missing checks beside the request, and give rejected work a named owner and a visible status.",
    demo: "The command center drills into a status-filtered queue. A case shows evidence checkboxes, owner routing, and a session timeline. These are synthetic attestations; no document is verified.",
    step: "Engineering and operations: inventory existing submission rules, normalize rejection reasons, and instrument the direct/assisted path before extending validation.",
    dependency:
      "Named data owners, account entitlements, and an agreed event/exception contract.",
    gate: "Review baseline volume, first-pass completion, repeat rejection, and resolution time by function. Confirm every failed check has an actionable recovery path.",
  },
  {
    title: "Household authority",
    phase: "NEXT",
    score: "4.25",
    icon: Users,
    outcomes: "4, 5, 10, 11, 12, 15",
    preferred: ["MC-101", "MC-104", "MC-106"],
    action: "Inspect household evidence",
    panel: "evidence",
    ux: "Make account scope and authority requirements visible together. Separate firm authority, third-party POA, signatures, and per-account exceptions.",
    demo: "The selected case exposes its synthetic account list and authority/signature checks. Intake collects household scope. The prototype does not execute one legal change across live accounts.",
    step: "Platform engineering and compliance: model party-to-account authority, reuse the validation contract, and define partial-failure and rollback behavior for multi-account requests.",
    dependency:
      "Shared validation first, despite the higher weighted score; legal review of each authority type.",
    gate: "Prove that each selected account has the right authority, unauthorized accounts are excluded, and partial failures retain an auditable explanation.",
  },
  {
    title: "Compliance currency",
    phase: "NEXT",
    score: "3.10",
    icon: ShieldCheck,
    outcomes: "6, 13, 14",
    preferred: ["MC-103", "MC-106"],
    action: "Inspect review evidence",
    panel: "timeline",
    ux: "Expose review status and evidence currency at the account level. Make completion distinguishable from submission and show the record behind a readiness decision.",
    demo: "Periodic/permission review fixtures have status history. A human demo confirmation releases reporting readiness. There is no stale-data detector, legal timer, or production audit repository.",
    step: "Compliance and records owners: define applicable duties, exceptions, source-of-record fields, retention, reviewer identity, and escalation rules before implementing signals.",
    dependency:
      "Confirmed custody/clearing scope and durable evidence. Proposed regulations cannot supply the funding case.",
    gate: "Trace each alert to an applicable rule and record; test exceptions, false positives, reviewer accountability, and retrieval of retained evidence.",
  },
  {
    title: "Enterprise servicing",
    phase: "LATER",
    score: "2.90",
    icon: Database,
    outcomes: "7, 4, 8, 9",
    preferred: ["MC-104"],
    action: "Inspect conversion case",
    panel: "overview",
    ux: "Keep registration, affected accounts, conversion ownership, and authority exceptions together so a consolidator can see which work still needs intervention.",
    demo: "The acquisition re-servicing fixture shows mixed registrations, an operations owner, and missing authority. It is a single demonstration case, not a migration or multi-entity processing engine.",
    step: "Enterprise operations and platform engineering: map an acquired book’s identifiers, entity boundaries, authority recapture, reconciliation, and support model in a bounded discovery pilot.",
    dependency:
      "Validated segment demand plus the shared validation and authority foundation.",
    gate: "Reconcile account counts and ownership, isolate entitlements by entity, explain every unresolved item, and establish rollback and cost-to-serve before scale.",
  },
];

function RecommendationMap({ scoped, profile, onNavigate }) {
  return (
    <div className="mr-recommendations">
      {recommendationMap.map((rec) => {
        const sample = rec.preferred
          .map((id) => scoped.find((c) => c.id === id))
          .find(Boolean);
        const Icon = rec.icon;
        return (
          <article className="mr-recommendation" key={rec.title}>
            <header>
              <span className="mr-section-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <div>
                <span className="am-eyebrow">
                  {rec.phase} · weighted score {rec.score}
                </span>
                <h3>{rec.title}</h3>
              </div>
              <span className="mr-outcome-ref">Outcomes {rec.outcomes}</span>
            </header>
            <p className="mr-ux">
              <strong>UX decision</strong> {rec.ux}
            </p>
            <div className="mr-proof-columns">
              <div className="mr-demonstrated">
                <h4>
                  <FlaskConical size={16} aria-hidden="true" /> Demonstrated
                  today
                </h4>
                <p>{rec.demo}</p>
                <p className="am-note">
                  {sample
                    ? `${sample.id} · ${sample.household} · ${sample.status}`
                    : "No matching fixture in this profile. The link opens its readiness view; choose a visible case or use the global profile control to inspect another scope."}
                </p>
                <button
                  onClick={() =>
                    onNavigate("maintenance", {
                      profileId: profile.id,
                      caseId: sample?.id,
                      panel: sample ? rec.panel : undefined,
                      maintenanceView: sample ? "queue" : "readiness",
                    })
                  }
                >
                  {rec.action} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
              <div className="mr-proposed">
                <h4>
                  <ClipboardCheck size={16} aria-hidden="true" /> Production
                  proposal
                </h4>
                <p>{rec.step}</p>
                <dl>
                  <dt>Dependency</dt>
                  <dd>{rec.dependency}</dd>
                  <dt>Validation gate</dt>
                  <dd>{rec.gate}</dd>
                </dl>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function MaintenanceResearch({ onNavigate, profile, cases, onStartGuide }) {
  const [active, setActive] = useState(1);
  const [navHeight, setNavHeight] = useState(84);
  const navigation = useRef(null);
  const navigationFocused = useRef(false);
  const panels = useRef({});
  const activeIndex = sections.findIndex((item) => item.id === active);
  const scoped = visibleCases(cases, profile);
  const advance = (next) => {
    navigationFocused.current = true;
    setActive(next);
    // Complete the anchor before scrollspy can select an intermediate section.
    // The shell applies smooth scrolling globally, including automated focus scrolls.
    panels.current[next]?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  };
  useEffect(() => {
    const nav = navigation.current;
    let root = nav.parentElement;
    while (root && !/(auto|scroll)/.test(getComputedStyle(root).overflowY))
      root = root.parentElement;
    const scroller = root || window;
    let frame;
    const update = () => {
      if (!nav.getClientRects().length || navigationFocused.current) return;
      const edge = nav.getBoundingClientRect().bottom + 28;
      let id = sections[0].id;
      for (const item of sections) {
        if (panels.current[item.id]?.getBoundingClientRect().top <= edge)
          id = item.id;
      }
      setActive(id);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(() => {
      if (nav.offsetHeight) setNavHeight(nav.offsetHeight);
      onScroll();
    });
    resize.observe(nav);
    // Focus/automation can scroll a sticky control before dispatching its click.
    // Keep that interaction's destination stable; intentional page scrolling
    // resumes scrollspy even if the select or button still owns keyboard focus.
    const resumeTracking = () => {
      navigationFocused.current = false;
      onScroll();
    };
    const onKey = (event) => {
      if (
        event.target.tagName !== "SELECT" &&
        [
          "PageDown",
          "PageUp",
          "Home",
          "End",
          "ArrowDown",
          "ArrowUp",
          " ",
        ].includes(event.key)
      )
        resumeTracking();
    };
    const onPointer = (event) => {
      if (!nav.contains(event.target)) resumeTracking();
    };
    scroller.addEventListener("wheel", resumeTracking, { passive: true });
    scroller.addEventListener("touchmove", resumeTracking, { passive: true });
    scroller.addEventListener("pointerdown", onPointer, { passive: true });
    scroller.addEventListener("keydown", onKey);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resize.disconnect();
      scroller.removeEventListener("wheel", resumeTracking);
      scroller.removeEventListener("touchmove", resumeTracking);
      scroller.removeEventListener("pointerdown", onPointer);
      scroller.removeEventListener("keydown", onKey);
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const openDemo = (statusFilter, lifecycleStage) =>
    onNavigate("maintenance", {
      profileId: profile.id,
      statusFilter,
      lifecycleStage,
      maintenanceView: "queue",
    });
  return (
    <div
      className="am-workspace mr-research"
      style={{ "--mr-nav-height": `${navHeight}px` }}
    >
      <nav
        className="mr-navigation"
        ref={navigation}
        onFocusCapture={() => {
          navigationFocused.current = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            navigationFocused.current = false;
        }}
        aria-label="Maintenance section navigation"
      >
        <label className="am-field">
          Jump to section
          <select
            value={active}
            onChange={(e) => advance(Number(e.target.value))}
          >
            {sections.map((item, i) => (
              <option key={item.id} value={item.id}>
                {i + 1}. {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mr-paging">
          <button
            disabled={activeIndex === 0}
            onClick={() => advance(sections[activeIndex - 1].id)}
          >
            ← Previous
          </button>
          <span>
            {activeIndex + 1} / {sections.length}
          </span>
          <button
            disabled={activeIndex === sections.length - 1}
            onClick={() => advance(sections[activeIndex + 1].id)}
          >
            Next →
          </button>
        </div>
      </nav>
      {sections.map((item, order) => {
        const section = item.id;
        const Icon = item.icon;
        return (
          <section
            className={`mr-panel mr-${item.tone}`}
            id={`maintenance-research-${item.id}`}
            key={item.id}
            ref={(node) => {
              panels.current[item.id] = node;
            }}
            aria-labelledby={`maintenance-heading-${item.id}`}
          >
            <header className="mr-section-heading">
              <span className="mr-section-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <div>
                <span className="am-eyebrow">
                  {String(order + 1).padStart(2, "0")} ·{" "}
                  {item.tone === "research"
                    ? "Research evidence"
                    : item.tone === "derived"
                      ? "Evidence synthesis"
                      : "Proposed decisions"}
                </span>
                <h2 id={`maintenance-heading-${item.id}`}>{item.label}</h2>
              </div>
            </header>
            {section === 0 && (
              <>
                <p className="mr-lead">
                  A client changes one instruction. Operations may still need to
                  resolve the account scope, authority, missing evidence, and
                  review. Invest in that shared path before rebuilding each
                  maintenance function.
                </p>
                <Cards
                  rows={[
                    [
                      "Start with the shared failure points",
                      "Data re-entry, incomplete submissions, and exception resolution lead the revised deck’s outcome ranking. A common validation layer can support all eight maintenance functions. Exception resolution remains an inferred input.",
                    ],
                    [
                      "Build a case for parity and position",
                      "The deck does not establish maintenance-driven churn or productivity ROI. Frame the investment around service capability, competitive position, and a measurable operating hypothesis.",
                    ],
                    [
                      "Sequence authority after validation",
                      "Household authority ranks 4.25 on the investment scorecard; validation ranks 3.75. Validation still comes first because multi-account changes depend on it.",
                    ],
                    [
                      "Make the ninety-day gate real",
                      "Measure direct versus assisted maintenance volume, incomplete submissions, rework, and time to resolution. Use that baseline to resize the next phase before committing to scale.",
                    ],
                  ]}
                />
                <Evidence slide="2, 16, 20, 23–25" links={["kitces", "t3"]}>
                  Leadership synthesis of the August 18, 2026 deck. Rankings and
                  phase estimates are directional; they are not a funded roadmap
                  or measured benefit.
                </Evidence>
                <button className="am-primary" onClick={() => advance(7)}>
                  Connect findings to recommendations →
                </button>
              </>
            )}
            {section === 1 && (
              <>
                <p className="mr-lead">
                  Consultant takeaway: prioritize the quality of the servicing
                  path. Broad platform satisfaction alone does not reveal where
                  maintenance work stalls.
                </p>
                <Cards
                  rows={[
                    [
                      "A platform benchmark, not a maintenance rating",
                      "The deck reports a 7.11 custodial category average in T3 2026, compared with 7.75 in 2023. This is market context; neither survey isolates account maintenance as a category.",
                    ],
                    [
                      "Integration is part of the service experience",
                      "Kitces integration findings inform the hypothesis that capturing data once will reduce repeated handling. The research does not establish a maintenance-specific time saving.",
                    ],
                    [
                      "Consolidation changes the workload",
                      "The study identifies conversion and multi-entity servicing as an enterprise opportunity. Validate the acquired-account workload and segment demand before sizing an investment.",
                    ],
                    [
                      "Supervision creates an evidence requirement",
                      "FINRA 3110 provides the supervisory context for principal review and records. Product discovery must distinguish custody from clearing and confirm which obligations apply to each workflow.",
                    ],
                  ]}
                />
                <Evidence
                  slide="12–14, 24, 28–29"
                  links={["kitces", "t3", "supervision"]}
                >
                  Market figures are retained as deck-reported snapshots. No
                  current vendor ranking, legal applicability determination, or
                  forecast is implied. Proposed regulatory changes are not
                  funding assumptions.
                </Evidence>
              </>
            )}
            {section === 2 && (
              <>
                <p className="mr-lead">
                  Separate a documented feature from proof that the whole
                  maintenance job is solved.
                </p>
                <Cards
                  rows={[
                    [
                      "Onboarding is not all maintenance",
                      "The revised deck narrows several Schwab examples to new-account workflows. Firm authority and third-party power of attorney are also different jobs. Test the exact account state and authority type in a teardown.",
                    ],
                    [
                      "A gap worth investigating",
                      "The August documentation review raises questions about shared validation, authority handling, and stale-data visibility. Missing public documentation cannot establish that a vendor lacks a capability.",
                    ],
                  ]}
                />
                <Evidence slide="15, 17, 25, 27" links={["schwab", "t3"]}>
                  The interactive positioning map below retains the earlier
                  Frames snapshot. Its capability axis is an assessment, not a
                  survey measure. Revalidate scope before using it in a
                  procurement or competitive claim.
                </Evidence>
                <div
                  className="mr-comparison"
                  role="table"
                  aria-label="Maintenance capability gaps"
                >
                  <div role="row" className="mr-comparison-head">
                    <strong role="columnheader">Capability</strong>
                    <strong role="columnheader">Documented reference</strong>
                    <strong role="columnheader">
                      Wealthscape validation gap
                    </strong>
                    <strong role="columnheader">Strategic implication</strong>
                  </div>
                  {[
                    [
                      "Shared validation",
                      "Schwab describes prefill and guided digital workflows; this is vendor-published process evidence.",
                      "Confirm how much existing validation is reusable across maintenance functions; internal coverage is unknown.",
                      "Start with a common submission contract and measure rejection reasons.",
                      "schwab",
                    ],
                    [
                      "Firm authority / third-party POA",
                      "Schwab’s February 2026 update covers firm LPOA-IA across up to 20 accounts. It does not prove third-party POA coverage.",
                      "Map each authority type, account restriction, and recovery path with operations and compliance.",
                      "Keep policy differences explicit before extending an action across a household.",
                      "schwab",
                    ],
                    [
                      "Self-service beneficiary updates",
                      "Altruist’s April 2024 release documents post-opening beneficiary designation changes in its client portal and app.",
                      "Test comparable existing-account edits, exceptions, and client approval requirements. No absence claim is established.",
                      "Compare the complete job, including exceptions, rather than just a digital form.",
                      "altruist",
                    ],
                    [
                      "Status and retained evidence",
                      "Altruist describes account-activity notifications and agreement storage; FINRA 3110 supplies supervisory context.",
                      "Confirm which statuses, owners, and review records are visible across custody and clearing workflows.",
                      "Make the next owner and completion evidence retrievable at every handoff.",
                      "altruist",
                    ],
                  ].map(([capability, reference, gap, implication, source]) => (
                    <div role="row" key={capability}>
                      <strong role="cell">{capability}</strong>
                      <div role="cell">
                        <small>Documented reference</small>
                        <p>{reference}</p>
                        <a
                          href={sources[source][1]}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {sources[source][0]} ↗
                        </a>
                      </div>
                      <div role="cell">
                        <small>Wealthscape validation gap</small>
                        <p>{gap}</p>
                      </div>
                      <div role="cell">
                        <small>Strategic implication</small>
                        <p>{implication}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {section === 3 && (
              <>
                <p className="mr-lead">
                  The people processing the work are the most important research
                  gap.
                </p>
                <Cards
                  rows={[
                    [
                      "Investor · sees the outcome",
                      "The deck groups public forum themes around authority, waiting, and confirmation. These observations show that a problem can occur; they cannot establish its prevalence or severity.",
                    ],
                    [
                      "Client service associate · executes the job",
                      "The source surveys sample advisors rather than directly studying maintenance staff. The CSA role is the proposed job executor; its needs have not been validated by primary interviews in this project.",
                    ],
                    [
                      "Home office · buys and supervises",
                      "Policy, entitlements, and retained review evidence shape this role. Clearing and custody allocate responsibilities differently, so one persona cannot stand in for both operating models.",
                    ],
                  ]}
                />
                <div className="am-callout">
                  <strong>Method and next research step</strong>
                  <p>
                    The deck describes adjacent-category survey synthesis, dated
                    vendor documentation, and approximately 28 in-scope threads
                    from roughly 35 collected. The firm-moderated forum is
                    biased toward unresolved problems. Private text and
                    identities are excluded here.
                  </p>
                  <p>
                    Proposed validation: 10–15 advisor and CSA interviews, a
                    needs-based segmentation pass, and a workflow observation
                    study. None is presented as completed.
                  </p>
                </div>
                <Evidence slide="3–5, 7–10, 27–30" links={["kitces", "t3"]}>
                  Source project: Claude Desktop · Wealthscape Market Research.
                  Emotional and financial jobs are derived interpretations, not
                  interview findings.
                </Evidence>
              </>
            )}
            {section === 4 && (
              <>
                <p className="mr-lead">
                  Use outcomes to identify the work to improve, then validate
                  the size of the gap.
                </p>
                <p className="am-note">
                  This list uses the revised executive study opportunity scores
                  (slide 18). The matrix uses the earlier Frames coordinates.
                  These snapshots differ; scores are not silently combined. The
                  formula is importance + max(importance − satisfaction, 0), on
                  1–5 inputs. Even “Sourced” labels refer to adjacent
                  categories.
                </p>
                <div className="mr-outcomes">
                  {outcomes.map((row, i) => (
                    <div key={row[0]}>
                      <span className="mr-outcome-number">{i + 1}</span>
                      <span>
                        <strong>{row[0]}</strong>
                        <small>{row[3]} input · 18 Aug study snapshot</small>
                      </span>
                      <b>{deckScores[i].toFixed(2)}</b>
                    </div>
                  ))}
                </div>
                <Evidence slide="18, 25, 28" links={["kitces", "t3"]}>
                  Outcomes 3 and 14 are Inferred. All scores are cross-source
                  proxies, not direct maintenance survey results.
                </Evidence>
                <button onClick={() => advance(6)}>
                  Explore the Frames opportunity matrix →
                </button>
              </>
            )}
            {section === 5 && (
              <>
                <p className="mr-lead">
                  Define the request, establish requirements, obtain authority,
                  submit, resolve and review, then confirm completion.
                </p>
                <Cards
                  rows={[
                    [
                      "Authority is a handoff",
                      "The client supplies authority; operations checks the requirements; the home office defines policy and review. Each handoff needs an explicit owner and an understandable recovery path.",
                    ],
                    [
                      "Confirmation closes the job",
                      "A submitted form is not a completed change. The proposed path ends when the right account scope is confirmed and the review evidence can be retrieved.",
                    ],
                  ]}
                />
                <Evidence slide="6–10, 27">
                  This is a derived job sequence and assessed journey, not a
                  completed ODI job map or needs-based segmentation study. The
                  curve below illustrates friction; it does not measure
                  confidence.
                </Evidence>
              </>
            )}
            {section === 6 && (
              <>
                <p className="mr-lead">
                  Shared handling problems dominate the priority discussion.
                  Data re-entry, incomplete requests, and exception resolution
                  cut across individual maintenance functions; the third remains
                  an inferred need.
                </p>
                <Evidence
                  slide="18 and version comparison"
                  links={["kitces", "t3"]}
                >
                  The earlier Frames snapshot supplies the coordinates below.
                  The revised executive study changes some inputs and recomputes
                  scores; see Desired outcomes for that separate ranking. Bubble
                  emphasis indicates selection, not research certainty.
                </Evidence>
              </>
            )}
            {section === 7 && (
              <>
                <p className="mr-lead">
                  Fund the shared prerequisite, measure it, then decide how far
                  to extend it.
                </p>
                <RecommendationMap
                  scoped={scoped}
                  profile={profile}
                  onNavigate={onNavigate}
                />
                <div className="mr-workflow-bridge">
                  <Route size={24} aria-hidden="true" />
                  <div>
                    <h3>
                      Status and confirmation connect every recommendation
                    </h3>
                    <p>
                      Outcomes 9 and 14 lead to queue counts, named owners, a
                      case timeline, and a clear completion state. In the demo,
                      incomplete maintenance holds report generation; completing
                      the evidence checks and human review releases the
                      account-change report.
                    </p>
                    <div className="mr-demo-links">
                      <button
                        onClick={() =>
                          onNavigate("morning", { profileId: profile.id })
                        }
                      >
                        Open lifecycle command center →
                      </button>
                      <button
                        onClick={() =>
                          onNavigate("reports", {
                            profileId: profile.id,
                            caseId: (
                              scoped.find((c) => c.status !== "Complete") ||
                              scoped[0]
                            )?.id,
                          })
                        }
                      >
                        Trace reporting prerequisites →
                      </button>
                    </div>
                  </div>
                </div>
                <Evidence slide="19–23, 25, 30">
                  Unmet need 30%, competitive urgency 20%, persona breadth 20%,
                  regulatory forcing 15%, build leverage 15%. These weights
                  express judgment. Dependency overrides rank; phase timing is
                  an estimate. Internal cost, volume, maintenance NIGO, and CSA
                  time remain missing.
                </Evidence>
                <button onClick={() => advance(8)}>
                  Review proposed resolution decisions →
                </button>
              </>
            )}
            {section === 8 && (
              <>
                <p className="mr-lead">
                  Use an engineering and operations workshop to choose how each
                  gap closes.
                </p>
                <div className="am-callout">
                  <strong>
                    Proposed sourcing decisions · not a completed assessment
                  </strong>
                  <p>
                    Slide 27 explicitly leaves the internal capability and
                    Build/Partner/Acquire assessment open. The options below are
                    a workshop starting point; they are not findings about
                    existing platform maturity or approved vendor decisions.
                  </p>
                </div>
                <div className="mr-resolution-options">
                  {[
                    [
                      "Reuse first",
                      Database,
                      "Platform engineering",
                      "Inventory submission validators, party/account identity, permissions, and audit services. Replay a synthetic rejected request end to end with operations.",
                      "Reuse when rules, ownership, retention, and recovery contracts fit. Extend gaps explicitly; avoid a second source of truth.",
                    ],
                    [
                      "Build the missing coordination",
                      GitBranch,
                      "Product + engineering + operations",
                      "Map outcomes 1/2/3 and 9/14 to missing checks, exception states, owners, and completion evidence. Prototype the smallest missing handoff.",
                      "Build where internal policy or exception coordination is differentiated and existing services cannot meet the contract. Require an accountable support owner.",
                    ],
                    [
                      "Partner for specialized mechanics",
                      ShieldCheck,
                      "Security + compliance + procurement",
                      "Test signature/document providers against firm authority, third-party POA, accessibility, evidence export, revocation, and outage cases.",
                      "Partner only when authority coverage, data handling, auditability, integration cost, and exit terms pass review. A signature tool does not recognize legal authority by itself.",
                    ],
                    [
                      "Consider acquisition only after comparison",
                      Columns3,
                      "Strategy + finance + platform leadership",
                      "Complete the internal maturity map and costed build/reuse/partner comparison before requesting an acquisition thesis.",
                      "Proceed only for a proven strategic gap that cannot be met economically by reuse or partnership. No acquisition recommendation is established by this study.",
                    ],
                  ].map(([title, Icon, owner, action, criterion]) => (
                    <article key={title}>
                      <h3>
                        <Icon size={20} aria-hidden="true" />
                        {title}
                      </h3>
                      <p className="mr-owner">Proposed owner · {owner}</p>
                      <dl>
                        <dt>First discovery action</dt>
                        <dd>{action}</dd>
                        <dt>Decision criterion</dt>
                        <dd>{criterion}</dd>
                      </dl>
                    </article>
                  ))}
                </div>
                <h3 className="mr-subheading">
                  Evidence that unlocks the next decision
                </h3>
                <div className="mr-milestones">
                  {[
                    [
                      "Weeks 1–2",
                      "Establish the baseline",
                      "Operations + analytics",
                      "Count maintenance requests by function and direct/assisted channel. Define first-pass completion, repeat rejection, and median/p90 resolution time, with clear denominators. Record cost and staff time separately.",
                    ],
                    [
                      "Weeks 3–6",
                      "Validate the job and reuse path",
                      "Research + engineering + compliance",
                      "Conduct the proposed advisor/CSA interviews and workflow observations. Test account-scope, authority-type, exception, and evidence-retention boundaries against existing services. Cost the sourcing alternatives.",
                    ],
                    [
                      "By day 90",
                      "Resize or advance the investment",
                      "Product sponsor + operations + finance",
                      "Compare the bounded pilot with its baseline and explain volume mix, rework, service burden, and support cost. Agree acceptance thresholds before the pilot; shrink or redirect the program if the assisted workload does not support its scale.",
                    ],
                  ].map(([time, title, owner, text]) => (
                    <article key={time}>
                      <span className="am-eyebrow">
                        {time} · proposed milestone
                      </span>
                      <h4>{title}</h4>
                      <p className="mr-owner">{owner}</p>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <Evidence slide="23, 27, 30">
                  Resolution options are new proposed synthesis. Raw decks,
                  private exports, and forum identities are not part of this
                  application.
                </Evidence>
                <div className="mr-demo-links">
                  <span className="am-note">
                    Inspect the proposed behavior in synthetic operations:
                  </span>
                  <button onClick={() => openDemo("Blocked", "2")}>
                    Inspect exception queue →
                  </button>
                  <button onClick={() => openDemo("Ready for review", "3")}>
                    Inspect human review →
                  </button>
                </div>
              </>
            )}
            {section === 2 && <LifecycleResearch embedded view="positioning" />}
            {section === 5 && <LifecycleResearch embedded view="journey" />}
            {section === 6 && <LifecycleResearch embedded view="opportunity" />}
          </section>
        );
      })}
      <p className="am-note mr-provenance">
        Research origin: Claude Desktop · Wealthscape Market Research. Account
        Maintenance Frames and the executive study (18 Aug 2026); the original
        executive deck is retained for version history. Public links open the
        publisher sources. This walkthrough summarizes the source artifacts; it
        does not independently certify their full evidence base.
      </p>
      <div className="mr-guide-cta">
        <div><h2>See the research come to life</h2><p>Follow one synthetic household change from a blocked queue to reviewed evidence and an account report. The tour explains each design decision; the scenario lets you complete the checks yourself.</p></div>
        <div><button onClick={() => onStartGuide("scenario")}><FlaskConical size={16}/> Run Scenario</button><button onClick={() => onStartGuide("tour")}><BookOpen size={16}/> Take Tour</button></div>
      </div>
    </div>
  );
}
