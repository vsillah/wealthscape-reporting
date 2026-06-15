# Wealthscape Reporting 2.0

An interactive prototype of a redesigned Wealthscape advisor experience, plus a
reusable toolkit for running the same research-to-prototype process on other
components of Fidelity's value stack.

- **Live prototype:** https://wealthscape-reporting.vercel.app
- **Prototype source:** [`wealthscape-intelligence/`](wealthscape-intelligence/) — a
  single-file Vite + React app (`src/WealthscapePrototype.jsx`). Vercel auto-deploys
  on merge to `main`.

## The prototype

Five ODI-driven layers — Morning Brief, Report Builder, Integration Hub, Client
Portal, and Analytics — plus a **Strategy** tab that tells the full business case
(market + customer research → desired outcomes → job map → opportunity matrix →
recommendations, each linking into the live surface that delivers it).

```bash
cd wealthscape-intelligence
npm install
npm run dev      # local dev server
npm run build    # production build (must pass before committing)
```

## The discovery toolkit

The process behind this prototype is packaged as a project-local Claude Code
toolkit under [`.claude/`](.claude/) so you can run the same Outcome-Driven
Innovation (ODI / Jobs-to-be-Done) discovery on any value-stack component —
custody, trading, retirement, advisory, cash management, and so on.

### How to run a discovery (cold start)

1. **Start a fresh Claude Code session** pointed at this repo
   (`vsillah/wealthscape-reporting`). Because the toolkit lives on `main`, the
   skill and its subagents load automatically — no setup.
2. **(Recommended) Run it in its own session.** A discovery is a large, multi-agent
   task; a dedicated session keeps its context clean.
3. **Check network access.** Live market/customer research depends on the session's
   network policy. If the web is unreachable, the research agents fall back to
   provided docs + clearly-labeled model synthesis.
4. **Provide any internal material.** Drop decks/notes/transcripts into the repo and
   mention their paths at the start of the run so findings are grounded in your
   sources, not just the open web.
5. **Invoke the skill:**
   ```
   /value-stack-discovery <component>
   ```
   Examples: `/value-stack-discovery custody`,
   `/value-stack-discovery retirement --report-only` (stops before the prototype).

### What it does

`/value-stack-discovery` frames the core job, fans out the **market-research** and
**customer-research** subagents in parallel, hands their briefs to the
**odi-synthesis** agent (which scores outcomes, builds the 8-step job map, and ranks
recommendations), presents a strategy report, and — unless `--report-only` — scaffolds
a deployable prototype with its own Strategy tab.

| File | Purpose |
|------|---------|
| `.claude/skills/value-stack-discovery/SKILL.md` | Orchestrator entry point |
| `.claude/skills/value-stack-discovery/methodology.md` | The ODI/JTBD method |
| `.claude/skills/value-stack-discovery/data-schema.md` | Discovery → prototype data contract |
| `.claude/skills/value-stack-discovery/prototype-kit.md` | How to scaffold the prototype + Strategy tab |
| `.claude/skills/value-stack-discovery/PACKAGING.md` | Promote the toolkit to a standalone installable plugin |
| `.claude/agents/market-research.md` | Competitive / market / regulatory signals |
| `.claude/agents/customer-research.md` | Persona + pains / workarounds |
| `.claude/agents/odi-synthesis.md` | Scored outcomes, job map, recommendations |

## Conventions

- Develop on a feature branch; `npm run build` must pass before committing.
- Open a PR only when asked; merge with **regular merge commits** (never squash —
  squash rewrites `main` history and forces conflict resolution on the next PR).
