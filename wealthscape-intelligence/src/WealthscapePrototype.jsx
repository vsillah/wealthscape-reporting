import { useState, useEffect, useRef, useCallback } from "react";
import {
  Bell, Search, BarChart2, FileText, Users, Settings, Home,
  Download, Filter, ArrowUpRight, ArrowDownRight, Zap,
  Check, Sparkles, Mail, Activity, AlertTriangle, ChevronDown,
  X, Menu, ChevronLeft, ChevronRight, PlayCircle, BookOpen,
  Target, TrendingUp, Eye, Layers
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  green:"#0B5D2E", greenMid:"#1A7A40", greenLt:"#E8F5EE",
  navy:"#1C2B3A",  navyMid:"#2E4057",
  indigo:"#5B4FBE", indigoLt:"#EEF0FF",
  amber:"#F59E0B",  amberLt:"#FFF8E7",
  emerald:"#10B981",emeraldLt:"#ECFDF5",
  red:"#EF4444",    redLt:"#FEF2F2",
  slate:"#64748B",  white:"#FFFFFF",
  gray50:"#F8F9FA", gray100:"#F1F5F9", gray200:"#E2E8F0",
  gray300:"#CBD5E1",gray400:"#94A3B8", gray600:"#475569", gray900:"#0F172A",
};

// ─── Breakpoints ──────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

// ─── DEMO TOUR DATA ───────────────────────────────────────────────────────────
// Each step targets a named element via `data-demo` attribute.
// layer: which nav tab to activate before showing the step.
const TOUR_STEPS = [
  {
    id: "intro",
    layer: "morning",
    title: "Welcome to Wealthscape Reporting 2.0",
    component: "Interactive Prototype Tour",
    description: "This is a working prototype of the redesigned Wealthscape experience — built around five ODI-driven layers: Morning Brief, Report Builder, Integration Hub, Client Portal, and Analytics. Alerts surface from a single store, every alert carries a next-best-action, and a guided end-to-end scenario stitches the whole workflow together. This tour explains every component and the customer outcome it addresses.",
    outcome: null,
    outcomeScore: null,
    position: "center",
    spotlightId: null,
  },
  {
    id: "morning-brief-banner",
    layer: "morning",
    title: "Morning Brief Banner",
    component: "Layer 1 · AI Intelligence Surface",
    description: "The highest-priority surface in the entire platform. Every morning, Wealthscape Reporting 2.0 surfaces a prioritized digest of what needs the advisor's attention before market open — drift alerts, tax windows, at-risk clients, and overdue reviews.",
    outcome: "Know what needs attention right now each morning",
    outcomeScore: "ODI #1 · Opportunity Score 14.6",
    gap: "Wealthscape had no native morning digest. Advisors were logging into 12+ apps to reconstruct this view manually.",
    position: "bottom",
    spotlightId: "morning-brief-banner",
  },
  {
    id: "kpi-strip",
    layer: "morning",
    title: "KPI Strip",
    component: "Firm Health Metrics · 4-Tile Row",
    description: "A scannable row of the four metrics that matter most each morning: Total AUA with MTD trend, active client count, average portfolio performance vs benchmark, and count of open AI-generated insights requiring action.",
    outcome: "Minimize time to assess firm-wide health at start of day",
    outcomeScore: "ODI #1 · Opportunity Score 14.6",
    gap: "Previously scattered across multiple Wealthscape reports. No single-view summary existed at login.",
    position: "bottom",
    spotlightId: "kpi-strip",
  },
  {
    id: "insights-feed",
    layer: "morning",
    title: "Active Insights Feed",
    component: "AI-Generated Prioritized Actions",
    description: "Each insight is AI-generated from custody data, ranked by urgency, and expandable to a one-click next-best-action. Types include allocation drift, tax-loss windows, at-risk client signals, and overdue reviews. Crucially, this feed and the bell notification center read from a single alert store — nothing lives in a silo. Acting here marks the alert read everywhere.",
    outcome: "Know which clients are affected by events BEFORE they call / Insight to execution in one motion",
    outcomeScore: "ODI #7 · Score 16.3 / ODI #13 · Score 16.6 (highest in entire map)",
    gap: "Wealthscape had zero portfolio-level NBA capability (scored 1/10 vs Envestnet's 25M NBAs/day). Advisors were building manual watchlists in spreadsheets.",
    position: "bottom",
    spotlightId: "insights-feed",
  },
  {
    id: "alert-center",
    layer: "morning",
    title: "Unified Alert Center",
    component: "Single Alert Store · Next-Best-Action Routing",
    description: "The bell is the firm's single source of truth for everything that needs attention. Every scattered signal — drift, tax windows, at-risk clients, stale data feeds, delivered reports — flows here with a severity, a source, and a next-best-action that deep-links the advisor to the exact screen and sub-tab where it's resolved. Click 'Build Rebalance Report' and you land on the Report Builder's Generate tab, already scoped to that client.",
    outcome: "Consolidate every signal into one prioritized queue / Route directly from alert to resolution",
    outcomeScore: "ODI #13 · Score 16.6 · Insight-to-execution loop",
    gap: "Alerts in legacy Wealthscape were fragmented across modules with no shared inbox and no path from notification to action. Advisors triaged the same issue in three places.",
    position: "bottom",
    spotlightId: "alert-bell",
  },
  {
    id: "aua-chart",
    layer: "morning",
    title: "AUA Trend Chart",
    component: "6-Month Book Performance Sparkline",
    description: "A live area chart showing total Assets Under Administration over the trailing 6 months, with percentage growth annotation. Gives the advisor an immediate read on book trajectory without pulling a separate report.",
    outcome: "Minimize time to monitor firm-level AUM trends",
    outcomeScore: "ODI #6.3 · Monitoring Step",
    gap: "Real-time AUA was available in Wealthscape Analytics but required navigating to a separate module — not surfaced on the primary screen.",
    position: "bottom",
    spotlightId: "aua-chart",
  },
  {
    id: "client-list",
    layer: "morning",
    title: "Client Book List",
    component: "Signal-Sorted Client Table / Cards",
    description: "The full client list sorted by open signals — clients with active insights appear first. Each row shows AUM, performance delta, alert badge, and last review age. Overdue reviews turn red at 50+ days. On mobile, this renders as stacked cards for easy thumb navigation.",
    outcome: "Detect drift, tax-loss windows, rebalancing triggers automatically / At-risk client detection from behavioral patterns",
    outcomeScore: "ODI #8 · Score 15.8 / ODI #12 · Score 14.4",
    gap: "The legacy client list was flat alphabetical with no signal prioritization. Advisors had to manually scan for issues.",
    position: "top",
    spotlightId: "client-list",
  },
  {
    id: "report-builder-config",
    layer: "reports",
    title: "Report Configuration Panel",
    component: "Layer 2 · Stepped Report Builder",
    description: "A 3-step wizard that replaces manual report setup: choose a template (Quarterly, Annual, Ad-Hoc, Proposal), select clients from a searchable list, and toggle AI narrative generation. Collapsible on mobile. Previously, advisors spent an average of 2 hours scheduling, running, and reconciling reports before client meetings.",
    outcome: "Minimize manual steps to configure report parameters per client segment",
    outcomeScore: "ODI #5.1 · Execute Step · Score 17 (tied highest)",
    gap: "Wealthscape native reporting was operationally oriented (AUA, billing, money movement). Client-facing performance reports required exporting to Excel and manually rebuilding with branding. Not scalable beyond ~30 clients.",
    position: "right",
    spotlightId: "report-config",
    deepLink: { reportTab: "build" },
  },
  {
    id: "ai-narrative",
    layer: "reports",
    title: "AI Narrative Toggle",
    component: "Compliance-Resident Report Commentary",
    description: "When enabled, Wealthscape Reporting 2.0 generates a plain-language client summary directly from custody data — performance drivers, risk context, and key actions. The generated block appears inline in the report preview with a 'Pending Compliance Review' flag, keeping it in the audit trail. Toggle tone between Formal, Conversational, and Concise.",
    outcome: "Ensure AI-generated narrative summaries are accurate and compliance-safe",
    outcomeScore: "ODI #5.5 · Execute Step · Critical Gap",
    gap: "41% of advisors are already using ChatGPT/Claude outside the platform to generate report narratives — a direct shadow-IT compliance risk. This brings that workflow inside Wealthscape with an auditable chain.",
    position: "right",
    spotlightId: "ai-narrative",
    deepLink: { reportTab: "build" },
  },
  {
    id: "report-preview",
    layer: "reports",
    title: "Live Report Preview",
    component: "Branded Client-Ready Output",
    description: "A real-time rendered report preview that updates as configuration changes. Includes the advisor's firm branding (navy header, logo), AI narrative block, performance vs benchmark bar chart, asset allocation pie chart, and a drift alert inline. Export to PDF or Send to Client buttons are in-preview — no context switch required.",
    outcome: "Minimize time to generate a branded, client-ready performance report in one tool / Minimize number of separate tools required",
    outcomeScore: "ODI #5.1 · Score 17 / ODI #5.3 · Score 17",
    gap: "Advyzon (highest-rated reporting tool per T3) was bundled into Wealthscape specifically because native reporting couldn't produce client-ready branded output. This prototype closes that gap natively.",
    position: "left",
    spotlightId: "report-preview",
    deepLink: { reportTab: "build" },
  },
  {
    id: "drift-alert",
    layer: "reports",
    title: "Inline Drift Alert",
    component: "Contextual Risk Signal in Report",
    description: "When a client's allocation has drifted beyond threshold, the alert surfaces directly inside the generated report — not in a separate notification. The advisor sees it in context of the performance data, and the client sees it in the same document. Creates a natural conversation anchor for the review meeting.",
    outcome: "Detect drift and rebalancing triggers automatically / Minimize risk of sending a report with incorrect or incomplete data",
    outcomeScore: "ODI #8 · Score 15.8 / ODI #4.3 · Confirm Step",
    gap: "Drift detection existed in Wealthscape Analytics, but was siloed from the reporting workflow. Advisors had to cross-reference two separate modules.",
    position: "left",
    spotlightId: "drift-alert",
    deepLink: { reportTab: "build" },
  },
  {
    id: "report-pipeline",
    layer: "reports",
    title: "Report Generation Pipeline",
    component: "Report Builder · Generate Tab",
    description: "This is what actually happens when you hit 'Generate'. The report moves through six observable stages — data sync from the custodian, validation, assembly, AI narrative, compliance review, and delivery — each with a live status and a concrete result line. The advisor sees exactly what the system did and where the data came from, turning a black-box export into an auditable chain.",
    outcome: "Trust that a generated report is complete, accurate, and compliance-safe before it ships",
    outcomeScore: "ODI #4.3 · Confirm Step / ODI #5.5 · Compliance-resident",
    gap: "Legacy report runs were opaque — advisors clicked 'export' and hoped. Stale prices and missing corporate actions surfaced only after the client noticed. Validation and compliance now run inline.",
    position: "top",
    spotlightId: "report-pipeline",
    deepLink: { reportTab: "generate" },
  },
  {
    id: "report-customize",
    layer: "reports",
    title: "Report Customization Studio",
    component: "Report Builder · Customize Tab",
    description: "A two-panel template editor with a live preview. Toggle sections on and off, swap chart types per section (bar / line / area, donut / pie), apply a color theme, set firm branding and logo, and choose the date range and benchmark — all reflected instantly in the rendered report on the right. Save it as a reusable template so the whole book inherits one consistent, branded format.",
    outcome: "Produce branded, client-ready output without leaving the platform / Standardize formatting across the book",
    outcomeScore: "ODI #5.1 · Score 17 / ODI #5.3 · Score 17",
    gap: "Branding and layout previously meant exporting to Excel or PowerPoint and rebuilding by hand. There was no template system, so every advisor's reports looked different and nothing was reusable.",
    position: "top",
    spotlightId: "report-customize",
    deepLink: { reportTab: "customize" },
  },
  {
    id: "integration-hub",
    layer: "integrations",
    title: "Integration Hub",
    component: "Layer · Third-Party Provider Connections",
    description: "Where the data actually comes from. Custodians, CRMs, portfolio management, and financial planning tools connect here over OAuth, each with an explicit field-mapping table showing how the provider's raw fields map into Wealthscape's data model. Click a connected provider to inspect its mapping, sync frequency, and last-sync status — and connect new providers in a click. This is the supply chain that feeds every report and alert.",
    outcome: "Consolidate the advisor's fragmented tool stack behind one data layer / Make data lineage transparent",
    outcomeScore: "ODI #5.3 · Score 17 · 12 apps/advisor (Kitces 2025)",
    gap: "The average advisor stitches together 12 disconnected apps with no shared field mapping. Stale or mismatched data was invisible until it corrupted a client report.",
    position: "top",
    spotlightId: "integration-hub",
  },
  {
    id: "portal-header",
    layer: "portal",
    title: "Client Portal Header",
    component: "Layer 3 · Advisor-Branded Client Experience",
    description: "The client-facing entry point — branded to the advisory firm, not to Fidelity. Displays the client name, total portfolio value, and YTD performance at a glance. This is the surface clients land on when they click 'View Portal' from an emailed report.",
    outcome: "Ensure the client portal experience reflects the advisor's brand, not the custodian's",
    outcomeScore: "ODI #8.5 · Conclude Step · Critical Gap",
    gap: "Wealthscape Investor (the existing client app) shows Fidelity branding prominently. Independent RIAs want their own brand to anchor the client relationship — a key differentiation vs custodian-owned competitors.",
    position: "bottom",
    spotlightId: "portal-header",
  },
  {
    id: "portal-tabs",
    layer: "portal",
    title: "Portal Navigation Tabs",
    component: "4-Surface Client Experience",
    description: "Horizontally scrollable tabs covering Overview (portfolio snapshot + advisor message), Performance (interactive charts), Documents (secure vault with NEW badges), and Messages (advisor-client thread). Scrollable on mobile without clipping.",
    outcome: "Ensure clients can interact with reports in a digital portal vs static PDF / Ensure advisor is notified when client views a report",
    outcomeScore: "ODI #8.2 · Score 15 / ODI #8.4 · Score 13",
    gap: "78% of clients now expect interactive portals (Schwab 2024 study). Wealthscape Investor had positions and balances but no advisor-communication surface and no interactive reporting.",
    position: "bottom",
    spotlightId: "portal-tabs",
  },
  {
    id: "advisor-message",
    layer: "portal",
    title: "Advisor Message Card",
    component: "Contextual Advisor-Client Communication",
    description: "A threaded message from the advisor appearing directly in the client's portfolio overview — not in a separate inbox. Includes a 'View Q2 Report' CTA that links directly to the relevant document, and a Reply button. Keeps the advisor's voice in the primary financial context rather than buried in email.",
    outcome: "Ensure clients can interact with reports and easily contact their advisor / Minimize effort to deliver reports through the right channels",
    outcomeScore: "ODI #8.1 · Score 13 / ODI #8.3 · Score 13",
    gap: "Digital Sales Rooms (contextual advisor-client communication hubs) are the fastest-growing category in wealthtech (InvestSuite 2025). No equivalent existed in Wealthscape's client experience.",
    position: "top",
    spotlightId: "advisor-message",
  },
  {
    id: "scenario-button",
    layer: "morning",
    title: "Guided End-to-End Scenario",
    component: "Shell · Run the Full Workflow Live",
    description: "Press this button to run the complete loop as a scripted, interactive walkthrough: a drift alert fires for the Chen portfolio, you act on its next-best-action, the report pipeline generates the Q2 review, a delivery email composes itself with the client's address and the PDF attached, and you land in the client's own portal watching the report arrive with a 'Just Delivered' badge. It's the entire value story — alert to outcome — in under ten seconds.",
    outcome: "Demonstrate the end-to-end audit trail: data → insight → action → report → delivery → client",
    outcomeScore: "ODI #15 · Score 14.2 · Compliance-as-byproduct",
    gap: "No competitor demonstrates the full alert-to-delivery loop as one continuous motion — most stitch it across separate tools and logins. This scenario makes the consolidated workflow tangible.",
    position: "bottom",
    spotlightId: "scenario-button",
  },
  {
    id: "nav-sidebar",
    layer: "morning",
    title: "Navigation & AI Status",
    component: "Shell · Persistent Sidebar with AI Indicator",
    description: "The left sidebar provides persistent navigation across all five experience layers. The AI Active badge at the bottom signals that Wealthscape Reporting 2.0 is running background analysis on the advisor's book — normalizing the expectation that AI is always on, not an opt-in feature.",
    outcome: "Minimize the number of apps required to complete a full advisory workflow",
    outcomeScore: "ODI #5.3 · Score 17 / Competitive: 12 apps/advisor (Kitces 2025)",
    gap: "The average Wealthscape advisor uses 12 separate apps. This shell is designed to consolidate Morning Brief, Reporting, Client Portal, and Analytics into a single login surface — directly competing with Jump AI's 'workflow OS' positioning.",
    position: "right",
    spotlightId: "nav-sidebar",
  },
  {
    id: "outro",
    layer: "morning",
    title: "Prototype Complete",
    component: "Summary · ODI Coverage",
    description: "This prototype addresses all 11 high-opportunity customer outcomes identified in the ODI analysis (scores 13.5–16.6) across five layers. Morning Brief and the unified Alert Center cover Steps 1–2 (Define, Locate); the Integration Hub feeds clean data into Steps 3–4 (Prepare, Confirm); the Report Builder's generation pipeline and customization studio cover Steps 5–6 (Execute); the Client Portal covers Steps 7–8 (Modify, Conclude). Run the guided scenario any time to see the whole loop end to end.",
    outcome: "End-to-end audit trail: data → insight → action → report → delivery → outcome",
    outcomeScore: "ODI #15 · Score 14.2 · Compliance-as-byproduct",
    position: "center",
    spotlightId: null,
  },
];

// ─── Demo Tour Overlay ────────────────────────────────────────────────────────
function DemoTour({ step, total, onNext, onPrev, onClose, isMobile, spotlightRect }) {
  const s = TOUR_STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === total - 1;
  const isCenter = s.position === "center";

  // Place the panel in the corner farthest from the spotlight element so it
  // never overlaps what it's describing. Intro/outro steps keep the centred modal.
  const cornerPos = !isCenter && !isMobile && spotlightRect ? (() => {
    const cx = spotlightRect.left + spotlightRect.width  / 2;
    const cy = spotlightRect.top  + spotlightRect.height / 2;
    const goTop   = cy > (typeof window !== "undefined" ? window.innerHeight : 800) * 0.5;
    const goRight = cx < (typeof window !== "undefined" ? window.innerWidth  : 1200) * 0.5;
    return {
      ...(goTop ? { top: 16 } : { bottom: 24 }),
      ...(goRight ? { right: 16 } : { left: 16 }),
    };
  })() : null;

  const panelStyle = isCenter ? {
    position: "fixed",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "calc(100vw - 32px)" : 520,
    zIndex: 1000,
  } : isMobile ? {
    position: "fixed",
    bottom: 0, left: 0, right: 0,
    width: "100%",
    zIndex: 1000,
  } : cornerPos ? {
    position: "fixed",
    ...cornerPos,
    width: 420,
    zIndex: 1000,
  } : {
    // fallback: no spotlight yet — bottom-centre
    position: "fixed",
    bottom: 24, left: "50%",
    transform: "translateX(-50%)",
    width: 520,
    zIndex: 1000,
  };

  const panelRadius = isCenter ? 16 : isMobile ? "16px 16px 0 0" : 16;

  const progressPct = ((step) / (total - 1)) * 100;

  return (
    <>
      {/* Backdrop — only for centered (modal) steps; spotlight steps dim via the cut-out instead */}
      {isCenter && <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", zIndex: 999, backdropFilter: "blur(2px)" }} onClick={onClose} />}

      {/* Panel */}
      <div style={{ ...panelStyle, background: T.white, borderRadius: panelRadius, boxShadow: "0 24px 64px rgba(0,0,0,0.35)", overflow: "hidden" }}>

        {/* Progress bar */}
        <div style={{ height: 3, background: T.gray100 }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${T.green}, ${T.indigo})`, width: `${progressPct}%`, transition: "width 0.4s ease" }} />
        </div>

        {/* Header */}
        <div style={{ background: T.navy, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ background: T.indigo, borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", gap: 5 }}>
                <BookOpen size={11} color={T.white} />
                <span style={{ fontSize: 10, fontWeight: 700, color: T.white, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.component}</span>
              </div>
              <span style={{ fontSize: 11, color: T.gray400 }}>Step {step + 1} of {total}</span>
            </div>
            <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: T.white, lineHeight: 1.3 }}>{s.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", color: T.gray400, flexShrink: 0, marginLeft: 12, display: "flex", alignItems: "center" }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Description */}
          <p style={{ margin: 0, fontSize: 14, color: T.gray600, lineHeight: 1.65 }}>{s.description}</p>

          {/* Desired Outcome */}
          {s.outcome && (
            <div style={{ background: T.greenLt, borderLeft: `3px solid ${T.green}`, borderRadius: "0 8px 8px 0", padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <Target size={13} color={T.green} />
                <span style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: "0.08em", textTransform: "uppercase" }}>Desired Outcome</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: T.gray900, lineHeight: 1.5 }}>"{s.outcome}"</p>
              {s.outcomeScore && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: T.green, borderRadius: 99, padding: "2px 9px", marginTop: 7 }}>
                  <TrendingUp size={10} color={T.white} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: T.white }}>{s.outcomeScore}</span>
                </div>
              )}
            </div>
          )}

          {/* Gap / Research signal */}
          {s.gap && (
            <div style={{ background: T.amberLt, borderLeft: `3px solid ${T.amber}`, borderRadius: "0 8px 8px 0", padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <AlertTriangle size={12} color={T.amber} />
                <span style={{ fontSize: 10, fontWeight: 700, color: T.amber, letterSpacing: "0.08em", textTransform: "uppercase" }}>Current Gap</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: T.gray600, lineHeight: 1.55 }}>{s.gap}</p>
            </div>
          )}

          {/* Outro summary grid */}
          {s.id === "outro" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { icon: Home,     label: "Morning Brief",  desc: "Steps 1–2",    color: T.green  },
                { icon: FileText, label: "Report Builder", desc: "Steps 3–6",    color: T.indigo },
                { icon: Users,    label: "Client Portal",  desc: "Steps 7–8",    color: T.emerald},
              ].map(c => (
                <div key={c.label} style={{ background: T.gray50, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.color}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 7px" }}>
                    <c.icon size={16} color={c.color} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gray900 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: T.slate, marginTop: 2 }}>Job Map {c.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div style={{ padding: "12px 20px 16px", borderTop: `1px solid ${T.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={onPrev}
            disabled={isFirst}
            style={{ display: "flex", alignItems: "center", gap: 6, background: isFirst ? T.gray100 : T.gray100, border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, color: isFirst ? T.gray400 : T.gray600, cursor: isFirst ? "default" : "pointer", minHeight: 40 }}
          >
            <ChevronLeft size={15} /> Back
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {TOUR_STEPS.map((_, i) => (
              <div key={i} style={{ width: i === step ? 16 : 6, height: 6, borderRadius: 99, background: i === step ? T.green : T.gray200, transition: "all 0.25s" }} />
            ))}
          </div>

          <button
            onClick={isLast ? onClose : onNext}
            style={{ display: "flex", alignItems: "center", gap: 6, background: isLast ? T.emerald : T.green, border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, color: T.white, cursor: "pointer", minHeight: 40 }}
          >
            {isLast ? (
              <><Check size={14} /> Done</>
            ) : (
              <>Next <ChevronRight size={15} /></>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Spotlight cut-out around a targeted element ──────────────────────────────
// Dims the whole viewport EXCEPT the targeted element, so the section under
// discussion stays at full brightness and lines up with the tour commentary.
function Spotlight({ targetId, onClose, onRectChange }) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!targetId) { setRect(null); onRectChange?.(null); return; }
    setRect(null); onRectChange?.(null);
    let obs = null, scrolled = false;
    // Re-measure the target. The element may not exist yet when the step changes
    // a sub-tab (e.g. Report Builder → Generate), so we poll briefly until it
    // mounts, then keep tracking it via a ResizeObserver + scroll/resize.
    const update = () => {
      const el = document.querySelector(`[data-demo="${targetId}"]`);
      if (!el) return;
      if (!scrolled) { el.scrollIntoView({ behavior:"smooth", block:"nearest" }); scrolled = true; }
      const r = el.getBoundingClientRect();
      setRect({ top: r.top - 6, left: r.left - 6, width: r.width + 12, height: r.height + 12 });
      onRectChange?.({ top: r.top - 6, left: r.left - 6, width: r.width + 12, height: r.height + 12 });
      if (!obs) { obs = new ResizeObserver(update); obs.observe(el); }
    };
    let ticks = 0;
    const poll = setInterval(() => { update(); if (++ticks >= 24) clearInterval(poll); }, 60);
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => { clearInterval(poll); if (obs) obs.disconnect(); window.removeEventListener("scroll", update, true); window.removeEventListener("resize", update); };
  }, [targetId]);

  if (!rect) return null;

  return (
    <>
      {/* Full-screen click-catcher — dismisses the tour when the dimmed area is clicked */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 995 }} />
      {/* Dimmer: a transparent box over the target whose huge box-shadow darkens everything around it, leaving the target itself clear */}
      <div style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 12, boxShadow: "0 0 0 9999px rgba(15,23,42,0.55)", zIndex: 996, pointerEvents: "none", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }} />
      {/* Pulsing highlight ring on top of the bright cut-out */}
      <div style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 12, border: `2.5px solid ${T.indigo}`, zIndex: 997, pointerEvents: "none", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", animation: "pulse-ring 2s infinite" }} />
    </>
  );
}

// ─── Sample data ──────────────────────────────────────────────────────────────
const perfData = [
  { month:"Jan", portfolio:4.2, benchmark:3.8 },
  { month:"Feb", portfolio:5.1, benchmark:4.2 },
  { month:"Mar", portfolio:3.8, benchmark:4.0 },
  { month:"Apr", portfolio:6.2, benchmark:5.1 },
  { month:"May", portfolio:7.1, benchmark:5.8 },
  { month:"Jun", portfolio:8.4, benchmark:6.2 },
];
const auaData = [
  { month:"Jan", aua:1420 },{ month:"Feb", aua:1465 },
  { month:"Mar", aua:1448 },{ month:"Apr", aua:1502 },
  { month:"May", aua:1538 },{ month:"Jun", aua:1574 },
];
const allocationData = [
  { name:"US Equity",    value:42, color:T.green   },
  { name:"Intl Equity",  value:18, color:T.greenMid},
  { name:"Fixed Income", value:28, color:T.indigo  },
  { name:"Alternatives", value:8,  color:T.amber   },
  { name:"Cash",         value:4,  color:T.gray400 },
];
const clients = [
  { id:1, name:"Sarah & Michael Chen",   aum:"4.2M",  change:"+2.4%", up:true,  risk:"Moderate",     alert:"drift",  lastReview:"42", advisor:"J. Williams" },
  { id:2, name:"Hendricks Family Trust", aum:"8.7M",  change:"+1.1%", up:true,  risk:"Conservative", alert:null,     lastReview:"12", advisor:"J. Williams" },
  { id:3, name:"Robert Okafor",          aum:"1.9M",  change:"-0.8%", up:false, risk:"Aggressive",   alert:"tax",    lastReview:"28", advisor:"M. Torres"   },
  { id:4, name:"Patel Wealth Group",     aum:"12.3M", change:"+3.2%", up:true,  risk:"Moderate",     alert:null,     lastReview:"7",  advisor:"J. Williams" },
  { id:5, name:"Eleanor Vasquez",        aum:"2.8M",  change:"+0.6%", up:true,  risk:"Conservative", alert:"review", lastReview:"61", advisor:"M. Torres"   },
  { id:6, name:"Kingston Capital LLC",   aum:"6.1M",  change:"-1.4%", up:false, risk:"Moderate",     alert:"risk",   lastReview:"34", advisor:"J. Williams" },
];
// ─── Central alert store ──────────────────────────────────────────────────────
// Single source of truth. Every scattered alert across the app feeds from here,
// surfaces in the top-right bell, and carries a "next best action" deep-link that
// routes the advisor to the exact screen (and sub-tab) where they resolve it.
const ALERTS = [
  { id:1, type:"drift",  severity:"high",   client:"Sarah & Michael Chen", source:"Portfolio Monitor", time:"8:02 AM",  read:false,
    body:"US Equity 6.2pts above target. Rebalance recommended before quarter-end.",
    action:{ label:"Build Rebalance Report", layer:"reports", reportTab:"generate" } },
  { id:2, type:"tax",    severity:"high",   client:"Robert Okafor", source:"Portfolio Monitor", time:"8:02 AM",  read:false,
    body:"INTL position down 8.4% — tax-loss harvesting opportunity before Dec 31.",
    action:{ label:"Model Tax-Loss Report", layer:"reports", reportTab:"customize" } },
  { id:3, type:"risk",   severity:"high",   client:"Kingston Capital LLC", source:"Engagement AI", time:"7:45 AM",  read:false,
    body:"Login activity declined 80% over 30 days. No response to last 2 touchpoints.",
    action:{ label:"Message Client", layer:"portal", portalTab:"messages" } },
  { id:4, type:"review", severity:"medium", client:"Eleanor Vasquez", source:"Compliance", time:"Yesterday", read:false,
    body:"Annual review is 61 days overdue. Regulatory threshold is 90 days.",
    action:{ label:"Open Client Portal", layer:"portal", portalTab:"overview" } },
  { id:5, type:"integration", severity:"medium", client:"Fidelity Institutional", source:"Integration Hub", time:"6:30 AM", read:false,
    body:"INTL ETF price feed is 4h stale. Re-sync before generating client reports.",
    action:{ label:"Resolve Integration", layer:"integrations", integrationId:"fidelity" } },
  { id:6, type:"report", severity:"low", client:"Patel Wealth Group", source:"Report Engine", time:"Mon", read:true,
    body:"Q2 performance report generated and delivered to the client portal.",
    action:{ label:"View in Portal", layer:"portal", portalTab:"documents" } },
];

// ─── Shared micro-components ──────────────────────────────────────────────────
const Badge = ({ color, bg, children }) => (
  <span style={{ background:bg, color, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:99, letterSpacing:"0.03em", whiteSpace:"nowrap" }}>{children}</span>
);
const CHIP_MAP = {
  drift:{label:"DRIFT",bg:T.amberLt,color:T.amber}, tax:{label:"TAX-LOSS",bg:T.indigoLt,color:T.indigo},
  risk:{label:"AT-RISK",bg:T.redLt,color:T.red}, review:{label:"OVERDUE",bg:T.gray100,color:T.slate},
  integration:{label:"DATA SYNC",bg:T.amberLt,color:T.amber}, report:{label:"DELIVERED",bg:T.emeraldLt,color:T.emerald},
};
const InsightChip = ({ type }) => {
  const s = CHIP_MAP[type] || { label:type, bg:T.gray100, color:T.gray600 };
  return <Badge color={s.color} bg={s.bg}>{s.label}</Badge>;
};
const SEVERITY = { high:{ color:T.red, label:"High" }, medium:{ color:T.amber, label:"Medium" }, low:{ color:T.slate, label:"Low" } };

// ─── Alert Center (bell dropdown) ─────────────────────────────────────────────
function AlertCenter({ alerts, onAction, onDismiss, onMarkAllRead, onClose, isMobile }) {
  const unread = alerts.filter(a => !a.read).length;
  const sorted = [...alerts].sort((a,b) => (a.read - b.read) || ("high medium low".indexOf(a.severity) - "high medium low".indexOf(b.severity)));
  return (
    <>
      <div style={{ position:"fixed", inset:0, zIndex:60 }} onClick={onClose} />
      <div style={{ position:"fixed", top:isMobile?52:56, right:isMobile?8:12, left:isMobile?8:"auto", width:isMobile?"auto":380, maxHeight:"calc(100vh - 80px)", background:T.white, border:`1px solid ${T.gray200}`, borderRadius:14, boxShadow:"0 16px 48px rgba(0,0,0,0.18)", zIndex:61, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.gray100}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>Notifications</span>
            {unread > 0 && <span style={{ background:T.red, color:T.white, fontSize:10, fontWeight:700, padding:"2px 7px", borderRadius:99 }}>{unread} new</span>}
          </div>
          <button onClick={onMarkAllRead} disabled={!unread} style={{ background:"transparent", border:"none", fontSize:12, fontWeight:600, color:unread?T.indigo:T.gray300, cursor:unread?"pointer":"default" }}>Mark all read</button>
        </div>
        <div style={{ overflowY:"auto" }}>
          {sorted.length === 0 && (
            <div style={{ padding:"40px 20px", textAlign:"center" }}>
              <Check size={28} color={T.emerald} style={{ marginBottom:8 }}/>
              <div style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>All clear</div>
              <div style={{ fontSize:12, color:T.slate, marginTop:2 }}>No alerts need your attention.</div>
            </div>
          )}
          {sorted.map(a => {
            const sev = SEVERITY[a.severity];
            return (
              <div key={a.id} style={{ padding:"13px 18px", borderBottom:`1px solid ${T.gray100}`, background:a.read?T.white:`${T.indigoLt}55`, display:"flex", gap:11 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:a.read?T.gray200:sev.color, flexShrink:0, marginTop:5 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4, flexWrap:"wrap" }}>
                    <InsightChip type={a.type}/>
                    <span style={{ fontSize:10, color:T.slate }}>{a.source}</span>
                    <span style={{ fontSize:10, color:T.gray400, marginLeft:"auto" }}>{a.time}</span>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.gray900, marginBottom:2 }}>{a.client}</div>
                  <div style={{ fontSize:12, color:T.gray600, lineHeight:1.5, marginBottom:9 }}>{a.body}</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <button onClick={()=>onAction(a)} style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"6px 12px", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, minHeight:32 }}>
                      <Zap size={11}/> {a.action.label} <ChevronRight size={12}/>
                    </button>
                    <button onClick={()=>onDismiss(a.id)} style={{ background:"transparent", border:"none", fontSize:11, fontWeight:600, color:T.slate, cursor:"pointer" }}>Dismiss</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"10px 18px", borderTop:`1px solid ${T.gray100}`, textAlign:"center", flexShrink:0 }}>
          <span style={{ fontSize:11, color:T.slate }}>Next best action routes you straight to the fix</span>
        </div>
      </div>
    </>
  );
}
function MetricCard({ label, value, delta, up, sub, accent }) {
  return (
    <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px", flex:1, minWidth:140 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", color:T.slate, textTransform:"uppercase", marginBottom:6 }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:700, color:T.gray900, lineHeight:1.1, fontVariantNumeric:"tabular-nums" }}>{value}</div>
      {delta && (
        <div style={{ display:"flex", alignItems:"center", gap:3, marginTop:5, flexWrap:"wrap" }}>
          {up ? <ArrowUpRight size={13} color={T.emerald}/> : <ArrowDownRight size={13} color={T.red}/>}
          <span style={{ fontSize:12, color:up?T.emerald:T.red, fontWeight:600 }}>{delta}</span>
          {sub && <span style={{ fontSize:11, color:T.slate }}>{sub}</span>}
        </div>
      )}
      {accent && <div style={{ height:3, background:accent, borderRadius:2, marginTop:10, width:32 }}/>}
    </div>
  );
}

// ─── LAYER 1: Morning Brief ────────────────────────────────────────────────────
function MorningBrief({ bp, alerts, onAction, onDismiss, scenarioStep }) {
  const [expanded, setExpanded] = useState(null);
  const { isMobile } = bp;
  const feed = alerts.filter(a => a.type !== "report");
  const highCount   = alerts.filter(a => a.severity === "high"   && !a.read).length;
  const taxCount    = alerts.filter(a => a.type === "tax"        && !a.read).length;
  const reviewCount = alerts.filter(a => a.type === "review"     && !a.read).length;
  const openCount   = alerts.filter(a => !a.read).length;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      <div data-demo="morning-brief-banner" style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, borderRadius:14, padding:isMobile?"18px 16px":"22px 24px" }}>
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ background:T.indigo, borderRadius:8, padding:9, flexShrink:0 }}><Sparkles size={18} color={T.white}/></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:T.indigo, textTransform:"uppercase", marginBottom:4 }}>Morning Brief</div>
            <div style={{ fontSize:isMobile?15:18, fontWeight:700, color:T.white, marginBottom:8, lineHeight:1.3 }}>Good morning, Jordan. Here's what needs your attention today.</div>
            <div style={{ fontSize:13, color:"#A8BCCF", lineHeight:1.5, marginBottom:12 }}>{openCount} active alert{openCount!==1?"s":""} across your book. AUA up 2.3% MTD to $1.57B.</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[{label:`${highCount} High Priority`,c:T.red,bg:"rgba(239,68,68,0.2)"},{label:`${taxCount} Tax Opportunity`,c:"#A78BFA",bg:"rgba(91,79,190,0.3)"},{label:`${reviewCount} Review Overdue`,c:T.amber,bg:"rgba(245,158,11,0.2)"}].map(c=>(
                <span key={c.label} style={{ background:c.bg, color:c.c, fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:99 }}>{c.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-demo="kpi-strip" style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <MetricCard label="Total AUA"       value="$1.57B" delta="+2.3%"   up={true}  sub="vs last month"  accent={T.green}  />
        <MetricCard label="Active Clients"  value="134"    delta="+3"       up={true}  sub="this quarter"   accent={T.indigo} />
        <MetricCard label="Avg Performance" value="+8.4%"  delta="+2.2pts"  up={true}  sub="vs benchmark"   accent={T.emerald}/>
        <MetricCard label="Open Alerts"     value={String(openCount)} delta={`${highCount} urgent`} up={false}            accent={T.amber}  />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16 }}>
        <div data-demo="insights-feed" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.gray200}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>Active Insights</div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <Bell size={12} color={T.slate}/>
              <Badge color={T.indigo} bg={T.indigoLt}>Synced to Alerts</Badge>
            </div>
          </div>
          {feed.length===0 && <div style={{ padding:"24px 18px", textAlign:"center", fontSize:12, color:T.slate }}>No active insights — you're all caught up.</div>}
          {feed.map((ins,i)=>{
            const isTarget = scenarioStep===0 && ins.id===1;
            return (
            <div key={ins.id} style={{ padding:"14px 18px", borderBottom:i<feed.length-1?`1px solid ${T.gray100}`:"none", cursor:"pointer", background:expanded===ins.id?T.gray50:T.white, outline:isTarget?`2px solid ${T.green}`:"none", outlineOffset:-2, transition:"outline 0.2s", animation:isTarget&&expanded!==ins.id?"scenario-pulse 2s ease-in-out infinite":"none" }} onClick={()=>setExpanded(expanded===ins.id?null:ins.id)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                  <InsightChip type={ins.type}/>
                  {ins.severity==="high" && <div style={{ width:6, height:6, borderRadius:"50%", background:T.red, flexShrink:0 }}/>}
                  {!ins.read && <span style={{ fontSize:10, color:T.indigo, fontWeight:600 }}>New</span>}
                </div>
                <ChevronDown size={13} color={T.gray400} style={{ transform:expanded===ins.id?"rotate(180deg)":"none", transition:"transform 0.2s", flexShrink:0 }}/>
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:T.gray900, marginBottom:2 }}>{ins.client}</div>
              <div style={{ fontSize:12, color:T.gray600, lineHeight:1.5 }}>{ins.body}</div>
              {expanded===ins.id && (
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  <button onClick={e=>{e.stopPropagation();onAction(ins);}} style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, minHeight:36 }}><Zap size={12}/> {ins.action.label} <ChevronRight size={13}/></button>
                  <button onClick={e=>{e.stopPropagation();onDismiss(ins.id);}} style={{ background:T.gray100, color:T.gray600, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, cursor:"pointer", minHeight:36 }}>Dismiss</button>
                </div>
              )}
            </div>
          );})}
        </div>

        <div data-demo="aua-chart" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px" }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>AUA Trend (6M)</div>
          <div style={{ fontSize:20, fontWeight:700, color:T.gray900, marginBottom:3 }}>$1.57B</div>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:14 }}>
            <ArrowUpRight size={13} color={T.emerald}/>
            <span style={{ fontSize:12, color:T.emerald, fontWeight:600 }}>+10.8% since January</span>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={auaData}>
              <defs><linearGradient id="auaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green} stopOpacity={0.2}/><stop offset="95%" stopColor={T.green} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
              <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}M`}/>
              <Tooltip formatter={v=>[`$${v}M`,"AUA"]} contentStyle={{ borderRadius:8, border:`1px solid ${T.gray200}`, fontSize:12 }}/>
              <Area type="monotone" dataKey="aua" stroke={T.green} strokeWidth={2.5} fill="url(#auaGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div data-demo="client-list" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.gray200}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>Your Book · 134 Clients</div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer", display:"flex", gap:5, alignItems:"center", minHeight:34 }}><Filter size={12}/> Filter</button>
            <button style={{ background:T.greenLt, border:"none", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:600, color:T.green, cursor:"pointer", display:"flex", gap:5, alignItems:"center", minHeight:34 }}><FileText size={12}/> Report</button>
          </div>
        </div>
        {isMobile ? (
          <div style={{ display:"flex", flexDirection:"column" }}>
            {clients.map((c,i)=>(
              <div key={c.id} style={{ padding:"14px 18px", borderBottom:i<clients.length-1?`1px solid ${T.gray100}`:"none" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.green, flexShrink:0 }}>{c.name.split(" ").slice(0,2).map(w=>w[0]).join("")}</div>
                    <div><div style={{ fontSize:13, fontWeight:600, color:T.gray900, lineHeight:1.3 }}>{c.name}</div><div style={{ fontSize:11, color:T.slate }}>{c.risk} · {c.advisor}</div></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:T.gray900, fontVariantNumeric:"tabular-nums" }}>${c.aum}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:3, justifyContent:"flex-end" }}>
                      {c.up?<ArrowUpRight size={12} color={T.emerald}/>:<ArrowDownRight size={12} color={T.red}/>}
                      <span style={{ fontSize:12, fontWeight:600, color:c.up?T.emerald:T.red }}>{c.change}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                  {c.alert && <InsightChip type={c.alert}/>}
                  <span style={{ fontSize:11, color:parseInt(c.lastReview)>50?T.red:T.slate, fontWeight:parseInt(c.lastReview)>50?600:400 }}>Review {c.lastReview}d ago</span>
                  <button style={{ background:T.greenLt, border:"none", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, color:T.green, cursor:"pointer", marginLeft:"auto" }}>View</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:600 }}>
              <thead><tr style={{ background:T.gray50 }}>{["Client","AUM","Perf.","Signal","Last Review",""].map(h=><th key={h} style={{ padding:"10px 14px", fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", textAlign:"left", borderBottom:`1px solid ${T.gray200}`, whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
              <tbody>
                {clients.map(c=>(
                  <tr key={c.id} style={{ borderBottom:`1px solid ${T.gray100}` }}>
                    <td style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div style={{ width:30, height:30, borderRadius:"50%", background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:T.green, flexShrink:0 }}>{c.name.split(" ").slice(0,2).map(w=>w[0]).join("")}</div>
                        <span style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 14px", fontSize:13, fontWeight:700, color:T.gray900, fontVariantNumeric:"tabular-nums" }}>${c.aum}</td>
                    <td style={{ padding:"12px 14px" }}><div style={{ display:"flex", alignItems:"center", gap:3 }}>{c.up?<ArrowUpRight size={12} color={T.emerald}/>:<ArrowDownRight size={12} color={T.red}/>}<span style={{ fontSize:12, fontWeight:600, color:c.up?T.emerald:T.red }}>{c.change}</span></div></td>
                    <td style={{ padding:"12px 14px" }}>{c.alert?<InsightChip type={c.alert}/>:<span style={{ fontSize:12, color:T.gray400 }}>—</span>}</td>
                    <td style={{ padding:"12px 14px", fontSize:12, color:parseInt(c.lastReview)>50?T.red:T.slate, fontWeight:parseInt(c.lastReview)>50?600:400 }}>{c.lastReview}d ago</td>
                    <td style={{ padding:"12px 14px" }}><button style={{ background:T.greenLt, border:"none", borderRadius:6, padding:"5px 10px", fontSize:11, fontWeight:700, color:T.green, cursor:"pointer" }}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LAYER 2: Report Builder ──────────────────────────────────────────────────
// Per-template preview mockups, so the Build preview reflects the selected
// template instead of always showing the Quarterly Review.
const PROPOSED_ALLOCATION = [
  { name:"US Equity",    value:38, color:T.green   },
  { name:"Intl Equity",  value:22, color:T.greenMid},
  { name:"Fixed Income", value:30, color:T.indigo  },
  { name:"Alternatives", value:7,  color:T.amber   },
  { name:"Cash",         value:3,  color:T.gray400 },
];
const PROJECTION_DATA = [
  { yr:"Now", val:2500 },{ yr:"Yr 3", val:2960 },{ yr:"Yr 5", val:3375 },{ yr:"Yr 10", val:4530 },
];
const ANNUAL_GOALS = [
  { name:"Retirement · 2042",   pct:78, note:"On track" },
  { name:"College Fund · 2030", pct:64, note:"On track" },
  { name:"Legacy / Estate",     pct:91, note:"Ahead"    },
];
const TEMPLATE_CONFIG = {
  quarterly: { label:"Quarterly Review", eyebrow:"Quarterly Review", period:"Q2 2025 · Prepared Jun 9, 2025", heroLabel:"Portfolio Value", heroValue:"$4,284,500", heroDelta:"+8.4% YTD",
    narrative:"Your portfolio delivered strong performance this quarter, advancing 8.4% year-to-date versus a 6.2% benchmark return — driven by US equity and healthcare exposures. Bond holdings provided stability during March volatility.",
    sections:["performance","allocation","drift"], cta:"Generate & Send" },
  annual:    { label:"Annual Report", eyebrow:"Annual Report", period:"FY 2024 · Prepared Jan 8, 2025", heroLabel:"Year-End Value", heroValue:"$4,108,200", heroDelta:"+14.2% FY",
    narrative:"Over the full year your portfolio returned 14.2%, outpacing the blended benchmark by 3.1 points. Gains were broad-based across equities while fixed income cushioned the Q1 drawdown. All three long-term goals remain on track.",
    sections:["performance","allocation","goals"], cta:"Generate & Send" },
  adhoc:     { label:"Ad-Hoc Update", eyebrow:"Ad-Hoc Snapshot", period:"As of Jun 9, 2025", heroLabel:"Current Value", heroValue:"$4,284,500", heroDelta:"+2.4% MTD",
    narrative:"A point-in-time snapshot of current holdings and month-to-date performance, prepared on request ahead of our call.",
    sections:["metrics","performance"], cta:"Generate & Send" },
  proposal:  { label:"Client Proposal", eyebrow:"New Account Proposal", period:"Proposal · Jun 2025", heroLabel:"Proposed Investment", heroValue:"$2,500,000", heroDelta:"Projected +7.8% / yr",
    narrative:"This proposal outlines a recommended allocation for a new $2.5M account, targeting a 7.8% annualized return at a moderate risk profile, with an all-in advisory fee of 0.85%.",
    sections:["proposed","projection","fees"], cta:"Send Proposal" },
};

function ReportBuilder({ bp, deepLink, onScenarioAdvance, onSendToClient }) {
  const { isMobile } = bp;
  const [reportTab, setReportTab]     = useState("build");
  const [step, setStep]               = useState(1);
  const [template, setTemplate]       = useState("quarterly");
  const [selected, setSelected]       = useState([1,4]);
  const [aiNarrative, setAiNarrative] = useState(false);
  const [showConfig, setShowConfig]   = useState(!isMobile);

  useEffect(() => { if (deepLink?.reportTab) setReportTab(deepLink.reportTab); }, [deepLink]);

  const reportTabs = [
    { id:"build",     label:"Build",     desc:"3-step wizard" },
    { id:"generate",  label:"Generate",  desc:"Pipeline" },
    { id:"customize", label:"Customize", desc:"Template editor" },
  ];

  if (reportTab === "generate")  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:2, background:T.gray100, borderRadius:10, padding:3, alignSelf:"flex-start" }}>
        {reportTabs.map(t=><button key={t.id} onClick={()=>setReportTab(t.id)} style={{ background:reportTab===t.id?T.white:"transparent", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:reportTab===t.id?700:500, color:reportTab===t.id?T.gray900:T.slate, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>{t.label}</button>)}
      </div>
      <ReportGeneration bp={bp} onScenarioAdvance={onScenarioAdvance} onSendToClient={onSendToClient}/>
    </div>
  );
  if (reportTab === "customize") return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:2, background:T.gray100, borderRadius:10, padding:3, alignSelf:"flex-start" }}>
        {reportTabs.map(t=><button key={t.id} onClick={()=>setReportTab(t.id)} style={{ background:reportTab===t.id?T.white:"transparent", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:reportTab===t.id?700:500, color:reportTab===t.id?T.gray900:T.slate, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>{t.label}</button>)}
      </div>
      <ReportCustomize bp={bp}/>
    </div>
  );

  const templates = [
    { id:"quarterly", label:"Quarterly Review",  desc:"Performance, allocation, goals" },
    { id:"annual",    label:"Annual Report",      desc:"Full year with planning summary" },
    { id:"adhoc",     label:"Ad-Hoc Update",      desc:"Custom snapshot" },
    { id:"proposal",  label:"Client Proposal",    desc:"New account proposal" },
  ];

  const cfg = TEMPLATE_CONFIG[template] || TEMPLATE_CONFIG.quarterly;
  const chartCount = cfg.sections.filter(s => ["performance","allocation","proposed","projection"].includes(s)).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:2, background:T.gray100, borderRadius:10, padding:3, alignSelf:"flex-start" }}>
        {reportTabs.map(t=><button key={t.id} onClick={()=>setReportTab(t.id)} style={{ background:reportTab===t.id?T.white:"transparent", border:"none", borderRadius:8, padding:"7px 16px", fontSize:12, fontWeight:reportTab===t.id?700:500, color:reportTab===t.id?T.gray900:T.slate, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>{t.label}</button>)}
      </div>
      {isMobile && (
        <button style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:10, padding:"12px 16px", fontSize:13, fontWeight:600, color:T.gray900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", minHeight:48 }} onClick={()=>setShowConfig(!showConfig)}>
          <span>Report Configuration</span>
          <ChevronDown size={15} color={T.slate} style={{ transform:showConfig?"rotate(180deg)":"none", transition:"transform 0.2s" }}/>
        </button>
      )}

      <div style={{ display:isMobile?"block":"flex", gap:20 }}>
        {(showConfig||!isMobile) && (
          <div style={{ width:isMobile?"100%":300, flexShrink:0, marginBottom:isMobile?16:0 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

              {/* Steps */}
              <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"14px 18px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Build Report</div>
                {[{n:1,label:"Choose template"},{n:2,label:"Select clients"},{n:3,label:"AI narrative"}].map(s=>(
                  <div key={s.n} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", cursor:s.n<=step?"pointer":"default", opacity:s.n>step?0.45:1 }} onClick={()=>s.n<=step&&setStep(s.n)}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:s.n<step?T.emerald:s.n===step?T.green:T.gray200, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {s.n<step?<Check size={11} color={T.white}/>:<span style={{ fontSize:10, fontWeight:700, color:s.n===step?T.white:T.slate }}>{s.n}</span>}
                    </div>
                    <span style={{ fontSize:13, fontWeight:s.n===step?600:400, color:s.n===step?T.gray900:T.gray600 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Template */}
              {step===1 && (
                <div data-demo="report-config" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.gray200}`, fontSize:12, fontWeight:700, color:T.gray900 }}>Select Template</div>
                  {templates.map(t=>(
                    <div key={t.id} style={{ padding:"12px 18px", borderBottom:`1px solid ${T.gray100}`, cursor:"pointer", background:template===t.id?T.greenLt:T.white, display:"flex", gap:10, alignItems:"flex-start", minHeight:48 }} onClick={()=>{setTemplate(t.id);setStep(2);}}>
                      <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${template===t.id?T.green:T.gray300}`, background:template===t.id?T.green:T.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                        {template===t.id && <div style={{ width:5, height:5, borderRadius:"50%", background:T.white }}/>}
                      </div>
                      <div><div style={{ fontSize:13, fontWeight:600, color:template===t.id?T.green:T.gray900 }}>{t.label}</div><div style={{ fontSize:11, color:T.slate, marginTop:1 }}>{t.desc}</div></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Client picker */}
              {step>=2 && (
                <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.gray200}`, fontSize:12, fontWeight:700, color:T.gray900 }}>Select Clients</div>
                  {clients.slice(0,5).map(c=>(
                    <div key={c.id} style={{ padding:"10px 14px", borderBottom:`1px solid ${T.gray100}`, display:"flex", alignItems:"center", gap:10, cursor:"pointer", minHeight:44 }} onClick={()=>{setSelected(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id]);setStep(3);}}>
                      <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${selected.includes(c.id)?T.green:T.gray300}`, background:selected.includes(c.id)?T.green:T.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {selected.includes(c.id)&&<Check size={10} color={T.white}/>}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:12, fontWeight:600, color:T.gray900, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div><div style={{ fontSize:11, color:T.slate }}>${c.aum}</div></div>
                    </div>
                  ))}
                  <div style={{ padding:"8px 14px" }}><span style={{ fontSize:12, color:T.indigo, fontWeight:600 }}>{selected.length} selected</span></div>
                </div>
              )}

              {/* AI Narrative */}
              {step>=3 && (
                <div data-demo="ai-narrative" style={{ background:aiNarrative?T.indigoLt:T.white, border:`1px solid ${aiNarrative?T.indigo:T.gray200}`, borderRadius:12, padding:"14px 18px", transition:"all 0.2s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ flex:1, marginRight:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}><Sparkles size={13} color={T.indigo}/><span style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>AI Narrative</span></div>
                      <div style={{ fontSize:12, color:T.slate, lineHeight:1.4 }}>Generate client-ready commentary from portfolio data.</div>
                    </div>
                    <div style={{ width:40, height:22, borderRadius:11, background:aiNarrative?T.indigo:T.gray300, cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0, minWidth:40 }} onClick={()=>setAiNarrative(!aiNarrative)}>
                      <div style={{ width:18, height:18, borderRadius:"50%", background:T.white, position:"absolute", top:2, left:aiNarrative?20:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                    </div>
                  </div>
                </div>
              )}

              {step>=2 && (
                <button onClick={()=>setReportTab("generate")} style={{ background:T.green, color:T.white, border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, minHeight:48 }}>
                  <Zap size={15}/> Generate Report <ChevronRight size={16}/>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        <div style={{ flex:1, background:T.gray50, borderRadius:12, border:`1px solid ${T.gray200}`, overflow:"hidden" }}>
          <div style={{ background:T.white, borderBottom:`1px solid ${T.gray200}`, padding:"12px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}><Badge color={T.green} bg={T.greenLt}>PREVIEW</Badge><span style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{cfg.label} · {selected.length} client{selected.length!==1?"s":""}</span></div>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer", minHeight:34 }}>Review</button>
              <button style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", gap:5, alignItems:"center", minHeight:34 }}><Download size={12}/> PDF</button>
            </div>
          </div>

          <div data-demo="report-preview" style={{ padding:16, overflowY:"auto", maxHeight:isMobile?"none":"calc(100vh - 280px)" }}>
            <div style={{ background:T.white, borderRadius:12, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden" }}>
              <div style={{ background:T.navy, padding:isMobile?"20px 18px":"24px 28px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:isMobile?"flex-start":"center", flexDirection:isMobile?"column":"row", gap:12 }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{cfg.eyebrow}</div>
                    <div style={{ fontSize:isMobile?16:18, fontWeight:700, color:T.white }}>Sarah & Michael Chen</div>
                    <div style={{ fontSize:12, color:"#94A3B8", marginTop:3 }}>{cfg.period}</div>
                  </div>
                  <div style={{ textAlign:isMobile?"left":"right" }}>
                    <div style={{ fontSize:11, color:"#94A3B8", marginBottom:3 }}>{cfg.heroLabel}</div>
                    <div style={{ fontSize:isMobile?22:26, fontWeight:700, color:T.white, fontVariantNumeric:"tabular-nums" }}>{cfg.heroValue}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4, justifyContent:isMobile?"flex-start":"flex-end", marginTop:3 }}>
                      <ArrowUpRight size={12} color={T.emerald}/><span style={{ fontSize:12, color:T.emerald, fontWeight:600 }}>{cfg.heroDelta}</span>
                    </div>
                  </div>
                </div>
              </div>

              {aiNarrative && (
                <div style={{ margin:"18px 18px 0", background:T.indigoLt, borderLeft:`3px solid ${T.indigo}`, borderRadius:"0 8px 8px 0", padding:"12px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}><Sparkles size={12} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, color:T.indigo, letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Summary · Pending Review</span></div>
                  <div style={{ fontSize:13, color:T.navyMid, lineHeight:1.6 }}>{cfg.narrative}</div>
                </div>
              )}

              {/* Ad-Hoc snapshot metric strip */}
              {cfg.sections.includes("metrics") && (
                <div style={{ padding:"18px 18px 0", display:"flex", gap:10, flexWrap:"wrap" }}>
                  <MetricCard label="Current Value"   value="$4,284,500" delta="+2.4% MTD"  up={true}  accent={T.green}  />
                  <MetricCard label="Cash Available"  value="$171,380"   delta="4.0% of port" up={true} accent={T.indigo} />
                  <MetricCard label="Unrealized Gain" value="$312,400"   delta="+18.2%"      up={true}  accent={T.emerald}/>
                </div>
              )}

              <div style={{ padding:"18px 18px", display:"grid", gridTemplateColumns:isMobile?"1fr":(chartCount>1?"1fr 1fr":"1fr"), gap:18 }}>
                {cfg.sections.includes("performance") && (
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Performance vs Benchmark</div>
                    <ResponsiveContainer width="100%" height={130}>
                      <BarChart data={perfData} barSize={10}>
                        <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                        <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
                        <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                        <Tooltip contentStyle={{ borderRadius:8, fontSize:11 }}/>
                        <Bar dataKey="portfolio" fill={T.green}   radius={[3,3,0,0]} name="Portfolio"/>
                        <Bar dataKey="benchmark" fill={T.gray200} radius={[3,3,0,0]} name="Benchmark"/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
                {(cfg.sections.includes("allocation") || cfg.sections.includes("proposed")) && (
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>{cfg.sections.includes("proposed")?"Proposed Allocation":"Asset Allocation"}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <PieChart width={100} height={100}><Pie data={cfg.sections.includes("proposed")?PROPOSED_ALLOCATION:allocationData} cx={45} cy={45} innerRadius={28} outerRadius={44} dataKey="value">{(cfg.sections.includes("proposed")?PROPOSED_ALLOCATION:allocationData).map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
                      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        {(cfg.sections.includes("proposed")?PROPOSED_ALLOCATION:allocationData).map(a=>(
                          <div key={a.name} style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <div style={{ width:7, height:7, borderRadius:2, background:a.color, flexShrink:0 }}/>
                            <span style={{ fontSize:11, color:T.gray600 }}>{a.name}</span>
                            <span style={{ fontSize:11, fontWeight:700, color:T.gray900, marginLeft:"auto", paddingLeft:8 }}>{a.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {cfg.sections.includes("projection") && (
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Projected Growth · 10yr</div>
                    <ResponsiveContainer width="100%" height={130}>
                      <AreaChart data={PROJECTION_DATA}>
                        <defs><linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.green} stopOpacity={0.25}/><stop offset="95%" stopColor={T.green} stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                        <XAxis dataKey="yr" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
                        <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(1)}M`}/>
                        <Tooltip contentStyle={{ borderRadius:8, fontSize:11 }} formatter={v=>[`$${(v/1000).toFixed(2)}M`,"Projected"]}/>
                        <Area type="monotone" dataKey="val" stroke={T.green} strokeWidth={2.5} fill="url(#projGrad)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Annual planning / goals summary */}
              {cfg.sections.includes("goals") && (
                <div style={{ margin:"0 18px 18px" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Goal Progress</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {ANNUAL_GOALS.map(g=>(
                      <div key={g.name}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                          <span style={{ fontSize:12, fontWeight:600, color:T.gray900 }}>{g.name}</span>
                          <span style={{ fontSize:11, fontWeight:700, color:g.pct>=85?T.emerald:T.green }}>{g.pct}% · {g.note}</span>
                        </div>
                        <div style={{ height:7, background:T.gray100, borderRadius:99, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${g.pct}%`, background:g.pct>=85?T.emerald:T.green, borderRadius:99 }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Proposal fee summary */}
              {cfg.sections.includes("fees") && (
                <div style={{ margin:"0 18px 18px", background:T.gray50, border:`1px solid ${T.gray200}`, borderRadius:10, padding:"14px 16px", display:"flex", gap:18, flexWrap:"wrap" }}>
                  {[
                    { label:"Advisory Fee",      value:"0.85%"     },
                    { label:"Est. Annual Fee",   value:"$21,250"   },
                    { label:"Target Return",     value:"7.8% / yr" },
                    { label:"Risk Profile",      value:"Moderate"  },
                  ].map(f=>(
                    <div key={f.label}>
                      <div style={{ fontSize:9, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:3 }}>{f.label}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:T.gray900 }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quarterly drift alert */}
              {cfg.sections.includes("drift") && (
                <div data-demo="drift-alert" style={{ margin:"0 18px 18px", background:T.amberLt, border:`1px solid ${T.amber}40`, borderRadius:8, padding:"11px 14px", display:"flex", gap:9, alignItems:"flex-start" }}>
                  <AlertTriangle size={15} color={T.amber} style={{ flexShrink:0, marginTop:1 }}/>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:T.gray900, marginBottom:2 }}>Allocation Drift Detected</div>
                    <div style={{ fontSize:11, color:T.gray600, lineHeight:1.5 }}>US Equity is 6.2pts above target allocation of 36%. Rebalancing recommended before Q3.</div>
                  </div>
                </div>
              )}

              <div style={{ background:T.gray50, borderTop:`1px solid ${T.gray200}`, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
                <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer", minHeight:36 }}>{template==="proposal"?"Schedule Call":"Schedule Review"}</button>
                <button onClick={()=>setReportTab("generate")} style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, minHeight:36 }}>
                  <Zap size={12}/> {cfg.cta} <ChevronRight size={13}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LAYER 3: Client Portal ────────────────────────────────────────────────────
function ClientPortal({ bp, deepLink, reportDelivered }) {
  const { isMobile } = bp;
  const [tab, setTab] = useState("overview");
  useEffect(() => { if (deepLink?.portalTab) setTab(deepLink.portalTab); }, [deepLink]);
  const tabs = [{id:"overview",label:"Overview"},{id:"performance",label:"Performance"},{id:"documents",label:"Documents"},{id:"messages",label:"Messages"}];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      <div data-demo="portal-header" style={{ background:T.navy, borderRadius:"12px 12px 0 0", padding:isMobile?"16px":"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:T.white, flexShrink:0 }}>SC</div>
          <div><div style={{ fontSize:10, color:"#94A3B8", letterSpacing:"0.06em", textTransform:"uppercase" }}>Client Portal</div><div style={{ fontSize:isMobile?14:16, fontWeight:700, color:T.white }}>Sarah & Michael Chen</div></div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10, color:"#94A3B8" }}>Total Portfolio</div>
            <div style={{ fontSize:isMobile?16:20, fontWeight:700, color:T.white, fontVariantNumeric:"tabular-nums" }}>$4,284,500</div>
          </div>
          <div style={{ background:T.emerald, color:T.white, fontSize:11, fontWeight:700, padding:"4px 9px", borderRadius:99, display:"flex", alignItems:"center", gap:3, whiteSpace:"nowrap" }}>
            <ArrowUpRight size={11}/> +8.4% YTD
          </div>
        </div>
      </div>

      <div data-demo="portal-tabs" style={{ background:T.navyMid, padding:"0 4px", display:"flex", overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ background:"transparent", border:"none", borderBottom:`2px solid ${tab===t.id?T.emerald:"transparent"}`, padding:"11px 14px", fontSize:13, fontWeight:600, color:tab===t.id?T.white:"#94A3B8", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.15s", minHeight:44 }}>{t.label}</button>
        ))}
      </div>

      <div style={{ background:T.gray50, borderRadius:"0 0 12px 12px", padding:16, border:`1px solid ${T.gray200}`, borderTop:"none" }}>
        {tab==="overview" && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              <MetricCard label="Portfolio Value"  value="$4,284,500" delta="+2.4%"         up={true}  accent={T.green}  />
              <MetricCard label="YTD Return"        value="+8.4%"      delta="+2.2pts bench"  up={true}  accent={T.emerald}/>
              <MetricCard label="Unrealized Gains"  value="$312,400"   delta="+18.2%"         up={true}  accent={T.indigo} />
              <MetricCard label="Next Review"        value="Jul 15"     delta="36 days away"   up={true}  accent={T.amber}  />
            </div>
            <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:4 }}>Portfolio Growth</div>
              <div style={{ fontSize:18, fontWeight:700, color:T.gray900, marginBottom:12 }}>+$334,100 since Jan 1</div>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={[{month:"Jan",val:3950},{month:"Feb",val:4020},{month:"Mar",val:3980},{month:"Apr",val:4110},{month:"May",val:4200},{month:"Jun",val:4284}]}>
                  <defs><linearGradient id="clientGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={T.emerald} stopOpacity={0.2}/><stop offset="95%" stopColor={T.emerald} stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                  <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}K`}/>
                  <Tooltip contentStyle={{ borderRadius:8, fontSize:12 }} formatter={v=>[`$${v}K`,"Value"]}/>
                  <Area type="monotone" dataKey="val" stroke={T.emerald} strokeWidth={2.5} fill="url(#clientGrad)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 2fr", gap:16 }}>
              <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Asset Mix</div>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}>
                  <PieChart width={120} height={120}><Pie data={allocationData} cx={55} cy={55} innerRadius={32} outerRadius={52} dataKey="value">{allocationData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
                </div>
                {allocationData.map(a=>(
                  <div key={a.name} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <div style={{ width:7, height:7, borderRadius:2, background:a.color, flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:T.gray600, flex:1 }}>{a.name}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:T.gray900 }}>{a.value}%</span>
                  </div>
                ))}
              </div>
              <div data-demo="advisor-message" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px" }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:T.green, flexShrink:0 }}>JW</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4, marginBottom:6 }}>
                      <div><div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>Jordan Williams, CFP®</div><div style={{ fontSize:11, color:T.slate }}>Your Advisor · Fidelity Institutional</div></div>
                      <span style={{ fontSize:11, color:T.slate }}>Jun 6</span>
                    </div>
                    <div style={{ fontSize:13, color:T.gray600, lineHeight:1.6, marginBottom:12 }}>Hi Sarah and Michael — your Q2 report is ready. Your portfolio is up 8.4% YTD vs the 6.2% benchmark. I've flagged a small rebalancing opportunity in US equity. Let's discuss July 15th.</div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      <button style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", gap:5, alignItems:"center", minHeight:36 }}><FileText size={12}/> View Q2 Report</button>
                      <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer", display:"flex", gap:5, alignItems:"center", minHeight:36 }}><Mail size={12}/> Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab==="performance" && (
          <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"18px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Performance vs Benchmark</div>
            <div style={{ display:"flex", gap:20, marginBottom:16, flexWrap:"wrap" }}>
              {[{label:"Your Portfolio YTD",value:"+8.4%",color:T.green},{label:"Blended Benchmark",value:"+6.2%",color:T.gray400},{label:"Outperformance",value:"+2.2pts",color:T.emerald}].map(m=>(
                <div key={m.label}><div style={{ fontSize:22, fontWeight:700, color:m.color }}>{m.value}</div><div style={{ fontSize:11, color:T.slate }}>{m.label}</div></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={perfData} barGap={4} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                <Tooltip contentStyle={{ borderRadius:8, fontSize:11 }}/>
                <Bar dataKey="portfolio" fill={T.green}   radius={[3,3,0,0]} name="Your Portfolio"/>
                <Bar dataKey="benchmark" fill={T.gray200} radius={[3,3,0,0]} name="Benchmark"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {tab==="documents" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {reportDelivered && (
              <div style={{ background:T.emeraldLt, border:`1px solid ${T.emerald}50`, borderRadius:10, padding:"11px 16px", display:"flex", alignItems:"center", gap:10, animation:"fade-in-up 0.4s ease" }}>
                <Check size={15} color={T.emerald}/>
                <span style={{ fontSize:13, fontWeight:700, color:T.emerald }}>Q2 Report just delivered · Portal updated · Email sent to 2 recipients</span>
              </div>
            )}
            {[{name:"Q2 2025 Performance Report",date:"Jun 9, 2025",isNew:true},{name:"Q1 2025 Performance Report",date:"Mar 12, 2025",isNew:false},{name:"2024 Annual Review",date:"Jan 8, 2025",isNew:false},{name:"Investment Policy Statement",date:"Aug 14, 2024",isNew:false},{name:"Account Opening Documents",date:"May 2, 2023",isNew:false}].map(doc=>(
              <div key={doc.name} style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:10, padding:"13px 16px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:8, background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FileText size={15} color={T.green}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}><span style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{doc.name}</span>{doc.isNew&&<Badge color={T.green} bg={T.greenLt}>{reportDelivered?"JUST DELIVERED":"NEW"}</Badge>}</div>
                  <div style={{ fontSize:11, color:T.slate, marginTop:2 }}>{doc.date}</div>
                </div>
                <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"6px 12px", fontSize:11, fontWeight:600, color:T.gray600, cursor:"pointer", display:"flex", gap:5, alignItems:"center", flexShrink:0, minHeight:34 }}><Download size={11}/> {isMobile?"":"Download"}</button>
              </div>
            ))}
          </div>
        )}
        {tab==="messages" && (
          <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
            <div style={{ padding:"13px 16px", borderBottom:`1px solid ${T.gray100}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>Messages</span>
              <button style={{ background:T.greenLt, border:"none", borderRadius:7, padding:"6px 12px", fontSize:12, fontWeight:700, color:T.green, cursor:"pointer", minHeight:34 }}>+ New</button>
            </div>
            {[{from:"Jordan Williams, CFP®",body:"Your Q2 report is ready for review. Great quarter overall...",date:"Jun 6",unread:true},{from:"Jordan Williams, CFP®",body:"Following up on our April call — confirming the rebalance...",date:"Apr 18",unread:false},{from:"Fidelity Institutional",body:"Your Q1 2025 report is now available in your document vault.",date:"Mar 12",unread:false}].map((msg,i)=>(
              <div key={i} style={{ padding:"13px 16px", borderBottom:`1px solid ${T.gray100}`, display:"flex", gap:10, alignItems:"flex-start", background:msg.unread?`${T.greenLt}60`:T.white, cursor:"pointer" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.green, flexShrink:0 }}>JW</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3, gap:8 }}><span style={{ fontSize:12, fontWeight:msg.unread?700:600, color:T.gray900, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{msg.from}</span><span style={{ fontSize:11, color:T.slate, flexShrink:0 }}>{msg.date}</span></div>
                  <div style={{ fontSize:12, color:T.gray600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{msg.body}</div>
                </div>
                {msg.unread&&<div style={{ width:8, height:8, borderRadius:"50%", background:T.green, flexShrink:0, marginTop:4 }}/>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Strategy / Business Case ────────────────────────────────────────────────
// The research-to-prototype story: market + customer research → desired outcomes
// → job map → opportunity matrix → priorities → recommendations, each wired back
// to the live prototype surface that delivers it.
const STRAT_STATS = [
  { value:"11",        label:"High-opportunity outcomes" },
  { value:"13.0–17.0", label:"ODI opportunity scores" },
  { value:"5",         label:"Product layers shipped" },
  { value:"8-step",    label:"Universal job map covered" },
];

const MARKET_SIGNALS = [
  { tag:"Tool Sprawl",        stat:"12 apps",  source:"Kitces 2025",            icon:Layers,         body:"The average advisor stitches together 12 disconnected apps with no shared field mapping. Stale or mismatched data stays invisible until it corrupts a client report." },
  { tag:"NBA Capability Gap", stat:"1 / 10",   source:"vs Envestnet 25M/day",   icon:Zap,            body:"Wealthscape scored 1/10 on portfolio-level next-best-actions against Envestnet's 25M NBAs/day. Advisors rebuilt the logic by hand in spreadsheets." },
  { tag:"Portal Expectation", stat:"78%",      source:"Schwab 2024",            icon:Users,          body:"78% of clients now expect an interactive portal, not a static PDF. Wealthscape Investor had balances but no advisor-communication surface." },
  { tag:"Branded Output",     stat:"Advyzon",  source:"T3 Tech Survey",         icon:FileText,       body:"The highest-rated reporting tool was bundled into Wealthscape specifically because native reporting couldn't produce client-ready branded output." },
  { tag:"Shadow IT",          stat:"41%",      source:"Compliance exposure",    icon:AlertTriangle,  body:"41% of advisors already use ChatGPT/Claude outside the platform to write report narratives — an unaudited, off-platform compliance risk." },
  { tag:"Digital Sales Rooms",stat:"#1 growth",source:"InvestSuite 2025",       icon:Mail,           body:"Contextual advisor-client communication hubs are the fastest-growing wealthtech category. No equivalent existed in Wealthscape's client experience." },
];

const CUSTOMER_PAINS = [
  { metric:"~2 hrs",   pain:"Per client report — scheduling, running, reconciling, then rebuilding in Excel/PowerPoint just to add firm branding." },
  { metric:"12+",      pain:"Separate logins every morning to reconstruct a book-level view of what needs attention before market open." },
  { metric:"Manual",   pain:"Spreadsheet watchlists to track allocation drift, tax-loss windows, and at-risk clients — with no automated detection." },
  { metric:"Black box", pain:"Report exports with no validation trail; stale prices and missing corporate actions surfaced only after the client noticed." },
  { metric:"Fidelity", pain:"The client app carried the custodian's brand, not the advisor's — undercutting the independent RIA relationship." },
];

// imp = importance, sat = current satisfaction (both /10). Opportunity score per
// Ulwick ODI: Opp = Imp + max(Imp − Sat, 0). Layer = prototype surface that serves it.
const OUTCOMES = [
  { id:"ODI #5.1", imp:9.5, sat:2.0, text:"Generate a branded, client-ready report in a single tool",          layer:"reports",      sub:{reportTab:"generate"} },
  { id:"ODI #5.3", imp:9.4, sat:2.0, text:"Minimize the number of separate tools required to finish the job",   layer:"integrations", sub:null },
  { id:"ODI #13",  imp:9.3, sat:2.0, text:"Move from an insight to execution in one continuous motion",         layer:"morning",      sub:null },
  { id:"ODI #7",   imp:9.2, sat:2.1, text:"Know which clients are affected by an event before they call",        layer:"morning",      sub:null },
  { id:"ODI #8",   imp:9.0, sat:2.2, text:"Detect drift, tax-loss windows & rebalance triggers automatically",   layer:"morning",      sub:null },
  { id:"ODI #8.2", imp:8.8, sat:2.6, text:"Let clients interact with reports in a portal, not a static PDF",     layer:"portal",       sub:null },
  { id:"ODI #1",   imp:8.7, sat:2.8, text:"Know what needs attention right now, every morning",                 layer:"morning",      sub:null },
  { id:"ODI #12",  imp:8.6, sat:2.8, text:"Detect at-risk clients from behavioral patterns early",               layer:"morning",      sub:null },
  { id:"ODI #15",  imp:8.5, sat:2.8, text:"Produce an end-to-end audit trail as a by-product of the work",       layer:"reports",      sub:{reportTab:"generate"} },
  { id:"ODI #8.1", imp:8.0, sat:3.0, text:"Let clients reply to and contact their advisor in context",           layer:"portal",       sub:null },
  { id:"ODI #8.4", imp:8.1, sat:3.2, text:"Notify the advisor automatically when a client views a report",       layer:"portal",       sub:null },
];
const oppScore = o => o.imp + Math.max(o.imp - o.sat, 0);
const oppColor = v => v >= 16 ? T.green : v >= 14 ? T.indigo : T.slate;
const ratingColor = r => r === "strong" ? T.green : r === "partial" ? T.amber : T.red;
const ratingLabel = r => r === "strong" ? "Has it" : r === "partial" ? "Partial" : "Gap";
const callColor = c => ({ build:T.green, buy:T.indigo, partner:T.amber, wrap:T.emerald }[c] || T.slate);
const callLabel = c => ({ build:"Build", buy:"Buy", partner:"Partner", wrap:"Wrap" }[c] || c);
const LAYER_NAMES = { morning:"Morning Brief", reports:"Report Builder", portal:"Client Portal", integrations:"Integration Hub", insights:"Analytics" };
const layerName = id => LAYER_NAMES[id] || id;

const JOB_MAP = [
  { n:1, step:"Define",   goal:"Determine what needs attention today",        layer:"morning"      },
  { n:2, step:"Locate",   goal:"Gather the signals & affected clients",       layer:"morning"      },
  { n:3, step:"Prepare",  goal:"Assemble clean, reconciled custody data",     layer:"integrations" },
  { n:4, step:"Confirm",  goal:"Validate completeness & compliance",          layer:"reports"      },
  { n:5, step:"Execute",  goal:"Generate the branded client report",          layer:"reports"      },
  { n:6, step:"Monitor",  goal:"Track delivery, performance & drift",         layer:"insights"     },
  { n:7, step:"Modify",   goal:"Act on drift & rebalance triggers",           layer:"reports"      },
  { n:8, step:"Conclude", goal:"Deliver to & engage the client",              layer:"portal"       },
];

const RECOMMENDATIONS = [
  { n:1, title:"Lead every morning with a prioritized, AI-generated brief", surface:"Morning Brief",   layer:"morning",      sub:null,                      outcomes:["ODI #1","ODI #7","ODI #12"],   body:"One digest that ranks drift, tax windows, at-risk clients and overdue reviews — each with a one-click next-best-action." },
  { n:2, title:"Unify every signal into one alert store with action routing", surface:"Alert Center",  layer:"morning",      sub:null,                      outcomes:["ODI #13"],                      body:"A single inbox where every alert deep-links the advisor straight to the screen and sub-tab that resolves it." },
  { n:3, title:"Generate branded, compliance-resident reports in one tool",   surface:"Report Builder",layer:"reports",      sub:{reportTab:"generate"},    outcomes:["ODI #5.1","ODI #15"],           body:"A six-stage observable pipeline with inline AI narrative and compliance review — no Excel rebuild, full audit trail." },
  { n:4, title:"Consolidate the fragmented stack behind one data layer",      surface:"Integration Hub",layer:"integrations",sub:null,                      outcomes:["ODI #5.3"],                     body:"OAuth provider connections with explicit, inspectable field mapping feeding every report and alert." },
  { n:5, title:"Give clients an advisor-branded, interactive portal",         surface:"Client Portal", layer:"portal",       sub:null,                      outcomes:["ODI #8.2","ODI #8.1","ODI #8.4"],body:"Interactive reporting, in-context advisor messaging, and the firm's own brand — not the custodian's." },
];

const PLACEHOLDER_SIGNALS = [
  { tag:"Research Pending", stat:"v1", source:"Broker-dealer packet", icon:BookOpen, body:"This profile is wired into the prototype shell. The broker-dealer data lane will replace this placeholder with sourced market, capability, and outcome data." },
];
const PLACEHOLDER_PAINS = [
  { metric:"Next", pain:"Broker-dealer role-specific pains will be populated from the approved research packet." },
];
const PLACEHOLDER_OUTCOMES = [
  { id:"BD #1", imp:8.5, sat:3.5, text:"Placeholder broker-dealer outcome awaiting the strategy data lane", layer:"strategy", sub:null },
];
const PLACEHOLDER_JOB_MAP = [
  { n:1, step:"Define", goal:"Confirm broker-dealer profile priorities", layer:"strategy" },
  { n:2, step:"Locate", goal:"Map relevant supervision, advisor, and client signals", layer:"strategy" },
  { n:3, step:"Prepare", goal:"Prepare role-specific workflow data", layer:"strategy" },
  { n:4, step:"Confirm", goal:"Validate compliance and evidence requirements", layer:"strategy" },
  { n:5, step:"Execute", goal:"Route work to the right profile surface", layer:"strategy" },
  { n:6, step:"Monitor", goal:"Track profile-specific risks and outcomes", layer:"strategy" },
  { n:7, step:"Modify", goal:"Adjust recommendations based on profile context", layer:"strategy" },
  { n:8, step:"Conclude", goal:"Deliver a reviewable profile-specific action", layer:"strategy" },
];
const PLACEHOLDER_RECOMMENDATIONS = [
  { n:1, title:"Populate this profile from the broker-dealer research packet", surface:"Strategy", layer:"strategy", sub:null, outcomes:["BD #1"], body:"The architecture lane only wires the profile switcher and registry. Subsequent lanes add sourced broker-dealer strategy data and workflow surfaces." },
];

const BD_MARKET_SIGNALS = [
  { tag:"BD Scale", stat:"$641B", source:"SIFMA 2025 Fact Book", icon:BarChart2, body:"FINRA-registered broker-dealers generated $641.0B in gross revenue in 2024 while the number of firms declined to 3,249. The platform problem is fewer, larger, more complex firms." },
  { tag:"Firm Consolidation", stat:"3,249", source:"SIFMA 2025", icon:Layers, body:"The broker-dealer count fell 1.5% year over year. Scale is moving to firms that can operate supervision, advisor productivity, and product governance as one system." },
  { tag:"Regulatory Scope", stat:"2026", source:"FINRA Oversight", icon:AlertTriangle, body:"FINRA's 2026 report highlights GenAI, cyber-enabled fraud, senior investors, communications, market integrity, and third-party risk as live member-firm priorities." },
  { tag:"GenAI Governance", stat:"Rules apply", source:"FINRA GenAI", icon:Sparkles, body:"FINRA frames rules as technology-neutral. Firms need user-level and enterprise-level controls when GenAI enters advisor reporting, communications, and supervision." },
  { tag:"Records Pressure", stat:"17a-4", source:"SIFMA retention comment", icon:FileText, body:"SIFMA's 2025 request to modernize communications-retention rules shows how expensive and unresolved records capture remains for broker-dealers and dual registrants." },
  { tag:"Advisor Mobility", stat:"Hybrid growth", source:"Cerulli / Schwab", icon:Users, body:"Advisors continue to evaluate affiliation models around technology flexibility, support, custody choice, and independence. Platform friction is a retention signal." },
];

const BD_HOME_MARKET_SIGNALS = [
  BD_MARKET_SIGNALS[0],
  BD_MARKET_SIGNALS[1],
  BD_MARKET_SIGNALS[2],
  BD_MARKET_SIGNALS[3],
  BD_MARKET_SIGNALS[4],
  BD_MARKET_SIGNALS[5],
];

const BD_OSJ_MARKET_SIGNALS = [
  { tag:"Branch Supervision", stat:"2026", source:"FINRA Oversight", icon:AlertTriangle, body:"FINRA's 2026 priorities make branch-level evidence, communications review, senior-investor protection, and escalation discipline a daily operating burden for local principals." },
  { tag:"Exception Context", stat:"Local", source:"FINRA supervision themes", icon:Activity, body:"Home-office alerts only become useful when the OSJ can connect them to the rep, client, product, aging, and evidence needed for a review-ready decision." },
  { tag:"GenAI In The Field", stat:"Rules apply", source:"FINRA GenAI", icon:Sparkles, body:"Advisor use of GenAI in narratives, emails, and next-best-action drafting still needs local supervision, approved-use boundaries, and explainable review trails." },
  { tag:"Records Pressure", stat:"17a-4", source:"SIFMA retention comment", icon:FileText, body:"Modern communications retention remains unresolved for broker-dealers and dual registrants, which keeps OSJs exposed when evidence is spread across tools." },
  { tag:"Rep Development", stat:"42 reps", source:"Profile packet", icon:Users, body:"The branch principal's real unit of work is often coaching: repeated exception patterns should turn into rep-specific training before they become complaints or audit findings." },
  { tag:"Advisor Mobility", stat:"Friction risk", source:"Cerulli / Schwab", icon:TrendingUp, body:"Technology flexibility and support quality influence affiliation decisions. Local friction and unresolved escalations are early warning signals for advisor retention." },
];

const BD_HYBRID_MARKET_SIGNALS = [
  { tag:"Hybrid Growth", stat:"RIA + BD", source:"Cerulli / Schwab", icon:Users, body:"Hybrid and independent affiliation channels keep growing as advisors seek flexibility, custody choice, and more control over the client experience." },
  { tag:"Wealth Trends", stat:"2026", source:"Fidelity trends", icon:TrendingUp, body:"Fidelity's 2026 wealth-management trends point to AI, new asset classes, cybersecurity, M&A, and broader definitions of wealthy-investor success." },
  { tag:"Mixed Book", stat:"Many rails", source:"Profile packet", icon:Layers, body:"Brokerage, advisory, annuity, insurance, planning, cash, suitability, and account-opening work often sit in separate systems even when the client sees one relationship." },
  { tag:"Client Explanation", stat:"Approved", source:"FINRA / Fidelity AI", icon:FileText, body:"Client-ready narratives need to distinguish brokerage activity, advisory recommendations, product disclosures, and approved language without sending the team into manual rewrite mode." },
  { tag:"Workflow Blocks", stat:"Visible", source:"Fidelity trends", icon:AlertTriangle, body:"Account, product, suitability, supervision, and missing-data blockers need to appear in the same place as the recommendation the advisor is trying to deliver." },
  { tag:"GenAI Governance", stat:"Rules apply", source:"FINRA GenAI", icon:Sparkles, body:"AI can help hybrid teams explain complex relationships, but the output must carry policy status, supervision context, retention evidence, and product constraints." },
];

const BD_CAPABILITIES = [
  { capability:"Advisor-branded reporting", fidelity:"The current prototype improves on legacy Wealthscape reporting, but it is still centered on the independent-RIA use case.", rating:"partial", competitor:"Addepar, Advyzon, and Envestnet reporting ecosystems support richer advisor-branded reporting and client-facing presentation workflows.", source:"Research packet", gap:"Needs broker-dealer role context, supervision state, and multi-affiliation reporting." },
  { capability:"Enterprise supervision and evidence trail", fidelity:"Report-pipeline audit concepts exist in the RIA prototype, but supervisory queues are not represented.", rating:"partial", competitor:"Smarsh, Global Relay, and supervision/regtech workflows specialize in communications capture, review, retention, and evidence trails.", source:"FINRA / SIFMA", gap:"Needs integrated supervision workbench and retention/evidence status inside the daily platform." },
  { capability:"AI governance and review", fidelity:"AI narrative compliance review is visible, but there is no approved-use policy status or enterprise review queue.", rating:"partial", competitor:"Enterprise AI governance programs pair approved-use controls with activity review and model-risk monitoring.", source:"FINRA GenAI / Fidelity AI", gap:"Needs policy-aware AI status, user activity visibility, and review routing." },
  { capability:"Advisor productivity telemetry", fidelity:"The prototype shows book/client signals, not advisor adoption, support friction, or field productivity.", rating:"none", competitor:"Large wealth platforms and CRM/product analytics stacks track adoption, support, activity, and revenue impact together.", source:"Fidelity trends / Cerulli", gap:"Needs adoption, exception, support, and revenue context in one view." },
  { capability:"Branch/OSJ exception triage", fidelity:"The current RIA prototype has no OSJ or branch-principal workflow.", rating:"none", competitor:"Broker-dealer supervision dashboards and branch workflow systems route exceptions by severity, aging, rep, and evidence status.", source:"FINRA supervision themes", gap:"Needs branch principal queue, coaching prompts, and escalation packets." },
  { capability:"Hybrid brokerage/advisory client view", fidelity:"The current prototype assumes a single independent-RIA reporting relationship.", rating:"partial", competitor:"Integrated wealth platforms combine brokerage, advisory, planning, product, and account-opening context.", source:"Fidelity wealth trends", gap:"Needs relationship-level context plus product, suitability, and supervision blockers." },
];

const BD_BUILD_BUY = [
  { gap:"Enterprise supervision and evidence trail", role:"context", maturity:"high", urgency:"high", call:"partner", outcomes:["BD-HO #1","BD-OSJ #5"], rationale:"Supervision and retention rails are mature and regulated. The differentiated move is to partner for rails and surface the evidence inside Wealthscape workflows." },
  { gap:"AI governance and review", role:"core", maturity:"medium", urgency:"high", call:"wrap", outcomes:["BD-HO #2","BD-HA #5"], rationale:"AI governance cannot live outside the advisor workflow. Wealthscape should wrap enterprise controls with report, communications, and next-best-action review." },
  { gap:"Advisor productivity telemetry", role:"core", maturity:"medium", urgency:"medium", call:"build", outcomes:["BD-HO #3","BD-HO #5"], rationale:"Fidelity can differentiate by connecting usage, support, exceptions, and clearing/custody context into one advisor-retention signal." },
  { gap:"Branch/OSJ exception triage", role:"core", maturity:"medium", urgency:"high", call:"build", outcomes:["BD-OSJ #1","BD-OSJ #2"], rationale:"The branch-principal experience is a workflow differentiator and should feel native, not like a compliance-system embed." },
  { gap:"Hybrid brokerage/advisory client view", role:"core", maturity:"high", urgency:"high", call:"wrap", outcomes:["BD-HA #1","BD-HA #2"], rationale:"The data rails may exist across clearing, planning, and reporting systems. The value is the unified client and team experience on top." },
];

const BD_HOME_STATS = [
  { value:"6", label:"High-priority home-office outcomes" },
  { value:"14.0–16.5", label:"ODI opportunity scores" },
  { value:"4", label:"Enterprise moves" },
  { value:"8-step", label:"Supervision-to-action map" },
];
const BD_HOME_PAINS = [
  { metric:"4+", pain:"Risk signals live in separate supervision, trading, communications, and advisor-platform systems." },
  { metric:"Late", pain:"Home office learns about advisor friction after tickets, complaints, or retention risk is already visible." },
  { metric:"Policy gap", pain:"AI adoption is moving faster than approved-use, review, and retention workflows." },
  { metric:"Opaque", pain:"Platform investments are hard to prioritize because adoption, risk, and revenue impact are not in one view." },
];
const BD_HOME_OUTCOMES = [
  { id:"BD-HO #1", imp:9.4, sat:2.3, text:"Identify the highest-risk advisor, branch, product, or communications issue requiring home-office action", layer:"strategy", sub:null },
  { id:"BD-HO #2", imp:9.2, sat:2.6, text:"Confirm advisor-facing AI activity is approved, supervised, retained, and explainable", layer:"strategy", sub:null },
  { id:"BD-HO #3", imp:9.1, sat:2.8, text:"Connect platform adoption, supervision load, advisor productivity, and revenue impact in one view", layer:"strategy", sub:null },
  { id:"BD-HO #4", imp:8.9, sat:3.0, text:"Reduce delay between a field friction signal and a product, training, or supervision intervention", layer:"strategy", sub:null },
  { id:"BD-HO #5", imp:8.8, sat:3.1, text:"Detect advisor-retention risk before a recruiting event or custodian shift", layer:"strategy", sub:null },
  { id:"BD-HO #6", imp:8.6, sat:3.2, text:"Prove that a supervisory action was completed with the right evidence", layer:"strategy", sub:null },
];
const BD_HOME_RECOMMENDATIONS = [
  { n:1, title:"Rank enterprise risk by advisor, branch, product, and communication type", surface:"Supervision Command", layer:"strategy", sub:null, outcomes:["BD-HO #1","BD-HO #6"], body:"A home-office command center that combines supervision state, records evidence, and next action in one prioritized queue." },
  { n:2, title:"Make AI activity policy-aware before it becomes field shadow IT", surface:"AI Governance", layer:"strategy", sub:null, outcomes:["BD-HO #2"], body:"Approved-use status, user activity, report narratives, and review routing should travel with every AI-assisted recommendation." },
  { n:3, title:"Pair risk with advisor productivity telemetry", surface:"Platform Telemetry", layer:"strategy", sub:null, outcomes:["BD-HO #3","BD-HO #4"], body:"Adoption, exceptions, support tickets, and revenue context should explain whether controls are improving or slowing the field." },
  { n:4, title:"Treat advisor retention as an operational signal", surface:"Retention Watchlist", layer:"strategy", sub:null, outcomes:["BD-HO #5"], body:"Declining adoption, repeated exceptions, support escalation, and custody friction become early warning signs." },
];

const BD_OSJ_STATS = [
  { value:"5", label:"Branch-principal outcomes" },
  { value:"13.7–16.2", label:"ODI opportunity scores" },
  { value:"4", label:"Local workflow moves" },
  { value:"8-step", label:"Exception-to-evidence map" },
];
const BD_OSJ_PAINS = [
  { metric:"Queue", pain:"Exception queues are sorted by system timestamp, not local client, rep, or revenue impact." },
  { metric:"Manual", pain:"OSJ staff translate home-office alerts into rep-level coaching and next steps by hand." },
  { metric:"Repeated", pain:"Local principals struggle to see which reps create repeated friction before it becomes an audit issue." },
  { metric:"Context loss", pain:"Escalations lose evidence and ownership context as they move between branch and home office." },
];
const BD_OSJ_OUTCOMES = [
  { id:"BD-OSJ #1", imp:9.3, sat:2.4, text:"Triage branch exceptions most likely to block client service or create regulatory risk", layer:"strategy", sub:null },
  { id:"BD-OSJ #2", imp:9.0, sat:2.8, text:"Translate home-office findings into rep-specific action and coaching", layer:"strategy", sub:null },
  { id:"BD-OSJ #3", imp:8.9, sat:3.0, text:"See repeated rep friction patterns before they become audit findings or client complaints", layer:"strategy", sub:null },
  { id:"BD-OSJ #4", imp:8.7, sat:3.1, text:"Preserve context when escalating branch issues to home office supervision or product support", layer:"strategy", sub:null },
  { id:"BD-OSJ #5", imp:8.5, sat:3.3, text:"Confirm every reviewed exception has a complete evidence trail", layer:"strategy", sub:null },
];
const BD_OSJ_RECOMMENDATIONS = [
  { n:1, title:"Sort exceptions by severity, client impact, aging, and rep pattern", surface:"Branch Workbench", layer:"strategy", sub:null, outcomes:["BD-OSJ #1"], body:"The OSJ queue should explain what to review first and why it matters locally." },
  { n:2, title:"Turn exceptions into rep coaching prompts", surface:"Rep Coaching", layer:"strategy", sub:null, outcomes:["BD-OSJ #2","BD-OSJ #3"], body:"Repeated issues become targeted coaching opportunities rather than one-off queue cleanup." },
  { n:3, title:"Create escalation packets that carry evidence forward", surface:"Escalation Packet", layer:"strategy", sub:null, outcomes:["BD-OSJ #4","BD-OSJ #5"], body:"Owner, due date, evidence, branch notes, and home-office status move together." },
  { n:4, title:"Balance local compliance load with growth visibility", surface:"Branch Health", layer:"strategy", sub:null, outcomes:["BD-OSJ #3"], body:"Principals need to see which reps are productive, stuck, or repeatedly creating avoidable risk." },
];

const BD_HYBRID_STATS = [
  { value:"5", label:"Hybrid advisor outcomes" },
  { value:"14.0–16.3", label:"ODI opportunity scores" },
  { value:"4", label:"Team workflow moves" },
  { value:"8-step", label:"Client relationship map" },
];
const BD_HYBRID_PAINS = [
  { metric:"Split", pain:"The advisory and brokerage sides of the client relationship feel like separate operating systems." },
  { metric:"Status checks", pain:"Account opening and product workflows require repeated checks across forms, suitability, supervision, and operations." },
  { metric:"Hard to explain", pain:"Client reports do not clearly show why brokerage, advisory, annuity, and planning pieces belong together." },
  { metric:"Blocked", pain:"Advisor teams cannot quickly tell whether a client action is blocked by supervision, product eligibility, or missing data." },
];
const BD_HYBRID_OUTCOMES = [
  { id:"BD-HA #1", imp:9.4, sat:2.5, text:"Understand a client's full brokerage, advisory, planning, and product relationship in one view", layer:"strategy", sub:null },
  { id:"BD-HA #2", imp:9.1, sat:2.7, text:"Produce a client-ready explanation that is compliant across brokerage and advisory contexts", layer:"strategy", sub:null },
  { id:"BD-HA #3", imp:9.0, sat:2.9, text:"See what is blocking an account, product, or recommendation workflow", layer:"strategy", sub:null },
  { id:"BD-HA #4", imp:8.8, sat:3.1, text:"Reduce handoffs needed to resolve suitability, eligibility, or supervision questions", layer:"strategy", sub:null },
  { id:"BD-HA #5", imp:8.6, sat:3.2, text:"Confirm client communications and report narratives match approved product and account context", layer:"strategy", sub:null },
];
const BD_HYBRID_RECOMMENDATIONS = [
  { n:1, title:"Unify brokerage, advisory, planning, annuity, and cash context", surface:"Relationship 360", layer:"strategy", sub:null, outcomes:["BD-HA #1"], body:"A hybrid advisor should not need separate views to understand the whole client relationship." },
  { n:2, title:"Show workflow blockers at the top of the client record", surface:"Blocker Strip", layer:"strategy", sub:null, outcomes:["BD-HA #3","BD-HA #4"], body:"Account opening, product approvals, suitability, signatures, and supervision holds become visible before the client asks." },
  { n:3, title:"Generate context-aware report narratives", surface:"Hybrid Reporting", layer:"strategy", sub:null, outcomes:["BD-HA #2","BD-HA #5"], body:"Narratives should distinguish advisory recommendations, brokerage activity, product disclosures, and approved language." },
  { n:4, title:"Route team actions by owner and blocker type", surface:"Team Queue", layer:"strategy", sub:null, outcomes:["BD-HA #3","BD-HA #4"], body:"Every blocker points to the right advisor, CSA, principal, or home-office team." },
];

const makeBdJobMap = (define, locate, prepare, confirm, execute, monitor, modify, conclude) => [
  { n:1, step:"Define", goal:define, layer:"strategy" },
  { n:2, step:"Locate", goal:locate, layer:"strategy" },
  { n:3, step:"Prepare", goal:prepare, layer:"strategy" },
  { n:4, step:"Confirm", goal:confirm, layer:"strategy" },
  { n:5, step:"Execute", goal:execute, layer:"strategy" },
  { n:6, step:"Monitor", goal:monitor, layer:"strategy" },
  { n:7, step:"Modify", goal:modify, layer:"strategy" },
  { n:8, step:"Conclude", goal:conclude, layer:"strategy" },
];

const BD_WORKSPACES = {
  homeOffice: {
    eyebrow:"Home Office Workspace",
    title:"Supervision Command Center",
    intro:"A governed operating view for platform strategy, supervision, AI activity, and advisor-friction signals.",
    metrics:[
      { label:"High-risk branches", value:"7", tone:"red" },
      { label:"AI reviews due", value:"42", tone:"amber" },
      { label:"Advisor friction index", value:"+18%", tone:"amber" },
      { label:"Retention watchlist", value:"23", tone:"indigo" },
    ],
    queue:[
      { title:"Off-channel communications spike", meta:"Northeast region · 18 advisors · 3-day trend", action:"Open supervision packet", severity:"Critical" },
      { title:"Unapproved AI narrative usage", meta:"Retirement income reports · 11 generated summaries", action:"Route to AI review", severity:"High" },
      { title:"Platform adoption drop", meta:"Commonwealth-transition segment · reporting usage -24%", action:"Assign field intervention", severity:"Watch" },
    ],
    actions:["Review AI policy exceptions", "Open advisor-retention watchlist", "Export branch evidence packet"],
  },
  osj: {
    eyebrow:"OSJ Workspace",
    title:"Branch Exception Workbench",
    intro:"A local queue that turns home-office findings into rep-specific action, coaching, escalation, and evidence.",
    metrics:[
      { label:"Aging exceptions", value:"31", tone:"red" },
      { label:"Rep support queue", value:"18", tone:"amber" },
      { label:"Escalations pending", value:"6", tone:"indigo" },
      { label:"Evidence complete", value:"84%", tone:"green" },
    ],
    queue:[
      { title:"Variable annuity disclosure missing", meta:"Rep: L. Benton · 2 clients · 4 days aging", action:"Send coaching note", severity:"Critical" },
      { title:"Trade rationale incomplete", meta:"Rep: R. Patel · concentrated equity order", action:"Build escalation packet", severity:"High" },
      { title:"Repeat NIGO trend", meta:"Three newer reps · account transfers", action:"Assign branch training", severity:"Watch" },
    ],
    actions:["Open branch exception queue", "Create rep coaching plan", "Package escalation evidence"],
    exceptionReview:[
      { severity:"Critical", title:"VA replacement disclosure gap", rep:"L. Benton", clients:"2 clients", aging:"4d", pattern:"3rd disclosure miss this quarter", evidence:"Missing signed rider", route:"Rep coaching + branch attestation" },
      { severity:"High", title:"Concentrated equity rationale", rep:"R. Patel", clients:"$8.1M household", aging:"2d", pattern:"Single-order exposure > policy threshold", evidence:"Trade note incomplete", route:"Home-office supervision packet" },
      { severity:"Watch", title:"Transfer NIGO cluster", rep:"New rep cohort", clients:"7 transfers", aging:"6d", pattern:"Repeat beneficiary mismatch", evidence:"Forms captured, checklist missing", route:"Group office-hours training" },
    ],
    repSupport:[
      { rep:"L. Benton", need:"Disclosure language review", queue:"5 open", sla:"Today", tone:"red" },
      { rep:"M. Okafor", need:"ACAT paperwork correction", queue:"3 open", sla:"24h", tone:"amber" },
      { rep:"R. Patel", need:"Trade rationale template", queue:"2 open", sla:"48h", tone:"indigo" },
    ],
    complianceLoad:[
      { label:"Reviews due today", value:"12", note:"6 are high-impact households", tone:"red" },
      { label:"Principal attestations", value:"9", note:"3 require evidence follow-up", tone:"amber" },
      { label:"Training actions", value:"4", note:"Two reps share same pattern", tone:"indigo" },
    ],
    bookHealth:[
      { rep:"L. Benton", book:"$186M", risk:"High", driver:"Disclosure repeat pattern", support:"Coaching note drafted", tone:"red" },
      { rep:"M. Okafor", book:"$142M", risk:"Medium", driver:"Transfer paperwork aging", support:"Ops queue paired", tone:"amber" },
      { rep:"D. Mensah", book:"$214M", risk:"Low", driver:"Clean evidence trail", support:"Use as branch model", tone:"green" },
    ],
    escalationRoutes:[
      { route:"Home Office Supervision", trigger:"Policy threshold or incomplete evidence after 48h", owner:"Branch principal", handoff:"Exception packet + rep notes" },
      { route:"Product Specialist", trigger:"Annuity, alternatives, or structured product question", owner:"Rep support lead", handoff:"Client context + suitability flags" },
      { route:"Operations Desk", trigger:"NIGO, ACAT, account-opening, or missing document issue", owner:"Office manager", handoff:"Form status + next required field" },
    ],
  },
  hybrid: {
    eyebrow:"Hybrid Team Workspace",
    title:"Relationship 360 Action Queue",
    intro:"A team view that connects brokerage, advisory, planning, account-opening, and supervision blockers to client-ready actions.",
    metrics:[
      { label:"Client blockers", value:"14", tone:"amber" },
      { label:"Suitability holds", value:"5", tone:"red" },
      { label:"Mixed-book reviews", value:"22", tone:"indigo" },
      { label:"Narratives cleared", value:"91%", tone:"green" },
    ],
    queue:[
      { title:"Chen household product context split", meta:"Advisory allocation + brokerage annuity trail", action:"Open relationship 360", severity:"High" },
      { title:"Account package waiting on suitability", meta:"Roth conversion + structured note discussion", action:"Resolve blocker", severity:"Critical" },
      { title:"Q2 report needs brokerage disclosure", meta:"AI narrative generated · disclosure pending", action:"Send to principal review", severity:"Watch" },
    ],
    actions:["Open blocker strip", "Generate hybrid report narrative", "Route team action"],
  },
};

const makeProfile = ({
  id,
  label,
  shortLabel,
  eyebrow,
  shell,
  heroTitle,
  heroBody,
  persona,
  customerIntro,
  jobIntro,
  stats = STRAT_STATS,
  marketSignals = MARKET_SIGNALS,
  customerPains = CUSTOMER_PAINS,
  outcomes = OUTCOMES,
  jobMap = JOB_MAP,
  recommendations = RECOMMENDATIONS,
  capabilities = [],
  buildBuy = [],
  workspace = null,
  opportunitySummary = "Nine of eleven outcomes land in the underserved zone, confirming a real, fundable gap rather than incremental polish.",
}) => ({
  id,
  label,
  shortLabel,
  eyebrow,
  shell,
  strategy: {
    heroTitle,
    heroBody,
    persona,
    customerIntro,
    jobIntro,
    stats,
    marketSignals,
    customerPains,
    outcomes,
    jobMap,
    recommendations,
    capabilities,
    buildBuy,
    workspace,
    opportunitySummary,
  },
});

const DEFAULT_PROFILE_ID = "ria";
const PROFILE_ORDER = [DEFAULT_PROFILE_ID, "bd-home-office", "bd-osj-principal", "bd-hybrid-advisor"];
const STRATEGY_PROFILES = {
  ria: makeProfile({
    id:DEFAULT_PROFILE_ID,
    label:"RIA Advisor",
    shortLabel:"RIA",
    eyebrow:"Independent advisor view",
    shell:{ initials:"JW", name:"Jordan Williams", role:"Senior Advisor" },
    heroTitle:"From research to a working prototype",
    heroBody:"We studied the independent-RIA advisor's job, measured 11 high-opportunity outcomes against what Wealthscape delivers today, and mapped every gap to a shippable surface. This is the evidence trail behind every screen in this prototype.",
    persona:{ initials:"JW", name:"Jordan Williams", role:"Senior Advisor · Independent RIA", details:[["Book","~$1.57B AUA"],["Households","134 active"],["Goal","Scale client reporting past 30 clients without losing the personal touch"]] },
    customerIntro:"Primary research with independent RIA advisors managing 30–150 client households — the persona embodied by Jordan Williams in this prototype.",
    jobIntro:"The advisor's core job — 'deliver a clear, timely account of how my clients' money is doing' — decomposed into the eight universal job steps. Each step is owned by a prototype layer.",
  }),
  "bd-home-office": makeProfile({
    id:"bd-home-office",
    label:"BD Home Office",
    shortLabel:"Home Office",
    eyebrow:"Enterprise broker-dealer view",
    shell:{ initials:"MO", name:"Maya Okonkwo", role:"Head of Platform Strategy" },
    heroTitle:"Broker-dealer home-office strategy",
    heroBody:"The broker-dealer home office has a different job than an independent RIA: scale advisor productivity while making supervision, AI governance, platform risk, and field friction visible before they become regulatory or retention issues.",
    persona:{ initials:"MO", name:"Maya Okonkwo", role:"Head of Platform Strategy · National Broker-Dealer", details:[["Firm","8,000 affiliated reps"],["Model","Multi-custodial clearing"],["Revenue","Mixed brokerage and advisory"],["Governance","Centralized supervision and product governance"],["Goal","Scale advisor productivity while keeping supervision, AI, and platform risk visible"]] },
    customerIntro:"The home-office executor owns platform strategy, supervision load, AI policy, advisor adoption, and retention risk across a large affiliated network.",
    jobIntro:"The home-office job is to turn scattered risk, adoption, and field-friction signals into governed action without slowing productive advisors.",
    stats:BD_HOME_STATS,
    marketSignals:BD_HOME_MARKET_SIGNALS,
    customerPains:BD_HOME_PAINS,
    outcomes:BD_HOME_OUTCOMES,
    jobMap:makeBdJobMap("Set the enterprise risk and productivity priorities", "Find advisor, branch, product, AI, and communications signals", "Normalize signals into a governed operating queue", "Confirm policy, retention, evidence, and owner readiness", "Route the intervention to supervision, product, training, or field leadership", "Monitor adoption, exception load, and advisor-retention risk", "Adjust controls, training, or product investments", "Close the loop with evidence and field impact"),
    recommendations:BD_HOME_RECOMMENDATIONS,
    capabilities:BD_CAPABILITIES,
    buildBuy:BD_BUILD_BUY,
    workspace:BD_WORKSPACES.homeOffice,
    opportunitySummary:"All six home-office outcomes land at 14.0 or higher, with the critical gap around finding the highest-risk advisor, branch, product, or communications issue fast enough to act.",
  }),
  "bd-osj-principal": makeProfile({
    id:"bd-osj-principal",
    label:"OSJ Principal",
    shortLabel:"OSJ",
    eyebrow:"Branch supervision view",
    shell:{ initials:"KN", name:"Kwame Nkrumah", role:"OSJ Principal" },
    heroTitle:"OSJ and branch-principal strategy",
    heroBody:"The OSJ principal sits between the national home office and the producing rep. The prototype strategy shifts from client-reporting scale to exception triage, rep support, evidence, and local growth visibility.",
    persona:{ initials:"KN", name:"Kwame Nkrumah", role:"OSJ Principal · Regional Supervisory Unit", details:[["Scope","42 reps"],["Coverage","3 offices"],["Model","Regional supervisory unit inside a national broker-dealer"],["Accountability","Local compliance, rep coaching, and escalation evidence"],["Goal","Resolve branch exceptions without slowing client service"]] },
    customerIntro:"The OSJ executor needs to keep local rep activity review-ready while helping advisors resolve exceptions and serve clients without waiting on home-office translation.",
    jobIntro:"The OSJ job map turns home-office findings into local prioritization, rep coaching, escalation packets, and evidence-ready closure.",
    stats:BD_OSJ_STATS,
    marketSignals:BD_OSJ_MARKET_SIGNALS,
    customerPains:BD_OSJ_PAINS,
    outcomes:BD_OSJ_OUTCOMES,
    jobMap:makeBdJobMap("Determine which local exceptions matter first", "Find affected reps, clients, products, and evidence", "Organize exceptions into coachable work", "Confirm severity, evidence, and escalation need", "Resolve, coach, or escalate the branch issue", "Monitor repeated rep friction and aging queues", "Adjust coaching, process, or escalation path", "Close with evidence and branch-level learning"),
    recommendations:BD_OSJ_RECOMMENDATIONS,
    capabilities:BD_CAPABILITIES,
    buildBuy:BD_BUILD_BUY,
    workspace:BD_WORKSPACES.osj,
    opportunitySummary:"Four of five OSJ outcomes land in the high or critical opportunity bands, led by faster triage of branch exceptions that block client service or create regulatory risk.",
  }),
  "bd-hybrid-advisor": makeProfile({
    id:"bd-hybrid-advisor",
    label:"Hybrid Advisor",
    shortLabel:"Hybrid",
    eyebrow:"Hybrid brokerage/advisory view",
    shell:{ initials:"AD", name:"Amina Diallo", role:"Hybrid Advisor" },
    heroTitle:"Hybrid advisor and team strategy",
    heroBody:"The hybrid advisor needs the client relationship to make sense across brokerage, advisory, planning, annuities, product workflows, and supervision context. The broker-dealer strategy has to make that complexity client-ready.",
    persona:{ initials:"AD", name:"Amina Diallo", role:"Lead Advisor · Hybrid Team", details:[["Team","5-person advisor team"],["Book","$680M advisory assets plus brokerage trails"],["Products","Brokerage, advisory, annuity, insurance, and planning"],["Supervision","Centralized broker-dealer review"],["Goal","Serve mixed brokerage/advisory relationships in one client-ready workflow"]] },
    customerIntro:"The hybrid advisor executor runs a mixed book where brokerage, advisory, annuity, planning, account-opening, and supervision workflows all affect the client experience.",
    jobIntro:"The hybrid advisor job map connects relationship context, product blockers, suitability, reporting, team ownership, and client-ready communication.",
    stats:BD_HYBRID_STATS,
    marketSignals:BD_HYBRID_MARKET_SIGNALS,
    customerPains:BD_HYBRID_PAINS,
    outcomes:BD_HYBRID_OUTCOMES,
    jobMap:makeBdJobMap("Clarify the client's full brokerage/advisory objective", "Locate all account, product, planning, and blocker signals", "Prepare a unified relationship view and team action queue", "Confirm suitability, eligibility, supervision, and narrative context", "Create the client-ready recommendation or report", "Monitor blockers, communications, and client response", "Modify ownership, disclosures, or next steps", "Deliver a complete explanation with approved evidence"),
    recommendations:BD_HYBRID_RECOMMENDATIONS,
    capabilities:BD_CAPABILITIES,
    buildBuy:BD_BUILD_BUY,
    workspace:BD_WORKSPACES.hybrid,
    opportunitySummary:"All five hybrid-advisor outcomes land at 14.0 or higher, with the biggest gap around seeing the full brokerage, advisory, planning, and product relationship in one place.",
  }),
};

function createProfileRegistry(profiles, { defaultProfileId, profileOrder }) {
  const declaredOrder = profileOrder.filter(id => profiles[id]);
  const extraProfileIds = Object.keys(profiles).filter(id => !declaredOrder.includes(id));
  const normalizedOrder = [...declaredOrder, ...extraProfileIds];

  return {
    profiles,
    profileOrder: normalizedOrder,
    defaultProfileId: profiles[defaultProfileId] ? defaultProfileId : normalizedOrder[0],
  };
}

const PROFILE_REGISTRY = createProfileRegistry(STRATEGY_PROFILES, {
  defaultProfileId: DEFAULT_PROFILE_ID,
  profileOrder: PROFILE_ORDER,
});

function normalizeProfileId(profileId) {
  return PROFILE_REGISTRY.profiles[profileId] ? profileId : PROFILE_REGISTRY.defaultProfileId;
}

function getProfileById(profileId) {
  return PROFILE_REGISTRY.profiles[normalizeProfileId(profileId)];
}

function StratSection({ eyebrow, title, intro, children }) {
  return (
    <section style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <div style={{ fontSize:10, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>{eyebrow}</div>
        <div style={{ fontSize:18, fontWeight:800, color:T.gray900, letterSpacing:"-0.01em" }}>{title}</div>
        {intro && <div style={{ fontSize:13, color:T.slate, lineHeight:1.6, marginTop:6, maxWidth:760 }}>{intro}</div>}
      </div>
      {children}
    </section>
  );
}

function ProfileSwitcher({ profiles, profileOrder, activeProfileId, onProfileChange, compact = false }) {
  const selectedProfileId = profiles[activeProfileId] ? activeProfileId : profileOrder[0];

  return (
    <label style={{ display:"flex", alignItems:"center", gap:8, minWidth:compact?120:180 }}>
      {!compact && <span style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Profile</span>}
      <select
        value={selectedProfileId}
        onChange={e=>onProfileChange(e.target.value)}
        style={{ width:"100%", border:`1px solid ${T.gray200}`, background:T.white, color:T.gray900, borderRadius:8, padding:compact?"7px 8px":"8px 10px", fontSize:compact?12:13, fontWeight:700, outline:"none", cursor:"pointer" }}
      >
        {profileOrder.map(id=>{
          const profile = profiles[id];
          if (!profile) return null;
          return <option key={id} value={id}>{profile.label}</option>;
        })}
      </select>
    </label>
  );
}

function BrokerDealerWorkspace({ workspace, isMobile }) {
  if (!workspace) return null;
  const toneColor = tone => ({ red:T.red, amber:T.amber, indigo:T.indigo, green:T.green }[tone] || T.slate);
  const severityColor = severity => ({ Critical:T.red, High:T.amber, Watch:T.indigo }[severity] || T.slate);
  return (
    <StratSection eyebrow={workspace.eyebrow} title={workspace.title} intro={workspace.intro}>
      <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:14, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)", borderBottom:`1px solid ${T.gray100}` }}>
          {workspace.metrics.map((m,i)=>(
            <div key={m.label} style={{ padding:"14px 16px", borderLeft:i&&!isMobile?`1px solid ${T.gray100}`:"none", borderTop:i>1&&isMobile?`1px solid ${T.gray100}`:"none" }}>
              <div style={{ fontSize:22, fontWeight:800, color:toneColor(m.tone), letterSpacing:"-0.02em" }}>{m.value}</div>
              <div style={{ fontSize:10.5, color:T.slate, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", marginTop:3 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:isMobile?"14px":"16px 18px", display:"grid", gridTemplateColumns:isMobile?"1fr":"1.4fr 0.6fr", gap:16 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {workspace.queue.map(item=>(
              <div key={item.title} style={{ border:`1px solid ${T.gray200}`, borderRadius:10, padding:"12px 14px", display:"flex", gap:12, alignItems:isMobile?"stretch":"center", flexDirection:isMobile?"column":"row" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ background:`${item.severity==="Critical"?T.red:item.severity==="High"?T.amber:T.indigo}18`, color:item.severity==="Critical"?T.red:item.severity==="High"?T.amber:T.indigo, borderRadius:99, padding:"3px 8px", fontSize:10, fontWeight:800 }}>{item.severity}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{item.title}</span>
                  </div>
                  <div style={{ fontSize:12, color:T.slate, lineHeight:1.45 }}>{item.meta}</div>
                </div>
                <button style={{ alignSelf:isMobile?"stretch":"center", background:T.green, color:T.white, border:"none", borderRadius:8, padding:"9px 12px", fontSize:12, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>{item.action}</button>
              </div>
            ))}
          </div>
          <div style={{ background:T.gray50, borderRadius:10, padding:"13px 14px", display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontSize:10, fontWeight:800, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Next Actions</div>
            {workspace.actions.map(action=>(
              <button key={action} style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:8, padding:"10px 11px", fontSize:12, fontWeight:700, color:T.gray900, textAlign:"left", cursor:"pointer", display:"flex", justifyContent:"space-between", gap:8, alignItems:"center" }}>
                {action}<ChevronRight size={14} color={T.slate}/>
              </button>
            ))}
          </div>
        </div>
        {workspace.exceptionReview && (
          <div style={{ borderTop:`1px solid ${T.gray100}`, background:T.gray50, padding:isMobile?"14px":"16px 18px", display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1.35fr 0.65fr", gap:14, alignItems:"stretch" }}>
              <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
                <div style={{ padding:"13px 15px", borderBottom:`1px solid ${T.gray100}`, display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                  <div>
                    <div style={{ fontSize:10, fontWeight:800, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Exception Review</div>
                    <div style={{ fontSize:14, fontWeight:800, color:T.gray900, marginTop:2 }}>Severity, aging, pattern, evidence, route</div>
                  </div>
                  <Badge color={T.red} bg={T.redLt}>31 Open</Badge>
                </div>
                <div style={{ display:"flex", flexDirection:"column" }}>
                  {workspace.exceptionReview.map((item,i)=>(
                    <div key={item.title} style={{ padding:"13px 15px", borderTop:i?`1px solid ${T.gray100}`:"none", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 0.86fr", gap:12 }}>
                      <div>
                        <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:5 }}>
                          <span style={{ background:`${severityColor(item.severity)}18`, color:severityColor(item.severity), border:`1px solid ${severityColor(item.severity)}40`, borderRadius:99, padding:"3px 8px", fontSize:10, fontWeight:800 }}>{item.severity}</span>
                          <span style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{item.title}</span>
                        </div>
                        <div style={{ fontSize:12, color:T.slate, lineHeight:1.45 }}>{item.rep} · {item.clients} · {item.aging} aging</div>
                        <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.45, marginTop:6 }}>{item.pattern}</div>
                      </div>
                      <div style={{ display:"grid", gap:6 }}>
                        <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.4 }}><strong style={{ color:T.gray900 }}>Evidence:</strong> {item.evidence}</div>
                        <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.4 }}><strong style={{ color:T.gray900 }}>Route:</strong> {item.route}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"13px 15px", display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <Users size={14} color={T.indigo}/>
                    <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>Rep Support Queue</div>
                  </div>
                  {workspace.repSupport.map(item=>(
                    <div key={item.rep} style={{ borderTop:`1px solid ${T.gray100}`, paddingTop:10, display:"grid", gap:5 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:12.5, fontWeight:800, color:T.gray900 }}>{item.rep}</span>
                        <span style={{ fontSize:10, fontWeight:800, color:toneColor(item.tone), background:`${toneColor(item.tone)}16`, borderRadius:99, padding:"2px 8px" }}>{item.sla}</span>
                      </div>
                      <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.4 }}>{item.need}</div>
                      <div style={{ fontSize:10.5, color:T.slate, fontWeight:700 }}>{item.queue}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"13px 15px", display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <Activity size={14} color={T.green}/>
                    <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>Local Compliance Load</div>
                  </div>
                  {workspace.complianceLoad.map(item=>(
                    <div key={item.label} style={{ borderTop:`1px solid ${T.gray100}`, paddingTop:10 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:8, alignItems:"baseline" }}>
                        <span style={{ fontSize:11.5, fontWeight:700, color:T.slate }}>{item.label}</span>
                        <span style={{ fontSize:17, fontWeight:900, color:toneColor(item.tone), letterSpacing:"-0.02em" }}>{item.value}</span>
                      </div>
                      <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.4, marginTop:3 }}>{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
              <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"13px 15px", display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <TrendingUp size={14} color={T.green}/>
                    <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>Advisor Book Health</div>
                  </div>
                  <Badge color={T.green} bg={T.greenLt}>42 reps</Badge>
                </div>
                {workspace.bookHealth.map(item=>(
                  <div key={item.rep} style={{ borderTop:`1px solid ${T.gray100}`, paddingTop:10, display:"grid", gridTemplateColumns:isMobile?"1fr":"0.55fr 1fr", gap:8 }}>
                    <div>
                      <div style={{ fontSize:12.5, fontWeight:800, color:T.gray900 }}>{item.rep}</div>
                      <div style={{ fontSize:11, color:T.slate }}>{item.book} book</div>
                    </div>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:4 }}>
                        <span style={{ fontSize:10, fontWeight:800, color:toneColor(item.tone), background:`${toneColor(item.tone)}16`, borderRadius:99, padding:"2px 8px" }}>{item.risk} risk</span>
                        <span style={{ fontSize:11.5, color:T.gray600 }}>{item.driver}</span>
                      </div>
                      <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.4 }}>{item.support}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"13px 15px", display:"flex", flexDirection:"column", gap:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <ArrowUpRight size={14} color={T.indigo}/>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>Escalation Routing</div>
                </div>
                {workspace.escalationRoutes.map(item=>(
                  <div key={item.route} style={{ borderTop:`1px solid ${T.gray100}`, paddingTop:10, display:"grid", gap:5 }}>
                    <div style={{ fontSize:12.5, fontWeight:800, color:T.gray900 }}>{item.route}</div>
                    <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.45 }}>{item.trigger}</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10.5, color:T.indigo, fontWeight:800, background:T.indigoLt, borderRadius:99, padding:"2px 8px" }}>{item.owner}</span>
                      <span style={{ fontSize:10.5, color:T.slate, fontWeight:700, background:T.gray100, borderRadius:99, padding:"2px 8px" }}>{item.handoff}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StratSection>
  );
}

function StrategyLayer({ bp, profile, profiles, profileOrder, activeProfileId, onProfileChange, onNavigate, onStartTour, onStartScenario }) {
  const { isMobile } = bp;
  const strategy = profile.strategy;
  const ranked = [...strategy.outcomes].sort((a,b)=>oppScore(b)-oppScore(a));
  const maxOpp = ranked.length ? oppScore(ranked[0]) : 1;
  const card = { background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12 };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:30, maxWidth:1080, margin:"0 auto", paddingBottom:20 }}>

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, borderRadius:16, padding:isMobile?"22px 18px":"30px 32px", color:T.white }}>
        <div style={{ display:"flex", alignItems:isMobile?"stretch":"center", justifyContent:"space-between", gap:12, marginBottom:12, flexDirection:isMobile?"column":"row" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <div style={{ background:T.indigo, borderRadius:7, padding:"4px 9px", display:"flex", alignItems:"center", gap:6 }}>
              <BookOpen size={12} color={T.white}/><span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Business Case</span>
            </div>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>Outcome-Driven Innovation · Jobs-to-be-Done</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.92)", borderRadius:10, padding:6 }}>
            <ProfileSwitcher profiles={profiles} profileOrder={profileOrder} activeProfileId={activeProfileId} onProfileChange={onProfileChange} compact={isMobile}/>
          </div>
        </div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.58)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>{profile.eyebrow}</div>
        <div style={{ fontSize:isMobile?22:30, fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:10 }}>{strategy.heroTitle}</div>
        <div style={{ fontSize:isMobile?13:15, color:"rgba(255,255,255,0.78)", lineHeight:1.65, maxWidth:720 }}>
          {strategy.heroBody}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)", gap:isMobile?10:14, marginTop:22 }}>
          {strategy.stats.map(s=>(
            <div key={s.label} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"13px 14px" }}>
              <div style={{ fontSize:isMobile?20:24, fontWeight:800, letterSpacing:"-0.01em" }}>{s.value}</div>
              <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.6)", marginTop:3, lineHeight:1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <BrokerDealerWorkspace workspace={strategy.workspace} isMobile={isMobile}/>

      {/* 1 · Market research */}
      <StratSection eyebrow="01 · Market Research" title="The category is moving — Wealthscape wasn't" intro="Six external signals defined the competitive and regulatory pressure. Each one maps to a capability the legacy platform lacked.">
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr", gap:12 }}>
          {strategy.marketSignals.map(m=>{
            const Icon = m.icon;
            return (
              <div key={m.tag} style={{ ...card, padding:"15px 16px", display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:T.indigoLt, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon size={16} color={T.indigo}/></div>
                  <div style={{ fontSize:19, fontWeight:800, color:T.gray900, letterSpacing:"-0.02em" }}>{m.stat}</div>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{m.tag}</div>
                  <div style={{ fontSize:10, color:T.slate, fontWeight:600, marginTop:1 }}>{m.source}</div>
                </div>
                <div style={{ fontSize:12, color:T.gray600, lineHeight:1.55 }}>{m.body}</div>
              </div>
            );
          })}
        </div>
      </StratSection>

      {strategy.capabilities.length > 0 && (
        <StratSection eyebrow="02 · Capability Comparison" title="Where the current stack has gaps" intro="A broker-dealer lens changes the comparison: Wealthscape needs supervision, AI governance, platform telemetry, and hybrid-book context in addition to client-ready reporting.">
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {strategy.capabilities.map(c=>(
              <div key={c.capability} style={{ ...card, padding:isMobile?"14px":"15px 18px", display:"grid", gridTemplateColumns:isMobile?"1fr":"1.1fr 1.1fr 0.45fr 1.25fr", gap:12, alignItems:"start" }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900, marginBottom:4 }}>{c.capability}</div>
                  <div style={{ fontSize:11.5, color:T.slate, lineHeight:1.45 }}>{c.gap}</div>
                </div>
                <div>
                  <div style={{ fontSize:9.5, fontWeight:800, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>Current Wealthscape</div>
                  <div style={{ fontSize:12, color:T.gray600, lineHeight:1.45 }}>{c.fidelity}</div>
                </div>
                <div>
                  <span style={{ display:"inline-flex", background:`${ratingColor(c.rating)}18`, color:ratingColor(c.rating), border:`1px solid ${ratingColor(c.rating)}40`, borderRadius:99, padding:"4px 9px", fontSize:10, fontWeight:800 }}>{ratingLabel(c.rating)}</span>
                </div>
                <div>
                  <div style={{ fontSize:9.5, fontWeight:800, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>Reference</div>
                  <div style={{ fontSize:12, color:T.gray600, lineHeight:1.45 }}>{c.competitor}</div>
                  <div style={{ fontSize:10.5, color:T.indigo, fontWeight:700, marginTop:5 }}>{c.source}</div>
                </div>
              </div>
            ))}
          </div>
        </StratSection>
      )}

      {/* 2 · Customer research */}
      <StratSection eyebrow="02 · Customer Research" title="Who we studied & what hurt" intro={strategy.customerIntro}>
        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:14 }}>
          <div style={{ ...card, padding:"18px 20px", width:isMobile?"auto":260, flexShrink:0, background:T.navy, border:"none", color:T.white }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, marginBottom:12 }}>{strategy.persona.initials}</div>
            <div style={{ fontSize:15, fontWeight:700 }}>{strategy.persona.name}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginBottom:14 }}>{strategy.persona.role}</div>
            {strategy.persona.details.map(([k,v])=>(
              <div key={k} style={{ marginBottom:10 }}>
                <div style={{ fontSize:9.5, fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{k}</div>
                <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.92)", lineHeight:1.45, marginTop:2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Top pains, in their words</div>
            {strategy.customerPains.map((p,i)=>(
              <div key={i} style={{ ...card, padding:"12px 16px", display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ minWidth:74, fontSize:15, fontWeight:800, color:T.green, letterSpacing:"-0.01em" }}>{p.metric}</div>
                <div style={{ fontSize:12.5, color:T.gray600, lineHeight:1.5 }}>{p.pain}</div>
              </div>
            ))}
          </div>
        </div>
      </StratSection>

      {/* 3 · Desired outcomes */}
      <StratSection eyebrow="03 · Desired Outcomes" title="The outcomes this profile is trying to achieve" intro="Each outcome statement was rated for importance and current satisfaction. The opportunity score = Importance + max(Importance − Satisfaction, 0).">
        <div style={{ ...card, overflow:"hidden" }}>
          {ranked.map((o,i)=>{
            const v = oppScore(o);
            return (
              <div key={o.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 16px", borderTop:i?`1px solid ${T.gray100}`:"none" }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.slate, minWidth:56 }}>{o.id}</div>
                <div style={{ flex:1, fontSize:13, color:T.gray900, fontWeight:500, lineHeight:1.45 }}>{o.text}</div>
                <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                  <div style={{ width:isMobile?40:120, height:6, background:T.gray100, borderRadius:99, overflow:"hidden", display:isMobile?"none":"block" }}>
                    <div style={{ height:"100%", width:`${(v/maxOpp)*100}%`, background:oppColor(v), borderRadius:99 }}/>
                  </div>
                  <div style={{ fontSize:13, fontWeight:800, color:oppColor(v), minWidth:34, textAlign:"right" }}>{v.toFixed(1)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </StratSection>

      {/* 4 · Job map */}
      <StratSection eyebrow="04 · Job Map" title="The universal job, step by step" intro={strategy.jobIntro}>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)", gap:10 }}>
          {strategy.jobMap.map(j=>(
            <button key={j.n} onClick={()=>onNavigate(j.layer)} style={{ ...card, padding:"14px", textAlign:"left", cursor:"pointer", display:"flex", flexDirection:"column", gap:7, position:"relative" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:T.green, color:T.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{j.n}</div>
                <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{j.step}</div>
              </div>
              <div style={{ fontSize:11.5, color:T.gray600, lineHeight:1.5 }}>{j.goal}</div>
              <div style={{ fontSize:10, fontWeight:700, color:T.indigo, display:"flex", alignItems:"center", gap:3, marginTop:"auto" }}>{layerName(j.layer)} <ChevronRight size={11}/></div>
            </button>
          ))}
        </div>
      </StratSection>

      {/* 5 · Opportunity matrix */}
      <StratSection eyebrow="05 · Opportunity Matrix" title="Where to invest first" intro="Plotting every outcome by importance against current satisfaction. The upper-left band — high importance, low satisfaction — is underserved and where the highest opportunity scores cluster.">
        <div style={{ ...card, padding:isMobile?"16px":"22px" }}>
          <div style={{ display:"flex", gap:18, flexDirection:isMobile?"column":"row" }}>
            {/* Plot */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ position:"relative", height:isMobile?280:340, marginLeft:30, marginBottom:26 }}>
                {/* underserved diagonal band */}
                <div style={{ position:"absolute", inset:0, borderRadius:8, background:`linear-gradient(135deg, ${T.green}1F 0%, ${T.green}14 38%, transparent 46%)`, border:`1px solid ${T.gray200}` }}/>
                {/* grid lines */}
                {[25,50,75].map(p=>(
                  <div key={"h"+p} style={{ position:"absolute", left:0, right:0, top:`${p}%`, borderTop:`1px dashed ${T.gray200}` }}/>
                ))}
                {[25,50,75].map(p=>(
                  <div key={"v"+p} style={{ position:"absolute", top:0, bottom:0, left:`${p}%`, borderLeft:`1px dashed ${T.gray200}` }}/>
                ))}
                {/* zone label */}
                <div style={{ position:"absolute", top:10, left:10, fontSize:9.5, fontWeight:800, color:T.green, letterSpacing:"0.06em", textTransform:"uppercase", lineHeight:1.3 }}>Underserved<br/>Opportunity Zone</div>
                {/* points */}
                {strategy.outcomes.map(o=>{
                  const v = oppScore(o);
                  const left = Math.max(2, Math.min(96, (o.sat/6)*100));
                  const top  = Math.max(2, Math.min(94, (1-(o.imp-7.5)/(10-7.5))*100));
                  return (
                    <div key={o.id} title={`${o.id} · Opp ${v.toFixed(1)}`} style={{ position:"absolute", left:`${left}%`, top:`${top}%`, transform:"translate(-50%,-50%)", display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:13, height:13, borderRadius:"50%", background:oppColor(v), border:`2px solid ${T.white}`, boxShadow:"0 1px 4px rgba(0,0,0,0.2)", flexShrink:0 }}/>
                      <span style={{ fontSize:8.5, fontWeight:700, color:T.gray600, whiteSpace:"nowrap" }}>{o.id.replace("ODI ","")}</span>
                    </div>
                  );
                })}
                {/* Y axis label */}
                <div style={{ position:"absolute", left:-30, top:0, bottom:0, display:"flex", alignItems:"center" }}>
                  <span style={{ fontSize:9.5, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", transform:"rotate(-90deg)", whiteSpace:"nowrap" }}>Importance →</span>
                </div>
                {/* X axis label */}
                <div style={{ position:"absolute", left:0, right:0, bottom:-22, textAlign:"center", fontSize:9.5, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Current Satisfaction →</div>
              </div>
            </div>
            {/* Legend */}
            <div style={{ width:isMobile?"auto":170, flexShrink:0, display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Opportunity Tier</div>
              {[["Critical · ≥16",T.green],["High · 14–16",T.indigo],["Moderate · <14",T.slate]].map(([l,c])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:11, height:11, borderRadius:"50%", background:c, flexShrink:0 }}/>
                  <span style={{ fontSize:12, color:T.gray600, fontWeight:600 }}>{l}</span>
                </div>
              ))}
              <div style={{ background:T.greenLt, borderRadius:8, padding:"10px 12px", marginTop:4 }}>
                <div style={{ fontSize:11, color:T.gray600, lineHeight:1.5 }}>{strategy.opportunitySummary}</div>
              </div>
            </div>
          </div>
        </div>
      </StratSection>

      {/* 6 · Recommendations → prototype */}
      <StratSection eyebrow="06 · Recommendations" title="Recommended moves — and where to see each one live" intro="Every recommendation traces to the outcomes it serves and the prototype surface that delivers it. Open any surface to see the recommendation in action.">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {strategy.recommendations.map(r=>(
            <div key={r.n} style={{ ...card, padding:isMobile?"16px":"18px 20px", display:"flex", flexDirection:isMobile?"column":"row", gap:16, alignItems:isMobile?"stretch":"center" }}>
              <div style={{ width:34, height:34, borderRadius:9, background:T.green, color:T.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:800, flexShrink:0 }}>{r.n}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14.5, fontWeight:700, color:T.gray900, marginBottom:4, lineHeight:1.35 }}>{r.title}</div>
                <div style={{ fontSize:12.5, color:T.gray600, lineHeight:1.55, marginBottom:8 }}>{r.body}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {r.outcomes.map(id=><span key={id} style={{ fontSize:10, fontWeight:700, color:T.indigo, background:T.indigoLt, borderRadius:99, padding:"3px 9px" }}>{id}</span>)}
                </div>
              </div>
              <button onClick={()=>onNavigate(r.layer, r.sub)} style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:T.green, color:T.white, border:"none", borderRadius:8, padding:"9px 16px", fontSize:12.5, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                <Zap size={13}/> Open {r.surface} <ChevronRight size={14}/>
              </button>
            </div>
          ))}
        </div>
      </StratSection>

      {strategy.buildBuy.length > 0 && (
        <StratSection eyebrow="07 · Resolution Strategy" title="Build, buy, partner, or wrap" intro="Each key gap gets a sourcing call based on whether it is core or context, how mature external solutions are, and how urgent the active profile's outcome is.">
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
            {strategy.buildBuy.map(b=>(
              <div key={b.gap} style={{ ...card, padding:"15px 16px", display:"flex", flexDirection:"column", gap:9 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:T.gray900, lineHeight:1.35 }}>{b.gap}</div>
                  <span style={{ flexShrink:0, background:`${callColor(b.call)}18`, color:callColor(b.call), border:`1px solid ${callColor(b.call)}40`, borderRadius:99, padding:"4px 9px", fontSize:10, fontWeight:800 }}>{callLabel(b.call)}</span>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {[`Role: ${b.role}`, `Maturity: ${b.maturity}`, `Urgency: ${b.urgency}`].map(tag=>(
                    <span key={tag} style={{ fontSize:10, fontWeight:700, color:T.slate, background:T.gray100, borderRadius:99, padding:"3px 8px" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize:12, color:T.gray600, lineHeight:1.55 }}>{b.rationale}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {b.outcomes.map(id=><span key={id} style={{ fontSize:10, fontWeight:700, color:T.indigo, background:T.indigoLt, borderRadius:99, padding:"3px 8px" }}>{id}</span>)}
                </div>
              </div>
            ))}
          </div>
        </StratSection>
      )}

      {/* Closing CTA */}
      <div style={{ background:`linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 100%)`, borderRadius:14, padding:isMobile?"20px 18px":"24px 28px", color:T.white, display:"flex", flexDirection:isMobile?"column":"row", gap:16, alignItems:isMobile?"stretch":"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:isMobile?16:18, fontWeight:800, marginBottom:4 }}>See the research come to life</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", lineHeight:1.55, maxWidth:560 }}>Take the guided tour to walk every component and its outcome, or run the end-to-end scenario to watch one alert become a delivered client report.</div>
        </div>
        <div style={{ display:"flex", gap:10, flexShrink:0 }}>
          <button onClick={onStartScenario} style={{ display:"flex", alignItems:"center", gap:6, background:T.white, color:T.green, border:"none", borderRadius:8, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}><Target size={15}/> Run Scenario</button>
          <button onClick={onStartTour} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", color:T.white, border:"1px solid rgba(255,255,255,0.3)", borderRadius:8, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}><PlayCircle size={15}/> Take Tour</button>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics ─────────────────────────────────────────────────────────────────
function Analytics({ bp }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <MetricCard label="Firm AUA"            value="$1.57B"  delta="+2.3%"               up={true}  accent={T.green} />
        <MetricCard label="Avg Return vs Bench" value="+2.2pts" delta="Top 15% of advisors"  up={true}  accent={T.indigo}/>
        <MetricCard label="At-Risk Clients"      value="2"       delta="-1 vs last month"     up={true}  accent={T.amber} />
        <MetricCard label="Reviews Due"          value="3"       delta="In next 30 days"      up={false} accent={T.red}   />
      </div>
      <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 18px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:14 }}>Book Performance vs Benchmark (6M)</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={perfData}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
            <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{ borderRadius:8, fontSize:12 }}/>
            <Line type="monotone" dataKey="portfolio" stroke={T.green}   strokeWidth={2.5} dot={{ fill:T.green, r:4 }}    name="Your Book"/>
            <Line type="monotone" dataKey="benchmark" stroke={T.gray300} strokeWidth={2}   strokeDasharray="5 5" dot={false} name="Benchmark"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Settings ──────────────────────────────────────────────────────────────────
function SettingsLayer() {
  const [toggles, setToggles] = useState({ brief:true, drift:true, atRisk:true, aiNarr:false });
  const toggle = k => setToggles(p=>({...p,[k]:!p[k]}));
  const items = [
    { key:"brief",  label:"AI Morning Brief",       desc:"Daily insights digest at 8 AM"                    },
    { key:"drift",  label:"Drift Alerts",            desc:"Notify when allocation drifts >5pts from target"  },
    { key:"atRisk", label:"At-Risk Notifications",   desc:"Flag clients with declining engagement"           },
    { key:"aiNarr", label:"AI Narrative in Reports", desc:"Generate client commentary automatically"         },
  ];
  return (
    <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"24px", maxWidth:500 }}>
      <div style={{ fontSize:15, fontWeight:700, color:T.gray900, marginBottom:18 }}>Platform Settings</div>
      {items.map(s=>(
        <div key={s.key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", borderBottom:`1px solid ${T.gray100}` }}>
          <div style={{ marginRight:16 }}><div style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{s.label}</div><div style={{ fontSize:12, color:T.slate, marginTop:2 }}>{s.desc}</div></div>
          <div style={{ width:40, height:22, borderRadius:11, background:toggles[s.key]?T.green:T.gray300, cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0, minWidth:40 }} onClick={()=>toggle(s.key)}>
            <div style={{ width:18, height:18, borderRadius:"50%", background:T.white, position:"absolute", top:2, left:toggles[s.key]?20:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Report Generation Pipeline ───────────────────────────────────────────────
const PIPELINE_STAGES = [
  { id:"sync",       icon:Activity,  label:"Data Sync",         desc:"Pulling positions, transactions & pricing from custodian",  duration:1300, result:"47 positions · 312 txns · $4.28M AUM reconciled" },
  { id:"validate",   icon:Eye,       label:"Data Validation",   desc:"Checking completeness, stale prices & corporate actions",   duration:900,  result:"0 errors · 1 warning: INTL ETF price 4h stale" },
  { id:"assemble",   icon:Layers,    label:"Report Assembly",   desc:"Building sections from validated data & applying template", duration:1400, result:"8 sections · 6 charts rendered · 2 tables built" },
  { id:"narrative",  icon:Sparkles,  label:"AI Narrative",      desc:"Generating plain-language commentary from performance data", duration:1900, result:"348 words · Formal tone · 1 compliance flag added" },
  { id:"compliance", icon:Check,     label:"Compliance Review", desc:"Running disclosure rules and appending audit trail",        duration:800,  result:"12 rules passed · 1 auto-disclosure appended" },
  { id:"delivery",   icon:Mail,      label:"Delivery",          desc:"Publishing to client portal and sending email notification",duration:600,  result:"Portal updated · Email queued to 2 recipients" },
];

function ReportGeneration({ bp, onScenarioAdvance, onSendToClient }) {
  const { isMobile } = bp;
  const [running, setRunning]           = useState(false);
  const [done, setDone]                 = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    if (!running) return;
    const timers = [];
    let delay = 0;
    PIPELINE_STAGES.forEach((stage, i) => {
      timers.push(setTimeout(() => setCurrentStage(stage.id), delay));
      delay += stage.duration;
      timers.push(setTimeout(() => {
        setCompletedIds(prev => [...prev, stage.id]);
        if (i === PIPELINE_STAGES.length - 1) { setCurrentStage(null); setRunning(false); setDone(true); onScenarioAdvance?.(); }
      }, delay - 80));
    });
    return () => timers.forEach(clearTimeout);
  }, [running]);

  const start = () => {
    if (running) return;
    setDone(false); setCompletedIds([]); setCurrentStage(null); setRunning(true);
  };

  const totalMs = PIPELINE_STAGES.reduce((s, st) => s + st.duration, 0);

  return (
    <div data-demo="report-pipeline" style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div data-demo="generate-action" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:T.gray900, marginBottom:3 }}>Report Generation Pipeline</div>
          <div style={{ fontSize:12, color:T.slate }}>Sarah & Michael Chen · Quarterly Review · Q2 2025</div>
        </div>
        <button onClick={start} disabled={running} style={{ background:running?T.gray100:T.green, color:running?T.gray400:T.white, border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:running?"default":"pointer", display:"flex", alignItems:"center", gap:8, minHeight:40, transition:"all 0.2s" }}>
          <PlayCircle size={15}/> {running?"Generating…":done?"Re-Generate":"Generate Report"}
        </button>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
        {PIPELINE_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          const isDone   = completedIds.includes(stage.id);
          const isLast   = i === PIPELINE_STAGES.length - 1;
          return (
            <div key={stage.id} style={{ display:"flex", gap:0, alignItems:"stretch" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:52, flexShrink:0 }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:isDone?T.emeraldLt:isActive?T.indigoLt:T.gray100, border:`2px solid ${isDone?T.emerald:isActive?T.indigo:T.gray200}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s", zIndex:1 }}>
                  {isDone ? <Check size={15} color={T.emerald}/> : <Icon size={14} color={isActive?T.indigo:T.gray400}/>}
                </div>
                {!isLast && <div style={{ width:2, flex:1, minHeight:8, background:isDone?T.emerald:T.gray200, transition:"background 0.4s", margin:"3px 0" }}/>}
              </div>
              <div style={{ flex:1, paddingBottom:isLast?0:12, paddingLeft:12 }}>
                <div style={{ background:T.white, border:`1px solid ${isDone?T.emerald+"50":isActive?T.indigo+"50":T.gray100}`, borderRadius:10, padding:"12px 16px", transition:"border-color 0.3s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:isDone?T.gray900:isActive?T.indigo:T.gray400 }}>{stage.label}</span>
                    {isActive && <span style={{ fontSize:11, color:T.indigo, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}><div style={{ width:6,height:6,borderRadius:"50%",background:T.indigo }}/>Processing</span>}
                    {isDone   && <span style={{ fontSize:11, color:T.emerald, fontWeight:600 }}>Complete</span>}
                    {!isActive && !isDone && <span style={{ fontSize:11, color:T.gray300 }}>Pending</span>}
                  </div>
                  <div style={{ fontSize:12, color:T.slate, lineHeight:1.4 }}>{stage.desc}</div>
                  {isActive && (
                    <div style={{ height:3, background:T.gray100, borderRadius:99, marginTop:10, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:"55%", background:`linear-gradient(90deg,${T.indigo},${T.emerald})`, borderRadius:99, animation:"progress-sweep 1.1s ease-in-out infinite" }}/>
                    </div>
                  )}
                  {isDone && <div style={{ marginTop:8, background:T.gray50, borderRadius:6, padding:"6px 10px", fontSize:11, color:T.gray600 }}>{stage.result}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <div data-demo="deliver-action" style={{ background:T.emeraldLt, border:`1px solid ${T.emerald}50`, borderRadius:12, padding:"16px 20px", display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:T.emerald, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={20} color={T.white}/></div>
          <div style={{ flex:1, minWidth:160 }}>
            <div style={{ fontSize:14, fontWeight:700, color:T.gray900, marginBottom:2 }}>Report Ready</div>
            <div style={{ fontSize:12, color:T.slate }}>Generated in {(totalMs/1000).toFixed(1)}s · AI narrative + compliance cleared</div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            <button style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer" }}>Preview</button>
            <button onClick={onSendToClient} style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, boxShadow:onSendToClient?"0 0 0 3px rgba(11,93,46,0.25)":"none" }}>
              <Mail size={13}/> Send to Client
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Report Customization Studio ─────────────────────────────────────────────
const REPORT_SECTIONS = [
  { id:"header",      label:"Report Header",       required:true,  type:"layout" },
  { id:"summary",     label:"Portfolio Summary",   required:true,  type:"metrics" },
  { id:"narrative",   label:"AI Narrative",        required:false, type:"ai" },
  { id:"performance", label:"Performance Chart",   required:false, type:"chart",  chartTypes:["Bar","Line","Area"] },
  { id:"allocation",  label:"Asset Allocation",    required:false, type:"chart",  chartTypes:["Donut","Pie","Bar"] },
  { id:"holdings",    label:"Holdings Table",      required:false, type:"table" },
  { id:"drift",       label:"Drift Alerts",        required:false, type:"alert" },
  { id:"notes",       label:"Advisor Notes",       required:false, type:"text" },
];
const COLOR_THEMES = [
  { id:"navy",  primary:"#1C2B3A", accent:"#0B5D2E", label:"Midnight" },
  { id:"slate", primary:"#334155", accent:"#5B4FBE", label:"Slate"    },
  { id:"warm",  primary:"#1C1917", accent:"#B45309", label:"Warm"     },
  { id:"teal",  primary:"#134E4A", accent:"#0EA5E9", label:"Teal"     },
];

function ReportCustomize({ bp }) {
  const { isMobile } = bp;
  const [sections,   setSections]   = useState({ header:true, summary:true, narrative:true, performance:true, allocation:true, holdings:false, drift:true, notes:false });
  const [chartType,  setChartType]  = useState({ performance:"Bar", allocation:"Donut" });
  const [theme,      setTheme]      = useState("navy");
  const [benchmark,  setBenchmark]  = useState("60/40 Blend");
  const [dateRange,  setDateRange]  = useState("YTD");
  const [firmName,   setFirmName]   = useState("Williams Wealth Management");

  const activeTheme = COLOR_THEMES.find(t => t.id === theme);

  const toggleSection = id => {
    if (REPORT_SECTIONS.find(s => s.id === id)?.required) return;
    setSections(p => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div data-demo="report-customize" style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:16 }}>

      {/* Left: controls */}
      <div style={{ width:isMobile?"100%":290, flexShrink:0, display:"flex", flexDirection:"column", gap:12 }}>

        {/* Sections */}
        <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray200}`, fontSize:12, fontWeight:700, color:T.gray900, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span>Report Sections</span>
            <span style={{ fontSize:11, color:T.slate, fontWeight:400 }}>{Object.values(sections).filter(Boolean).length} active</span>
          </div>
          {REPORT_SECTIONS.map(sec => (
            <div key={sec.id} style={{ padding:"10px 16px", borderBottom:`1px solid ${T.gray100}`, display:"flex", alignItems:"center", gap:10, background:T.white }}>
              <div onClick={() => toggleSection(sec.id)} style={{ width:18, height:18, borderRadius:4, border:`2px solid ${sections[sec.id]?T.green:T.gray300}`, background:sections[sec.id]?T.green:T.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:sec.required?"default":"pointer" }}>
                {sections[sec.id] && <Check size={10} color={T.white}/>}
              </div>
              <span style={{ flex:1, fontSize:12, fontWeight:500, color:sections[sec.id]?T.gray900:T.gray400 }}>{sec.label}</span>
              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                {sec.required && <span style={{ fontSize:10, color:T.gray400 }}>Required</span>}
                {sec.type==="ai" && <span style={{ fontSize:9, fontWeight:700, background:T.indigoLt, color:T.indigo, padding:"2px 6px", borderRadius:99 }}>AI</span>}
                {sec.type==="chart" && sections[sec.id] && (
                  <select value={chartType[sec.id]} onChange={e => setChartType(p=>({...p,[sec.id]:e.target.value}))} style={{ fontSize:10, border:`1px solid ${T.gray200}`, borderRadius:4, padding:"2px 5px", color:T.gray600, background:T.white, cursor:"pointer" }}>
                    {sec.chartTypes.map(t=><option key={t}>{t}</option>)}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Branding */}
        <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray200}`, fontSize:12, fontWeight:700, color:T.gray900 }}>Branding</div>
          <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:T.slate, marginBottom:8 }}>Color Theme</div>
              <div style={{ display:"flex", gap:8 }}>
                {COLOR_THEMES.map(t => (
                  <div key={t.id} onClick={()=>setTheme(t.id)} style={{ cursor:"pointer", textAlign:"center" }}>
                    <div style={{ width:36, height:36, borderRadius:8, background:t.primary, border:`3px solid ${theme===t.id?T.indigo:"transparent"}`, display:"flex", alignItems:"center", justifyContent:"center", transition:"border 0.15s" }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:t.accent }}/>
                    </div>
                    <div style={{ fontSize:9, color:T.slate, marginTop:3 }}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:T.slate, marginBottom:5 }}>Firm Name</div>
              <input value={firmName} onChange={e=>setFirmName(e.target.value)} style={{ width:"100%", border:`1px solid ${T.gray200}`, borderRadius:6, padding:"7px 10px", fontSize:12, color:T.gray900, outline:"none", boxSizing:"border-box" }}/>
            </div>
            <div style={{ background:T.gray50, borderRadius:8, padding:"10px 12px", display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}>
              <div style={{ width:32, height:32, borderRadius:6, background:T.gray200, display:"flex", alignItems:"center", justifyContent:"center" }}><FileText size={14} color={T.slate}/></div>
              <div><div style={{ fontSize:12, fontWeight:600, color:T.gray900 }}>Upload Logo</div><div style={{ fontSize:11, color:T.slate }}>PNG or SVG · max 2MB</div></div>
            </div>
          </div>
        </div>

        {/* Data settings */}
        <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray200}`, fontSize:12, fontWeight:700, color:T.gray900 }}>Data & Benchmarks</div>
          <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { label:"Date Range", value:dateRange, set:setDateRange, opts:["YTD","QTD","MTD","1Y","3Y","5Y"] },
              { label:"Benchmark",  value:benchmark, set:setBenchmark, opts:["60/40 Blend","S&P 500","MSCI World","Barclays Agg","Russell 2000"] },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize:11, fontWeight:600, color:T.slate, marginBottom:5 }}>{f.label}</div>
                <select value={f.value} onChange={e=>f.set(e.target.value)} style={{ width:"100%", border:`1px solid ${T.gray200}`, borderRadius:6, padding:"7px 10px", fontSize:12, color:T.gray900, background:T.white, cursor:"pointer" }}>
                  {f.opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <button style={{ background:T.green, color:T.white, border:"none", borderRadius:10, padding:"13px", fontSize:13, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, minHeight:44 }}>
          <Check size={14}/> Save as Template
        </button>
      </div>

      {/* Right: live preview */}
      <div style={{ flex:1 }}>
        <div style={{ background:T.white, borderRadius:12, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflow:"hidden" }}>
          <div style={{ background:activeTheme.primary, padding:"20px 22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
              <div>
                <div style={{ fontSize:9, fontWeight:700, color:activeTheme.accent, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:5 }}>Quarterly Review</div>
                <div style={{ fontSize:15, fontWeight:700, color:T.white }}>{firmName || "Your Firm"}</div>
                <div style={{ fontSize:11, color:"#94A3B8", marginTop:3 }}>Sarah & Michael Chen · Q2 2025</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, color:"#94A3B8" }}>Portfolio Value</div>
                <div style={{ fontSize:20, fontWeight:700, color:T.white }}>$4,284,500</div>
                <div style={{ fontSize:11, color:T.emerald, marginTop:2 }}>+8.4% {dateRange} vs {benchmark}</div>
              </div>
            </div>
          </div>

          <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
            {sections.narrative && (
              <div style={{ background:T.indigoLt, borderLeft:`3px solid ${T.indigo}`, borderRadius:"0 8px 8px 0", padding:"10px 13px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:4 }}><Sparkles size={11} color={T.indigo}/><span style={{ fontSize:9, fontWeight:700, color:T.indigo, letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Summary</span></div>
                <div style={{ fontSize:11, color:T.navyMid, lineHeight:1.6 }}>Your portfolio delivered strong performance this period, advancing relative to the {benchmark} benchmark. US equity and healthcare led gains; bond holdings provided stability through volatility.</div>
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:sections.performance&&sections.allocation?"1fr 1fr":"1fr", gap:14 }}>
              {sections.performance && (
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Performance · {chartType.performance}</div>
                  <ResponsiveContainer width="100%" height={110}>
                    {chartType.performance==="Line" ? (
                      <LineChart data={perfData}><CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/><XAxis dataKey="month" tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/><Tooltip contentStyle={{borderRadius:8,fontSize:10}}/><Line type="monotone" dataKey="portfolio" stroke={activeTheme.accent} strokeWidth={2} dot={false}/><Line type="monotone" dataKey="benchmark" stroke={T.gray300} strokeWidth={1.5} strokeDasharray="4 4" dot={false}/></LineChart>
                    ) : chartType.performance==="Area" ? (
                      <AreaChart data={perfData}><defs><linearGradient id="custGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={activeTheme.accent} stopOpacity={0.25}/><stop offset="95%" stopColor={activeTheme.accent} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/><XAxis dataKey="month" tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/><Tooltip contentStyle={{borderRadius:8,fontSize:10}}/><Area type="monotone" dataKey="portfolio" stroke={activeTheme.accent} strokeWidth={2} fill="url(#custGrad)"/></AreaChart>
                    ) : (
                      <BarChart data={perfData} barSize={8}><CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/><XAxis dataKey="month" tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:9,fill:T.slate}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/><Tooltip contentStyle={{borderRadius:8,fontSize:10}}/><Bar dataKey="portfolio" fill={activeTheme.accent} radius={[3,3,0,0]}/><Bar dataKey="benchmark" fill={T.gray200} radius={[3,3,0,0]}/></BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
              {sections.allocation && (
                <div>
                  <div style={{ fontSize:9, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Allocation · {chartType.allocation}</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <PieChart width={80} height={80}><Pie data={allocationData} cx={35} cy={35} innerRadius={chartType.allocation!=="Pie"?22:0} outerRadius={36} dataKey="value">{allocationData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {allocationData.slice(0,4).map(a=>(
                        <div key={a.name} style={{ display:"flex", alignItems:"center", gap:5 }}>
                          <div style={{ width:6, height:6, borderRadius:2, background:a.color }}/>
                          <span style={{ fontSize:10, color:T.gray600 }}>{a.name}</span>
                          <span style={{ fontSize:10, fontWeight:700, color:T.gray900, marginLeft:4 }}>{a.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {sections.drift && (
              <div style={{ background:T.amberLt, border:`1px solid ${T.amber}40`, borderRadius:8, padding:"9px 12px", display:"flex", gap:8 }}>
                <AlertTriangle size={12} color={T.amber} style={{flexShrink:0,marginTop:1}}/>
                <div style={{ fontSize:11, color:T.gray600 }}>US Equity 6.2pts above target. Rebalancing recommended before Q3.</div>
              </div>
            )}
            {sections.notes && (
              <div style={{ background:T.gray50, borderRadius:8, padding:"10px 12px", fontSize:11, color:T.gray600, fontStyle:"italic", borderLeft:`3px solid ${T.gray300}` }}>
                "Reviewed July 15th. Client expressed interest in increasing fixed income allocation given current rate environment."
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Integration Hub ──────────────────────────────────────────────────────────
const INTEGRATIONS = [
  { id:"fidelity",     cat:"custodian", name:"Fidelity Institutional",  desc:"Primary custodian · Positions, transactions & pricing",   status:"connected", lastSync:"4 min ago",   fields:18 },
  { id:"schwab",       cat:"custodian", name:"Schwab Advisor Services",  desc:"Secondary custodian · Positions & billing data",           status:"connected", lastSync:"11 min ago",  fields:14 },
  { id:"pershing",     cat:"custodian", name:"Pershing / BNY Mellon",    desc:"Alternative assets · Private equity & hedge fund feeds",   status:"available", lastSync:null,          fields:0  },
  { id:"ibkr",         cat:"custodian", name:"Interactive Brokers",       desc:"Margin accounts · Options, futures & international",       status:"available", lastSync:null,          fields:0  },
  { id:"redtail",      cat:"crm",       name:"Redtail CRM",              desc:"Client records, tasks, workflows & advisor notes",         status:"connected", lastSync:"1 hr ago",    fields:22 },
  { id:"salesforce",   cat:"crm",       name:"Salesforce Financial Services", desc:"Enterprise CRM · Household & relationship mapping",   status:"available", lastSync:null,          fields:0  },
  { id:"wealthbox",    cat:"crm",       name:"Wealthbox",                desc:"Client profiles, pipelines & task management",             status:"available", lastSync:null,          fields:0  },
  { id:"nitrogen",     cat:"portfolio", name:"Riskalyze / Nitrogen",     desc:"Risk scoring, proposals & client risk tolerance",          status:"connected", lastSync:"Yesterday",   fields:8  },
  { id:"orion",        cat:"portfolio", name:"Orion Portfolio",           desc:"Rebalancing, trading, billing & performance",              status:"available", lastSync:null,          fields:0  },
  { id:"blackdiamond", cat:"portfolio", name:"Black Diamond",             desc:"Performance reporting, analytics & client portal",         status:"available", lastSync:null,          fields:0  },
  { id:"emoney",       cat:"planning",  name:"eMoney Advisor",            desc:"Full financial plans, cash flow & goals tracking",         status:"connected", lastSync:"2 days ago",  fields:12 },
  { id:"mgp",          cat:"planning",  name:"MoneyGuidePro",             desc:"Goals-based planning & retirement income modelling",       status:"available", lastSync:null,          fields:0  },
  { id:"rightcapital", cat:"planning",  name:"RightCapital",              desc:"Tax planning, Roth conversion & estate modelling",         status:"available", lastSync:null,          fields:0  },
];
const FIELD_MAPS = {
  fidelity:    [
    { src:"ACCT_VAL",      tgt:"portfolio.totalValue",    type:"Decimal" },
    { src:"POSITION_QTY",  tgt:"holdings.quantity",       type:"Decimal" },
    { src:"MKTVAL",        tgt:"holdings.marketValue",    type:"Decimal" },
    { src:"UNREALIZED_GL", tgt:"holdings.unrealizedGain", type:"Decimal" },
    { src:"LAST_PRICE",    tgt:"securities.price",        type:"Decimal" },
    { src:"TRADE_DATE",    tgt:"transactions.date",       type:"Date"    },
  ],
  schwab:     [
    { src:"accountValue",  tgt:"portfolio.totalValue",    type:"Decimal" },
    { src:"symbol",        tgt:"securities.ticker",       type:"String"  },
    { src:"quantity",      tgt:"holdings.quantity",       type:"Decimal" },
    { src:"marketValue",   tgt:"holdings.marketValue",    type:"Decimal" },
  ],
  redtail:     [
    { src:"contact.fullName",   tgt:"client.name",        type:"String"  },
    { src:"contact.email",      tgt:"client.email",       type:"String"  },
    { src:"contact.dob",        tgt:"client.dateOfBirth", type:"Date"    },
    { src:"account.id",         tgt:"client.accountId",   type:"String"  },
    { src:"notes.body",         tgt:"advisor.notes",      type:"Text"    },
  ],
  nitrogen:    [
    { src:"risk_score",    tgt:"client.riskScore",        type:"Integer" },
    { src:"risk_label",    tgt:"client.riskCategory",     type:"String"  },
    { src:"portfolio_risk",tgt:"portfolio.targetRisk",    type:"Decimal" },
  ],
  emoney:      [
    { src:"netWorth",      tgt:"client.netWorth",         type:"Decimal" },
    { src:"cashFlow",      tgt:"planning.annualCashFlow", type:"Decimal" },
    { src:"goalProb",      tgt:"planning.goalProbability",type:"Percent" },
    { src:"retireAge",     tgt:"planning.retirementAge",  type:"Integer" },
  ],
};
const CAT_LABELS = { all:"All", custodian:"Custodians", crm:"CRM & Client Data", portfolio:"Portfolio Mgmt", planning:"Financial Planning" };

function IntegrationHub({ bp, deepLink }) {
  const { isMobile } = bp;
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected,   setSelected]   = useState(null);
  const [connecting, setConnecting] = useState(null);

  useEffect(() => {
    if (deepLink?.integrationId) {
      setActiveCategory("all");
      setSelected(deepLink.integrationId);
    }
  }, [deepLink]);

  const filtered  = activeCategory === "all" ? INTEGRATIONS : INTEGRATIONS.filter(i => i.cat === activeCategory);
  const connCount = INTEGRATIONS.filter(i => i.status === "connected").length;
  const selInteg  = INTEGRATIONS.find(i => i.id === selected);

  const simulateConnect = id => {
    setConnecting(id);
    setTimeout(() => setConnecting(null), 2200);
  };

  return (
    <div data-demo="integration-hub" style={{ display:"flex", flexDirection:"column", gap:16 }}>

      {/* Header */}
      <div style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:T.gray900, marginBottom:3 }}>Integration Hub</div>
          <div style={{ fontSize:12, color:T.slate }}>{connCount} connected · {INTEGRATIONS.length - connCount} available</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:T.emeraldLt, borderRadius:99, padding:"4px 10px" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:T.emerald }}/>
            <span style={{ fontSize:11, fontWeight:700, color:T.emerald }}>All systems live</span>
          </div>
          <button style={{ background:T.greenLt, color:T.green, border:"none", borderRadius:7, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Add</button>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {Object.entries(CAT_LABELS).map(([k, label]) => (
          <button key={k} onClick={()=>{ setActiveCategory(k); setSelected(null); }} style={{ background:activeCategory===k?T.navy:T.white, color:activeCategory===k?T.white:T.gray600, border:`1px solid ${activeCategory===k?T.navy:T.gray200}`, borderRadius:8, padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ display:(selected&&!isMobile)?"grid":"block", gridTemplateColumns:"1fr 360px", gap:16, alignItems:"start" }}>

        {/* Provider grid */}
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
          {filtered.map(integ => {
            const isConn   = integ.status === "connected";
            const isCon    = connecting === integ.id;
            const isSel    = selected   === integ.id;
            return (
              <div key={integ.id} onClick={()=>isConn&&setSelected(isSel?null:integ.id)} style={{ background:T.white, border:`1px solid ${isSel?T.indigo:isConn?T.emerald+"60":T.gray200}`, borderRadius:12, padding:"14px 16px", cursor:isConn?"pointer":"default", transition:"border 0.2s" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:isConn?T.greenLt:T.gray100, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Zap size={16} color={isConn?T.green:T.gray400}/>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                    <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:99, background:isConn?T.emeraldLt:T.gray100, color:isConn?T.emerald:T.gray400 }}>{isConn?"Connected":"Available"}</span>
                    {integ.lastSync && <span style={{ fontSize:10, color:T.slate }}>{integ.lastSync}</span>}
                  </div>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:T.gray900, marginBottom:3 }}>{integ.name}</div>
                <div style={{ fontSize:11, color:T.slate, lineHeight:1.45, marginBottom:10 }}>{integ.desc}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  {isConn ? (
                    <>
                      <span style={{ fontSize:11, color:T.slate }}>{integ.fields} fields mapped</span>
                      <button style={{ background:"transparent", border:`1px solid ${isSel?T.indigo:T.gray200}`, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:600, color:isSel?T.indigo:T.gray600, cursor:"pointer" }}>{isSel?"Hide":"View Mapping"}</button>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize:11, color:T.slate }}>OAuth 2.0</span>
                      <button onClick={e=>{e.stopPropagation();simulateConnect(integ.id);}} disabled={!!isCon} style={{ background:isCon?T.gray100:T.green, color:isCon?T.gray400:T.white, border:"none", borderRadius:6, padding:"5px 12px", fontSize:11, fontWeight:700, cursor:isCon?"default":"pointer" }}>
                        {isCon?"Connecting…":"Connect"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Field mapping detail panel */}
        {selected && selInteg && (
          <div style={{ background:T.white, border:`1px solid ${T.indigo}40`, borderRadius:12, overflow:"hidden", marginTop:isMobile?16:0 }}>
            <div style={{ background:T.navy, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:T.white }}>{selInteg.name}</div>
                <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>Data Field Mapping</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:6, padding:6, cursor:"pointer", color:T.gray400, display:"flex" }}><X size={15}/></button>
            </div>

            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray100}`, display:"flex", gap:12, flexWrap:"wrap" }}>
              {[
                { label:"Status",    value:"Live",               color:T.emerald },
                { label:"Last Sync", value:selInteg.lastSync,    color:T.gray900 },
                { label:"Frequency", value:"Every 5 min",        color:T.gray900 },
                { label:"Fields",    value:`${selInteg.fields} mapped`, color:T.gray900 },
              ].map(m => (
                <div key={m.label} style={{ minWidth:72 }}>
                  <div style={{ fontSize:9, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:2 }}>{m.label}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:m.color }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div style={{ padding:"12px 16px" }}>
              <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Field Mapping</div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                  <thead><tr style={{ background:T.gray50 }}>
                    {["Source Field","","Wealthscape Field","Type"].map(h=><th key={h} style={{ padding:"7px 10px", textAlign:"left", fontWeight:700, color:T.slate, borderBottom:`1px solid ${T.gray200}`, whiteSpace:"nowrap" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {(FIELD_MAPS[selected]||[]).map((row,i)=>(
                      <tr key={i} style={{ borderBottom:`1px solid ${T.gray100}` }}>
                        <td style={{ padding:"7px 10px", fontFamily:"monospace", color:T.indigo, fontWeight:600, fontSize:10 }}>{row.src}</td>
                        <td style={{ padding:"7px 6px", color:T.gray400, fontSize:12 }}>→</td>
                        <td style={{ padding:"7px 10px", fontFamily:"monospace", color:T.green, fontWeight:600, fontSize:10 }}>{row.tgt}</td>
                        <td style={{ padding:"7px 10px" }}><span style={{ background:T.gray100, color:T.slate, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:4 }}>{row.type}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop:12, display:"flex", gap:8, flexWrap:"wrap" }}>
                <button style={{ background:T.gray100, border:"none", borderRadius:7, padding:"7px 12px", fontSize:11, fontWeight:600, color:T.gray600, cursor:"pointer" }}>Edit Mapping</button>
                <button style={{ background:T.indigoLt, border:"none", borderRadius:7, padding:"7px 12px", fontSize:11, fontWeight:600, color:T.indigo, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}><Activity size={12}/>Test Connection</button>
                <button style={{ background:T.greenLt, border:"none", borderRadius:7, padding:"7px 12px", fontSize:11, fontWeight:600, color:T.green, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}><Download size={12}/>Force Sync</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── End-to-End Scenario ─────────────────────────────────────────────────────
const SCENARIO_STEPS = [
  {
    id: "alert",
    targetId: "insights-feed",
    title: "Step 1 · Drift Alert Fires",
    instruction: "A US Equity drift alert just fired for Sarah & Michael Chen. Expand the insight card in the Active Insights feed and click 'Build Rebalance Report'.",
  },
  {
    id: "generate",
    targetId: "generate-action",
    title: "Step 2 · Generate the Report",
    instruction: "You're in the Report Builder. Click 'Generate Report' to run the AI pipeline — it will sync data, build 8 sections, and write the client narrative.",
  },
  {
    id: "send",
    targetId: "deliver-action",
    title: "Step 3 · Deliver to Client",
    instruction: "Report ready. Review the delivery email and click 'Send & Deliver' to publish to the portal and notify Sarah & Michael.",
  },
  {
    id: "portal",
    targetId: "portal-header",
    title: "Step 4 · Client Experience",
    instruction: "Delivered. This is exactly what Sarah & Michael see in their portal — the Q2 report with your advisor message. Explore the Documents and Messages tabs.",
    showComplete: true,
  },
  {
    id: "complete",
    targetId: null,
    title: "Full Loop Complete",
    instruction: "Alert → Report → AI Narrative → Delivery → Portal. End-to-end in under 10 seconds. That's the Wealthscape Reporting 2.0 workflow.",
    isComplete: true,
  },
];

function ScenarioGuide({ step, onNext, onSkip, isMobile }) {
  const s = SCENARIO_STEPS[step];
  const [pos, setPos] = useState({ top: 68, right: 16 });

  useEffect(() => {
    if (!s) return;
    // Place the guide in the corner farthest from the step's target element.
    // The target may mount after the step changes (e.g. the Report Ready banner
    // appears only once generation finishes), so poll a few times until found.
    let ticks = 0;
    const compute = () => {
      const el = s.targetId ? document.querySelector(`[data-demo="${s.targetId}"]`) : null;
      if (!el) {
        if (++ticks < 10) return;            // keep polling for a late mount
        clearInterval(poll);
        setPos(isMobile ? { top: 60 } : { top: 68, right: 16 });
        return;
      }
      clearInterval(poll);
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const goTop   = cy > window.innerHeight * 0.5;
      const goRight = cx < window.innerWidth  * 0.5;
      const p = goTop ? { top: isMobile ? 60 : 68 } : { bottom: isMobile ? 70 : 24 };
      if (!isMobile) p[goRight ? "right" : "left"] = 16;
      setPos(p);
    };
    const poll = setInterval(compute, 70);
    compute();
    return () => clearInterval(poll);
  }, [step, isMobile]);

  if (!s) return null;
  const progressPct = (step / (SCENARIO_STEPS.length - 1)) * 100;

  return (
    <div style={{ position:"fixed", ...pos, ...(isMobile ? { left:8, right:8, width:"auto" } : { width:340 }), background:s.isComplete?T.emerald:T.navy, borderRadius:14, boxShadow:"0 20px 60px rgba(0,0,0,0.35)", zIndex:85, overflow:"hidden", animation:"fade-in-up 0.3s ease" }}>
      <div style={{ height:3, background:"rgba(255,255,255,0.15)" }}>
        <div style={{ height:"100%", width:`${progressPct}%`, background:s.isComplete?T.white:T.green, transition:"width 0.5s ease" }}/>
      </div>
      <div style={{ padding:"14px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            {s.isComplete
              ? <div style={{ width:18, height:18, borderRadius:"50%", background:"rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={10} color={T.white}/></div>
              : <div style={{ width:18, height:18, borderRadius:"50%", background:T.green, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:T.white }}>{step+1}</div>}
            <span style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.55)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
              {s.isComplete?"Scenario Complete":`Scenario · ${step+1} of ${SCENARIO_STEPS.length}`}
            </span>
          </div>
          <button onClick={onSkip} style={{ background:"transparent", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:600 }}>{s.isComplete?"Close":"Skip"}</button>
        </div>
        <div style={{ fontSize:13, fontWeight:700, color:T.white, marginBottom:5, lineHeight:1.3 }}>{s.title}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.72)", lineHeight:1.6 }}>{s.instruction}</div>
        {!s.isComplete && (
          <div style={{ display:"flex", gap:4, marginTop:12, alignItems:"center" }}>
            {SCENARIO_STEPS.map((_,i)=><div key={i} style={{ width:i===step?14:5, height:5, borderRadius:99, background:i<step?T.green:i===step?"#86EFAC":"rgba(255,255,255,0.2)", transition:"all 0.25s" }}/>)}
          </div>
        )}
        {s.isComplete && (
          <div style={{ marginTop:12, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {[{label:"Data Sources",value:"3"},{label:"Gen Time",value:"7.0s"},{label:"Sections",value:"8"}].map(m=>(
              <div key={m.label} style={{ background:"rgba(255,255,255,0.15)", borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                <div style={{ fontSize:16, fontWeight:700, color:T.white }}>{m.value}</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.65)", marginTop:2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}
        {s.showComplete && (
          <button onClick={onNext} style={{ marginTop:12, width:"100%", background:T.green, color:T.white, border:"none", borderRadius:8, padding:"9px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
            <Check size={13}/> Complete Scenario
          </button>
        )}
      </div>
    </div>
  );
}

function EmailModal({ onSend, onClose, isMobile }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [deliverPortal, setDeliverPortal] = useState(true);
  const [deliverEmail, setDeliverEmail]   = useState(true);
  const [body, setBody] = useState("Hi Sarah and Michael,\n\nYour Q2 2025 Quarterly Review is ready in your client portal. Your portfolio delivered +8.4% year-to-date — outpacing the 60/40 benchmark by 2.2 points.\n\nI've flagged a small US equity rebalancing opportunity that I'd like to discuss at our July 15th meeting. The full report covers performance drivers, your current allocation, and next steps.\n\nPlease review at your convenience and don't hesitate to reach out with any questions.\n\nWarm regards,\nJordan Williams, CFP®\nWilliams Wealth Management");

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { setSent(true); setTimeout(onSend, 1100); }, 1500);
  };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.6)", zIndex:86, backdropFilter:"blur(2px)" }}/>
      <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:isMobile?"calc(100vw - 20px)":560, maxHeight:"calc(100vh - 40px)", background:T.white, borderRadius:16, boxShadow:"0 24px 64px rgba(0,0,0,0.35)", zIndex:87, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ background:T.navy, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:T.green, display:"flex", alignItems:"center", justifyContent:"center" }}><Mail size={15} color={T.white}/></div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:T.white }}>Deliver Report to Client</div>
              <div style={{ fontSize:11, color:"#94A3B8" }}>Q2 2025 Quarterly Review · Sarah & Michael Chen</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:6, padding:6, cursor:"pointer", color:T.gray400, display:"flex" }}><X size={16}/></button>
        </div>

        {sent ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, gap:12 }}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:T.emeraldLt, display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={24} color={T.emerald}/></div>
            <div style={{ fontSize:16, fontWeight:700, color:T.gray900 }}>Delivered!</div>
            <div style={{ fontSize:13, color:T.slate, textAlign:"center", lineHeight:1.6 }}>Report published to client portal · Email sent to 2 recipients<br/><span style={{ color:T.green, fontWeight:600 }}>Navigating to portal…</span></div>
          </div>
        ) : (
          <div style={{ flex:1, overflowY:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.slate, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase" }}>To</div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                {["sarah.chen@email.com","michael.chen@email.com"].map(e=>(
                  <div key={e} style={{ display:"flex", alignItems:"center", gap:6, background:T.gray100, borderRadius:99, padding:"5px 12px" }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:T.green }}>{e[0].toUpperCase()}</div>
                    <span style={{ fontSize:12, color:T.gray900 }}>{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.slate, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase" }}>Subject</div>
              <div style={{ fontSize:13, fontWeight:600, color:T.gray900, background:T.gray50, borderRadius:8, padding:"10px 12px", border:`1px solid ${T.gray200}` }}>Q2 2025 Quarterly Review – Sarah & Michael Chen</div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.slate, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase" }}>Attachment</div>
              <div style={{ display:"flex", alignItems:"center", gap:10, background:T.greenLt, border:`1px solid ${T.green}30`, borderRadius:8, padding:"10px 14px" }}>
                <div style={{ width:32, height:32, borderRadius:7, background:T.green, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FileText size={14} color={T.white}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.gray900 }}>Chen_Q2_2025_Quarterly_Review.pdf</div>
                  <div style={{ fontSize:11, color:T.slate }}>8 sections · 6 charts · AI narrative · Compliance cleared</div>
                </div>
                <Badge color={T.green} bg={T.greenLt}>Ready</Badge>
              </div>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.slate, marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase" }}>Message</div>
              <textarea value={body} onChange={e=>setBody(e.target.value)} rows={7} style={{ width:"100%", border:`1px solid ${T.gray200}`, borderRadius:8, padding:"10px 12px", fontSize:12, color:T.gray900, resize:"vertical", outline:"none", fontFamily:"inherit", lineHeight:1.65, boxSizing:"border-box" }}/>
            </div>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:T.slate, marginBottom:7, letterSpacing:"0.04em", textTransform:"uppercase" }}>Delivery Channels</div>
              <div style={{ display:"flex", gap:10 }}>
                {[{key:"portal",label:"Client Portal",desc:"Publish + NEW badge",val:deliverPortal,set:setDeliverPortal},{key:"email",label:"Email",desc:"2 recipients",val:deliverEmail,set:setDeliverEmail}].map(ch=>(
                  <div key={ch.key} onClick={()=>ch.set(!ch.val)} style={{ flex:1, background:ch.val?T.greenLt:T.gray50, border:`1px solid ${ch.val?T.green:T.gray200}`, borderRadius:10, padding:"10px 12px", cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:ch.val?T.green:T.gray600 }}>{ch.label}</span>
                      <div style={{ width:15, height:15, borderRadius:4, border:`2px solid ${ch.val?T.green:T.gray300}`, background:ch.val?T.green:T.white, display:"flex", alignItems:"center", justifyContent:"center" }}>{ch.val&&<Check size={8} color={T.white}/>}</div>
                    </div>
                    <div style={{ fontSize:11, color:T.slate }}>{ch.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!sent && (
          <div style={{ padding:"13px 20px", borderTop:`1px solid ${T.gray100}`, display:"flex", gap:9, justifyContent:"flex-end", flexShrink:0 }}>
            <button onClick={onClose} style={{ background:T.gray100, border:"none", borderRadius:8, padding:"10px 18px", fontSize:13, fontWeight:600, color:T.gray600, cursor:"pointer" }}>Cancel</button>
            <button onClick={handleSend} disabled={sending} style={{ background:sending?T.gray300:T.green, color:T.white, border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:sending?"default":"pointer", display:"flex", alignItems:"center", gap:8, minHeight:42, transition:"background 0.2s" }}>
              {sending?<><Activity size={14}/> Sending…</>:<><Mail size={14}/> Send & Deliver</>}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── App Shell ─────────────────────────────────────────────────────────────────
export default function WealthscapePrototype() {
  const bp = useBreakpoint();
  const { isMobile, isTablet, isDesktop } = bp;

  const [activeLayer,    setActiveLayer]    = useState("morning");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [alerts,         setAlerts]         = useState(ALERTS);
  const [alertsOpen,     setAlertsOpen]     = useState(false);
  const [deepLink,       setDeepLink]       = useState(null);
  const [demoActive,     setDemoActive]     = useState(false);
  const [demoStep,       setDemoStep]       = useState(0);
  const [spotlightRect,  setSpotlightRect]  = useState(null);
  const [scenarioActive, setScenarioActive] = useState(false);
  const [scenarioStep,   setScenarioStep]   = useState(0);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [reportDelivered,setReportDelivered]= useState(false);
  const [activeProfileId,setActiveProfileId]= useState(PROFILE_REGISTRY.defaultProfileId);
  const activeProfile = getProfileById(activeProfileId);
  const handleProfileChange = profileId => setActiveProfileId(normalizeProfileId(profileId));

  useEffect(() => {
    const id = "wealthscape-pulse-style";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `@keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 4px #EEF0FF, 0 0 0 6px rgba(91,79,190,0.25)} 50%{box-shadow:0 0 0 8px #EEF0FF, 0 0 0 12px rgba(91,79,190,0.15)} } @keyframes progress-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} } @keyframes scenario-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(11,93,46,0.6)} 50%{box-shadow:0 0 0 10px rgba(11,93,46,0)} } @keyframes fade-in-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`;
      document.head.appendChild(s);
    }
  }, []);

  const currentStep = TOUR_STEPS[demoStep];

  useEffect(() => {
    if (!demoActive) return;
    if (currentStep.layer) setActiveLayer(currentStep.layer);
    // Steps can target a sub-tab (e.g. Report Builder → Generate). Drive it via
    // the same deepLink mechanism the alert NBAs use. Spotlight handles scroll.
    setDeepLink(currentStep.deepLink ? { ...currentStep.deepLink, _ts: Date.now() } : null);
  }, [demoStep, demoActive]);

  // Route an alert's next-best-action to the right screen + sub-tab, mark it read.
  const handleAlertAction = (alert) => {
    const { layer, ...sub } = alert.action;
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, read:true } : a));
    setActiveLayer(layer);
    setDeepLink({ ...sub, _ts: Date.now() });
    setAlertsOpen(false);
    // Advance scenario when the Chen drift alert is acted on (step 0 → 1)
    if (scenarioActive && scenarioStep === 0 && alert.id === 1) {
      setScenarioStep(1);
    }
  };
  const dismissAlert  = (id) => setAlerts(prev => prev.filter(a => a.id !== id));
  const markAllRead   = ()   => setAlerts(prev => prev.map(a => ({ ...a, read:true })));
  const unreadAlerts  = alerts.filter(a => !a.read).length;

  // Advance scenario step (called by pipeline completion)
  const advanceScenario = useCallback(() => {
    setScenarioStep(prev => Math.min(prev + 1, SCENARIO_STEPS.length - 1));
  }, []);

  // Email sent → advance to portal view
  const handleEmailSent = () => {
    setEmailModalOpen(false);
    if (scenarioActive) {
      setScenarioStep(prev => Math.min(prev + 1, SCENARIO_STEPS.length - 1));
      setActiveLayer("portal");
      setDeepLink({ portalTab:"documents", _ts:Date.now() });
      setReportDelivered(true);
    } else {
      setActiveLayer("portal");
      setDeepLink({ portalTab:"documents", _ts:Date.now() });
      setReportDelivered(true);
    }
  };

  const startScenario = () => {
    setScenarioStep(0); setScenarioActive(true); setReportDelivered(false);
    setActiveLayer("morning"); setDeepLink(null); setDemoActive(false);
    // Reset alerts so Chen drift is unread
    setAlerts(prev => prev.map(a => a.id===1 ? { ...a, read:false } : a));
  };
  const endScenario = () => setScenarioActive(false);

  const startDemo = () => { setDemoStep(0); setSpotlightRect(null); setDemoActive(true); setScenarioActive(false); };
  const nextStep  = () => setDemoStep(s => Math.min(s + 1, TOUR_STEPS.length - 1));
  const prevStep  = () => setDemoStep(s => Math.max(s - 1, 0));
  const closeDemo = () => setDemoActive(false);

  const navItems = [
    { id:"morning",      icon:Home,     label:"Morning Brief",  badge:4    },
    { id:"reports",      icon:FileText, label:"Report Builder", badge:null },
    { id:"portal",       icon:Users,    label:"Client Portal",  badge:1    },
    { id:"integrations", icon:Zap,      label:"Integrations",   badge:null },
    { id:"insights",     icon:Activity, label:"Analytics",      badge:null },
    { id:"strategy",     icon:Layers,   label:"Strategy",       badge:null },
    { id:"settings",     icon:Settings, label:"Settings",       badge:null },
  ];
  const layerLabels = { morning:"Morning Brief", reports:"Report Builder", portal:"Client Portal", integrations:"Integrations", insights:"Analytics", strategy:"Strategy", settings:"Settings" };

  const SidebarContent = () => (
    <>
      <div style={{ padding:"18px 18px 14px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:T.green, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={14} color={T.white}/></div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:T.white, letterSpacing:"-0.01em" }}>Wealthscape</div>
            <div style={{ fontSize:9, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase" }}>Reporting 2.0</div>
          </div>
        </div>
        {!isDesktop && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:4, color:T.gray400 }} onClick={()=>setSidebarOpen(false)}><X size={18}/></button>}
      </div>
      <div style={{ padding:"12px 18px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.white, flexShrink:0 }}>{activeProfile.shell.initials}</div>
        <div><div style={{ fontSize:12, fontWeight:700, color:T.white }}>{activeProfile.shell.name}</div><div style={{ fontSize:11, color:"#94A3B8" }}>{activeProfile.shell.role}</div></div>
      </div>
      <nav data-demo="nav-sidebar" style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
        {navItems.map(item=>{
          const Icon = item.icon; const active = activeLayer===item.id;
          return (
            <button key={item.id} onClick={()=>{setActiveLayer(item.id);setDeepLink(null);if(!isDesktop)setSidebarOpen(false);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, background:active?`${T.green}40`:"transparent", border:active?`1px solid ${T.green}60`:"1px solid transparent", color:active?T.white:"#94A3B8", fontSize:13, fontWeight:active?600:400, cursor:"pointer", marginBottom:2, transition:"all 0.15s", textAlign:"left", minHeight:44 }}>
              <Icon size={16}/>{item.label}
              {item.badge && <span style={{ marginLeft:"auto", background:item.id==="morning"?T.red:T.green, color:T.white, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, minWidth:18, textAlign:"center" }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ margin:"0 8px 14px", background:"rgba(238,240,255,0.12)", border:`1px solid rgba(91,79,190,0.25)`, borderRadius:8, padding:"10px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}><Sparkles size={11} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, color:"#A78BFA", letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Active</span></div>
        <div style={{ fontSize:11, color:"#94A3B8", lineHeight:1.4 }}>AI is analyzing your book</div>
      </div>
    </>
  );

  return (
    <div style={{ display:"flex", height:"100vh", background:T.gray50, fontFamily:"Inter, system-ui, -apple-system, sans-serif", fontSize:14, color:T.gray900, overflow:"hidden", position:"relative" }}>

      {isDesktop && (
        <div style={{ width:220, background:T.navy, display:"flex", flexDirection:"column", flexShrink:0, overflowY:"auto" }}>
          <SidebarContent/>
        </div>
      )}
      {!isDesktop && sidebarOpen && (
        <>
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40 }} onClick={()=>setSidebarOpen(false)}/>
          <div style={{ position:"fixed", top:0, left:0, bottom:0, width:260, background:T.navy, display:"flex", flexDirection:"column", zIndex:50, overflowY:"auto" }}>
            <SidebarContent/>
          </div>
        </>
      )}

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <div style={{ background:T.white, borderBottom:`1px solid ${T.gray200}`, padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:52, flexShrink:0, gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {!isDesktop && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, color:T.gray600, display:"flex", alignItems:"center" }} onClick={()=>setSidebarOpen(true)}><Menu size={20}/></button>}
            <div>
              {!isMobile && <div style={{ fontSize:10, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Wealthscape Reporting 2.0</div>}
              <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{layerLabels[activeLayer]}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {!isMobile && (
              <ProfileSwitcher profiles={PROFILE_REGISTRY.profiles} profileOrder={PROFILE_REGISTRY.profileOrder} activeProfileId={activeProfileId} onProfileChange={handleProfileChange} compact={isTablet}/>
            )}
            {!isMobile && (
              <div style={{ display:"flex", alignItems:"center", gap:7, background:T.gray100, borderRadius:8, padding:"6px 11px" }}>
                <Search size={13} color={T.slate}/>
                <input placeholder="Search..." style={{ border:"none", background:"transparent", fontSize:13, outline:"none", width:140, color:T.gray900 }}/>
              </div>
            )}
            {isMobile && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, color:T.gray600 }}><Search size={18}/></button>}
            <button onClick={startScenario} data-demo="scenario-button" style={{ display:"flex", alignItems:"center", gap:6, background:scenarioActive?T.green:T.emerald, color:T.white, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", minHeight:34, boxShadow:scenarioActive?"0 0 0 3px rgba(11,93,46,0.3)":"none" }}>
              <Target size={14}/>{!isMobile&&(scenarioActive?" Restart":" Scenario")}
            </button>
            <button onClick={startDemo} style={{ display:"flex", alignItems:"center", gap:6, background:T.indigo, color:T.white, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", minHeight:34 }}>
              <PlayCircle size={14}/>{!isMobile&&" Tour"}
            </button>
            <button onClick={()=>setAlertsOpen(o=>!o)} data-demo="alert-bell" style={{ position:"relative", background:alertsOpen?T.gray100:"transparent", border:"none", cursor:"pointer", padding:6, borderRadius:8 }}>
              <Bell size={18} color={alertsOpen?T.gray900:T.slate}/>
              {unreadAlerts > 0 && (
                <div style={{ position:"absolute", top:-1, right:-1, minWidth:16, height:16, padding:"0 3px", borderRadius:99, background:T.red, border:`2px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:9, fontWeight:700, color:T.white }}>{unreadAlerts}</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {alertsOpen && (
          <AlertCenter alerts={alerts} onAction={handleAlertAction} onDismiss={dismissAlert} onMarkAllRead={markAllRead} onClose={()=>setAlertsOpen(false)} isMobile={isMobile}/>
        )}

        <div style={{ flex:1, overflow:"auto", padding:isMobile?"12px":"20px" }}>
          {activeLayer==="morning"       && <MorningBrief    bp={bp} alerts={alerts} onAction={handleAlertAction} onDismiss={dismissAlert} scenarioStep={scenarioActive?scenarioStep:null}/>}
          {activeLayer==="reports"       && <ReportBuilder   bp={bp} deepLink={deepLink} onScenarioAdvance={scenarioActive?advanceScenario:undefined} onSendToClient={()=>setEmailModalOpen(true)}/>}
          {activeLayer==="portal"        && <ClientPortal    bp={bp} deepLink={deepLink} reportDelivered={reportDelivered}/>}
          {activeLayer==="integrations"  && <IntegrationHub  bp={bp} deepLink={deepLink}/>}
          {activeLayer==="insights"      && <Analytics       bp={bp}/>}
          {activeLayer==="strategy"      && <StrategyLayer   bp={bp} profile={activeProfile} profiles={PROFILE_REGISTRY.profiles} profileOrder={PROFILE_REGISTRY.profileOrder} activeProfileId={activeProfileId} onProfileChange={handleProfileChange} onNavigate={(layer,sub)=>{setActiveLayer(layer);setDeepLink(sub?{...sub,_ts:Date.now()}:null);}} onStartTour={startDemo} onStartScenario={startScenario}/>}
          {activeLayer==="settings"      && <SettingsLayer/>}
        </div>

        {isMobile && (
          <div style={{ background:T.white, borderTop:`1px solid ${T.gray200}`, display:"flex", flexShrink:0, paddingBottom:"env(safe-area-inset-bottom, 0px)" }}>
            {navItems.map(item=>{
              const Icon = item.icon; const active = activeLayer===item.id;
              return (
                <button key={item.id} onClick={()=>{setActiveLayer(item.id);setDeepLink(null);}} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, padding:"8px 4px 10px", background:"transparent", border:"none", cursor:"pointer", position:"relative", minHeight:54 }}>
                  <div style={{ color:active?T.green:T.gray400, position:"relative" }}>
                    <Icon size={20}/>
                    {item.badge && <div style={{ position:"absolute", top:-4, right:-6, width:14, height:14, borderRadius:"50%", background:T.red, border:`2px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:8, fontWeight:700, color:T.white }}>{item.badge}</span></div>}
                  </div>
                  <span style={{ fontSize:9, fontWeight:active?700:500, color:active?T.green:T.gray400, letterSpacing:"0.02em" }}>{item.label.split(" ")[0]}</span>
                  {active && <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:28, height:2, background:T.green, borderRadius:"0 0 2px 2px" }}/>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {demoActive && (
        <>
          {currentStep.spotlightId && <Spotlight targetId={currentStep.spotlightId} onClose={closeDemo} onRectChange={setSpotlightRect}/>}
          <DemoTour step={demoStep} total={TOUR_STEPS.length} onNext={nextStep} onPrev={prevStep} onClose={closeDemo} isMobile={isMobile} spotlightRect={spotlightRect}/>
        </>
      )}

      {scenarioActive && (
        <ScenarioGuide
          step={scenarioStep}
          onNext={()=>setScenarioStep(s=>Math.min(s+1,SCENARIO_STEPS.length-1))}
          onSkip={endScenario}
          isMobile={isMobile}
        />
      )}

      {emailModalOpen && (
        <EmailModal onSend={handleEmailSent} onClose={()=>setEmailModalOpen(false)} isMobile={isMobile}/>
      )}
    </div>
  );
}
