import test from "node:test";
import assert from "node:assert/strict";
import {
  reportingSources,
  reportingCompetitors,
  reportingComparison,
} from "./reportingResearch.js";
import {
  reportingMarketEvidence,
  reportingClientEvidence,
  reportingControls,
  reportingNarrativeEvidence,
  reportingMoves,
  reportingPriorityOutcomes,
} from "./reportingEvidence.js";
import { reportingRecommendationDetail } from "./reportingRecommendations.js";

test("every evidence and recommendation citation resolves to a public source", () => {
  for (const item of [
    ...reportingMarketEvidence,
    ...reportingClientEvidence,
    ...reportingControls,
    ...reportingNarrativeEvidence,
    ...reportingMoves,
  ]) {
    assert.ok(item.sources.length > 0, item.title);
    for (const key of item.sources) {
      const source = reportingSources[key];
      assert.ok(source, `${item.title}: ${key}`);
      assert.equal(new URL(source.href).protocol, "https:");
      assert.ok(source.note.length > 20, key);
    }
  }
});

test("four moves cover all five ordinal outcomes and retain their distinct pilot destinations", () => {
  assert.deepEqual(
    reportingPriorityOutcomes.map((item) => item.id),
    ["Unify", "Explain", "Unblock", "Route", "Prove"],
  );
  const addressed = new Set(reportingMoves.flatMap((item) => item.outcomes));
  for (const outcome of reportingPriorityOutcomes) {
    assert.ok(addressed.has(outcome.id));
    assert.ok(reportingMoves[outcome.move - 1].outcomes.includes(outcome.id));
    assert.equal(
      "imp" in outcome || "sat" in outcome || "score" in outcome,
      false,
    );
  }
  assert.equal(reportingMoves.length, 4);
  assert.deepEqual(
    reportingMoves.map(
      (item) =>
        reportingRecommendationDetail({ id: "bd-hybrid-advisor" }, item).layer,
    ),
    ["portal", "maintenance", "reports", "maintenance"],
  );
});

test("each of the nine vendors has a resolvable matrix reference and source", () => {
  assert.equal(new Set(reportingCompetitors.map((item) => item.name)).size, 9);
  assert.equal(reportingComparison.length, 9);
  for (const row of reportingComparison) {
    for (const cell of row.cells) {
      const reference = reportingCompetitors[cell.reference];
      assert.ok(reference && reportingSources[reference.source]);
      assert.ok(
        row.name.includes(reference.name) || reference.name.includes(row.name),
      );
    }
  }
});
