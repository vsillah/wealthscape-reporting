import {
  reportingMarketEvidence,
  reportingClientEvidence,
  reportingControls,
  reportingNarrativeEvidence,
  reportingControlGap,
  reportingMoves,
  reportingPriorityOutcomes,
  reportingMeasures,
} from "./reportingEvidence.js";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChartScatter,
  ClipboardCheck,
  Columns3,
  FileText,
  Layers,
  Lightbulb,
  Route,
  Users,
  FlaskConical,
  TriangleAlert,
} from "lucide-react";
import { reportingRecommendationDetail } from "./reportingRecommendations.js";
import {
  reportingCompetitors,
  reportingSources,
  reportingComparison,
  reportingComparisonColumns,
} from "./reportingResearch.js";
import "./ReportingResearch.css";
import {
  ReportingEvidenceGrid,
  ReportingJourney,
} from "./ReportingVisuals.jsx";

const sections = [
  ["thesis", "Leadership decision", Lightbulb],
  ["market", "Competitor research", BookOpen],
  ["capabilities", "Capability gaps", Columns3],
  ["customer", "Customer context", Users],
  ["outcomes", "Outcomes & opportunities", ChartScatter],
  ["job", "Job map", Route],
  ["recommendations", "Recommendations", ClipboardCheck],
  ["sourcing", "Resolution strategy", Layers],
  ["governance", "Reporting controls", ClipboardCheck],
  ["measurement", "Roadmap & decision gates", Route],
  ["sources", "Source register", BookOpen],
];
function Source({ source = "packet" }) {
  const item = reportingSources[source];
  if (!item.href) return <span>{item.label} · Primary link pending</span>;
  return (
    <a href={item.href} target="_blank" rel="noreferrer">
      {item.label} ↗
    </a>
  );
}
function EvidenceCards({ items }) {
  return (
    <div className="rr-grid">
      {items.map((item) => (
        <article className="rr-detail" key={item.title}>
          {item.value && (
            <strong className="rr-evidence-value">{item.value}</strong>
          )}
          <h3>{item.title}</h3>
          <p>{item.finding}</p>
          {item.implication && (
            <Detail title="Strategy implication">{item.implication}</Detail>
          )}
          <div className="rr-source-links">
            {item.sources.map((source) => (
              <Source key={source} source={source} />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
function Action({ children, layer = "reports", sub = {}, onNavigate }) {
  return (
    <button className="rr-action" onClick={() => onNavigate(layer, sub)}>
      {children}
      <ArrowRight size={15} aria-hidden="true" />
    </button>
  );
}
function Detail({ title, children }) {
  return (
    <div>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
}
export function ReportingRecommendationContext({ deepLink }) {
  if (!deepLink?.recommendationFocus) return null;
  return (
    <aside
      className="rr-recommendation-context"
      aria-label="Reporting recommendation context"
    >
      <Lightbulb size={20} aria-hidden="true" />
      <div>
        <strong>Exploring a reporting recommendation</strong>
        <p>{deepLink.recommendationFocus}</p>
        <small>
          Synthetic demonstration · Production proposal remains subject to
          validation.
        </small>
      </div>
    </aside>
  );
}
export default function ReportingResearch({ profile, onNavigate }) {
  const strategy = profile.strategy;
  const [active, setActive] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [competitor, setCompetitor] = useState(0);
  const [capability, setCapability] = useState(0);
  const [step, setStep] = useState(null);
  const [competitorView, setCompetitorView] = useState("grid");
  const [comparisonCell, setComparisonCell] = useState(null);
  const journeyPanel = useRef(null);
  const vendorPanel = useRef(null);
  const revealOnNarrowScreen = (ref) => {
    if (window.matchMedia("(max-width: 1000px)").matches)
      requestAnimationFrame(() => {
        ref.current?.focus({ preventScroll: true });
        ref.current?.scrollIntoView({ block: "start", behavior: "instant" });
      });
  };
  const selectStep = (index) => {
    setStep(index);
    if (index !== null) revealOnNarrowScreen(journeyPanel);
  };
  const selectComparison = (row, column) => {
    setComparisonCell({ row, column });
    setCompetitor(reportingComparison[row].cells[column].reference);
    revealOnNarrowScreen(vendorPanel);
  };
  const [navHeight, setNavHeight] = useState(84);
  const nav = useRef(null);
  const panels = useRef({});
  const lockTracking = useRef(false);
  const outcomePanel = useRef(null);
  const selectOutcome = (id) => {
    setSelectedId(id);
    if (id) revealOnNarrowScreen(outcomePanel);
  };
  const selected = reportingPriorityOutcomes.find(
    (item) => item.id === selectedId,
  );
  const vendor = reportingCompetitors[competitor];
  const selectedCapability = strategy.capabilities[capability];
  const jump = (index) => {
    lockTracking.current = true;
    setActive(index);
    panels.current[sections[index][0]]?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  };
  useEffect(() => {
    const navigation = nav.current;
    let parent = navigation.parentElement;
    while (parent && !/(auto|scroll)/.test(getComputedStyle(parent).overflowY))
      parent = parent.parentElement;
    const scroller = parent || window;
    const track = () => {
      if (lockTracking.current || !navigation.getClientRects().length) return;
      const edge = navigation.getBoundingClientRect().bottom + 28;
      let current = 0;
      sections.forEach(([id], index) => {
        if (panels.current[id]?.getBoundingClientRect().top <= edge)
          current = index;
      });
      setActive(current);
    };
    const resume = (event) => {
      if (!navigation.contains(event.target)) lockTracking.current = false;
    };
    const resize = new ResizeObserver(() =>
      setNavHeight(navigation.getBoundingClientRect().height),
    );
    resize.observe(navigation);
    scroller.addEventListener("scroll", track, { passive: true });
    for (const name of ["wheel", "touchmove", "pointerdown", "keydown"])
      scroller.addEventListener(name, resume, { passive: true });
    return () => {
      resize.disconnect();
      scroller.removeEventListener("scroll", track);
      for (const name of ["wheel", "touchmove", "pointerdown", "keydown"])
        scroller.removeEventListener(name, resume);
    };
  }, []);
  return (
    <div
      className="am-workspace rr-research"
      style={{ "--mr-nav-height": `${navHeight}px` }}
    >
      <nav
        className="mr-navigation"
        ref={nav}
        aria-label="Reporting section navigation"
      >
        <label className="am-field">
          Jump to section
          <select
            value={active}
            onChange={(event) => jump(Number(event.target.value))}
          >
            {sections.map(([id, label], index) => (
              <option key={id} value={index}>
                {index + 1}. {label}
              </option>
            ))}
          </select>
        </label>
        <div className="mr-paging">
          <button disabled={active === 0} onClick={() => jump(active - 1)}>
            ← Previous
          </button>
          <span>
            {active + 1} / {sections.length}
          </span>
          <button
            disabled={active === sections.length - 1}
            onClick={() => jump(active + 1)}
          >
            Next →
          </button>
        </div>
      </nav>
      {sections.map(([id, label, Icon], index) => (
        <section
          className="mr-panel rr-panel"
          id={`reporting-${id}`}
          key={id}
          ref={(node) => {
            panels.current[id] = node;
          }}
          aria-labelledby={`reporting-heading-${id}`}
        >
          <header className="mr-section-heading">
            <span className="mr-section-icon">
              <Icon size={23} aria-hidden="true" />
            </span>
            <div>
              <span className="am-eyebrow">
                {String(index + 1).padStart(2, "0")} · Reporting modernization
              </span>
              <h2 id={`reporting-heading-${id}`}>{label}</h2>
            </div>
          </header>
          {id === "thesis" && (
            <>
              <p className="mr-lead">
                Governed client report production brings account context, source
                data, content rules, approval and delivery into one traceable
                path. The investment decision is whether a bounded workflow can
                reduce preparation and review work while retaining the evidence
                behind the client report.
              </p>
              <div className="rr-thesis">
                <span className="am-eyebrow">Proposed leadership decision</span>
                <h3>Governed client report production</h3>
                <p>
                  Prioritize report assembly, review, and delivery for the{" "}
                  {profile.label.toLowerCase()} workflow. Establish the current
                  preparation time and rework rate, then test a bounded pilot
                  with approval, source evidence and retention controls.
                </p>
                <Action onNavigate={onNavigate} sub={{ reportTab: "build" }}>
                  Open Reporting outputs
                </Action>
              </div>
              <div className="rr-grid">
                <Detail title="What the pilot should prove">
                  Less report preparation and fewer avoidable review loops, with
                  a traceable source and accountable reviewer. Set targets after
                  measuring a baseline.
                </Detail>
                <Detail title="Decision gate">
                  Confirm data ownership, disclosure requirements, and the
                  review path with operations and compliance before funding
                  production integration.
                </Detail>
              </div>
              <p className="rr-evidence">
                Illustrative pilots on synthetic data. Persona details and
                outcome priorities are management estimates / strategic
                hypotheses. No production readiness, customer-data validation or
                compliance approval is claimed.
              </p>
            </>
          )}
          {id === "market" && (
            <>
              <p className="rr-intro">
                Nine vendors frame the competitive trajectory. Public sources
                describe templates, batch generation, scheduled delivery, client
                portals, access permissions, advisor branding, generated
                narrative and multi-source consolidation across the market.
                Select a reference to inspect its scope.
              </p>
              <EvidenceCards items={reportingMarketEvidence} />
              <div
                className="am-tabs rr-view-switch"
                role="group"
                aria-label="Competitor presentation"
              >
                <button
                  aria-pressed={competitorView === "grid"}
                  onClick={() => setCompetitorView("grid")}
                >
                  Capability evidence map
                </button>
                <button
                  aria-pressed={competitorView === "cards"}
                  onClick={() => setCompetitorView("cards")}
                >
                  Reference cards
                </button>
              </div>
              {competitorView === "grid" ? (
                <ReportingEvidenceGrid
                  selected={comparisonCell}
                  onSelect={selectComparison}
                />
              ) : (
                <div className="rr-grid">
                  {reportingCompetitors.map((item, i) => {
                    const VendorIcon = {
                      layers: Layers,
                      chart: ChartScatter,
                      users: Users,
                      report: FileText,
                    }[item.icon];
                    return (
                      <button
                        className="rr-choice"
                        key={item.focus}
                        aria-pressed={competitor === i}
                        aria-controls="reporting-vendor-detail"
                        onClick={() => {
                          setCompetitor(i);
                          setComparisonCell(null);
                        }}
                      >
                        <span className="rr-icon">
                          <VendorIcon size={22} aria-hidden="true" />
                        </span>
                        <strong>{item.name}</strong>
                        <span>{item.focus}</span>
                        <span className="rr-link">
                          Explore capability <ArrowRight size={14} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              <article
                className="rr-detail"
                id="reporting-vendor-detail"
                ref={vendorPanel}
                tabIndex={-1}
                aria-live="polite"
              >
                <span className="am-eyebrow">
                  {vendor.incumbent
                    ? "Incumbent Wealthscape baseline"
                    : "Vendor-described capability"}
                </span>
                <h3>
                  {vendor.name} · {vendor.focus}
                </h3>
                {comparisonCell && (
                  <div className="rr-comparison-note">
                    <h4>
                      {reportingComparisonColumns[comparisonCell.column]} ·{" "}
                      {reportingComparison[comparisonCell.row].cells[
                        comparisonCell.column
                      ].described
                        ? "Described in source"
                        : "Not assessed"}
                    </h4>
                    <p>
                      {
                        reportingComparison[comparisonCell.row].cells[
                          comparisonCell.column
                        ].note
                      }
                    </p>
                  </div>
                )}
                <div className="rr-grid">
                  <Detail title="Public evidence">{vendor.evidence}</Detail>
                  <Detail title="Proposed response">
                    {vendor.implication}
                  </Detail>
                </div>
                <Detail title="Illustrative pilot & production gap">
                  {vendor.gap}
                </Detail>
                <div className="rr-footer">
                  <div className="rr-source-links">
                    <Source source={vendor.source} />
                    {vendor.additionalSource && (
                      <Source source={vendor.additionalSource} />
                    )}
                  </div>
                  <Action
                    onNavigate={onNavigate}
                    layer={vendor.layer}
                    sub={vendor.sub}
                  >
                    {vendor.action}
                  </Action>
                </div>
              </article>
              <EvidenceCards items={reportingNarrativeEvidence} />
              <div className="rr-thesis">
                <h3>The control-layer opportunity</h3>
                <p>{reportingControlGap}</p>
              </div>
              <p className="rr-evidence">
                Vendor pages reviewed 15 September 2026. Public positioning
                establishes a comparison point; it does not prove integration
                availability or independently measured performance.
              </p>
            </>
          )}
          {id === "capabilities" && (
            <>
              <p className="rr-intro">
                The strategy packet adds a role-specific lens to reporting.
                These are discovery gaps to validate against the current
                Wealthscape stack.
              </p>
              {strategy.capabilities.length ? (
                <>
                  <div className="rr-grid rr-three">
                    {strategy.capabilities.map((item, i) => (
                      <button
                        key={item.capability}
                        className="rr-choice"
                        aria-pressed={capability === i}
                        aria-controls="reporting-capability-detail"
                        onClick={() => setCapability(i)}
                      >
                        <span className="rr-icon">
                          <Columns3 size={20} />
                        </span>
                        <strong>{item.capability}</strong>
                        <span>
                          {item.rating === "partial"
                            ? "Partial coverage in packet"
                            : item.rating === "strong"
                              ? "Coverage described in packet"
                              : "Gap identified in packet"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <article
                    className="rr-detail"
                    id="reporting-capability-detail"
                    aria-live="polite"
                  >
                    <h3>{selectedCapability.capability}</h3>
                    <div className="rr-grid">
                      <Detail title="Packet assessment">
                        {selectedCapability.fidelity}
                      </Detail>
                      <Detail title="Reference direction">
                        {selectedCapability.competitor}
                      </Detail>
                    </div>
                    <Detail title="Gap to validate">
                      {selectedCapability.gap}
                    </Detail>
                    <p className="rr-evidence">
                      {selectedCapability.source} · Historical assessment from
                      the strategy packet; current production coverage has not
                      been audited.
                    </p>
                    <Source />
                  </article>
                </>
              ) : (
                <div className="rr-detail">
                  <h3>Validate the reporting baseline</h3>
                  <p>
                    The RIA packet has no scored capability matrix. Start with
                    report assembly, reusable branding, data lineage, and client
                    delivery using the vendor comparison above.
                  </p>
                  <Action onNavigate={onNavigate} sub={{ reportTab: "build" }}>
                    Inspect the reporting prototype
                  </Action>
                </div>
              )}
            </>
          )}
          {id === "customer" && (
            <>
              <EvidenceCards items={reportingClientEvidence} />
              <p className="rr-intro">
                Illustrative persona · {strategy.persona.role}. These pain
                statements frame discovery; they are not verbatim interview
                findings.
              </p>
              <div className="rr-grid">
                <article className="rr-persona">
                  <span className="rr-icon">
                    <Users size={22} />
                  </span>
                  <h3>{strategy.persona.name}</h3>
                  <dl>
                    {strategy.persona.details.map(([key, value]) => (
                      <div key={key}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
                <div className="rr-stack">
                  {strategy.customerPains.map((item) => (
                    <article className="rr-pain" key={item.pain}>
                      <p>{item.pain}</p>
                    </article>
                  ))}
                </div>
              </div>
              <p className="rr-evidence">
                Validate with advisor and operations interviews, support cases,
                and reporting telemetry. Quantitative claims from the legacy
                pain list are not used as measured baselines here.
              </p>
            </>
          )}
          {id === "outcomes" && (
            <>
              <p className="rr-intro">
                Five reporting outcomes for the dual-registered segment.
                Priority order and the underserved position are management
                estimates and strategic hypotheses, not survey scores. No
                numeric opportunity score is computed.
              </p>
              <div className="rr-thesis">
                <h3>Proposed underserved opportunity</h3>
                <p>
                  High importance and low satisfaction are hypotheses at outcome
                  level. Category-level Kitces ratings do not measure these five
                  jobs. Validate each with the selected profile.
                </p>
              </div>
              <div
                className="rr-grid"
                role="group"
                aria-label="Reporting outcome priorities"
              >
                {reportingPriorityOutcomes.map((item, i) => (
                  <button
                    key={item.id}
                    className="rr-choice"
                    aria-pressed={selectedId === item.id}
                    aria-controls="reporting-outcome-detail"
                    onClick={() => selectOutcome(item.id)}
                  >
                    <strong>
                      {i + 1}. {item.id}
                    </strong>
                    <span>{item.text}</span>
                    <span className="rr-link">
                      Explore proposal <ArrowRight size={14} />
                    </span>
                  </button>
                ))}
              </div>
              <article
                className="rr-detail"
                id="reporting-outcome-detail"
                ref={outcomePanel}
                tabIndex={-1}
                aria-live="polite"
              >
                {selected ? (
                  <>
                    <h3>{selected.id}</h3>
                    <p>{selected.text}</p>
                    <p>
                      Proposed move: {reportingMoves[selected.move - 1].title}
                    </p>
                    <button
                      className="rr-action"
                      onClick={() =>
                        jump(
                          sections.findIndex(
                            ([key]) => key === "recommendations",
                          ),
                        )
                      }
                    >
                      Inspect evidence, pilot and validation gate{" "}
                      <ArrowRight size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <h3>Explore the five outcomes</h3>
                    <p>
                      Select an outcome to follow its recommendation,
                      illustrative pilot and production gate.
                    </p>
                  </>
                )}
              </article>
            </>
          )}
          {id === "job" && (
            <>
              <p className="rr-intro">
                Reporting effort is hypothesized to concentrate in Locate,
                Prepare and Confirm. This is a management estimate, not a
                measured time study. Select a phase to inspect the client event,
                operating concern, owner handoff and evidence required.
              </p>
              <ReportingJourney
                selectedStep={step}
                onSelect={selectStep}
                onNavigate={onNavigate}
                detailRef={journeyPanel}
              />
            </>
          )}
          {id === "recommendations" && (
            <>
              <p className="rr-intro">
                Sequence four moves: unify household/context; surface blockers
                before assembly; govern narrative with approved controls; route
                work with operational owner, status and evidence. Establish
                control design before production integration, and keep generated
                narrative inside that boundary.
              </p>
              <div className="rr-stack">
                {reportingMoves.map((item) => {
                  const target = reportingRecommendationDetail(
                    { id: "bd-hybrid-advisor" },
                    item,
                  );
                  const Icon = {
                    users: Users,
                    alert: TriangleAlert,
                    route: Route,
                    review: ClipboardCheck,
                    report: FileText,
                    chart: ChartScatter,
                    layers: Layers,
                  }[target.icon];
                  return (
                    <article
                      className="rr-recommendation"
                      key={item.n}
                      aria-labelledby={`reporting-rec-${item.n}`}
                    >
                      <header>
                        <span className="rr-icon">
                          <Icon size={24} aria-hidden="true" />
                        </span>
                        <div>
                          <span className="am-eyebrow">
                            Proposed direction · {item.n}
                          </span>
                          <h3 id={`reporting-rec-${item.n}`}>{item.title}</h3>
                        </div>
                      </header>
                      <div
                        className="rr-rec-outcomes"
                        aria-label="Outcomes addressed"
                      >
                        <strong>Outcomes addressed</strong>
                        {item.outcomes.map((id) => {
                          const outcome = reportingPriorityOutcomes.find(
                            (o) => o.id === id,
                          );
                          return outcome ? (
                            <button
                              key={id}
                              title={outcome.text}
                              aria-label={`Inspect ${id}: ${outcome.text}`}
                              onClick={() => {
                                setSelectedId(id);
                                jump(
                                  sections.findIndex(
                                    ([key]) => key === "outcomes",
                                  ),
                                );
                              }}
                            >
                              {id}
                              <ArrowRight size={12} aria-hidden="true" />
                            </button>
                          ) : (
                            <span key={id}>{id}</span>
                          );
                        })}
                      </div>
                      <p className="rr-rec-ux">
                        <strong>UX decision</strong> {item.body}
                      </p>
                      <Detail title="Evidence">{item.evidence}</Detail>
                      <div className="rr-source-links">
                        {item.sources.map((source) => (
                          <Source key={source} source={source} />
                        ))}
                      </div>
                      <div className="rr-rec-columns">
                        <section className="rr-rec-demo">
                          <h4>
                            <FlaskConical size={17} aria-hidden="true" />
                            Illustrative pilot today
                          </h4>
                          <p>{target.demonstrated}</p>
                          <p className="rr-evidence">{target.limitation}</p>
                          <Action
                            onNavigate={onNavigate}
                            layer={target.layer}
                            sub={{ ...target.sub, profileId: profile.id }}
                          >
                            {target.action}
                          </Action>
                        </section>
                        <section className="rr-rec-production">
                          <h4>
                            <ClipboardCheck size={17} aria-hidden="true" />
                            Production proposal
                          </h4>
                          <p>{target.production}</p>
                          <dl>
                            <dt>Dependency</dt>
                            <dd>{target.dependency}</dd>
                            <dt>Validation gate</dt>
                            <dd>{target.gate}</dd>
                          </dl>
                        </section>
                      </div>
                    </article>
                  );
                })}
              </div>
              <p className="rr-evidence">
                The four moves are strategic proposals. Pilot surfaces
                illustrate interactions; they do not establish live data,
                enforced controls, durable evidence, production readiness or
                measured customer impact. Governance requirements must be met
                before any generated narrative reaches a client.
              </p>
              <div className="rr-footer rr-report-links">
                <span>
                  <FileText size={18} /> Explore Reporting outputs
                </span>
                {[
                  ["build", "Build report"],
                  ["customize", "Customize report"],
                  ["generate", "Generate report"],
                ].map(([tab, label]) => (
                  <Action
                    key={tab}
                    onNavigate={onNavigate}
                    sub={{ reportTab: tab }}
                  >
                    {label}
                  </Action>
                ))}
              </div>
            </>
          )}
          {id === "governance" && (
            <>
              <p className="rr-intro">
                Rule snapshot: in force/current as of 15 September 2026.
                Compliance must classify each report, audience and account
                context, confirm exceptions and approve implementation. These
                are design inputs, not a compliance sign-off.
              </p>
              <EvidenceCards items={reportingControls} />
              <div className="rr-thesis">
                <h3>Control-layer acceptance gate</h3>
                <p>
                  Demonstrate permitted claims and disclosures, claim-to-source
                  attribution and refusal, entitled reviewers with named
                  decisions, and retention with prompt/output and model-version
                  logs. Retrieve the approved version actually delivered. The
                  current illustrative pilots establish none of these production
                  controls.
                </p>
              </div>
            </>
          )}
          {id === "measurement" && (
            <>
              <p className="rr-intro">
                Stage boundaries are evidence gates. No delivery dates or
                measured benefit are committed.
              </p>
              <ol className="rr-roadmap">
                <li>
                  <strong>Instrument the current path.</strong> Name owners and
                  establish preparation, rework and review baselines.
                </li>
                <li>
                  <strong>Reconcile one household.</strong> Explain every
                  missing or conflicting account across products.
                </li>
                <li>
                  <strong>Run one bounded report path.</strong> One segment and
                  report type; assemble, review, deliver and follow up under the
                  required controls.
                </li>
                <li>
                  <strong>Evidence the control layer.</strong> Prove approval,
                  source attribution, retention, model logging and retrieval
                  before expanding generated narrative.
                </li>
                <li>
                  <strong>Decide: scale, re-scope or stop.</strong> Use the
                  measured results; demonstration polish is not an investment
                  gate.
                </li>
              </ol>
              <div className="rr-grid">
                {reportingMeasures.map(([title, definition]) => (
                  <article className="rr-detail" key={title}>
                    <span className="rr-badge">No baseline yet</span>
                    <h3>{title}</h3>
                    <p>{definition}</p>
                  </article>
                ))}
              </div>
              <p className="rr-evidence">
                Falsification gate: if preparation is already low, rework is
                near zero or review takes minutes, investigate a different
                constraint and stop or re-scope. Increased narrative rejection
                or failed approval retrieval blocks scale. Targets follow
                baseline measurement.
              </p>
            </>
          )}
          {id === "sources" && (
            <>
              <p className="rr-intro">
                Public-source register · 15 September 2026. Sourced findings,
                management estimates and strategic hypotheses are distinct.
                Vendor documentation is not a product audit; interested-party
                studies do not establish causal benefits.
              </p>
              <div className="rr-stack">
                {Object.entries(reportingSources)
                  .filter(([key]) => key !== "packet")
                  .map(([key, source]) => (
                    <article className="rr-sourcing" key={key}>
                      <Source source={key} />
                      <p>
                        {source.note ||
                          "Vendor-published reporting reference; reviewed 15 September 2026. Confirm capability scope and availability with the provider."}
                      </p>
                    </article>
                  ))}
              </div>
            </>
          )}
          {id === "sourcing" && (
            <>
              <p className="rr-intro">
                Sourcing proposals from the strategy packet. Confirm existing
                contracts, architecture, controls, and operating ownership
                before making an investment decision.
              </p>
              <div className="rr-grid">
                {strategy.buildBuy.map((item) => (
                  <article className="rr-sourcing" key={item.gap}>
                    <span className="rr-badge">{item.call} · proposed</span>
                    <h3>{item.gap}</h3>
                    <p>{item.rationale}</p>
                    <p className="rr-evidence">
                      Role: {item.role} · Maturity: {item.maturity} · Urgency:{" "}
                      {item.urgency}
                    </p>
                  </article>
                ))}
              </div>
              {!strategy.buildBuy.length && (
                <p className="rr-evidence">
                  No sourcing decisions are recorded for this profile. Evaluate
                  the reporting workflow and data contracts before selecting
                  build, buy, or partner.
                </p>
              )}
              <div className="rr-thesis">
                <h3>Next decision: approve a bounded discovery pilot</h3>
                <p>
                  Select one reporting use case, name the data and review
                  owners, and agree on baseline measures. Use the pilot evidence
                  to decide which capabilities to build and which existing
                  services to connect.
                </p>
                <Action onNavigate={onNavigate} sub={{ reportTab: "build" }}>
                  Review the reporting workflow
                </Action>
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}
