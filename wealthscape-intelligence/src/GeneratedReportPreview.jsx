import { useEffect, useRef, useState } from "react";
import { X, FileText, ShieldCheck, AlertTriangle } from "lucide-react";
import "./GeneratedReportPreview.css";

const allocation = [
  ["US equity", 42, 36],
  ["International equity", 18, 20],
  ["Fixed income", 28, 30],
  ["Alternatives", 8, 9],
  ["Cash", 4, 5],
];
const performance = [
  ["Jan", 2.1, 1.8],
  ["Feb", 3.4, 2.9],
  ["Mar", 2.8, 2.5],
  ["Apr", 5.2, 4.1],
  ["May", 6.7, 5.3],
  ["Jun 9", 8.4, 6.2],
];

export default function GeneratedReportPreview({ profile, onClose }) {
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
          <h2 id="report-preview-title">Quarterly review</h2>
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
              <span className="grp-kicker">Q2 2025 · As of June 9</span>
              <h3>Sarah &amp; Michael Chen</h3>
              <p>
                Household CH-1042 · Joint brokerage &amp; retirement accounts
              </p>
            </div>
            <div className="grp-value">
              <span>Total portfolio</span>
              <strong>$4,284,500</strong>
              <span>+8.4% year to date</span>
            </div>
          </header>
          <div className="grp-report-body">
            <section className="grp-section">
              <h4>01 · Household summary</h4>
              <dl className="grp-summary">
                <div>
                  <dt>Accounts</dt>
                  <dd>3 accounts</dd>
                </div>
                <div>
                  <dt>Holdings</dt>
                  <dd>47 positions</dd>
                </div>
                <div>
                  <dt>Objective</dt>
                  <dd>Long-term growth</dd>
                </div>
                <div>
                  <dt>Risk profile</dt>
                  <dd>Moderate</dd>
                </div>
              </dl>
              {pipeline && (
                <p className="grp-source">
                  Data sync · Custodian positions, pricing and 312 transactions
                  reconciled at 09:05 ET. Account scope confirmed for this
                  household.
                </p>
              )}
            </section>
            <section className="grp-section">
              <h4>02 · Performance context</h4>
              <div className="grp-performance-summary">
                <strong>
                  8.4% <small>portfolio YTD</small>
                </strong>
                <strong>
                  6.2% <small>60/40 benchmark YTD</small>
                </strong>
                {pipeline && (
                  <strong>
                    +2.2 pts <small>relative return</small>
                  </strong>
                )}
              </div>
              <div
                className="grp-chart"
                role="img"
                aria-label="Cumulative year-to-date returns: portfolio 2.1, 3.4, 2.8, 5.2, 6.7, 8.4 percent; benchmark 1.8, 2.9, 2.5, 4.1, 5.3, 6.2 percent, January through June 9."
              >
                {performance.map(
                  ([month, portfolioReturn, benchmarkReturn]) => (
                    <div className="grp-chart-column" key={month}>
                      <div className="grp-chart-bars">
                        <span style={{ height: `${portfolioReturn * 10}%` }} />
                        <span style={{ height: `${benchmarkReturn * 10}%` }} />
                      </div>
                      <small>{month}</small>
                    </div>
                  ),
                )}
              </div>
              <p className="grp-chart-key">
                <span /> Portfolio <span /> 60/40 benchmark · cumulative YTD
              </p>
              {pipeline && (
                <p>
                  US equity and healthcare exposure supported the relative gain.
                  Fixed income helped cushion the March decline. The benchmark
                  is a comparison measure, not an investable portfolio;
                  allocations and fees differ.
                </p>
              )}
            </section>
            <section className="grp-section">
              <h4>03 · Asset allocation</h4>
              <table>
                <caption>Allocation as of June 9, 2025</caption>
                <thead>
                  <tr>
                    <th>Asset class</th>
                    <th>Actual</th>
                    {pipeline && (
                      <>
                        <th>Target</th>
                        <th>Drift</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {allocation.map(([label, actual, target]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{actual}%</td>
                      {pipeline && (
                        <>
                          <td>{target}%</td>
                          <td
                            className={
                              actual - target >= 5 ? "grp-drift" : undefined
                            }
                          >
                            {actual - target > 0 ? "+" : ""}
                            {actual - target} pts
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {pipeline && (
                <p className="grp-note">
                  <AlertTriangle size={16} /> US equity is 6 points above
                  target. Review tax lots and suitability before recommending a
                  rebalance.
                </p>
              )}
            </section>
            {pipeline ? (
              <>
                <section className="grp-section">
                  <h4>04 · Portfolio commentary</h4>
                  <span className="grp-tag">AI-assisted · Review required</span>
                  <p>
                    Your portfolio gained 8.4% year to date, compared with 6.2%
                    for the blended benchmark. Equity exposure contributed to
                    the gain, while bonds helped reduce volatility. These
                    returns describe the period through June 9, rather than a
                    completed quarter.
                  </p>
                  <p>
                    US equity now represents 42% of the portfolio against a 36%
                    target. Before making changes, we will review your cash
                    needs, taxable gains and risk preferences. One international
                    ETF valuation requires a price refresh; its impact must be
                    confirmed before this report is released.
                  </p>
                  <p className="grp-source">
                    Narrative inputs · Reconciled household snapshot CH-1042,
                    allocation targets and validation exception VAL-018. Return
                    figures use the same source snapshot as section 02.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>05 · Validation &amp; exceptions</h4>
                  <div className="grp-note">
                    <AlertTriangle size={17} />
                    <div>
                      <strong>VAL-018 · Price refresh required</strong>
                      <p>
                        International ETF price is four hours old. Its last
                        available price is included in the 18% international
                        equity allocation. No missing accounts or transaction
                        breaks were detected.
                      </p>
                      <p>
                        <b>Owner:</b> Data operations · Refresh the price, rerun
                        valuation and confirm whether performance or narrative
                        changes.
                      </p>
                    </div>
                  </div>
                  <p className="grp-source">
                    Validation run 09:06 ET · 0 errors · 1 open warning ·
                    Release review pending.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>06 · Review &amp; disclosure trail</h4>
                  <table>
                    <caption>
                      Review copy v2 · Evidence record RPT-CH1042-0609
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
                        <td>8 sections · 1 performance chart · 2 tables</td>
                      </tr>
                      <tr>
                        <th scope="row">Automated checks</th>
                        <td>
                          12 checks passed; stale-price disclosure appended
                        </td>
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
                        <td>Pending · Price exception must be resolved</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="grp-disclosure">
                    <ShieldCheck size={16} /> Past performance does not
                    guarantee future results. Values can change and may reflect
                    delayed pricing. Benchmark results exclude the household’s
                    fees and taxes. Review copy: not approved for client
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
                      <dd>RPT-CH1042-0609</dd>
                    </div>
                  </dl>
                  <p>
                    The client copy and notification remain unreleased until the
                    price refresh and required reviews are complete. Review
                    evidence stays with this report version.
                  </p>
                </section>
                <section className="grp-section">
                  <h4>08 · Follow-up actions</h4>
                  <ol className="grp-actions">
                    <li>
                      <b>Data operations:</b> resolve VAL-018 and regenerate the
                      report.
                    </li>
                    <li>
                      <b>{homeOffice ? "Supervision" : "Advisor"}:</b>{" "}
                      {homeOffice
                        ? "review the refreshed narrative, disclosures and release record."
                        : "confirm the allocation discussion and submit the refreshed narrative for review."}
                    </li>
                    <li>
                      <b>Advisor:</b> discuss concentration, tax implications
                      and cash needs at the next household review.
                    </li>
                  </ol>
                </section>
              </>
            ) : (
              <p className="grp-disclosure">
                Past performance does not guarantee future results. Portfolio
                values are subject to change. This standard copy contains the
                household snapshot, performance and allocation.
              </p>
            )}
          </div>
          <footer className="grp-paper-footer">
            <FileText size={14} /> CH-1042 · June 9, 2025 ·{" "}
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
            : "Household snapshot · Performance · Allocation"}
        </span>
        <button onClick={onClose}>Back to generation</button>
      </footer>
    </dialog>
  );
}
