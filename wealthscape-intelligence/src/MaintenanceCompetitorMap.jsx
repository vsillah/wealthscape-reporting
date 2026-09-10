import { useState } from "react";
import { maintenanceCompetitors, competitorSurvey, competitorX, competitorY } from "./maintenanceCompetitors.js";

export default function MaintenanceCompetitorMap() {
  const [selected, setSelected] = useState(3);
  const rival = maintenanceCompetitors[selected];
  return <>
    <p className="am-note">Account Maintenance Frames snapshot. X: T3 2026 advisor satisfaction. Y: assessed public maintenance capability. Scores are unchanged; documentation coverage is uneven and does not measure actual feature completeness.</p>
    <div className="lx-research-grid mc-competitive-grid">
      <div>
        <div className="mc-competitor-plot">
          <svg className="lx-chart" viewBox="0 0 520 340" role="group" aria-label="Competitor satisfaction and assessed maintenance capability">
            <desc>Seven named platforms. Select a dot or its name to inspect evidence. Satisfaction is a survey snapshot; capability is an unvalidated documentation assessment.</desc>
            <rect x="270" y="25" width="222" height="140" fill="#e8f5ee" />
            {[1,2,3,4,5].map(n => <g key={n}><line x1="52" x2="492" y1={competitorY(n)} y2={competitorY(n)} stroke="#e2e8f0"/><text x="33" y={competitorY(n)+5}>{n}</text></g>)}
            {[6,7,8].map(n => <text key={n} x={competitorX(n)} y="302">{n}</text>)}
            {maintenanceCompetitors.map((c,i) => <g key={c.name}>
              <line x1={competitorX(c.satisfaction)} y1={competitorY(c.capability)} x2={c.label[0]} y2={c.label[1]} stroke="#8c99a1" strokeWidth="1" />
              <g role="button" tabIndex={0} aria-label={`Select platform ${c.name}`} aria-pressed={selected===i} onClick={()=>setSelected(i)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelected(i);}}} className="mc-competitor-point">
                <circle cx={competitorX(c.satisfaction)} cy={competitorY(c.capability)} r={selected===i?14:9} fill={i===3?'#0b5d2e':'#5b4fbe'} stroke={selected===i?'#243542':'white'} strokeWidth={selected===i?2:1}/>
                <text x={competitorX(c.satisfaction)} y={competitorY(c.capability)+4} textAnchor="middle" fill="white" fontSize="10">{i+1}</text>
              </g>
            </g>)}
            <text x="265" y="330" textAnchor="middle">Advisor satisfaction →</text>
            <text x="15" y="170" transform="rotate(-90 15 170)" textAnchor="middle">Assessed capability →</text>
          </svg>
          {maintenanceCompetitors.map((c,i)=><button key={c.name} className="mc-competitor-name" aria-label={`Inspect ${c.name} evidence`} aria-pressed={selected===i} style={{left:`${c.label[0]/520*100}%`,top:`${c.label[1]/340*100}%`}} onClick={()=>setSelected(i)}>{c.name}</button>)}
        </div>
        <p className="am-note">Select a name, dot, or dropdown option. All seven platforms stay visible.</p>
      </div>
      <div className="mc-competitor-inspector">
        <label className="am-field">Explore a platform<select value={selected} onChange={event=>setSelected(Number(event.target.value))}>{maintenanceCompetitors.map((c,i)=><option key={c.name} value={i}>{i+1}. {c.name}</option>)}</select></label>
        <article className="mc-competitor-detail" aria-label={`${rival.name} evidence`}>
          <h3>{rival.name}</h3>
          <dl className="mo-values"><div><dt>Measured satisfaction snapshot</dt><dd>{rival.satisfaction.toFixed(2)} / 10</dd></div><div><dt>Assessed capability snapshot</dt><dd>{rival.capability} / 5</dd></div></dl>
          <p className="am-note">T3's broad custodial rating does not identify maintenance-specific likes, dislikes, or causes. No independent customer verbatims are included in this comparison.</p>
          <h4>Why this capability position appears</h4><p>{rival.basis}</p>
          <h4>Documented strengths · vendor claims</h4><p>{rival.strength}</p>
          {rival.feedback && <><h4>Vendor-reported feedback</h4><p>{rival.feedback}</p></>}
          <h4>Documented limits / evidence gaps</h4><p>{rival.limit}</p>
          <div className="mc-competitor-assumption"><h4>Assumption · possible user appeal and friction</h4><p><strong>Potential appeal:</strong> {rival.appeal}</p><p><strong>Potential friction:</strong> {rival.friction}</p><p className="am-note">Hypotheses for user research. These do not explain or recalculate the plotted satisfaction score.</p></div>
          <h4>Question to validate</h4><p>{rival.question}</p>
          <ul className="mc-competitor-sources">{[rival.source,competitorSurvey].map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><span>{source.type} · {source.date}</span></li>)}</ul>
        </article>
      </div>
    </div>
    <p className="am-note">Source assessment: Account Maintenance Frames D2; revised executive study, 18 Aug 2026, slides 15, 17 and 27. Public context checked 10 Sep 2026; no score refresh or primary interviews. Axos remains a qualitative reference, not an added chart point.</p>
  </>;
}
