import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LifecycleResearch, outcomes } from "./LifecycleExperience";
import { visibleCases } from "./AccountMaintenance";
import {
  outcomeSolutions,
  outcomeDestination,
  normalizeOutcomeSelection,
} from "./maintenanceOutcomeSolutions.js";

export default function MaintenanceOutcomes({ profile, cases, onNavigate }) {
  const [selected, setSelected] = useState(-1);
  const select = (value) => setSelected(normalizeOutcomeSelection(value));
  const solution = outcomeSolutions[selected];
  const values = outcomes[selected];
  const destination = outcomeDestination(
    solution?.id,
    profile.id,
    visibleCases(cases, profile),
  );
  const detail = solution ? (
    <article className="mo-detail" aria-label="Selected outcome solution">
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
        Compare all 15 outcomes with equal emphasis. Select a chart point
        or dropdown option to inspect the problem, proposed response, and
        relevant demo.
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
      <LifecycleResearch
        embedded
        view="opportunity"
        selectedOutcome={selected}
        onOutcomeChange={select}
        outcomeDetail={detail}
        compactSourceNote
      />
    </div>
  );
}
