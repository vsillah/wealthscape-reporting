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
          <dt>Revised executive opportunity score</dt>
          <dd>
            {solution.score.toFixed(2)} <span>· slide 18</span>
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
      <p className="mo-source-note">
        Two source snapshots: the chart retains{" "}
        <strong>Account Maintenance Frames</strong> coordinates and its midpoint
        of <strong>3 on both axes</strong>; selected detail scores retain the{" "}
        <strong>18 Aug executive study, slide 18</strong>. Values are not
        combined or recomputed. All are adjacent-category proxies; outcomes 3
        and 14 are inferred. The plotted values place outcomes 12 and 15 in
        Table stakes, despite the Frames prose calling all outcomes underserved.
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
              Published revised-study opportunity scores · common 0–10 scale.
              Bar lengths show scores, not percentages. Frames coordinates
              remain separate in the opportunity map.
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
