import test from "node:test";
import assert from "node:assert/strict";
import { maintenanceTourLayout, tourTargetRect } from "./maintenanceTourGeometry.js";
import { guideSteps, createGuideCase } from "./maintenanceGuide.js";

test("tour dialog and spotlight stay separated at desktop, tablet, and mobile widths", () => {
  for (const [width, height] of [[1208, 900], [805, 900], [390, 844], [1280, 720]]) {
    const { dialog, targetBand } = maintenanceTourLayout(width, height);
    assert.ok(dialog.left >= 12);
    assert.equal(dialog.left + dialog.width, width - 12);
    assert.equal(dialog.top + dialog.maxHeight, height - 12);
    const rect = { left: 24, top: targetBand.top, width: width - 48, height: 100, bottom: targetBand.top + 100 };
    const spotlight = tourTargetRect(rect, targetBand, width);
    assert.ok(spotlight);
    assert.ok(spotlight.top + spotlight.height < dialog.top);
    assert.ok(spotlight.left + spotlight.width <= width - 4);
  }
});

test("missing, unmounted, and out-of-band targets never produce a stale spotlight", () => {
  const { targetBand } = maintenanceTourLayout(390, 844);
  assert.equal(tourTargetRect(null, targetBand, 390), null);
  assert.equal(tourTargetRect({ width: 0, height: 0 }, targetBand, 390), null);
  assert.equal(tourTargetRect({ left: 24, top: 0, bottom: 100, width: 200, height: 100 }, targetBand, 390), null);
  assert.equal(tourTargetRect({ left: 24, top: 200, bottom: 800, width: 200, height: 600 }, targetBand, 390), null);
});

test("all seven tour stops have distinct contextual targets and qualified explanation contracts", () => {
  const steps = guideSteps("tour");
  assert.deepEqual(steps.map(step => step.target), ["dashboard", "queue", "case", "evidence", "review", "timeline", "prerequisites"]);
  for (const step of steps) {
    assert.ok(step.desiredOutcome && step.targetLabel && step.gap && step.ux && step.source && step.proposal && step.outcomes.length);
    assert.equal(step.gate, undefined);
    assert.doesNotMatch(step.gap, /approved study/i);
  }
  const fixture = createGuideCase("ria");
  assert.equal(fixture.status, "Blocked");
  assert.deepEqual(fixture.checks, [false, false, false]);
});
