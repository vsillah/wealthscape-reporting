import test from "node:test";
import assert from "node:assert/strict";
import {
  reportingOutcomeDetail,
  reportingScore,
  reportingJourney,
  reportingPlot,
  reportingQuadrant,
  reportingComparison,
} from "./reportingResearch.js";

test("reporting recommendations reach report review instead of returning to Strategy", () => {
  const outcome = {
    id: "BD-HA #2",
    text: "Produce a client-ready explanation",
    layer: "strategy",
    imp: 9.1,
    sat: 2.7,
  };
  const strategy = {
    recommendations: [
      {
        outcomes: ["BD-HA #2"],
        body: "Include account context and disclosures.",
      },
    ],
  };
  const detail = reportingOutcomeDetail(outcome, strategy);
  assert.equal(detail.layer, "reports");
  assert.equal(detail.sub.reportTab, "customize");
  assert.equal(detail.response, strategy.recommendations[0].body);
  assert.match(detail.evidence, /synthesis scores/);
  assert.match(detail.limitation, /simulated/);
  assert.equal(reportingScore(outcome).toFixed(1), "15.5");
});
test("unmapped strategy outcomes get an honest dashboard fallback without fabricated measurements", () => {
  const detail = reportingOutcomeDetail(
    { id: "new-outcome", text: "New discovery outcome", layer: "strategy" },
    { recommendations: [] },
  );
  assert.equal(detail.layer, "morning");
  assert.match(detail.gap, /validated baseline/);
  assert.match(detail.evidence, /directional estimates/);
});
test("job-map scope, review, execution, and revision use the intended report tabs", () => {
  assert.equal(reportingJourney[3].sub.reportTab, "customize");
  assert.equal(reportingJourney[4].sub.reportTab, "generate");
  assert.equal(reportingJourney[6].sub.reportTab, "customize");
  assert.equal(reportingJourney[0].sub.reportTab, "build");
  assert.equal(reportingJourney[7].layer, "portal");
});

test("opportunity map keeps raw scores while separating dense labels", () => {
  const outcomes = Array.from({ length: 11 }, (_, index) => ({
    id: `outcome-${index}`,
    imp: 9.5 - index * 0.1,
    sat: 2 + index * 0.05,
  }));
  const original = structuredClone(outcomes);
  for (const zoom of [false, true]) {
    const { bounds, points } = reportingPlot(outcomes, zoom);
    assert.equal(points.length, outcomes.length);
    for (let index = 0; index < points.length; index++) {
      const point = points[index];
      assert.equal(point.id, outcomes[index].id);
      assert.ok(
        Math.abs(
          ((point.x - 70) / 480) * (bounds.xMax - bounds.xMin) +
            bounds.xMin -
            outcomes[index].sat,
        ) < 1e-10,
      );
      assert.ok(
        Math.abs(
          ((365 - point.y) / 300) * (bounds.yMax - bounds.yMin) +
            bounds.yMin -
            outcomes[index].imp,
        ) < 1e-10,
      );
      for (const other of points.slice(index + 1))
        assert.ok(
          Math.hypot(
            point.label.x - other.label.x,
            point.label.y - other.label.y,
          ) >= 28,
        );
    }
  }
  assert.deepEqual(outcomes, original);
});
test("quadrants use an explicit 5/10 boundary, independent of opportunity rank", () => {
  assert.equal(
    reportingQuadrant({ imp: 9, sat: 2 }),
    "Underserved opportunity",
  );
  assert.equal(reportingQuadrant({ imp: 5, sat: 5 }), "Table stakes");
  assert.equal(reportingQuadrant({ imp: 4, sat: 7 }), "Overserved");
  assert.equal(reportingQuadrant({ imp: 4, sat: 2 }), "Lower priority");
});
test("competitor map preserves unknown evidence and does not assign satisfaction scores", () => {
  assert.equal(reportingComparison.length, 2);
  const unknown = reportingComparison
    .flatMap((row) => row.cells)
    .filter((cell) => !cell.described);
  assert.equal(unknown.length, 2);
  for (const row of reportingComparison) {
    assert.equal(row.cells.length, 4);
    assert.equal("satisfaction" in row, false);
    for (const cell of row.cells)
      assert.ok(
        cell.reference >= 0 && cell.reference <= 2 && cell.note.length > 20,
      );
  }
});
test("all reporting phases carry a complete handoff and stay independent of maintenance routes", () => {
  assert.equal(reportingJourney.length, 8);
  for (const phase of reportingJourney) {
    for (const field of [
      "client",
      "operations",
      "friction",
      "handoff",
      "response",
      "proof",
    ])
      assert.ok(phase[field].length > 20, `${phase.step}: ${field}`);
    assert.ok(
      ["reports", "integrations", "insights", "portal"].includes(phase.layer),
    );
    assert.equal(phase.sub?.caseId, undefined);
    assert.equal(phase.sub?.maintenanceView, undefined);
  }
});
