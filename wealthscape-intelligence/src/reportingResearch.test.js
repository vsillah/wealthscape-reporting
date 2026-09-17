import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  reportingOutcomeDetail,
  reportingScore,
  reportingJourney,
  reportingPlot,
  reportingQuadrant,
  reportingComparison,
  reportingCapabilityMap,
  reportingCompetitors,
  reportingSources,
} from "./reportingResearch.js";
import { reportingBrandAssets } from "./reportingBrandAssets.js";
import { reportingClientEvidence } from "./reportingEvidence.js";
import { reportingOutcomes } from "./reportingOutcomes.js";

const srcDir = dirname(fileURLToPath(import.meta.url));

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
  assert.equal(reportingComparison.length, 9);
  const notDirect = reportingComparison
    .flatMap((row) => row.cells)
    .filter((cell) => cell.level !== "direct");
  assert.ok(notDirect.length >= 5);
  for (const row of reportingComparison) {
    assert.equal(row.cells.length, 4);
    assert.equal("satisfaction" in row, false);
    for (const cell of row.cells) {
      assert.ok(["direct", "strong", "partial", "open"].includes(cell.level));
      assert.ok(cell.score >= 0 && cell.score <= 1);
      assert.ok(reportingCompetitors[cell.reference] && cell.note.length > 20);
    }
  }
});
test("reporting capability map scores workflow breadth and uses real logos", () => {
  assert.equal(reportingCapabilityMap.length, reportingComparison.length);
  for (const point of reportingCapabilityMap) {
    const row = reportingComparison[point.row];
    assert.equal(point.name, row.name);
    assert.equal(
      point.capabilityScore,
      row.cells.reduce((sum, cell) => sum + cell.score, 0),
    );
    assert.equal(
      point.supportedCount,
      row.cells.filter((cell) => cell.score > 0).length,
    );
    assert.equal("satisfaction" in row, false);
    assert.equal(typeof point.satisfactionProxy, "number");
    assert.ok(point.satisfactionProxy >= 6);
    assert.match(
      point.assumption,
      /proxy|directional|evidence|documentation|validate|confirm|not prove/i,
    );
    assert.ok(reportingBrandAssets[point.name], `${point.name}: logo asset`);
    assert.ok(
      existsSync(
        join(
          srcDir,
          "../public/competitor-brands",
          reportingBrandAssets[point.name].file,
        ),
      ),
      `${point.name}: local logo file exists`,
    );
  }
});
test("competitor capability map keeps confidence separate from chart axes", () => {
  const visualsSource = readFileSync(
    join(srcDir, "ReportingVisuals.jsx"),
    "utf8",
  );
  assert.doesNotMatch(visualsSource, /Less public support/);
  assert.match(visualsSource, /Narrower workflow coverage/);
  assert.match(visualsSource, /marker outline shows\s+public-evidence confidence/);
});
test("reporting journey icons are anchored to the curve coordinates", () => {
  const visualsSource = readFileSync(
    join(srcDir, "ReportingVisuals.jsx"),
    "utf8",
  );
  assert.ok(visualsSource.includes('top: `${(point.y / 260) * 100}%`'));
  assert.equal(visualsSource.includes("top: point.y + 36"), false);
});
test("executive findings stay aligned with reporting section order", () => {
  const reportingSource = readFileSync(
    join(srcDir, "ReportingResearch.jsx"),
    "utf8",
  );
  const summarySource = readFileSync(
    join(srcDir, "StrategyExecutiveSummary.jsx"),
    "utf8",
  );
  const sectionsBlock = reportingSource.match(/const sections = \[([\s\S]*?)\];/);
  assert.ok(sectionsBlock, "reporting sections block exists");
  const sectionIds = [...sectionsBlock[1].matchAll(/^\s+\["([^"]+)"/gm)].map(
    (match) => match[1],
  );
  const findingsBlock = summarySource.match(
    /reporting:\s*\{[\s\S]*?findings:\s*\{([\s\S]*?)\n    \},\n    assumptions:/,
  );
  assert.ok(findingsBlock, "reporting executive findings block exists");
  const findingIds = [...findingsBlock[1].matchAll(/^\s+([a-z]+): \[/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(findingIds, sectionIds);
  assert.match(summarySource, /getStrategySectionFinding\(track, section\.id\)/);
  assert.match(summarySource, /getStrategySectionFinding\(track, sectionId\)/);
});
test("maintenance executive findings connect research evidence to recommendations", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const summarySource = readFileSync(
    join(srcDir, "StrategyExecutiveSummary.jsx"),
    "utf8",
  );
  const sectionsBlock = maintenanceSource.match(/const sections = \[([\s\S]*?)\];/);
  assert.ok(sectionsBlock, "maintenance sections block exists");
  const sectionIds = [
    ...sectionsBlock[1].matchAll(/id:\s*(\d+),\s+label:\s*"([^"]+)"/g),
  ].map((match) => match[1]);
  const findingsBlock = summarySource.match(
    /maintenance:\s*\{[\s\S]*?findings:\s*\{([\s\S]*?)\n    \},\n    assumptions:/,
  );
  assert.ok(findingsBlock, "maintenance executive findings block exists");
  const findingIds = [...findingsBlock[1].matchAll(/^\s+(\d+): \[/gm)].map(
    (match) => match[1],
  );
  assert.deepEqual(findingIds, sectionIds);
  assert.match(findingsBlock[1], /servicing quality the investment question/);
  assert.match(findingsBlock[1], /outcome landscape points to differentiation/);
  assert.match(findingsBlock[1], /dominant-platform option/);
  assert.doesNotMatch(findingsBlock[1], /does not isolate account maintenance/);
  assert.doesNotMatch(findingsBlock[1], /but not that complex changes/);
  assert.doesNotMatch(findingsBlock[1], /formal ODI survey/);
  assert.doesNotMatch(findingsBlock[1], /service-associate and reviewer interviews/);
  assert.doesNotMatch(findingsBlock[1], /not a maintenance-specific ROI claim/);
  assert.doesNotMatch(findingsBlock[1], /They do not prove/);
});
test("maintenance strategy labels ODI outputs as directional until survey validation", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const outcomesSource = readFileSync(
    join(srcDir, "MaintenanceOutcomes.jsx"),
    "utf8",
  );
  const summarySource = readFileSync(
    join(srcDir, "StrategyExecutiveSummary.jsx"),
    "utf8",
  );
  const accountMaintenanceCss = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  const summaryCss = readFileSync(
    join(srcDir, "StrategyExecutiveSummary.css"),
    "utf8",
  );
  assert.equal(summarySource.includes("ODI / JTBD method boundary"), false);
  assert.equal(summarySource.includes("strategy-methodology"), false);
  assert.equal(summaryCss.includes("strategy-methodology"), false);
  assert.match(maintenanceSource, /<aside className="mr-evidence"/);
  assert.match(maintenanceSource, /stable job language/);
  assert.match(summarySource, /factor and cluster analysis/);
  assert.match(maintenanceSource, /factor and cluster\s+analysis/);
  assert.match(maintenanceSource, /ODI opportunity logic/);
  assert.match(maintenanceSource, /importance\s+plus unmet need/);
  assert.equal(outcomesSource.includes("mr-evidence"), false);
  assert.match(maintenanceSource, /sourced, derived, and inferred inputs/);
  assert.ok(
    maintenanceSource.indexOf("<MaintenanceOutcomes") <
      maintenanceSource.indexOf("Chart coordinates retain the Frames"),
    "outcome source/method caveat appears after the interactive outcome content",
  );
  assert.match(outcomesSource, /Opportunity quadrant/);
  assert.equal(outcomesSource.includes("mo-method-boundary"), false);
  assert.equal(accountMaintenanceCss.includes(".mo-source-note"), false);
  assert.equal(maintenanceSource.includes("mr-method-note"), false);
  assert.equal(maintenanceSource.includes("mr-validation-gap"), false);
  assert.match(accountMaintenanceCss, /\.mr-evidence-label/);
  assert.equal(accountMaintenanceCss.includes(".mr-method-note"), false);
  assert.equal(accountMaintenanceCss.includes(".mo-method-boundary"), false);
});
test("maintenance outcomes translate ODI placement into directional strategy posture", () => {
  const outcomesSource = readFileSync(
    join(srcDir, "MaintenanceOutcomes.jsx"),
    "utf8",
  );
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const summarySource = readFileSync(
    join(srcDir, "StrategyExecutiveSummary.jsx"),
    "utf8",
  );
  const cssSource = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  assert.match(outcomesSource, /ODI strategy read/);
  assert.match(
    outcomesSource,
    /Differentiation is the strongest current signal; disruption is not/,
  );
  assert.match(outcomesSource, /Exception-control segment/);
  assert.match(outcomesSource, /Household-authority segment/);
  assert.match(outcomesSource, /ODI strategy context/);
  assert.match(outcomesSource, /OdiCompactRead/);
  assert.equal(outcomesSource.includes("MaintenanceOdiSynthesis"), false);
  assert.match(outcomesSource, /quadrantOrder/);
  assert.match(outcomesSource, /Opportunity \/ underserved/);
  assert.match(maintenanceSource, /ODI posture/);
  assert.match(maintenanceSource, /Differentiated wedge/);
  assert.match(maintenanceSource, /Dominant-platform option to test/);
  assert.match(maintenanceSource, /differentiated, dominant, disruptive/);
  assert.match(summarySource, /Thirteen of fifteen candidate outcomes/);
  assert.match(cssSource, /\.mo-odi-compact/);
  assert.match(cssSource, /\.mo-odi-context/);
  assert.equal(cssSource.includes(".mo-odi-synthesis"), false);
  assert.match(cssSource, /\.mr-odi-posture/);
});
test("maintenance capability comparison leads with the integrated map and selected-platform validation", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const competitorMapSource = readFileSync(
    join(srcDir, "MaintenanceCompetitorMap.jsx"),
    "utf8",
  );
  const mapIndex = maintenanceSource.indexOf(
    '<LifecycleResearch embedded view="positioning" />',
  );
  const evidenceIndex = maintenanceSource.indexOf(
    '<Evidence slide="15, 17, 25, 27" links={["schwab", "t3"]}>',
  );
  assert.ok(mapIndex > -1, "capability section renders the integrated map");
  assert.ok(evidenceIndex > -1, "capability section keeps source evidence");
  assert.ok(
    mapIndex < evidenceIndex,
    "the integrated map appears before the source evidence",
  );
  assert.equal(
    competitorMapSource.includes("Account Maintenance Frames snapshot"),
    false,
  );
  assert.equal(competitorMapSource.includes("Source assessment:"), false);
  assert.match(maintenanceSource, /X uses T3 2026 advisor\s+satisfaction/);
  assert.match(maintenanceSource, /Public\s+context checked 10 Sep 2026/);
  assert.equal(
    maintenanceSource.includes("Onboarding is not all maintenance"),
    false,
  );
  assert.equal(
    maintenanceSource.includes("A gap worth investigating"),
    false,
  );
  assert.equal(
    maintenanceSource.includes(
      "Maintenance capability references and validation questions",
    ),
    false,
  );
  assert.match(competitorMapSource, /selectedValidationCards\(rival\)/);
  assert.match(
    competitorMapSource,
    /\$\{rival\.name\} maintenance evidence and validation questions/,
  );
  assert.match(competitorMapSource, /competitorValidationCards/);
});
test("maintenance chart caveats stay below the related visualizations", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const competitorMapSource = readFileSync(
    join(srcDir, "MaintenanceCompetitorMap.jsx"),
    "utf8",
  );
  const journeySource = readFileSync(
    join(srcDir, "MaintenanceJourney.jsx"),
    "utf8",
  );
  const capabilityMapIndex = maintenanceSource.indexOf(
    '<LifecycleResearch embedded view="positioning" />',
  );
  const capabilityNoteIndex = maintenanceSource.indexOf(
    "X uses T3 2026 advisor",
  );
  assert.ok(capabilityMapIndex > -1, "capability visual is rendered");
  assert.ok(capabilityNoteIndex > -1, "capability caveat is retained");
  assert.ok(
    capabilityMapIndex < capabilityNoteIndex,
    "capability caveat appears after the visualization",
  );
  assert.equal(
    competitorMapSource.includes("Account Maintenance Frames snapshot"),
    false,
  );
  assert.equal(competitorMapSource.includes("Source assessment:"), false);

  const journeyMapIndex = maintenanceSource.indexOf(
    '<LifecycleResearch embedded view="journey" />',
  );
  const journeyNoteIndex = maintenanceSource.indexOf(
    "Executive deck slides 6 and 10 provide directional forum",
  );
  assert.ok(journeyMapIndex > -1, "job-map journey visual is rendered");
  assert.ok(journeyNoteIndex > -1, "job-map caveat is retained");
  assert.ok(
    journeyMapIndex < journeyNoteIndex,
    "job-map caveat appears after the visualization",
  );
  assert.equal(journeySource.includes("Executive deck, slides 6 and 10"), false);
  assert.equal(journeySource.includes("Curve height and progress symbols"), false);
});
test("maintenance customer research highlights only the evidenced persona", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const accountMaintenanceCss = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  assert.match(maintenanceSource, /mr-customer-context/);
  assert.match(maintenanceSource, /\/personas\/jordan-williams\.png/);
  assert.match(maintenanceSource, /RIA advisor/);
  assert.match(maintenanceSource, /does\s+not directly study client service/);
  assert.match(maintenanceSource, /Functional, social, and emotional needs are discovery context/);
  assert.equal(maintenanceSource.includes("Investor / account owner"), false);
  assert.equal(
    maintenanceSource.includes("/personas/investor-account-owner.png"),
    false,
  );
  assert.equal(
    maintenanceSource.includes("Jobs to be done in this context"),
    false,
  );
  assert.equal(
    maintenanceSource.includes("Method and next research step"),
    false,
  );
  assert.equal(
    maintenanceSource.includes("Client service associate · executes the job"),
    false,
  );
  assert.equal(
    maintenanceSource.includes("Home office · buys and supervises"),
    false,
  );
  assert.match(accountMaintenanceCss, /\.mr-customer-pain/);
  assert.equal(accountMaintenanceCss.includes(".mr-customer-job"), false);
  assert.equal(maintenanceSource.includes("Unvalidated roles to research next"), false);
  assert.equal(accountMaintenanceCss.includes(".mr-validation-gap"), false);
});
test("maintenance resolution milestones render as a sequenced roadmap", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const accountMaintenanceCss = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  assert.match(maintenanceSource, /mr-milestones mr-roadmap/);
  assert.match(maintenanceSource, /Resolution strategy roadmap milestones/);
  assert.match(maintenanceSource, /Establish the baseline/);
  assert.match(maintenanceSource, /Validate the job and reuse path/);
  assert.match(maintenanceSource, /Resize or advance the investment/);
  assert.match(maintenanceSource, /Evidence gate/);
  assert.match(accountMaintenanceCss, /\.mr-milestones::before/);
  assert.match(accountMaintenanceCss, /\.mr-roadmap-marker/);
  assert.match(accountMaintenanceCss, /grid-template-columns: 54px minmax\(0, 1fr\)/);
});
test("strategy profile selector explains role-scoped impact without displacing the executive summary", () => {
  const prototypeSource = readFileSync(
    join(srcDir, "WealthscapePrototype.jsx"),
    "utf8",
  );
  const profileImpactCss = readFileSync(
    join(srcDir, "StrategyProfileImpact.css"),
    "utf8",
  );
  assert.match(prototypeSource, /PROFILE_STRATEGY_IMPACT/);
  assert.match(prototypeSource, /ProfileImpactHelp/);
  assert.match(prototypeSource, /What changes for \{profile\.label\}/);
  assert.match(prototypeSource, /OSJ drill-ins filter to branch-supervision cases/);
  assert.match(prototypeSource, /market-research evidence is not recomputed per profile/i);
  assert.equal(prototypeSource.includes("<StrategyProfileImpact"), false);
  assert.match(profileImpactCss, /profile-impact-popover/);
  assert.match(profileImpactCss, /position: absolute/);
});
test("Fidelity remains a public incumbent baseline with bounded reporting evidence", () => {
  const row = reportingComparison.find(
    (item) => item.name === "Fidelity (Wealthscape)",
  );
  assert.deepEqual(
    row.cells.map((cell) => cell.level),
    ["strong", "open", "partial", "partial"],
  );
  const reference = reportingCompetitors[row.cells[0].reference];
  assert.equal(reference.incumbent, true);
  for (const source of [
    reference.source,
    reference.additionalSource,
    ...reference.additionalSources,
  ]) {
    assert.ok(
      new URL(reportingSources[source].href).hostname.endsWith(".fidelity.com"),
    );
  }
  assert.equal(reference.layer, "reports");
  assert.equal(reference.sub.reportTab, "build");
});
test("customer evidence separates metric labels from strategy implications", () => {
  assert.equal(reportingClientEvidence.length, 6);
  for (const item of reportingClientEvidence) {
    assert.ok(item.value, `${item.title}: metric value`);
    assert.ok(item.metricLabel?.length > 20, `${item.title}: metric label`);
    assert.ok(item.icon, `${item.title}: icon`);
    assert.ok(
      ["positive", "negative", "neutral"].includes(item.signal),
      `${item.title}: sentiment signal`,
    );
    assert.ok(item.signalLabel?.length > 8, `${item.title}: signal label`);
    assert.ok(item.signalSummary?.length > 35, `${item.title}: signal summary`);
    assert.ok(item.context?.length > 40, `${item.title}: context`);
    assert.ok(item.implication?.length > 40, `${item.title}: implication`);
  }
  assert.deepEqual(
    reportingClientEvidence.map((item) => item.signal),
    ["neutral", "negative", "positive", "neutral", "positive", "neutral"],
  );
  assert.match(reportingClientEvidence[0].title, /Advisor time/);
  assert.match(reportingClientEvidence[0].metricLabel, /workweek/);
  assert.match(reportingClientEvidence[0].context, /not a measured reporting workload/);
});
test("reporting outcomes carry parity fields for map detail inspection", () => {
  assert.equal(reportingOutcomes.length, 15);
  const bases = new Set(reportingOutcomes.map((item) => item.basis));
  assert.deepEqual([...bases].sort(), ["derived", "inferred"]);
  for (const outcome of reportingOutcomes) {
    assert.match(outcome.id, /^R\d+$/);
    assert.ok(outcome.problem.length > 60, `${outcome.id}: problem blurb`);
    assert.ok(outcome.jobMap.length > 60, `${outcome.id}: job-map context`);
    assert.ok(outcome.ux.length > 40, `${outcome.id}: ux response`);
    assert.ok(outcome.coverage.length > 60, `${outcome.id}: demo coverage`);
    assert.ok(
      ["build", "customize", "generate"].includes(outcome.tab),
      `${outcome.id}: demo tab`,
    );
  }
});
test("reporting outcome links carry selected outcome context into the prototype", () => {
  const researchSource = readFileSync(join(srcDir, "ReportingResearch.jsx"), "utf8");
  const prototypeSource = readFileSync(
    join(srcDir, "WealthscapePrototype.jsx"),
    "utf8",
  );
  assert.match(researchSource, /strategyOutcomeId:\s*selected\.id/);
  assert.match(
    researchSource,
    /Open \{outcomePrototypeSurface\[selected\.tab\]\} for[\s\S]*\{selected\.id\}/,
  );
  assert.match(prototypeSource, /Strategy outcome link/);
  assert.match(prototypeSource, /deepLink\?\.strategyOutcomeId/);
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
