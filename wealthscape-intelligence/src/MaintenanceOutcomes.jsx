import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LifecycleResearch, outcomes } from "./LifecycleExperience";
import { visibleCases } from "./AccountMaintenance";
import {
  outcomeSolutions,
  rankedOutcomeSolutions,
  outcomeScoreScale,
  outcomeDestination,
  normalizeOutcomeSelection,
} from "./maintenanceOutcomeSolutions.js";
import { outcomeQuadrant } from "./maintenanceQuadrants.js";

const odiSegmentHypotheses = [
  {
    title: "Exception-control segment",
    ids: [1, 2, 3, 8, 9, 14],
    need: "Know what is missing, who owns the next action, and whether the change is complete.",
    posture: "Differentiated wedge",
    implication:
      "Best first wedge for differentiation: reduce rework before expanding authority or scope.",
  },
  {
    title: "Household-authority segment",
    ids: [4, 5, 10, 11, 12, 15],
    need: "Apply the right authority and evidence across every affected account without re-collecting the same proof.",
    posture: "Dominant-platform option to test",
    implication:
      "Potential dominant platform move if a survey confirms broad demand across advisor and operations segments.",
  },
  {
    title: "Compliance-currency segment",
    ids: [6, 13],
    need: "Find stale or overdue evidence before a review event forces reactive service work.",
    posture: "Selective differentiation",
    implication:
      "Selective differentiation: connect evidence currency to status and review readiness before automating alerts.",
  },
  {
    title: "Conversion-servicing segment",
    ids: [7],
    need: "Reconcile acquired-book account scope, ownership, and authority before service volume scales.",
    posture: "Targeted segment play",
    implication:
      "Targeted segment strategy: validate whether this is a high-value niche before funding enterprise tooling.",
  },
];

const quadrantOrder = [
  ["Underserved", "Opportunity / underserved"],
  ["Table stakes", "Table stakes"],
  ["Overserved", "Overserved"],
  ["Ignore", "Ignore"],
];

const quadrantCounts = outcomes.reduce((counts, values) => {
  const quadrant = outcomeQuadrant(values[1], values[2]);
  counts[quadrant] = (counts[quadrant] || 0) + 1;
  return counts;
}, {});

function outcomeSummary(ids) {
  const rows = ids.map((id) => {
    const values = outcomes[id - 1];
    const solution = outcomeSolutions[id - 1];
    return {
      id,
      importance: values[2],
      satisfaction: values[1],
      score: solution.score,
      quadrant: outcomeQuadrant(values[1], values[2]),
    };
  });
  const average = (key) =>
    rows.reduce((total, row) => total + row[key], 0) / rows.length;
  return {
    rows,
    opportunity: average("score"),
    importance: average("importance"),
    satisfaction: average("satisfaction"),
  };
}

function odiSegmentForOutcome(outcomeId) {
  if (!outcomeId) return null;
  return odiSegmentHypotheses.find((segment) => segment.ids.includes(outcomeId));
}

function OdiCompactRead() {
  return (
    <div className="mo-odi-compact" aria-label="ODI strategy read">
      <div>
        <span>ODI strategy read</span>
        <p>
          Differentiation is the strongest current signal; disruption is not
          supported by this map yet.
        </p>
      </div>
      <div className="mo-odi-counts" aria-label="Opportunity map counts">
        {quadrantOrder.map(([label, key]) => (
          <span key={label}>
            <strong>{quadrantCounts[key] || 0}</strong>
            <span>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MaintenanceOutcomes({
  profile,
  cases,
  onNavigate,
  selectedOutcome,
  onOutcomeChange,
}) {
  const inspectorRef = useRef(null);
  const [view, setView] = useState("map");
  const [localSelected, setLocalSelected] = useState(-1);
  const selected =
    selectedOutcome === undefined
      ? localSelected
      : normalizeOutcomeSelection(selectedOutcome);
  const select = (value) => {
    const next = normalizeOutcomeSelection(value);
    if (selectedOutcome === undefined) setLocalSelected(next);
    onOutcomeChange?.(next);
  };
  const selectRanked = (value) => {
    select(value);
    if (!window.matchMedia("(max-width: 1000px)").matches) return;
    requestAnimationFrame(() => {
      const inspector = inspectorRef.current;
      if (!inspector) return;
      inspector.focus({ preventScroll: true });
      inspector.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  };
  const solution = outcomeSolutions[selected];
  const values = outcomes[selected];
  const quadrant = values ? outcomeQuadrant(values[1], values[2]) : null;
  const selectedSegment = solution ? odiSegmentForOutcome(solution.id) : null;
  const selectedSegmentSummary = selectedSegment
    ? outcomeSummary(selectedSegment.ids)
    : null;
  const destination = outcomeDestination(
    solution?.id,
    profile.id,
    visibleCases(cases, profile),
  );
  const detail = solution ? (
    <article
      ref={inspectorRef}
      tabIndex={-1}
      className="mo-detail"
      aria-label="Selected outcome solution"
    >
      <h3>
        {solution.id}. {values[0]}
      </h3>
      <p>{solution.problem}</p>
      {selectedSegment && (
        <div className="mo-odi-context" aria-label="ODI strategy context">
          <span>ODI posture</span>
          <strong>{selectedSegment.posture}</strong>
          <p>{selectedSegment.implication}</p>
          <small>
            {selectedSegment.title} ·{" "}
            {selectedSegmentSummary.opportunity.toFixed(1)} average opportunity ·{" "}
            {selectedSegment.ids.map((id) => `O${id}`).join(", ")}
          </small>
        </div>
      )}
      <dl className="mo-values">
        <div>
          <dt>Frames importance / satisfaction</dt>
          <dd>
            {values[2].toFixed(2)} / {values[1].toFixed(2)}{" "}
            <span>· each out of 5</span>
          </dd>
        </div>
        <div>
          <dt>Directional opportunity score</dt>
          <dd>
            {solution.score.toFixed(2)} <span>· slide 18</span>
          </dd>
        </div>
        <div>
          <dt>Opportunity quadrant</dt>
          <dd>
            {quadrant} <span>· based on Frames coordinates</span>
          </dd>
        </div>
      </dl>
      <p className="mo-tag">{values[3]} input · directional proxy</p>
      <h4>Proposed UX response</h4>
      <p>{solution.ux}</p>
      <h4>
        {solution.adjacent
          ? "Adjacent demo pattern · capability not implemented"
          : "Implemented demo coverage"}
      </h4>
      <p>{solution.demo}</p>
      {destination.context && (
        <p className="mo-route-note">{destination.context}</p>
      )}
      <button
        className="am-primary"
        onClick={() => onNavigate(destination.layer, destination.sub)}
      >
        {destination.label}
        <ArrowRight size={15} />
      </button>
    </article>
  ) : (
    <div className="mo-empty">
      <h3>All outcomes</h3>
      <p>
        Compare all 15 outcomes with equal emphasis. Select a chart point,
        ranked row, or dropdown option to inspect the problem, proposed
        response, and relevant demo.
      </p>
      <OdiCompactRead />
    </div>
  );
  return (
    <div className="mo-workspace">
      <p className="mr-lead">
        Select an outcome to connect the research to a proposed workflow.
      </p>
      <div
        className="am-tabs mo-view-switch"
        role="group"
        aria-label="Outcome presentation"
      >
        <button aria-pressed={view === "map"} onClick={() => setView("map")}>
          Opportunity map
        </button>
        <button
          aria-pressed={view === "ranked"}
          onClick={() => setView("ranked")}
        >
          Ranked outcomes
        </button>
      </div>
      {view === "ranked" ? (
        <div className="mo-ranked-layout">
          <section aria-label="Ranked executive study outcomes">
            <p className="am-note">
              Revised-study opportunity scores · common 0–10 scale. Bar
              lengths show scores, not percentages. Frames coordinates remain
              separate in the opportunity map.
            </p>
            <button
              className="mo-reset"
              aria-pressed={selected === -1}
              onClick={() => select(-1)}
            >
              All outcomes
            </button>
            <div className="mo-ranked">
              {rankedOutcomeSolutions().map((item) => (
                <button
                  key={item.id}
                  aria-pressed={selected === item.id - 1}
                  onClick={() => selectRanked(item.id - 1)}
                >
                  <span className="mo-rank-id">{item.id}</span>
                  <span className="mo-rank-name">
                    {outcomes[item.id - 1][0]}
                  </span>
                  <span className="mo-bar" aria-hidden="true">
                    <span
                      style={{
                        width: `${(item.score / outcomeScoreScale) * 100}%`,
                      }}
                    />
                  </span>
                  <strong>{item.score.toFixed(2)}</strong>
                </button>
              ))}
            </div>
          </section>
          {detail}
        </div>
      ) : (
        <LifecycleResearch
          embedded
          view="opportunity"
          selectedOutcome={selected}
          onOutcomeChange={select}
          outcomeDetail={detail}
          compactSourceNote
        />
      )}
    </div>
  );
}
