import { useState } from 'react';
import { competitorBrandAssets } from './competitorBrandAssets.js';

export default function CompetitorBrandLabel({ name, selected, position, onSelect }) {
  const [failed, setFailed] = useState(false);
  const brand = competitorBrandAssets[name];
  return <button className={`mc-competitor-name mc-brand-label ${brand.treatment || ''}`} aria-label={`Inspect ${name} evidence`} title={name} aria-pressed={selected} style={{...position, '--brand-width': `${brand.width}px`}} onClick={onSelect}>
    {failed ? <span className="mc-brand-fallback">{name}</span> : <span className="mc-brand-art"><img src={`/competitor-brands/${brand.file}`} alt="" onError={() => setFailed(true)} draggable="false" /></span>}
  </button>;
}
