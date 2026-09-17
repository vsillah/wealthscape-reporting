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
    implication:
      "Best first wedge for differentiation: reduce rework before expanding authority or scope.",
  },
  {
    title: "Household-authority segment",
    ids: [4, 5, 10, 11, 12, 15],
    need: "Apply the right authority and evidence across every affected account without re-collecting the same proof.",
    implication:
      "Potential dominant platform move if a survey confirms broad demand across advisor and operations segments.",
  },
  {
    title: "Compliance-currency segment",
    ids: [6, 13],
    need: "Find stale or overdue evidence before a review event forces reactive service work.",
    implication:
      "Selective differentiation: connect evidence currency to status and review readiness before automating alerts.",
  },
  {
    title: "Conversion-servicing segment",
    ids: [7],
    need: "Reconcile acquired-book account scope, ownership, and authority before service volume scales.",
    implication:
      "Targeted segment strategy: validate whether this is a high-value niche before funding enterprise tooling.",
  },
];

const odiStrategyPostures = [
  {
    title: "Differentiated strategy is the strongest current signal",
    body: "Most candidate outcomes sit in high-importance, low-satisfaction territory, led by missing information, exception ownership, and completion proof.",
  },
  {
    title: "Dominant strategy remains a validation option",
    body: "If survey results show the same underserved pattern across a broad segment, the shared validation-and-exception layer can become the common servicing platform.",
  },
  {
    title: "Disruptive strategy is not supported by this map yet",
    body: "No current outcomes land in an overserved or ignore quadrant, so the evidence does not point to a stripped-down, lower-cost path.",
  },
  {
    title: "Table-stakes outcomes should be protected",
    body: "Signature turnaround and standing-instruction evidence are high-importance areas with stronger satisfaction; use them as reliability guardrails, not the first wedge.",
  },
];

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

function MaintenanceOdiSynthesis() {
  const quadrantCounts = outcomes.reduce((counts, values) => {
    const quadrant = outcomeQuadrant(values[1], values[2]);
    counts[quadrant] = (counts[quadrant] || 0) + 1;
    return counts;
  }, {});
  return (
    <section
      className="mo-odi-synthesis"
      aria-labelledby="maintenance-odi-synthesis-heading"
    >
      <header>
        <span className="am-eyebrow">ODI strategy read</span>
        <h3 id="maintenance-odi-synthesis-heading">
          The outcome landscape points to differentiation, not disruption.
        </h3>
        <p>
          {quadrantCounts["Opportunity / underserved"] || 0} of 15 candidate
          outcomes sit in the underserved quadrant. The current pattern argues
          for a better servicing path before considering cost-reduction or
          stripped-down alternatives.
        </p>
      </header>
      <div className="mo-odi-counts" aria-label="Opportunity map counts">
        {[
          ["Underserved", quadrantCounts["Opportunity / underserved"] || 0],
          ["Table stakes", quadrantCounts["Table stakes"] || 0],
          ["Overserved", quadrantCounts.Overserved || 0],
          ["Ignore", quadrantCounts.Ignore || 0],
        ].map(([label, count]) => (
          <div key={label}>
            <strong>{count}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="mo-odi-segments">
        {odiSegmentHypotheses.map((segment) => {
          const summary = outcomeSummary(segment.ids);
          return (
            <article key={segment.title}>
              <div className="mo-odi-segment-heading">
                <h4>{segment.title}</h4>
                <span>{summary.opportunity.toFixed(1)} avg opportunity</span>
              </div>
              <p>{segment.need}</p>
              <div className="mo-odi-outcome-chips" aria-label="Outcomes in segment">
                {segment.ids.map((id) => (
                  <span key={id}>O{id}</span>
                ))}
              </div>
              <dl>
                <div>
                  <dt>Importance</dt>
                  <dd>{summary.importance.toFixed(1)} / 5</dd>
                </div>
                <div>
                  <dt>Satisfaction</dt>
                  <dd>{summary.satisfaction.toFixed(1)} / 5</dd>
                </div>
              </dl>
              <p className="mo-odi-implication">{segment.implication}</p>
            </article>
          );
        })}
      </div>
      <div className="mo-odi-strategies">
        {odiStrategyPostures.map((strategy) => (
          <article key={strategy.title}>
            <h4>{strategy.title}</h4>
            <p>{strategy.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function MaintenanceOutcomes({ profile, cases, onNavigate }) {
  const inspectorRef = useRef(null);
  const [view, setView] = useState("map");
  const [selected, setSelected] = useState(-1);
  const select = (value) => setSelected(normalizeOutcomeSelection(value));
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
      <MaintenanceOdiSynthesis />
    </div>
  );
}
