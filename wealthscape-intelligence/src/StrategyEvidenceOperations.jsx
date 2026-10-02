import { useState } from "react";
import {
  strategyEvidenceTrackOptions,
  strategyEvidenceTracks,
} from "./strategyEvidenceOperations.js";
import "./StrategyEvidenceOperations.css";

const viewOptions = [
  ["claims", "Claim ledger"],
  ["challenge", "Challenge checks"],
  ["backlog", "Confidence lift"],
  ["pipelines", "Backend pipelines"],
  ["locks", "Approval locks"],
  ["movement", "Score path"],
];

function EvidenceStatus({ status }) {
  const variant = status.toLowerCase().replace(/\s+/g, "-");
  return <span className={`evidence-ops-status evidence-ops-status-${variant}`}>{status}</span>;
}

export default function StrategyEvidenceOperations({ defaultTrack = "maintenance" }) {
  const [activeTrackId, setActiveTrackId] = useState(defaultTrack);
  const [activeView, setActiveView] = useState("claims");
  const track = strategyEvidenceTracks[activeTrackId] || strategyEvidenceTracks.maintenance;

  return (
    <section className="evidence-ops" aria-labelledby="evidence-ops-heading">
      <div className="evidence-ops-header">
        <div>
          <span className="am-eyebrow">Evidence operations</span>
          <h3 id="evidence-ops-heading">Operationalize source confidence across strategy tracks.</h3>
          <p>{track.summary}</p>
        </div>
        <div className="evidence-ops-track" role="tablist" aria-label="Strategy evidence tracks">
          {strategyEvidenceTrackOptions.map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeTrackId === id}
              onClick={() => setActiveTrackId(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="evidence-ops-metrics" aria-label={`${track.label} evidence operations metrics`}>
        {track.metrics.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="evidence-ops-tabs" role="tablist" aria-label={`${track.label} operations views`}>
        {viewOptions.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeView === id}
            onClick={() => setActiveView(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeView === "claims" && (
        <div className="evidence-ops-claims" aria-label={`${track.label} claim ledger`}>
          {track.claims.map((claim) => (
            <article key={claim.id} className="evidence-ops-claim">
              <div className="evidence-ops-claim-top">
                <span>{claim.id}</span>
                <strong>{claim.score}</strong>
              </div>
              <div className="evidence-ops-claim-meta">
                <span>{claim.section}</span>
                <span>{claim.type}</span>
                <span>{claim.sourceClass}</span>
              </div>
              <p>{claim.claim}</p>
              <small>{claim.challenge}</small>
            </article>
          ))}
        </div>
      )}

      {activeView === "challenge" && (
        <div className="evidence-ops-table" aria-label={`${track.label} challenge checks`}>
          {track.challengeResults.map(([status, title, text]) => (
            <article key={title} className="evidence-ops-row">
              <EvidenceStatus status={status} />
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {activeView === "backlog" && (
        <div className="evidence-ops-table" aria-label={`${track.label} confidence lift backlog`}>
          {track.backlog.map(([status, text, lift]) => (
            <article key={text} className="evidence-ops-row evidence-ops-row-lift">
              <EvidenceStatus status={status} />
              <p>{text}</p>
              <strong>{lift}</strong>
            </article>
          ))}
        </div>
      )}

      {activeView === "pipelines" && (
        <div className="evidence-ops-pipelines" aria-label={`${track.label} backend confidence pipelines`}>
          {track.pipelines.map((pipeline) => (
            <article key={pipeline.id} className="evidence-ops-pipeline">
              <div className="evidence-ops-pipeline-head">
                <span>{pipeline.id}</span>
                <EvidenceStatus status={pipeline.status} />
              </div>
              <h4>{pipeline.title}</h4>
              <p>{pipeline.purpose}</p>
              <dl>
                <div>
                  <dt>Ingest</dt>
                  <dd>{pipeline.ingest}</dd>
                </div>
                <div>
                  <dt>Produce</dt>
                  <dd>{pipeline.produce}</dd>
                </div>
                <div>
                  <dt>Gate</dt>
                  <dd>{pipeline.gate}</dd>
                </div>
              </dl>
              <strong>{pipeline.lift}</strong>
            </article>
          ))}
        </div>
      )}

      {activeView === "locks" && (
        <div className="evidence-ops-locks" aria-label={`${track.label} approval locks`}>
          {track.locks.map(([title, text]) => (
            <article key={title}>
              <span>Locked</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      )}

      {activeView === "movement" && (
        <div className="evidence-ops-score-path" aria-label={`${track.label} confidence score path`}>
          {track.scorePath.map(([label, score, text]) => (
            <article key={label}>
              <strong>{score}</strong>
              <div>
                <h4>{label}</h4>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
