const quarterlyAllocation = [
  ["US equity", 42, 36],
  ["International equity", 18, 20],
  ["Fixed income", 28, 30],
  ["Alternatives", 8, 9],
  ["Cash", 4, 5],
];
const base = {
  household: "Sarah & Michael Chen",
  householdId: "CH-1042",
  accountDescription: "Joint brokerage & retirement accounts",
  objective: "Long-term growth",
  risk: "Moderate",
  accounts: "3 accounts",
  holdings: "47 positions",
  allocation: quarterlyAllocation,
  allocationActualLabel: "Actual",
  allocationTargetLabel: "Target",
  currentAllocationIndex: 1,
  snapshotLabel: "Total portfolio",
};
export const generatedReports = {
  quarterly: {
    ...base,
    id: "quarterly",
    title: "Quarterly Review",
    period: "Q2 2025 · Through June 9",
    asOf: "June 9, 2025",
    recordId: "RPT-CH1042-Q2-2025",
    value: "$4,284,500",
    change: "+8.4% year to date",
    performanceTitle: "Performance context",
    returnBasis: "YTD",
    portfolioReturn: 8.4,
    benchmarkReturn: 6.2,
    performance: [
      ["Jan", 2.1, 1.8],
      ["Feb", 3.4, 2.9],
      ["Mar", 2.8, 2.5],
      ["Apr", 5.2, 4.1],
      ["May", 6.7, 5.3],
      ["Jun 9", 8.4, 6.2],
    ],
    chartMax: 10,
    sync: "47 positions and 312 transactions reconciled at 09:05 ET. Account scope confirmed for this household.",
    performanceContext:
      "US equity and healthcare exposure supported the relative gain. Fixed income helped cushion the March decline. The 60/40 benchmark is a comparison measure, not an investable portfolio; allocations and fees differ.",
    allocationNote:
      "US equity is 6 points above target. Review tax lots and suitability before recommending a rebalance.",
    narrativeTitle: "Portfolio commentary",
    narrative: [
      "Your portfolio gained 8.4% year to date, compared with 6.2% for the blended benchmark. Equity exposure contributed to the gain, while bonds helped reduce volatility. These returns describe the period through June 9, rather than a completed quarter.",
      "US equity now represents 42% of the portfolio against a 36% target. Before making changes, we will review your cash needs, taxable gains and risk preferences. One international ETF valuation requires a price refresh; its impact must be confirmed before this report is released.",
    ],
    exception: {
      id: "VAL-018",
      title: "Price refresh required",
      body: "International ETF price is four hours old. Its last available price is included in the 18% international equity allocation. No missing accounts or transaction breaks were detected.",
      owner: "Data operations",
      action:
        "Refresh the price, rerun valuation and confirm whether performance or narrative changes.",
    },
    disclosure:
      "Past performance does not guarantee future results. Values can change and may reflect delayed pricing. Benchmark results exclude the household’s fees and taxes.",
    followup:
      "Discuss concentration, tax implications and cash needs at the next household review.",
  },
  annual: {
    ...base,
    id: "annual",
    title: "Annual Report",
    period: "FY 2024",
    asOf: "December 31, 2024",
    recordId: "RPT-CH1042-FY-2024",
    value: "$4,108,200",
    change: "+14.2% full year",
    performanceTitle: "Full-year performance",
    returnBasis: "FY",
    portfolioReturn: 14.2,
    benchmarkReturn: 11.1,
    performance: [
      ["Jan", 1.2, 0.9],
      ["Mar", 3.1, 2.7],
      ["Jun", 6.3, 5.1],
      ["Sep", 9.8, 7.5],
      ["Dec", 14.2, 11.1],
    ],
    chartMax: 16,
    allocation: [
      ["US equity", 40, 36],
      ["International equity", 20, 20],
      ["Fixed income", 28, 30],
      ["Alternatives", 8, 9],
      ["Cash", 4, 5],
    ],
    sync: "Year-end balances across 3 accounts and 1,204 transactions reconciled. Valuation snapshot locked to December 31, 2024.",
    performanceContext:
      "The portfolio returned 14.2% during 2024 versus 11.1% for the 60/40 benchmark. Equities led annual gains; fixed income diversified the return path. Figures are calendar-year results, not a current-year forecast.",
    allocationNote:
      "US equity closed the year 4 points above target. Consider tax implications alongside the annual allocation review.",
    narrativeTitle: "Annual planning summary",
    narrative: [
      "The household finished 2024 with $4,108,200 and a 14.2% annual return. The next planning meeting should connect investment performance to the retirement, education and legacy goals, rather than treating the year-end return as the planning outcome.",
      "Retirement in 2042 is 78% funded against the current planning target; the 2030 college goal is 64% funded. Confirm 2025 contributions and cash needs. Review beneficiary designations and estate documents before updating the annual plan.",
    ],
    planning: [
      "Retirement · 2042: 78% funded",
      "College · 2030: 64% funded",
      "Legacy / estate: annual beneficiary review due",
    ],
    exception: {
      id: "VAL-041",
      title: "Year-end alternative valuation pending",
      body: "The alternatives allocation uses the manager’s latest estimate. The final year-end statement has not been received; the annual return may be revised.",
      owner: "Data operations",
      action:
        "Reconcile the final manager statement and rerun year-end performance before release.",
    },
    disclosure:
      "Past performance does not guarantee future results. Goal funding ratios are planning estimates based on stated targets. Alternative valuations may be revised after final statements are received.",
    followup:
      "Confirm annual contributions, education funding and beneficiary review dates at the planning meeting.",
  },
  adhoc: {
    ...base,
    id: "adhoc",
    title: "Ad-Hoc Update",
    period: "Market volatility update · June 2025",
    asOf: "June 9, 2025",
    recordId: "RPT-CH1042-UPDATE-0609",
    value: "$4,284,500",
    change: "+2.4% month to date",
    performanceTitle: "Event & performance context",
    returnBasis: "MTD",
    portfolioReturn: 2.4,
    benchmarkReturn: 1.8,
    performance: [
      ["Jun 2", 0.4, 0.3],
      ["Jun 3", 0.2, 0.1],
      ["Jun 4", 0.7, 0.5],
      ["Jun 5", 1.2, 0.9],
      ["Jun 6", 1.8, 1.4],
      ["Jun 9", 2.4, 1.8],
    ],
    chartMax: 3,
    sync: "June 9 holdings and month-to-date activity reconciled for the requested market update. Report window: June 1–9, 2025.",
    performanceContext:
      "Prepared after the household asked how recent volatility affects near-term withdrawals. The portfolio is up 2.4% month to date, versus 1.8% for the benchmark, following an early-month dip.",
    allocationNote:
      "Cash is 4% of the portfolio, approximately $171,380. Confirm the timing and amount of planned withdrawals before recommending changes.",
    narrativeTitle: "Market update & cash needs",
    narrative: [
      "Recent daily price moves have been uneven, but your portfolio remains positive for June through the ninth. This short update focuses on your upcoming cash needs and concentration risk; it does not replace the quarterly review.",
      "The current cash allocation is approximately $171,380. Please confirm your planned withdrawal amount and timing. We will compare that need with available cash and review tax lots before considering any sales.",
    ],
    exception: {
      id: "VAL-063",
      title: "Withdrawal timing needs confirmation",
      body: "The household’s withdrawal request does not include a confirmed date. Available cash is shown, but a funding recommendation is not yet approved.",
      owner: "Advisor",
      action:
        "Confirm the withdrawal date and amount with the household, then update the recommendation.",
    },
    disclosure:
      "Short-period returns can be volatile and do not predict future results. Cash figures are a snapshot and may change with pending activity. No trading instruction is included in this update.",
    followup:
      "Confirm withdrawal timing and arrange a focused call about cash coverage and concentration.",
  },
  proposal: {
    ...base,
    id: "proposal",
    title: "Client Proposal",
    period: "New account proposal · June 2025",
    asOf: "June 9, 2025",
    recordId: "RPT-CH1042-PROPOSAL-0609",
    accountDescription: "Proposed joint advisory account",
    accounts: "1 proposed account",
    holdings: "5 asset classes",
    snapshotLabel: "Proposed investment",
    value: "$2,500,000",
    change: "Moderate risk · Subject to suitability review",
    performanceTitle: "Proposed funding & costs",
    performance: null,
    proposalMetrics: [
      ["Initial funding", "$2,500,000"],
      ["Annual advisory fee", "0.85%"],
      ["Illustrative annual fee", "$21,250"],
    ],
    allocation: [
      ["US equity", 0, 38],
      ["International equity", 0, 22],
      ["Fixed income", 0, 30],
      ["Alternatives", 0, 7],
      ["Cash", 100, 3],
    ],
    allocationActualLabel: "Uninvested",
    allocationTargetLabel: "Proposed",
    currentAllocationIndex: 2,
    sync: "Proposed $2.5M funding amount and household objectives captured from the new-account intake. Funds have not been transferred or invested.",
    performanceContext:
      "The $21,250 annual fee illustration equals $2,500,000 × 0.85%, assuming an unchanged balance. Fund expenses, transaction costs and taxes are additional. No investment return forecast is presented.",
    allocationNote:
      "The proposed mix shifts uninvested cash into a diversified allocation. No trades or transfers are authorized by this proposal.",
    narrativeTitle: "Recommendation & account plan",
    narrative: [
      "The proposed account would invest $2.5M across US equity, international equity, fixed income, alternatives and cash. The allocation is designed around long-term growth and a moderate risk profile, subject to confirmation of your investment horizon and liquidity needs.",
      "Before opening the account, review the advisory agreement, fees, product costs and alternatives eligibility. The advisor will confirm suitability, document your decisions and obtain the required account-opening instructions. This report does not initiate funding or trading.",
    ],
    exception: {
      id: "VAL-082",
      title: "Suitability questionnaire incomplete",
      body: "Investment horizon and liquidity responses are awaiting client confirmation. The alternatives allocation is provisional until eligibility is reviewed.",
      owner: "Advisor",
      action:
        "Complete the questionnaire and confirm alternatives eligibility before seeking supervisory approval.",
    },
    disclosure:
      "Illustrative proposal only. No returns are guaranteed or forecast. The advisory fee illustration excludes underlying product expenses, transaction costs and taxes. No account opening, investment approval or trading authorization is implied.",
    followup:
      "Review the allocation and all-in costs with the prospective account holders before obtaining instructions.",
  },
};
export function reportTemplateId(value) {
  return Object.hasOwn(generatedReports, value) ? value : "quarterly";
}
export function getGeneratedReport(value) {
  return generatedReports[reportTemplateId(value)];
}
export function reportContext(
  profileId,
  template = "quarterly",
  tab = "build",
) {
  return {
    profileId: profileId || "ria",
    reportTemplate: reportTemplateId(template),
    reportTab: ["build", "generate", "customize"].includes(tab) ? tab : "build",
  };
}
export const portalReportDocuments = [
  {
    name: "Q2 2025 Performance Report",
    date: "Jun 9, 2025",
    isNew: true,
    template: "quarterly",
  },
  {
    name: "Q1 2025 Performance Report",
    date: "Mar 12, 2025",
    reason: "Archived report file is not available.",
  },
  { name: "2024 Annual Review", date: "Jan 8, 2025", template: "annual" },
  { name: "June 2025 Market Update", date: "Jun 9, 2025", template: "adhoc" },
  { name: "New Account Proposal", date: "Jun 9, 2025", template: "proposal" },
  {
    name: "Investment Policy Statement",
    date: "Aug 14, 2024",
    reason: "Document file is not available.",
  },
  {
    name: "Account Opening Documents",
    date: "May 2, 2023",
    reason: "Document files are not available.",
  },
];
export function reportStageDetails(template) {
  const report = getGeneratedReport(template);
  return {
    sync: {
      result: report.sync,
      desc:
        report.id === "proposal"
          ? "Reading proposed funding, household objectives and account intake"
          : "Reconciling positions, transactions and the report valuation period",
    },
    validate: {
      result: `0 errors · 1 warning: ${report.exception.title}`,
      desc:
        report.id === "proposal"
          ? "Checking suitability responses, eligibility and funding assumptions"
          : "Checking source completeness and open report exceptions",
    },
    assemble: {
      result: `${report.title} · 8 sections · ${report.performance ? "1 chart" : "Funding and fee summary"} · 2 tables`,
    },
    narrative: {
      result: `${report.narrativeTitle} drafted · Exception disclosure included`,
    },
    compliance: {
      result: "12 automated checks passed · Release review pending",
    },
    delivery: { result: `${report.title} package prepared · Not sent` },
  };
}
