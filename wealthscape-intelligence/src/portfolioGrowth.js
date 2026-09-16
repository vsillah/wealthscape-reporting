// One synthetic history, ending June 30, 2025. All ranges share these observations.
const day = 86_400_000;
export const portfolioHistory = [
  ["2025-01-01", 3950400], ["2025-02-01", 4020000],
  ["2025-03-01", 3980000], ["2025-04-01", 4110000],
  ["2025-04-15", 4152000], ["2025-05-01", 4200000],
  ["2025-05-15", 4192000], ["2025-05-31", 4230000],
  ["2025-06-07", 4245000], ["2025-06-14", 4238000],
  ["2025-06-21", 4260000], ["2025-06-30", 4284500],
].map(([date, value]) => ({ time: Date.parse(`${date}T00:00:00Z`), value }));

export const portfolioRangeOptions = [
  { id: "30", label: "30D", name: "30 days", days: 30 },
  { id: "60", label: "60D", name: "60 days", days: 60 },
  { id: "90", label: "90D", name: "90 days", days: 90 },
  { id: "all", label: "All time", name: "All time" },
];

export const formatPortfolioDate = time => new Date(time).toLocaleDateString("en-US", {
  month: "short", day: "numeric", timeZone: "UTC",
});
export const formatPortfolioAxis = value => `$${(value / 1_000_000).toFixed(2).replace(/0$/, "")}M`;
export const formatPortfolioMoney = value => value.toLocaleString("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0,
});

function buildRange(option) {
  const end = portfolioHistory.at(-1).time;
  const start = option.days ? end - option.days * day : portfolioHistory[0].time;
  const data = portfolioHistory.filter(point => point.time >= start);
  const values = data.map(point => point.value);
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min;
  const roughStep = span / 3;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const step = [1, 2, 5, 10].find(size => size * magnitude >= roughStep) * magnitude;
  const domain = [Math.floor((min - span * 0.2) / step) * step, Math.ceil((max + span * 0.2) / step) * step];
  const ticks = Array.from({ length: Math.round((domain[1] - domain[0]) / step) + 1 }, (_, i) => domain[0] + i * step);
  return {
    ...option, data, domain, ticks, start, end,
    gain: data.at(-1).value - data[0].value,
    period: `${formatPortfolioDate(start)} – ${formatPortfolioDate(end)}, 2025`,
    dateTicks: option.days
      ? Array.from({ length: 4 }, (_, i) => start + (end - start) * i / 3)
      : ["2025-01-01", "2025-02-01", "2025-03-01", "2025-04-01", "2025-05-01", "2025-06-30"].map(date => Date.parse(`${date}T00:00:00Z`)),
  };
}

export const portfolioRanges = Object.fromEntries(portfolioRangeOptions.map(option => [option.id, buildRange(option)]));
