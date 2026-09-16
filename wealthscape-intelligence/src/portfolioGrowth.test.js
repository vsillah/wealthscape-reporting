import test from "node:test";
import assert from "node:assert/strict";
import { portfolioHistory, portfolioRanges, formatPortfolioAxis } from "./portfolioGrowth.js";

test("portfolio windows use exact day boundaries and one coherent history", () => {
  for (const range of Object.values(portfolioRanges)) {
    assert.equal(range.data.at(-1).value, 4284500);
    assert.equal(range.data[0].time, range.start);
    if (range.days) assert.equal((range.end - range.start) / 86400000, range.days);
    for (const point of range.data) assert.ok(portfolioHistory.includes(point));
    assert.equal(range.gain, range.data.at(-1).value - range.data[0].value);
  }
  assert.deepEqual(Object.values(portfolioRanges).map(range => range.gain), [54500, 84500, 174500, 334100]);
  assert.equal(portfolioRanges.all.data[0].value, 3950400);
});

test("each financial axis encloses all observations with nonzero padding and distinct labels", () => {
  for (const range of Object.values(portfolioRanges)) {
    assert.ok(range.domain[0] > 0);
    assert.ok(range.data.every(point => point.value > range.domain[0] && point.value < range.domain[1]));
    assert.equal(range.ticks[0], range.domain[0]);
    assert.equal(range.ticks.at(-1), range.domain[1]);
    assert.equal(new Set(range.ticks.map(formatPortfolioAxis)).size, range.ticks.length);
    assert.ok(range.dateTicks.every(time => time >= range.start && time <= range.end));
  }
  assert.deepEqual(portfolioRanges.all.domain, [3800000, 4400000]);
  assert.equal(new Set(Object.values(portfolioRanges).map(range => range.domain.join())).size, 4);
});
