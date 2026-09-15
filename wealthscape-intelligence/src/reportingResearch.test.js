import test from "node:test";
import assert from "node:assert/strict";
import {
  reportingOutcomeDetail,
  reportingScore,
  reportingStepDetails,
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
test("job-map review, execution, and revision use distinct report tabs", () => {
  assert.equal(reportingStepDetails[3].sub.reportTab, "customize");
  assert.equal(reportingStepDetails[4].sub.reportTab, "generate");
  assert.equal(reportingStepDetails[6].sub.reportTab, "build");
  assert.equal(reportingStepDetails[7].layer, "portal");
});
