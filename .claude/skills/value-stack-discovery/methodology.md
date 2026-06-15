# ODI / Jobs-to-be-Done Methodology

The method behind every Strategy tab. It converts a fuzzy "improve X" into a
prioritized, evidence-backed set of moves and a prototype that proves them.

## 0 · Frame the job

- **Core functional job**: the job the executor hires the product to do, phrased
  verb + object + clarifier and solution-agnostic. Example (Wealthscape):
  *"deliver a clear, timely account of how my clients' money is doing."*
- **Job executor (persona)**: who performs the job (e.g. independent RIA advisor,
  401(k) plan sponsor, retail trader). Capture book size, constraints, goals.
- **Related jobs**: 2–4 adjacent jobs the executor also cares about during the
  main job, used to spot expansion opportunities.

## 1 · Market research (→ market-research agent)

Goal: 5–7 external signals that establish competitive and regulatory pressure.
Each signal = a tag, a hard stat, a source, and 1–2 sentences. Look for:
- competitor capability benchmarks (what best-in-class does vs the incumbent),
- adoption / expectation stats (what end clients now expect),
- regulatory or compliance pressure,
- tool-sprawl / workflow-fragmentation data,
- shadow-IT or off-platform behavior signaling an unmet need.

## 1b · Capability comparison (→ market-research agent)

Signals establish *that* the category is moving; the capability comparison shows
*where the current Fidelity technology stands against it*. Build a
**`CAPABILITY_MATRIX`** of 5–7 rows that contrasts the incumbent (the current
Fidelity stack for this component — e.g. AIX for alternatives, Wealthscape Reporting
for reporting) against best-in-class competitors (iCapital, CAIS, Addepar, Envestnet,
Schwab, etc.).

Each row carries:
- the **capability**,
- **Fidelity's current state** (one phrase, sourced),
- a **rating** of how well the current Fidelity stack does it today — `strong` /
  `partial` / `none`,
- the **best-in-class competitor** and how they do it (sourced),
- the measurable **gap**.

Rate honestly: `strong` only where Fidelity is at or near parity. Every row should
line up with a market signal and with an underserved outcome — the matrix is the
"can't do it today" view of the same gap the opportunity scores quantify. This is
the credibility bridge between external pressure and the internal investment case.

## 2 · Customer research (→ customer-research agent)

Goal: the persona card + the top 4–6 pains in the executor's own words, each tied
to a measurable cost (time, logins, error rate, churn risk). Capture current
workarounds — they reveal where satisfaction is lowest.

## 3 · Desired outcomes (→ odi-synthesis agent)

Translate pains and jobs into **outcome statements**, the ODI grammar:

> `[direction] + [unit of measure] + [object of control] + [contextual clarifier]`
> e.g. *"Minimize the time it takes to generate a branded, client-ready report."*

Direction is usually *Minimize* (time, effort, errors) or *Increase / Maximize*
(likelihood, confidence). Aim for 8–12 statements covering the whole job.

Score each on two 1–10 dimensions:
- **Importance** — how important the outcome is to the executor.
- **Satisfaction** — how well it's met today by existing solutions.

Compute the **opportunity score**:

```
Opportunity = Importance + max(Importance − Satisfaction, 0)
```

Tiers: **≥16 critical**, **14–16 high**, **<14 moderate**. Outcomes that are
important *and* underserved (high importance, low satisfaction) are the targets.

## 4 · Job map (→ odi-synthesis agent)

Decompose the core job into the 8 universal job-map steps. Each step states what
the executor is trying to accomplish (not how) and is later owned by a product
surface:

1. **Define** – determine objectives / what needs attention
2. **Locate** – gather inputs, materials, information
3. **Prepare** – set up / organize inputs
4. **Confirm** – verify readiness, completeness, compliance
5. **Execute** – perform the core job
6. **Monitor** – assess that execution is on track
7. **Modify** – make adjustments / corrections
8. **Conclude** – finish, deliver, hand off

## 5 · Opportunity matrix

Plot every outcome on Importance (y) vs Satisfaction (x). The upper-left region —
high importance, low satisfaction — is the **underserved opportunity zone**. The
density of outcomes there is the headline: a cluster means a real, fundable gap
rather than incremental polish.

## 6 · Recommendations → prototype

Group the top outcomes into 4–6 recommendations. Each recommendation names:
- the outcomes it serves (by ODI id),
- the product surface that delivers it,
- and — once prototyped — a deep link into that surface.

Recommendations become the prototype's layers/tabs. The Strategy tab then closes
the loop by showing each recommendation reflected in a live surface.

## 7 · Resolution strategy — build vs buy (→ odi-synthesis agent)

A recommendation says *what* to deliver; the resolution strategy says *how to source
it*. For each key capability gap (from the `CAPABILITY_MATRIX`), choose one of four
calls and record it in `BUILD_BUY`:

- **Build** — develop in-house. For *core* differentiators where no strong external
  solution exists, or where owning it protects the client relationship.
- **Buy** — acquire a vendor/asset. For *core* capabilities under time pressure where a
  mature target exists.
- **Partner / License** — integrate a third party. For *context* (table-stakes)
  capabilities where a mature vendor already wins; don't reinvent the rails.
- **Wrap** — build a differentiated experience layer on top of a bought/partnered
  engine. The hybrid that usually wins for an incumbent platform.

Score each gap on **strategic role** (core ↔ context), **external-solution maturity**
(sourced from the capability comparison), and **urgency** (the competitive/regulatory
clock — usually tracks the opportunity score). The 2×2 that anchors the call:

```
            Strong vendor exists        No strong vendor
   CORE     BUY / WRAP                  BUILD
   CONTEXT  PARTNER / LICENSE           BUILD MINIMAL / wait
```

The recurring incumbent pattern: **buy/partner the rails, build the experience, wrap
them together** — own the differentiated workflow and the data/infra plumbing is
licensed. Sequence the calls by urgency so the highest-opportunity gaps resolve first.
Every call is judgment, not arithmetic; state the rationale and flag where a real cost
or acquisition figure would change the call (the discovery sources capabilities, not
deal comps — say so rather than inventing a price).
