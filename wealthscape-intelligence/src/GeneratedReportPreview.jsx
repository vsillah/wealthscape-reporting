import { useEffect, useRef, useState } from "react";
import { X, FileText, ShieldCheck, AlertTriangle } from "lucide-react";
import { getGeneratedReport } from "./generatedReports.js";
import "./GeneratedReportPreview.css";

export default function GeneratedReportPreview({
  profile,
  template = "quarterly",
  returnLabel = "Back to generation",
  onClose,
}) {
  const report = getGeneratedReport(template);
  const dialogRef = useRef(null);
  const [version, setVersion] = useState("pipeline");
  const pipeline = version === "pipeline";
  const homeOffice = profile?.id === "bd-home-office";
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (opener?.isConnected) opener.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className="grp-dialog"
      aria-labelledby="report-preview-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <header className="grp-toolbar">
        <div>
          <span className="grp-kicker">Report preview · Synthetic data</span>
          <h2 id="report-preview-title">{report.title}</h2>
        </div>
        <button
          className="grp-close"
          aria-label="Close report preview"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </header>
      <div className="grp-comparison">
        <div className="grp-switch" role="group" aria-label="Report version">
          <button
            aria-pressed={!pipeline}
            onClick={() => setVersion("current")}
          >
            Current report
          </button>
          <button
            aria-pressed={pipeline}
            onClick={() => setVersion("pipeline")}
          >
            Pipeline-ready report
          </button>
        </div>
        <span>
          {profile?.shell?.role || "Report review"} ·{" "}
          {pipeline ? "Review copy v2" : "Standard copy v1"}
        </span>
      </div>
      <div className="grp-scroll" key={version}>
        <article
          className="grp-paper"
          aria-label={
            pipeline
              ? "Pipeline-ready report contents"
              : "Current report contents"
          }
        >
          <header className="grp-report-head">
            <div>
              <span className="grp-kicker">{report.period}</span>
              <h3>{report.household}</h3>
              <p>
                Household {report.householdId} · {report.accountDescription}
              </p>
            </div>
            <div className="grp-value">
              <span>{report.snapshotLabel}</span>
              <strong>{report.value}</strong>
              <span>{report.change}</span>
            </div>
          </header>
          <div className="grp-report-body">
            <section className="grp-section">
              <h4>
                01 ·{" "}
                {report.id === "proposal"
                  ? "Proposed account summary"
                  : "Household summary"}
              </h4>
              <dl className="grp-summary">
                {[
                  ["Accounts", report.accounts],
                  ["Holdings", report.holdings],
                  ["Objective", report.objective],
                  ["Risk profile", report.risk],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              {pipeline && (
                <p className="grp-source">Data sync · {report.sync}</p>
              )}
            </section>
            <section className="grp-section">
              <h4>02 · {report.performanceTitle}</h4>
              {report.performance ? (
                <>
                  <div className="grp-performance-summary">
                    <strong>
                      {report.portfolioReturn}%
                      <small>portfolio {report.returnBasis}</small>
                    </strong>
                    <strong>
                      {report.benchmarkReturn}%
                      <small>60/40 benchmark {report.returnBasis}</small>
                    </strong>
                    {pipeline && (
                      <strong>
                        +
                        {(
                          report.portfolioReturn - report.benchmarkReturn
                        ).toFixed(1)}{" "}
                        pts<small>relative return</small>
                      </strong>
                    )}
                  </div>
                  <div
                    className="grp-chart"
                    role="img"
                    aria-label={`${report.returnBasis} returns: ${report.performance.map(([date, value, benchmark]) => `${date}: portfolio ${value}%, benchmark ${benchmark}%`).join("; ")}`}
                  >
                    {report.performance.map(([date, value, benchmark]) => (
                      <div className="grp-chart-column" key={date}>
                        <div className="grp-chart-bars">
                          <span
                            style={{
                              height: `${(value / report.chartMax) * 100}%`,
                            }}
                          />
                          <span
                            style={{
                              height: `${(benchmark / report.chartMax) * 100}%`,
                            }}
                          />
                        </div>
                        <small>{date}</small>
                      </div>
                    ))}
                  </div>
                  <p className="grp-chart-key">
                    <span /> Portfolio <span /> 60/40 benchmark · cumulative{" "}
                    {report.returnBasis}
                  </p>
                </>
              ) : (
                <dl className="grp-summary">
                  {report.proposalMetrics.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {(pipeline || !report.performance) && (
                <p>{report.performanceContext}</p>
              )}
            </section>
            <section className="grp-section">
              <h4>
                03 ·{" "}
                {report.id === "proposal"
                  ? "Proposed allocation"
                  : "Asset allocation"}
              </h4>
              <table>
                <caption>Allocation as of {report.asOf}</caption>
                <thead>
                  <tr>
                    <th>Asset class</th>
                    <th>
                      {pipeline
                        ? report.allocationActualLabel
                        : report.currentAllocationIndex === 2
                          ? report.allocationTargetLabel
                          : report.allocationActualLabel}
                    </th>
                    {pipeline && (
                      <>
                        <th>{report.allocationTargetLabel}</th>
                        {report.id !== "proposal" && <th>Drift</th>}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {report.allocation.map(([label, actual, target]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>
                        {pipeline
                          ? actual
                          : [label, actual, target][
                              report.currentAllocationIndex
                            ]}
                        %
                      </td>
                      {pipeline && (
                        <>
                          <td>{target}%</td>
                          {report.id !== "proposal" && (
                            <td
                              className={
                                actual - target >= 5 ? "grp-drift" : undefined
                              }
                            >
                              {actual - target > 0 ? "+" : ""}
                              {actual - target} pts
                            </td>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {pipeline && (
                <p className="grp-note">
                  <AlertTriangle size={16} />
                  {report.allocationNote}
                </p>
              )}
            </section>
            {pipeline ? (
              <>
                <section className="grp-section">
                  <h4>04 · {report.narrativeTitle}</h4>
                  <span className="grp-tag">AI-assisted · Review required</span>
                  {report.narrative.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                  {report.planning && (
                    <ul className="grp-actions">
                      {report.planning.map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  )}
                  <p className="grp-source">
                    Narrative inputs · {report.recordId}, household objectives
                    and exception {report.exception.id}. Figures refer to the
                    same report snapshot.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>05 · Validation &amp; exceptions</h4>
                  <div className="grp-note">
                    <AlertTriangle size={17} />
                    <div>
                      <strong>
                        {report.exception.id} · {report.exception.title}
                      </strong>
                      <p>{report.exception.body}</p>
                      <p>
                        <b>Owner:</b> {report.exception.owner} ·{" "}
                        {report.exception.action}
                      </p>
                    </div>
                  </div>
                  <p className="grp-source">
                    0 errors · 1 open warning · Release review pending.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>06 · Review &amp; disclosure trail</h4>
                  <table>
                    <caption>
                      Review copy v2 · Evidence record {report.recordId}
                    </caption>
                    <thead>
                      <tr>
                        <th>Check</th>
                        <th>Evidence / status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Assembly</th>
                        <td>
                          8 sections ·{" "}
                          {report.performance
                            ? "1 performance chart"
                            : "Funding and fee summary"}{" "}
                          · 2 tables
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Automated checks</th>
                        <td>12 checks passed; exception disclosure appended</td>
                      </tr>
                      <tr>
                        <th scope="row">Narrative review</th>
                        <td>
                          Pending ·{" "}
                          {homeOffice
                            ? "Supervisory reviewer"
                            : "Advisor, then supervisory reviewer"}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Release approval</th>
                        <td>Pending · {report.exception.title}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="grp-disclosure">
                    <ShieldCheck size={16} />
                    {report.disclosure} Review copy: not approved for client
                    distribution.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>07 · Delivery readiness</h4>
                  <dl className="grp-summary">
                    <div>
                      <dt>Client portal</dt>
                      <dd>Package prepared</dd>
                    </div>
                    <div>
                      <dt>Email notice</dt>
                      <dd>2 recipients · Not sent</dd>
                    </div>
                    <div>
                      <dt>Release status</dt>
                      <dd>On hold for review</dd>
                    </div>
                    <div>
                      <dt>Audit record</dt>
                      <dd>{report.recordId}</dd>
                    </div>
                  </dl>
                  <p>
                    The client copy and notification remain unreleased until the
                    exception and required reviews are complete. Review evidence
                    stays with this report version.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>08 · Follow-up actions</h4>
                  <ol className="grp-actions">
                    <li>
                      <b>{report.exception.owner}:</b> {report.exception.action}
                    </li>
                    <li>
                      <b>{homeOffice ? "Supervision" : "Advisor"}:</b>{" "}
                      {homeOffice
                        ? "review the updated narrative, disclosures and release record."
                        : "confirm the household discussion and submit the updated narrative for review."}
                    </li>
                    <li>
                      <b>Advisor:</b> {report.followup}
                    </li>
                  </ol>
                </section>
              </>
            ) : (
              <p className="grp-disclosure">{report.disclosure}</p>
            )}
          </div>
          <footer className="grp-paper-footer">
            <FileText size={14} />
            {report.householdId} · {report.asOf} ·{" "}
            {pipeline
              ? "Review copy v2 · 8 sections"
              : "Standard copy v1 · 3 sections"}
            <span>Synthetic report data</span>
          </footer>
        </article>
      </div>
      <footer className="grp-dialog-footer">
        <span>
          {pipeline
            ? "Release on hold · 1 validation warning"
            : "Standard report · 3 sections"}
        </span>
        <button onClick={onClose}>{returnLabel}</button>
      </footer>
    </dialog>
  );
}
