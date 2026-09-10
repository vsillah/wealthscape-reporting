import test from 'node:test';
import assert from 'node:assert/strict';
import { maintenanceCompetitors, competitorSurvey, competitorX, competitorY } from './maintenanceCompetitors.js';

test('all seven platform identities and Frames coordinates remain unchanged', () => {
  assert.deepEqual(maintenanceCompetitors.map(c => [c.name,c.satisfaction,c.capability]), [
    ['Schwab',7.95,5],['Altruist',8.31,4.5],['TradePMR',7.86,3],
    ['Wealthscape',7.73,2],['SEI',7.49,2],['Pershing',6.73,1],['Goldman',6.13,1],
  ]);
  for(const c of maintenanceCompetitors) {
    assert.ok(competitorX(c.satisfaction)>=52 && competitorX(c.satisfaction)<=492);
    assert.ok(competitorY(c.capability)>=25 && competitorY(c.capability)<=280);
    assert.ok(c.label[0]>52 && c.label[0]<492 && c.label[1]>=25 && c.label[1]<280);
  }
});

test('each platform separates evidence from hypotheses and retains attributable sources', () => {
  const domains=['advisorservices.schwab.com','altruist.com','www.tradepmr.com','www2.advisorchannel.com','www.seic.com','www.bny.com','www.goldmansachs.com'];
  maintenanceCompetitors.forEach((c,i) => {
    for(const key of ['basis','strength','limit','appeal','friction','question']) assert.ok(c[key]?.length>20,`${c.name}: ${key}`);
    assert.equal(new URL(c.source.url).hostname,domains[i]);
    assert.equal(new URL(c.source.url).protocol,'https:');
    assert.equal(c.source.type,'Vendor-published');
    assert.ok(c.source.date);
    assert.ok(c.source.title);
  });
  assert.equal(competitorSurvey.type,'Advisor survey');
  assert.equal(new URL(competitorSurvey.url).hostname,'t3technologyhub.com');
  assert.match(maintenanceCompetitors[3].basis,/needs revalidation/);
  assert.match(maintenanceCompetitors[1].feedback,/vendor-reported feedback, not independent research/);
});
