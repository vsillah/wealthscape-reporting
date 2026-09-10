import { useId, useRef, useState } from "react";
import { CircleCheck, CircleMinus, TriangleAlert } from "lucide-react";
import {
  journeyPhases,
  journeyStakeholders,
  journeyMilestones,
  nextJourneySelection,
  journeyCellState,
} from "./maintenanceJourney.js";
import "./MaintenanceJourney.css";

const experienceKinds = {
  positive: { icon: CircleCheck, label: "Positive progress" },
  neutral: { icon: CircleMinus, label: "Neutral step" },
  friction: { icon: TriangleAlert, label: "Friction" },
};
export default function MaintenanceJourney() {
  const [selectedId, setSelectedId] = useState(null);
  const selected = journeyMilestones.find((item) => item.id === selectedId);
  const contextRef = useRef(null);
  const contextId = useId();
  const select = (id) => {
    const next = nextJourneySelection(selectedId, id);
    setSelectedId(next);
    if (!next || !window.matchMedia("(max-width: 1000px)").matches) return;
    requestAnimationFrame(() => {
      contextRef.current?.focus({ preventScroll: true });
      contextRef.current?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  };
  return (
    <div className="mj-journey">
      <p className="am-note">
        Executive deck, slides 6 and 10 · directional forum evidence. Curve
        height and progress symbols are illustrative, not measured satisfaction
        or reported sentiment. Positive moments describe proposed experience.
      </p>
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
        <button aria-pressed={!selected} onClick={() => setSelectedId(null)}>
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
                aria-controls={contextId}
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
      <section
        id={contextId}
        ref={contextRef}
        tabIndex={-1}
        className={`mj-context ${selected ? `mj-${selected.kind}` : ""}`}
        aria-label="Selected journey milestone context"
        aria-live="polite"
      >
        {selected ? (
          <>
            <span className="am-eyebrow">
              Phase {selected.phase + 1} · {journeyPhases[selected.phase]}
            </span>
            <h3>{selected.label}</h3>
            <p>{selected.moment}</p>
            <dl>
              <div>
                <dt>{experienceKinds[selected.kind].label} · illustrative</dt>
                <dd>{selected.experience}</dd>
              </div>
              <div>
                <dt>Owner / handoff</dt>
                <dd>{selected.handoff}</dd>
              </div>
              <div>
                <dt>Design response</dt>
                <dd>{selected.response}</dd>
              </div>
              <div>
                <dt>Evidence / assumption boundary</dt>
                <dd>{selected.boundary}</dd>
              </div>
            </dl>
            <p className="mj-connection">
              Linked phase: {journeyPhases[selected.phase]} ·{" "}
              {selected.stakeholders
                .map(
                  (id) =>
                    journeyStakeholders.find((role) => role.id === id).label,
                )
                .join(", ")}
            </p>
          </>
        ) : (
          <p>
            All stages shown with equal emphasis.
          </p>
        )}
      </section>
      <p>
        Design response: show the next owner and missing evidence at each wait,
        retain the rejection history, and carry the completed packet into
        reporting.
      </p>
    </div>
  );
}
