// Account_Maintenance_Frames.html, chart s1: both dashed dividers are at 3.
export const OUTCOME_MIDPOINT = 3;
export const outcomeQuadrants = [
  {
    label: "Opportunity / underserved",
    lines: ["Opportunity", "/ underserved"],
    minS: 1,
    maxS: 3,
    minI: 3,
    maxI: 5,
    fill: "#e8f5ee",
  },
  {
    label: "Table stakes",
    lines: ["Table stakes"],
    minS: 3,
    maxS: 5,
    minI: 3,
    maxI: 5,
    fill: "#eef0fa",
  },
  {
    label: "Ignore",
    lines: ["Ignore"],
    minS: 1,
    maxS: 3,
    minI: 1,
    maxI: 3,
    fill: "#f3f5f6",
  },
  {
    label: "Overserved",
    lines: ["Overserved"],
    minS: 3,
    maxS: 5,
    minI: 1,
    maxI: 3,
    fill: "#fff5e5",
  },
];
export const outcomeChartX = (satisfaction) => 52 + (satisfaction - 1) * 110;
export const outcomeChartY = (importance) => 280 - (importance - 1) * 63.75;
export function outcomeQuadrant(satisfaction, importance) {
  if (satisfaction === OUTCOME_MIDPOINT || importance === OUTCOME_MIDPOINT)
    return "On the midpoint divider";
  return outcomeQuadrants.find(
    (q) =>
      satisfaction >= q.minS &&
      satisfaction <= q.maxS &&
      importance >= q.minI &&
      importance <= q.maxI,
  )?.label;
}
