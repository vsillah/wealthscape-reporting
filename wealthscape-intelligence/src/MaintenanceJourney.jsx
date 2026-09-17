import { useState } from "react";
import { CircleCheck, CircleMinus, TriangleAlert } from "lucide-react";
import {
  journeyPhases,
  journeyStakeholders,
  journeyMilestones,
  nextJourneySelection,
  journeyCellState,
} from "./maintenanceJourney.js";
import { outcomeSolutions } from "./maintenanceOutcomeSolutions.js";
import "./MaintenanceJourney.css";

const experienceKinds = {
  positive: { icon: CircleCheck, label: "Positive progress" },
  neutral: { icon: CircleMinus, label: "Neutral step" },
  friction: { icon: TriangleAlert, label: "Friction" },
};
const outcomeScores = new Map(
  outcomeSolutions.map((outcome) => [outcome.id, outcome.score]),
);
export default function MaintenanceJourney({ onOutcomeOpen }) {
  const [selectedId, setSelectedId] = useState(null);
  const select = (id) => {
    const next = nextJourneySelection(selectedId, id);
    setSelectedId(next);
  };
  const selected = journeyMilestones.find((item) => item.id === selectedId);
  const selectedIndex = selected
    ? journeyMilestones.findIndex((item) => item.id === selected.id)
    : -1;
  const selectedKind = selected ? experienceKinds[selected.kind] : null;
  const SelectedIcon = selectedKind?.icon;
  return (
    <div className="mj-journey">
      <div className="mj-toolbar">
        <div className="mj-legend" aria-label="Illustrative experience legend">
          {Object.entries(experienceKinds).map(([kind, item]) => {
            const Icon = item.icon;
            return (
              <span className={`mj-${kind}`} key={kind}>
                <Icon size={18} aria-hidden="true" />
                {item.label}
              </span>
            );
          })}
        </div>
        <button aria-pressed={!selectedId} onClick={() => setSelectedId(null)}>
          All stages
        </button>
      </div>
      <div
        className="mj-chart-scroll"
        tabIndex={0}
        role="region"
        aria-label="Interactive journey milestones; horizontally scrollable on narrow screens"
      >
        <div className="mj-chart">
          <svg
            viewBox="0 0 720 235"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M55 65 C110 50 150 60 180 130 S250 85 295 75 S370 155 415 150 S500 50 560 65 L660 55"
              fill="none"
              stroke="#477663"
              strokeWidth="3"
            />
          </svg>
          {journeyMilestones.map((item, index) => {
            const Icon = experienceKinds[item.kind].icon;
            return (
              <button
                className={`mj-point mj-${item.kind}`}
                key={item.id}
                style={{
                  left: `${((item.x + 20) / 720) * 100}%`,
                  top: item.y + 30,
                }}
                aria-label={`${index + 1}. ${item.label}: ${experienceKinds[item.kind].label}. Phase ${item.phase + 1}, ${journeyPhases[item.phase]}`}
                aria-pressed={selectedId === item.id}
                onClick={() => select(item.id)}
              >
                <span className="mj-marker">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="mj-point-label">
                  {index + 1}. {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="lx-swimlane mj-swimlane">
        <div className="mr-job-progression" aria-label="Job progression">
          <strong>Proposed sequence</strong>
          {journeyPhases.map((phase, index) => (
            <span
              key={phase}
              data-emphasis={journeyCellState(selectedId, index)}
            >
              <b className="mr-step-number">{index + 1}</b>
              {phase}
            </span>
          ))}
        </div>
        {journeyStakeholders.map((role) => (
          <div key={role.id}>
            <strong>{role.label}</strong>
            {role.steps.map((step, index) => (
              <span
                key={step}
                data-emphasis={journeyCellState(selectedId, index, role.id)}
              >
                <small className="mj-mobile-phase">
                  Phase {index + 1} · {journeyPhases[index]}
                </small>
                {step}
              </span>
            ))}
          </div>
        ))}
      </div>
      {selected && (
        <section
          className="mj-stage-context"
          aria-live="polite"
          aria-label={`${selected.label} job and outcome context`}
        >
          <div className="mj-stage-summary">
            <div>
              <span className={`mj-stage-kicker mj-${selected.kind}`}>
                {SelectedIcon && <SelectedIcon size={16} aria-hidden="true" />}
                {selectedKind.label}
              </span>
              <h3>
                {selectedIndex + 1}. {selected.label}
              </h3>
              <p>{selected.job}</p>
            </div>
            <span className="mj-stage-phase">
              Phase {selected.phase + 1} · {journeyPhases[selected.phase]}
            </span>
          </div>
          <div className="mj-stage-grid">
            <div>
              <span>Job focus</span>
              <p>{selected.moment}</p>
            </div>
            <div>
              <span>Owner handoff</span>
              <p>{selected.handoff}</p>
            </div>
            <div>
              <span>Outcome response</span>
              <p>{selected.response}</p>
            </div>
          </div>
          <div className="mj-outcomes" aria-label="Outcome signals at this stage">
            <strong>Outcome signals at this stage</strong>
            <div>
              {selected.outcomes.map((outcome) => (
                <button
                  className="mj-outcome-link"
                  key={outcome.id}
                  type="button"
                  title={outcome.label}
                  onClick={() => onOutcomeOpen?.(outcome.id)}
                  aria-label={`Open outcome ${outcome.id}: ${outcome.label} in Outcomes and opportunities`}
                >
                  <b>O{outcome.id}</b>
                  <span>{outcome.label}</span>
                  <em>
                    {outcomeScores.has(outcome.id)
                      ? outcomeScores.get(outcome.id).toFixed(1)
                      : "n/a"}
                  </em>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
