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
  assert.match(findingsBlock[1], /before expanding automation/);
  assert.match(findingsBlock[1], /Thirteen candidate outcomes show high importance and low satisfaction/);
  assert.match(findingsBlock[1], /expand only if validation confirms the same unmet needs/);
  assert.doesNotMatch(findingsBlock[1], /table stakes/);
  assert.doesNotMatch(findingsBlock[1], /outcome landscape/);
  assert.doesNotMatch(findingsBlock[1], /dominant-platform/);
  assert.doesNotMatch(findingsBlock[1], /differentiated wedge/);
  assert.doesNotMatch(findingsBlock[1], /does not isolate account maintenance/);
  assert.doesNotMatch(findingsBlock[1], /but not that complex changes/);
  assert.doesNotMatch(findingsBlock[1], /formal ODI survey/);
  assert.doesNotMatch(findingsBlock[1], /service-associate and reviewer interviews/);
  assert.doesNotMatch(findingsBlock[1], /not a maintenance-specific ROI claim/);
  assert.doesNotMatch(findingsBlock[1], /They do not prove/);
});
test("maintenance source confidence exposes evidence scoring and review gates", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
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
  assert.match(maintenanceSource, /label: "Source appendix"/);
  assert.match(maintenanceSource, /label: "Assumptions & next steps"/);
  assert.match(maintenanceSource, /SourceConfidenceSystem/);
  assert.match(maintenanceSource, /AssumptionsAndNextSteps/);
  assert.doesNotMatch(maintenanceSource, /className="mr-lead"/);
  assert.match(maintenanceSource, /maintenanceConfidencePlan/);
  assert.match(maintenanceSource, /Backend confidence/);
  assert.match(maintenanceSource, /Confidence backlog service/);
  assert.match(maintenanceSource, /Internal telemetry connectors/);
  assert.match(maintenanceSource, /Paid research provider layer/);
  assert.match(maintenanceSource, /Prediction calibration loop/);
  assert.match(maintenanceSource, /Traceable decision ledger/);
  assert.doesNotMatch(maintenanceSource, /Treat any section score below 50, or any confidence dimension below 50, as a validation backlog before it is used for funding/);
  assert.match(maintenanceSource, /sourceAppendixNotes/);
  assert.match(maintenanceSource, /sectionConfidenceScores/);
  assert.match(maintenanceSource, /confidenceSourceRefs/);
  assert.match(maintenanceSource, /SectionConfidence/);
  assert.match(maintenanceSource, /ConfidenceSourceLinks/);
  assert.match(maintenanceSource, /Confidence dimension breakdown/);
  assert.match(maintenanceSource, /Customer proximity", 55/);
  assert.match(maintenanceSource, /Source reputation", 82/);
  assert.match(maintenanceSource, /Signal convergence", 78/);
  assert.match(maintenanceSource, /scrollToMaintenanceTarget/);
  assert.match(maintenanceSource, /investmentNewsCustody/);
  assert.match(maintenanceSource, /target=\{external \? "_blank" : undefined\}/);
  assert.doesNotMatch(maintenanceSource, /sectionConfidenceRules/);
  assert.doesNotMatch(maintenanceSource, /Score rationale/);
  assert.doesNotMatch(maintenanceSource, /Source selection/);
  assert.doesNotMatch(maintenanceSource, /Resulting use/);
  assert.doesNotMatch(maintenanceSource, /mr-confidence-routing/);
  assert.doesNotMatch(maintenanceSource, /function ConfidenceRulesEngine/);
  assert.doesNotMatch(maintenanceSource, /<details className="mr-confidence-rules"/);
  assert.doesNotMatch(maintenanceSource, /"Dimension scoring"/);
  assert.match(maintenanceSource, /Directional confidence/);
  assert.match(maintenanceSource, /Customer proximity/);
  assert.match(maintenanceSource, /Source reputation/);
  assert.match(maintenanceSource, /Signal convergence/);
  assert.match(maintenanceSource, /Evidence agent checks citation reachability/);
  assert.match(maintenanceSource, /Human reviewer confirms the claim/);
  assert.match(maintenanceSource, /Source attribution/);
  assert.match(maintenanceSource, /View source links/);
  assert.doesNotMatch(maintenanceSource, /href="#maintenance-research-6"/);
  assert.doesNotMatch(maintenanceSource, /\{children && <p>\{children\}<\/p>\}/);
  assert.match(summarySource, /Funding decisions need Fidelity request volume/);
  assert.match(summarySource, /Each claim needs traceable sources before it becomes a recommendation/);
  assert.match(summarySource, /Research is scored before it becomes strategy/);
  assert.match(summarySource, /Approve a 90-day validation-and-exception pilot/);
  assert.match(summarySource, /Leadership ask/);
  assert.match(summarySource, /Why this is the right next move/);
  assert.match(summarySource, /Pilot approval should depend on request quality and repeated handling/);
  assert.doesNotMatch(summarySource, /<p>\{finding\[1\]\}<\/p>/);
  assert.match(summarySource, /label: "Quality"/);
  assert.match(summarySource, /label: "Ownership"/);
  assert.match(summarySource, /label: "Discipline"/);
  assert.match(summarySource, /findingGroups/);
  assert.match(summarySource, /\["Observed signals", \[2\]\]/);
  assert.match(summarySource, /\["Decision implications", \[1, 6\]\]/);
  assert.match(summarySource, /\["Observed signals", \[3, 5\]\]/);
  assert.match(summarySource, /\["Decision implications", \[0\]\]/);
  assert.match(summarySource, /\["Observed signals", \[4\]\]/);
  assert.match(summarySource, /\["Decision implications", \[7, 8, 9\]\]/);
  assert.match(summarySource, /findingView, setFindingView/);
  assert.match(summarySource, /findingView === "aligned" && reasonGroups\.map/);
  assert.match(summarySource, /By recommendation/);
  assert.match(summarySource, /By section/);
  assert.match(summarySource, /<details className="strategy-executive-support-group"/);
  assert.match(summarySource, /<summary>/);
  assert.match(summarySource, /\{groupSections\.length\}/);
  assert.match(summarySource, /strategy-executive-support-findings/);
  assert.match(summarySource, /strategy-executive-section-findings/);
  assert.match(summarySource, /Next analysis gate/);
  assert.match(summarySource, /Review recommendation/);
  assert.match(summarySource, /Check decision gates/);
  assert.match(summarySource, /one bounded pilot, one baseline workstream, and one decision gate/);
  assert.match(summarySource, /Inspect source engine/);
  assert.doesNotMatch(summarySource, /strategy-executive-conclusion/);
  assert.doesNotMatch(summarySource, /strategy-executive-decisions/);
  assert.match(accountMaintenanceCss, /\.mr-source-confidence/);
  assert.match(accountMaintenanceCss, /\.mr-source-tabs/);
  assert.match(accountMaintenanceCss, /\.mr-source-flow/);
  assert.match(accountMaintenanceCss, /\.mr-source-notes/);
  assert.match(accountMaintenanceCss, /\.mr-source-link-details/);
  assert.match(accountMaintenanceCss, /\.mr-evidence-appendix-link/);
  assert.match(accountMaintenanceCss, /\.mr-section-confidence/);
  assert.match(accountMaintenanceCss, /\.mr-confidence-dimensions/);
  assert.match(accountMaintenanceCss, /\.mr-confidence-trace-links/);
  assert.match(accountMaintenanceCss, /--mr-confidence-trigger-width/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-sources/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-panel-head/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-rationale/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-routing/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-rules/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-confidence-rule-grid/);
  assert.doesNotMatch(accountMaintenanceCss, /max-height: min\(560px/);
  assert.doesNotMatch(accountMaintenanceCss, /overflow: auto/);
  assert.match(accountMaintenanceCss, /\.mr-guidance/);
  assert.match(summaryCss, /\.strategy-executive-memo/);
  assert.match(summaryCss, /\.strategy-executive-ask/);
  assert.match(summaryCss, /\.strategy-executive-reasons/);
  assert.match(summaryCss, /\.strategy-executive-view-toggle/);
  assert.match(summaryCss, /\.strategy-executive-support-groups/);
  assert.match(summaryCss, /\.strategy-executive-support-group/);
  assert.match(summaryCss, /\.strategy-executive-support-group summary/);
  assert.match(summaryCss, /\.strategy-executive-support-group\[open\]/);
  assert.match(summaryCss, /\.strategy-executive-support-findings/);
  assert.match(summaryCss, /\.strategy-executive-support-finding/);
  assert.doesNotMatch(summaryCss, /\.strategy-executive-support-finding p/);
  assert.match(summaryCss, /\.strategy-executive-next-gate/);
  assert.match(summaryCss, /\.strategy-source-confidence/);
  assert.doesNotMatch(summaryCss, /border-left: 4px solid #1a7a40/);
  assert.doesNotMatch(summaryCss, /background: #0b5d2e/);
  assert.doesNotMatch(summaryCss, /\.strategy-executive-conclusion/);
  assert.doesNotMatch(summaryCss, /\.strategy-executive-decisions/);
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
test("maintenance market research defaults to custody peers with a clearing lens", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const accountMaintenanceCss = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  const visualIndex = maintenanceSource.indexOf("<MaintenanceMarketGrowthVisual />");
  const appendixIndex = maintenanceSource.indexOf("sourceAppendixNotes");
  const noteIndex = maintenanceSource.indexOf("like-for-like market-share");
  assert.ok(visualIndex > -1, "market research renders the growth visual");
  assert.ok(appendixIndex > -1, "source appendix notes retain market caveats");
  assert.ok(noteIndex > -1, "market caveat is retained in the source appendix");
  assert.ok(
    appendixIndex < noteIndex,
    "market caveat lives in the source appendix data",
  );
  assert.match(maintenanceSource, /custodianMarketPlayers/);
  assert.match(maintenanceSource, /clearingMarketPlayers/);
  assert.match(maintenanceSource, /marketPeerSets/);
  assert.match(maintenanceSource, /custodyMarketSummaryStats/);
  assert.match(maintenanceSource, /clearingMarketSummaryStats/);
  assert.match(maintenanceSource, /marketLens, setMarketLens/);
  assert.match(maintenanceSource, /useState\("map"\)/);
  assert.match(maintenanceSource, /Custody peer view/);
  assert.match(maintenanceSource, /Clearing peer view/);
  assert.match(maintenanceSource, /RIA custody/);
  assert.match(maintenanceSource, /Clearing firms/);
  assert.match(maintenanceSource, /Compare Wealthscape's baseline with RIA custodians and challengers/);
  assert.match(maintenanceSource, /Fidelity internal baseline/);
  assert.match(maintenanceSource, /This is us: the internal benchmark/);
  assert.match(maintenanceSource, /Wealthscape as the internal baseline beside Schwab/);
  assert.match(maintenanceSource, /large-scale custody/);
  assert.doesNotMatch(maintenanceSource, /Direct peer \/ incumbent/);
  assert.doesNotMatch(maintenanceSource, /Compare Fidelity against RIA custodians and challengers/);
  assert.doesNotMatch(maintenanceSource, /Schwab, Fidelity, Pershing and LPL/);
  assert.doesNotMatch(maintenanceSource, /incumbent scale/);
  assert.match(maintenanceSource, /Compare the clearing-side operating platforms/);
  assert.match(maintenanceSource, /Market presentation/);
  assert.match(maintenanceSource, /Bubble map/);
  assert.match(maintenanceSource, /Leader list/);
  assert.match(maintenanceSource, /marketLogoAssets/);
  assert.match(maintenanceSource, /competitorBrandPath/);
  assert.match(maintenanceSource, /mr-market-logo-badge/);
  assert.match(maintenanceSource, /lpl\.svg/);
  assert.match(maintenanceSource, /apex\.svg/);
  assert.match(maintenanceSource, /axos-advisor-services\.svg/);
  assert.match(maintenanceSource, /first-clearing\.png/);
  assert.match(maintenanceSource, /wedbush\.svg/);
  assert.match(maintenanceSource, /Charles Schwab Advisor Services/);
  assert.match(maintenanceSource, /Fidelity Institutional/);
  assert.match(maintenanceSource, /LPL Financial/);
  assert.match(maintenanceSource, /BNY Pershing/);
  assert.match(maintenanceSource, /Altruist/);
  assert.match(maintenanceSource, /Apex Fintech Solutions/);
  assert.match(maintenanceSource, /Axos Advisor Services/);
  assert.match(maintenanceSource, /TradePMR \/ Robinhood/);
  assert.match(maintenanceSource, /Fidelity \/ National Financial Services/);
  assert.match(maintenanceSource, /First Clearing \/ Wells Fargo/);
  assert.match(maintenanceSource, /Wedbush Securities/);
  assert.match(maintenanceSource, /scale: 3370/);
  assert.match(maintenanceSource, /scale: 17900/);
  assert.match(maintenanceSource, /Big-four RIA custody share/);
  assert.match(maintenanceSource, /Primary clearing frame/);
  assert.match(maintenanceSource, /mr-market-bubble-chart/);
  assert.match(maintenanceSource, /mr-market-bubble-point/);
  assert.match(maintenanceSource, /mr-market-leader-list/);
  assert.match(maintenanceSource, /setSelectedMarketItem/);
  assert.match(maintenanceSource, /setMarketLens/);
  assert.match(maintenanceSource, /const chartWidth = 760/);
  assert.match(maintenanceSource, /const chartHeight = 380/);
  assert.match(maintenanceSource, /plotCenterX/);
  assert.match(maintenanceSource, /plotCenterY/);
  assert.match(maintenanceSource, /clampToRange/);
  assert.match(maintenanceSource, /chartPadding\.left \+ radius \+ 3/);
  assert.match(maintenanceSource, /chartRight - badgeWidth - 5/);
  assert.match(maintenanceSource, /textAnchor="middle"/);
  assert.match(maintenanceSource, /xMin: 25/);
  assert.match(maintenanceSource, /xMax: 3000/);
  assert.match(maintenanceSource, /xMax: 18000/);
  assert.doesNotMatch(maintenanceSource, /marketGrowthSignals/);
  assert.doesNotMatch(maintenanceSource, /marketPositionRegions/);
  assert.doesNotMatch(maintenanceSource, /Chart position:/);
  assert.doesNotMatch(maintenanceSource, /Bubble size represents projected market size/);
  assert.doesNotMatch(maintenanceSource, /Nascent validation|Growth wedge|Mature scale/);
  assert.doesNotMatch(maintenanceSource, /Source roles/);
  assert.doesNotMatch(maintenanceSource, /Market-report publishers/);
  assert.doesNotMatch(maintenanceSource, /marketEvidenceChain|marketDecisionSignals/);
  assert.doesNotMatch(maintenanceSource, /SS&C Technologies/);
  assert.doesNotMatch(maintenanceSource, /Envestnet/);
  assert.doesNotMatch(maintenanceSource, /Broadridge Financial/);
  assert.doesNotMatch(maintenanceSource, /Avaloq/);
  assert.doesNotMatch(maintenanceSource, /mappedRevenue/);
  assert.doesNotMatch(maintenanceSource, /wealth-management-platform market/);
  assert.match(maintenanceSource, /84%/);
  assert.match(accountMaintenanceCss, /\.mr-market-visual/);
  assert.match(accountMaintenanceCss, /\.mr-market-leader-layout/);
  assert.match(accountMaintenanceCss, /\.mr-market-lens-switch/);
  assert.match(accountMaintenanceCss, /\.mr-market-kpis/);
  assert.match(accountMaintenanceCss, /\.mr-market-bubble-chart/);
  assert.match(accountMaintenanceCss, /\.mr-market-chart-frame[\s\S]*pointer-events: none/);
  assert.match(accountMaintenanceCss, /\.mr-market-bubble-point/);
  assert.match(accountMaintenanceCss, /\.mr-market-bubble-point\.is-challenger/);
  assert.match(accountMaintenanceCss, /\.mr-market-bubble-point\.is-clearing-core/);
  assert.match(accountMaintenanceCss, /\.mr-market-bubble-point\.is-clearing-challenger/);
  assert.match(accountMaintenanceCss, /\.mr-market-logo-badge/);
  assert.match(accountMaintenanceCss, /\.mr-market-logo-badge\.is-dark/);
  assert.match(accountMaintenanceCss, /\.mr-market-logo-badge\.is-compact/);
  assert.match(accountMaintenanceCss, /\.mr-market-leader-row/);
  assert.match(accountMaintenanceCss, /\.mr-market-drawer/);
  assert.match(accountMaintenanceCss, /\.mr-market-summary/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-market-region/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-market-signal-buttons/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-market-side/);
  assert.doesNotMatch(accountMaintenanceCss, /\.mr-market-range-bar/);
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
  const journeyDataSource = readFileSync(
    join(srcDir, "maintenanceJourney.js"),
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
    '<LifecycleResearch\n                  embedded\n                  view="journey"',
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
  assert.equal(
    journeySource.includes("Selected journey milestone context"),
    false,
  );
  assert.equal(
    journeySource.includes("All stages shown with equal emphasis"),
    false,
  );
  assert.equal(
    journeySource.includes("Design response: show the next owner"),
    false,
  );
  assert.equal(maintenanceSource.includes("Authority is a handoff"), false);
  assert.equal(maintenanceSource.includes("Confirmation closes the job"), false);
  assert.match(journeySource, /Outcome signals at this stage/);
  assert.match(journeySource, /Job focus/);
  assert.match(journeySource, /Owner handoff/);
  assert.match(journeyDataSource, /home office defines policy and review/);
  assert.match(journeyDataSource, /right account scope is confirmed/);
});
test("maintenance strategy outcome references open the selected outcome detail", () => {
  const maintenanceSource = readFileSync(
    join(srcDir, "MaintenanceResearch.jsx"),
    "utf8",
  );
  const outcomesSource = readFileSync(
    join(srcDir, "MaintenanceOutcomes.jsx"),
    "utf8",
  );
  const lifecycleSource = readFileSync(
    join(srcDir, "LifecycleExperience.jsx"),
    "utf8",
  );
  const journeySource = readFileSync(
    join(srcDir, "MaintenanceJourney.jsx"),
    "utf8",
  );
  const accountMaintenanceCss = readFileSync(
    join(srcDir, "AccountMaintenance.css"),
    "utf8",
  );
  const journeyCss = readFileSync(
    join(srcDir, "MaintenanceJourney.css"),
    "utf8",
  );
  assert.match(maintenanceSource, /selectedOutcome, setSelectedOutcome/);
  assert.match(maintenanceSource, /const openOutcome = \(id\) =>/);
  assert.match(maintenanceSource, /advance\(4\)/);
  assert.match(maintenanceSource, /selectedOutcome=\{selectedOutcome\}/);
  assert.match(maintenanceSource, /onOutcomeChange=\{setSelectedOutcome\}/);
  assert.match(maintenanceSource, /onOutcomeOpen=\{openOutcome\}/);
  assert.match(maintenanceSource, /OutcomeReferenceList/);
  assert.match(maintenanceSource, /OutcomeInlineReference/);
  assert.match(maintenanceSource, /title=\{outcomeName\(id\)\}/);
  assert.match(maintenanceSource, /className="mr-outcome-name"/);
  assert.equal(maintenanceSource.includes("Outcomes {rec.outcomes}"), false);
  assert.equal(maintenanceSource.includes("Map outcomes 1/2/3 and 9/14"), false);
  assert.match(outcomesSource, /selectedOutcome === undefined/);
  assert.match(lifecycleSource, /onOutcomeOpen/);
  assert.match(journeySource, /function MaintenanceJourney\(\{ onOutcomeOpen \}\)/);
  assert.match(journeySource, /className="mj-outcome-link"/);
  assert.match(journeySource, /title=\{outcome\.label\}/);
  assert.equal(journeySource.includes("<small>{outcome.reason}</small>"), false);
  assert.match(accountMaintenanceCss, /\.mr-outcome-link/);
  assert.match(accountMaintenanceCss, /\.mr-outcome-inline/);
  assert.match(accountMaintenanceCss, /text-overflow: ellipsis/);
  assert.match(accountMaintenanceCss, /white-space: nowrap/);
  assert.match(journeyCss, /\.mj-outcome-link/);
  assert.match(journeyCss, /text-overflow: ellipsis/);
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
