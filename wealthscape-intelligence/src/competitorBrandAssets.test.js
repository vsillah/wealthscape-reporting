import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { competitorBrandAssets } from './competitorBrandAssets.js';
import { maintenanceCompetitors } from './maintenanceCompetitors.js';

test('all seven official logo mappings are small local passive assets with provenance', () => {
  assert.deepEqual(Object.keys(competitorBrandAssets), maintenanceCompetitors.map(c=>c.name));
  for(const brand of Object.values(competitorBrandAssets)) {
    assert.match(brand.file,/^[a-z]+\.(png|svg)$/);
    const bytes=readFileSync(new URL(`../public/competitor-brands/${brand.file}`,import.meta.url));
    assert.ok(bytes.length>100 && bytes.length<50000);
    assert.equal(new URL(brand.source).protocol,'https:');
    if(brand.file.endsWith('.svg')) {
      const svg=bytes.toString();
      assert.match(svg,/viewBox=/);
      assert.doesNotMatch(svg,/<script|foreignObject|\son\w+=|href=["']https?:|url\(https?:/i);
    } else assert.equal(bytes.subarray(1,4).toString(),'PNG');
  }
});
