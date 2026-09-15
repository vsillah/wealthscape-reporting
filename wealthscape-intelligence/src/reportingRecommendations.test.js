import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  reportingRecommendationPlans,
  reportingRecommendationDetail,
} from "./reportingRecommendations.js";

test("all reporting recommendation plans distinguish inspectable demos and production gates", () => {
  assert.deepEqual(Object.keys(reportingRecommendationPlans).sort(), [
    "bd-home-office",
    "bd-hybrid-advisor",
    "bd-osj-principal",
    "ria",
  ]);
  let count = 0;
  for (const [id, plans] of Object.entries(reportingRecommendationPlans)) {
    for (let n = 1; n <= plans.length; n++) {
      const item = {
        n,
        title: `Recommendation ${n}`,
        outcomes: [`${id} outcome`],
      };
      const detail = reportingRecommendationDetail({ id }, item);
      assert.ok(
        [
          "reports",
          "maintenance",
          "portal",
          "integrations",
          "insights",
        ].includes(detail.layer),
      );
      for (const field of [
        "demonstrated",
        "limitation",
        "production",
        "dependency",
        "gate",
      ])
        assert.ok(detail[field].length > 30, `${id}/${n}: ${field}`);
      assert.equal(detail.sub.profileId, id);
      assert.ok(detail.sub.recommendationFocus.includes(item.title));
      assert.ok(detail.sub.recommendationFocus.includes(item.outcomes[0]));
      assert.equal(detail.sub.caseId, undefined);
      count++;
    }
  }
  assert.equal(count, 17);
});

test("hybrid recommendations retain distinct relevant demo routes and qualify adjacent maintenance patterns", () => {
  const get = (n) =>
    reportingRecommendationDetail(
      { id: "bd-hybrid-advisor" },
      { n, title: "Proposal", outcomes: ["BD-HA #1"] },
    );
  assert.equal(get(1).sub.portalTab, "overview");
  assert.equal(get(2).sub.statusFilter, "Blocked");
  assert.match(get(2).limitation, /related maintenance pattern/);
  assert.equal(get(3).sub.reportTab, "customize");
  assert.equal(get(4).sub.statusFilter, "Open");
  const first = get(1);
  first.sub.portalTab = "messages";
  assert.equal(get(1).sub.portalTab, "overview");
});

test("unknown recommendation profiles receive an explicit discovery fallback", () => {
  const detail = reportingRecommendationDetail(
    { id: "new-profile" },
    { n: 1, title: "Explore", outcomes: [] },
  );
  assert.equal(detail.layer, "reports");
  assert.equal(detail.sub.reportTab, "build");
  assert.match(detail.production, /validate this proposal/);
});

test("recommendation context and portal destination survive shared URL encoding alongside maintenance filters", () => {
  const source = readFileSync(
    new URL("./AccountMaintenance.jsx", import.meta.url),
    "utf8",
  );
  const body = source
    .split("export function maintenanceHref(layer, sub = {}) {")[1]
    .split("\nexport function readMaintenanceRoute")[0];
  const href = new Function(
    "layer",
    "sub",
    body.slice(0, body.lastIndexOf("}")),
  );
  const context = "Reporting review & ownership · Outcomes BD-HA #3, BD-HA #4";
  const route = new URLSearchParams(
    href("portal", {
      profileId: "bd-hybrid-advisor",
      portalTab: "documents",
      recommendationFocus: context,
    }).slice(1),
  );
  assert.equal(route.get("recommendationFocus"), context);
  assert.equal(route.get("portalTab"), "documents");
  assert.equal(route.get("profileId"), "bd-hybrid-advisor");
  const maintenance = new URLSearchParams(
    href("maintenance", {
      caseId: "MC-101",
      panel: "evidence",
      statusFilter: "Blocked",
    }).slice(1),
  );
  assert.equal(maintenance.get("caseId"), "MC-101");
  assert.equal(maintenance.get("panel"), "evidence");
  assert.equal(maintenance.get("statusFilter"), "Blocked");
  assert.equal(maintenance.has("recommendationFocus"), false);
});
