import StrategyExecutiveSummary, { StrategySectionFinding } from "./StrategyExecutiveSummary.jsx";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Columns3,
  Users,
  Route,
  ChartScatter,
  Lightbulb,
  Milestone,
  Workflow,
  ShieldCheck,
  GitBranch,
  Database,
  ArrowRight,
  FlaskConical,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";
import { LifecycleResearch, outcomes } from "./LifecycleExperience";
import MaintenanceOutcomes from "./MaintenanceOutcomes.jsx";
import StrategyEvidenceOperations from "./StrategyEvidenceOperations.jsx";
import { visibleCases } from "./AccountMaintenance";
import { normalizeOutcomeSelection } from "./maintenanceOutcomeSolutions.js";

const sources = {
  altruist: ["Altruist · April 2024", "https://altruist.com/news/april-2024/"],
  kitces: [
    "Kitces 2025 research",
    "https://www.kitces.com/kitces-report-independent-financial-advisor-technology-fintech-software-tools-research-2025/",
  ],
  t3: [
    "T3 / Inside Information 2026",
    "https://t3technologyhub.com/wp-content/uploads/2026/03/2026-T3-Inside-Information-Software-Survey.pdf",
  ],
  schwab: [
    "Schwab digital workflows",
    "https://advisorservices.schwab.com/whats-new/account-management/digital-workflows",
  ],
  supervision: [
    "FINRA 3110",
    "https://www.finra.org/rules-guidance/rulebooks/finra-rules/3110",
  ],
  investmentNewsCustody: [
    "InvestmentNews · RIA custodian comparison",
    "https://www.investmentnews.com/goria/custodian/ria-custodian-comparison-which-one-is-right-for-you/250320",
  ],
  investmentNewsChallengers: [
    "InvestmentNews · RIA custodian challengers",
    "https://www.investmentnews.com/goria/custodian/altruists-hazel-ai-tax-planning-tool-sparks-market-selloff-in-ria-custodians/265993",
  ],
  altruistT3: [
    "Altruist · T3 custody signal",
    "https://altruist.com/insights/2024-t3-survey/",
  ],
  vanguardAltruist: [
    "Vanguard · Altruist acquisition",
    "https://corporate.vanguard.com/content/corporatesite/us/en/corp/who-we-are/pressroom/press-release-vanguard-announcement-082626.html",
  ],
  apexFintech: [
    "Apex Fintech · assets under custody",
    "https://apexfintechsolutions.com/",
  ],
  axos: [
    "Axos Financial · custody and administration",
    "https://investors.axosfinancial.com/corporate-profile/",
  ],
  robinhoodTradePmr: [
    "Robinhood · TradePMR acquisition",
    "https://robinhood.com/us/en/newsroom/robinhood-to-acquire-tradepmr/",
  ],
  pershingClearing: [
    "BNY Pershing · clearing and custody",
    "https://www.pershing.com/content/pershing/us/en/solutions/clearing-custody-and-settlement.html",
  ],
  fidelityPrime: [
    "Fidelity Prime · clearing and custody scale",
    "https://prime.fidelity.com/",
  ],
  firstClearing: [
    "Wells Fargo · First Clearing",
    "https://newsroom.wf.com/news-releases/news-details/2026/First-Clearing-to-Provide-Clearing-and-Custody-Services-for-Brean-Capitals-Retail-Equity-Sales-and-Trading-Business/default.aspx",
  ],
  wedbush: [
    "Wedbush · clearing and execution",
    "https://www.wedbush.com/clearing-execution-overview/",
  ],
};
const confidenceSourceRefs = {
  accountFrames: ["Account Maintenance Frames", "#maintenance-research-6"],
  executiveStudy: ["Executive study", "#maintenance-research-6"],
  advisorForum: ["Advisor forum synthesis", "#maintenance-research-6"],
  customerThemes: ["Customer research themes", "#maintenance-research-6"],
  outcomeSynthesis: ["Outcome synthesis", "#maintenance-research-6"],
  outcomeSegments: ["Outcome segments", "#maintenance-research-4"],
  jobMap: ["Job map", "#maintenance-research-5"],
  capabilityComparison: ["Capability comparison", "#maintenance-research-2"],
  recommendations: ["Recommendation dependencies", "#maintenance-research-7"],
  roadmap: ["Resolution roadmap", "#maintenance-research-8"],
  internalQuestions: ["Internal discovery questions", "#maintenance-research-9"],
  syntheticWorkflow: ["Synthetic prototype workflow", "#maintenance-research-7"],
  odiMethod: ["ODI method framing", "#maintenance-research-4"],
  strategyFindings: ["Strategy section findings", "#maintenance-executive-heading"],
};
function getConfidenceSource(ref) {
  const source = sources[ref] || confidenceSourceRefs[ref];
  if (!source) {
    return [ref, "#maintenance-research-6"];
  }
  return source;
}
function scrollToMaintenanceTarget(href) {
  if (!href?.startsWith("#") || typeof document === "undefined") {
    return;
  }
  const target = document.getElementById(href.slice(1));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
const sections = [
  { id: 1, label: "Market research", icon: BookOpen, tone: "research" },
  { id: 2, label: "Capability comparison", icon: Columns3, tone: "research" },
  { id: 3, label: "Customer research", icon: Users, tone: "research" },
  {
    id: 4,
    label: "Outcomes & opportunities",
    icon: ChartScatter,
    tone: "research",
  },
  { id: 5, label: "Job map", icon: Route, tone: "derived" },
  { id: 0, label: "Findings & takeaways", icon: Lightbulb, tone: "derived" },
  { id: 9, label: "Assumptions & next steps", icon: ClipboardCheck, tone: "decision" },
  { id: 7, label: "Recommendations", icon: Milestone, tone: "decision" },
  { id: 8, label: "Resolution strategy", icon: Workflow, tone: "decision" },
  { id: 6, label: "Source appendix", icon: ShieldCheck, tone: "appendix" },
];
function Evidence({ slide, links = [], children }) {
  return (
    <aside className="mr-evidence" aria-label="Source attribution">
      <div className="mr-evidence-line">
        <span className="mr-evidence-label">Source attribution</span>
        <span>
          Account maintenance executive study · slides {slide}
        </span>
        {links.length > 0 && <span>{links.length} public source links</span>}
        <button
          className="mr-evidence-appendix-link"
          onClick={() => scrollToMaintenanceTarget("#maintenance-research-6")}
          type="button"
        >
          Source appendix
        </button>
      </div>
      {links.length > 0 && (
        <details className="mr-source-link-details">
          <summary>View source links</summary>
          <div className="mr-source-links">
            {links.map((key) => (
              <a key={key} href={sources[key][1]} target="_blank" rel="noreferrer">
                {sources[key][0]} ↗
              </a>
            ))}
          </div>
        </details>
      )}
    </aside>
  );
}
function ConfidenceSourceLinks({ refs = [] }) {
  if (!refs.length) {
    return null;
  }
  return (
    <div className="mr-confidence-trace-links">
      {refs.map((ref) => {
        const [label, href] = getConfidenceSource(ref);
        const external = href.startsWith("http");
        return external ? (
          <a
            key={`${ref}-${href}`}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {label} ↗
          </a>
        ) : (
          <button
            key={`${ref}-${href}`}
            onClick={() => scrollToMaintenanceTarget(href)}
            type="button"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
function SectionConfidence({ sectionId }) {
  const confidence = sectionConfidenceScores[sectionId];
  if (!confidence) {
    return null;
  }
  return (
    <details className="mr-section-confidence">
      <summary aria-label={`Inspect evidence confidence breakdown: ${confidence.score} out of 100`}>
        <span>Confidence</span>
        <strong>{confidence.score}</strong>
        <ChevronDown size={15} aria-hidden="true" />
      </summary>
      <div className="mr-section-confidence-panel">
        <div className="mr-confidence-dimensions" aria-label="Confidence dimension breakdown">
          {confidence.dimensions.map(([label, value, why, refs = []]) => (
            <article key={label}>
              <div className="mr-confidence-dimension-head">
                <span>{label}</span>
                <strong>{value}%</strong>
              </div>
              <div className="mr-confidence-bar" aria-hidden="true">
                <span style={{ width: `${value}%` }} />
              </div>
              <p>{why}</p>
              <ConfidenceSourceLinks refs={refs} />
            </article>
          ))}
        </div>
      </div>
    </details>
  );
}
function Cards({ rows, icons = [Lightbulb], personas = false }) {
  return (
    <div className={`mr-cards ${personas ? "mr-personas" : ""}`}>
      {rows.map(([title, text], index) => {
        const Icon = icons[index % icons.length];
        return (
          <article key={title}>
            <div className="mr-card-identity">
              <span className="mr-widget-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
            </div>
            <p>{text}</p>
          </article>
        );
      })}
    </div>
  );
}

const sourceConfidencePillars = [
  {
    label: "Customer proximity",
    weight: "40%",
    signal: "Closest to the work",
    body: "Internal telemetry, workflow observation, interviews, support cases, and direct customer behavior rank above broad market commentary or secondhand anecdotes.",
  },
  {
    label: "Source reputation",
    weight: "35%",
    signal: "Trusted enough to cite",
    body: "Regulatory material, audited filings, Fidelity-approved research, primary vendor documentation, and reputable advisor-tech research receive higher weight than unsourced media or forum claims.",
  },
  {
    label: "Signal convergence",
    weight: "25%",
    signal: "More than one source agrees",
    body: "A finding strengthens when independent sources point to the same pattern. A single weak source can open a question, but it cannot carry a recommendation by itself.",
  },
];

const sourceTierRows = [
  [
    "Tier 1",
    "Fidelity and customer evidence",
    "Telemetry, workflow observation, interviews, support cases, approved internal studies",
    "Can support pilot gates after business, legal, compliance and data-owner review.",
  ],
  [
    "Tier 2",
    "Primary public evidence",
    "Regulatory rules, SEC/FINRA material, audited filings, primary vendor documentation",
    "Can support market framing, requirement hypotheses and control questions.",
  ],
  [
    "Tier 3",
    "Independent market research",
    "T3, Kitces, Cerulli-style research, reputable trade research, analyst surveys",
    "Can support directional market signal and opportunity sizing context.",
  ],
  [
    "Tier 4",
    "Anecdotal and open-web signal",
    "Forums, Reddit, media commentary, customer complaints, unverified posts",
    "Can generate discovery questions only until corroborated by stronger evidence.",
  ],
];

const sourceGovernanceFlow = [
  ["Ingest", "Capture the source, date, publisher, claim, URL, affected section and proposed implication."],
  ["Classify", "Assign proximity and source-tier labels so a forum theme is not treated like customer telemetry."],
  ["Score", "Rate customer proximity, reputation and convergence; weak or single-source claims stay provisional."],
  ["Transform", "Promote supported claims into findings, outcomes, recommendations or validation questions."],
  ["Challenge", "Evidence agent checks citation reachability, claim-source fit, recency, contradictions and unsupported leaps."],
  ["Approve", "Human reviewer confirms the claim, confidence score and intended audience before production use."],
];

const sourceReviewReceipts = [
  ["Claim-source match", "The cited material must actually support the sentence in the strategy section."],
  ["Corroboration check", "Material recommendations need more than one independent signal or a documented reason for exception."],
  ["Audience gate", "Internal hypotheses, client-ready statements and procurement claims use different evidence thresholds."],
  ["Promotion rule", "Low-confidence items remain validation questions instead of being rewritten as conclusions."],
];

const sourceChallengeChecks = [
  [
    "Claim ledger",
    "Every insight is stored as a claim with source links, source type, confidence inputs, section use and approval state.",
    "Build now",
  ],
  [
    "Citation check",
    "Reject broken links, vague citations and claims that cannot be traced to the cited material.",
    "Build now",
  ],
  [
    "Source-fit check",
    "Confirm the source can support the specific claim. Market reports can frame context; they cannot stand in for Fidelity telemetry.",
    "Build now",
  ],
  [
    "Convergence check",
    "Flag claims carried by one weak source. Promote only when independent evidence points to the same signal.",
    "Build now",
  ],
  [
    "Boundary check",
    "Label synthetic prototype behavior, derived synthesis, licensed research and approval-gated internal needs before they appear in strategy.",
    "Build now",
  ],
  [
    "Approval lock",
    "Keep Fidelity telemetry and formal ODI survey work locked until executive, legal, compliance and data-owner approvals are attached.",
    "Locked",
  ],
];

const sourceAppendixNotes = [
  [
    "Market research",
    "Market figures combine RIA custody snapshots, clearing firm disclosures, and directional challenger signals. Public sources do not publish a complete, like-for-like market-share model for every custody and clearing firm, so proxy points are used only to frame operating comparators.",
  ],
  [
    "Capability comparison",
    "The positioning map retains the Account Maintenance Frames snapshot. T3 satisfaction is a survey snapshot; public maintenance capability is an assessment, not a measured feature-completeness score.",
  ],
  [
    "Customer research",
    "Functional, social, and emotional needs are discovery context for the evidenced RIA advisor persona. The source packet does not directly study client service associates or home-office reviewers.",
  ],
  [
    "Outcomes & opportunities",
    "The outcome map applies ODI opportunity logic to directional proxy scores. A formal ODI study should survey importance and satisfaction, then use factor and cluster analysis before final prioritization.",
  ],
  [
    "Job map",
    "The job map is a derived sequence and assessed journey, not a completed ODI job map. Curve height and progress symbols are illustrative, not measured satisfaction, reported sentiment, or confidence.",
  ],
  [
    "Recommendations",
    "Recommendation weights express judgment. Dependency overrides rank, phase timing is an estimate, and internal cost, volume, maintenance NIGO, and CSA time remain missing.",
  ],
  [
    "Resolution strategy",
    "Resolution options are proposed synthesis. The options are a workshop starting point, not findings about existing platform maturity or approved vendor decisions.",
  ],
];

const sectionConfidenceScores = {
  1: {
    score: 70,
    tier: "Directional confidence",
    summary: "Strong market context, but the maintenance-specific operating baseline still needs Fidelity telemetry.",
    dimensions: [
      ["Customer proximity", 55, "Advisor-tech surveys, custodian scale references, and market disclosures describe the environment; they are not direct maintenance workflow telemetry.", ["t3", "kitces", "investmentNewsCustody"]],
      ["Source reputation", 82, "T3, Kitces, InvestmentNews, FINRA, and firm-published custody/clearing sources are reputable enough for directional framing.", ["t3", "kitces", "supervision", "fidelityPrime"]],
      ["Signal convergence", 78, "Multiple sources point to service quality, integration pressure, and scale concentration as relevant market signals.", ["investmentNewsCustody", "investmentNewsChallengers", "apexFintech", "pershingClearing"]],
    ],
    sources: ["t3", "kitces", "supervision", "investmentNewsCustody", "fidelityPrime", "pershingClearing"],
  },
  2: {
    score: 60,
    tier: "Directional confidence",
    summary: "Public documentation supports capability hypotheses, but it does not prove full feature completeness.",
    dimensions: [
      ["Customer proximity", 42, "Vendor help and release material describe available workflows; they are one step removed from advisor behavior.", ["schwab", "altruist", "accountFrames"]],
      ["Source reputation", 76, "Primary vendor documentation and T3 survey context are credible, but not equivalent to measured product testing.", ["schwab", "altruist", "t3"]],
      ["Signal convergence", 68, "Schwab, Altruist, Fidelity, and T3 signals converge around guided workflows, status, records, and service visibility.", ["schwab", "altruist", "t3", "accountFrames"]],
    ],
    sources: ["schwab", "altruist", "t3", "accountFrames"],
  },
  3: {
    score: 60,
    tier: "Directional confidence",
    summary: "The advisor-facing pain is plausible and repeated, while operating personas still require primary research.",
    dimensions: [
      ["Customer proximity", 58, "The persona is grounded in advisor-facing forum and survey themes, but not a completed interview study.", ["advisorForum", "customerThemes"]],
      ["Source reputation", 60, "The evidence combines reputable advisor research with open-web themes, so it should frame discovery rather than requirements.", ["t3", "kitces", "advisorForum"]],
      ["Signal convergence", 62, "Authority, waiting, and confirmation appear across the synthesized material as recurring friction themes.", ["customerThemes", "advisorForum", "outcomeSynthesis"]],
    ],
    sources: ["t3", "kitces", "advisorForum", "customerThemes"],
  },
  4: {
    score: 57,
    tier: "Directional confidence",
    summary: "The opportunity pattern is useful for strategy, but the ODI scores remain proxy inputs until a survey is run.",
    dimensions: [
      ["Customer proximity", 50, "Outcome statements connect to advisor pain themes, but importance and satisfaction have not been measured by segment.", ["customerThemes", "outcomeSynthesis"]],
      ["Source reputation", 65, "The Account Maintenance Frames deck and advisor-tech sources provide a traceable basis for directional scoring.", ["accountFrames", "t3", "kitces"]],
      ["Signal convergence", 58, "Several outcomes cluster around exception control and authority, but factor and cluster analysis are still missing.", ["outcomeSynthesis", "customerThemes", "odiMethod"]],
    ],
    sources: ["accountFrames", "t3", "kitces", "odiMethod"],
  },
  5: {
    score: 53,
    tier: "Derived confidence",
    summary: "The job map is a structured synthesis of evidence, not a validated ODI job map.",
    dimensions: [
      ["Customer proximity", 44, "The sequence reflects observed friction themes and workflow logic, not measured journey frequency.", ["customerThemes", "jobMap"]],
      ["Source reputation", 62, "The executive deck is traceable, but this portion is a derived interpretation from the research packet.", ["executiveStudy", "accountFrames"]],
      ["Signal convergence", 56, "The sequence aligns with authority, waiting, and completion themes across sections, but needs workflow observation.", ["customerThemes", "outcomeSynthesis", "jobMap"]],
    ],
    sources: ["executiveStudy", "customerThemes", "outcomeSynthesis"],
  },
  0: {
    score: 58,
    tier: "Synthesis confidence",
    summary: "The cross-section finding is consistent across the deck, but it depends on internal baselines before funding scale.",
    dimensions: [
      ["Customer proximity", 46, "The finding combines market, capability, customer, and outcome evidence rather than one measured operating dataset.", ["customerThemes", "outcomeSynthesis", "internalQuestions"]],
      ["Source reputation", 68, "The underlying sources are attributable and mostly reputable, with clear boundaries for inferred claims.", ["accountFrames", "t3", "kitces", "schwab"]],
      ["Signal convergence", 64, "Multiple sections point to validation, exception ownership, and completion proof as shared prerequisites.", ["capabilityComparison", "outcomeSynthesis", "jobMap", "recommendations"]],
    ],
    sources: ["investmentNewsCustody", "capabilityComparison", "outcomeSynthesis", "jobMap"],
  },
  9: {
    score: 51,
    tier: "Validation confidence",
    summary: "The controls are the right approval questions, but the answers require internal owners and measured baselines.",
    dimensions: [
      ["Customer proximity", 38, "The assumptions identify missing Fidelity-specific inputs rather than supplying those inputs.", ["internalQuestions", "executiveStudy"]],
      ["Source reputation", 66, "The assumptions are tied to the executive study and ODI method discipline, but need internal confirmation.", ["executiveStudy", "odiMethod"]],
      ["Signal convergence", 52, "The same gaps recur across sections: demand, architecture, controls, economics, and research validity.", ["strategyFindings", "recommendations", "roadmap"]],
    ],
    sources: ["executiveStudy", "odiMethod", "strategyFindings"],
  },
  7: {
    score: 53,
    tier: "Recommendation confidence",
    summary: "The recommendation is coherent, but it should stay gated until internal economics and ODI validation are complete.",
    dimensions: [
      ["Customer proximity", 40, "The recommendation uses directional outcomes and synthetic prototype behavior, not observed production performance.", ["outcomeSegments", "syntheticWorkflow", "internalQuestions"]],
      ["Source reputation", 64, "The evidence base is attributable, with explicit boundaries around what has and has not been validated.", ["accountFrames", "t3", "kitces"]],
      ["Signal convergence", 58, "Exception control, household authority, and completion proof recur across market, capability, job-map, and outcome sections.", ["outcomeSegments", "jobMap", "capabilityComparison"]],
    ],
    sources: ["outcomeSegments", "jobMap", "capabilityComparison", "syntheticWorkflow"],
  },
  8: {
    score: 48,
    tier: "Decision confidence",
    summary: "The sourcing options are a decision frame, not a vendor or build recommendation.",
    dimensions: [
      ["Customer proximity", 35, "The section depends on internal platform, data, cost, compliance, and support facts that still need discovery.", ["internalQuestions", "roadmap"]],
      ["Source reputation", 62, "The option set follows a defensible sourcing logic, but it is not supported by completed internal architecture review.", ["executiveStudy", "recommendations"]],
      ["Signal convergence", 50, "Reuse, build, partner, and acquire options map to recurring gaps, but require workshop validation.", ["capabilityComparison", "recommendations", "roadmap"]],
    ],
    sources: ["recommendations", "roadmap", "capabilityComparison", "internalQuestions"],
  },
};

const maintenanceAssumptions = [
  [
    "Demand and servicing model",
    "Validate request volumes, failure points and differences across custody, clearing and assisted servicing. Fidelity's organizational complexity and handoffs may change the priority order.",
  ],
  [
    "Systems, data and economics",
    "Confirm technology debt, account and party data constraints, authority records, reusable services, support burden and cost-to-integrate.",
  ],
  [
    "Controls and accountability",
    "Validate the compliance process and security architecture for permissions, authority, review and evidence retention. Name operating ownership for exceptions and support.",
  ],
  [
    "ODI research validity",
    "Treat current scores as directional synthesis. Run a desired-outcome survey, then apply factor and cluster analysis before final prioritization.",
  ],
];

const maintenanceNextSteps = [
  [
    "Establish an internal baseline",
    "Observe service associates, advisors and home-office reviewers. Measure assisted volume, incomplete submissions, rework and time to resolution by request type.",
  ],
  [
    "Run ODI validation research",
    "Translate candidate outcomes into stable, solution-neutral desired-outcome statements. Survey importance and satisfaction, then analyze segments before locking the map.",
  ],
  [
    "Assess the servicing architecture",
    "Map account identity, authority, validators and audit services with engineering and data owners. Compare reuse, build and partner costs against constraints.",
  ],
  [
    "Scope one accountable pilot",
    "Choose a bounded maintenance request and servicing population. Agree on ownership, escalation, compliance review and security requirements before connecting systems.",
  ],
  [
    "Make the scale decision",
    "Set success and stop thresholds against the baseline. At the ninety-day gate, review completion quality, support burden and cost before extending to household authority.",
  ],
];

const maintenanceConfidencePlan = [
  [
    "Internal telemetry connectors",
    "Ingest request volume, NIGO reasons, repeat handling, owner handoffs, cycle time, effort, escalations, correction cost and completion proof after approval.",
    "Locked: executive data approval",
    "locked",
  ],
  [
    "Formal ODI analytics module",
    "Support desired-outcome statements, importance and satisfaction survey imports, factor analysis, cluster analysis and opportunity-map scoring after research approval.",
    "Locked: research approval",
    "locked",
  ],
  [
    "Confidence backlog service",
    "Flag any section score below 70, any dimension below 50, or any claim with weak traceability. Route each gap to an owner, source need and graduation rule.",
    "Build now: public-safe",
    "build",
  ],
  [
    "Claim ledger",
    "Version each claim, source, score input, model rule, challenge result and approval event so recommendations can be audited back to evidence.",
    "Build now: public-safe",
    "build",
  ],
  [
    "Evidence challenge agents",
    "Run checks for citation reachability, claim-source fit, contradictions, source independence, recency, synthetic labels and required approval before publication.",
    "Build now: public-safe",
    "build",
  ],
  [
    "Peer benchmark repository",
    "Store public documentation, demos, sandbox notes, RFI responses and implementation findings against Schwab, Pershing, LPL, Altruist, Apex, Axos, TradePMR and clearing-side peers.",
    "Build next: public and licensed",
    "next",
  ],
  [
    "Paid research provider layer",
    "Add licensed-upload workflows for Cerulli, Datos Insights, Aite-Novarica, Celent, Forrester, Gartner, Coalition Greenwich, J.D. Power, T3 and Kitces.",
    "Build next: entitlement required",
    "next",
  ],
  [
    "Research evidence intake",
    "Add structured intake for approved interview notes, observation logs, usability sessions and task diaries so primary research can update the same ledger.",
    "Approval-gated input",
    "next",
  ],
  [
    "Prediction calibration loop",
    "Compare recommendations against later pilot telemetry, adoption, support burden, control defects and cost outcomes. Use the result to recalibrate the model.",
    "Post-pilot",
    "future",
  ],
];

function SourceConfidenceSystem() {
  const [activeSourceView, setActiveSourceView] = useState("score");
  const tabs = [
    ["score", "Scoring model"],
    ["tiers", "Source tiers"],
    ["flow", "Governance path"],
    ["challenge", "Challenge layer"],
    ["operations", "Ops ledger"],
    ["receipts", "Review receipts"],
    ["notes", "Section notes"],
  ];
  return (
    <section className="mr-source-confidence" aria-labelledby="source-confidence-heading">
      <div className="mr-source-confidence-head">
        <div>
          <span className="am-eyebrow">Evidence appendix</span>
          <h3 id="source-confidence-heading">
            Evidence has to earn its way into the strategy.
          </h3>
          <p>
            Use this appendix to inspect how source strength, confidence and
            review controls sit behind the strategy narrative.
          </p>
        </div>
        <div className="mr-source-confidence-score" aria-label="Confidence score inputs">
          <strong>Confidence score</strong>
          <span>Customer proximity + reputation + convergence</span>
        </div>
      </div>
      <div className="mr-source-tabs" role="tablist" aria-label="Source appendix views">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeSourceView === id}
            onClick={() => setActiveSourceView(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mr-source-panel">
        {activeSourceView === "score" && (
          <div className="mr-source-pillars" aria-label="Source confidence factors">
            {sourceConfidencePillars.map((pillar) => (
              <article key={pillar.label}>
                <div>
                  <span>{pillar.weight}</span>
                  <h4>{pillar.label}</h4>
                </div>
                <strong>{pillar.signal}</strong>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        )}
        {activeSourceView === "tiers" && (
          <div className="mr-source-ladder" aria-label="Source tier ladder">
            <div className="mr-source-ladder-title">
              <Database size={18} aria-hidden="true" />
              <div>
                <span className="am-eyebrow">Source tiers</span>
                <h4>What the tool treats as stronger evidence</h4>
              </div>
            </div>
            <div className="mr-source-tier-list">
              {sourceTierRows.map(([tier, title, examples, use]) => (
                <article key={tier}>
                  <span className="mr-source-tier-badge">{tier}</span>
                  <div>
                    <h5>{title}</h5>
                    <p>{examples}</p>
                  </div>
                  <strong>{use}</strong>
                </article>
              ))}
            </div>
          </div>
        )}
        {activeSourceView === "flow" && (
          <div className="mr-source-flow" aria-label="Evidence governance flow">
            <div className="mr-source-flow-title">
              <GitBranch size={18} aria-hidden="true" />
              <div>
                <span className="am-eyebrow">Governance path</span>
                <h4>From source intake to production-ready output</h4>
              </div>
            </div>
            <div className="mr-source-flow-steps">
              {sourceGovernanceFlow.map(([step, text], index) => (
                <article key={step}>
                  <span>{index + 1}</span>
                  <h5>{step}</h5>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {activeSourceView === "challenge" && (
          <div className="mr-source-challenge" aria-label="Evidence challenge layer">
            <div className="mr-source-flow-title">
              <ShieldCheck size={18} aria-hidden="true" />
              <div>
                <span className="am-eyebrow">Public-safe challenge layer</span>
                <h4>Raise confidence without using Fidelity internal data</h4>
              </div>
            </div>
            <div className="mr-source-challenge-grid">
              {sourceChallengeChecks.map(([title, text, status]) => (
                <article key={title} className={status === "Locked" ? "is-locked" : ""}>
                  <span>{status}</span>
                  <h5>{title}</h5>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        )}
        {activeSourceView === "operations" && (
          <StrategyEvidenceOperations defaultTrack="maintenance" />
        )}
        {activeSourceView === "receipts" && (
          <div className="mr-source-review">
            <div>
              <span className="mr-widget-icon">
                <ClipboardCheck size={18} aria-hidden="true" />
              </span>
              <div>
                <span className="am-eyebrow">Challenge review receipts</span>
                <h4>What leadership should see before the work is client-facing</h4>
              </div>
            </div>
            <dl>
              {sourceReviewReceipts.map(([title, text]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {activeSourceView === "notes" && (
          <div className="mr-source-notes" aria-label="Section source notes">
            {sourceAppendixNotes.map(([sectionTitle, note]) => (
              <article key={sectionTitle}>
                <h4>{sectionTitle}</h4>
                <p>{note}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AssumptionsAndNextSteps() {
  const [activeGuidance, setActiveGuidance] = useState("assumptions");
  const rows =
    activeGuidance === "assumptions"
      ? maintenanceAssumptions
      : activeGuidance === "confidence"
        ? maintenanceConfidencePlan
        : maintenanceNextSteps;
  return (
    <section className="mr-guidance" aria-labelledby="maintenance-guidance-heading">
      <div className="mr-guidance-head">
        <div>
          <span className="am-eyebrow">Decision controls</span>
          <h3 id="maintenance-guidance-heading">
            Validate the assumptions before treating the strategy as executable.
          </h3>
        </div>
        <div className="mr-source-tabs" role="tablist" aria-label="Assumptions and next steps views">
          <button
            type="button"
            role="tab"
            aria-selected={activeGuidance === "assumptions"}
            onClick={() => setActiveGuidance("assumptions")}
          >
            Assumptions
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeGuidance === "steps"}
            onClick={() => setActiveGuidance("steps")}
          >
            Next steps
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeGuidance === "confidence"}
            onClick={() => setActiveGuidance("confidence")}
          >
            Backend confidence
          </button>
        </div>
      </div>
      <div className="mr-guidance-grid">
        {rows.map(([title, text, status, tone], index) => (
          <article
            key={title}
            className={tone ? `mr-guidance-card-${tone}` : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {status && <em className="mr-guidance-status">{status}</em>}
            <h4>{title}</h4>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const competitorBrandPath = (fileName) => `/competitor-brands/${fileName}`;

const marketLogoAssets = {
  schwab: { file: "schwab.png", width: 34, height: 34, fit: "slice" },
  fidelity: { file: "wealthscape.png", width: 76, height: 20 },
  lpl: { file: "lpl.svg", width: 76, height: 18 },
  pershing: { file: "pershing.svg", width: 76, height: 20 },
  altruist: { file: "altruist.svg", width: 70, height: 24 },
  apex: { file: "apex.svg", width: 74, height: 28 },
  tradepmr: { file: "tradepmr.png", width: 80, height: 25, treatment: "dark" },
  axos: { file: "axos-advisor-services.svg", width: 78, height: 21 },
  nfs: { file: "wealthscape.png", width: 82, height: 22 },
  "pershing-clearing": { file: "pershing.svg", width: 80, height: 21 },
  "apex-clearing": { file: "apex.svg", width: 74, height: 28 },
  "axos-clearing": { file: "axos-advisor-services.svg", width: 78, height: 21 },
  "tradepmr-clearing": {
    file: "tradepmr.png",
    width: 80,
    height: 25,
    treatment: "dark",
  },
  "first-clearing": {
    file: "first-clearing.png",
    width: 28,
    height: 28,
    treatment: "compact",
  },
  wedbush: { file: "wedbush.svg", width: 80, height: 20 },
};

const custodianMarketPlayers = [
  {
    id: "schwab",
    rank: 1,
    name: "Charles Schwab Advisor Services",
    chartLabel: "Schwab",
    alwaysLabel: true,
    scale: 3370,
    scaleLabel: "$3.37T RIA custody",
    footprint: 48.8,
    momentum: 1.8,
    posture: "Core RIA custodian",
    segment: "core",
    labelDx: -8,
    labelDy: -52,
    labelAnchor: "end",
    proof:
      "InvestmentNews cites Cerulli figures placing Schwab at $3.37T of RIA assets and the largest RIA custodian position.",
    read: "Largest Fidelity-like custody benchmark.",
    detail:
      "Use Schwab as the scale benchmark for advisor custody, service workflows, account maintenance, status visibility and retained evidence.",
  },
  {
    id: "fidelity",
    rank: 2,
    name: "Fidelity Institutional",
    chartLabel: "Fidelity",
    alwaysLabel: true,
    scale: 1500,
    scaleLabel: "$1.5T RIA custody",
    footprint: 21.7,
    momentum: 1.6,
    posture: "Fidelity internal baseline",
    segment: "core",
    labelDx: -4,
    labelDy: -50,
    labelAnchor: "end",
    proof:
      "InvestmentNews lists Fidelity second in RIA custody assets at about $1.5T.",
    read: "Our custody-side baseline.",
    detail:
      "This is us: the internal benchmark for where Wealthscape's servicing path matches, trails, or can differentiate within the custody experience.",
  },
  {
    id: "lpl",
    rank: 3,
    name: "LPL Financial",
    chartLabel: "LPL",
    alwaysLabel: true,
    scale: 583,
    scaleLabel: "$583B fee-only + hybrid RIA assets",
    footprint: 8.4,
    momentum: 2.2,
    posture: "Hybrid/RIA custody platform",
    segment: "core",
    labelDx: -18,
    labelDy: -20,
    labelAnchor: "end",
    proof:
      "InvestmentNews separates LPL's $194B fee-only RIA assets and $389B hybrid RIA assets; this view combines them for platform-scale context.",
    read: "Hybrid custody and OSJ operations matter.",
    detail:
      "LPL matters because the OSJ and hybrid advisor context creates a comparable need for supervision, ownership clarity and service controls.",
  },
  {
    id: "pershing",
    rank: 4,
    name: "BNY Pershing",
    chartLabel: "Pershing",
    alwaysLabel: true,
    scale: 350,
    scaleLabel: "$350B RIA custody",
    footprint: 5.1,
    momentum: 1.7,
    posture: "Custody and clearing platform",
    segment: "core",
    labelDx: -18,
    labelDy: 30,
    labelAnchor: "end",
    proof:
      "InvestmentNews identifies BNY Pershing as one of the big-four RIA custodians, with roughly $350B in RIA custody assets.",
    read: "Clearing and custody controls are central.",
    detail:
      "Pershing is relevant for custody/clearing workflows, supervisory review, account maintenance and evidence retention.",
  },
  {
    id: "altruist",
    rank: 5,
    name: "Altruist",
    chartLabel: "Altruist",
    scale: 120,
    scaleLabel: "AUC undisclosed · 6,000+ advisors",
    footprint: 1.8,
    momentum: 4.9,
    posture: "Emerging RIA custodian",
    segment: "challenger",
    labelDx: 20,
    labelDy: 8,
    labelAnchor: "start",
    proof:
      "Public reporting frames Altruist as a bona fide custodial competitor; Altruist cites 6,000+ advisors, 112% year-over-year RIA growth and strong T3 satisfaction.",
    read: "Small share, strong challenger signal.",
    detail:
      "Altruist is the clearest challenger signal: it competes on modern custody technology, self-clearing, account-opening friction and advisor workflow quality more than disclosed asset scale.",
  },
  {
    id: "apex",
    rank: 6,
    name: "Apex Fintech Solutions",
    chartLabel: "Apex",
    scale: 276,
    scaleLabel: "$276B+ assets under custody",
    footprint: 4.0,
    momentum: 3.6,
    posture: "Digital custody and clearing infrastructure",
    segment: "challenger",
    labelDx: -18,
    labelDy: -18,
    labelAnchor: "end",
    proof:
      "Apex reports $276B+ assets under custody and positions its Apex Advisor Solutions platform around digital custody, clearing and advisor-workstation capabilities.",
    read: "Infrastructure challenger with custody scale.",
    detail:
      "Apex should be treated as custody and clearing infrastructure, not a classic RIA custodian brand. It still matters because modern API-based custody can reset expectations for onboarding and maintenance workflows.",
  },
  {
    id: "tradepmr",
    rank: 7,
    name: "TradePMR / Robinhood",
    chartLabel: "TradePMR",
    scale: 50,
    scaleLabel: "$50B assets under administration",
    footprint: 0.7,
    momentum: 3.4,
    posture: "RIA custody challenger",
    segment: "challenger",
    labelDx: 20,
    labelDy: 12,
    labelAnchor: "start",
    proof:
      "Robinhood described TradePMR as a scaled RIA custodial platform with more than $40B in assets under administration at acquisition, later reporting roughly $50B.",
    read: "Next-generation distribution meets RIA custody.",
    detail:
      "TradePMR is relevant because Robinhood is pairing an RIA custody platform with a next-generation investor distribution surface.",
  },
  {
    id: "axos",
    rank: 8,
    name: "Axos Advisor Services",
    chartLabel: "Axos",
    scale: 47.8,
    scaleLabel: "$47.8B custody / administration",
    footprint: 0.7,
    momentum: 2.8,
    posture: "Smaller RIA custody and clearing provider",
    segment: "challenger",
    labelDx: 18,
    labelDy: 24,
    labelAnchor: "start",
    proof:
      "Axos Financial reports $47.8B of assets under custody and/or administration across Axos Clearing and Axos Advisor Services.",
    read: "Smaller custody provider with direct RIA relevance.",
    detail:
      "Axos belongs in the challenger layer because it is closer to custody and clearing than generic advisor software, but its footprint remains far smaller than Schwab or Fidelity.",
  },
];

const clearingMarketPlayers = [
  {
    id: "nfs",
    rank: 1,
    name: "Fidelity / National Financial Services",
    chartLabel: "Fidelity NFS",
    alwaysLabel: true,
    scale: 17900,
    scaleLabel: "$17.9T Fidelity AUA",
    footprint: 52,
    momentum: 2.5,
    posture: "Fidelity clearing and custody platform",
    segment: "clearing-core",
    labelDx: -68,
    labelDy: -16,
    labelAnchor: "end",
    proof:
      "Fidelity reports $17.9T assets under administration; NFS is the affiliated clearing firm for Fidelity brokerage activity.",
    read: "Internal clearing-side benchmark.",
    detail:
      "This is the Fidelity-side clearing context: the strategy should account for how advisor servicing, brokerage accounts, forms, statements and account maintenance intersect with NFS operations.",
  },
  {
    id: "pershing-clearing",
    rank: 2,
    name: "BNY Pershing",
    chartLabel: "BNY Pershing",
    alwaysLabel: true,
    scale: 3600,
    scaleLabel: "$3.6T global client assets",
    footprint: 28,
    momentum: 2.7,
    posture: "Large clearing and custody provider",
    segment: "clearing-core",
    labelDx: -84,
    labelDy: 18,
    labelAnchor: "end",
    proof:
      "BNY Pershing describes itself as the #1 U.S. clearing firm, citing $3.6T global client assets and 8.7M global investor accounts.",
    read: "Largest external clearing benchmark.",
    detail:
      "Pershing is the clearest external comparison for clearing, settlement, brokerage custody, market access, compliance workflow and operational transparency.",
  },
  {
    id: "apex-clearing",
    rank: 3,
    name: "Apex Clearing",
    chartLabel: "Apex",
    alwaysLabel: true,
    scale: 276,
    scaleLabel: "$276B+ assets under custody",
    footprint: 9,
    momentum: 4.4,
    posture: "Digital clearing infrastructure",
    segment: "clearing-challenger",
    labelDx: 24,
    labelDy: -22,
    labelAnchor: "start",
    proof:
      "Apex reports $276B+ assets under custody, 41M+ brokerage accounts and custody/clearing infrastructure for digital wealth firms.",
    read: "API-first clearing challenger.",
    detail:
      "Apex matters because it turns clearing into embedded infrastructure: account opening, custody, execution, data and service workflows become programmable parts of the advisor experience.",
  },
  {
    id: "axos-clearing",
    rank: 4,
    name: "Axos Clearing",
    chartLabel: "Axos",
    scale: 47.8,
    scaleLabel: "$47.8B custody / administration",
    footprint: 3.5,
    momentum: 3.2,
    posture: "Smaller clearing provider",
    segment: "clearing-challenger",
    labelDx: 22,
    labelDy: 22,
    labelAnchor: "start",
    proof:
      "Axos Financial reports $47.8B of assets under custody and/or administration across Axos Clearing and Axos Advisor Services.",
    read: "Smaller but directly relevant clearing peer.",
    detail:
      "Axos belongs on the clearing view because it serves introducing broker-dealers and RIA correspondents, which maps to the back-office side of account maintenance.",
  },
  {
    id: "tradepmr-clearing",
    rank: 5,
    name: "TradePMR / Robinhood",
    chartLabel: "TradePMR",
    scale: 50,
    scaleLabel: "$50B assets under administration",
    footprint: 3.7,
    momentum: 4.0,
    posture: "RIA custody with clearing partnership",
    segment: "clearing-challenger",
    labelDx: 22,
    labelDy: -24,
    labelAnchor: "start",
    proof:
      "Robinhood says TradePMR relies on Wells Fargo Clearing Services for clearing, execution and lending while it builds a next-generation RIA platform.",
    read: "Distribution-led pressure on clearing UX.",
    detail:
      "TradePMR is not a pure self-clearing peer, but it shows how a custody platform can compete by wrapping clearing infrastructure with advisor workflow and client acquisition.",
  },
  {
    id: "first-clearing",
    rank: 6,
    name: "First Clearing / Wells Fargo",
    chartLabel: "First Clearing",
    scale: 230,
    scaleLabel: "scale proxy · clearing AUC not disclosed",
    footprint: 7,
    momentum: 2.9,
    posture: "Established clearing and custody provider",
    segment: "clearing-core",
    labelDx: -18,
    labelDy: 60,
    labelAnchor: "end",
    proof:
      "Wells Fargo describes First Clearing as a clearing and custody services business for broker-dealers and RIAs; public release confirms the platform continues to add correspondent relationships.",
    read: "Established correspondent-clearing benchmark.",
    detail:
      "First Clearing is relevant because the account-maintenance strategy spans advisor-facing custody and the clearing/correspondent operations that carry accounts behind the scenes.",
  },
  {
    id: "wedbush",
    rank: 7,
    name: "Wedbush Securities",
    chartLabel: "Wedbush",
    scale: 75,
    scaleLabel: "scale proxy · AUC not disclosed",
    footprint: 4,
    momentum: 3.1,
    posture: "Multi-asset clearing provider",
    segment: "clearing-challenger",
    labelDx: -24,
    labelDy: -26,
    labelAnchor: "end",
    proof:
      "Wedbush positions itself as a multi-asset clearing firm serving broker-dealers, RIAs, professional traders and institutional clients.",
    read: "Specialist clearing and execution comparator.",
    detail:
      "Wedbush helps round out the clearing view because it emphasizes account maintenance, settlement, funding, activity and API-enabled back-office operations.",
  },
];

const custodyMarketSummaryStats = [
  {
    id: "big-four-share",
    label: "Big-four RIA custody share",
    value: "~84%",
    eyebrow: "Market concentration",
    title: "Custody is highly concentrated around a few external peers and our baseline.",
    body:
      "Schwab, Pershing and LPL remain the primary external custody comparison set; Fidelity stays in the view as the internal Wealthscape baseline.",
    decision:
      "Benchmark the account-maintenance strategy against custody peers before comparing generic wealthtech vendors.",
  },
  {
    id: "ria-assets",
    label: "Cited RIA assets",
    value: "~$6.9T",
    eyebrow: "Market scale",
    title: "The addressable custody context is large enough to reward better operations.",
    body:
      "The useful size signal is the RIA custody pool, not a generic wealth-management software TAM.",
    decision:
      "Tie the funding case to measurable service quality: first-pass completion, rework, unclear ownership and resolution time.",
  },
  {
    id: "challengers",
    label: "Challenger layer",
    value: "4 named",
    eyebrow: "Emerging pressure",
    title: "Small share can still signal where advisor expectations are moving.",
    body:
      "Altruist, Apex, TradePMR/Robinhood and Axos belong in the visual as emerging or adjacent custody competitors, not as the primary incumbent benchmark.",
    decision:
      "Use challengers to inspect where digital onboarding, APIs and advisor workflow quality are raising expectations.",
  },
  {
    id: "core-peer-set",
    label: "Default view",
    value: "Custodians",
    eyebrow: "Peer set",
    title: "The primary story is custody operations, not wealthtech software.",
    body:
      "The prior software-provider list was a different part of wealth management. This visual keeps the custody benchmark first and challenger context second.",
    decision:
      "Frame the strategy around custody operations: guided maintenance, evidence, entitlements, handoffs and completion proof.",
  },
];

const clearingMarketSummaryStats = [
  {
    id: "clearing-core",
    label: "Primary clearing frame",
    value: "NFS + Pershing",
    eyebrow: "Clearing scale",
    title: "Clearing requires a second market lens beside custody.",
    body:
      "Fidelity/NFS and BNY Pershing anchor the clearing-side comparison because they combine brokerage custody, settlement, account records and operating controls.",
    decision:
      "Use this lens to pressure-test where account maintenance breaks because of clearing, settlement, statements, margin, account records or correspondent operations.",
  },
  {
    id: "clearing-platforms",
    label: "Mapped challengers",
    value: "5 firms",
    eyebrow: "Emerging pressure",
    title: "Smaller firms compete by wrapping clearing with digital workflow.",
    body:
      "Apex, Axos, TradePMR, First Clearing and Wedbush bring different forms of advisor-facing or correspondent clearing pressure.",
    decision:
      "Inspect challengers for account-opening, maintenance APIs, status transparency and recovery workflows.",
  },
  {
    id: "clearing-evidence",
    label: "Evidence quality",
    value: "Mixed",
    eyebrow: "Public data caveat",
    title: "Clearing-specific market share is less consistently published.",
    body:
      "Some firms publish AUC/AUA, while others publish accounts, client counts or qualitative clearing capability. The plotted view uses reported scale where available and directional proxies where not.",
    decision:
      "Do not use the clearing view as a market-share ranking; use it to choose the right operational comparator.",
  },
  {
    id: "clearing-workflow",
    label: "Strategy focus",
    value: "Operations",
    eyebrow: "Implication",
    title: "The clearing lens makes evidence and ownership more important.",
    body:
      "Clearing adds settlement, books and records, account statements, margin, cash movement and supervisory records to the maintenance story.",
    decision:
      "Make clearing ownership explicit in the pilot measurement model before scaling maintenance automation.",
  },
];

const marketPeerSets = {
  custody: {
    button: "RIA custody",
    eyebrow: "Custody peer view",
    title: "Compare Wealthscape's baseline with RIA custodians and challengers",
    description:
      "The primary benchmark should be custody and clearing peers, not generic wealthtech vendors. The map keeps Wealthscape as the internal baseline beside Schwab, LPL and Pershing as external custody comparators while showing smaller challenger firms with stronger digital-growth signals.",
    players: custodianMarketPlayers,
    stats: custodyMarketSummaryStats,
    axisX: "custody / administration scale →",
    axisY: "challenger momentum →",
    chartNote:
      "Bubble size shows relative footprint; X uses a log scale. Undisclosed AUC is plotted directionally.",
    xTicks: [25, 100, 500, 1000, 3000],
    xMin: 25,
    xMax: 3000,
    zones: [
      ["smaller / faster", 33, 4.55, "start"],
      ["scaled with growth", 1800, 4.55, "middle"],
      ["small footprint", 35, 1.3, "start"],
      ["large-scale custody", 2100, 1.3, "middle"],
    ],
    summary:
      "Use the custodian view to anchor Wealthscape as the internal baseline, then compare external peers and challengers for where digital custody is raising the bar on account opening, maintenance, APIs, status, and service recovery.",
    estimates: [
      ["Big four", "~84% RIA custody"],
      ["RIA assets", "~$6.9T"],
      ["Challengers", "Altruist · Apex · Axos · TradePMR"],
    ],
  },
  clearing: {
    button: "Clearing firms",
    eyebrow: "Clearing peer view",
    title: "Compare the clearing-side operating platforms",
    description:
      "Fidelity also operates on the clearing side, so this view keeps the same chart treatment but changes the peer set to clearing, settlement, correspondent and digital custody infrastructure.",
    players: clearingMarketPlayers,
    stats: clearingMarketSummaryStats,
    axisX: "clearing / administration scale →",
    axisY: "modernization momentum →",
    chartNote:
      "Bubble size shows relative footprint; X uses a log scale. Proxy points are labeled in the drawer.",
    xTicks: [25, 100, 500, 3000, 18000],
    xMin: 25,
    xMax: 18000,
    zones: [
      ["specialist / faster", 33, 4.55, "start"],
      ["scaled infrastructure", 4500, 4.55, "middle"],
      ["smaller clearing footprint", 35, 1.3, "start"],
      ["large clearing base", 6000, 1.3, "middle"],
    ],
    summary:
      "Use the clearing view to identify where the maintenance experience depends on books and records, settlement, margin, statements, money movement, account data, and correspondent servicing rather than only front-end custody UX.",
    estimates: [
      ["Pershing", "$3.6T global client assets"],
      ["Fidelity", "$17.9T AUA"],
      ["Challengers", "Apex · Axos · TradePMR · Wedbush"],
    ],
  },
};

function MaintenanceMarketGrowthVisual() {
  const [marketLens, setMarketLens] = useState("custody");
  const [marketView, setMarketView] = useState("map");
  const [selectedMarketItem, setSelectedMarketItem] = useState("schwab");
  const activeMarket = marketPeerSets[marketLens];
  const activePlayers = activeMarket.players;
  const maxLeaderShare = Math.max(
    ...activePlayers.map((player) => player.footprint),
  );
  const selectedPlayer =
    activePlayers.find((player) => player.id === selectedMarketItem) ||
    activePlayers[0];
  const chartPlayers = [...activePlayers].sort(
    (a, b) =>
      Number(a.id === selectedMarketItem) - Number(b.id === selectedMarketItem),
  );
  const switchPeerSet = (nextLens) => {
    setMarketLens(nextLens);
    setSelectedMarketItem(marketPeerSets[nextLens].players[0].id);
  };
  const selectedDetail = {
    eyebrow: selectedPlayer.posture,
    label: selectedPlayer.name,
    value: `${selectedPlayer.scaleLabel} · ${selectedPlayer.momentum.toFixed(1)}/5 momentum`,
    title: selectedPlayer.read,
    body: selectedPlayer.detail,
    decision: selectedPlayer.proof,
  };
  const chartWidth = 760;
  const chartHeight = 380;
  const chartPadding = { top: 46, right: 86, bottom: 66, left: 82 };
  const chartRight = chartWidth - chartPadding.right;
  const chartBottom = chartHeight - chartPadding.bottom;
  const plotCenterX = (chartPadding.left + chartRight) / 2;
  const plotCenterY = (chartPadding.top + chartBottom) / 2;
  const xMin = activeMarket.xMin;
  const xMax = activeMarket.xMax;
  const yMin = 1;
  const yMax = 5;
  const xLogMin = Math.log10(xMin);
  const xLogMax = Math.log10(xMax);
  const xScale = (value) =>
    chartPadding.left +
    ((Math.log10(value) - xLogMin) / (xLogMax - xLogMin)) *
      (chartWidth - chartPadding.left - chartPadding.right);
  const yScale = (value) =>
    chartBottom -
    ((value - yMin) / (yMax - yMin)) *
      (chartHeight - chartPadding.top - chartPadding.bottom);
  const rScale = (value) => 10 + Math.sqrt(value / maxLeaderShare) * 15;
  const clampToRange = (value, min, max) => Math.min(max, Math.max(min, value));
  const selectLeader = (playerId) => {
    setSelectedMarketItem(playerId);
  };

  return (
    <section
      className="mr-market-visual"
      aria-label="Custody and clearing peer market signals"
    >
      <header className="mr-market-visual-head">
        <div>
          <span className="am-eyebrow">{activeMarket.eyebrow}</span>
          <h3>{activeMarket.title}</h3>
        </div>
        <p>{activeMarket.description}</p>
      </header>
      <div className="mr-market-leader-layout">
        <div className="mr-market-leader-panel">
          <div
            className="am-tabs mr-market-lens-switch"
            role="group"
            aria-label="Market peer set"
          >
            {Object.entries(marketPeerSets).map(([key, peerSet]) => (
              <button
                aria-pressed={marketLens === key}
                key={key}
                onClick={() => switchPeerSet(key)}
                type="button"
              >
                {peerSet.button}
              </button>
            ))}
          </div>
          <div
            className="mr-market-kpis"
            aria-label="Market summary metrics"
          >
            {activeMarket.stats.map((signal) => (
              <div className="mr-market-kpi" key={signal.id}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
          <div
            className="am-tabs mr-market-view-switch"
            role="group"
            aria-label="Market presentation"
          >
            <button
              aria-pressed={marketView === "map"}
              onClick={() => setMarketView("map")}
              type="button"
            >
              Bubble map
            </button>
            <button
              aria-pressed={marketView === "leaders"}
              onClick={() => setMarketView("leaders")}
              type="button"
            >
              Leader list
            </button>
          </div>
          {marketView === "map" ? (
            <svg
              className="mr-market-bubble-chart"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              role="img"
              aria-label="Bubble map of RIA custodians by custody scale and challenger momentum"
            >
              {[1, 2, 3, 4, 5].map((tick) => (
                <g className="mr-market-grid-line" key={`y-${tick}`}>
                  <line
                    x1={chartPadding.left}
                    x2={chartRight}
                    y1={yScale(tick)}
                    y2={yScale(tick)}
                  />
                  <text
                    className="mr-market-y-tick"
                    x={chartPadding.left - 12}
                    y={yScale(tick) + 4}
                  >
                    {tick}
                  </text>
                </g>
              ))}
              {activeMarket.xTicks.map((tick) => (
                <g className="mr-market-grid-line" key={`x-${tick}`}>
                  <line
                    x1={xScale(tick)}
                    x2={xScale(tick)}
                    y1={chartPadding.top}
                    y2={chartBottom}
                  />
                  <text x={xScale(tick)} y={chartHeight - 28}>
                    {tick >= 1000
                      ? `$${Number.isInteger(tick / 1000) ? tick / 1000 : (tick / 1000).toFixed(1)}T`
                      : `$${tick}B`}
                  </text>
                </g>
              ))}
              <rect
                className="mr-market-chart-frame"
                x={chartPadding.left}
                y={chartPadding.top}
                width={chartRight - chartPadding.left}
                height={chartBottom - chartPadding.top}
                rx="10"
              />
              <text
                className="mr-market-axis-label"
                x={plotCenterX}
                y={chartHeight - 9}
                textAnchor="middle"
              >
                {activeMarket.axisX}
              </text>
              <text
                className="mr-market-axis-label"
                x={22}
                y={plotCenterY}
                textAnchor="middle"
                transform={`rotate(-90 22 ${plotCenterY})`}
              >
                {activeMarket.axisY}
              </text>
              <text
                className="mr-market-chart-note"
                x={plotCenterX}
                y={24}
                textAnchor="middle"
              >
                {activeMarket.chartNote}
              </text>
              <g className="mr-market-zone-labels" aria-hidden="true">
                {activeMarket.zones.map(([label, x, y, anchor]) => (
                  <text key={label} x={xScale(x)} y={yScale(y)} textAnchor={anchor}>
                    {label}
                  </text>
                ))}
              </g>
              {chartPlayers.map((player) => {
                const selected = selectedMarketItem === player.id;
                const radius = rScale(player.footprint);
                const cx = clampToRange(
                  xScale(player.scale),
                  chartPadding.left + radius + 3,
                  chartRight - radius - 3,
                );
                const cy = clampToRange(
                  yScale(player.momentum),
                  chartPadding.top + radius + 3,
                  chartBottom - radius - 3,
                );
                const logo = marketLogoAssets[player.id];
                const showLabel = Boolean(logo) || selected || player.alwaysLabel;
                const badgeWidth = logo ? logo.width + 14 : 0;
                const badgeHeight = logo ? logo.height + 10 : 0;
                const badgeAnchorX = cx + player.labelDx;
                const badgeAnchorY = cy + player.labelDy;
                const rawBadgeX =
                  player.labelAnchor === "end"
                    ? badgeAnchorX - badgeWidth
                    : player.labelAnchor === "middle"
                      ? badgeAnchorX - badgeWidth / 2
                      : badgeAnchorX;
                const badgeX = clampToRange(
                  rawBadgeX,
                  chartPadding.left + 5,
                  chartRight - badgeWidth - 5,
                );
                const badgeY = clampToRange(
                  badgeAnchorY - badgeHeight / 2,
                  chartPadding.top + 5,
                  chartBottom - badgeHeight - 5,
                );
                return (
                  <g
                    className={`mr-market-bubble-point is-${player.segment} ${selected ? "is-selected" : ""}`}
                    key={player.id}
                    onClick={() => selectLeader(player.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectLeader(player.id);
                      }
                    }}
                    role="button"
                    tabIndex="0"
                    aria-pressed={selected}
                    aria-label={`Inspect ${player.name}: ${player.scaleLabel}, ${player.momentum.toFixed(1)} out of 5 momentum`}
                  >
                    <circle cx={cx} cy={cy} r={radius} />
                    <text className="mr-market-bubble-rank" x={cx} y={cy + 4}>
                      {player.rank}
                    </text>
                    {showLabel && logo && (
                      <g
                        className={`mr-market-logo-badge ${
                          logo.treatment ? `is-${logo.treatment}` : ""
                        }`}
                        transform={`translate(${badgeX} ${badgeY})`}
                        aria-hidden="true"
                      >
                        <title>{player.name}</title>
                        <rect width={badgeWidth} height={badgeHeight} rx="8" />
                        <image
                          href={competitorBrandPath(logo.file)}
                          x={(badgeWidth - logo.width) / 2}
                          y={(badgeHeight - logo.height) / 2}
                          width={logo.width}
                          height={logo.height}
                          preserveAspectRatio={
                            logo.fit === "slice" ? "xMidYMid slice" : "xMidYMid meet"
                          }
                        />
                      </g>
                    )}
                    {showLabel && !logo && (
                      <text
                        className="mr-market-bubble-label"
                        x={cx + player.labelDx}
                        y={cy + player.labelDy}
                        textAnchor={player.labelAnchor}
                      >
                        {player.chartLabel || player.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          ) : (
            <div
              className="mr-market-leader-list"
              aria-label="RIA custodian peer and challenger list"
            >
              {activePlayers.map((player) => {
                const selected = selectedMarketItem === player.id;
                return (
                  <button
                    className={`mr-market-leader-row ${selected ? "is-selected" : ""}`}
                    key={player.id}
                    onClick={() => selectLeader(player.id)}
                    type="button"
                    aria-pressed={selected}
                  >
                    <span className="mr-market-leader-rank">
                      {String(player.rank).padStart(2, "0")}
                    </span>
                    <span className="mr-market-leader-name">
                      <strong>{player.name}</strong>
                      <small>{player.posture}</small>
                    </span>
                    <span className="mr-market-leader-share">
                      <strong>{player.scaleLabel}</strong>
                      <small>{player.momentum.toFixed(1)}/5 momentum</small>
                    </span>
                    <span
                      className="mr-market-leader-bar"
                      aria-hidden="true"
                    >
                      <span
                        style={{
                          width: `${Math.max(
                            14,
                            (player.footprint / maxLeaderShare) * 100,
                          )}%`,
                        }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <aside className="mr-market-drawer" aria-live="polite">
          <span className="am-eyebrow">{selectedDetail.eyebrow}</span>
          <div className="mr-market-drawer-title">
            <h4>{selectedDetail.label}</h4>
            <strong>{selectedDetail.value}</strong>
          </div>
          <h3>{selectedDetail.title}</h3>
          <p>{selectedDetail.body}</p>
          <div className="mr-market-drawer-decision">
            <span>Decision read</span>
            <p>{selectedDetail.decision}</p>
          </div>
        </aside>
      </div>
      <footer className="mr-market-summary">
        <div>
          <span className="am-eyebrow">How to use this</span>
          <p>{activeMarket.summary}</p>
        </div>
        <div className="mr-market-estimates" aria-label="Market leader source context">
          {activeMarket.estimates.map(([label, value]) => (
            <span key={label}>
              <strong>{label}</strong> {value}
            </span>
          ))}
        </div>
      </footer>
    </section>
  );
}

const maintenanceCustomerPersona = {
  name: "Jordan Williams",
  role: "RIA advisor",
  image: "/personas/jordan-williams.png",
  details: [
    ["Firm model", "Independent RIA"],
    ["Book", "~$1.57B AUA"],
    ["Households", "134 active"],
    ["Primary concern", "Keep account changes moving without losing client confidence"],
  ],
};

const recommendationMap = [
  {
    title: "Validation and exceptions",
    phase: "NOW",
    score: "3.75",
    icon: GitBranch,
    outcomes: [1, 2, 3, 8, 9],
    odiPosture: "Differentiated wedge",
    preferred: ["MC-101", "MC-102", "MC-104", "MC-103"],
    action: "Inspect validation workflow",
    panel: "evidence",
    ux: "Capture household scope once, show missing checks beside the request, and give rejected work a named owner and a visible status.",
    demo: "The command center drills into a status-filtered queue. A case shows evidence checkboxes, owner routing, and a session timeline. These are synthetic attestations; no document is verified.",
    step: "Engineering and operations: inventory existing submission rules, normalize rejection reasons, and instrument the direct/assisted path before extending validation.",
    dependency:
      "Named data owners, account entitlements, and an agreed event/exception contract.",
    gate: "Review baseline volume, first-pass completion, repeat rejection, and resolution time by function. Confirm every failed check has an actionable recovery path.",
  },
  {
    title: "Household authority",
    phase: "NEXT",
    score: "4.25",
    icon: Users,
    outcomes: [4, 5, 10, 11, 12, 15],
    odiPosture: "Dominant-platform option to test",
    preferred: ["MC-101", "MC-104", "MC-106"],
    action: "Inspect household evidence",
    panel: "evidence",
    ux: "Make account scope and authority requirements visible together. Separate firm authority, third-party POA, signatures, and per-account exceptions.",
    demo: "The selected case exposes its synthetic account list and authority/signature checks. Intake collects household scope. The prototype does not execute one legal change across live accounts.",
    step: "Platform engineering and compliance: model party-to-account authority, reuse the validation contract, and define partial-failure and rollback behavior for multi-account requests.",
    dependency:
      "Shared validation first, despite the higher weighted score; legal review of each authority type.",
    gate: "Prove that each selected account has the right authority, unauthorized accounts are excluded, and partial failures retain an auditable explanation.",
  },
  {
    title: "Compliance currency",
    phase: "NEXT",
    score: "3.10",
    icon: ShieldCheck,
    outcomes: [6, 13, 14],
    odiPosture: "Selective differentiation",
    preferred: ["MC-103", "MC-106"],
    action: "Inspect review evidence",
    panel: "timeline",
    ux: "Expose review status and evidence currency at the account level. Make completion distinguishable from submission and show the record behind a readiness decision.",
    demo: "Periodic/permission review fixtures have status history. A human demo confirmation releases reporting readiness. There is no stale-data detector, legal timer, or production audit repository.",
    step: "Compliance and records owners: define applicable duties, exceptions, source-of-record fields, retention, reviewer identity, and escalation rules before implementing signals.",
    dependency:
      "Confirmed custody/clearing scope and durable evidence. Proposed regulations cannot supply the funding case.",
    gate: "Trace each alert to an applicable rule and record; test exceptions, false positives, reviewer accountability, and retrieval of retained evidence.",
  },
  {
    title: "Enterprise servicing",
    phase: "LATER",
    score: "2.90",
    icon: Database,
    outcomes: [7, 4, 8, 9],
    odiPosture: "Targeted segment play",
    preferred: ["MC-104"],
    action: "Inspect conversion case",
    panel: "overview",
    ux: "Keep registration, affected accounts, conversion ownership, and authority exceptions together so a consolidator can see which work still needs intervention.",
    demo: "The acquisition re-servicing fixture shows mixed registrations, an operations owner, and missing authority. It is a single demonstration case, not a migration or multi-entity processing engine.",
    step: "Enterprise operations and platform engineering: map an acquired book’s identifiers, entity boundaries, authority recapture, reconciliation, and support model in a bounded discovery pilot.",
    dependency:
      "Validated segment demand plus the shared validation and authority foundation.",
    gate: "Reconcile account counts and ownership, isolate entitlements by entity, explain every unresolved item, and establish rollback and cost-to-serve before scale.",
  },
];

function outcomeName(id) {
  return outcomes[id - 1]?.[0] || `Outcome ${id}`;
}

function OutcomeReferenceList({ ids, onOpen }) {
  return (
    <div className="mr-outcome-links" aria-label="Related outcomes">
      {ids.map((id) => (
        <button
          className="mr-outcome-link"
          key={id}
          type="button"
          title={outcomeName(id)}
          onClick={() => onOpen(id)}
          aria-label={`Open outcome ${id}: ${outcomeName(id)} in Outcomes and opportunities`}
        >
          <span className="mr-outcome-code">O{id}</span>
          <span className="mr-outcome-name">{outcomeName(id)}</span>
        </button>
      ))}
    </div>
  );
}

function OutcomeInlineReference({ id, onOpen }) {
  return (
    <button
      className="mr-outcome-inline"
      type="button"
      title={outcomeName(id)}
      onClick={() => onOpen(id)}
      aria-label={`Open outcome ${id}: ${outcomeName(id)} in Outcomes and opportunities`}
    >
      <span className="mr-outcome-code">O{id}</span>
      <span className="mr-outcome-name">{outcomeName(id)}</span>
    </button>
  );
}

function RecommendationMap({ scoped, profile, onNavigate, onOutcomeOpen }) {
  return (
    <div className="mr-recommendations">
      {recommendationMap.map((rec, index) => {
        const sample = rec.preferred
          .map((id) => scoped.find((c) => c.id === id))
          .find(Boolean);
        const Icon = rec.icon;
        return (
          <article className="mr-recommendation" key={rec.title}>
            <header>
              <span className="mr-section-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <div>
                <span className="am-eyebrow">
                  {rec.phase} · weighted score {rec.score}
                </span>
                <h3>
                  <span className="mr-step-number">{index + 1}</span>
                  {rec.title}
                </h3>
              </div>
              <OutcomeReferenceList ids={rec.outcomes} onOpen={onOutcomeOpen} />
            </header>
            <p className="mr-odi-posture">
              <strong>ODI posture</strong> {rec.odiPosture}
            </p>
            <p className="mr-ux">
              <strong>UX decision</strong> {rec.ux}
            </p>
            <div className="mr-proof-columns">
              <div className="mr-demonstrated">
                <h4>
                  <FlaskConical size={16} aria-hidden="true" /> Demonstrated
                  today
                </h4>
                <p>{rec.demo}</p>
                <p className="am-note">
                  {sample
                    ? `${sample.id} · ${sample.household} · ${sample.status}`
                    : "No matching fixture in this profile. The link opens its readiness view; choose a visible case or use the global profile control to inspect another scope."}
                </p>
                <button
                  onClick={() =>
                    onNavigate("maintenance", {
                      profileId: profile.id,
                      caseId: sample?.id,
                      panel: sample ? rec.panel : undefined,
                      maintenanceView: sample ? "queue" : "readiness",
                    })
                  }
                >
                  {rec.action} <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
              <div className="mr-proposed">
                <h4>
                  <ClipboardCheck size={16} aria-hidden="true" /> Production
                  proposal
                </h4>
                <p>{rec.step}</p>
                <dl>
                  <dt>Dependency</dt>
                  <dd>{rec.dependency}</dd>
                  <dt>Validation gate</dt>
                  <dd>{rec.gate}</dd>
                </dl>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function MaintenanceResearch({
  onNavigate,
  profile,
  cases,
  onStartGuide,
}) {
  const [active, setActive] = useState(1);
  const [selectedOutcome, setSelectedOutcome] = useState(-1);
  const [navHeight, setNavHeight] = useState(84);
  const navigation = useRef(null);
  const navigationFocused = useRef(false);
  const panels = useRef({});
  const activeIndex = sections.findIndex((item) => item.id === active);
  const scoped = visibleCases(cases, profile);
  const advance = (next) => {
    navigationFocused.current = true;
    setActive(next);
    // Complete the anchor before scrollspy can select an intermediate section.
    // The shell applies smooth scrolling globally, including automated focus scrolls.
    panels.current[next]?.scrollIntoView({
      block: "start",
      behavior: "instant",
    });
  };
  useEffect(() => {
    const nav = navigation.current;
    let root = nav.parentElement;
    while (root && !/(auto|scroll)/.test(getComputedStyle(root).overflowY))
      root = root.parentElement;
    const scroller = root || window;
    let frame;
    const update = () => {
      if (!nav.getClientRects().length || navigationFocused.current) return;
      const edge = nav.getBoundingClientRect().bottom + 28;
      let id = sections[0].id;
      for (const item of sections) {
        if (panels.current[item.id]?.getBoundingClientRect().top <= edge)
          id = item.id;
      }
      setActive(id);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(() => {
      if (nav.offsetHeight) setNavHeight(nav.offsetHeight);
      onScroll();
    });
    resize.observe(nav);
    // Focus/automation can scroll a sticky control before dispatching its click.
    // Keep that interaction's destination stable; intentional page scrolling
    // resumes scrollspy even if the select or button still owns keyboard focus.
    const resumeTracking = () => {
      navigationFocused.current = false;
      onScroll();
    };
    const onKey = (event) => {
      if (
        event.target.tagName !== "SELECT" &&
        [
          "PageDown",
          "PageUp",
          "Home",
          "End",
          "ArrowDown",
          "ArrowUp",
          " ",
        ].includes(event.key)
      )
        resumeTracking();
    };
    const onPointer = (event) => {
      if (!nav.contains(event.target)) resumeTracking();
    };
    scroller.addEventListener("wheel", resumeTracking, { passive: true });
    scroller.addEventListener("touchmove", resumeTracking, { passive: true });
    scroller.addEventListener("pointerdown", onPointer, { passive: true });
    scroller.addEventListener("keydown", onKey);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resize.disconnect();
      scroller.removeEventListener("wheel", resumeTracking);
      scroller.removeEventListener("touchmove", resumeTracking);
      scroller.removeEventListener("pointerdown", onPointer);
      scroller.removeEventListener("keydown", onKey);
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const openDemo = (statusFilter, lifecycleStage) =>
    onNavigate("maintenance", {
      profileId: profile.id,
      statusFilter,
      lifecycleStage,
      maintenanceView: "queue",
    });
  const openOutcome = (id) => {
    const next = normalizeOutcomeSelection(Number(id) - 1);
    if (next < 0) return;
    setSelectedOutcome(next);
    advance(4);
  };
  return (
    <div
      className="am-workspace mr-research"
      style={{ "--mr-nav-height": `${navHeight}px` }}
    >
      <nav
        className="mr-navigation"
        ref={navigation}
        onFocusCapture={() => {
          navigationFocused.current = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            navigationFocused.current = false;
        }}
        aria-label="Maintenance section navigation"
      >
        <label className="am-field">
          Jump to section
          <select
            value={active}
            onChange={(e) => advance(Number(e.target.value))}
          >
            {sections.map((item, i) => (
              <option key={item.id} value={item.id}>
                {i + 1}. {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mr-paging">
          <button
            disabled={activeIndex === 0}
            onClick={() => advance(sections[activeIndex - 1].id)}
          >
            ← Previous
          </button>
          <span>
            {activeIndex + 1} / {sections.length}
          </span>
          <button
            disabled={activeIndex === sections.length - 1}
            onClick={() => advance(sections[activeIndex + 1].id)}
          >
            Next →
          </button>
        </div>
      </nav>
      <StrategyExecutiveSummary track="maintenance" sections={sections} onJump={advance} />
      {sections.map((item, order) => {
        const section = item.id;
        const Icon = item.icon;
        return (
          <section
            className={`mr-panel mr-${item.tone}`}
            id={`maintenance-research-${item.id}`}
            key={item.id}
            ref={(node) => {
              panels.current[item.id] = node;
            }}
            aria-labelledby={`maintenance-heading-${item.id}`}
          >
            <header className="mr-section-heading">
              <span className="mr-section-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <div>
                <span className="am-eyebrow">
                  {String(order + 1).padStart(2, "0")} ·{" "}
                  {item.tone === "research"
                    ? "Evidence"
                    : item.tone === "derived"
                      ? "Synthesis"
                      : item.tone === "appendix"
                        ? "Appendix"
                        : "Decision path"}
                </span>
                <h2 id={`maintenance-heading-${item.id}`}>{item.label}</h2>
              </div>
              <SectionConfidence sectionId={section} />
            </header>
            <StrategySectionFinding track="maintenance" sectionId={section} />
            {section === 0 && (
              <>
                <Cards
                  rows={[
                    [
                      "Start with the shared failure points",
                      "Data re-entry, incomplete submissions, and exception resolution lead the revised deck’s outcome ranking. A common validation layer can support all eight maintenance functions.",
                    ],
                    [
                      "Build a case for parity and position",
                      "Frame the investment around service capability, competitive position, and a measurable operating hypothesis.",
                    ],
                    [
                      "Sequence authority after validation",
                      "Household authority ranks 4.25 on the investment scorecard; validation ranks 3.75. Validation still comes first because multi-account changes depend on it.",
                    ],
                    [
                      "Make the ninety-day gate real",
                      "Measure direct versus assisted maintenance volume, incomplete submissions, rework, and time to resolution. Use that baseline to resize the next phase before committing to scale.",
                    ],
                  ]}
                />
                <Evidence slide="2, 16, 20, 23–25" links={["kitces", "t3"]}>
                  Leadership synthesis of the August 18, 2026 deck. Rankings and
                  phase estimates are directional; exception resolution remains
                  an inferred input. The deck does not establish
                  maintenance-driven churn, productivity ROI, a funded roadmap,
                  or measured benefit.
                </Evidence>
                <button className="am-primary" onClick={() => advance(7)}>
                  Connect findings to recommendations →
                </button>
              </>
            )}
            {section === 9 && (
              <>
                <AssumptionsAndNextSteps />
              </>
            )}
            {section === 1 && (
              <>
                <MaintenanceMarketGrowthVisual />
                <Cards
                  icons={[ChartScatter, GitBranch, Database, ShieldCheck]}
                  rows={[
                    [
                      "Platform satisfaction sets the service-quality context",
                      "The deck reports a 7.11 custodial category average in T3 2026, compared with 7.75 in 2023. Use that context to ask where servicing quality is breaking down.",
                    ],
                    [
                      "Integration is part of the service experience",
                      "Kitces integration findings connect repeated handling to the customer experience. Capturing data once should be tested as a way to reduce rework.",
                    ],
                    [
                      "Consolidation changes the workload",
                      "Conversion and multi-entity servicing increase the burden on account scope, authority, and exception ownership.",
                    ],
                    [
                      "Supervision creates an evidence requirement",
                      "FINRA 3110 provides the supervisory context for principal review and records. Product discovery must distinguish custody from clearing and confirm which obligations apply to each workflow.",
                    ],
                  ]}
                />
                <Evidence
                  slide="12–14, 24, 28–29"
                  links={[
                    "investmentNewsCustody",
                    "investmentNewsChallengers",
                    "altruistT3",
                    "vanguardAltruist",
                    "apexFintech",
                    "axos",
                    "robinhoodTradePmr",
                    "pershingClearing",
                    "fidelityPrime",
                    "firstClearing",
                    "wedbush",
                    "kitces",
                    "t3",
                    "supervision",
                  ]}
                >
                  Market figures combine RIA custody snapshots, clearing firm
                  disclosures, and directional challenger signals. Public
                  sources do not publish a complete, like-for-like market-share
                  model for every custody and clearing firm, so proxy points are
                  used only to frame operating comparators, not a procurement
                  ranking, legal applicability determination, forecast, or
                  funding assumption.
                </Evidence>
              </>
            )}
            {section === 6 && (
              <>
                <SourceConfidenceSystem />
              </>
            )}
            {section === 2 && (
              <>
                <LifecycleResearch embedded view="positioning" />
                <Evidence slide="15, 17, 25, 27" links={["schwab", "t3"]}>
                  The interactive positioning map above retains the Account
                  Maintenance Frames snapshot. X uses T3 2026 advisor
                  satisfaction; Y uses assessed public maintenance capability.
                  Scores are unchanged, documentation coverage is uneven, and
                  the capability axis is an assessment, not a survey measure.
                  Source assessment: Account Maintenance Frames D2; revised
                  executive study, 18 Aug 2026, slides 15, 17 and 27. Public
                  context checked 10 Sep 2026; no score refresh or primary
                  interviews. Axos remains a qualitative reference, not an added
                  chart point. Revalidate scope before using it in a procurement
                  or competitive claim.
                </Evidence>
              </>
            )}
            {section === 3 && (
              <>
                <div className="mr-customer-context">
                  <article className="mr-customer-persona">
                    <img
                      className="mr-customer-photo"
                      src={maintenanceCustomerPersona.image}
                      alt={`${maintenanceCustomerPersona.name}, synthetic RIA advisor persona portrait`}
                    />
                    <div className="mr-customer-header">
                      <div>
                        <span className="am-eyebrow">Evidence persona</span>
                        <h3>{maintenanceCustomerPersona.name}</h3>
                        <p className="mr-customer-role">
                          {maintenanceCustomerPersona.role}
                        </p>
                        <p>
                          Public forum themes show where the advisor feels the
                          maintenance job break while trying to keep a client
                          change moving: authority, waiting, and confirmation.
                        </p>
                      </div>
                      <span className="mr-customer-badge">Observed themes</span>
                    </div>
                    <dl className="mr-customer-facts">
                      {maintenanceCustomerPersona.details.map(([key, value]) => (
                        <div key={key}>
                          <dt>{key}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                  <div className="mr-customer-pains">
                    {[
                      [
                        "Authority / signature",
                        "Obtain authority",
                        "I cannot tell which authorization is missing until the request stalls.",
                        "Missing authority appears when an advisor expects one submitted client change to be accepted, but the workflow still needs the right signer, scope, or policy path.",
                      ],
                      [
                        "Waiting / status",
                        "Resolve exception",
                        "I do not know who owns the request or what my client needs to do next.",
                        "The waiting problem shows up after submission, when ownership, rejected evidence, and recovery steps are not visible to the advisor.",
                      ],
                      [
                        "Completion proof",
                        "Confirm completion",
                        "I need proof the account change took effect before I tell the client it is done.",
                        "Confirmation friction appears when the advisor can see that work was submitted, but not whether the intended account state is complete and retained.",
                      ],
                    ].map(([theme, job, quote, pain]) => (
                      <article className="mr-customer-pain" key={theme}>
                        <div className="mr-customer-pain-header">
                          <span>{theme}</span>
                          <small>{job}</small>
                        </div>
                        <blockquote>{quote}</blockquote>
                        <p>{pain}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <Evidence slide="3–5, 7–10, 27–30" links={["kitces", "t3"]}>
                  Functional, social, and emotional needs are discovery context
                  for the evidenced RIA advisor persona. The source packet does
                  not directly study client service associates or home-office
                  reviewers. A formal ODI study should convert these themes
                  into stable desired-outcome statements and validate them with
                  interviews, workflow observation, and a survey.
                </Evidence>
              </>
            )}
            {section === 4 && (
              <>
                <MaintenanceOutcomes
                  profile={profile}
                  cases={cases}
                  onNavigate={onNavigate}
                  selectedOutcome={selectedOutcome}
                  onOutcomeChange={setSelectedOutcome}
                />
                <Evidence slide="18, 25, 28" links={["kitces", "t3"]}>
                  The map uses stable job language and ODI opportunity logic as
                  a planning frame. Chart coordinates retain the Frames
                  snapshot and its midpoint of 3 on both axes; selected detail
                  scores retain the August 18 executive study, slide 18. Values
                  are directional synthesis inputs and are not recomputed; source
                  tags separate sourced, derived, and inferred inputs. The
                  strategy read applies ODI opportunity logic, using importance
                  plus unmet need, to these proxy scores and groups outcomes
                  into proto-segments. A formal ODI
                  study should survey importance and satisfaction, then use
                  factor and cluster analysis to confirm needs-based segments,
                  quadrant placement, and whether the strategy should be
                  differentiated, dominant, disruptive, or narrowly targeted.
                </Evidence>
              </>
            )}
            {section === 5 && (
              <>
                <LifecycleResearch
                  embedded
                  view="journey"
                  onOutcomeOpen={openOutcome}
                />
                <Evidence slide="6–10, 27">
                  This is a derived job sequence and assessed journey, not a
                  completed ODI job map or needs-based segmentation study.
                  Executive deck slides 6 and 10 provide directional forum
                  evidence. Curve height and progress symbols are illustrative,
                  not measured satisfaction, reported sentiment, or confidence.
                  Positive moments describe the proposed experience. The
                  account-change job should remain stable while research tests
                  which outcomes are most underserved by segment.
                </Evidence>
              </>
            )}
            {section === 7 && (
              <>
                <RecommendationMap
                  scoped={scoped}
                  profile={profile}
                  onNavigate={onNavigate}
                  onOutcomeOpen={openOutcome}
                />
                <div className="mr-workflow-bridge">
                  <Route size={24} aria-hidden="true" />
                  <div>
                    <h3>
                      Status and confirmation connect every recommendation
                    </h3>
                    <p>
                      <OutcomeInlineReference id={9} onOpen={openOutcome} /> and{" "}
                      <OutcomeInlineReference id={14} onOpen={openOutcome} /> lead
                      to queue counts, named owners, a case timeline, and a clear
                      completion state. In the demo, incomplete maintenance holds
                      report generation; completing the evidence checks and human
                      review releases the account-change report.
                    </p>
                    <div className="mr-demo-links">
                      <button
                        onClick={() =>
                          onNavigate("morning", { profileId: profile.id })
                        }
                      >
                        Open lifecycle command center →
                      </button>
                      <button
                        onClick={() =>
                          onNavigate("reports", {
                            profileId: profile.id,
                            caseId: (
                              scoped.find((c) => c.status !== "Complete") ||
                              scoped[0]
                            )?.id,
                          })
                        }
                      >
                        Trace reporting prerequisites →
                      </button>
                    </div>
                  </div>
                </div>
                <Evidence slide="19–23, 25, 30">
                  Unmet need 30%, competitive urgency 20%, persona breadth 20%,
                  regulatory forcing 15%, build leverage 15%. These weights
                  express judgment. Dependency overrides rank; phase timing is
                  an estimate. Internal cost, volume, maintenance NIGO, and CSA
                  time remain missing.
                </Evidence>
                <button onClick={() => advance(8)}>
                  Review proposed resolution decisions →
                </button>
              </>
            )}
            {section === 8 && (
              <>
                <div className="mr-resolution-options">
                  {[
                    [
                      "Reuse first",
                      Database,
                      "Platform engineering",
                      "Inventory submission validators, party/account identity, permissions, and audit services. Replay a synthetic rejected request end to end with operations.",
                      "Reuse when rules, ownership, retention, and recovery contracts fit. Extend gaps explicitly; avoid a second source of truth.",
                    ],
                    [
                      "Build the missing coordination",
                      GitBranch,
                      "Product + engineering + operations",
                      <>
                        Map <OutcomeInlineReference id={1} onOpen={openOutcome} />,{" "}
                        <OutcomeInlineReference id={2} onOpen={openOutcome} />,{" "}
                        <OutcomeInlineReference id={3} onOpen={openOutcome} />,{" "}
                        <OutcomeInlineReference id={9} onOpen={openOutcome} />, and{" "}
                        <OutcomeInlineReference id={14} onOpen={openOutcome} /> to
                        missing checks, exception states, owners, and completion
                        evidence. Prototype the smallest missing handoff.
                      </>,
                      "Build where internal policy or exception coordination is differentiated and existing services cannot meet the contract. Require an accountable support owner.",
                    ],
                    [
                      "Partner for specialized mechanics",
                      ShieldCheck,
                      "Security + compliance + procurement",
                      "Test signature/document providers against firm authority, third-party POA, accessibility, evidence export, revocation, and outage cases.",
                      "Partner only when authority coverage, data handling, auditability, integration cost, and exit terms pass review. A signature tool does not recognize legal authority by itself.",
                    ],
                    [
                      "Consider acquisition only after comparison",
                      Columns3,
                      "Strategy + finance + platform leadership",
                      "Complete the internal maturity map and costed build/reuse/partner comparison before requesting an acquisition thesis.",
                      "Proceed only for a proven strategic gap that cannot be met economically by reuse or partnership. No acquisition recommendation is established by this study.",
                    ],
                  ].map(([title, Icon, owner, action, criterion]) => (
                    <article key={title}>
                      <h3>
                        <Icon size={20} aria-hidden="true" />
                        {title}
                      </h3>
                      <p className="mr-owner">Proposed owner · {owner}</p>
                      <dl>
                        <dt>First discovery action</dt>
                        <dd>{action}</dd>
                        <dt>Decision criterion</dt>
                        <dd>{criterion}</dd>
                      </dl>
                    </article>
                  ))}
                </div>
                <h3 className="mr-subheading">
                  Evidence that unlocks the next decision
                </h3>
                <div
                  className="mr-milestones mr-roadmap"
                  aria-label="Resolution strategy roadmap milestones"
                >
                  {[
                    {
                      time: "Weeks 1–2",
                      title: "Establish the baseline",
                      owner: "Operations + analytics",
                      Icon: Database,
                      text: "Count maintenance requests by function and direct/assisted channel. Define first-pass completion, repeat rejection, and median/p90 resolution time, with clear denominators.",
                      gate: "Baseline volume, rework, cycle time, cost, and staff effort are recorded separately.",
                    },
                    {
                      time: "Weeks 3–6",
                      title: "Validate the job and reuse path",
                      owner: "Research + engineering + compliance",
                      Icon: FlaskConical,
                      text: "Conduct advisor/CSA interviews and workflow observations. Test account-scope, authority-type, exception, and evidence-retention boundaries against existing services.",
                      gate: "Reusable paths and sourcing alternatives are costed before a build, partner, or buy decision.",
                    },
                    {
                      time: "By day 90",
                      title: "Resize or advance the investment",
                      owner: "Product sponsor + operations + finance",
                      Icon: ClipboardCheck,
                      text: "Compare the bounded pilot with its baseline and explain volume mix, rework, service burden, and support cost against the acceptance thresholds.",
                      gate: "Program scale is advanced, reduced, or redirected based on measured support burden.",
                    },
                  ].map(({ time, title, owner, Icon, text, gate }, index) => (
                    <article key={time} className="mr-roadmap-step">
                      <div className="mr-roadmap-marker" aria-hidden="true">
                        <Icon size={18} />
                        <span>{index + 1}</span>
                      </div>
                      <div className="mr-roadmap-body">
                        <div className="mr-roadmap-topline">
                          <span className="mr-roadmap-time">{time}</span>
                          <span className="mr-roadmap-kind">
                            Proposed milestone
                          </span>
                        </div>
                        <h4>{title}</h4>
                        <p className="mr-owner">{owner}</p>
                        <p>{text}</p>
                        <div className="mr-roadmap-gate">
                          <strong>Evidence gate</strong>
                          <span>{gate}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <Evidence slide="23, 27, 30">
                  Resolution options are new proposed synthesis. Slide 27 leaves
                  the internal capability and Build/Partner/Acquire assessment
                  open; the options above are a workshop starting point, not
                  findings about existing platform maturity or approved vendor
                  decisions. Raw decks, private exports, and forum identities
                  are not part of this application.
                </Evidence>
                <div className="mr-demo-links">
                  <span className="am-note">
                    Inspect the proposed behavior in synthetic operations:
                  </span>
                  <button onClick={() => openDemo("Blocked", "2")}>
                    Inspect exception queue →
                  </button>
                  <button onClick={() => openDemo("Ready for review", "3")}>
                    Inspect human review →
                  </button>
                </div>
              </>
            )}
          </section>
        );
      })}
      <p className="am-note mr-provenance">
        Research origin: Claude Desktop · Wealthscape Market Research. Account
        Maintenance Frames and the executive study (18 Aug 2026); the original
        executive deck is retained for version history. Public links open the
        publisher sources. This walkthrough summarizes the source artifacts; it
        does not independently certify their full evidence base.
      </p>
      <div className="mr-guide-cta">
        <div>
          <h2>See the research come to life</h2>
          <p>
            Follow one synthetic household change from a blocked queue to
            reviewed evidence and an account report. The tour explains each
            design decision; the scenario lets you complete the checks yourself.
          </p>
        </div>
        <div>
          <button onClick={() => onStartGuide("scenario")}>
            <FlaskConical size={16} /> Run Scenario
          </button>
          <button
            data-maintenance-guide-launch="tour"
            onClick={() => onStartGuide("tour")}
          >
            <BookOpen size={16} /> Take Tour
          </button>
        </div>
      </div>
    </div>
  );
}
