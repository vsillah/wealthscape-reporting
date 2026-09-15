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
} from "lucide-react";
import {
  reportingCompetitors,
  reportingOutcomeDetail,
  reportingScore,
  reportingSources,
  reportingComparison,
  reportingComparisonColumns,
} from "./reportingResearch.js";
import "./ReportingResearch.css";
import {
  ReportingEvidenceGrid,
  ReportingOpportunityMap,
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
];
function Source({ source = "packet" }) {
  const item = reportingSources[source];
  return (
    <a href={item.href} target="_blank" rel="noreferrer">
      {item.label} ↗
    </a>
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
export default function ReportingResearch({ profile, onNavigate }) {
  const strategy = profile.strategy;
  const ranked = [...strategy.outcomes].sort(
    (a, b) => reportingScore(b) - reportingScore(a),
  );
  const [active, setActive] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [competitor, setCompetitor] = useState(0);
  const [capability, setCapability] = useState(0);
  const [step, setStep] = useState(null);
  const [outcomeView, setOutcomeView] = useState("map");
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
  const selected = ranked.find((item) => item.id === selectedId);
  const detail = selected ? reportingOutcomeDetail(selected, strategy) : null;
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
                A client needs one clear explanation. The team still has to
                bring together account data, report content, disclosures, and
                review. Make that path continuous so the client-ready output
                carries the context behind it.
              </p>
              <div className="rr-thesis">
                <span className="am-eyebrow">Proposed leadership decision</span>
                <h3>
                  Validate one reporting workflow before expanding the platform.
                </h3>
                <p>
                  Prioritize report assembly, review, and delivery for the{" "}
                  {profile.label.toLowerCase()} workflow. Establish the current
                  preparation time and rework rate, then test whether the
                  prototype removes those handoffs.
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
                Strategy synthesis · Synthetic prototype. Persona details and
                outcome scores are directional inputs, not measured customer
                results.
              </p>
            </>
          )}
          {id === "market" && (
            <>
              <p className="rr-intro">
                Compare the reporting capabilities vendors describe, then
                inspect the related prototype response. Select a card to explore
                the evidence and the remaining gap.
              </p>
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
                <div className="rr-grid rr-three">
                  {reportingCompetitors.map((item, i) => {
                    const VendorIcon = [Layers, ChartScatter, Users][i];
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
                          <VendorIcon size={22} />
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
                <span className="am-eyebrow">Vendor-described capability</span>
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
                <Detail title="Prototype coverage & gap">{vendor.gap}</Detail>
                <div className="rr-footer">
                  <Source source={vendor.source} />
                  <Action
                    onNavigate={onNavigate}
                    layer={vendor.layer}
                    sub={vendor.sub}
                  >
                    {vendor.action}
                  </Action>
                </div>
              </article>
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
                Select an outcome to connect the customer problem to a proposed
                response and an implemented demo. Scores prioritize discovery
                and remain directional.
              </p>
              <label className="am-field rr-select">
                Explore an outcome
                <select
                  value={selected?.id || "all"}
                  onChange={(event) =>
                    selectOutcome(
                      event.target.value === "all" ? null : event.target.value,
                    )
                  }
                >
                  <option value="all">All outcomes</option>
                  {ranked.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} · {item.text}
                    </option>
                  ))}
                </select>
              </label>
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
                <button
                  aria-pressed={!selected}
                  onClick={() => selectOutcome(null)}
                >
                  All outcomes
                </button>
              </div>
              <div
                className={`rr-outcomes ${outcomeView === "map" ? "rr-map-mode" : ""}`}
              >
                {outcomeView === "map" ? (
                  <ReportingOpportunityMap
                    outcomes={ranked}
                    selectedId={selectedId}
                    onSelect={selectOutcome}
                  />
                ) : (
                  <div
                    className="rr-ranking"
                    role="group"
                    aria-label="Reporting outcome ranking"
                  >
                    {ranked.map((item) => (
                      <button
                        key={item.id}
                        className="rr-outcome"
                        aria-pressed={item.id === selected?.id}
                        aria-controls="reporting-outcome-detail"
                        onClick={() => selectOutcome(item.id)}
                      >
                        <span className="rr-outcome-top">
                          <strong>{item.id}</strong>
                          <b>{reportingScore(item).toFixed(1)}</b>
                        </span>
                        <span>{item.text}</span>
                        <span className="rr-bar">
                          <span
                            style={{
                              width: `${(reportingScore(item) / 20) * 100}%`,
                            }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                <article
                  ref={outcomePanel}
                  tabIndex={-1}
                  className="rr-detail"
                  id="reporting-outcome-detail"
                  aria-live="polite"
                >
                  {selected ? (
                    <>
                      <span className="am-eyebrow">
                        {selected.id} · Directional opportunity
                      </span>
                      <h3>{detail.problem}</h3>
                      <div className="rr-scores">
                        <span>
                          Importance <b>{selected.imp.toFixed(1)} / 10</b>
                        </span>
                        <span>
                          Satisfaction <b>{selected.sat.toFixed(1)} / 10</b>
                        </span>
                        <span>
                          Opportunity{" "}
                          <b>{reportingScore(selected).toFixed(1)} / 20</b>
                        </span>
                      </div>
                      <Detail title="Current gap">{detail.gap}</Detail>
                      <Detail title="Proposed UX response">
                        {detail.response}
                      </Detail>
                      <Detail title="Implemented prototype & limits">
                        {detail.limitation}
                      </Detail>
                      <Action
                        onNavigate={onNavigate}
                        layer={detail.layer}
                        sub={detail.sub}
                      >
                        {detail.action}
                      </Action>
                      <p className="rr-evidence">{detail.evidence}</p>
                      {profile.id !== "ria" && <Source />}
                    </>
                  ) : (
                    <>
                      <h3>All reporting outcomes</h3>
                      <p>
                        Every outcome has equal emphasis. Select a numbered
                        point, ranked row, or dropdown option to inspect the
                        problem, response, evidence, and prototype destination.
                      </p>
                      <p className="rr-evidence">
                        The map uses the same directional scores as the ranking.
                        Switching views preserves your selection.
                      </p>
                    </>
                  )}
                </article>
              </div>
              <p className="rr-evidence">
                Opportunity = importance + max(importance − satisfaction, 0).
                Source ratings are synthesis estimates; the ranking is not a
                funded roadmap or a measured impact claim.
              </p>
            </>
          )}
          {id === "job" && (
            <>
              <p className="rr-intro">
                Follow a reporting request from agreed scope to a client
                conversation. Select a phase to highlight the client event,
                operations concern, and handoff across the full experience.
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
                Use these moves to scope the pilot. Each recommendation links to
                the closest implemented prototype and identifies the outcome it
                is intended to support.
              </p>
              <div className="rr-stack">
                {strategy.recommendations.map((item) => {
                  const outcome = strategy.outcomes.find((outcome) =>
                    item.outcomes.includes(outcome.id),
                  );
                  const target = outcome
                    ? reportingOutcomeDetail(outcome, strategy)
                    : {
                        layer: "reports",
                        sub: { reportTab: "build" },
                        action: "Open Reporting outputs",
                      };
                  return (
                    <article className="rr-recommendation" key={item.n}>
                      <span className="rr-number">{item.n}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        <p className="rr-evidence">
                          Proposed response · {item.outcomes.join(" · ")}
                        </p>
                        <Action
                          onNavigate={onNavigate}
                          layer={target.layer}
                          sub={target.sub}
                        >
                          {target.action}
                        </Action>
                      </div>
                    </article>
                  );
                })}
              </div>
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
