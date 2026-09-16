import { reportingEvidenceSources } from "./reportingEvidence.js";
// Reporting strategy synthesis. Scores and personas come from the existing
// strategy packet; they are discovery inputs, not measured customer results.
export const reportingScore = (outcome) =>
  outcome.imp + Math.max(outcome.imp - outcome.sat, 0);
export const reportingSources = {
  ...reportingEvidenceSources,
  packet: {
    label: "Broker-dealer strategy packet · July 2026",
    href: "https://github.com/vsillah/wealthscape-reporting/blob/main/docs/broker-dealer-strategy-expansion.md",
  },
  addepar: {
    label: "Addepar · reporting workflows, June 2026",
    href: "https://addepar.com/blog/enhanced-reporting-transforms-operations",
  },
  addeparGeneration: {
    label: "Addepar API · report generation",
    href: "https://developers.addepar.com/docs/report-generation",
    note: "Developer documentation: report jobs can generate PDFs for portfolios, publish to Client Portal, notify clients, apply labels and brand palettes, and enforce reporting / Portal permissions.",
  },
  addeparSchedules: {
    label: "Addepar API · report schedules",
    href: "https://developers.addepar.com/docs/report-schedules",
    note: "Developer documentation: recurring report schedules include report, portfolio, frequency, Portal publishing, email notification, label and permission requirements.",
  },
  advyzon: {
    label: "Advyzon · portfolio management and reporting",
    href: "https://www.advyzon.com/advyzon-portfolio-management/",
  },
  portal: {
    label: "Advyzon · client portal",
    href: "https://www.advyzon.com/client-portal/",
  },
  advyzonSecure: {
    label: "Advyzon · Secure document management",
    href: "https://www.advyzon.com/secure/",
    note: "Vendor page: secure document handling includes WORM, audit trails, retention policies, role-based permissions and reviewable workflows. Treat as adjacent control evidence unless report entitlements are confirmed.",
  },
  fidelity: {
    label: "Fidelity · Wealthscape Intelligence launch, September 2025",
    href: "https://newsroom.fidelity.com/thought-leaders/fidelity-investments-launches-wealthscapesm-intelligence-and-introduces-new--fully-digital-onboardin/s/aaf9079d-0ecd-49b2-84f2-7e546a4fc693",
  },
  fidelityOperations: {
    label: "Fidelity · Wealthscape operations experience",
    href: "https://clearingcustody.fidelity.com/solutions/technology/brokerage/operations",
  },
  fidelityInvestorExperience: {
    label: "Fidelity · Wealthscape investor experience",
    href: "https://clearingcustody.fidelity.com/solutions/technology/brokerage/investors",
    note: "Fidelity describes investor access to documents, balances, activity, market data and account management; this supports client experience context more than custom report workflow proof.",
  },
  fidelityPortfolioQuickCheck: {
    label: "Fidelity · Portfolio Quick Check",
    href: "https://clearingcustody.fidelity.com/platforms/portfolio-quick-check",
    note: "Fidelity describes customizable portfolio reports and saved custom report views. Public material does not establish batch generation or report-specific entitlement controls.",
  },
  tamaracReports: {
    label: "Tamarac help · reporting overview",
    href: "https://support.tamaracinc.com/help/content/advisor_view/reports/introduction_to_reports.htm",
    note: "Help documentation describes configurable dynamic reports, PDF templates, client portal reports, document-vault delivery, bulk reports and permission-limited report visibility.",
  },
  tamaracPortalPosting: {
    label: "Tamarac help · post reports to client portals",
    href: "https://help.tamaracinc.com/help/content/tamarac_reporting/clients_and_client_portals/common_customer_service_requests/post_documents_reports_and_other_files_to_client_portals.htm",
    note: "Help documentation describes selecting one or more accounts, groups or households, choosing a PDF template, posting reports to client portals, sending notifications and monitoring posting status.",
  },
  tamaracTemplatePermissions: {
    label: "Tamarac help · PDF template permissions",
    href: "https://help.tamaracinc.com/help/content/tamarac_reporting/user_security_and_system_settings/user_management/manage_permissions_for_pdf_templates.htm",
    note: "Help documentation describes public/private PDF templates, read-only versus edit access, user and group permissions, template-set permissions and audit fields.",
  },
  orionReportBatches: {
    label: "Orion support · report batches",
    href: "https://orionadvisorservices.my.site.com/OrionSupportApp/s/article/Report-Batches",
    note: "Support article describes report batches for multiple clients, PDF generation, print-vendor delivery, client-portal posting and privileges for advisor and representative users.",
  },
  orionReportAccess: {
    label: "Orion support · report access in Report Builder",
    href: "https://orionadvisorservices.my.site.com/OrionSupportApp/s/article/User-Access-Rights-in-Report-Builder",
    note: "Support article describes report access by login level, role, user, representative, client and broker-dealer; clients can be allowed to run reports from the client portal.",
  },
  orionPortalVisibility: {
    label: "Orion support · report batch portal visibility",
    href: "https://orionadvisorservices.my.site.com/OrionSupportApp/s/article/Report-Builder-Client-Portal-Visibility",
    note: "Support article describes Viewable By settings for generated batch reports and states that generated reports require visibility changes before appearing in client portals.",
  },
  orionGettingStarted: {
    label: "Orion support · reporting getting started",
    href: "https://orionadvisorservices.my.site.com/OrionSupportApp/s/article/Reporting-Getting-Started-Guide",
    note: "Support guide describes custom Report Builder, branded themes, report batches, statement delivery to portals, report access privileges and compliance-relevant delivery records.",
  },
  altruistCobranding: {
    label: "Altruist · co-branding and holdings reporting",
    href: "https://altruist.com/news/february-2023/",
    note: "Vendor release states Owner/Admin users can turn on co-branding across client dashboards, mobile splash screen, billing invoices, performance reports and email invitations.",
  },
  blackdiamondReportingBlog: {
    label: "SS&C Advent · reporting drives meaningful conversations",
    href: "https://www.advent.com/news-and-insights/blog/reporting-drives-meaningful-conversations/",
    note: "Vendor blog describes digital report delivery through a secure document vault, report builder, data validation help and large volumes of ad hoc and assisted reports.",
  },
  blackdiamondClientView: {
    label: "SS&C Black Diamond · Client View",
    href: "https://blackdiamond.advent.com/insights/blogs/black-diamond-expressions/client-view-takes-the-stage/",
    note: "Vendor blog describes Client View, Timeline, Vault, Reports and Statements, report generation and sharing via Vault or Timeline.",
  },
  blackdiamondCapacity: {
    label: "SS&C Black Diamond · batch and scheduled reporting",
    href: "https://blackdiamond.advent.com/insights/blogs/black-diamond-expressions/shifting-capacity-towards-high-value-activities/",
    note: "Vendor blog describes Batch Reporting, Client Experience portal efficiencies and scheduled Data Mining reports for repetitive oversight workflows.",
  },
  schwabPortfolioConnectVideo: {
    label: "Schwab PT · Portfolio Connect walkthrough",
    href: "https://www.schwabpt.com/schwab-advisor-portfolio-connect-video",
    note: "Transcript describes dynamic and firm reporting, quarterly automatic client reports, logo/disclaimer/page controls, meeting books, and generating/downloading PDFs for distribution.",
  },
  schwabPortfolioConnectIntake: {
    label: "Schwab PT · Portfolio Connect intake",
    href: "https://www.schwabpt.com/schwab-advisor-portfolio-connect-interest-survey",
    note: "Intake page states Portfolio Connect is enabled at firm level and users inherit Schwab Advisor Center account-data access.",
  },
  schwabPortfolioConnectRelease: {
    label: "Schwab · Portfolio Connect adoption release",
    href: "https://pressroom.aboutschwab.com/press-releases/press-release/2020/As-Demand-and-Adoption-Grows-Schwab-Advisor-Portfolio-Connect-Surpasses-1000-Platform-Users/default.aspx",
    note: "Press release describes batch onboarding for payment and reporting schedules across multiple client groups or households; later user-permission rollout was forward-looking at publication.",
  },
  pershingWoveAdvisory: {
    label: "BNY Pershing · Wove Advisory",
    href: "https://www.bny.com/pershing/us/en/platforms/wove/advisory.html",
    note: "BNY page describes white-labeled Wove Advisory, customized client reporting, performance reporting for home office/advisors/clients and automated reporting delivery.",
  },
  pershingWoveInvestor: {
    label: "BNY Pershing · Wove Investor",
    href: "https://www.bny.com/pershing/us/en/platforms/wove/investor.html",
    note: "BNY page describes client dashboard documents, multi-custodial account performance data, centralized documents, consolidated notifications and customizable branding/configurations; forward-looking disclaimers remain.",
  },
  pershingNetXInvestor: {
    label: "BNY Pershing · NetXInvestor",
    href: "https://www.bny.com/pershing/us/en/platforms/netx/netx-investor.html",
    note: "BNY page describes configurable branding, content/features clients can access, eDelivery documents and account views; public material does not prove full batch report generation.",
  },
};
export const reportingCompetitors = [
  {
    name: "Addepar",
    focus: "Reporting at firm scale",
    icon: "layers",
    source: "addeparGeneration",
    additionalSource: "addeparSchedules",
    additionalSources: ["addepar"],
    evidence:
      "Addepar documents report-generation and scheduling APIs that generate portfolio PDFs, publish to the Client Portal, notify clients, apply labels and brand palettes, and enforce reporting permissions.",
    implication:
      "Test whether shared templates and clear ownership reduce repeat assembly for each reporting cycle.",
    gap: "The prototype shows report configuration and generation. Firm-wide permissions and distribution controls still require validation.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Inspect report assembly",
  },
  {
    name: "Advyzon",
    focus: "Portfolio reporting",
    icon: "chart",
    source: "advyzon",
    additionalSources: ["portal", "advyzonSecure"],
    evidence:
      "Advyzon describes branded report components, scheduled batch reports, portal sharing, and adjacent document-security controls.",
    implication:
      "Make reusable report composition the baseline; measure the remaining manual preparation work.",
    gap: "The prototype demonstrates one report pipeline. Scheduled batch processing is not implemented.",
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect generation",
  },
  {
    name: "Advyzon",
    focus: "Client delivery",
    icon: "users",
    source: "portal",
    additionalSource: "advyzonSecure",
    evidence:
      "Advyzon describes a branded portal with interactive reports and client action items.",
    implication:
      "Connect the report to a client conversation and a clear next step.",
    gap: "The client portal is a synthetic interaction demo. Live delivery and client engagement measurement are outside this prototype.",
    layer: "portal",
    sub: {},
    action: "Inspect client portal",
  },
  {
    name: "Fidelity",
    focus: "Wealthscape reporting baseline",
    icon: "report",
    incumbent: true,
    source: "fidelity",
    additionalSource: "fidelityOperations",
    additionalSources: [
      "fidelityInvestorExperience",
      "fidelityPortfolioQuickCheck",
    ],
    evidence:
      "Fidelity describes centralized operational reports, configurable reporting, investor document access, and saved custom portfolio reports. Public material is thinner on batch generation and report-specific entitlements.",
    implication:
      "Start discovery with the incumbent reporting capability. Validate reuse before proposing another report workflow.",
    gap: "This is a public Wealthscape baseline. The synthetic prototype does not establish production coverage, report delivery, batch scheduling, or report-specific permissions.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Inspect prototype report assembly",
  },
  ...[
    [
      "Envestnet Tamarac",
      "Dynamic reporting and AI beta",
      "tamaracReports",
      "tamaracPortalPosting",
      "Tamarac help and release material describe configurable dynamic/PDF reports, client portal posting, bulk reports, report permissions and AI Report Studio as preview/beta.",
      ["tamaracWorkflow", "tamaracTemplatePermissions", "tamarac"],
    ],
    [
      "Orion",
      "Template-based report drafts",
      "orionGettingStarted",
      "orionReportBatches",
      "Orion support material describes custom Report Builder, branded themes, report batches, client portal delivery, report access controls and report-batch privileges.",
      ["orionReportAccess", "orionPortalVisibility", "orion"],
    ],
    [
      "Altruist",
      "Custodial performance reporting",
      "altruist",
      "altruistCobranding",
      "Altruist describes scheduled, white-labeled performance-summary emails, investment/activity PDFs, client portal delivery and Owner/Admin co-branding. Report entitlement controls remain adjacent rather than direct.",
      [],
    ],
    [
      "SS&C Black Diamond",
      "Batch reports and portal posting",
      "blackdiamond",
      "blackdiamondPortal",
      "Black Diamond describes template building, batch quarterly statements, portal posting, Client View report generation, Timeline/Vault sharing and secure document delivery.",
      [
        "blackdiamondReportingBlog",
        "blackdiamondClientView",
        "blackdiamondCapacity",
      ],
    ],
    [
      "Schwab Advisor Services",
      "Portfolio Connect report review",
      "schwabPortfolioConnectVideo",
      "schwabPortfolioConnectIntake",
      "Portfolio Connect public material describes standardized report customization, automatic quarterly reports, PDF generation/download, and account-access inheritance from Schwab Advisor Center.",
      ["schwabPortfolioConnectRelease", "schwab"],
    ],
    [
      "BNY Pershing",
      "Investor and wealth-reporting unification",
      "pershingWoveAdvisory",
      "pershingWoveInvestor",
      "BNY pages describe white-labeled Wove Advisory, customized client reporting, performance reporting for advisors/home office/clients, automated reporting delivery and investor document/performance access. Forward-looking disclaimers still apply.",
      ["pershingNetXInvestor", "pershing"],
    ],
  ].map(([name, focus, source, additionalSource, evidence, additionalSources]) => ({
    name,
    focus,
    source,
    additionalSource,
    additionalSources,
    evidence,
    icon: "report",
    implication:
      "Use public workflow evidence to frame a product teardown and test the remaining approval, source and retention requirements.",
    gap: "Illustrative pilot on synthetic data. No live integration, supervisory approval, durable audit trail or production readiness is established.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Inspect illustrative report assembly",
  })),
];

const outcomeGaps = {
  "BD-HA #1":
    "Relationship context is split across advisory, brokerage, planning, and product workflows.",
  "BD-HA #2":
    "Report preparation must reconcile distinct account contexts and disclosure requirements.",
  "BD-HA #3":
    "The team cannot quickly distinguish a missing-data issue from a suitability or supervision hold.",
  "BD-HA #4":
    "Handoffs lose the owner, evidence, or next action needed to resolve a blocker.",
  "BD-HA #5":
    "A polished narrative alone does not establish that product and account context were reviewed.",
  "BD-HO #1":
    "Risk signals reach the home office through separate systems and queues.",
  "BD-HO #2":
    "AI narrative activity lacks a single view of policy status and review ownership.",
  "BD-HO #3":
    "Adoption, supervision workload, and business context are difficult to assess together.",
  "BD-HO #4":
    "Field friction needs a named intervention owner before the issue can be resolved.",
  "BD-HO #5":
    "Fragmented support and adoption signals make retention concerns difficult to investigate.",
  "BD-HO #6":
    "Closure status alone does not explain which evidence supported the supervisory action.",
  "BD-OSJ #1":
    "Local exception queues need client impact and severity alongside age.",
  "BD-OSJ #2":
    "Home-office findings require translation into an action the rep can complete.",
  "BD-OSJ #3":
    "Repeated exceptions need rep-level context before coaching can be targeted.",
  "BD-OSJ #4":
    "Branch-to-home-office escalation can separate the issue from its supporting context.",
  "BD-OSJ #5":
    "Reviewed exceptions need a traceable evidence and closure record.",
  "ODI #5.1":
    "Branded report assembly is spread across output, narrative, and presentation tools.",
  "ODI #5.3":
    "Separate providers and field mappings create reconciliation work.",
  "ODI #13":
    "An insight can lose its client context when the advisor changes tools.",
  "ODI #7":
    "Event signals need to identify the affected client and a useful next action.",
  "ODI #8":
    "Manual watchlists make allocation and tax-window review difficult to repeat.",
  "ODI #8.2":
    "Static output gives the client little room to explore the report.",
  "ODI #1":
    "The advisor must assemble a daily priority list from scattered signals.",
  "ODI #12":
    "Client review and engagement signals need a consistent follow-up path.",
  "ODI #15":
    "Report completion alone does not explain the validation and review history.",
  "ODI #8.1":
    "Client questions can lose the report context when they move to another channel.",
  "ODI #8.4":
    "Advisors need a reliable signal that a delivered report has been viewed.",
};
const reportOutcomeTabs = {
  "BD-HA #2": "customize",
  "BD-HA #5": "customize",
  "BD-HO #2": "customize",
  "BD-HO #6": "generate",
  "BD-OSJ #4": "build",
  "BD-OSJ #5": "generate",
};
export function reportingOutcomeDetail(outcome, strategy) {
  const recommendation = strategy.recommendations.find((item) =>
    item.outcomes.includes(outcome.id),
  );
  const reportTab = reportOutcomeTabs[outcome.id];
  const layer = reportTab
    ? "reports"
    : outcome.layer === "strategy"
      ? "morning"
      : outcome.layer;
  return {
    problem: outcome.text,
    gap:
      outcomeGaps[outcome.id] ||
      "This outcome needs a validated baseline and a confirmed workflow owner.",
    response:
      recommendation?.body ||
      "Preserve the signal, affected client, and next action in one reviewable workflow.",
    layer,
    sub: reportTab ? { reportTab } : outcome.sub || {},
    action:
      layer === "reports"
        ? `Open ${reportTab || outcome.sub?.reportTab || "build"} report tab`
        : `Open ${layer === "morning" ? "lifecycle dashboard" : layer === "portal" ? "client portal" : layer === "integrations" ? "integration hub" : "analytics"}`,
    evidence: outcome.id.startsWith("BD-")
      ? "Broker-dealer strategy packet: illustrative persona and synthesis scores. UX response is a proposed interpretation of the mapped recommendation."
      : "Legacy reporting strategy inputs: outcome ratings are retained as directional estimates; a supporting interview dataset is not linked in this prototype.",
    limitation:
      layer === "reports"
        ? "Implemented demo: report configuration and a simulated generation pipeline. Policy approval, retention, and live delivery are not established by this screen."
        : layer === "morning"
          ? "Related demo: the lifecycle dashboard shows synthetic maintenance readiness. The full reporting priority and relationship view remains a proposed extension."
          : "Implemented demo: synthetic data and interactions. Live data, predictive accuracy, and operational outcomes have not been validated.",
  };
}
// This comparison records evidence coverage, not vendor quality or satisfaction.
export const reportingComparisonColumns = [
  "Report design",
  "Batch generation",
  "Client delivery",
  "Access controls",
];
export const reportingCapabilityLevels = {
  direct: {
    label: "Direct",
    description: "Directly documented public capability",
    score: 1,
  },
  strong: {
    label: "Strong",
    description: "Strong adjacent public support",
    score: 0.75,
  },
  partial: {
    label: "Partial",
    description: "Partial or adjacent public support",
    score: 0.5,
  },
  open: {
    label: "Open",
    description: "Not publicly substantiated in retained sources",
    score: 0,
  },
};
const capabilityCell = (level, reference, note) => ({
  level,
  described: reportingCapabilityLevels[level].score >= 0.75,
  score: reportingCapabilityLevels[level].score,
  label: reportingCapabilityLevels[level].label,
  description: reportingCapabilityLevels[level].description,
  reference,
  note,
});
export const reportingComparison = [
  {
    name: "Addepar",
    cells: [
      capabilityCell(
        "strong",
        0,
        "Addepar public material supports reusable report jobs, brand palettes and coordinated reporting workflows. Public detail is stronger on generation than visual template authoring.",
      ),
      capabilityCell(
        "direct",
        0,
        "The Report Schedules API directly documents recurring report schedules with portfolio, frequency, portal-publishing, email-notification and label settings.",
      ),
      capabilityCell(
        "direct",
        0,
        "The Report Generation API directly documents portal publishing and client notification for generated reports.",
      ),
      capabilityCell(
        "direct",
        0,
        "The API documentation directly documents reporting scopes, application permissions, portfolio access and permission failure states.",
      ),
    ],
  },
  {
    name: "Advyzon",
    cells: [
      capabilityCell(
        "direct",
        1,
        "The portfolio-management page directly describes branded report components and configurable performance, allocation and trading content.",
      ),
      capabilityCell(
        "direct",
        1,
        "The portfolio-management page directly describes scheduled batch reports.",
      ),
      capabilityCell(
        "direct",
        2,
        "The client portal page directly describes branded client access, shareable reports and client-facing report content.",
      ),
      capabilityCell(
        "partial",
        1,
        "Advyzon Secure describes role-based permissions, WORM, audit trails and retention policies, but retained public material is adjacent to report-specific entitlements.",
      ),
    ],
  },
  {
    name: "Fidelity (Wealthscape)",
    cells: [
      capabilityCell(
        "strong",
        3,
        "Fidelity public pages describe configurable reports and saved custom portfolio views, but public detail is thinner on a report-design studio.",
      ),
      capabilityCell(
        "open",
        3,
        "Scheduled or batch report generation was not publicly substantiated in the retained Fidelity references.",
      ),
      capabilityCell(
        "partial",
        3,
        "Fidelity describes investor document access and eDelivery, but that is adjacent to custom report delivery rather than proof of generated report distribution.",
      ),
      capabilityCell(
        "partial",
        3,
        "Fidelity describes compliance and operations controls, but the retained public material does not establish report-specific access controls.",
      ),
    ],
  },
  {
    name: "Envestnet Tamarac",
    cells: [
      capabilityCell(
        "direct",
        4,
        "Tamarac help directly describes configurable dynamic reports and configurable PDF report templates.",
      ),
      capabilityCell(
        "direct",
        4,
        "Tamarac help directly describes selecting one or more accounts, groups or households for PDF generation, plus bulk reporting paths.",
      ),
      capabilityCell(
        "direct",
        4,
        "Tamarac help directly describes posting reports to client portals, sending notifications and monitoring delivery status.",
      ),
      capabilityCell(
        "direct",
        4,
        "Tamarac help directly describes report and PDF-template permissions across users, groups, roles and access levels.",
      ),
    ],
  },
  {
    name: "Orion",
    cells: [
      capabilityCell(
        "direct",
        5,
        "Orion support directly describes custom Report Builder, branded themes and firm report templates.",
      ),
      capabilityCell(
        "direct",
        5,
        "Orion support directly describes report batches for multiple clients and privileges to generate report batches.",
      ),
      capabilityCell(
        "direct",
        5,
        "Orion support directly describes generated report portal visibility, statement delivery to portals and PDF distribution.",
      ),
      capabilityCell(
        "direct",
        5,
        "Orion support directly describes report access by login level, role, user, representative, client and broker-dealer.",
      ),
    ],
  },
  {
    name: "Altruist",
    cells: [
      capabilityCell(
        "direct",
        6,
        "Altruist directly describes white-labeled performance summaries, custom reports and advisor-branded performance reporting.",
      ),
      capabilityCell(
        "partial",
        6,
        "Altruist directly describes scheduled white-labeled emails, but retained public material does not prove broad batch PDF generation.",
      ),
      capabilityCell(
        "direct",
        6,
        "Altruist directly describes mobile and desktop portal delivery for performance summaries and investment/activity PDFs.",
      ),
      capabilityCell(
        "partial",
        6,
        "Altruist describes Owner/Admin co-branding authority, but not granular report-specific access controls.",
      ),
    ],
  },
  {
    name: "SS&C Black Diamond",
    cells: [
      capabilityCell(
        "direct",
        7,
        "Black Diamond directly describes report template building and configurable reporting experiences.",
      ),
      capabilityCell(
        "direct",
        7,
        "Black Diamond public material directly describes batch reporting and batch quarterly statements.",
      ),
      capabilityCell(
        "direct",
        7,
        "Black Diamond directly describes portal posting, Vault sharing and client-facing report access.",
      ),
      capabilityCell(
        "partial",
        7,
        "Black Diamond directly describes secure document delivery, but retained public material is adjacent to report-specific entitlements.",
      ),
    ],
  },
  {
    name: "Schwab Advisor Services",
    cells: [
      capabilityCell(
        "direct",
        8,
        "Schwab Portfolio Connect material directly describes standardized report customization, logos, disclaimers and page selection.",
      ),
      capabilityCell(
        "strong",
        8,
        "Schwab Portfolio Connect material describes automatically generated quarterly client reports and batch onboarding for reporting schedules.",
      ),
      capabilityCell(
        "partial",
        8,
        "Schwab public material describes report PDFs generated for distribution and Schwab Alliance document access, but retained sources do not prove portal posting for custom Portfolio Connect reports.",
      ),
      capabilityCell(
        "partial",
        8,
        "Portfolio Connect appears to inherit Schwab Advisor Center account-data access, but retained material does not establish granular report-specific controls.",
      ),
    ],
  },
  {
    name: "BNY Pershing",
    cells: [
      capabilityCell(
        "direct",
        9,
        "BNY pages directly describe customized client reporting, performance reporting and white-labeled advisory experiences.",
      ),
      capabilityCell(
        "partial",
        9,
        "BNY describes automated reporting delivery, but retained public material does not prove scheduled batch generation controls.",
      ),
      capabilityCell(
        "direct",
        9,
        "BNY Wove Investor and NetXInvestor directly describe investor document, performance-data and notification experiences.",
      ),
      capabilityCell(
        "partial",
        9,
        "BNY describes configurable content and features clients can access, but retained public material does not prove granular report-specific entitlements.",
      ),
    ],
  },
];

const reportingCapabilityMapMeta = {
  Addepar: {
    satisfactionProxy: 8.4,
    label: "Addepar",
    labelOffset: [-88, 42],
    position:
      "Addepar’s public reporting APIs support scheduled generation, portal publishing, notifications and permissions, with somewhat less public detail on end-user design tooling.",
    assumption:
      "Advisor satisfaction is directional. Workflow breadth scores public functionality coverage; validate implementation depth with product teardown.",
  },
  Advyzon: {
    satisfactionProxy: 8.2,
    label: "Advyzon",
    labelOffset: [112, -20],
    position:
      "Advyzon’s public reporting, portal and secure-document pages support a broad reporting workflow across design, scheduling and delivery.",
    assumption:
      "Access-control support is adjacent rather than report-specific in the retained public material. Validate entitlements in a product teardown.",
  },
  "Fidelity (Wealthscape)": {
    satisfactionProxy: 7.2,
    label: "Wealthscape",
    brandKey: "Wealthscape",
    labelOffset: [-80, -32],
    position:
      "Wealthscape has a credible configurable-reporting baseline, but the retained public material is thinner on scheduled generation, report delivery and report-specific access controls.",
    assumption:
      "The 7.2 proxy retains the Kitces reporting rating cited in the evidence cards; internal product documentation may change the workflow-breadth score.",
  },
  "Envestnet Tamarac": {
    satisfactionProxy: 8.1,
    label: "Tamarac",
    labelOffset: [88, 34],
    position:
      "Tamarac public help material supports one of the broadest reporting workflows: dynamic/PDF reports, multi-client generation, portal posting and template permissions.",
    assumption:
      "AI Report Studio remains forward-looking or preview evidence, but the core reporting workflow breadth is supported by help documentation.",
  },
  Orion: {
    satisfactionProxy: 8.0,
    label: "Orion",
    labelOffset: [4, 42],
    position:
      "Orion support material supports a broad workflow across report design, batch generation, portal visibility and report access controls.",
    assumption:
      "The satisfaction proxy is directional because retained Orion material is support and vendor content, not a scored satisfaction study.",
  },
  Altruist: {
    satisfactionProxy: 8.05,
    label: "Altruist",
    brandKey: "Altruist",
    labelOffset: [96, 0],
    position:
      "Altruist publicly supports branded reporting and client delivery; scheduling evidence is narrower and access-control evidence is adjacent to co-branding authority.",
    assumption:
      "Confirm feature depth and approval workflow boundaries in a product teardown before reading the point as a complete capability score.",
  },
  "SS&C Black Diamond": {
    satisfactionProxy: 7.85,
    label: "Black Diamond",
    labelOffset: [-96, -40],
    position:
      "Black Diamond publicly supports templates, batch reporting and portal delivery; retained public material is weaker on report-specific entitlements.",
    assumption:
      "Workflow breadth is functional coverage from public references. It does not prove implementation quality, support burden or advisor preference.",
  },
  "Schwab Advisor Services": {
    satisfactionProxy: 7.7,
    label: "Schwab",
    brandKey: "Schwab",
    labelOffset: [-86, 48],
    position:
      "Schwab Portfolio Connect public material supports report customization and recurring quarterly report generation; delivery and controls are more limited in public references.",
    assumption:
      "The point is a custody-platform proxy. Retained sources do not isolate reporting-specific advisor satisfaction or granular report entitlements.",
  },
  "BNY Pershing": {
    satisfactionProxy: 6.85,
    label: "BNY Pershing",
    brandKey: "Pershing",
    labelOffset: [-28, -54],
    position:
      "BNY Pershing public pages support white-labeled client reporting and investor delivery; batch generation and report-specific access controls are less directly documented.",
    assumption:
      "Forward-looking Wove / NetX material should be confirmed with the provider before treating the functional breadth as production coverage.",
  },
};

export const reportingCapabilityMap = reportingComparison.map((row, rowIndex) => {
  const directCount = row.cells.filter((cell) => cell.level === "direct").length;
  const supportedCount = row.cells.filter((cell) => cell.score > 0).length;
  const workflowBreadth = row.cells.reduce((sum, cell) => sum + cell.score, 0);
  const defaultColumn = Math.max(
    0,
    row.cells.findIndex((cell) => cell.score > 0),
  );
  const meta = reportingCapabilityMapMeta[row.name];
  return {
    row: rowIndex,
    name: row.name,
    label: meta.label,
    brandKey: meta.brandKey,
    satisfactionProxy: meta.satisfactionProxy,
    capabilityScore: workflowBreadth,
    directCount,
    supportedCount,
    totalCapabilities: reportingComparisonColumns.length,
    defaultColumn,
    labelOffset: meta.labelOffset,
    position: meta.position,
    assumption: meta.assumption,
  };
});

export function reportingQuadrant(outcome) {
  if (outcome.imp >= 5)
    return outcome.sat < 5 ? "Underserved opportunity" : "Table stakes";
  return outcome.sat < 5 ? "Lower priority" : "Overserved";
}
// Coordinates preserve source values. Label displacement prevents overlapping
// buttons; the chart retains an anchor and leader line to each exact coordinate.
export function reportingPlot(outcomes, zoom = false) {
  const bounds = zoom
    ? {
        xMin: Math.max(
          0,
          Math.floor(Math.min(...outcomes.map((o) => o.sat))) - 0.5,
        ),
        xMax: Math.min(
          10,
          Math.ceil(Math.max(...outcomes.map((o) => o.sat))) + 0.5,
        ),
        yMin: Math.max(
          0,
          Math.floor(Math.min(...outcomes.map((o) => o.imp))) - 0.5,
        ),
        yMax: 10,
      }
    : { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
  const points = [];
  for (const outcome of outcomes) {
    const x =
      70 + ((outcome.sat - bounds.xMin) / (bounds.xMax - bounds.xMin)) * 480;
    const y =
      365 - ((outcome.imp - bounds.yMin) / (bounds.yMax - bounds.yMin)) * 300;
    let label = { x, y };
    outer: for (let ring = 0; ring < 12; ring++) {
      for (let angle = 0; angle < 8; angle++) {
        const candidate = {
          x: Math.max(
            82,
            Math.min(538, x + Math.cos((angle * Math.PI) / 4) * ring * 29),
          ),
          y: Math.max(
            77,
            Math.min(353, y + Math.sin((angle * Math.PI) / 4) * ring * 29),
          ),
        };
        if (
          points.every(
            (point) =>
              Math.hypot(
                point.label.x - candidate.x,
                point.label.y - candidate.y,
              ) >= 28,
          )
        ) {
          label = candidate;
          break outer;
        }
      }
    }
    points.push({
      id: outcome.id,
      x,
      y,
      label,
      quadrant: reportingQuadrant(outcome),
    });
  }
  return { bounds, points };
}

export const reportingJourney = [
  {
    step: "Define",
    label: "Agree the reporting need",
    tone: "neutral",
    client:
      "A review date, market event, or client question creates a reporting request.",
    operations:
      "Confirm audience, period, accounts, and purpose before work begins.",
    friction: "An unclear brief becomes a late scope change.",
    handoff: "Advisor → reporting owner: a written scope and due date.",
    response:
      "Capture audience, account scope, and report type in the builder.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Define report scope",
    proof: "Agreed scope, reporting period, recipient, and accountable owner.",
  },
  {
    step: "Locate",
    label: "Find the right inputs",
    tone: "friction",
    client: "The client expects the report to explain the whole relationship.",
    operations:
      "Locate positions, prices, transactions, and account context for the agreed period.",
    friction:
      "Missing or inconsistent inputs send the team back to source systems.",
    handoff:
      "Reporting owner → data owner: a list of required and missing inputs.",
    response:
      "Show source coverage and mapping before the report is assembled.",
    layer: "integrations",
    action: "Inspect source mapping",
    proof: "Input inventory with source, as-of time, coverage, and exceptions.",
  },
  {
    step: "Prepare",
    label: "Assemble a consistent draft",
    tone: "friction",
    client: "The report should use familiar branding and relevant sections.",
    operations: "Apply a reusable template to reconciled data.",
    friction: "Repeated exports and manual formatting create rework.",
    handoff:
      "Data owner → report preparer: an accepted input set and unresolved exceptions.",
    response:
      "Keep report composition, data choices, and reusable sections in one workspace.",
    layer: "reports",
    sub: { reportTab: "build" },
    action: "Assemble the report",
    proof: "Template version, selected sections, and accepted input set.",
  },
  {
    step: "Confirm",
    label: "Resolve review friction",
    tone: "friction",
    client:
      "The explanation needs to fit the client’s account and product context.",
    operations:
      "Confirm data completeness, disclosures, narrative accuracy, and review ownership.",
    friction:
      "A reviewer may return the draft without a clear correction owner.",
    handoff:
      "Preparer → reviewer → correction owner: a specific issue and resolution record.",
    response: "Keep the draft, review context, and requested changes together.",
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Review report content",
    proof:
      "Named reviewer, completed checks, exceptions, and approval decision.",
  },
  {
    step: "Execute",
    label: "Generate the output",
    tone: "positive",
    client: "The client is waiting for a usable, consistent report.",
    operations: "Generate from the reviewed inputs and retain a run record.",
    friction: "An opaque failure can trigger another manual rebuild.",
    handoff:
      "Reviewer → report operator: the approved version and generation status.",
    response:
      "Make pipeline stages and failures inspectable; retain the output version.",
    layer: "reports",
    sub: { reportTab: "generate" },
    action: "Inspect generation",
    proof: "Input and output versions, run status, and generation history.",
  },
  {
    step: "Monitor",
    label: "Check delivery readiness",
    tone: "neutral",
    client: "The client needs to know what is ready and what needs follow-up.",
    operations: "Track completion, exceptions, and delivery status separately.",
    friction: "A completed job may be mistaken for a delivered or read report.",
    handoff:
      "Report operator → advisor: output status and outstanding delivery work.",
    response:
      "Separate processing status from client engagement; define pilot measures.",
    layer: "insights",
    action: "Inspect monitoring concepts",
    proof:
      "Definitions and records for generated, reviewed, delivered, and viewed states.",
  },
  {
    step: "Modify",
    label: "Revise with context",
    tone: "friction",
    client: "A client question or review finding requires a correction.",
    operations:
      "Change the relevant content while preserving the reason and review history.",
    friction:
      "Corrections can create competing versions or repeat earlier checks.",
    handoff:
      "Advisor / reviewer → preparer: requested change, owner, and due date.",
    response:
      "Revise the report in context and route material changes through review again.",
    layer: "reports",
    sub: { reportTab: "customize" },
    action: "Revise the report",
    proof: "Change reason, new version, and renewed review where required.",
  },
  {
    step: "Conclude",
    label: "Deliver and follow through",
    tone: "positive",
    client: "The client reads the explanation and asks the next question.",
    operations: "Deliver the approved version and assign follow-up ownership.",
    friction:
      "A static attachment can separate the conversation from its evidence.",
    handoff:
      "Advisor → client → advisor: report context and a traceable next action.",
    response:
      "Present the report in the client portal with contextual follow-up.",
    layer: "portal",
    action: "Inspect client delivery",
    proof:
      "Approved output, delivery record, follow-up owner; live receipt is outside this demo.",
  },
];

// v2 evidence is separated from strategic interpretations and synthetic pilots.
