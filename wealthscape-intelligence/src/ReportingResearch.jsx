import StrategyExecutiveSummary, {
  StrategySectionFinding,
} from "./StrategyExecutiveSummary.jsx";
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
  ArrowDownRight,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChartScatter,
  ClipboardCheck,
  Clock,
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
  reportingCapabilityLevels,
} from "./reportingResearch.js";
import "./ReportingResearch.css";
import {
  reportingOutcomes,
  reportingThemeOutcomeIds,
} from "./reportingOutcomes.js";
import { reportingScore } from "./reportingResearch.js";
import {
  ReportingEvidenceGrid,
  ReportingOpportunityMap,
  ReportingCapabilityExplorer,
  ReportingCapabilityMap,
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

const evidenceIconMap = {
  chart: ChartScatter,
  clock: Clock,
  columns: Columns3,
  file: FileText,
  layers: Layers,
  lightbulb: Lightbulb,
  route: Route,
  trend: ChartScatter,
  users: Users,
};
const evidenceSignalMap = {
  positive: {
    Icon: ArrowUpRight,
    label: "Positive signal",
  },
  negative: {
    Icon: ArrowDownRight,
    label: "Pressure signal",
  },
  neutral: {
    Icon: ArrowLeftRight,
    label: "Neutral signal",
  },
};
const outcomeBasisLabels = {
  sourced: "Sourced",
  derived: "Derived",
  inferred: "Inferred",
};
const outcomePrototypeSurface = {
  build: "Report Builder · Build",
  generate: "Report Builder · Generate",
  customize: "Report Builder · Customize",
};

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
      {items.map((item) => {
        const CardIcon = evidenceIconMap[item.icon] || FileText;
        const signal =
          evidenceSignalMap[item.signal] || evidenceSignalMap.neutral;
        const SignalIcon = signal.Icon;
        return (
          <article className="rr-detail" key={item.title}>
            <div className="rr-evidence-topline">
              <span className="rr-evidence-icon" aria-hidden="true">
                <CardIcon size={18} />
              </span>
              {item.signal && (
                <span className={`rr-evidence-signal rr-signal-${item.signal}`}>
                  <SignalIcon size={14} aria-hidden="true" />
                  {item.signalLabel || signal.label}
                </span>
              )}
            </div>
            {item.value && (
              <div className="rr-evidence-metric">
                <strong className="rr-evidence-value">{item.value}</strong>
                {item.metricLabel && <span>{item.metricLabel}</span>}
              </div>
            )}
            <h3>{item.title}</h3>
            {item.signalSummary && (
              <p className="rr-evidence-signal-summary">
                {item.signalSummary}
              </p>
            )}
            {item.context && <p className="rr-evidence-context">{item.context}</p>}
            <p>{item.finding}</p>
            {item.implication && (
              <Detail title={item.implicationTitle || "Strategy implication"}>
                {item.implication}
              </Detail>
            )}
            <div className="rr-source-links">
              {item.sources.map((source) => (
                <Source key={source} source={source} />
              ))}
            </div>
          </article>
        );
      })}
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
function PersonaPortrait({ persona }) {
  if (persona.name !== "Jordan Williams") {
    return (
      <span
        className="rr-persona-fallback"
        role="img"
        aria-label={`${persona.name}, illustrative persona`}
      >
        <Users size={32} aria-hidden="true" />
      </span>
    );
  }

  return (
    <img
      className="rr-persona-photo"
      src="/personas/jordan-williams.png"
      alt={`${persona.name}, synthetic advisor persona portrait`}
    />
  );
}
export default function ReportingResearch({ profile, onNavigate }) {
  const strategy = profile.strategy;
  const [active, setActive] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [outcomeView, setOutcomeView] = useState("map");
  const [competitor, setCompetitor] = useState(0);
  const [capability, setCapability] = useState(0);
  const [step, setStep] = useState(null);
  const [competitorView, setCompetitorView] = useState("map");
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
    if (id)
      requestAnimationFrame(() => {
        const panel = outcomePanel.current;
        if (!panel) return;
        const { top } = panel.getBoundingClientRect();
        if (
          window.matchMedia("(max-width: 1100px)").matches ||
          top < 0 ||
          top > window.innerHeight - 160
        ) {
          panel.focus({ preventScroll: true });
          panel.scrollIntoView({ block: "start", behavior: "instant" });
        }
      });
  };
  const selected = reportingOutcomes.find((item) => item.id === selectedId);
  const rankedOutcomes = [...reportingOutcomes].sort(
    (a, b) => reportingScore(b) - reportingScore(a),
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
      <StrategyExecutiveSummary
        track="reporting"
        sections={sections.map(([id, label]) => ({ id, label }))}
        onJump={(id) =>
          jump(sections.findIndex(([sectionId]) => sectionId === id))
        }
      />
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
          <StrategySectionFinding track="reporting" sectionId={id} />
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
                  aria-pressed={competitorView === "map"}
                  onClick={() => setCompetitorView("map")}
                >
                  Capability map
                </button>
                <button
                  aria-pressed={competitorView === "grid"}
                  onClick={() => setCompetitorView("grid")}
                >
                  Tabular evidence
                </button>
                <button
                  aria-pressed={competitorView === "explorer"}
                  onClick={() => setCompetitorView("explorer")}
                >
                  Capability cards
                </button>
                <button
                  aria-pressed={competitorView === "cards"}
                  onClick={() => setCompetitorView("cards")}
                >
                  Reference cards
                </button>
              </div>
              {competitorView === "map" ? (
                <ReportingCapabilityMap
                  selected={comparisonCell}
                  onSelect={selectComparison}
                  onClear={() => setComparisonCell(null)}
                />
              ) : competitorView === "explorer" ? (
                <ReportingCapabilityExplorer
                  selected={comparisonCell}
                  onSelect={selectComparison}
                />
              ) : competitorView === "grid" ? (
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
              {competitorView !== "map" && (
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
                        {
                          reportingCapabilityLevels[
                            reportingComparison[comparisonCell.row].cells[
                              comparisonCell.column
                            ].level
                          ].description
                        }
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
                      {[
                        vendor.source,
                        vendor.additionalSource,
                        ...(vendor.additionalSources || []),
                      ]
                        .filter(Boolean)
                        .filter(
                          (source, index, sources) =>
                            sources.indexOf(source) === index,
                        )
                        .map((source) => (
                          <Source source={source} key={source} />
                        ))}
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
              )}
              {competitorView === "cards" && (
                <>
                  <EvidenceCards items={reportingNarrativeEvidence} />
                  <div className="rr-thesis">
                    <h3>The control-layer opportunity</h3>
                    <p>{reportingControlGap}</p>
                  </div>
                </>
              )}
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
                statements frame discovery; quote-style language is synthesized
                from the research packet, not a transcript.
              </p>
              <div className="rr-grid rr-persona-grid">
                <article className="rr-persona">
                  <PersonaPortrait persona={strategy.persona} />
                  <div className="rr-persona-header">
                    <div>
                      <h3>{strategy.persona.name}</h3>
                      <p className="rr-persona-role">{strategy.persona.role}</p>
                    </div>
                    <span className="rr-persona-badge">JTBD persona</span>
                  </div>
                  <dl className="rr-persona-facts">
                    {strategy.persona.details.map(([key, value]) => (
                      <div key={key}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {strategy.customerNeeds?.length > 0 && (
                    <div className="rr-need-stack">
                      <p className="rr-need-title">Advisor needs in this job</p>
                      {strategy.customerNeeds.map((item) => (
                        <article className="rr-need" key={`${item.type}-${item.job}`}>
                          <span>{item.type}</span>
                          <strong>{item.need}</strong>
                          <small>{item.job}</small>
                        </article>
                      ))}
                    </div>
                  )}
                </article>
                <div className="rr-stack">
                  {strategy.customerPains.map((item) => (
                    <article className="rr-pain" key={item.pain}>
                      <div className="rr-pain-header">
                        {item.phase && (
                          <span className="rr-pain-phase">{item.phase}</span>
                        )}
                        {item.metric && (
                          <span className="rr-pain-metric">{item.metric}</span>
                        )}
                      </div>
                      {item.quote && (
                        <blockquote>{item.quote}</blockquote>
                      )}
                      <p>{item.pain}</p>
                      {item.job && (
                        <small>Where it shows up: {item.job}</small>
                      )}
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
                15 reporting outcomes, from assembly through delivery and
                evidence retrieval. Importance and satisfaction use directional
                0–10 estimates; opportunity uses a 0–20 computed score. The
                legend separates retained strategy ratings from inferred
                discovery assumptions.
              </p>
              <div
                className="am-tabs rr-view-switch"
                role="group"
                aria-label="Reporting outcome presentation"
              >
                <button
                  aria-pressed={outcomeView === "map"}
                  onClick={() => setOutcomeView("map")}
                >
                  Opportunity map
                </button>
                <button
                  aria-pressed={outcomeView === "ranked"}
                  onClick={() => setOutcomeView("ranked")}
                >
                  Ranked outcomes
                </button>
              </div>
              <div
                className={`rr-outcome-workspace ${outcomeView === "map" ? "rr-map-mode" : ""}`}
              >
                {outcomeView === "map" ? (
                  <ReportingOpportunityMap
                    outcomes={reportingOutcomes}
                    selectedId={selectedId}
                    onSelect={selectOutcome}
                  />
                ) : (
                  <div
                    className="rr-ranked-outcomes"
                    role="group"
                    aria-label="Reporting outcome priorities"
                  >
                    {rankedOutcomes.map((item, i) => (
                      <button
                        key={item.id}
                        className="rr-choice"
                        data-muted={!!selectedId && selectedId !== item.id}
                        aria-pressed={selectedId === item.id}
                        aria-controls="reporting-outcome-detail"
                        onClick={() => selectOutcome(item.id)}
                      >
                        <strong>
                          {i + 1}. {item.id}
                        </strong>
                        <span>{item.text}</span>
                        <span
                          className="rr-rank-bar"
                          aria-hidden="true"
                          style={{
                            "--score-pct": `${(reportingScore(item) / 20) * 100}%`,
                          }}
                        >
                          <span className="rr-rank-fill" />
                          <span className="rr-rank-marker">
                            <span className="rr-rank-score">
                              {reportingScore(item).toFixed(1)}
                            </span>
                          </span>
                        </span>
                        <span className="rr-evidence">
                          <i className={`rr-legend-${item.basis}`} />
                          {outcomeBasisLabels[item.basis]} input
                        </span>
                        <span className="rr-link">
                          Importance {item.imp.toFixed(1)} · Satisfaction{" "}
                          {item.sat.toFixed(1)} · Opportunity{" "}
                          {reportingScore(item).toFixed(1)}
                          <ArrowRight size={14} />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <article
                  className="rr-detail"
                  id="reporting-outcome-detail"
                  ref={outcomePanel}
                  tabIndex={-1}
                  aria-live="polite"
                >
                  <label className="am-field rr-select">
                    Explore an outcome
                    <select
                      value={selectedId || "all"}
                      onChange={(event) =>
                        selectOutcome(
                          event.target.value === "all"
                            ? null
                            : event.target.value,
                        )
                      }
                    >
                      <option value="all">All outcomes</option>
                      {reportingOutcomes.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.id} · {item.text}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    className="rr-outcome-reset"
                    aria-pressed={!selectedId}
                    onClick={() => selectOutcome(null)}
                  >
                    All outcomes
                  </button>
                  {selected ? (
                    <>
                      <p className="rr-outcome-theme-label">
                        {selected.id} · {selected.theme}
                      </p>
                      <h3>{selected.text}</h3>
                      <p>{selected.problem}</p>
                      <dl className="rr-outcome-values">
                        <div>
                          <dt>Importance proxy</dt>
                          <dd>{selected.imp.toFixed(1)} / 10</dd>
                        </div>
                        <div>
                          <dt>Satisfaction proxy</dt>
                          <dd>{selected.sat.toFixed(1)} / 10</dd>
                        </div>
                        <div>
                          <dt>Opportunity score</dt>
                          <dd>{reportingScore(selected).toFixed(1)} / 20</dd>
                        </div>
                      </dl>
                      <p className={`rr-outcome-tag rr-basis-${selected.basis}`}>
                        {outcomeBasisLabels[selected.basis]} input · directional
                        estimate
                      </p>
                      <h4>Where this shows up in the job map</h4>
                      <p className="rr-route-note">{selected.jobMap}</p>
                      <h4>Proposed UX response</h4>
                      <p>{selected.ux}</p>
                      <h4>Implemented demo coverage</h4>
                      <p>{selected.coverage}</p>
                      <div className="rr-outcome-prototype-link">
                        <span>Prototype connection</span>
                        <strong>
                          {outcomePrototypeSurface[selected.tab]} traces{" "}
                          {selected.id}
                        </strong>
                        <p>
                          Open the working surface with this outcome carried
                          forward as the strategy context.
                        </p>
                      </div>
                      <div className="rr-source-links">
                        {selected.sources.map((source) => (
                          <Source key={source} source={source} />
                        ))}
                      </div>
                      <Action
                        onNavigate={onNavigate}
                        layer="reports"
                        sub={{
                          reportTab: selected.tab,
                          profileId: profile.id,
                          strategyOutcomeId: selected.id,
                        }}
                      >
                        Open {outcomePrototypeSurface[selected.tab]} for{" "}
                        {selected.id}
                      </Action>
                      <button
                        className="rr-action rr-secondary-action"
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
                      <h3>All 15 outcomes</h3>
                      <p>
                        All 15 outcomes have equal emphasis. Select a map point,
                        ranked outcome or dropdown option to follow its scores,
                        evidence basis, proposed response and relevant demo.
                      </p>
                    </>
                  )}
                </article>
              </div>
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
                                setSelectedId(reportingThemeOutcomeIds[id]);
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
