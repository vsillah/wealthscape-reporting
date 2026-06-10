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
    title: "Welcome to Wealthscape Intelligence",
    component: "Interactive Prototype Tour",
    description: "This is a working prototype of the redesigned Wealthscape experience — built around three ODI-driven experience layers: Morning Brief, Report Builder, and Client Portal. This guided tour explains every component and the customer outcome it was designed to address.",
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
    description: "The highest-priority surface in the entire platform. Every morning, Wealthscape Intelligence surfaces a prioritized digest of what needs the advisor's attention before market open — drift alerts, tax windows, at-risk clients, and overdue reviews.",
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
    description: "Each insight is AI-generated from custody data, ranked by urgency, and expandable to a one-click action. Types include allocation drift, tax-loss windows, at-risk client signals, and overdue compliance reviews. The action button closes the insight-to-execution loop inside the platform.",
    outcome: "Know which clients are affected by events BEFORE they call / Insight to execution in one motion",
    outcomeScore: "ODI #7 · Score 16.3 / ODI #13 · Score 16.6 (highest in entire map)",
    gap: "Wealthscape had zero portfolio-level NBA capability (scored 1/10 vs Envestnet's 25M NBAs/day). Advisors were building manual watchlists in spreadsheets.",
    position: "bottom",
    spotlightId: "insights-feed",
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
  },
  {
    id: "ai-narrative",
    layer: "reports",
    title: "AI Narrative Toggle",
    component: "Compliance-Resident Report Commentary",
    description: "When enabled, Wealthscape Intelligence generates a plain-language client summary directly from custody data — performance drivers, risk context, and key actions. The generated block appears inline in the report preview with a 'Pending Compliance Review' flag, keeping it in the audit trail. Toggle tone between Formal, Conversational, and Concise.",
    outcome: "Ensure AI-generated narrative summaries are accurate and compliance-safe",
    outcomeScore: "ODI #5.5 · Execute Step · Critical Gap",
    gap: "41% of advisors are already using ChatGPT/Claude outside the platform to generate report narratives — a direct shadow-IT compliance risk. This brings that workflow inside Wealthscape with an auditable chain.",
    position: "right",
    spotlightId: "ai-narrative",
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
    id: "nav-sidebar",
    layer: "morning",
    title: "Navigation & AI Status",
    component: "Shell · Persistent Sidebar with AI Indicator",
    description: "The left sidebar provides persistent navigation across all five experience layers. The AI Active badge at the bottom signals that Wealthscape Intelligence is running background analysis on the advisor's book — normalizing the expectation that AI is always on, not an opt-in feature.",
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
    description: "This prototype addresses all 11 high-opportunity customer outcomes identified in the ODI analysis (scores 13.5–16.6). The three experience layers map to the full reporting job map: Morning Brief covers Steps 1–2 (Define, Locate); Report Builder covers Steps 3–6 (Prepare through Execute); Client Portal covers Steps 7–8 (Modify, Conclude).",
    outcome: "End-to-end audit trail: data → insight → action → outcome",
    outcomeScore: "ODI #15 · Score 14.2 · Compliance-as-byproduct",
    position: "center",
    spotlightId: null,
  },
];

// ─── Demo Tour Overlay ────────────────────────────────────────────────────────
function DemoTour({ step, total, onNext, onPrev, onClose, isMobile }) {
  const s = TOUR_STEPS[step];
  const isFirst = step === 0;
  const isLast  = step === total - 1;
  const isCenter = s.position === "center";

  const panelStyle = isCenter ? {
    position: "fixed",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "calc(100vw - 32px)" : 560,
    zIndex: 1000,
  } : {
    position: "fixed",
    bottom: isMobile ? 0 : 24,
    left: isMobile ? 0 : "50%",
    transform: isMobile ? "none" : "translateX(-50%)",
    width: isMobile ? "100%" : 600,
    borderRadius: isMobile ? "16px 16px 0 0" : 16,
    zIndex: 1000,
  };

  const progressPct = ((step) / (total - 1)) * 100;

  return (
    <>
      {/* Backdrop */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.65)", zIndex: 999, backdropFilter: "blur(2px)" }} onClick={onClose} />

      {/* Panel */}
      <div style={{ ...panelStyle, background: T.white, borderRadius: isCenter ? 16 : (isMobile ? "16px 16px 0 0" : 16), boxShadow: "0 24px 64px rgba(0,0,0,0.35)", overflow: "hidden" }}>

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

// ─── Spotlight ring around a targeted element ─────────────────────────────────
function Spotlight({ targetId }) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!targetId) { setRect(null); return; }
    const el = document.querySelector(`[data-demo="${targetId}"]`);
    if (!el) { setRect(null); return; }
    const update = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top - 6, left: r.left - 6, width: r.width + 12, height: r.height + 12 });
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    window.addEventListener("scroll", update, true);
    return () => { obs.disconnect(); window.removeEventListener("scroll", update, true); };
  }, [targetId]);

  if (!rect) return null;

  return (
    <div style={{ position: "fixed", top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 12, border: `2.5px solid ${T.indigo}`, boxShadow: `0 0 0 4px ${T.indigoLt}, 0 0 0 6px ${T.indigo}40`, zIndex: 998, pointerEvents: "none", transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", animation: "pulse-ring 2s infinite" }} />
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
const insights = [
  { id:1, type:"drift",  client:"Sarah & Michael Chen",  body:"US Equity 6.2pts above target. Rebalance recommended before quarter-end.", priority:"high",   action:"Rebalance Now"   },
  { id:2, type:"tax",    client:"Robert Okafor",          body:"INTL position down 8.4% — tax-loss harvesting opportunity before Dec 31.", priority:"high",   action:"Review Position" },
  { id:3, type:"risk",   client:"Kingston Capital LLC",   body:"Login activity declined 80% over 30 days. No response to last 2 touchpoints.", priority:"medium", action:"Send Check-In"   },
  { id:4, type:"review", client:"Eleanor Vasquez",        body:"Annual review is 61 days overdue. Regulatory threshold is 90 days.",        priority:"medium", action:"Schedule Now"    },
];

// ─── Shared micro-components ──────────────────────────────────────────────────
const Badge = ({ color, bg, children }) => (
  <span style={{ background:bg, color, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:99, letterSpacing:"0.03em", whiteSpace:"nowrap" }}>{children}</span>
);
const InsightChip = ({ type }) => {
  const map = { drift:{label:"DRIFT",bg:T.amberLt,color:T.amber}, tax:{label:"TAX-LOSS",bg:T.indigoLt,color:T.indigo}, risk:{label:"AT-RISK",bg:T.redLt,color:T.red}, review:{label:"OVERDUE",bg:T.gray100,color:T.slate} };
  const s = map[type] || { label:type, bg:T.gray100, color:T.gray600 };
  return <Badge color={s.color} bg={s.bg}>{s.label}</Badge>;
};
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
function MorningBrief({ bp }) {
  const [expanded, setExpanded] = useState(null);
  const { isMobile } = bp;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      <div data-demo="morning-brief-banner" style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, borderRadius:14, padding:isMobile?"18px 16px":"22px 24px" }}>
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ background:T.indigo, borderRadius:8, padding:9, flexShrink:0 }}><Sparkles size={18} color={T.white}/></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:T.indigo, textTransform:"uppercase", marginBottom:4 }}>Morning Brief</div>
            <div style={{ fontSize:isMobile?15:18, fontWeight:700, color:T.white, marginBottom:8, lineHeight:1.3 }}>Good morning, Jordan. Here's what needs your attention today.</div>
            <div style={{ fontSize:13, color:"#A8BCCF", lineHeight:1.5, marginBottom:12 }}>4 active insights across your book. AUA up 2.3% MTD to $1.57B.</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[{label:"2 High Priority",c:T.red,bg:"rgba(239,68,68,0.2)"},{label:"1 Tax Opportunity",c:"#A78BFA",bg:"rgba(91,79,190,0.3)"},{label:"1 Review Overdue",c:T.amber,bg:"rgba(245,158,11,0.2)"}].map(c=>(
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
        <MetricCard label="Open Insights"   value="4"      delta="2 urgent" up={false}                      accent={T.amber}  />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16 }}>
        <div data-demo="insights-feed" style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.gray200}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>Active Insights</div>
            <Badge color={T.indigo} bg={T.indigoLt}>AI-Generated</Badge>
          </div>
          {insights.map((ins,i)=>(
            <div key={ins.id} style={{ padding:"14px 18px", borderBottom:i<insights.length-1?`1px solid ${T.gray100}`:"none", cursor:"pointer", background:expanded===ins.id?T.gray50:T.white }} onClick={()=>setExpanded(expanded===ins.id?null:ins.id)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
                <div style={{ display:"flex", gap:7, alignItems:"center" }}>
                  <InsightChip type={ins.type}/>
                  {ins.priority==="high" && <div style={{ width:6, height:6, borderRadius:"50%", background:T.red, flexShrink:0 }}/>}
                </div>
                <ChevronDown size={13} color={T.gray400} style={{ transform:expanded===ins.id?"rotate(180deg)":"none", transition:"transform 0.2s", flexShrink:0 }}/>
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:T.gray900, marginBottom:2 }}>{ins.client}</div>
              <div style={{ fontSize:12, color:T.gray600, lineHeight:1.5 }}>{ins.body}</div>
              {expanded===ins.id && (
                <div style={{ display:"flex", gap:8, marginTop:10 }}>
                  <button style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:5, minHeight:36 }}><Zap size={12}/> {ins.action}</button>
                  <button style={{ background:T.gray100, color:T.gray600, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, cursor:"pointer", minHeight:36 }}>Dismiss</button>
                </div>
              )}
            </div>
          ))}
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
function ReportBuilder({ bp }) {
  const { isMobile } = bp;
  const [step, setStep]               = useState(1);
  const [template, setTemplate]       = useState("quarterly");
  const [selected, setSelected]       = useState([1,4]);
  const [aiNarrative, setAiNarrative] = useState(false);
  const [showConfig, setShowConfig]   = useState(!isMobile);

  const templates = [
    { id:"quarterly", label:"Quarterly Review",  desc:"Performance, allocation, goals" },
    { id:"annual",    label:"Annual Report",      desc:"Full year with planning summary" },
    { id:"adhoc",     label:"Ad-Hoc Update",      desc:"Custom snapshot" },
    { id:"proposal",  label:"Client Proposal",    desc:"New account proposal" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
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
                <button style={{ background:T.green, color:T.white, border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, minHeight:48 }}>
                  <FileText size={15}/> Generate Report
                </button>
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        <div style={{ flex:1, background:T.gray50, borderRadius:12, border:`1px solid ${T.gray200}`, overflow:"hidden" }}>
          <div style={{ background:T.white, borderBottom:`1px solid ${T.gray200}`, padding:"12px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}><Badge color={T.green} bg={T.greenLt}>PREVIEW</Badge><span style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>Quarterly Review · {selected.length} client{selected.length!==1?"s":""}</span></div>
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
                    <div style={{ fontSize:10, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>Quarterly Review</div>
                    <div style={{ fontSize:isMobile?16:18, fontWeight:700, color:T.white }}>Sarah & Michael Chen</div>
                    <div style={{ fontSize:12, color:"#94A3B8", marginTop:3 }}>Q2 2025 · Prepared Jun 9, 2025</div>
                  </div>
                  <div style={{ textAlign:isMobile?"left":"right" }}>
                    <div style={{ fontSize:11, color:"#94A3B8", marginBottom:3 }}>Portfolio Value</div>
                    <div style={{ fontSize:isMobile?22:26, fontWeight:700, color:T.white, fontVariantNumeric:"tabular-nums" }}>$4,284,500</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4, justifyContent:isMobile?"flex-start":"flex-end", marginTop:3 }}>
                      <ArrowUpRight size={12} color={T.emerald}/><span style={{ fontSize:12, color:T.emerald, fontWeight:600 }}>+8.4% YTD</span>
                    </div>
                  </div>
                </div>
              </div>

              {aiNarrative && (
                <div style={{ margin:"18px 18px 0", background:T.indigoLt, borderLeft:`3px solid ${T.indigo}`, borderRadius:"0 8px 8px 0", padding:"12px 14px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}><Sparkles size={12} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, color:T.indigo, letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Summary · Pending Review</span></div>
                  <div style={{ fontSize:13, color:T.navyMid, lineHeight:1.6 }}>Your portfolio delivered strong performance this quarter, advancing 8.4% year-to-date versus a 6.2% benchmark return — driven by US equity and healthcare exposures. Bond holdings provided stability during March volatility.</div>
                </div>
              )}

              <div style={{ padding:"18px 18px", display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:18 }}>
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
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Asset Allocation</div>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <PieChart width={100} height={100}><Pie data={allocationData} cx={45} cy={45} innerRadius={28} outerRadius={44} dataKey="value">{allocationData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
                    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                      {allocationData.map(a=>(
                        <div key={a.name} style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <div style={{ width:7, height:7, borderRadius:2, background:a.color, flexShrink:0 }}/>
                          <span style={{ fontSize:11, color:T.gray600 }}>{a.name}</span>
                          <span style={{ fontSize:11, fontWeight:700, color:T.gray900, marginLeft:"auto", paddingLeft:8 }}>{a.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div data-demo="drift-alert" style={{ margin:"0 18px 18px", background:T.amberLt, border:`1px solid ${T.amber}40`, borderRadius:8, padding:"11px 14px", display:"flex", gap:9, alignItems:"flex-start" }}>
                <AlertTriangle size={15} color={T.amber} style={{ flexShrink:0, marginTop:1 }}/>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:T.gray900, marginBottom:2 }}>Allocation Drift Detected</div>
                  <div style={{ fontSize:11, color:T.gray600, lineHeight:1.5 }}>US Equity is 6.2pts above target allocation of 36%. Rebalancing recommended before Q3.</div>
                </div>
              </div>

              <div style={{ background:T.gray50, borderTop:`1px solid ${T.gray200}`, padding:"14px 18px", display:"flex", justifyContent:"flex-end", gap:8, flexWrap:"wrap" }}>
                <button style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:600, color:T.gray600, cursor:"pointer", minHeight:36 }}>Schedule Review</button>
                <button style={{ background:T.green, color:T.white, border:"none", borderRadius:7, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer", minHeight:36 }}>Send to Client</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LAYER 3: Client Portal ────────────────────────────────────────────────────
function ClientPortal({ bp }) {
  const { isMobile } = bp;
  const [tab, setTab] = useState("overview");
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
            {[{name:"Q2 2025 Performance Report",date:"Jun 9, 2025",isNew:true},{name:"Q1 2025 Performance Report",date:"Mar 12, 2025",isNew:false},{name:"2024 Annual Review",date:"Jan 8, 2025",isNew:false},{name:"Investment Policy Statement",date:"Aug 14, 2024",isNew:false},{name:"Account Opening Documents",date:"May 2, 2023",isNew:false}].map(doc=>(
              <div key={doc.name} style={{ background:T.white, border:`1px solid ${T.gray200}`, borderRadius:10, padding:"13px 16px", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:34, height:34, borderRadius:8, background:T.greenLt, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FileText size={15} color={T.green}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}><span style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{doc.name}</span>{doc.isNew&&<Badge color={T.green} bg={T.greenLt}>NEW</Badge>}</div>
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

// ─── App Shell ─────────────────────────────────────────────────────────────────
export default function WealthscapePrototype() {
  const bp = useBreakpoint();
  const { isMobile, isTablet, isDesktop } = bp;

  const [activeLayer, setActiveLayer] = useState("morning");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoActive,  setDemoActive]  = useState(false);
  const [demoStep,    setDemoStep]    = useState(0);

  useEffect(() => {
    const id = "wealthscape-pulse-style";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `@keyframes pulse-ring { 0%,100%{box-shadow:0 0 0 4px #EEF0FF, 0 0 0 6px rgba(91,79,190,0.25)} 50%{box-shadow:0 0 0 8px #EEF0FF, 0 0 0 12px rgba(91,79,190,0.15)} }`;
      document.head.appendChild(s);
    }
  }, []);

  const currentStep = TOUR_STEPS[demoStep];

  useEffect(() => {
    if (!demoActive) return;
    if (currentStep.layer) setActiveLayer(currentStep.layer);
    if (currentStep.spotlightId) {
      setTimeout(() => {
        const el = document.querySelector(`[data-demo="${currentStep.spotlightId}"]`);
        if (el) el.scrollIntoView({ behavior:"smooth", block:"nearest" });
      }, 250);
    }
  }, [demoStep, demoActive]);

  const startDemo = () => { setDemoStep(0); setDemoActive(true); };
  const nextStep  = () => setDemoStep(s => Math.min(s + 1, TOUR_STEPS.length - 1));
  const prevStep  = () => setDemoStep(s => Math.max(s - 1, 0));
  const closeDemo = () => setDemoActive(false);

  const navItems = [
    { id:"morning",  icon:Home,     label:"Morning Brief",  badge:4    },
    { id:"reports",  icon:FileText, label:"Report Builder", badge:null },
    { id:"portal",   icon:Users,    label:"Client Portal",  badge:1    },
    { id:"insights", icon:Activity, label:"Analytics",      badge:null },
    { id:"settings", icon:Settings, label:"Settings",       badge:null },
  ];
  const layerLabels = { morning:"Morning Brief", reports:"Report Builder", portal:"Client Portal", insights:"Analytics", settings:"Settings" };

  const SidebarContent = () => (
    <>
      <div style={{ padding:"18px 18px 14px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:T.green, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={14} color={T.white}/></div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:T.white, letterSpacing:"-0.01em" }}>Wealthscape</div>
            <div style={{ fontSize:9, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase" }}>Intelligence</div>
          </div>
        </div>
        {!isDesktop && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:4, color:T.gray400 }} onClick={()=>setSidebarOpen(false)}><X size={18}/></button>}
      </div>
      <div style={{ padding:"12px 18px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.white, flexShrink:0 }}>JW</div>
        <div><div style={{ fontSize:12, fontWeight:700, color:T.white }}>Jordan Williams</div><div style={{ fontSize:11, color:"#94A3B8" }}>Senior Advisor</div></div>
      </div>
      <nav data-demo="nav-sidebar" style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
        {navItems.map(item=>{
          const Icon = item.icon; const active = activeLayer===item.id;
          return (
            <button key={item.id} onClick={()=>{setActiveLayer(item.id);if(!isDesktop)setSidebarOpen(false);}} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, background:active?`${T.green}40`:"transparent", border:active?`1px solid ${T.green}60`:"1px solid transparent", color:active?T.white:"#94A3B8", fontSize:13, fontWeight:active?600:400, cursor:"pointer", marginBottom:2, transition:"all 0.15s", textAlign:"left", minHeight:44 }}>
              <Icon size={16}/>{item.label}
              {item.badge && <span style={{ marginLeft:"auto", background:item.id==="morning"?T.red:T.green, color:T.white, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, minWidth:18, textAlign:"center" }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ margin:"0 8px 14px", background:"rgba(238,240,255,0.12)", border:`1px solid rgba(91,79,190,0.25)`, borderRadius:8, padding:"10px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}><Sparkles size={11} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, color:"#A78BFA", letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Active</span></div>
        <div style={{ fontSize:11, color:"#94A3B8", lineHeight:1.4 }}>Intelligence is analyzing your book</div>
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
              {!isMobile && <div style={{ fontSize:10, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Wealthscape Intelligence</div>}
              <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{layerLabels[activeLayer]}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {!isMobile && (
              <div style={{ display:"flex", alignItems:"center", gap:7, background:T.gray100, borderRadius:8, padding:"6px 11px" }}>
                <Search size={13} color={T.slate}/>
                <input placeholder="Search..." style={{ border:"none", background:"transparent", fontSize:13, outline:"none", width:140, color:T.gray900 }}/>
              </div>
            )}
            {isMobile && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, color:T.gray600 }}><Search size={18}/></button>}
            <button onClick={startDemo} style={{ display:"flex", alignItems:"center", gap:6, background:T.indigo, color:T.white, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", minHeight:34 }}>
              <PlayCircle size={14}/>{!isMobile&&" Take Tour"}
            </button>
            <button style={{ position:"relative", background:"transparent", border:"none", cursor:"pointer", padding:6 }}>
              <Bell size={18} color={T.slate}/>
              <div style={{ position:"absolute", top:4, right:4, width:7, height:7, borderRadius:"50%", background:T.red, border:`2px solid ${T.white}` }}/>
            </button>
          </div>
        </div>

        <div style={{ flex:1, overflow:"auto", padding:isMobile?"12px":"20px" }}>
          {activeLayer==="morning"  && <MorningBrief  bp={bp}/>}
          {activeLayer==="reports"  && <ReportBuilder bp={bp}/>}
          {activeLayer==="portal"   && <ClientPortal  bp={bp}/>}
          {activeLayer==="insights" && <Analytics     bp={bp}/>}
          {activeLayer==="settings" && <SettingsLayer/>}
        </div>

        {isMobile && (
          <div style={{ background:T.white, borderTop:`1px solid ${T.gray200}`, display:"flex", flexShrink:0, paddingBottom:"env(safe-area-inset-bottom, 0px)" }}>
            {navItems.map(item=>{
              const Icon = item.icon; const active = activeLayer===item.id;
              return (
                <button key={item.id} onClick={()=>setActiveLayer(item.id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, padding:"8px 4px 10px", background:"transparent", border:"none", cursor:"pointer", position:"relative", minHeight:54 }}>
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
          {currentStep.spotlightId && <Spotlight targetId={currentStep.spotlightId}/>}
          <DemoTour step={demoStep} total={TOUR_STEPS.length} onNext={nextStep} onPrev={prevStep} onClose={closeDemo} isMobile={isMobile}/>
        </>
      )}
    </div>
  );
}
