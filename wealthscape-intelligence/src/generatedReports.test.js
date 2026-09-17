import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  generatedReports,
  getGeneratedReport,
  reportContext,
  reportStageDetails,
  portalReportDocuments,
} from "./generatedReports.js";

test("four templates contain distinct report purposes, exceptions and time periods", () => {
  assert.deepEqual(Object.keys(generatedReports), [
    "quarterly",
    "annual",
    "adhoc",
    "proposal",
  ]);
  assert.equal(
    new Set(Object.values(generatedReports).map((r) => r.narrativeTitle)).size,
    4,
  );
  assert.equal(
    new Set(Object.values(generatedReports).map((r) => r.exception.id)).size,
    4,
  );
  assert.equal(getGeneratedReport("annual").returnBasis, "FY");
  assert.equal(getGeneratedReport("adhoc").returnBasis, "MTD");
  assert.ok(getGeneratedReport("annual").planning.length > 0);
  assert.equal(getGeneratedReport("proposal").performance, null);
  assert.match(
    getGeneratedReport("proposal").performanceContext,
    /2,500,000 × 0.85%/,
  );
  assert.equal(2500000 * 0.0085, 21250);
});
test("report snapshots reconcile allocation totals and chart endpoints", () => {
  for (const report of Object.values(generatedReports)) {
    assert.equal(
      report.allocation.reduce((n, row) => n + row[1], 0),
      100,
      report.id,
    );
    assert.equal(
      report.allocation.reduce((n, row) => n + row[2], 0),
      100,
      report.id,
    );
    if (report.performance) {
      assert.equal(report.performance.at(-1)[1], report.portfolioReturn);
      assert.equal(report.performance.at(-1)[2], report.benchmarkReturn);
      assert.ok(
        report.performance.every(
          (row) =>
            row[1] >= 0 &&
            row[2] >= 0 &&
            row[1] <= report.chartMax &&
            row[2] <= report.chartMax,
        ),
      );
    }
    const stages = reportStageDetails(report.id);
    assert.match(stages.validate.result, new RegExp(report.exception.title));
    assert.ok(stages.assemble.result.includes(report.title));
    assert.match(stages.delivery.result, /Not sent/);
    assert.match(stages.compliance.result, /review pending/);
  }
});
test("report template and selected profile survive route serialization", () => {
  const source = readFileSync(
    new URL("./AccountMaintenance.jsx", import.meta.url),
    "utf8",
  );
  const body = source.match(
    /export function maintenanceHref\(layer, sub = \{\}\) \{([\s\S]*?)\n\}/,
  )[1];
  const href = new Function("layer", "sub", body);
  for (const profileId of ["ria", "bd-home-office", "bd-hybrid-advisor"]) {
    for (const template of Object.keys(generatedReports)) {
      for (const tab of ["build", "generate", "customize"]) {
        const context = reportContext(profileId, template, tab);
        const query = new URLSearchParams(
          href("reports", {
            ...context,
            strategyOutcomeId: "R1",
          }).slice(1),
        );
        assert.equal(query.get("profileId"), profileId);
        assert.equal(query.get("reportTemplate"), template);
        assert.equal(query.get("reportTab"), tab);
        assert.equal(query.get("strategyOutcomeId"), "R1");
      }
    }
  }
});
test("unknown templates fall back safely and unavailable archives never map to a different report", () => {
  assert.equal(getGeneratedReport("unknown").id, "quarterly");
  assert.equal(getGeneratedReport("toString").id, "quarterly");
  assert.equal(reportContext("ria", "unknown", "bogus").reportTab, "build");
  assert.deepEqual(
    portalReportDocuments.filter((d) => d.template).map((d) => d.template),
    ["quarterly", "annual", "adhoc", "proposal"],
  );
  assert.ok(
    portalReportDocuments.filter((d) => !d.template).every((d) => d.reason),
  );
  assert.equal(
    portalReportDocuments.find((d) => d.name.startsWith("Q1")).template,
    undefined,
  );
});
