import { useState } from "react";
import {
  CheckCircle2,
  CircleHelp,
  CircleMinus,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";
import {
  reportingComparison,
  reportingComparisonColumns,
  reportingPlot,
  reportingScore,
  reportingJourney,
} from "./reportingResearch.js";

export function ReportingEvidenceGrid({ selected, onSelect }) {
  return (
    <div className="rr-comparison">
      <p className="rr-evidence">
        Nine vendors · four inspectable capability columns. Narrative,
        scheduling, branding and consolidation are discussed in the reference
        cards. Fidelity is the incumbent Wealthscape baseline. This grid shows
        what the linked pages describe; satisfaction and relative quality are
        not scored.
      </p>
      <div className="rr-evidence-legend" aria-label="Evidence icon legend">
        <span>
          <CheckCircle2 size={18} aria-hidden="true" /> Described
        </span>
        <span>
          <CircleHelp size={18} aria-hidden="true" /> Not assessed
        </span>
      </div>
      <div
        className="rr-visual-scroll"
        role="region"
        tabIndex={0}
        aria-label="Reporting competitor capability evidence grid"
      >
        <table className="rr-evidence-grid">
          <thead>
            <tr>
              <th scope="col">Public reference</th>
              {reportingComparisonColumns.map((label) => (
                <th scope="col" key={label}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportingComparison.map((row, r) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                {row.cells.map((cell, c) => {
                  const Icon = cell.described ? CheckCircle2 : CircleHelp;
                  return (
                    <td key={c}>
                      <button
                        aria-label={`${row.name}: ${reportingComparisonColumns[c]} — ${cell.described ? "Described" : "Not assessed"}`}
                        title={`${row.name}: ${reportingComparisonColumns[c]} — ${cell.described ? "Described" : "Not assessed"}`}
                        aria-pressed={
                          selected?.row === r && selected?.column === c
                        }
                        aria-controls="reporting-vendor-detail"
                        onClick={() => onSelect(r, c)}
                        className={
                          cell.described ? "rr-described" : "rr-unassessed"
                        }
                      >
                        <Icon size={22} aria-hidden="true" />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rr-evidence">
        “Not assessed” means the retained reference does not establish the
        capability; it is not a product gap or a negative rating. Select any
        cell for its evidence note.
      </p>
    </div>
  );
}

export function ReportingCapabilityExplorer({ selected, onSelect }) {
  const [column, setColumn] = useState(0);
  return (
    <div className="rr-capability-explorer">
      <label className="am-field rr-select">
        Explore a capability
        <select
          value={column}
          onChange={(event) => setColumn(Number(event.target.value))}
        >
          {reportingComparisonColumns.map((label, i) => (
            <option key={label} value={i}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <p className="rr-evidence">
        Public-source evidence, not a product audit or quality ranking. “Not
        assessed” is an evidence boundary, not a missing capability.
      </p>
      <div className="rr-grid rr-three">
        {reportingComparison.map((vendor, row) => {
          const cell = vendor.cells[column];
          const Icon = cell.described ? CheckCircle2 : CircleHelp;
          return (
            <button
              key={vendor.name}
              className="rr-choice"
              aria-pressed={
                selected?.row === row && selected?.column === column
              }
              aria-controls="reporting-vendor-detail"
              onClick={() => onSelect(row, column)}
            >
              <span className="rr-icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <strong>{vendor.name}</strong>
              <span>
                {cell.described ? "Described in source" : "Not assessed"}
              </span>
              <span className="rr-link">
                Inspect evidence <ArrowRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReportingOpportunityMap({ outcomes, selectedId, onSelect }) {
  const [zoom, setZoom] = useState(false);
  const { bounds, points } = reportingPlot(outcomes, zoom);
  const selected = outcomes.find((outcome) => outcome.id === selectedId);
  return (
    <div className="rr-opportunity-map">
      <div className="rr-map-toolbar">
        <span className="rr-badge">Management-estimate scores</span>
        <label className="am-field">
          Map scale
          <select
            value={zoom ? "cluster" : "full"}
            onChange={(event) => setZoom(event.target.value === "cluster")}
          >
            <option value="full">Full map · 0–10</option>
            <option value="cluster">Expand outcome cluster</option>
          </select>
        </label>
      </div>
      <div
        className="rr-visual-scroll"
        role="region"
        tabIndex={0}
        aria-label="Reporting opportunity map; horizontal scroll on narrow screens"
      >
        <div className="rr-scatter">
          <svg viewBox="0 0 600 420" aria-hidden="true">
            {!zoom ? (
              <>
                <rect x="70" y="65" width="240" height="150" fill="#e8f5ee" />
                <rect x="310" y="65" width="240" height="150" fill="#eef0ff" />
                <rect x="70" y="215" width="240" height="150" fill="#f1f4f5" />
                <rect x="310" y="215" width="240" height="150" fill="#fff4df" />
                <path
                  d="M310 65V365M70 215H550"
                  stroke="#93a4ac"
                  strokeDasharray="6 5"
                />
                <text x="80" y="50">
                  Underserved opportunity
                </text>
                <text x="420" y="50">
                  Table stakes
                </text>
                <text x="80" y="348">
                  Lower priority
                </text>
                <text x="455" y="348">
                  Overserved
                </text>
              </>
            ) : (
              <>
                <rect x="70" y="65" width="480" height="300" fill="#eef0ff" />
                <rect
                  x="70"
                  y="65"
                  width={Math.max(
                    0,
                    Math.min(
                      480,
                      ((5 - bounds.xMin) / (bounds.xMax - bounds.xMin)) * 480,
                    ),
                  )}
                  height="300"
                  fill="#e8f5ee"
                />
                <text x="70" y="48">
                  Expanded view of directional outcome cluster
                </text>
              </>
            )}
            <path d="M70 65V365H550" fill="none" stroke="#879ba8" />
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <text x={70 + t * 480} y="385" textAnchor="middle">
                  {(bounds.xMin + t * (bounds.xMax - bounds.xMin)).toFixed(1)}
                </text>
                <text x="57" y={369 - t * 300} textAnchor="end">
                  {(bounds.yMin + t * (bounds.yMax - bounds.yMin)).toFixed(1)}
                </text>
              </g>
            ))}
            <text x="310" y="412" textAnchor="middle">
              Satisfaction proxy →
            </text>
            <text transform="translate(18 215) rotate(-90)" textAnchor="middle">
              Importance proxy →
            </text>
            {points.map((point) => (
              <g
                key={point.id}
                opacity={!selectedId || point.id === selectedId ? 1 : 0.22}
              >
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={point.label.x}
                  y2={point.label.y}
                  stroke="#557967"
                />
                <circle cx={point.x} cy={point.y} r="3" fill="#173f2a" />
              </g>
            ))}
          </svg>
          {points.map((point, index) => {
            const outcome = outcomes[index];
            return (
              <button
                key={point.id}
                className={`rr-scatter-point rr-basis-${outcome.basis}`}
                style={{
                  left: `${point.label.x / 6}%`,
                  top: `${point.label.y / 4.2}%`,
                }}
                aria-pressed={selectedId === point.id}
                data-muted={!!selectedId && selectedId !== point.id}
                aria-controls="reporting-outcome-detail"
                aria-label={`Select ${point.id}: ${outcome.text}. Importance ${outcome.imp}, satisfaction ${outcome.sat}, opportunity ${reportingScore(outcome).toFixed(1)}. ${outcome.basis} input; management estimate.`}
                title={`${point.id} · ${point.quadrant}`}
                onClick={() => onSelect(selectedId === point.id ? null : point.id)}
              >
                {point.id.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
      <p className="rr-evidence">
        {selected
          ? `Highlighted ${selected.id}: ${selected.text}`
          : "Showing all 15 outcomes with equal emphasis. Select an outcome to inspect its job-map context."}
      </p>
      <div
        className="rr-outcome-legend"
        aria-label="Reporting score provenance legend"
      >
        <span>
          <i className="rr-legend-sourced" /> Sourced · measured customer data
          (0)
        </span>
        <span>
          <i className="rr-legend-derived" /> Derived · retained strategy
          ratings (9)
        </span>
        <span>
          <i className="rr-legend-inferred" /> Inferred · new assumptions (6)
        </span>
      </div>
    </div>
  );
}

const experience = {
  positive: { icon: CheckCircle2, label: "Proposed progress" },
  neutral: { icon: CircleMinus, label: "Coordination" },
  friction: { icon: TriangleAlert, label: "Potential friction" },
};
export function ReportingJourney({
  selectedStep,
  onSelect,
  onNavigate,
  detailRef,
}) {
  const selected =
    selectedStep === null ? null : reportingJourney[selectedStep];
  return (
    <div className="rr-journey">
      <div className="rr-map-toolbar">
        <div className="rr-experience-legend">
          {Object.entries(experience).map(([kind, { icon: Icon, label }]) => (
            <span key={kind} className={`rr-tone-${kind}`}>
              <Icon size={17} />
              {label}
            </span>
          ))}
        </div>
        <button aria-pressed={!selected} onClick={() => onSelect(null)}>
          All phases
        </button>
      </div>
      <p className="rr-evidence">
        Illustrative reporting journey · experience symbols identify proposed
        progress and possible friction; they are not measured sentiment or
        validated frequency. This flow starts from a reporting request and does
        not require an account-maintenance transaction.
      </p>
      <div
        className="rr-visual-scroll rr-journey-scroll"
        role="region"
        tabIndex={0}
        aria-label="End-to-end reporting journey; horizontal scroll on narrow screens"
      >
        <div className="rr-journey-grid">
          <div className="rr-journey-row rr-journey-phases">
            <strong>Reporting phase</strong>
            {reportingJourney.map((phase, index) => {
              const Icon = experience[phase.tone].icon;
              return (
                <button
                  key={phase.step}
                  className={`rr-tone-${phase.tone}`}
                  aria-pressed={selectedStep === index}
                  aria-controls="reporting-job-detail"
                  onClick={() => onSelect(index)}
                >
                  <span className="rr-phase-number">{index + 1}</span>
                  <Icon size={24} />
                  <strong>{phase.step}</strong>
                  <span>{phase.label}</span>
                  <ArrowRight
                    size={14}
                    className="rr-flow-arrow"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
          {[
            ["Client event", "client"],
            ["Operations concern", "operations"],
            ["Owner / handoff", "handoff"],
          ].map(([label, key]) => (
            <div className="rr-journey-row" key={key}>
              <strong>{label}</strong>
              {reportingJourney.map((phase, index) => (
                <div
                  key={phase.step}
                  data-selected={selectedStep === index}
                  data-muted={selectedStep !== null && selectedStep !== index}
                >
                  {phase[key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <label className="am-field rr-select">
        Explore a reporting phase
        <select
          value={selectedStep ?? "all"}
          onChange={(event) =>
            onSelect(
              event.target.value === "all" ? null : Number(event.target.value),
            )
          }
        >
          <option value="all">All phases</option>
          {reportingJourney.map((phase, index) => (
            <option key={phase.step} value={index}>
              {index + 1}. {phase.step} · {phase.label}
            </option>
          ))}
        </select>
      </label>
      <article
        ref={detailRef}
        tabIndex={-1}
        id="reporting-job-detail"
        className="rr-detail rr-journey-detail"
        aria-live="polite"
      >
        {selected ? (
          <>
            <span className="am-eyebrow">
              Step {selectedStep + 1} of 8 · {selected.step}
            </span>
            <h3>{selected.label}</h3>
            <div className="rr-grid">
              {[
                ["Client event", selected.client],
                ["Operations concern", selected.operations],
                ["Friction to investigate", selected.friction],
                ["Owner / handoff", selected.handoff],
                ["Proposed response", selected.response],
                ["Evidence needed", selected.proof],
              ].map(([label, text]) => (
                <div key={label}>
                  <h4>{label}</h4>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <button
              className="rr-action"
              onClick={() => onNavigate(selected.layer, selected.sub || {})}
            >
              {selected.action}
              <ArrowRight size={15} />
            </button>
            <p className="rr-evidence">
              Strategy synthesis mapped to a related synthetic prototype.
              Production data checks, human approvals, retained versions, and
              live delivery remain proposed controls; visiting this screen does
              not complete them.
            </p>
          </>
        ) : (
          <>
            <h3>The complete reporting experience</h3>
            <p>
              All eight phases have equal emphasis. Select a phase above or use
              the dropdown to inspect its client event, operational concern,
              handoff, and proposed response.
            </p>
          </>
        )}
      </article>
    </div>
  );
}
