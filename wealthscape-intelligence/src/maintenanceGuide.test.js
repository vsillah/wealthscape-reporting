import test from "node:test";
import assert from "node:assert/strict";
import {
  createGuideCase,
  guideSteps,
  guideGate,
  GUIDE_CASE_ID,
  canVisitGuideStep,
} from "./maintenanceGuide.js";

test("fresh guide fixtures are profile-scoped and isolated across restarts", () => {
  for (const profile of [
    "ria",
    "bd-home-office",
    "bd-osj-principal",
    "bd-hybrid-advisor",
  ]) {
    const first = createGuideCase(profile),
      restarted = createGuideCase(profile);
    first.checks[0] = true;
    first.events.push({ text: "local edit" });
    assert.equal(restarted.createdFor, profile);
    assert.deepEqual(restarted.checks, [false, false, false]);
    assert.equal(restarted.events.length, 1);
    assert.equal(restarted.status, "Blocked");
  }
});

test("scenario cannot advance through checks, human review, or output without real state", () => {
  const steps = guideSteps("scenario"),
    item = createGuideCase("ria");
  const checks = steps.find((s) => s.gate === "checks"),
    review = steps.find((s) => s.gate === "review"),
    report = steps.find((s) => s.gate === "report");
  assert.equal(guideGate(checks, item, []), false);
  item.checks = [true, true, false];
  assert.equal(guideGate(checks, item, []), false);
  item.checks = [true, true, true];
  item.status = "Ready for review";
  assert.equal(guideGate(checks, item, []), true);
  assert.equal(guideGate(review, item, []), false);
  item.status = "Complete";
  assert.equal(guideGate(review, item, []), true);
  assert.equal(guideGate(report, item, []), false);
  assert.equal(
    guideGate(report, item, [{ selectionKey: "MC-101", cases: [item] }]),
    false,
  );
  assert.equal(
    guideGate(report, item, [
      { selectionKey: GUIDE_CASE_ID, cases: [{ ...item }] },
    ]),
    true,
  );
  item.checks[0] = false;
  assert.equal(
    guideGate(report, item, [
      { selectionKey: GUIDE_CASE_ID, cases: [{ ...item }] },
    ]),
    false,
  );
});

test("tour describes blocked state and does not borrow scenario completion claims", () => {
  const tour = guideSteps("tour");
  assert.equal(tour.length, 7);
  assert.ok(tour.every((s) => !s.gate && s.outcomes && s.source && s.proposal));
  assert.match(tour[4].ux, /leaves the fixture blocked/);
  assert.equal(tour.at(-1).target, "prerequisites");
  assert.ok(tour.every((s) => !s.sub.caseId || s.sub.caseId === GUIDE_CASE_ID));
});

test("operational links and Next share gates, including after going backward", () => {
  const item = createGuideCase("ria");
  assert.equal(canVisitGuideStep("scenario", 0, 3, item, []), true);
  assert.equal(canVisitGuideStep("scenario", 3, 5, item, []), false);
  assert.equal(canVisitGuideStep("scenario", 2, 6, item, []), false);
  assert.equal(canVisitGuideStep("scenario", 3, 2, item, []), true);
  item.checks = [true, true, true];
  assert.equal(canVisitGuideStep("scenario", 3, 4, item, []), true);
  assert.equal(canVisitGuideStep("scenario", 4, 6, item, []), false);
  item.status = "Complete";
  assert.equal(canVisitGuideStep("scenario", 4, 6, item, []), true);
  assert.equal(canVisitGuideStep("scenario", 6, 7, item, []), false);
  assert.equal(
    canVisitGuideStep("tour", 0, 6, createGuideCase("ria"), []),
    true,
  );
  assert.equal(canVisitGuideStep("scenario", 0, 99, item, []), false);
});
