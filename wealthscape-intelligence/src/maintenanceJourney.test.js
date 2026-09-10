import test from "node:test";
import assert from "node:assert/strict";
import {
  journeyMilestones,
  journeyPhases,
  journeyStakeholders,
  nextJourneySelection,
  journeyCellState,
} from "./maintenanceJourney.js";

test("six milestones connect to existing phase and stakeholder entries", () => {
  assert.equal(journeyMilestones.length, 6);
  assert.equal(new Set(journeyMilestones.map((item) => item.id)).size, 6);
  assert.deepEqual(journeyPhases, [
    "Establish scope",
    "Resolve and review",
    "Confirm completion",
  ]);
  for (const item of journeyMilestones) {
    assert.ok(item.phase >= 0 && item.phase < 3);
    assert.ok(item.stakeholders.length);
    assert.ok(
      item.moment &&
        item.experience &&
        item.handoff &&
        item.response &&
        item.boundary,
    );
    for (const role of journeyStakeholders) {
      assert.equal(role.steps.length, 3);
      for (let phase = 0; phase < 3; phase++) {
        assert.equal(
          journeyCellState(item.id, phase, role.id),
          phase === item.phase && item.stakeholders.includes(role.id)
            ? "selected"
            : "muted",
        );
      }
    }
  }
});

test("selection, click-again reset, and invalid input restore an equal view", () => {
  assert.equal(nextJourneySelection(null, "authority"), "authority");
  assert.equal(nextJourneySelection("authority", "service"), "service");
  assert.equal(nextJourneySelection("service", "service"), null);
  assert.equal(nextJourneySelection("authority", "missing"), null);
  for (const role of journeyStakeholders)
    for (let phase = 0; phase < 3; phase++) {
      assert.equal(journeyCellState(null, phase, role.id), "equal");
      assert.equal(journeyCellState("missing", phase, role.id), "equal");
    }
});

test("only the retained friction points use directional forum evidence", () => {
  assert.deepEqual(
    journeyMilestones
      .filter((item) => item.kind === "friction")
      .map((item) => item.id),
    ["authority", "service"],
  );
  for (const item of journeyMilestones) {
    assert.ok(["positive", "neutral", "friction"].includes(item.kind));
    assert.match(
      item.boundary,
      item.kind === "friction"
        ? /slides 6 and 10/
        : /Illustrative proposed experience/,
    );
    assert.match(item.boundary, /not.*measured/);
  }
});
