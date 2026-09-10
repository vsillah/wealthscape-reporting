import test from "node:test";
import assert from "node:assert/strict";
import {
  outcomeSolutions,
  outcomeDestination,
  normalizeOutcomeSelection,
} from "./maintenanceOutcomeSolutions.js";
import {
  OUTCOME_MIDPOINT,
  outcomeQuadrants,
  outcomeQuadrant,
  outcomeChartX,
  outcomeChartY,
} from "./maintenanceQuadrants.js";

const scopes = {
  ria: ["MC-101", "MC-102", "MC-105"],
  "bd-home-office": ["MC-102", "MC-103", "MC-104", "MC-106"],
  "bd-osj-principal": ["MC-103", "MC-105", "MC-106"],
  "bd-hybrid-advisor": ["MC-101", "MC-104", "MC-105"],
};
const rows = (ids) =>
  ids.map((id) => ({
    id,
    household: "Synthetic household",
    status: id === "MC-106" ? "Complete" : "Blocked",
  }));

test("all fifteen stable IDs retain study scores and distinct descriptions/coverage", () => {
  assert.deepEqual(
    outcomeSolutions.map((o) => o.id),
    Array.from({ length: 15 }, (_, i) => i + 1),
  );
  assert.deepEqual(
    outcomeSolutions.map((o) => o.score),
    [
      8, 7.86, 7.46, 7.26, 6.48, 6.22, 5.54, 6.58, 6.2, 5.52, 6.84, 6.5, 5.58,
      5.64, 4.68,
    ],
  );
  for (const o of outcomeSolutions)
    for (const key of ["problem", "ux", "demo", "action"])
      assert.ok(o[key].length > 10, `${o.id} needs ${key}`);
  assert.equal(new Set(outcomeSolutions.map((o) => o.problem)).size, 15);
  for (const id of [6, 7, 10, 12, 13, 15])
    assert.equal(outcomeSolutions[id - 1].adjacent, true);
  assert.match(outcomeSolutions[5].demo, /does not detect stale data/);
  assert.match(outcomeSolutions[6].demo, /Bulk migration.*remain proposed/);
  assert.match(outcomeSolutions[9].demo, /Legal POA.*not implemented/);
});

test("all 15 destinations preserve all four profile scopes and expose honest fallbacks", () => {
  for (const [profile, ids] of Object.entries(scopes))
    for (const outcome of outcomeSolutions) {
      const route = outcomeDestination(outcome.id, profile, rows(ids));
      assert.equal(route.sub.profileId, profile);
      assert.ok(["morning", "maintenance", "reports"].includes(route.layer));
      if (route.sub.caseId)
        assert.ok(
          ids.includes(route.sub.caseId),
          `${profile}: ${outcome.id} leaked ${route.sub.caseId}`,
        );
      if (route.fallback) {
        assert.ok(!route.sub.caseId);
        assert.match(route.context, /No matching/);
      }
    }
  assert.equal(
    outcomeDestination(
      6,
      "bd-hybrid-advisor",
      rows(scopes["bd-hybrid-advisor"]),
    ).fallback,
    true,
  );
  assert.equal(outcomeDestination(7, "ria", rows(scopes.ria)).fallback, true);
  assert.equal(
    outcomeDestination(15, "bd-osj-principal", rows(scopes["bd-osj-principal"]))
      .sub.maintenanceView,
    "intake",
  );
});

test("empty scopes never invent a case; All outcomes has no solution destination", () => {
  for (const outcome of outcomeSolutions) {
    const route = outcomeDestination(outcome.id, "ria", []);
    assert.ok(!route.sub.caseId);
    assert.equal(route.sub.profileId, "ria");
  }
  for (const value of [0, 16, undefined, null, -1])
    assert.equal(outcomeDestination(value, "ria", []), null);
  for (let i = 0; i < 15; i++) assert.equal(normalizeOutcomeSelection(i), i);
  for (const value of [-1, 15, NaN, undefined, 1.5])
    assert.equal(normalizeOutcomeSelection(value), -1);
});

test("quadrants reproduce Frames midpoint 3 and orientation, not its inconsistent prose", () => {
  assert.equal(OUTCOME_MIDPOINT, 3);
  assert.equal(outcomeChartX(3), 272);
  assert.equal(outcomeChartY(3), 202.5);
  assert.deepEqual(
    outcomeQuadrants.map((q) => q.label),
    ["Opportunity / underserved", "Table stakes", "Ignore", "Overserved"],
  );
  assert.equal(outcomeQuadrant(2, 4), "Opportunity / underserved");
  assert.equal(outcomeQuadrant(4, 4), "Table stakes");
  assert.equal(outcomeQuadrant(4, 2), "Overserved");
  assert.equal(outcomeQuadrant(2, 2), "Ignore");
  assert.equal(outcomeQuadrant(3, 4), "On the midpoint divider");
  assert.equal(outcomeQuadrant(3.5, 5), "Table stakes"); // Frames outcome 12
  assert.equal(outcomeQuadrant(3.12, 3.9), "Table stakes"); // Frames outcome 15
  assert.equal(outcomeQuadrant(1.86, 4.93), "Opportunity / underserved");
  assert.equal(
    outcomeQuadrants.reduce(
      (area, q) => area + (q.maxS - q.minS) * (q.maxI - q.minI),
      0,
    ),
    16,
  );
});

test("ranked view retains every published score and stable ID without mutating source order", async () => {
  const { rankedOutcomeSolutions, outcomeScoreScale, outcomeSolutions } =
    await import("./maintenanceOutcomeSolutions.js");
  const before = outcomeSolutions.map((item) => [item.id, item.score]);
  const ranked = rankedOutcomeSolutions();
  assert.equal(outcomeScoreScale, 10);
  assert.equal(ranked.length, 15);
  assert.deepEqual(
    ranked.map((item) => item.id).sort((a, b) => a - b),
    Array.from({ length: 15 }, (_, i) => i + 1),
  );
  assert.ok(
    ranked.every(
      (item, index) =>
        item.score >= 0 &&
        item.score <= outcomeScoreScale &&
        (!index || ranked[index - 1].score >= item.score),
    ),
  );
  assert.deepEqual(
    outcomeSolutions.map((item) => [item.id, item.score]),
    before,
  );
  for (const item of ranked)
    assert.equal(item.score, before.find(([id]) => id === item.id)[1]);
});
