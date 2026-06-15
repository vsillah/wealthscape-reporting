import { useState, useEffect, useCallback } from "react";
import {
  Bell, Search, BarChart2, FileText, Users, Settings, Home,
  Download, Filter, ArrowUpRight, ArrowDownRight, Zap,
  Check, Sparkles, Mail, Activity, AlertTriangle, ChevronDown,
  X, Menu, ChevronLeft, ChevronRight, PlayCircle, BookOpen,
  Target, TrendingUp, Eye, Layers
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// ─── Design tokens (lifted verbatim from the Wealthscape reference kit) ─────────
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

// ─── Breakpoints ────────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

// ════════════════════════════════════════════════════════════════════════════════
// DISCOVERY DATA — synthesized via the ODI / Jobs-to-be-Done pipeline.
// Component: alternative-investments · Executor: independent RIA / wealth advisor.
// ════════════════════════════════════════════════════════════════════════════════

const STRAT_STATS = [
  { value:"7",          label:"High-opportunity outcomes (≥14)" },
  { value:"12.0–16.5",  label:"ODI opportunity scores" },
  { value:"6",          label:"Product layers shipped" },
  { value:"8-step",     label:"Universal job map covered" },
];

const MARKET_SIGNALS = [
  { tag:"Adoption Surge",      stat:"90%",      source:"CAIS / Mercer 2025 (789 advisors)", icon:TrendingUp,    body:"90% of advisors now allocate to alts and 88% plan to increase over two years; heavy users (10%+ of AUM) are expected to double from 21% to 40%. Demand is past the inflection point — the infrastructure is the laggard." },
  { tag:"Platform Arms Race",  stat:"$200B",    source:"iCapital (Oct 2024) · CAIS",        icon:Layers,        body:"iCapital crossed $200B in platform assets across 1,630+ funds; CAIS serves 50,000+ advisors over ~$6T. Purpose-built aggregators set the digital subscription / lifecycle / reporting benchmark custodians are now measured against." },
  { tag:"Manual-Ops Crisis",   stat:"$9.5T",    source:"Datos Insights, Jan 2026",          icon:AlertTriangle, body:"U.S. wealth firms process more than $9.5T in alternative assets — mostly manually, via email triage and spreadsheets. 48% of advisors cite administrative burden and paperwork as a leading alts challenge (CAIS/Mercer)." },
  { tag:"Reporting Lag",       stat:"3–6 mo",   source:"Clearwater / Datos · Addepar",      icon:Activity,      body:"Private valuations typically lag reporting periods by 3–6 months and 28% of institutions cite data standardization as the top operational need. Addepar built a $2T+ RIA footprint solving exactly this consolidation gap." },
  { tag:"401(k) Gate Opens",   stat:"Aug 2025", source:"White House EO · DOL",              icon:FileText,      body:"An Aug 7 2025 executive order directed the DOL to clarify fiduciary safe harbors for PE, private credit, real estate and hedge funds inside 401(k) plans; the DOL rescinded its 2021 chilling guidance days later — a structural distribution tailwind." },
  { tag:"Semi-Liquid Shift",   stat:"$4.1T",    source:"Deloitte 2024",                     icon:Zap,           body:"Semi-liquid AUM tripled to $349B (2020–24) and is projected to grow 12× to $4.1T by 2030. Interval funds and perpetual-NAV vehicles demand continuous pricing and rolling redemption tracking — not point-in-time data." },
  { tag:"End-Client Gap",      stat:"41%",      source:"Goldman Sachs AM 2025",             icon:Users,         body:"Only 41% of advised HNW clients have ever discussed private markets with their advisor, yet 80% of $10M+ investors already use alts vs 39% of the $1–5M segment. The advice gap — not product scarcity — is the barrier." },
];

const CUSTOMER_PAINS = [
  { metric:"30–60%",     pain:"NIGO rejection rate on paper subscriptions (one sponsor hit 90%). A 50-plus-page packet takes a 3–4 week cycle to clear vs ~20 minutes digitally — and every round-trip risks missing a closing date." },
  { metric:"10–30 day",  pain:"Capital-call funding windows tracked in a spreadsheet and an inbox. There's no cross-commitment dashboard — and a missed call can dilute, force-sell, or forfeit the client's entire prior investment." },
  { metric:"5–10+",      pain:"Separate fund-admin / platform logins to assemble one client's alts picture, each with its own format. Reconciliation is the #1 data gap (44%); the quarterly stitch still doesn't tie back to the custodian." },
  { metric:"45–90+ days",pain:"NAV lag after quarter-end (SEC Private Fund Quarterly Statements Rule; funds-of-funds 75/120). Reporting shows public holdings real-time and private as a stale manual line item — no trustworthy consolidated return." },
  { metric:"55%",        pain:"Cite admin/paperwork as the top barrier (35% cite due diligence). Accreditation and Reg BI suitability are re-verified fund-by-fund with no portable credential — hours per position, and the advisor is on the hook in an SEC exam." },
  { metric:"~5×",        pain:"Wirehouses show alts to 23% of clients at 16% weight vs the RIA channel's ~0.78% implied. Their statements show public + private on one page; the RIA's view shows public real-time and nothing for the PE commitment — costing AUM in pitches." },
];

// imp = importance, sat = current satisfaction (both /10). Opportunity score per
// Ulwick ODI: Opp = imp + max(imp − sat, 0). Layer = prototype surface that serves it.
const OUTCOMES = [
  { id:"ODI-01", imp:9.5, sat:2.5, text:"Complete a fund subscription with zero good-order error, from client selection through e-signed documents", layer:"subscribe",   sub:{subTab:"validate"} },
  { id:"ODI-02", imp:9.0, sat:2.0, text:"Minimize the likelihood of missing a capital-call deadline across all client commitments at once",       layer:"lifecycle",   sub:{subTab:"calls"} },
  { id:"ODI-03", imp:9.5, sat:3.0, text:"Assemble a consolidated public-plus-private portfolio view with current values for any household",        layer:"reporting",   sub:null },
  { id:"ODI-06", imp:9.0, sat:2.0, text:"Verify a client's accreditation / QP status and Reg BI suitability fast, for each fund considered",        layer:"marketplace", sub:{subTab:"compare"} },
  { id:"ODI-10", imp:8.5, sat:2.0, text:"Track distributions, return-of-capital and liquidity windows across interval & tender-offer vehicles",     layer:"lifecycle",   sub:{subTab:"calls"} },
  { id:"ODI-04", imp:8.5, sat:2.5, text:"Minimize the number of separate fund-admin / platform logins to review alts across the book",             layer:"desk",        sub:null },
  { id:"ODI-07", imp:8.5, sat:3.0, text:"Research, compare and run initial due diligence on funds from a single advisor workflow",                 layer:"marketplace", sub:{subTab:"compare"} },
  { id:"ODI-05", imp:8.5, sat:3.5, text:"Minimize the staleness of private-asset valuations shown in advisor- and client-facing reports",          layer:"reporting",   sub:null },
  { id:"ODI-08", imp:8.0, sat:2.5, text:"Identify which clients are approaching eligibility-expiration or suitability-review deadlines",             layer:"desk",        sub:null },
  { id:"ODI-12", imp:8.5, sat:4.0, text:"Increase the share of eligible HNW households with a documented alts discussion, proposal or allocation",   layer:"desk",        sub:null },
  { id:"ODI-09", imp:8.0, sat:3.5, text:"Minimize friction for a client to review and e-sign subscription docs in a branded advisor experience",     layer:"portal",      sub:null },
  { id:"ODI-11", imp:8.0, sat:4.0, text:"Minimize compliance-audit prep time for suitability, eligibility and Reg BI documentation",                layer:"subscribe",   sub:{subTab:"validate"} },
];
const oppScore = o => o.imp + Math.max(o.imp - o.sat, 0);
const oppColor = v => v >= 16 ? T.green : v >= 14 ? T.indigo : T.slate;
const LAYER_NAMES = { desk:"Alts Desk", marketplace:"Fund Marketplace", subscribe:"Subscription Studio", lifecycle:"Capital Activity", reporting:"Consolidated Reporting", portal:"Client Portal" };
const layerName = id => LAYER_NAMES[id] || id;

const JOB_MAP = [
  { n:1, step:"Define",   goal:"Surface today's calls due, NIGO items & expiring accreditations in one queue", layer:"desk"        },
  { n:2, step:"Locate",   goal:"Search, filter & compare funds across asset class and structure",             layer:"marketplace" },
  { n:3, step:"Prepare",  goal:"Run diligence & generate a portable eligibility credential",                  layer:"marketplace" },
  { n:4, step:"Confirm",  goal:"Validate the packet to good-order in real time; e-sign with an audit trail",  layer:"subscribe"   },
  { n:5, step:"Execute",  goal:"Deliver the good-order subscription & log the capital-call schedule",          layer:"subscribe"   },
  { n:6, step:"Monitor",  goal:"Track calls, distributions, NAVs & funding windows across all funds",         layer:"lifecycle"   },
  { n:7, step:"Modify",   goal:"Ingest new NAVs, reconcile & refresh public-plus-private attribution",        layer:"reporting"   },
  { n:8, step:"Conclude", goal:"Deliver a branded consolidated statement & support redemptions",              layer:"portal"      },
];

const RECOMMENDATIONS = [
  { n:1, title:"Lead with the Alts Desk — a morning brief for private markets",        surface:"Alts Desk",             layer:"desk",        sub:null,                    outcomes:["ODI-02","ODI-04","ODI-08","ODI-12"], body:"One prioritized queue surfaces every time-sensitive obligation — capital calls due in 10–30 days, NIGO items pending re-sign, NAVs just posted, accreditations expiring — each with a one-click next-best-action. Collapses the 5–10 portal logins that define the RIA alts experience today." },
  { n:2, title:"Replace the paper packet with the Subscription Studio",                 surface:"Subscription Studio",   layer:"subscribe",   sub:{subTab:"validate"},     outcomes:["ODI-01","ODI-06","ODI-11"],          body:"Pre-fills from CRM + custodian data, runs good-order validation against each fund's rules before submission, embeds accreditation & Reg BI attestations, and collects e-signatures with a timestamped audit trail — the ~2-day digital benchmark vs a 3–4 week paper cycle." },
  { n:3, title:"Open an integrated Fund Marketplace with portable eligibility",         surface:"Fund Marketplace",      layer:"marketplace", sub:{subTab:"compare"},      outcomes:["ODI-06","ODI-07"],                   body:"A curated, searchable universe across PE, private credit, real estate, infrastructure, hedge funds and semi-liquid structures — side-by-side fees, minimums and lock-ups, embedded diligence, and client-level eligibility screening that carries forward into the subscription." },
  { n:4, title:"Activate Capital Activity tracking for calls & distributions",          surface:"Capital Activity",      layer:"lifecycle",   sub:{subTab:"calls"},        outcomes:["ODI-02","ODI-10"],                   body:"Ingests call and distribution notices from fund admins, maps every commitment to its funding window, pre-populates wire instructions, and tracks interval / tender-offer redemption calendars — the backbone that makes the Alts Desk actionable." },
  { n:5, title:"Deliver Consolidated Reporting across public & private holdings",       surface:"Consolidated Reporting",layer:"reporting",   sub:null,                    outcomes:["ODI-03","ODI-05"],                   body:"Ingests NAVs and capital-account statements as they arrive, shows freshness timestamps so stale values are visible rather than silent, and produces one performance-attribution view across public and private — closing the ~5× wirehouse gap." },
  { n:6, title:"Extend the consolidated view to a branded Client Portal",               surface:"Client Portal",         layer:"portal",      sub:null,                    outcomes:["ODI-09","ODI-12"],                   body:"The same public-plus-private view, wrapped in the RIA's brand and available to the client on demand, with subscription e-sign routed through the portal — the most direct lever to lift the 41% HNW discussion rate." },
];

// ─── Demo book data ─────────────────────────────────────────────────────────────
const ADVISOR = { name:"Jordan Williams", firm:"Meridian Wealth Partners", initials:"JW" };

const DESK_KPIS = [
  { label:"Private Markets AUM", value:"$182M",  delta:"+14.2% YoY",      up:true,  accent:T.green  },
  { label:"Active Commitments",  value:"63",     delta:"across 21 funds", up:true,  accent:T.indigo },
  { label:"Capital Calls · 30d", value:"$4.6M",  delta:"7 calls due",     up:false, accent:T.amber  },
  { label:"Avg NAV Freshness",   value:"38 days",delta:"vs 90-day SEC max",up:true, accent:T.emerald},
];

// The unified action queue — the single store every Alts Desk + bell reads from.
const ACTION_ITEMS = [
  { id:1, type:"call",        sev:"high",   icon:Zap,          title:"Capital call due in 4 days — Blackstone Private Credit", detail:"Chen Family Trust · $250,000 (10% of commitment). Wire instructions ready to confirm.", client:"Sarah & Michael Chen", meta:"Due Jun 19", action:{ layer:"lifecycle", subTab:"calls" } },
  { id:2, type:"nigo",        sev:"high",   icon:AlertTriangle,title:"Subscription returned NIGO — 2 fields to correct",       detail:"Apollo Aligned Alternatives · missing QP attestation initials on p.34 and a mismatched SSN. Re-validate to clear.", client:"Patricia Donnelly", meta:"Closing Jun 30", action:{ layer:"subscribe", subTab:"validate" } },
  { id:3, type:"nav",         sev:"med",    icon:Activity,     title:"New NAV posted — KKR Infrastructure Conglomerate",        detail:"Q1 capital-account statement received, +3.8% QoQ. Consolidated report refreshed for 4 households.", client:"4 households", meta:"Posted today", action:{ layer:"reporting" } },
  { id:4, type:"eligibility", sev:"med",    icon:Eye,          title:"Accredited-investor credential expiring in 21 days",      detail:"Robert & Lisa Tanaka · re-verify income/net-worth to keep the subscription pipeline unblocked.", client:"Robert & Lisa Tanaka", meta:"Expires Jul 6", action:{ layer:"marketplace", subTab:"compare" } },
  { id:5, type:"opportunity", sev:"low",    icon:Sparkles,     title:"3 eligible HNW households with no alts allocation",        detail:"$1–5M segment, suitability profile supports 10% private-credit sleeve. Start a documented proposal.", client:"Mercer, Halvorsen, Okafor", meta:"Proposal idea", action:{ layer:"marketplace", subTab:"compare" } },
];

const ASSET_MIX = [
  { name:"Private Credit",  value:72, color:T.green   },
  { name:"Private Equity",  value:48, color:T.indigo  },
  { name:"Real Estate",     value:33, color:T.emerald },
  { name:"Infrastructure",  value:18, color:T.amber   },
  { name:"Hedge Funds",     value:11, color:T.slate   },
];

const PRIVATE_AUM_TREND = [
  { month:"Jan", aum:151 },{ month:"Feb", aum:158 },{ month:"Mar", aum:163 },
  { month:"Apr", aum:170 },{ month:"May", aum:176 },{ month:"Jun", aum:182 },
];

const FUNDS = [
  { name:"Blackstone Private Credit (BCRED)", manager:"Blackstone", cls:"Private Credit", structure:"Interval / Evergreen", min:"$25,000",    lockup:"Quarterly liquidity (5% cap)", target:"9–11% net yield", dd:"Full DD pack", eligible:true  },
  { name:"Apollo Aligned Alternatives",        manager:"Apollo",     cls:"Multi-Alt",      structure:"Evergreen",            min:"$50,000",    lockup:"Monthly subscriptions",        target:"Equity-like, lower vol", dd:"Full DD pack", eligible:true  },
  { name:"KKR Infrastructure Conglomerate",    manager:"KKR",        cls:"Infrastructure", structure:"Perpetual NAV",        min:"$25,000",    lockup:"Quarterly tender (3% cap)",    target:"8–10% net",      dd:"Full DD pack", eligible:true  },
  { name:"Carlyle Secured Lending Fund",       manager:"Carlyle",    cls:"Private Credit", structure:"Non-traded BDC",       min:"$2,500",     lockup:"Quarterly tender",             target:"SOFR + 6%",      dd:"In review",    eligible:true  },
  { name:"Stepstone Private Equity (Drawdown)",manager:"StepStone",  cls:"Private Equity", structure:"Closed-end · 2024 vtg",min:"$250,000",   lockup:"~8–10 yr term",                target:"2.0x net MOIC",  dd:"Full DD pack", eligible:false },
  { name:"Ares Real Estate Income Trust",      manager:"Ares",       cls:"Real Estate",    structure:"Perpetual NAV REIT",   min:"$2,500",     lockup:"Monthly (semi-liquid)",        target:"6–8% + appreciation", dd:"Full DD pack", eligible:true },
];

// Subscription Studio — observable good-order pipeline (the anti-NIGO engine).
const SUB_STAGES = [
  { id:"intake",      icon:FileText,  label:"Intake",              desc:"Pulling client profile, fund docs & custodian account data",        duration:1100, result:"Chen Family Trust · BCRED · $250,000 commitment loaded" },
  { id:"prefill",     icon:Sparkles,  label:"Auto Pre-Fill",       desc:"Populating the 52-page packet from CRM + custodian of record",       duration:1500, result:"312 fields filled · 0 left blank · entity & TIN verified" },
  { id:"validate",    icon:Eye,       label:"Good-Order Validation",desc:"Checking every field against BCRED's current subscription rules",   duration:1700, result:"All rules passed · NIGO risk 0% (vs 30–60% on paper)" },
  { id:"eligibility", icon:Check,     label:"Eligibility & Reg BI", desc:"Confirming accredited / QP status and documenting suitability",     duration:1300, result:"Accredited ✓ · QP ✓ · Reg BI rationale attached" },
  { id:"esign",       icon:Mail,      label:"E-Signature",         desc:"Routing to all signers through the branded client portal",          duration:1200, result:"2 signers · completed in-session · timestamped" },
  { id:"submit",      icon:Zap,       label:"Deliver to Admin",    desc:"Transmitting the good-order packet to the fund administrator",       duration:900,  result:"Accepted in good order · call schedule logged" },
];

const CAPITAL_CALLS = [
  { fund:"Blackstone Private Credit", client:"Chen Family Trust",   commit:"$2.5M",  amount:"$250,000", pct:10, due:"Jun 19", daysOut:4,  status:"due"      },
  { fund:"StepStone PE 2024",         client:"Tanaka Living Trust", commit:"$1.0M",  amount:"$150,000", pct:15, due:"Jun 27", daysOut:12, status:"upcoming" },
  { fund:"Carlyle Secured Lending",   client:"P. Donnelly IRA",     commit:"$500K",  amount:"$75,000",  pct:15, due:"Jul 02", daysOut:17, status:"upcoming" },
  { fund:"Ares Real Estate Trust",    client:"Okafor Family LLC",   commit:"$750K",  amount:"$112,500", pct:15, due:"Jul 11", daysOut:26, status:"upcoming" },
];

const DISTRIBUTIONS = [
  { fund:"KKR Infrastructure",        client:"Chen Family Trust",   amount:"$38,400", type:"Income",          date:"Jun 10" },
  { fund:"Ares Real Estate Trust",    client:"Halvorsen Trust",     amount:"$21,750", type:"Return of Capital",date:"Jun 03" },
  { fund:"Apollo Aligned Alts",       client:"Mercer Family",       amount:"$15,200", type:"Income",          date:"May 28" },
];

// Consolidated reporting — one household, public + private on one page.
const HOLDINGS = [
  { name:"U.S. Large-Cap ETF (VTI)",          kind:"Public",  cls:"Equity",          value:"$1,240,000", nav:"Real-time",  fresh:"live"  },
  { name:"Core Bond ETF (AGG)",               kind:"Public",  cls:"Fixed Income",    value:"$610,000",   nav:"Real-time",  fresh:"live"  },
  { name:"Intl Developed ETF (VEA)",          kind:"Public",  cls:"Equity",          value:"$385,000",   nav:"Real-time",  fresh:"live"  },
  { name:"Blackstone Private Credit (BCRED)", kind:"Private", cls:"Private Credit",  value:"$520,000",   nav:"As of May 31",fresh:"recent"},
  { name:"KKR Infrastructure Conglomerate",   kind:"Private", cls:"Infrastructure",  value:"$310,000",   nav:"As of Mar 31",fresh:"stale" },
  { name:"StepStone PE 2024 (Drawdown)",      kind:"Private", cls:"Private Equity",  value:"$185,000",   nav:"As of Mar 31",fresh:"stale" },
];

const CONSOLIDATED_PERF = [
  { month:"Jan", total:6.0, bench:5.2 },{ month:"Feb", total:6.4, bench:5.6 },
  { month:"Mar", total:7.1, bench:6.0 },{ month:"Apr", total:7.6, bench:6.5 },
  { month:"May", total:8.3, bench:6.9 },{ month:"Jun", total:8.9, bench:7.2 },
];

// ─── Guided walkthrough steps (tour + scenario share one HUD) ───────────────────
const TOUR_STEPS = [
  { layer:"desk",        title:"Alts Desk", body:"Every private-markets obligation in one prioritized queue — the morning brief that replaces 5–10 fund-admin logins. Each item carries a one-click next-best-action." },
  { layer:"marketplace", title:"Fund Marketplace", body:"Research and compare funds across structure, fees and liquidity, then screen the client's eligibility once — a portable credential that travels into the subscription." },
  { layer:"subscribe",   title:"Subscription Studio", body:"The anti-NIGO engine: good-order validation runs before submission, e-sign and Reg BI attestations are embedded, and a full audit trail is produced as a by-product." },
  { layer:"lifecycle",   title:"Capital Activity", body:"Capital calls, distributions and liquidity windows tracked across every commitment — so a missed call (dilution, forced sale, forfeiture) never happens." },
  { layer:"reporting",   title:"Consolidated Reporting", body:"Public and private holdings on one page with NAV-freshness timestamps and a single performance-attribution view — closing the ~5× wirehouse gap." },
  { layer:"portal",      title:"Client Portal", body:"The same consolidated view, advisor-branded and in the client's hands — the most direct lever on the 41% HNW discussion rate." },
];

const SCENARIO_STEPS = [
  { layer:"desk",      title:"1 · A capital call surfaces", body:"The Chen Family Trust owes a $250,000 BCRED capital call in 4 days. It's the top item on the Alts Desk — open Capital Activity from its next-best-action." },
  { layer:"lifecycle", title:"2 · Confirm the funding", body:"Capital Activity maps the call to its funding window with wire instructions pre-populated. No spreadsheet, no missed deadline, no forfeiture risk." },
  { layer:"reporting", title:"3 · Reflect it consolidated", body:"The commitment and its NAV flow straight into the household's consolidated public-plus-private view — with a freshness timestamp." },
  { layer:"portal",    title:"4 · The client sees it too", body:"The Chens see the same branded view in their portal. The private-markets conversation now happens on the advisor's terms — done." },
];

// ─── Shared bits ────────────────────────────────────────────────────────────────
const card = { background:T.white, border:`1px solid ${T.gray200}`, borderRadius:12 };

function MetricCard({ label, value, delta, up, accent }) {
  return (
    <div style={{ ...card, padding:"14px 16px", flex:1, minWidth:150 }}>
      <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.05em", textTransform:"uppercase" }}>{label}</div>
      <div style={{ fontSize:22, fontWeight:800, color:T.gray900, marginTop:5, letterSpacing:"-0.01em" }}>{value}</div>
      <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:4, fontSize:11.5, fontWeight:600, color:accent }}>
        {up ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>}{delta}
      </div>
    </div>
  );
}

function SevDot({ sev }) {
  const c = sev==="high" ? T.red : sev==="med" ? T.amber : T.slate;
  return <div style={{ width:8, height:8, borderRadius:"50%", background:c, flexShrink:0 }}/>;
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

// ════════════════════════════════════════════════════════════════════════════════
// STRATEGY TAB — ported from the reference kit; data-driven by the constants above.
// ════════════════════════════════════════════════════════════════════════════════
function StrategyLayer({ bp, onNavigate, onStartTour, onStartScenario }) {
  const { isMobile } = bp;
  const ranked = [...OUTCOMES].sort((a,b)=>oppScore(b)-oppScore(a));
  const maxOpp = oppScore(ranked[0]);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:30, maxWidth:1080, margin:"0 auto", paddingBottom:20 }}>

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, borderRadius:16, padding:isMobile?"22px 18px":"30px 32px", color:T.white }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <div style={{ background:T.indigo, borderRadius:7, padding:"4px 9px", display:"flex", alignItems:"center", gap:6 }}>
            <BookOpen size={12} color={T.white}/><span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>Business Case</span>
          </div>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.55)" }}>Outcome-Driven Innovation · Jobs-to-be-Done</span>
        </div>
        <div style={{ fontSize:isMobile?22:30, fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:10 }}>Bringing alternatives onto the advisor's platform</div>
        <div style={{ fontSize:isMobile?13:15, color:"rgba(255,255,255,0.78)", lineHeight:1.65, maxWidth:720 }}>
          We studied the independent RIA's job of incorporating private markets — selecting, funding, and reporting on alts with public-market confidence — and measured 12 outcomes against what advisors can do today. Seven are high-opportunity and underserved. This is the evidence trail behind every surface in this prototype.
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)", gap:isMobile?10:14, marginTop:22 }}>
          {STRAT_STATS.map(s=>(
            <div key={s.label} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"13px 14px" }}>
              <div style={{ fontSize:isMobile?20:24, fontWeight:800, letterSpacing:"-0.01em" }}>{s.value}</div>
              <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.6)", marginTop:3, lineHeight:1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 1 · Market research */}
      <StratSection eyebrow="01 · Market Research" title="The category crossed the inflection point" intro="Seven external signals define the competitive and regulatory pressure. Every stat is sourced; each maps to a capability custodian-native alts workflows lack today.">
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr", gap:12 }}>
          {MARKET_SIGNALS.map(m=>{
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

      {/* 2 · Customer research */}
      <StratSection eyebrow="02 · Customer Research" title="Who we studied & what hurt" intro="The job executor is the independent RIA — $250–500M firm AUM, 150–350 HNW/UHNW households, and no dedicated alts operations staff — embodied by Jordan Williams in this prototype.">
        <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:14 }}>
          <div style={{ ...card, padding:"18px 20px", width:isMobile?"auto":260, flexShrink:0, background:T.navy, border:"none", color:T.white }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, marginBottom:12 }}>JW</div>
            <div style={{ fontSize:15, fontWeight:700 }}>Jordan Williams</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginBottom:14 }}>Lead Advisor · Independent RIA</div>
            {[["Firm AUM","~$420M"],["Households","210 · HNW/UHNW"],["Alts ops staff","None — solo on operations"],["Goal","Offer institutional-quality private markets without a back office"]].map(([k,v])=>(
              <div key={k} style={{ marginBottom:10 }}>
                <div style={{ fontSize:9.5, fontWeight:700, color:"rgba(255,255,255,0.45)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{k}</div>
                <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.92)", lineHeight:1.45, marginTop:2 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Top pains, with their measured cost</div>
            {CUSTOMER_PAINS.map((p,i)=>(
              <div key={i} style={{ ...card, padding:"12px 16px", display:"flex", gap:14, alignItems:"center" }}>
                <div style={{ minWidth:84, fontSize:15, fontWeight:800, color:T.green, letterSpacing:"-0.01em" }}>{p.metric}</div>
                <div style={{ fontSize:12.5, color:T.gray600, lineHeight:1.5 }}>{p.pain}</div>
              </div>
            ))}
          </div>
        </div>
      </StratSection>

      {/* 3 · Desired outcomes */}
      <StratSection eyebrow="03 · Desired Outcomes" title="The outcomes the advisor is trying to achieve" intro="Each outcome statement was rated for importance and current satisfaction. The opportunity score = Importance + max(Importance − Satisfaction, 0), computed live.">
        <div style={{ ...card, overflow:"hidden" }}>
          {ranked.map((o,i)=>{
            const v = oppScore(o);
            return (
              <div key={o.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 16px", borderTop:i?`1px solid ${T.gray100}`:"none" }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.slate, minWidth:52 }}>{o.id}</div>
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
      <StratSection eyebrow="04 · Job Map" title="The universal job, step by step" intro="The advisor's core job — 'incorporate alternatives into my clients' portfolios with public-market confidence' — decomposed into the eight universal job steps. Each step is owned by a prototype layer.">
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4, 1fr)", gap:10 }}>
          {JOB_MAP.map(j=>(
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
                <div style={{ position:"absolute", inset:0, borderRadius:8, background:`linear-gradient(135deg, ${T.green}1F 0%, ${T.green}14 38%, transparent 46%)`, border:`1px solid ${T.gray200}` }}/>
                {[25,50,75].map(p=>(
                  <div key={"h"+p} style={{ position:"absolute", left:0, right:0, top:`${p}%`, borderTop:`1px dashed ${T.gray200}` }}/>
                ))}
                {[25,50,75].map(p=>(
                  <div key={"v"+p} style={{ position:"absolute", top:0, bottom:0, left:`${p}%`, borderLeft:`1px dashed ${T.gray200}` }}/>
                ))}
                <div style={{ position:"absolute", top:10, left:10, fontSize:9.5, fontWeight:800, color:T.green, letterSpacing:"0.06em", textTransform:"uppercase", lineHeight:1.3 }}>Underserved<br/>Opportunity Zone</div>
                {OUTCOMES.map(o=>{
                  const v = oppScore(o);
                  const left = Math.max(2, Math.min(96, (o.sat/6)*100));
                  const top  = Math.max(2, Math.min(94, (1-(o.imp-7.5)/(10-7.5))*100));
                  return (
                    <div key={o.id} title={`${o.id} · Opp ${v.toFixed(1)}`} style={{ position:"absolute", left:`${left}%`, top:`${top}%`, transform:"translate(-50%,-50%)", display:"flex", alignItems:"center", gap:4 }}>
                      <div style={{ width:13, height:13, borderRadius:"50%", background:oppColor(v), border:`2px solid ${T.white}`, boxShadow:"0 1px 4px rgba(0,0,0,0.2)", flexShrink:0 }}/>
                      <span style={{ fontSize:8.5, fontWeight:700, color:T.gray600, whiteSpace:"nowrap" }}>{o.id.replace("ODI-","")}</span>
                    </div>
                  );
                })}
                <div style={{ position:"absolute", left:-30, top:0, bottom:0, display:"flex", alignItems:"center" }}>
                  <span style={{ fontSize:9.5, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", transform:"rotate(-90deg)", whiteSpace:"nowrap" }}>Importance →</span>
                </div>
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
                <div style={{ fontSize:11, color:T.gray600, lineHeight:1.5 }}>Four outcomes score ≥16 and seven of twelve score ≥14 — a fundable infrastructure gap, not incremental polish. Operational plumbing ships before reporting and portal work.</div>
              </div>
            </div>
          </div>
        </div>
      </StratSection>

      {/* 6 · Recommendations → prototype */}
      <StratSection eyebrow="06 · Recommendations" title="Six moves — and where to see each one live" intro="Every recommendation traces to the outcomes it serves and the prototype surface that delivers it. Open any surface to see the recommendation in action.">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {RECOMMENDATIONS.map(r=>(
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

      {/* Closing CTA */}
      <div style={{ background:`linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 100%)`, borderRadius:14, padding:isMobile?"20px 18px":"24px 28px", color:T.white, display:"flex", flexDirection:isMobile?"column":"row", gap:16, alignItems:isMobile?"stretch":"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:isMobile?16:18, fontWeight:800, marginBottom:4 }}>See the research come to life</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", lineHeight:1.55, maxWidth:560 }}>Take the guided tour to walk every surface and its outcome, or run the end-to-end scenario to watch one capital call become a delivered, consolidated client view.</div>
        </div>
        <div style={{ display:"flex", gap:10, flexShrink:0 }}>
          <button onClick={onStartScenario} style={{ display:"flex", alignItems:"center", gap:6, background:T.white, color:T.green, border:"none", borderRadius:8, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}><Target size={15}/> Run Scenario</button>
          <button onClick={onStartTour} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.15)", color:T.white, border:"1px solid rgba(255,255,255,0.3)", borderRadius:8, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}><PlayCircle size={15}/> Take Tour</button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 1 — ALTS DESK (highest-opportunity surface · the private-markets morning brief)
// ════════════════════════════════════════════════════════════════════════════════
function AltsDesk({ bp, items, onAction }) {
  const { isMobile } = bp;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      {/* Brief banner */}
      <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 100%)`, borderRadius:14, padding:isMobile?"18px":"22px 24px", color:T.white }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <Sparkles size={15} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)" }}>Alts Morning Brief · {ADVISOR.firm}</span>
        </div>
        <div style={{ fontSize:isMobile?16:19, fontWeight:800, lineHeight:1.35 }}>7 items need attention before you place a trade today</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.78)", lineHeight:1.6, marginTop:6, maxWidth:680 }}>
          $4.6M in capital calls fall due in the next 30 days, one subscription came back NIGO, a fresh KKR NAV just posted, and three eligible households still have no alts allocation. Every item routes to the screen that resolves it.
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {DESK_KPIS.map(k=><MetricCard key={k.label} {...k}/>)}
      </div>

      {/* Action queue + side panels */}
      <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:14 }}>
        {/* Queue */}
        <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:10 }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Unified action queue</div>
          {items.map(it=>{
            const Icon = it.icon;
            return (
              <div key={it.id} style={{ ...card, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start", opacity:it.read?0.55:1 }}>
                <div style={{ width:34, height:34, borderRadius:9, background:T.indigoLt, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={16} color={T.indigo}/></div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                    <SevDot sev={it.sev}/>
                    <span style={{ fontSize:13.5, fontWeight:700, color:T.gray900, lineHeight:1.3 }}>{it.title}</span>
                  </div>
                  <div style={{ fontSize:12, color:T.gray600, lineHeight:1.5 }}>{it.detail}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:8, flexWrap:"wrap" }}>
                    <span style={{ fontSize:10.5, fontWeight:700, color:T.slate }}>{it.client}</span>
                    <span style={{ fontSize:10.5, color:T.gray400 }}>·</span>
                    <span style={{ fontSize:10.5, fontWeight:600, color:T.amber }}>{it.meta}</span>
                    <button onClick={()=>onAction(it)} style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, background:T.green, color:T.white, border:"none", borderRadius:7, padding:"6px 12px", fontSize:11.5, fontWeight:700, cursor:"pointer" }}>
                      <Zap size={12}/> Next best action <ChevronRight size={12}/>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side: allocation mix + private AUM trend */}
        <div style={{ width:isMobile?"auto":300, flexShrink:0, display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ ...card, padding:"16px 18px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:8 }}>Private allocation by class ($M)</div>
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={ASSET_MIX} dataKey="value" nameKey="name" innerRadius={42} outerRadius={70} paddingAngle={2}>
                  {ASSET_MIX.map(s=><Cell key={s.name} fill={s.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:8, fontSize:12 }} formatter={(v,n)=>[`$${v}M`, n]}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", flexDirection:"column", gap:5, marginTop:6 }}>
              {ASSET_MIX.map(s=>(
                <div key={s.name} style={{ display:"flex", alignItems:"center", gap:7, fontSize:11.5 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:s.color }}/>
                  <span style={{ color:T.gray600, flex:1 }}>{s.name}</span>
                  <span style={{ fontWeight:700, color:T.gray900 }}>${s.value}M</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...card, padding:"16px 18px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>Private AUM trend (6M, $M)</div>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={PRIVATE_AUM_TREND}>
                <defs><linearGradient id="aua" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.green} stopOpacity={0.3}/><stop offset="100%" stopColor={T.green} stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:8, fontSize:12 }} formatter={v=>[`$${v}M`,"Private AUM"]}/>
                <Area type="monotone" dataKey="aum" stroke={T.green} strokeWidth={2.5} fill="url(#aua)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 2 — FUND MARKETPLACE (research, compare, eligibility screening)
// ════════════════════════════════════════════════════════════════════════════════
function FundMarketplace({ bp, deepLink, onSubscribe }) {
  const { isMobile } = bp;
  const [tab, setTab] = useState("browse");
  useEffect(()=>{ if(deepLink?.subTab) setTab(deepLink.subTab==="compare"?"compare":"browse"); }, [deepLink]);

  const Tabs = (
    <div style={{ display:"flex", gap:6, background:T.gray100, padding:4, borderRadius:9, width:"fit-content" }}>
      {[["browse","Browse"],["compare","Compare & Screen"]].map(([id,l])=>(
        <button key={id} onClick={()=>setTab(id)} style={{ background:tab===id?T.white:"transparent", color:tab===id?T.gray900:T.slate, border:"none", borderRadius:6, padding:"6px 14px", fontSize:12.5, fontWeight:700, cursor:"pointer", boxShadow:tab===id?"0 1px 3px rgba(0,0,0,0.08)":"none" }}>{l}</button>
      ))}
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        {Tabs}
        <div style={{ display:"flex", alignItems:"center", gap:7, background:T.gray100, borderRadius:8, padding:"7px 12px" }}>
          <Search size={14} color={T.slate}/><span style={{ fontSize:12.5, color:T.slate }}>Filter by class, structure, minimum…</span>
        </div>
      </div>

      {tab==="compare" && (
        <div style={{ ...card, padding:"16px 18px", display:"flex", gap:12, alignItems:"center", background:T.greenLt, border:`1px solid ${T.green}33` }}>
          <Check size={18} color={T.green}/>
          <div style={{ fontSize:12.5, color:T.gray900, lineHeight:1.5 }}>
            <strong style={{ color:T.green }}>Eligibility screened once.</strong> Sarah & Michael Chen are verified <strong>Accredited + Qualified Purchaser</strong>. The credential is portable — it carries straight into any subscription, so you never re-key suitability fund-by-fund. <em style={{ color:T.slate }}>(Serves ODI-06, ODI-07)</em>
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
        {FUNDS.map(f=>(
          <div key={f.name} style={{ ...card, padding:"16px 18px", display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:T.gray900, lineHeight:1.3 }}>{f.name}</div>
                <div style={{ fontSize:11.5, color:T.slate, marginTop:2 }}>{f.manager} · {f.cls}</div>
              </div>
              <span style={{ fontSize:9.5, fontWeight:700, color:f.eligible?T.green:T.amber, background:f.eligible?T.greenLt:T.amberLt, borderRadius:99, padding:"3px 9px", whiteSpace:"nowrap" }}>{f.eligible?"Eligible":"Min not met"}</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["Structure",f.structure],["Minimum",f.min],["Liquidity",f.lockup],["Target",f.target]].map(([k,v])=>(
                <div key={k}>
                  <div style={{ fontSize:9, fontWeight:700, color:T.gray400, letterSpacing:"0.05em", textTransform:"uppercase" }}>{k}</div>
                  <div style={{ fontSize:12, color:T.gray900, fontWeight:600, marginTop:1 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:2 }}>
              <span style={{ fontSize:11, color:T.slate, display:"flex", alignItems:"center", gap:4 }}><FileText size={12}/> {f.dd}</span>
              <button onClick={()=>onSubscribe(f)} disabled={!f.eligible} style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, background:f.eligible?T.green:T.gray200, color:f.eligible?T.white:T.gray400, border:"none", borderRadius:7, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:f.eligible?"pointer":"default" }}>
                Subscribe <ChevronRight size={13}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 3 — SUBSCRIPTION STUDIO (the anti-NIGO good-order pipeline)
// ════════════════════════════════════════════════════════════════════════════════
function SubscriptionStudio({ bp, deepLink, onScenarioAdvance }) {
  const { isMobile } = bp;
  const [running, setRunning]           = useState(false);
  const [done, setDone]                 = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(()=>{ if(deepLink?.subTab==="validate"){ /* arrived from an NBA — ready to run */ } }, [deepLink]);

  useEffect(() => {
    if (!running) return;
    const timers = [];
    let delay = 0;
    SUB_STAGES.forEach((stage, i) => {
      timers.push(setTimeout(() => setCurrentStage(stage.id), delay));
      delay += stage.duration;
      timers.push(setTimeout(() => {
        setCompletedIds(prev => [...prev, stage.id]);
        if (i === SUB_STAGES.length - 1) { setCurrentStage(null); setRunning(false); setDone(true); onScenarioAdvance?.(); }
      }, delay - 80));
    });
    return () => timers.forEach(clearTimeout);
  }, [running]);

  const start = () => { if(running) return; setDone(false); setCompletedIds([]); setCurrentStage(null); setRunning(true); };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ ...card, padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:700, color:T.gray900, marginBottom:3 }}>Subscription Studio · Good-Order Pipeline</div>
          <div style={{ fontSize:12, color:T.slate }}>Chen Family Trust · Blackstone Private Credit · $250,000</div>
        </div>
        <button onClick={start} disabled={running} style={{ background:running?T.gray100:T.green, color:running?T.gray400:T.white, border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:running?"default":"pointer", display:"flex", alignItems:"center", gap:8, minHeight:40 }}>
          <PlayCircle size={15}/> {running?"Validating…":done?"Re-Run":"Run Subscription"}
        </button>
      </div>

      {done && (
        <div style={{ ...card, padding:"14px 18px", background:T.emeraldLt, border:`1px solid ${T.emerald}40`, display:"flex", gap:12, alignItems:"center" }}>
          <Check size={20} color={T.emerald}/>
          <div style={{ fontSize:12.5, color:T.gray900, lineHeight:1.5 }}>
            <strong style={{ color:T.emerald }}>Submitted in good order — 0% NIGO risk.</strong> Validated and e-signed in-session vs the 30–60% paper rejection rate and 3–4 week cycle. The capital-call schedule is now logged to Capital Activity, and a timestamped audit trail covers suitability & Reg BI. <em style={{ color:T.slate }}>(ODI-01, ODI-06, ODI-11)</em>
          </div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
        {SUB_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = currentStage === stage.id;
          const isDone   = completedIds.includes(stage.id);
          const isLast   = i === SUB_STAGES.length - 1;
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
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 4 — CAPITAL ACTIVITY (capital calls, distributions, liquidity windows)
// ════════════════════════════════════════════════════════════════════════════════
function CapitalActivity({ bp }) {
  const { isMobile } = bp;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ ...card, padding:"16px 18px", background:T.amberLt, border:`1px solid ${T.amber}40`, display:"flex", gap:12, alignItems:"center" }}>
        <AlertTriangle size={18} color={T.amber}/>
        <div style={{ fontSize:12.5, color:T.gray900, lineHeight:1.5 }}>
          <strong>$587,500 in capital calls fall due across 4 commitments this month.</strong> Every call is mapped to its funding window with wire instructions pre-populated — a missed call can dilute, force-sell, or forfeit the entire prior investment. <em style={{ color:T.slate }}>(ODI-02, ODI-10)</em>
        </div>
      </div>

      {/* Capital calls */}
      <div style={{ ...card, overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray100}`, fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
          <Zap size={13} color={T.amber}/> Upcoming capital calls
        </div>
        {CAPITAL_CALLS.map((c,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 16px", borderTop:i?`1px solid ${T.gray100}`:"none", flexWrap:"wrap" }}>
            <div style={{ flex:isMobile?"1 1 100%":2, minWidth:160 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{c.fund}</div>
              <div style={{ fontSize:11.5, color:T.slate, marginTop:1 }}>{c.client} · {c.commit} commitment</div>
            </div>
            <div style={{ flex:1, minWidth:90 }}>
              <div style={{ fontSize:9, fontWeight:700, color:T.gray400, textTransform:"uppercase", letterSpacing:"0.05em" }}>Amount</div>
              <div style={{ fontSize:13, fontWeight:800, color:T.gray900 }}>{c.amount}</div>
              <div style={{ fontSize:10.5, color:T.slate }}>{c.pct}% of commitment</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12.5, fontWeight:700, color:c.daysOut<=5?T.red:T.gray900 }}>{c.due}</div>
                <div style={{ fontSize:10.5, color:c.daysOut<=5?T.red:T.slate, fontWeight:600 }}>{c.daysOut} days out</div>
              </div>
              <button style={{ background:c.status==="due"?T.green:T.white, color:c.status==="due"?T.white:T.green, border:`1px solid ${T.green}`, borderRadius:7, padding:"7px 13px", fontSize:11.5, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                {c.status==="due"?"Confirm wire":"Review"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Distributions */}
      <div style={{ ...card, overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray100}`, fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:8 }}>
          <ArrowDownRight size={13} color={T.green}/> Recent distributions
        </div>
        {DISTRIBUTIONS.map((d,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderTop:i?`1px solid ${T.gray100}`:"none" }}>
            <div style={{ flex:2, minWidth:140 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gray900 }}>{d.fund}</div>
              <div style={{ fontSize:11.5, color:T.slate, marginTop:1 }}>{d.client}</div>
            </div>
            <span style={{ fontSize:10, fontWeight:700, color:T.indigo, background:T.indigoLt, borderRadius:99, padding:"3px 9px" }}>{d.type}</span>
            <div style={{ marginLeft:"auto", textAlign:"right" }}>
              <div style={{ fontSize:13.5, fontWeight:800, color:T.green }}>{d.amount}</div>
              <div style={{ fontSize:10.5, color:T.slate }}>{d.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 5 — CONSOLIDATED REPORTING (public + private on one page)
// ════════════════════════════════════════════════════════════════════════════════
function freshTag(fresh) {
  if (fresh==="live")   return { label:"Live", color:T.emerald, bg:T.emeraldLt };
  if (fresh==="recent") return { label:"Recent", color:T.green, bg:T.greenLt };
  return { label:"Stale", color:T.amber, bg:T.amberLt };
}
function ConsolidatedReporting({ bp }) {
  const { isMobile } = bp;
  const totalPublic = "2,235,000", totalPrivate = "1,015,000", total = "3,250,000";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <MetricCard label="Total Portfolio"  value="$3.25M"   delta="Public + Private" up={true} accent={T.green}/>
        <MetricCard label="Public Holdings"  value="$2.24M"   delta="68.8% · real-time" up={true} accent={T.indigo}/>
        <MetricCard label="Private Holdings" value="$1.02M"   delta="31.2% · 3 funds" up={true} accent={T.emerald}/>
        <MetricCard label="Blended Return"   value="+8.9%"    delta="vs +7.2% benchmark" up={true} accent={T.green}/>
      </div>

      <div style={{ ...card, padding:"16px 18px" }}>
        <div style={{ fontSize:10, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>Consolidated performance — Chen Family Trust (6M, %)</div>
        <div style={{ fontSize:11.5, color:T.slate, marginBottom:10 }}>One attribution line across public and private holdings — no separate tab, no manual stitch.</div>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart data={CONSOLIDATED_PERF}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.gray100}/>
            <XAxis dataKey="month" tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:10, fill:T.slate }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{ borderRadius:8, fontSize:12 }}/>
            <Line type="monotone" dataKey="total" stroke={T.green}   strokeWidth={2.5} dot={{ fill:T.green, r:3 }} name="Consolidated"/>
            <Line type="monotone" dataKey="bench" stroke={T.gray300} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Benchmark"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ ...card, overflow:"hidden" }}>
        <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.gray100}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Holdings · public + private</span>
          <button style={{ display:"flex", alignItems:"center", gap:5, background:T.gray100, color:T.gray900, border:"none", borderRadius:7, padding:"6px 12px", fontSize:11.5, fontWeight:700, cursor:"pointer" }}><Download size={12}/> Export</button>
        </div>
        {HOLDINGS.map((h,i)=>{
          const f = freshTag(h.fresh);
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderTop:i?`1px solid ${T.gray100}`:"none" }}>
              <span style={{ fontSize:9.5, fontWeight:700, color:h.kind==="Private"?T.indigo:T.slate, background:h.kind==="Private"?T.indigoLt:T.gray100, borderRadius:99, padding:"3px 9px", minWidth:62, textAlign:"center" }}>{h.kind}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{h.name}</div>
                <div style={{ fontSize:11, color:T.slate }}>{h.cls}</div>
              </div>
              <div style={{ display:isMobile?"none":"flex", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:9.5, fontWeight:700, color:f.color, background:f.bg, borderRadius:99, padding:"2px 8px" }}>{f.label}</span>
                <span style={{ fontSize:10.5, color:T.slate, minWidth:78, textAlign:"right" }}>{h.nav}</span>
              </div>
              <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900, minWidth:90, textAlign:"right" }}>{h.value}</div>
            </div>
          );
        })}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 16px", borderTop:`2px solid ${T.gray200}`, background:T.gray50 }}>
          <span style={{ fontSize:12.5, fontWeight:700, color:T.gray900 }}>Total</span>
          <span style={{ fontSize:14, fontWeight:800, color:T.green }}>${total}</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// LAYER 6 — CLIENT PORTAL (branded, consolidated, client-facing)
// ════════════════════════════════════════════════════════════════════════════════
function ClientPortal({ bp }) {
  const { isMobile } = bp;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ background:`linear-gradient(135deg, ${T.green} 0%, ${T.greenMid} 100%)`, borderRadius:14, padding:isMobile?"20px 18px":"26px 28px", color:T.white }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)", marginBottom:6 }}>{ADVISOR.firm} · Client View</div>
        <div style={{ fontSize:isMobile?20:24, fontWeight:800 }}>Welcome back, Sarah & Michael</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.85)", lineHeight:1.6, marginTop:6, maxWidth:620 }}>
          Your complete portfolio — public and private — in one branded place. Your advisor's brand, not the custodian's. <em>(ODI-09, ODI-12)</em>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(3, 1fr)", gap:12, marginTop:20 }}>
          {[["Total Value","$3.25M"],["Private Markets","$1.02M"],["YTD Return","+8.9%"]].map(([k,v])=>(
            <div key={k} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"13px 15px" }}>
              <div style={{ fontSize:22, fontWeight:800 }}>{v}</div>
              <div style={{ fontSize:10.5, color:"rgba(255,255,255,0.7)", marginTop:2 }}>{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:isMobile?"column":"row", gap:14 }}>
        <div style={{ ...card, flex:1, padding:"16px 18px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Your private holdings</div>
          {HOLDINGS.filter(h=>h.kind==="Private").map((h,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderTop:i?`1px solid ${T.gray100}`:"none" }}>
              <div><div style={{ fontSize:13, fontWeight:600, color:T.gray900 }}>{h.name}</div><div style={{ fontSize:11, color:T.slate }}>{h.cls} · {h.nav}</div></div>
              <div style={{ fontSize:13.5, fontWeight:800, color:T.gray900 }}>{h.value}</div>
            </div>
          ))}
        </div>
        <div style={{ ...card, width:isMobile?"auto":280, flexShrink:0, padding:"16px 18px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:12 }}>Documents & signatures</div>
          {[["BCRED subscription","Signed · Jun 14",T.emerald],["Q1 consolidated statement","Ready to view",T.indigo],["Capital call notice","Action: review",T.amber]].map(([t,s,c])=>(
            <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderTop:`1px solid ${T.gray100}` }}>
              <FileText size={15} color={c}/>
              <div style={{ flex:1 }}><div style={{ fontSize:12.5, fontWeight:600, color:T.gray900 }}>{t}</div><div style={{ fontSize:11, color:c, fontWeight:600 }}>{s}</div></div>
              <ChevronRight size={14} color={T.gray400}/>
            </div>
          ))}
          <button style={{ width:"100%", marginTop:12, display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:T.green, color:T.white, border:"none", borderRadius:8, padding:"10px", fontSize:12.5, fontWeight:700, cursor:"pointer" }}>
            <Mail size={14}/> Message your advisor
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsLayer() {
  const [toggles, setToggles] = useState({ calls:true, nigo:true, nav:true, eligibility:false });
  const toggle = k => setToggles(p=>({...p,[k]:!p[k]}));
  const items = [
    { key:"calls",       label:"Capital-Call Alerts",        desc:"Notify 30 / 10 / 3 days before any funding deadline" },
    { key:"nigo",        label:"NIGO Prevention",            desc:"Block subscription submission until good-order validation passes" },
    { key:"nav",         label:"NAV Freshness Alerts",       desc:"Flag any private holding whose NAV exceeds 60 days" },
    { key:"eligibility", label:"Eligibility Expiry Reminders",desc:"Re-verify accreditation before the credential lapses" },
  ];
  return (
    <div style={{ ...card, padding:"24px", maxWidth:520 }}>
      <div style={{ fontSize:15, fontWeight:700, color:T.gray900, marginBottom:18 }}>Alts Platform Settings</div>
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

// ─── Guided HUD (shared by tour + scenario; bottom-anchored, clears CTAs) ───────
function GuideHUD({ kind, steps, step, onPrev, onNext, onClose, isMobile }) {
  const s = steps[step];
  const last = step === steps.length - 1;
  const accent = kind==="scenario" ? T.green : T.indigo;
  return (
    <div style={{ position:"fixed", left:isMobile?12:"auto", right:isMobile?12:24, bottom:isMobile?12:24, width:isMobile?"auto":380, background:T.navy, color:T.white, borderRadius:14, padding:"18px 20px", zIndex:60, boxShadow:"0 12px 40px rgba(0,0,0,0.35)", border:`1px solid rgba(255,255,255,0.1)` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          {kind==="scenario" ? <Target size={14} color={accent}/> : <PlayCircle size={14} color={accent}/>}
          <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(255,255,255,0.6)" }}>{kind==="scenario"?"Scenario":"Guided Tour"} · {step+1}/{steps.length}</span>
        </div>
        <button onClick={onClose} style={{ background:"transparent", border:"none", cursor:"pointer", color:T.gray400, padding:2, display:"flex" }}><X size={16}/></button>
      </div>
      <div style={{ fontSize:15, fontWeight:800, marginBottom:6 }}>{s.title}</div>
      <div style={{ fontSize:12.5, color:"rgba(255,255,255,0.8)", lineHeight:1.6, marginBottom:14 }}>{s.body}</div>
      <div style={{ display:"flex", gap:8 }}>
        {step>0 && <button onClick={onPrev} style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(255,255,255,0.12)", color:T.white, border:"none", borderRadius:7, padding:"8px 13px", fontSize:12, fontWeight:700, cursor:"pointer" }}><ChevronLeft size={13}/> Back</button>}
        <button onClick={last?onClose:onNext} style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5, background:accent, color:T.white, border:"none", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
          {last?"Finish":"Next"} {!last && <ChevronRight size={13}/>}
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ════════════════════════════════════════════════════════════════════════════════
export default function AltsPrototype() {
  const bp = useBreakpoint();
  const { isMobile, isDesktop } = bp;

  const [activeLayer, setActiveLayer] = useState("desk");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deepLink, setDeepLink]       = useState(null);
  const [items, setItems]             = useState(ACTION_ITEMS);

  const [tourOn, setTourOn]           = useState(false);
  const [tourStep, setTourStep]       = useState(0);
  const [scenOn, setScenOn]           = useState(false);
  const [scenStep, setScenStep]       = useState(0);

  useEffect(() => {
    const id = "alts-anim-style";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = `@keyframes progress-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} } @keyframes fade-in-up { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`;
      document.head.appendChild(s);
    }
  }, []);

  const go = useCallback((layer, sub) => {
    setActiveLayer(layer);
    setDeepLink(sub ? { ...sub, _ts: Date.now() } : null);
    if (!isDesktop) setSidebarOpen(false);
  }, [isDesktop]);

  // Action queue NBA → route to the resolving surface + sub-tab, mark read.
  const handleAction = (it) => {
    const { layer, ...sub } = it.action;
    setItems(prev => prev.map(a => a.id===it.id ? { ...a, read:true } : a));
    go(layer, Object.keys(sub).length ? sub : null);
  };

  // Tour / scenario drive the active layer as their step changes.
  useEffect(() => { if (tourOn) setActiveLayer(TOUR_STEPS[tourStep].layer); }, [tourOn, tourStep]);
  useEffect(() => { if (scenOn) { const st = SCENARIO_STEPS[scenStep]; setActiveLayer(st.layer); setDeepLink(st.layer==="lifecycle"?{subTab:"calls",_ts:Date.now()}:null); } }, [scenOn, scenStep]);

  const startTour     = () => { setScenOn(false); setTourStep(0); setTourOn(true); };
  const startScenario = () => { setTourOn(false); setScenStep(0); setScenOn(true); };

  const navItems = [
    { id:"desk",        icon:Home,     label:"Alts Desk",       badge:items.filter(i=>!i.read && i.sev==="high").length || null },
    { id:"marketplace", icon:Search,   label:"Fund Marketplace",badge:null },
    { id:"subscribe",   icon:FileText, label:"Subscription Studio", badge:null },
    { id:"lifecycle",   icon:Activity, label:"Capital Activity",badge:null },
    { id:"reporting",   icon:BarChart2,label:"Consolidated Reporting", badge:null },
    { id:"portal",      icon:Users,    label:"Client Portal",   badge:1 },
    { id:"strategy",    icon:Layers,   label:"Strategy",        badge:null },
    { id:"settings",    icon:Settings, label:"Settings",        badge:null },
  ];

  const SidebarContent = () => (
    <>
      <div style={{ padding:"18px 18px 14px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26, height:26, borderRadius:7, background:T.green, display:"flex", alignItems:"center", justifyContent:"center" }}><BarChart2 size={14} color={T.white}/></div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:T.white, letterSpacing:"-0.01em" }}>Wealthscape Alts</div>
            <div style={{ fontSize:9, fontWeight:700, color:T.indigo, letterSpacing:"0.1em", textTransform:"uppercase" }}>Private Markets 2.0</div>
          </div>
        </div>
        {!isDesktop && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:4, color:T.gray400 }} onClick={()=>setSidebarOpen(false)}><X size={18}/></button>}
      </div>
      <div style={{ padding:"12px 18px", borderBottom:`1px solid rgba(255,255,255,0.08)`, display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:T.greenMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.white, flexShrink:0 }}>{ADVISOR.initials}</div>
        <div><div style={{ fontSize:12, fontWeight:700, color:T.white }}>{ADVISOR.name}</div><div style={{ fontSize:11, color:"#94A3B8" }}>Lead Advisor</div></div>
      </div>
      <nav style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
        {navItems.map(item=>{
          const Icon = item.icon; const active = activeLayer===item.id;
          return (
            <button key={item.id} onClick={()=>{ setActiveLayer(item.id); setDeepLink(null); if(!isDesktop) setSidebarOpen(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, background:active?`${T.green}40`:"transparent", border:active?`1px solid ${T.green}60`:"1px solid transparent", color:active?T.white:"#94A3B8", fontSize:13, fontWeight:active?600:400, cursor:"pointer", marginBottom:2, transition:"all 0.15s", textAlign:"left", minHeight:44 }}>
              <Icon size={16}/>{item.label}
              {item.badge && <span style={{ marginLeft:"auto", background:item.id==="desk"?T.red:T.green, color:T.white, fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:99, minWidth:18, textAlign:"center" }}>{item.badge}</span>}
            </button>
          );
        })}
      </nav>
      <div style={{ margin:"0 8px 14px", background:"rgba(238,240,255,0.12)", border:`1px solid rgba(91,79,190,0.25)`, borderRadius:8, padding:"10px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}><Sparkles size={11} color={T.indigo}/><span style={{ fontSize:10, fontWeight:700, color:"#A78BFA", letterSpacing:"0.06em", textTransform:"uppercase" }}>AI Active</span></div>
        <div style={{ fontSize:11, color:"#94A3B8", lineHeight:1.4 }}>Monitoring 63 commitments across 21 funds</div>
      </div>
    </>
  );

  return (
    <div style={{ display:"flex", height:"100vh", background:T.gray50, fontFamily:"Inter, system-ui, -apple-system, sans-serif", fontSize:14, color:T.gray900, overflow:"hidden", position:"relative" }}>

      {isDesktop && (
        <div style={{ width:230, background:T.navy, display:"flex", flexDirection:"column", flexShrink:0, overflowY:"auto" }}>
          <SidebarContent/>
        </div>
      )}
      {!isDesktop && sidebarOpen && (
        <>
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40 }} onClick={()=>setSidebarOpen(false)}/>
          <div style={{ position:"fixed", top:0, left:0, bottom:0, width:264, background:T.navy, display:"flex", flexDirection:"column", zIndex:50, overflowY:"auto" }}>
            <SidebarContent/>
          </div>
        </>
      )}

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
        <div style={{ background:T.white, borderBottom:`1px solid ${T.gray200}`, padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:52, flexShrink:0, gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {!isDesktop && <button style={{ background:"transparent", border:"none", cursor:"pointer", padding:6, color:T.gray600, display:"flex", alignItems:"center" }} onClick={()=>setSidebarOpen(true)}><Menu size={20}/></button>}
            <div>
              {!isMobile && <div style={{ fontSize:10, color:T.slate, letterSpacing:"0.06em", textTransform:"uppercase" }}>Wealthscape Alts · Private Markets 2.0</div>}
              <div style={{ fontSize:14, fontWeight:700, color:T.gray900 }}>{layerName(activeLayer) || "Strategy"}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={startScenario} style={{ display:"flex", alignItems:"center", gap:6, background:scenOn?T.green:T.emerald, color:T.white, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", minHeight:34 }}>
              <Target size={14}/>{!isMobile&&(scenOn?" Restart":" Scenario")}
            </button>
            <button onClick={startTour} style={{ display:"flex", alignItems:"center", gap:6, background:T.indigo, color:T.white, border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", minHeight:34 }}>
              <PlayCircle size={14}/>{!isMobile&&" Tour"}
            </button>
            <button style={{ position:"relative", background:"transparent", border:"none", cursor:"pointer", padding:6, borderRadius:8 }}>
              <Bell size={18} color={T.slate}/>
              <div style={{ position:"absolute", top:-1, right:-1, minWidth:16, height:16, padding:"0 3px", borderRadius:99, background:T.red, border:`2px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:9, fontWeight:700, color:T.white }}>{items.filter(i=>!i.read).length}</span>
              </div>
            </button>
          </div>
        </div>

        <div style={{ flex:1, overflow:"auto", padding:isMobile?"12px":"20px" }}>
          {activeLayer==="desk"        && <AltsDesk             bp={bp} items={items} onAction={handleAction}/>}
          {activeLayer==="marketplace" && <FundMarketplace      bp={bp} deepLink={deepLink} onSubscribe={()=>go("subscribe",{subTab:"validate"})}/>}
          {activeLayer==="subscribe"   && <SubscriptionStudio   bp={bp} deepLink={deepLink} onScenarioAdvance={scenOn?()=>setScenStep(s=>Math.min(s+1,SCENARIO_STEPS.length-1)):undefined}/>}
          {activeLayer==="lifecycle"   && <CapitalActivity      bp={bp}/>}
          {activeLayer==="reporting"   && <ConsolidatedReporting bp={bp}/>}
          {activeLayer==="portal"      && <ClientPortal         bp={bp}/>}
          {activeLayer==="strategy"    && <StrategyLayer        bp={bp} onNavigate={go} onStartTour={startTour} onStartScenario={startScenario}/>}
          {activeLayer==="settings"    && <SettingsLayer/>}
        </div>

        {isMobile && (
          <div style={{ background:T.white, borderTop:`1px solid ${T.gray200}`, display:"flex", flexShrink:0, paddingBottom:"env(safe-area-inset-bottom, 0px)", overflowX:"auto" }}>
            {navItems.map(item=>{
              const Icon = item.icon; const active = activeLayer===item.id;
              return (
                <button key={item.id} onClick={()=>{ setActiveLayer(item.id); setDeepLink(null); }} style={{ flex:"1 0 auto", minWidth:62, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, padding:"8px 6px 10px", background:"transparent", border:"none", cursor:"pointer", position:"relative", minHeight:54 }}>
                  <div style={{ color:active?T.green:T.gray400, position:"relative" }}>
                    <Icon size={20}/>
                    {item.badge && <div style={{ position:"absolute", top:-4, right:-6, width:14, height:14, borderRadius:"50%", background:T.red, border:`2px solid ${T.white}`, display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:8, fontWeight:700, color:T.white }}>{item.badge}</span></div>}
                  </div>
                  <span style={{ fontSize:9, fontWeight:active?700:500, color:active?T.green:T.gray400, letterSpacing:"0.02em", whiteSpace:"nowrap" }}>{item.label.split(" ")[0]}</span>
                  {active && <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:28, height:2, background:T.green, borderRadius:"0 0 2px 2px" }}/>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {tourOn && (
        <GuideHUD kind="tour" steps={TOUR_STEPS} step={tourStep} isMobile={isMobile}
          onPrev={()=>setTourStep(s=>Math.max(s-1,0))}
          onNext={()=>setTourStep(s=>Math.min(s+1,TOUR_STEPS.length-1))}
          onClose={()=>setTourOn(false)}/>
      )}
      {scenOn && (
        <GuideHUD kind="scenario" steps={SCENARIO_STEPS} step={scenStep} isMobile={isMobile}
          onPrev={()=>setScenStep(s=>Math.max(s-1,0))}
          onNext={()=>setScenStep(s=>Math.min(s+1,SCENARIO_STEPS.length-1))}
          onClose={()=>setScenOn(false)}/>
      )}
    </div>
  );
}
