import { useState } from "react";
import {
  CheckCircle2,
  CircleMinus,
  TriangleAlert,
  ArrowRight,
} from "lucide-react";
import {
  reportingCapabilityMap,
  reportingCapabilityLevels,
  reportingComparison,
  reportingComparisonColumns,
  reportingPlot,
  reportingScore,
  reportingJourney,
} from "./reportingResearch.js";
import { reportingBrandAssets } from "./reportingBrandAssets.js";

const capabilityLevelOrder = ["direct", "strong", "partial", "open"];

function CapabilityHarvey({ level }) {
  const fill = {
    direct: 360,
    strong: 270,
    partial: 180,
    open: 0,
  }[level];
  return (
    <span
      className={`rr-harvey rr-harvey-${level}`}
      style={{ "--rr-harvey-fill": `${fill}deg` }}
      aria-hidden="true"
    />
  );
}

export function ReportingEvidenceGrid({ selected, onSelect }) {
  return (
    <div className="rr-comparison">
      <p className="rr-evidence">
        Nine vendors · four inspectable capability columns. Cells show how much
        the retained public references substantiate the function. This is not a
        quality score or a claim that an unsubstantiated capability is absent.
      </p>
      <div className="rr-evidence-legend" aria-label="Evidence icon legend">
        {capabilityLevelOrder.map((level) => (
          <span key={level}>
            <CapabilityHarvey level={level} />
            {reportingCapabilityLevels[level].label}
          </span>
        ))}
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
                  const level = reportingCapabilityLevels[cell.level];
                  return (
                    <td key={c}>
                      <button
                        aria-label={`${row.name}: ${reportingComparisonColumns[c]} — ${level.description}. ${cell.note}`}
                        title={`${row.name}: ${reportingComparisonColumns[c]} — ${level.description}. ${cell.note}`}
                        aria-pressed={
                          selected?.row === r && selected?.column === c
                        }
                        aria-controls="reporting-vendor-detail"
                        onClick={() => onSelect(r, c)}
                        className={`rr-level rr-level-${cell.level}`}
                      >
                        <CapabilityHarvey level={cell.level} />
                        <span>{level.label}</span>
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
        Select a cell for the evidence note. The same functional levels feed
        the capability map; substantiation and rationale stay in the table and
        inspector, not inside the cell layout.
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
          const level = reportingCapabilityLevels[cell.level];
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
                <CapabilityHarvey level={cell.level} />
              </span>
              <strong>{vendor.name}</strong>
              <span>{level.description}</span>
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

function ReportingBrandMark({ name, size = "regular" }) {
  const asset = reportingBrandAssets[name];
  return (
    <span
      className={`rr-brand-mark rr-brand-${asset?.treatment || "default"} rr-brand-${size}`}
      style={{ "--rr-logo-width": `${asset?.width || 80}px` }}
    >
      {asset ? (
        <img
          src={`/competitor-brands/${asset.file}`}
          alt={`${name} logo`}
          loading="lazy"
        />
      ) : (
        <span>{name}</span>
      )}
    </span>
  );
}

function capabilityMapPoint(point) {
  const xMin = 6;
  const xMax = 9;
  const yMin = 0;
  const yMax = 4;
  const x =
    70 +
    ((Math.max(xMin, Math.min(xMax, point.satisfactionProxy)) - xMin) /
      (xMax - xMin)) *
      480;
  const y =
    365 -
    ((Math.max(yMin, Math.min(yMax, point.capabilityScore)) - yMin) /
      (yMax - yMin)) *
      300;
  return {
    ...point,
    x,
    y,
    labelPoint: {
      x: Math.max(95, Math.min(530, x + point.labelOffset[0])),
      y: Math.max(82, Math.min(338, y + point.labelOffset[1])),
    },
  };
}

function summarizeCapabilityEvidence(row) {
  const direct = row.cells.filter((cell) => cell.level === "direct").length;
  const strong = row.cells.filter((cell) => cell.level === "strong").length;
  const partial = row.cells.filter((cell) => cell.level === "partial").length;
  const open = row.cells.filter((cell) => cell.level === "open").length;
  const total = row.cells.length;
  const supported = total - open;
  if (direct + strong >= 3 && open === 0) {
    return {
      direct,
      strong,
      partial,
      open,
      supported,
      total,
      label: "High public confidence",
      tone: "positive",
    };
  }
  if (supported >= 3) {
    return {
      direct,
      strong,
      partial,
      open,
      supported,
      total,
      label: "Moderate public confidence",
      tone: "neutral",
    };
  }
  return {
    direct,
    strong,
    partial,
    open,
    supported,
    total,
    label: "Needs validation",
    tone: "negative",
  };
}

export function ReportingCapabilityMap({ selected, onSelect, onClear }) {
  const [detailTab, setDetailTab] = useState("position");
  const points = reportingCapabilityMap.map((point) => ({
    ...capabilityMapPoint(point),
    evidenceSignal: summarizeCapabilityEvidence(reportingComparison[point.row]),
  }));
  const selectedPoint =
    points.find((point) => point.row === selected?.row) || null;
  const selectedRow = selectedPoint
    ? reportingComparison[selectedPoint.row]
    : null;
  const evidenceSignal = selectedPoint?.evidenceSignal || null;
  const supportedColumns =
    selectedRow?.cells
      .map((cell, index) =>
        cell.score > 0
          ? `${reportingComparisonColumns[index]} (${cell.label})`
          : null,
      )
      .filter(Boolean) || [];
  const openColumns =
    selectedRow?.cells
      .map((cell, index) =>
        cell.score > 0 ? null : reportingComparisonColumns[index],
      )
      .filter(Boolean) || [];
  const selectPoint = (point) => {
    onSelect(point.row, point.defaultColumn);
    setDetailTab("position");
  };
  return (
    <div className="rr-capability-map">
      <p className="rr-evidence">
        X-axis is a directional advisor-satisfaction proxy. Y-axis is the
        weighted breadth of the reporting workflow across design, batch
        generation, client delivery, and access controls. Shaded regions only
        compare satisfaction and workflow breadth; marker outline shows
        public-evidence confidence.
      </p>
      <div className="rr-capability-workspace">
        <div>
          <div
            className="rr-visual-scroll"
            role="region"
            tabIndex={0}
            aria-label="Reporting competitor capability map; horizontal scroll on narrow screens"
          >
            <div className="rr-competitor-scatter">
              <svg viewBox="0 0 600 420" aria-hidden="true">
                <rect x="310" y="65" width="240" height="150" fill="#e9f5ee" />
                <rect x="70" y="65" width="240" height="150" fill="#edf0fb" />
                <rect x="70" y="215" width="240" height="150" fill="#f4f7f8" />
                <rect x="310" y="215" width="240" height="150" fill="#fff4df" />
                <path
                  d="M310 65V365M70 215H550"
                  stroke="#9aadb5"
                  strokeDasharray="6 5"
                />
                {[6, 7, 8, 9].map((tick) => {
                  const x = 70 + ((tick - 6) / 3) * 480;
                  return (
                    <g key={tick}>
                      <path
                        d={`M${x} 65V365`}
                        stroke="#e0e7ea"
                        strokeWidth="1"
                      />
                      <text x={x} y="385" textAnchor="middle">
                        {tick}
                      </text>
                    </g>
                  );
                })}
                {[0, 1, 2, 3, 4].map((tick) => {
                  const y = 365 - (tick / 4) * 300;
                  return (
                    <g key={tick}>
                      <path
                        d={`M70 ${y}H550`}
                        stroke="#e0e7ea"
                        strokeWidth="1"
                      />
                      <text x="57" y={y + 4} textAnchor="end">
                        {tick}
                      </text>
                    </g>
                  );
                })}
                <text x="105" y="42">
                  <tspan x="105" dy="0">
                    Broader workflow coverage
                  </tspan>
                  <tspan x="105" dy="15">
                    lower satisfaction
                  </tspan>
                </text>
                <text x="370" y="42">
                  <tspan x="370" dy="0">
                    Broader workflow coverage
                  </tspan>
                  <tspan x="370" dy="15">
                    higher satisfaction
                  </tspan>
                </text>
                <text x="103" y="337">
                  <tspan x="103" dy="0">
                    Narrower workflow coverage
                  </tspan>
                  <tspan x="103" dy="15">
                    lower satisfaction
                  </tspan>
                </text>
                <text x="377" y="337">
                  <tspan x="377" dy="0">
                    Narrower workflow coverage
                  </tspan>
                  <tspan x="377" dy="15">
                    higher satisfaction
                  </tspan>
                </text>
                <path d="M70 65V365H550" fill="none" stroke="#879ba8" />
                <text x="310" y="412" textAnchor="middle">
                  Advisor satisfaction proxy →
                </text>
                <text
                  transform="translate(18 215) rotate(-90)"
                  textAnchor="middle"
                >
                  Reporting workflow breadth →
                </text>
                {points.map((point) => (
                  <g
                    key={point.name}
                    opacity={
                      !selectedPoint || selectedPoint.row === point.row
                        ? 1
                        : 0.3
                    }
                  >
                    <line
                      x1={point.x}
                      y1={point.y}
                      x2={point.labelPoint.x}
                      y2={point.labelPoint.y}
                      stroke="#6f8790"
                    />
                    <circle
                      className={`rr-competitor-anchor rr-confidence-${point.evidenceSignal.tone}`}
                      cx={point.x}
                      cy={point.y}
                      r="6"
                    />
                  </g>
                ))}
              </svg>
              {points.map((point) => (
                <button
                  key={`${point.name}-dot`}
                  className="rr-competitor-dot"
                  style={{
                    left: `${point.x / 6}%`,
                    top: `${point.y / 4.2}%`,
                  }}
                  aria-label={`Select ${point.name}: satisfaction proxy ${point.satisfactionProxy.toFixed(1)} of 10; reporting workflow breadth ${point.capabilityScore.toFixed(1)} of ${point.totalCapabilities}.`}
                  aria-pressed={selectedPoint?.row === point.row}
                  data-confidence={point.evidenceSignal.tone}
                  onClick={() => selectPoint(point)}
                />
              ))}
              {points.map((point) => (
                <button
                  key={point.name}
                  className="rr-logo-marker"
                  style={{
                    left: `${point.labelPoint.x / 6}%`,
                    top: `${point.labelPoint.y / 4.2}%`,
                  }}
                  aria-label={`Select ${point.name}`}
                  aria-pressed={selectedPoint?.row === point.row}
                  data-muted={!!selectedPoint && selectedPoint.row !== point.row}
                  onClick={() => selectPoint(point)}
                >
                  <ReportingBrandMark name={point.name} size="map" />
                </button>
              ))}
            </div>
          </div>
          <p className="rr-evidence">
            Select a logo, map point, or dropdown option. All platforms remain
            visible for comparison.
          </p>
          <div className="rr-confidence-legend" aria-label="Map confidence legend">
            <span>
              <i className="rr-confidence-dot rr-confidence-positive" />
              High confidence
            </span>
            <span>
              <i className="rr-confidence-dot rr-confidence-neutral" />
              Moderate confidence
            </span>
            <span>
              <i className="rr-confidence-dot rr-confidence-negative" />
              Needs validation
            </span>
          </div>
        </div>
        <article className="rr-detail rr-map-inspector" aria-live="polite">
          <label className="am-field rr-select">
            Explore a platform
            <select
              value={selectedPoint?.row ?? "all"}
              onChange={(event) => {
                if (event.target.value === "all") {
                  onClear?.();
                  setDetailTab("position");
                  return;
                }
                const point = points.find(
                  (item) => item.row === Number(event.target.value),
                );
                if (point) selectPoint(point);
              }}
            >
              <option value="all">All platforms</option>
              {points.map((point, index) => (
                <option key={point.name} value={point.row}>
                  {index + 1}. {point.name}
                </option>
              ))}
            </select>
          </label>
          {selectedPoint && (
            <button className="rr-outcome-reset" onClick={() => onClear?.()}>
              All platforms
            </button>
          )}
          {selectedPoint ? (
            <>
              <div className="rr-map-brand-header">
                <ReportingBrandMark name={selectedPoint.name} size="large" />
                <div>
                  <span className="am-eyebrow">{selectedPoint.label}</span>
                  <h3>{selectedPoint.name}</h3>
                </div>
              </div>
              <dl className="rr-map-scores">
                <div>
                  <dt>Advisor satisfaction proxy</dt>
                  <dd>{selectedPoint.satisfactionProxy.toFixed(1)} / 10</dd>
                </div>
                <div>
                  <dt>Reporting workflow breadth</dt>
                  <dd>{selectedPoint.capabilityScore.toFixed(1)} / 4</dd>
                </div>
              </dl>
              {evidenceSignal && (
                <div
                  className={`rr-map-confidence rr-signal-${evidenceSignal.tone}`}
                >
                  {evidenceSignal.tone === "positive" ? (
                    <CheckCircle2 size={16} />
                  ) : evidenceSignal.tone === "negative" ? (
                    <TriangleAlert size={16} />
                  ) : (
                    <CircleMinus size={16} />
                  )}
                  <div>
                    <strong>{evidenceSignal.label}</strong>
                    <span>
                      {evidenceSignal.supported}/{evidenceSignal.total} workflow
                      functions have public support; {evidenceSignal.direct} are
                      directly documented.
                    </span>
                  </div>
                </div>
              )}
              <div className="rr-inspector-tabs" role="group">
                {[
                  ["position", "Position"],
                  ["evidence", "Evidence"],
                  ["assumptions", "Assumptions"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    aria-pressed={detailTab === value}
                    onClick={() => setDetailTab(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {detailTab === "position" && (
                <div className="rr-map-detail-copy">
                  <h4>Why this capability position appears</h4>
                  <p>{selectedPoint.position}</p>
                </div>
              )}
              {detailTab === "evidence" && (
                <div className="rr-map-detail-copy">
                  <h4>Supported workflow functions</h4>
                  <p>
                    {supportedColumns.length
                      ? supportedColumns.join(", ")
                      : "No reporting workflow function is substantiated by the retained source set."}
                  </p>
                  <h4>Not publicly substantiated</h4>
                  <p>
                    {openColumns.length
                      ? openColumns.join(", ")
                      : "All tracked workflow functions have some retained public support."}
                  </p>
                </div>
              )}
              {detailTab === "assumptions" && (
                <div className="rr-map-detail-copy">
                  <h4>Validation boundary</h4>
                  <p>{selectedPoint.assumption}</p>
                  <p>
                    Workflow breadth is a function-coverage score from the
                    table view; it does not establish implementation quality,
                    client adoption, approval controls, or production readiness.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <h3>All platforms</h3>
              <p>
                Compare the reporting workflow breadth for all nine reporting
                platforms. Use the map to inspect where each competitor sits
                against directional satisfaction and functional coverage across
                design, batch generation, delivery and access controls.
              </p>
            </>
          )}
        </article>
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
  positive: { icon: CheckCircle2, label: "Positive progress" },
  neutral: { icon: CircleMinus, label: "Neutral step" },
  friction: { icon: TriangleAlert, label: "Friction" },
};
const journeyPointLayout = [
  { x: 74, y: 100 },
  { x: 205, y: 165 },
  { x: 320, y: 125 },
  { x: 435, y: 160 },
  { x: 552, y: 92 },
  { x: 665, y: 112 },
  { x: 785, y: 164 },
  { x: 900, y: 96 },
];
const journeyGroups = [
  {
    label: "Set scope",
    steps: [0, 1],
    client: "A client, review date, or market event creates a report request with relationship-level context.",
    operations: "Confirm audience, period, account set, and source coverage before work begins.",
    handoff: "Advisor → reporting owner → data owner.",
  },
  {
    label: "Build draft",
    steps: [2],
    client: "The report should feel familiar, branded, and relevant to the client relationship.",
    operations: "Apply a reusable template to reconciled data and selected sections.",
    handoff: "Data owner → report preparer.",
  },
  {
    label: "Review & run",
    steps: [3, 4],
    client: "The explanation needs to fit the account, product context, and approved evidence.",
    operations: "Resolve review comments, generate from reviewed inputs, and retain the run record.",
    handoff: "Preparer → reviewer → report operator.",
  },
  {
    label: "Deliver & adapt",
    steps: [5, 6, 7],
    client: "The client needs a usable report, clear follow-up, and a way to ask the next question.",
    operations: "Separate delivery status, corrections, read signals, and follow-up ownership.",
    handoff: "Report operator → advisor → client.",
  },
];
const journeyGroupState = (selectedStep, group) => {
  if (selectedStep === null) return undefined;
  return group.steps.includes(selectedStep) ? "selected" : "muted";
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
      <div className="rr-journey-header">
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
        className="rr-journey-chart-scroll"
        role="region"
        tabIndex={0}
        aria-label="Interactive reporting journey milestones; horizontally scrollable on narrow screens"
      >
        <div className="rr-journey-chart">
          <svg viewBox="0 0 960 260" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M70 100 C132 78 178 92 205 165 S285 122 320 125 S390 188 435 160 S495 84 552 92 S625 138 665 112 S742 130 785 164 S860 82 930 96"
              fill="none"
              stroke="#477663"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          {reportingJourney.map((phase, index) => {
            const Icon = experience[phase.tone].icon;
            const point = journeyPointLayout[index];
            return (
              <button
                key={phase.step}
                className={`rr-journey-point rr-tone-${phase.tone}`}
                style={{
                  left: `${(point.x / 960) * 100}%`,
                  top: `${(point.y / 260) * 100}%`,
                }}
                aria-pressed={selectedStep === index}
                aria-controls="reporting-job-detail"
                data-muted={selectedStep !== null && selectedStep !== index}
                onClick={() => onSelect(index)}
                aria-label={`${index + 1}. ${phase.step}: ${phase.label}. ${experience[phase.tone].label}`}
              >
                <span className="rr-journey-marker">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="rr-journey-point-label">
                  {index + 1}. {phase.step}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rr-journey-swimlane" aria-label="Reporting job map">
        <div className="rr-journey-progression">
          <strong>Proposed sequence</strong>
          {journeyGroups.map((group) => (
            <button
              key={group.label}
              data-emphasis={journeyGroupState(selectedStep, group)}
              onClick={() => onSelect(group.steps[0])}
            >
              <b>{journeyGroups.indexOf(group) + 1}</b>
              {group.label}
            </button>
          ))}
        </div>
        {[
          ["Client", "client"],
          ["Operations", "operations"],
          ["Owner / handoff", "handoff"],
        ].map(([label, key]) => (
          <div key={label}>
            <strong>{label}</strong>
            {journeyGroups.map((group, index) => (
              <span
                key={group.label}
                data-emphasis={journeyGroupState(selectedStep, group)}
              >
                <small className="rr-mobile-phase">
                  Stage {index + 1} · {group.label}
                </small>
                {group[key]}
              </span>
            ))}
          </div>
        ))}
      </div>
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
            <p>{selected.client}</p>
            <div className="rr-journey-detail-grid">
              {[
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
            <p>All reporting stages shown with equal emphasis.</p>
          </>
        )}
      </article>
    </div>
  );
}
