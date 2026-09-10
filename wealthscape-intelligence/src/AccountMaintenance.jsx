import { LifecycleJourney, LifecycleFlow } from "./LifecycleExperience";
import { useEffect, useState } from "react";
import "./AccountMaintenance.css";

const roles = {
  ria: {
    title: "Advisor lifecycle",
    scope: "Your household service queue",
    ids: ["MC-101", "MC-102", "MC-105"],
    heading: "Client follow-through",
    lanes: ["Advisor team", "Client service"],
  },
  "bd-home-office": {
    title: "Enterprise account lifecycle",
    scope: "Cross-office exceptions and service dependencies",
    ids: ["MC-102", "MC-103", "MC-104", "MC-106"],
    heading: "Route by operating team",
    lanes: ["Fidelity service", "Conversion operations", "Supervision"],
  },
  "bd-osj-principal": {
    title: "Supervisory account lifecycle",
    scope: "Branch review and evidence currency",
    ids: ["MC-103", "MC-105", "MC-106"],
    heading: "Supervisory review docket",
    lanes: ["Supervision", "Branch operations"],
  },
  "bd-hybrid-advisor": {
    title: "Team account lifecycle",
    scope: "Brokerage and advisory service work",
    ids: ["MC-101", "MC-104", "MC-105"],
    heading: "Service by registration",
    lanes: ["Advisor team", "Conversion operations"],
  },
};
export const initialMaintenance = [
  {
    id: "MC-101",
    household: "Cedar household",
    change: "Beneficiary update",
    accounts: ["IRA · DEMO-01", "Roth IRA · DEMO-02"],
    owner: "Advisor team",
    blocker: "Client signature missing",
    due: "Today",
    checks: [true, false, false],
    status: "Blocked",
    registration: "Advisory",
  },
  {
    id: "MC-102",
    household: "Harbor household",
    change: "Standing instruction / bank link",
    accounts: ["Brokerage · DEMO-03"],
    owner: "Fidelity service",
    blocker: "Bank-link evidence incomplete",
    due: "Today",
    checks: [true, true, false],
    status: "Blocked",
    registration: "Brokerage",
  },
  {
    id: "MC-103",
    household: "Maple household",
    change: "Periodic profile review",
    accounts: ["Brokerage · DEMO-04", "IRA · DEMO-05"],
    owner: "Supervision",
    blocker: "Profile review overdue",
    due: "Overdue · 2 days",
    checks: [true, true, false],
    status: "Blocked",
    registration: "Brokerage",
  },
  {
    id: "MC-104",
    household: "Summit household",
    change: "Acquisition re-servicing",
    accounts: ["Advisory · DEMO-06", "Brokerage · DEMO-07"],
    owner: "Conversion operations",
    blocker: "Authority must be recaptured",
    due: "Tomorrow",
    checks: [false, true, false],
    status: "Blocked",
    registration: "Mixed",
  },
  {
    id: "MC-105",
    household: "Willow household",
    change: "Household contact update",
    accounts: ["Advisory · DEMO-08", "IRA · DEMO-09"],
    owner: "Client service",
    blocker: null,
    due: "Today",
    checks: [true, true, true],
    status: "Ready for review",
    registration: "Advisory",
  },
  {
    id: "MC-106",
    household: "Aspen household",
    change: "Permission review",
    accounts: ["Brokerage · DEMO-10"],
    owner: "Branch operations",
    blocker: null,
    due: "Complete",
    checks: [true, true, true],
    status: "Complete",
    registration: "Brokerage",
  },
].map((c) => ({
  ...c,
  events: [
    {
      text:
        c.status === "Complete"
          ? "Review completed; reporting readiness released"
          : "Request captured; account scope validated",
      actor: c.owner,
      time: "09:00 demo",
    },
  ],
}));
const checkLabels = [
  "Authority verified for every selected account",
  "Client signature packet verified",
  "Change evidence and account details reviewed",
];
export const visibleCases = (cases, profile) =>
  cases.filter(
    (c) =>
      (roles[profile.id] || roles.ria).ids.includes(c.id) ||
      c.createdFor === profile.id,
  );
const ready = (c) => c.status === "Complete";
function Status({ value }) {
  return (
    <span
      className={`am-status ${value === "Complete" ? "am-good" : value === "Blocked" ? "am-warn" : ""}`}
    >
      {value}
    </span>
  );
}
export function LifecycleDashboard({ profile, cases, onNavigate }) {
  const role = roles[profile.id] || roles.ria;
  const rows = visibleCases(cases, profile);
  const blocked = rows.filter((c) => c.status === "Blocked");
  return (
    <div className="am-workspace" data-maintenance-guide="dashboard">
      <div className="am-hero">
        <div>
          <span className="am-eyebrow">Account operations</span>
          <h1>{role.title} command center</h1>
          <p>{role.scope}</p>
        </div>
        <button
          className="am-primary"
          onClick={() => onNavigate("maintenance")}
        >
          Open account maintenance →
        </button>
      </div>
      <p className="am-note">
        Synthetic demo · Changes last for this session. No client records or
        external submissions.
      </p>
      <div className="am-metrics">
        {[
          ["Open changes", rows.filter((c) => !ready(c)).length, "Open"],
          ["Blocked", blocked.length, "Blocked"],
          [
            "Waiting review",
            rows.filter((c) => c.status === "Ready for review").length,
            "Ready for review",
          ],
          ["Reporting ready", rows.filter(ready).length, "Complete"],
        ].map(([label, count, statusFilter]) => (
          <button
            className="am-card am-kpi"
            data-maintenance-tour={statusFilter === "Blocked" ? "dashboard" : undefined}
            key={label}
            onClick={() =>
              onNavigate("maintenance", {
                statusFilter,
                maintenanceView: "queue",
              })
            }
          >
            <strong className="am-number">{count}</strong>
            <span>{label}</span>
            <small>View queue →</small>
          </button>
        ))}
      </div>
      <LifecycleFlow rows={rows} onNavigate={onNavigate} />
      <LifecycleJourney onNavigate={onNavigate} />
      <div className="am-columns">
        <section className="am-card">
          <h2>{role.heading}</h2>
          {profile.id === "bd-home-office"
            ? role.lanes.map((lane) => (
                <button
                  className="am-row"
                  key={lane}
                  onClick={() => onNavigate("maintenance", { owner: lane })}
                >
                  <span>
                    <strong>{lane}</strong>
                    <small>
                      {rows.filter((c) => c.owner === lane && !ready(c)).length}{" "}
                      open changes · route and track service
                    </small>
                  </span>
                  <b>→</b>
                </button>
              ))
            : rows
                .filter((c) => !ready(c))
                .map((c) => (
                  <button
                    className="am-row"
                    key={c.id}
                    onClick={() =>
                      onNavigate("maintenance", {
                        caseId: c.id,
                        panel:
                          profile.id === "bd-osj-principal"
                            ? "evidence"
                            : "overview",
                      })
                    }
                  >
                    <span>
                      <strong>{c.household}</strong>
                      <small>
                        {profile.id === "bd-hybrid-advisor"
                          ? c.registration + " · "
                          : ""}
                        {c.change}
                      </small>
                      <small>
                        {c.blocker ||
                          "Evidence complete; reviewer decision needed"}
                      </small>
                    </span>
                    <Status value={c.status} />
                  </button>
                ))}
        </section>
        <section className="am-card">
          <h2>
            {profile.id === "bd-osj-principal"
              ? "Evidence coverage"
              : "Reporting readiness"}
          </h2>
          <p>
            {rows.filter(ready).length} of {rows.length} changes cleared for
            downstream use.
          </p>
          {rows.map((c) => (
            <button
              className="am-row"
              key={c.id}
              onClick={() =>
                onNavigate("maintenance", { caseId: c.id, panel: "evidence" })
              }
            >
              <span>
                <strong>
                  {c.id} · {c.household}
                </strong>
                <small>
                  {c.checks.filter(Boolean).length}/3 evidence checks ·{" "}
                  {ready(c) ? "Released" : "Held for completion"}
                </small>
              </span>
              <b>→</b>
            </button>
          ))}
          <button
            onClick={() =>
              onNavigate("maintenance", { maintenanceView: "readiness" })
            }
          >
            Review downstream readiness
          </button>
        </section>
      </div>
    </div>
  );
}
export function MaintenanceStrategy({ onNavigate }) {
  const links = [
    [
      "Reduce data re-entry",
      "Reuse household scope in one intake, then verify each account.",
      { maintenanceView: "intake" },
    ],
    [
      "Capture the right authority",
      "Make authority and signature checks visible before completion.",
      { caseId: "MC-101", panel: "evidence" },
    ],
    [
      "Resolve exceptions",
      "Give each blocker an owner and a visible next step.",
      { caseId: "MC-102", panel: "overview" },
    ],
    [
      "Strengthen review evidence",
      "Keep the evidence packet and reviewer decision together.",
      { caseId: "MC-103", panel: "evidence" },
    ],
    [
      "Make status visible",
      "Track the change through a shared service timeline.",
      { caseId: "MC-104", panel: "timeline" },
    ],
  ];
  return (
    <section className="am-workspace am-card">
      <span className="am-eyebrow">Account maintenance direction</span>
      <h2>Move from report modernization to lifecycle orchestration</h2>
      <p>
        Prioritize shared intake, validation, and exception handling. Authority
        and review establish trusted account context; reporting reuses that
        evidence as one downstream output.
      </p>
      <div className="am-strategy-grid">
        {links.map(([title, body, sub]) => (
          <a
            key={title}
            href={maintenanceHref("maintenance", {
              ...sub,
              profileId: "bd-home-office",
            })}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("maintenance", {
                ...sub,
                profileId: "bd-home-office",
              });
            }}
          >
            <strong>{title} →</strong>
            <p>{body}</p>
          </a>
        ))}
      </div>
      <details>
        <summary>Research provenance and production controls</summary>
        <p>
          Direction informed by the Wealthscape Market Research project, Account
          Maintenance Frames, and Wealthscape Account Maintenance Executive
          exports. The frames use adjacent-category research: maintenance
          opportunity scores are directional, with sourced, derived, and
          inferred inputs. They are not measured maintenance performance or a
          promised ROI.
        </p>
        <p>
          Evidence families retained for research review: Kitces 2025; T3/Inside
          Information 2026; FINRA 3110/4311; SEA Rule 17a-3(a)(17); J.D. Power
          2026; Schwab, Altruist, and Axos materials; Reddit/Apify forum
          methodology. Vendor claims and forum observations need separate
          attribution and validation.
        </p>
        <p>
          Today: synthetic fixtures, session-only state, no sensitive data.
          Production would require data classification, account entitlements,
          redaction, durable audit trails, source provenance, and human review
          gates. Demo checkboxes do not verify documents or implement those
          controls.
        </p>
      </details>
    </section>
  );
}
export function maintenanceHref(layer, sub = {}) {
  const params = new URLSearchParams({ view: layer });
  for (const key of [
    "profileId",
    "caseId",
    "panel",
    "maintenanceView",
    "owner",
    "statusFilter",
    "lifecycleStage",
  ])
    if (sub[key]) params.set(key, sub[key]);
  return "#" + params.toString();
}
export function readMaintenanceRoute() {
  const p = new URLSearchParams(window.location.hash.slice(1));
  const valid = [
    "morning",
    "maintenance",
    "reports",
    "portal",
    "integrations",
    "insights",
    "strategy",
    "buildcase",
    "settings",
  ];
  return {
    layer: valid.includes(p.get("view")) ? p.get("view") : "morning",
    sub: Object.fromEntries(p),
  };
}
export function AccountMaintenance({
  profile,
  cases,
  setCases,
  deepLink,
  onNavigate,
  guided = false,
  readOnly = false,
}) {
  const [view, setView] = useState("queue");
  const [selected, setSelected] = useState(null);
  const [panel, setPanel] = useState("overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [ownerFilter, setOwnerFilter] = useState("");
  const [notice, setNotice] = useState("");
  const [accounts, setAccounts] = useState([
    "IRA · DEMO-11",
    "Brokerage · DEMO-12",
  ]);
  const [change, setChange] = useState("Beneficiary update");
  useEffect(() => {
    setView(
      ["queue", "readiness", "intake"].includes(deepLink?.maintenanceView)
        ? deepLink.maintenanceView
        : "queue",
    );
    setSelected(deepLink?.caseId || null);
    setPanel(
      ["overview", "evidence", "timeline"].includes(deepLink?.panel)
        ? deepLink.panel
        : "overview",
    );
    setOwnerFilter(deepLink?.owner || "");
    setQuery("");
    setFilter(
      ["Open", "Blocked", "Ready for review", "Complete"].includes(
        deepLink?.statusFilter,
      )
        ? deepLink.statusFilter
        : "All",
    );
    setNotice("");
  }, [deepLink, profile.id]);
  // A strategy deep link may expose any synthetic case; this is not an entitlement implementation.
  const scoped = visibleCases(cases, profile);
  const c = cases.find((c) => c.id === selected);
  const rows = scoped.filter(
    (c) =>
      (filter === "All" ||
        (filter === "Open" ? c.status !== "Complete" : c.status === filter)) &&
      (!ownerFilter || c.owner === ownerFilter) &&
      `${c.household} ${c.id} ${c.change} ${c.owner}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const clearFilters = () => {
    setFilter("All");
    setOwnerFilter("");
    setQuery("");
    onNavigate("maintenance");
  };
  const update = (patch, text) => {
    setCases((prev) =>
      prev.map((item) =>
        item.id === selected
          ? {
              ...item,
              ...patch,
              events: [
                ...item.events,
                {
                  text,
                  actor: profile.shell.name,
                  time:
                    new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) + " demo",
                },
              ],
            }
          : item,
      ),
    );
    setNotice(text);
  };
  const open = (item) => {
    if (guided) { onNavigate("maintenance", { caseId: item.id, panel: "overview", maintenanceView: "queue" }); return; }
    setSelected(item.id);
    setPanel("overview");
    setNotice("");
  };
  return (
    <div className="am-workspace">
      <div className="am-heading">
        <div>
          <span className="am-eyebrow">Account lifecycle / Maintenance</span>
          <h1>Account maintenance</h1>
          <p>{(roles[profile.id] || roles.ria).scope}</p>
        </div>
        <button
          className="am-primary"
          disabled={guided}
          title={guided ? "Exit the guide to start a separate household change" : undefined}
          onClick={() => {
            setView("intake");
            setSelected(null);
            setNotice("");
          }}
        >
          Start household change
        </button>
      </div>
      <p className="am-note">
        Synthetic demo · Session-only edits · No documents, signatures, or
        requests are sent.
      </p>
      <LifecycleJourney
        item={c}
        activeStage={deepLink?.lifecycleStage}
        onNavigate={onNavigate}
      />
      <div className="am-tabs" aria-label="Maintenance views">
        {[
          ["queue", "Work queue"],
          ["readiness", "Reporting readiness"],
          ["intake", "Household intake"],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={view === id}
            title={guided && id !== "queue" ? "Leaves the guide and returns to your session workspace" : undefined}
            onClick={() => {
              if (guided) { onNavigate("maintenance", { maintenanceView: id, ...(id === "queue" ? { statusFilter: "Blocked" } : {}) }); return; }
              setView(id);
              setSelected(null);
              setNotice("");
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {notice && (
        <div className="am-notice" role="status">
          {notice}
        </div>
      )}
      {view === "intake" ? (
        <section className="am-card">
          <h2>One change, selected accounts</h2>
          <p>
            Cedar extension household · Existing demo details reused. Select the
            accounts this request covers.
          </p>
          <label className="am-field">
            Change type
            <select value={change} onChange={(e) => setChange(e.target.value)}>
              {[
                "Beneficiary update",
                "Household contact update",
                "Authority update",
                "Standing instruction / bank link",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>Account scope</legend>
            {["IRA · DEMO-11", "Brokerage · DEMO-12", "Trust · DEMO-13"].map(
              (a) => (
                <label className="am-check" key={a}>
                  <input
                    type="checkbox"
                    checked={accounts.includes(a)}
                    onChange={(e) =>
                      setAccounts((prev) =>
                        e.target.checked
                          ? [...prev, a]
                          : prev.filter((x) => x !== a),
                      )
                    }
                  />
                  {a}
                </label>
              ),
            )}
          </fieldset>
          <p>
            Each selected account requires authority, signature, and
            change-evidence review. Trust ownership also requires authority
            review.
          </p>
          <button
            className="am-primary"
            disabled={!accounts.length}
            onClick={() => {
              const id =
                "MC-" +
                (Math.max(...cases.map((c) => Number(c.id.slice(3)))) + 1);
              setCases((prev) => [
                ...prev,
                {
                  id,
                  household: "Cedar extension household",
                  change,
                  accounts: [...accounts],
                  owner: "Advisor team",
                  blocker: "Authority and signature review required",
                  due: "Today",
                  checks: [false, false, false],
                  status: "Blocked",
                  registration: "Mixed",
                  createdFor: profile.id,
                  events: [
                    {
                      text:
                        "Household intake created for " +
                        accounts.length +
                        " selected accounts",
                      actor: profile.shell.name,
                      time: "Now · demo",
                    },
                  ],
                },
              ]);
              setView("queue");
              setSelected(id);
              setPanel("evidence");
              setNotice(
                "Demo intake created. Review the evidence for every selected account.",
              );
            }}
          >
            Create demo request
          </button>
          {!accounts.length && (
            <p role="status">
              Select at least one account to create a request.
            </p>
          )}
        </section>
      ) : (
        <>
          {!c && view === "queue" && (
            <div className="am-filters">
              <label>
                Search queue
                <input
                  value={query}
                  placeholder="Household, request, or owner"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <label>
                Status
                <select
                  value={filter}
                  onChange={(e) =>
                    onNavigate("maintenance", {
                      ...deepLink,
                      statusFilter: e.target.value,
                      maintenanceView: "queue",
                    })
                  }
                >
                  {[
                    "All",
                    "Open",
                    "Blocked",
                    "Ready for review",
                    "Complete",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              {ownerFilter && (
                <button onClick={() => setOwnerFilter("")}>
                  Clear owner: {ownerFilter} ×
                </button>
              )}
              <span role="status">
                Showing{" "}
                {filter === "All"
                  ? "all work"
                  : filter === "Open"
                    ? "open work"
                    : filter}{" "}
                · {rows.length} of {scoped.length} requests
              </span>
              {(filter !== "All" || query || ownerFilter) && (
                <button onClick={clearFilters}>Clear filters</button>
              )}
            </div>
          )}
          {c ? (
            <section className="am-card" data-maintenance-guide="case">
              <div className="am-heading">
                <button onClick={() => guided ? onNavigate("maintenance", { maintenanceView: "queue", statusFilter: "Blocked" }) : setSelected(null)}>
                  ← Back to {view === "readiness" ? "readiness" : "queue"}
                </button>
                <Status value={c.status} />
              </div>
              <h2>
                {c.household} · {c.change}
              </h2>
              <p>
                {c.id} · {c.accounts.length}{" "}
                {c.accounts.length === 1 ? "account" : "accounts"} · {c.due}
              </p>
              <div className="am-tabs">
                {["overview", "evidence", "timeline"].map((p) => (
                  <button
                    key={p}
                    aria-pressed={panel === p}
                    onClick={() => guided ? onNavigate("maintenance", { caseId: c.id, panel: p, maintenanceView: "queue" }) : setPanel(p)}
                  >
                    {p === "overview"
                      ? "Blocker & routing"
                      : p === "evidence"
                        ? "Authority & evidence"
                        : "Status timeline"}
                  </button>
                ))}
              </div>
              {panel === "overview" && (
                <div className="am-detail">
                  <div className="am-callout">
                    <strong>
                      {c.blocker ||
                        (ready(c)
                          ? "Change confirmed complete"
                          : "Evidence complete; reviewer decision needed")}
                    </strong>
                    <p>
                      {ready(c)
                        ? "Released to reporting readiness."
                        : "Next action: review account scope and complete missing evidence checks."}
                    </p>
                    <button onClick={() => guided ? onNavigate("maintenance", { caseId: c.id, panel: "evidence", maintenanceView: "queue" }) : setPanel("evidence")}>
                      Review evidence packet →
                    </button>
                  </div>
                  <label className="am-field">
                    Assigned owner
                    <select
                      disabled={readOnly || ready(c)}
                      value={c.owner}
                      onChange={(e) =>
                        update(
                          { owner: e.target.value },
                          "Owner routed to " + e.target.value,
                        )
                      }
                    >
                      {[
                        "Advisor team",
                        "Client service",
                        "Fidelity service",
                        "Conversion operations",
                        "Supervision",
                        "Branch operations",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                  <p>
                    Routing updates this demo queue only. Service action and
                    response remain simulated.
                  </p>
                  <div data-maintenance-tour="case"><h3>Accounts in scope</h3>
                  {c.accounts.map((a) => (
                    <p key={a}>{a}</p>
                  ))}</div>
                </div>
              )}
              {panel === "evidence" && (
                <div className="am-detail" data-maintenance-guide="evidence">
                  <p>
                    Packet {c.id}-E · Synthetic checklist for{" "}
                    {c.accounts.join(", ")}. Checks attest to every account
                    listed; no real documents are verified.
                  </p>
                  <div data-maintenance-tour="evidence">{checkLabels.map((label, i) => (
                    <label className="am-check" key={label}>
                      <input
                        type="checkbox"
                        disabled={readOnly || ready(c)}
                        checked={c.checks[i]}
                        onChange={(e) => {
                          const checks = c.checks.map((v, j) =>
                            j === i ? e.target.checked : v,
                          );
                          update(
                            {
                              checks,
                              status: checks.every(Boolean)
                                ? "Ready for review"
                                : "Blocked",
                              blocker: checks.every(Boolean)
                                ? null
                                : "Evidence packet incomplete",
                            },
                            (e.target.checked
                              ? "Demo check recorded: "
                              : "Demo check reopened: ") + label,
                          );
                        }}
                      />
                      {label}
                    </label>
                  ))}
                  </div><div className="am-callout" data-maintenance-guide="review" data-maintenance-tour="review">
                    <strong>Human review gate</strong>
                    <p>
                      {ready(c)
                        ? "Review recorded. This change is ready for downstream reporting."
                        : c.checks.every(Boolean)
                          ? "All evidence checks are present. Confirm the demo review to complete the change."
                          : "Complete all three evidence checks before confirming the change."}
                    </p>
                    <button
                      className="am-primary"
                      disabled={readOnly || ready(c) || !c.checks.every(Boolean)}
                      onClick={() =>
                        update(
                          {
                            status: "Complete",
                            blocker: null,
                            due: "Complete",
                          },
                          "Human demo review confirmed; change released to reporting readiness",
                        )
                      }
                    >
                      {ready(c)
                        ? "Review complete"
                        : "Confirm demo review & complete"}
                    </button>
                  </div>
                </div>
              )}
              {ready(c) && (
                <div className="am-callout">
                  <strong>
                    {c.reportId
                      ? `Report ${c.reportId} generated`
                      : "Verified context is ready for your report"}
                  </strong>
                  <p>
                    The selected accounts and this evidence history will flow
                    into the account change report.
                  </p>
                  <button
                    className="am-primary"
                    onClick={() => onNavigate("reports", { caseId: c.id })}
                  >
                    {c.reportId ? "View account report" : "Continue to report"}{" "}
                    →
                  </button>
                </div>
              )}
              {panel === "timeline" && (
                <ol className="am-timeline" data-maintenance-guide="timeline" data-maintenance-tour="timeline">
                  {c.events.map((e, i) => (
                    <li key={i}>
                      <strong>{e.text}</strong>
                      <small>
                        {e.actor} · {e.time}
                      </small>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ) : (
            <section className="am-card" data-maintenance-guide="queue">
              <h2>
                {view === "readiness"
                  ? "Changes feeding downstream reports"
                  : "Maintenance requests"}
              </h2>
              {(view === "readiness" ? scoped : rows).map((item) => (
                <button
                  key={item.id}
                  className="am-row"
                  data-maintenance-tour={item.id === "MC-GUIDE" ? "queue" : undefined}
                  onClick={() => open(item)}
                >
                  <span>
                    <strong>
                      {item.household} · {item.change}
                    </strong>
                    <small>
                      {item.id} · {item.owner} · {item.due}
                    </small>
                    <small>
                      {view === "readiness"
                        ? ready(item)
                          ? "Ready for reporting · review recorded"
                          : "Reporting hold · change not complete"
                        : item.blocker || "Evidence complete"}
                    </small>
                  </span>
                  <Status value={item.status} />
                </button>
              ))}
              {view === "queue" && !rows.length && (
                <div className="am-detail">
                  <p>No requests match these filters.</p>
                </div>
              )}
              {view === "readiness" && (
                <p className="am-note">
                  Completed changes supply account scope and evidence to report
                  generation. Select a completed request and continue to its
                  report.
                </p>
              )}
            </section>
          )}
        </>
      )}
      <button className="am-back" onClick={() => onNavigate("morning")}>
        ← Lifecycle command center
      </button>
    </div>
  );
}
