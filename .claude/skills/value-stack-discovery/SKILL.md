---
name: value-stack-discovery
description: Run an Outcome-Driven Innovation (ODI / Jobs-to-be-Done) discovery on a component of Fidelity's value stack and produce both a strategy report AND a deployable React prototype with a Strategy tab — the same artifact shipped for Wealthscape Reporting 2.0 in this repo. Use when the user wants to research, prioritize, and prototype a product surface (e.g. "run discovery on custody", "build the business case for retirement", "ODI on trading"). Orchestrates the market-research, customer-research, and odi-synthesis subagents.
argument-hint: <value-stack-component> [--report-only]
---

# Value-Stack Discovery Orchestrator

You run a repeatable ODI / Jobs-to-be-Done discovery pipeline for a component of
**Fidelity's value stack**, ending in (1) a strategy report and (2) — by default —
a working React prototype with a Strategy tab. This is the generalized version of
the process used to build Wealthscape Reporting 2.0 in this repo; that app's
`wealthscape-intelligence/src/WealthscapePrototype.jsx` is the reference artifact.

The target component is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask which value-stack component to analyze before
proceeding (e.g. custody, trading, brokerage, retirement / 401(k), advisory,
cash management, fixed income, alternatives, workplace investing).

Flags:
- `--report-only` → stop after step 4 (no prototype scaffolding).

## Pipeline — run in order

Read @methodology.md for the full method. The orchestration:

1. **Frame the job.** State the core functional job the executor is trying to get
   done with this component, the job executor (persona), and 2–4 related jobs.
   Confirm with the user if the scope is ambiguous.

2. **Research (parallel).** In a *single message*, spawn two subagents concurrently:
   - the **market-research** agent → competitive/market/regulatory signals **and a
     `CAPABILITY_MATRIX` comparing current Fidelity technology to best-in-class
     competitors** (see @methodology.md §1b)
   - the **customer-research** agent → persona, pains, current workarounds
   Pass each the framed job + component. First read any internal docs the user
   supplied and hand their paths + summaries to the agents so findings are grounded.

3. **Synthesize & score.** Give both research briefs to the **odi-synthesis** agent.
   It returns, in the exact shapes from @data-schema.md: outcome statements with
   importance / satisfaction / opportunity scores, the 8-step job map, and ranked
   recommendations.

4. **Report.** Present the strategy report inline, in this order: market signals →
   capability comparison (Fidelity vs the field) → customer pains → ranked desired
   outcomes → job map → opportunity-matrix read → recommendations. Cite every figure.

5. **Prototype** (skip if `--report-only`). Scaffold a deployable prototype + Strategy
   tab per @prototype-kit.md, reusing the `T` design tokens, `StratSection`, and
   `StrategyLayer` patterns from the reference artifact. Build, then offer to commit
   on a feature branch and open a PR (regular merge commits — never squash).

## Quality bar
- Every number traces to a source (web citation or a provided doc). Explicitly flag
  any value you had to assume rather than source.
- Opportunity scores MUST be computed with the formula in @data-schema.md
  (`Opp = Importance + max(Importance − Satisfaction, 0)`), never hand-waved — this
  keeps the ranked list, the matrix, and the recommendations mutually consistent.
- Emit data in the exact schema shapes so the prototype kit consumes them without rework.

## Network note
Live web research depends on this environment's network policy
(https://code.claude.com/docs/en/claude-code-on-the-web). If the research agents
cannot reach the web, fall back to provided docs + model synthesis and say so
explicitly in the report.
