import test from "node:test";
import assert from "node:assert/strict";
import { reportingOutcomes } from "./reportingOutcomes.js";
import {
  reportingPlot,
  reportingScore,
  reportingSources,
  reportingQuadrant,
} from "./reportingResearch.js";

test("reporting estimates retain provenance and distinct reporting destinations", () => {
  assert.equal(reportingOutcomes.length, 15);
  assert.equal(new Set(reportingOutcomes.map((o) => o.id)).size, 15);
  assert.equal(
    reportingOutcomes.filter((o) => o.basis === "derived").length,
    9,
  );
  assert.equal(
    reportingOutcomes.filter((o) => o.basis === "inferred").length,
    6,
  );
  for (const o of reportingOutcomes) {
    assert.ok(o.imp >= 0 && o.imp <= 10 && o.sat >= 0 && o.sat <= 10);
    assert.equal(o.scoreType, "Management estimate");
    assert.ok(o.origin.length > 40);
    assert.ok(o.sources.every((s) => reportingSources[s]?.href));
    assert.ok(["build", "customize", "generate"].includes(o.tab));
    assert.match(o.coverage, /Synthetic|synthetic/);
    assert.ok(reportingScore(o) >= 0 && reportingScore(o) <= 20);
  }
  assert.equal(reportingScore(reportingOutcomes[0]), 17);
  assert.equal(reportingScore(reportingOutcomes[11]), 10.2);
  assert.equal(reportingQuadrant(reportingOutcomes[11]), "Table stakes");
  assert.equal(
    reportingQuadrant(reportingOutcomes[0]),
    "Underserved opportunity",
  );
});

test("all 15 reporting labels remain selectable without overlap at either scale", () => {
  for (const zoom of [false, true]) {
    const { points } = reportingPlot(reportingOutcomes, zoom);
    assert.equal(points.length, 15);
    for (const [i, p] of points.entries()) {
      assert.ok(p.label.x >= 82 && p.label.x <= 538);
      assert.ok(p.label.y >= 77 && p.label.y <= 353);
      for (const q of points.slice(i + 1)) {
        assert.ok(
          Math.hypot(p.label.x - q.label.x, p.label.y - q.label.y) >= 28,
        );
      }
    }
  }
});
