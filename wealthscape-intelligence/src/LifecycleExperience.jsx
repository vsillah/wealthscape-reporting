import { useState } from "react";
import MaintenanceCompetitorMap from "./MaintenanceCompetitorMap";
import {
  Inbox,
  FileSignature,
  GitBranch,
  UserCheck,
  ShieldCheck,
  FileBarChart,
  ArrowRight,
} from "lucide-react";
import "./AccountMaintenance.css";
import {
  outcomeQuadrants,
  OUTCOME_MIDPOINT,
  OUTCOME_CHART,
  outcomeChartX,
  outcomeChartY,
} from "./maintenanceQuadrants.js";

const stages = [
  ["Intake", "Advisor / service team"],
  ["Authority & signatures", "Client / authorized party"],
  ["Exception routing", "Operations / Fidelity service"],
  ["Human review", "Reviewer"],
  ["Ready account context", "Operations"],
  ["Report output", "Advisor"],
];
const stageIcons = [
  Inbox,
  FileSignature,
  GitBranch,
  UserCheck,
  ShieldCheck,
  FileBarChart,
];

export function LifecycleJourney({ item, activeStage, onNavigate }) {
  const opened = ["0", "1", "2", "3", "4", "5"].includes(String(activeStage))
    ? Number(activeStage)
    : null;
  const finished = item?.status === "Complete";
  const evidenceReady = item?.checks.every(Boolean);
  const stage = !item
    ? 0
    : item.reportId
      ? 5
      : finished
        ? 4
        : evidenceReady
          ? 3
          : !item.checks[0] || !item.checks[1]
            ? 1
            : 2;
  return (
    <section className="lx-journey" aria-label="Account lifecycle journey">
      <div className="am-heading">
        <strong>
          {item
            ? `${item.id} · One account change`
            : "One lifecycle · intake to report"}
        </strong>
        <span className="am-note">
          {item?.reportId
            ? `Report ${item.reportId} created`
            : item
              ? item.blocker || item.status
              : "Select a stage to open its workspace"}
        </span>
      </div>
      {opened !== null && (
        <p className="lx-opened" role="status">
          Opened stage {opened + 1}: <strong>{stages[opened][0]}</strong>
        </p>
      )}
      <div className="lx-stages">
        {stages.map(([name, owner], i) => (
          <button
            key={name}
            aria-current={item && i === stage ? "step" : undefined}
            aria-pressed={opened === i}
            className={`${item && i <= stage ? "lx-current" : ""} ${opened === i ? "lx-selected" : ""}`}
            onClick={() =>
              onNavigate(i === 5 ? "reports" : "maintenance", {
                caseId: item?.id,
                lifecycleStage: String(i),
                ...(!item && i === 3
                  ? { statusFilter: "Ready for review" }
                  : !item && (i === 1 || i === 2)
                    ? { statusFilter: "Blocked" }
                    : {}),
                maintenanceView:
                  i === 0 ? "intake" : i === 4 ? "readiness" : "queue",
                panel: i === 1 || i === 3 ? "evidence" : "overview",
              })
            }
          >
            <span className="lx-stage-num">
              {(() => {
                const Icon = stageIcons[i];
                return <Icon size={22} aria-hidden="true" />;
              })()}
            </span>
            <strong>{name}</strong>
            <small>{owner}</small>
            {item && i === stage && <em>Current stage</em>}
          </button>
        ))}
      </div>
      {item && !finished && (
        <p className="am-note">
          {stage === 1
            ? "Waiting on authority or signature evidence. Resolve the missing check before review."
            : stage === 2
              ? `Action with ${item.owner}. Review evidence or route the exception to its next owner.`
              : "Evidence ready. A reviewer must confirm completion before reporting."}
        </p>
      )}
    </section>
  );
}

export function LifecycleFlow({ rows, onNavigate }) {
  const [active, setActive] = useState(0);
  const lanes = [
    {
      label: "Resolve blockers",
      status: "Blocked",
      icon: GitBranch,
      hint: "Complete missing evidence or route the exception to its owner.",
      tone: "amber",
    },
    {
      label: "Confirm review",
      status: "Ready for review",
      icon: UserCheck,
      hint: "Evidence is ready. Human confirmation releases the change for reporting.",
      tone: "violet",
    },
    {
      label: "Ready for reporting",
      status: "Complete",
      icon: ShieldCheck,
      hint: "Completed changes can supply account context to a report.",
      tone: "green",
    },
  ].map((lane) => ({
    ...lane,
    items: rows.filter((row) => row.status === lane.status),
  }));
  const current = lanes[active];
  const owners = [...new Set(current.items.map((row) => row.owner))];
  return (
    <section className="lx-flow" aria-label="Live work flow">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">Work in motion</span>
          <h2>Where the next action lives</h2>
        </div>
        <span className="am-note">
          {rows.length} requests · current persona
        </span>
      </div>
      <p className="am-note">
        Explore each handoff, then open its queue. Bars show the share of
        current requests.
      </p>
      <div className="lx-flow-track">
        {lanes.map((lane, index) => {
          const Icon = lane.icon;
          const share = rows.length
            ? Math.round((lane.items.length / rows.length) * 100)
            : 0;
          return (
            <button
              key={lane.status}
              className={`lx-flow-node lx-${lane.tone} ${active === index ? "lx-flow-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() =>
                onNavigate("maintenance", {
                  statusFilter: lane.status,
                  maintenanceView: "queue",
                })
              }
              aria-label={`${lane.label}: ${lane.items.length} requests. Open queue`}
            >
              <span className="lx-flow-top">
                <Icon size={26} aria-hidden="true" />
                <strong>{lane.items.length}</strong>
                <ArrowRight size={19} aria-hidden="true" />
              </span>
              <strong>{lane.label}</strong>
              <span className="lx-flow-meter" aria-hidden="true">
                <span style={{ width: `${share}%` }} />
              </span>
              <small>{share}% of requests · Open queue</small>
            </button>
          );
        })}
      </div>
      <div className={`lx-flow-insight lx-${current.tone}`}>
        <strong>{current.label}</strong>
        <p>{current.hint}</p>
        <span>
          {owners.length
            ? `With ${owners.join(" · ")}`
            : "No requests at this handoff. Open the queue to inspect or clear filters."}
        </span>
      </div>
    </section>
  );
}

export function ConnectedReportBuilder({
  profile,
  cases,
  setCases,
  deepLink,
  onNavigate,
  reports,
  setReports,
  children,
}) {
  const [selected, setSelected] = useState(() =>
    [deepLink?.caseId || cases[0]?.id].filter(Boolean),
  );
  const [mode, setMode] = useState("account");
  const chosen = cases.filter((c) => selected.includes(c.id));
  const eligible =
    chosen.length > 0 &&
    chosen.every((c) => c.status === "Complete" && c.checks.every(Boolean));
  const selectionKey = chosen
    .map((c) => c.id)
    .sort()
    .join(",");
  const report = reports.findLast((r) => r.selectionKey === selectionKey);
  const generate = () => {
    if (!eligible) return;
    const id = `LR-${String(reports.length + 1).padStart(3, "0")}`;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const snapshot = chosen.map((c) => ({
      ...c,
      checks: [...c.checks],
      accounts: [...c.accounts],
      events: [...c.events],
    }));
    setReports((prev) => [
      ...prev,
      { id, selectionKey, time, reviewer: profile.shell.name, cases: snapshot },
    ]);
    setCases((prev) =>
      prev.map((c) =>
        selected.includes(c.id)
          ? {
              ...c,
              reportId: id,
              events: [
                ...c.events,
                {
                  text: `Account change report ${id} generated from completed evidence`,
                  actor: profile.shell.name,
                  time: time + " demo",
                },
              ],
            }
          : c,
      ),
    );
  };
  const download = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            prototype: "Synthetic session-only account lifecycle report",
            ...report,
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = report.id + "-synthetic-evidence.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="am-workspace">
      <div className="am-hero">
        <div>
          <span className="am-eyebrow">Account lifecycle / Output</span>
          <h1>Report from verified account context</h1>
          <p>
            Select the changes this report should carry. Unresolved maintenance
            holds generation.
          </p>
        </div>
      </div>
      <p className="am-note">
        Synthetic session only. Checklist attestations simulate review; no real
        documents, accounts, or submissions.
      </p>
      <LifecycleJourney
        activeStage={deepLink?.lifecycleStage}
        item={chosen.length === 1 ? chosen[0] : undefined}
        onNavigate={onNavigate}
      />
      <section className="am-card">
        <h2 data-maintenance-guide="prerequisites">
          Maintenance prerequisites
        </h2>
        <p>
          Selected changes supply the report's household, account scope,
          evidence packet, owner, and review history.
        </p>
        <div className="lx-context-list">
          {cases.map((c) => (
            <div className="lx-context-row" key={c.id}>
              <label className="am-check">
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={(e) =>
                    setSelected((prev) =>
                      e.target.checked
                        ? [...prev, c.id]
                        : prev.filter((id) => id !== c.id),
                    )
                  }
                />
                <span>
                  <strong>
                    {c.household} · {c.change}
                  </strong>
                  <small>
                    {c.id} · {c.accounts.length}{" "}
                    {c.accounts.length === 1 ? "account" : "accounts"} ·{" "}
                    {c.checks.filter(Boolean).length}/3 checks
                  </small>
                </span>
              </label>
              <div>
                <span
                  className={`am-status ${c.status === "Complete" ? "am-good" : "am-warn"}`}
                >
                  {c.status === "Complete"
                    ? "Ready for output"
                    : c.blocker || "Reviewer confirmation needed"}
                </span>
                <button
                  onClick={() =>
                    onNavigate("maintenance", {
                      caseId: c.id,
                      panel: "evidence",
                    })
                  }
                >
                  {c.status === "Complete"
                    ? "View evidence"
                    : "Resolve prerequisite"}{" "}
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="am-callout" role="status" data-maintenance-tour="prerequisites">
          <strong>
            {eligible
              ? `${chosen.length} verified change${chosen.length === 1 ? "" : "s"} ready for reporting`
              : chosen.length
                ? "Generation held until selected changes are complete"
                : "Select at least one change"}
          </strong>
          <p>
            {eligible
              ? "The report will include the exact accounts and review history below."
              : "Open Resolve prerequisite, complete the evidence checks, and confirm the human demo review. Then continue to this report."}
          </p>
        </div>
      </section>
      <div className="am-tabs" aria-label="Report output type">
        <button
          aria-pressed={mode === "account"}
          onClick={() => setMode("account")}
        >
          Account change report
        </button>
        <button
          aria-pressed={mode === "portfolio"}
          onClick={() => setMode("portfolio")}
        >
          Portfolio report studio
        </button>
      </div>
      {mode === "account" ? (
        <section className="am-card" data-maintenance-guide="report">
          <div className="am-heading">
            <div>
              <h2>Account change report</h2>
              <p>
                {report
                  ? `${report.id} · Generated ${report.time} · Synthetic snapshot`
                  : "A report built from this session's completed maintenance evidence."}
              </p>
            </div>
            <button
              className="am-primary"
              disabled={!eligible}
              onClick={generate}
            >
              {report ? "Regenerate account report" : "Generate account report"}
            </button>
          </div>
          {report ? (
            <article
              className="lx-report"
              data-maintenance-guide="output"
              aria-label="Generated account change report"
            >
              <div className="lx-report-head">
                <span>WEALTHSCAPE LIFECYCLE INTELLIGENCE</span>
                <h2>Verified account change summary</h2>
                <p>
                  {report.cases.length} completed{" "}
                  {report.cases.length === 1 ? "change" : "changes"} ·{" "}
                  {report.cases.reduce((n, c) => n + c.accounts.length, 0)}{" "}
                  account records · {report.id}
                </p>
              </div>
              {report.cases.map((c) => (
                <section className="lx-report-case" key={c.id}>
                  <h3>{c.household}</h3>
                  <p>
                    <strong>{c.change}</strong> · {c.id} · {c.registration}
                  </p>
                  <div className="lx-report-grid">
                    <div>
                      <small>Account scope</small>
                      {c.accounts.map((a) => (
                        <p key={a}>{a}</p>
                      ))}
                    </div>
                    <div>
                      <small>Evidence carried into this report</small>
                      <p>
                        {c.id}-E · Authority, signature, and change evidence
                        attested
                      </p>
                      <p>Service owner: {c.owner}</p>
                    </div>
                  </div>
                  <h4>Recorded review history</h4>
                  <ol className="am-timeline">
                    {c.events.map((e, i) => (
                      <li key={i}>
                        <strong>{e.text}</strong>
                        <small>
                          {e.actor} · {e.time}
                        </small>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
              <p className="am-note">
                Synthetic output. This report documents demo account changes; it
                makes no claims about investment performance or real document
                validity.
              </p>
              <button onClick={download}>Download evidence JSON</button>
            </article>
          ) : (
            <div className="lx-report-empty">
              <strong>
                {eligible
                  ? "Ready to assemble the account report"
                  : "Report awaiting trusted account context"}
              </strong>
              <p>
                {chosen.map((c) => c.household).join(" · ") ||
                  "No changes selected"}
              </p>
            </div>
          )}
        </section>
      ) : (
        <section className="am-card">
          <h2>Portfolio report studio</h2>
          <p>
            Maintenance prerequisites apply before this studio opens. Its market
            charts use separate illustrative portfolio data; the account change
            report above is the source of the selected maintenance evidence.
          </p>
          {eligible ? (
            children
          ) : (
            <div className="am-callout">
              Complete the selected maintenance changes to open the portfolio
              studio.
            </div>
          )}
        </section>
      )}
    </div>
  );
}
export const outcomes = [
  ["Data re-entry across a change", 1.86, 4.93, "Sourced"],
  ["Rejected for incomplete information", 2.14, 5, "Derived"],
  ["Exception resolution time", 2.36, 4.9, "Inferred"],
  ["One change across a household", 1.94, 4.5, "Derived"],
  ["Beneficiary across a household", 2.06, 4.44, "Derived"],
  ["Detect stale data before an exam", 1.95, 4, "Sourced"],
  ["Re-servicing after acquisition", 2.06, 3.94, "Derived"],
  ["Actions needing Fidelity to act", 2.66, 4.62, "Derived"],
  ["Status without calling service", 2.34, 4.34, "Derived"],
  ["Right authority the first time", 2.62, 4.28, "Derived"],
  ["Paper required per change", 2.44, 4.6, "Sourced"],
  ["Client signature turnaround", 3.5, 5, "Sourced"],
  ["Periodic review missed", 2.5, 4, "Sourced"],
  ["Confirming a change is complete", 2.9, 4.12, "Inferred"],
  ["Standing instruction / bank link", 3.12, 3.9, "Derived"],
];
const sourceColors = {
  Sourced: "#0b5d2e",
  Derived: "#5b4fbe",
  Inferred: "#a76b09",
};
export function LifecycleResearch({
  view,
  embedded = false,
  selectedOutcome,
  onOutcomeChange,
  outcomeDetail,
  compactSourceNote = false,
}) {
  const [localTab, setTab] = useState("opportunity");
  const tab = view || localTab;
  const [localIndex, setLocalIndex] = useState(-1);
  const index = selectedOutcome === undefined ? localIndex : selectedOutcome;
  const setIndex = onOutcomeChange || setLocalIndex;
  const d = outcomes[index];
  return (
    <section className="am-workspace am-card">
      {!embedded && (
        <>
          <span className="am-eyebrow">
            Research translated into product direction
          </span>
          <h2>The work behind the report</h2>
          <p>
            Account intake, authority, service action, and review form one
            operating path. Reporting is one output of that verified context.
          </p>
          <div className="am-tabs">
            {[
              ["opportunity", "15-outcome map"],
              ["positioning", "Competitive positioning"],
              ["journey", "Journey & ownership"],
            ].map(([id, label]) => (
              <button
                key={id}
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
      {tab === "opportunity" && (
        <>
          {!compactSourceNote && (
            <p className="am-note">
              Source snapshot: Account Maintenance Frames. Importance and
              satisfaction use adjacent survey categories; they are directional
              proxies, not direct maintenance measurements. Source tags are
              retained from the artifact.
            </p>
          )}
          <div className="lx-research-grid">
            <div className="lx-outcome-chart">
              <div className="lx-outcome-plot">
              <svg
                className="lx-chart"
                viewBox={`0 0 ${OUTCOME_CHART.width} ${OUTCOME_CHART.height}`}
                role="group"
                aria-label="Fifteen maintenance outcomes plotted by satisfaction and importance"
              >
                <desc>
                  Four source quadrants, divided at 3 on both 1–5 axes. High
                  importance and low satisfaction: Opportunity / underserved.
                  High importance and high satisfaction: Table stakes. Low
                  importance and high satisfaction: Overserved. Low importance
                  and low satisfaction: Ignore.
                </desc>
                {outcomeQuadrants.map((q) => (
                  <rect
                    key={q.label}
                    aria-label={q.label}
                    x={outcomeChartX(q.minS)}
                    y={outcomeChartY(q.maxI)}
                    width={outcomeChartX(q.maxS) - outcomeChartX(q.minS)}
                    height={outcomeChartY(q.minI) - outcomeChartY(q.maxI)}
                    fill={q.fill}
                  />
                ))}
                {[1, 2, 3, 4, 5].map((n) => (
                  <g key={n}>
                    <line
                      x1={outcomeChartX(n)}
                      x2={outcomeChartX(n)}
                      y1={OUTCOME_CHART.top}
                      y2={OUTCOME_CHART.bottom}
                      stroke="#e2e8f0"
                    />
                    <line
                      x1="52"
                      x2="492"
                      y1={outcomeChartY(n)}
                      y2={outcomeChartY(n)}
                      stroke="#e2e8f0"
                    />
                    <text x={outcomeChartX(n)} y={OUTCOME_CHART.bottom + 22} textAnchor="middle">
                      {n}
                    </text>
                    <text x="35" y={outcomeChartY(n) + 5}>
                      {n}
                    </text>
                  </g>
                ))}
                <line
                  x1={outcomeChartX(OUTCOME_MIDPOINT)}
                  x2={outcomeChartX(OUTCOME_MIDPOINT)}
                  y1={OUTCOME_CHART.top}
                  y2={OUTCOME_CHART.bottom}
                  stroke="#869398"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                />
                <line
                  x1="52"
                  x2="492"
                  y1={outcomeChartY(OUTCOME_MIDPOINT)}
                  y2={outcomeChartY(OUTCOME_MIDPOINT)}
                  stroke="#869398"
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                />
                {outcomes
                  .map((o, i) => ({ o, i }))
                  .sort((a, b) => Number(a.i === index) - Number(b.i === index))
                  .map(({ o, i }) => (
                    <g
                      key={o[0]}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select outcome ${i + 1}: ${o[0]}`}
                      aria-pressed={i === index}
                      onClick={() => setIndex(i)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setIndex(i);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {i === index && (
                        <circle
                          cx={outcomeChartX(o[1])}
                          cy={outcomeChartY(o[2])}
                          r={20}
                          fill="white"
                          stroke="#243542"
                          strokeWidth="2"
                        />
                      )}
                      <circle
                        cx={outcomeChartX(o[1])}
                        cy={outcomeChartY(o[2])}
                        r={i === index ? 14 : 9}
                        fill={
                          o[3] === "Inferred" ? "white" : sourceColors[o[3]]
                        }
                        fillOpacity={index === -1 || i === index ? 1 : 0.18}
                        strokeOpacity={index === -1 || i === index ? 1 : 0.55}
                        stroke={sourceColors[o[3]]}
                        strokeWidth={i === index ? 4 : 1}
                        strokeDasharray={
                          o[3] === "Inferred" ? "3 2" : undefined
                        }
                      />
                      <text
                        x={outcomeChartX(o[1])}
                        y={outcomeChartY(o[2]) + 4}
                        textAnchor="middle"
                        fill={
                          index !== -1 && i !== index
                            ? "#354452"
                            : o[3] === "Inferred"
                              ? "#805400"
                              : "white"
                        }
                        fontWeight={i === index ? "800" : "600"}
                        fontSize={i === index ? "11" : "9"}
                      >
                        {i + 1}
                      </text>
                    </g>
                  ))}
                <text x="270" y={OUTCOME_CHART.height - 10} textAnchor="middle">
                  Satisfaction proxy →
                </text>
                <text
                  x="15"
                  y={outcomeChartY(OUTCOME_MIDPOINT)}
                  transform={`rotate(-90 15 ${outcomeChartY(OUTCOME_MIDPOINT)})`}
                  textAnchor="middle"
                >
                  Importance proxy →
                </text>
              </svg>
                {outcomeQuadrants.map(q => <span key={q.label} className="lx-quadrant-label" aria-hidden="true" style={{ left: `${outcomeChartX((q.minS + q.maxS) / 2) / OUTCOME_CHART.width * 100}%`, ...(q.minI === 3 ? { bottom: `calc(${(1 - outcomeChartY(OUTCOME_MIDPOINT) / OUTCOME_CHART.height) * 100}% + 6px)`, top: "auto" } : { top: `${outcomeChartY(1.5) / OUTCOME_CHART.height * 100}%` }) }}>{q.lines.map(line => <span key={line}>{line}</span>)}</span>)}
              </div>
              <p className="am-note" role="status">
                {d
                  ? `Highlighted: ${index + 1}. ${d[0]}. Muted bubbles remain visible for comparison.`
                  : "Showing all 15 outcomes with equal emphasis. Select an outcome to inspect its evidence."}
              </p>
              <div className="lx-legend">
                {Object.entries(sourceColors).map(([name, color]) => (
                  <span key={name}>
                    <i style={{ background: color }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="lx-outcome-inspector">
              <label className="am-field">
                Explore an outcome
                <select
                  value={index}
                  onChange={(e) => setIndex(Number(e.target.value))}
                >
                  <option value={-1}>All outcomes</option>
                  {outcomes.map((o, i) => (
                    <option key={o[0]} value={i}>
                      {i + 1}. {o[0]}
                    </option>
                  ))}
                </select>
              </label>
              {index !== -1 && (
                <button className="mo-reset" onClick={() => setIndex(-1)}>
                  All outcomes
                </button>
              )}
              {outcomeDetail || (
                <div className="am-callout">
                  {d ? (
                    <>
                      <strong>
                        {index + 1}. {d[0]}
                      </strong>
                      <p>
                        {d[3]} input · importance {d[2].toFixed(2)} / 5 ·
                        satisfaction {d[1].toFixed(2)} / 5
                      </p>
                      <p>
                        {d[3] === "Inferred"
                          ? "An inference to test with operations teams; do not treat this as a measured rate."
                          : "Retained artifact label. Cross-category mapping still introduces uncertainty."}
                      </p>
                    </>
                  ) : (
                    <>
                      <strong>All outcomes</strong>
                      <p>
                        Compare all 15 outcomes by importance and satisfaction.
                        Select an outcome to see its values and evidence
                        category.
                      </p>
                      <p>
                        These directional proxies retain the source artifact’s
                        category labels and uncertainty.
                      </p>
                    </>
                  )}
                </div>
              )}
              {!compactSourceNote && (
                <p className="am-note">
                  Kitces 2025 and T3/Inside Information 2026 inform the
                  artifact. Their samples and categories differ. The later
                  executive deck revises some scores; this map is explicitly the
                  Frames snapshot.
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {tab === "positioning" && <MaintenanceCompetitorMap />}
      {tab === "journey" && (
        <>
          <p className="am-note">
            Executive deck, slides 6 and 10. Assessed journey from directional
            forum evidence; curve height is illustrative, not measured
            confidence.
          </p>
          <svg
            className="lx-chart lx-curve"
            viewBox="0 0 680 160"
            role="img"
            aria-label="Illustrative journey friction at authority and service waiting"
          >
            <path
              d="M35 35 C90 20 130 30 160 100 S230 55 275 45 S350 125 395 120 S480 20 540 35 L640 25"
              fill="none"
              stroke="#0b5d2e"
              strokeWidth="4"
            />
            <circle cx="160" cy="100" r="7" fill="#ad7100" />
            <circle cx="395" cy="120" r="7" fill="#ad7100" />
            <text x="160" y="145" textAnchor="middle">
              Authority / signature
            </text>
            <text x="425" y="153" textAnchor="middle">
              Waiting on service
            </text>
          </svg>
          <div className="lx-swimlane">
            {[
              [
                "Client",
                "Life event",
                "Authority / signature",
                "Receives confirmation",
              ],
              [
                "Operations",
                "Capture once",
                "Route rejected work",
                "Confirm account scope",
              ],
              [
                "Home office",
                "Policy context",
                "Review exceptions",
                "Retain review evidence",
              ],
            ].map(([role, ...steps]) => (
              <div key={role}>
                <strong>{role}</strong>
                {steps.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            ))}
          </div>
          <p>
            Design response: show the next owner and missing evidence at each
            wait, retain the rejection history, and carry the completed packet
            into reporting.
          </p>
        </>
      )}
    </section>
  );
}
const priorities = [
  [
    "Household authority",
    [4, 5, 5, 3, 4],
    "NEXT · depends on shared validation",
  ],
  ["Validation & exceptions", [5, 2, 4, 2, 5], "NOW · shared prerequisite"],
  [
    "Compliance currency",
    [3, 2, 3, 5, 3],
    "NEXT · scope by account / firm obligations",
  ],
  ["Enterprise conversion", [3, 3, 4, 2, 2], "LATER · validate segment demand"],
];
const dimensions = [
  ["Unmet need", 0.3],
  ["Competitive urgency", 0.2],
  ["Persona breadth", 0.2],
  ["Regulatory forcing", 0.15],
  ["Build leverage", 0.15],
];
export function LifecycleInvestment({ onNavigate }) {
  const [tab, setTab] = useState("sequence");
  const [volume, setVolume] = useState(1000);
  const [rework, setRework] = useState(10);
  const [minutes, setMinutes] = useState(20);
  const [rate, setRate] = useState(55);
  const hours = (volume * (rework / 100) * minutes) / 60;
  return (
    <section className="am-workspace am-card">
      <span className="am-eyebrow">Account lifecycle investment case</span>
      <h1>Fund the shared path before expanding the functions</h1>
      <p>
        Validation and exception handling support account maintenance across
        functions. Authority, household updates, and evidence currency extend
        that foundation; reporting reuses the verified context.
      </p>
      <div className="am-tabs">
        {[
          ["sequence", "Priority & phase gates"],
          ["value", "Value assumptions"],
        ].map(([id, label]) => (
          <button key={id} aria-pressed={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === "sequence" ? (
        <>
          <p className="am-note">
            Executive deck slides 19–20: scores are 1–5, weights are judgement,
            and build leverage is assessed. Regulatory scoring in the source
            excludes proposals; this prototype does not determine legal
            applicability.
          </p>
          <div className="lx-scorecards">
            {priorities.map(([title, scores, phase]) => (
              <article className="lx-scorecard" key={title}>
                <div className="am-heading">
                  <h3>{title}</h3>
                  <strong className="lx-score">
                    {scores
                      .reduce((n, s, i) => n + s * dimensions[i][1], 0)
                      .toFixed(2)}
                  </strong>
                </div>
                {dimensions.map(([label, w], i) => (
                  <div className="lx-score-row" key={label}>
                    <span>
                      {label} <small>{w * 100}%</small>
                    </span>
                    <meter
                      min="0"
                      max="5"
                      value={scores[i]}
                      aria-label={`${title}: ${label}`}
                    />
                    <b>{scores[i]}</b>
                  </div>
                ))}
                <p>{phase}</p>
              </article>
            ))}
          </div>
          <div className="am-callout">
            <strong>Score ranks. Dependency sequences.</strong>
            <p>
              Household authority ranks first at 4.25, but a multi-account
              change needs the validation and exception layer first. The 3.75
              foundation therefore ships before the higher-scoring extension.
            </p>
          </div>
          <div className="lx-phases">
            {[
              [
                "NOW · 0–6 months",
                "Shared intake, validation, exception routing",
                "Month 3 gate: measure direct vs assisted volume and establish maintenance rejection/rework baseline.",
              ],
              [
                "NEXT · 6–12 months",
                "Authority, household updates, evidence currency",
                "Gate: prove account scope, authority review, entitlements, and evidence retention in a bounded pilot.",
              ],
              [
                "LATER · 12–24 months",
                "Enterprise conversion and multi-entity servicing",
                "Gate: validate acquisition demand and operating costs before scaling across entities.",
              ],
            ].map(([phase, title, gate]) => (
              <article key={phase}>
                <span className="am-eyebrow">{phase}</span>
                <h3>{title}</h3>
                <p>{gate}</p>
              </article>
            ))}
          </div>
          <p className="am-note">
            Assessed planning windows, not committed dates. The first
            measurement can change the size and sequence of investment.
          </p>
        </>
      ) : (
        <>
          <div className="am-callout">
            <strong>
              Illustrative sensitivity model · not a savings forecast
            </strong>
            <p>
              No internal maintenance volumes, unit costs, or
              maintenance-specific rejection rates are available. These editable
              assumptions show what must be measured before funding a quantified
              case.
            </p>
          </div>
          <div className="lx-inputs">
            {[
              ["Assumed changes / month", volume, setVolume, 100000],
              [
                "Assumed rework reduction (percentage points)",
                rework,
                setRework,
                100,
              ],
              ["Assumed minutes per rework", minutes, setMinutes, 240],
              ["Assumed cost per hour ($)", rate, setRate, 500],
            ].map(([label, value, set, max]) => (
              <label className="am-field" key={label}>
                {label}
                <input
                  type="number"
                  min="0"
                  max={max}
                  value={value}
                  onChange={(e) =>
                    set(Math.min(max, Math.max(0, Number(e.target.value) || 0)))
                  }
                />
              </label>
            ))}
          </div>
          <div className="lx-value">
            <strong>{hours.toFixed(1)} modeled hours / month</strong>
            <strong>
              ${Math.round(hours * rate).toLocaleString()} modeled capacity
              value
            </strong>
            <p>
              Changes × rework reduction × minutes ÷ 60. Capacity value
              multiplies by assumed hourly cost; it is not cash savings,
              revenue, or ROI.
            </p>
          </div>
          <div className="lx-phases">
            <article>
              <h3>What could improve</h3>
              <p>
                Re-entry, incomplete submissions, service waits, and reviewer
                handoffs. Measure each against a baseline.
              </p>
            </article>
            <article>
              <h3>Costs to include</h3>
              <p>
                Shared data validation, workflow integration, authority rules,
                security, reviewer operations, support, and ongoing evidence
                retention.
              </p>
            </article>
            <article>
              <h3>What unlocks funding</h3>
              <p>
                Volume split, unit cost, maintenance rework rates, and CSA
                observation. Compare pilot gains with delivery and operating
                costs.
              </p>
            </article>
          </div>
        </>
      )}
      <details>
        <summary>Assumptions, source limits, and scaling controls</summary>
        <p>
          No direct maintenance survey category; advisor samples do not directly
          represent client service associates. Forum evidence is selected toward
          unresolved problems. Public documentation is an incomplete capability
          inventory. No internal volume data means no validated ROI.
        </p>
        <p>
          Source: Wealthscape Market Research / Account Maintenance Executive,
          slides 19, 20, 23, 25 and 30. Kitces 2025, T3 2026, J.D. Power 2026,
          FINRA 3110/4311, SEA 17a-3(a)(17), and competitor/forum evidence
          require scope-specific validation. Regulatory proposals are not
          treated as enacted rules.
        </p>
        <p>
          Scale only with data classification, account entitlement controls,
          redaction, durable audit trail, source provenance, and human review
          gates. This synthetic session-only prototype implements none of those
          production controls.
        </p>
      </details>
      <button
        className="am-back"
        onClick={() => onNavigate("maintenance", { maintenanceView: "intake" })}
      >
        Inspect the foundation workflow →
      </button>
    </section>
  );
}
