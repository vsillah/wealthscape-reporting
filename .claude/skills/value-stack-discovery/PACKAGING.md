# Packaging as a distributable plugin

Right now this discovery toolkit lives **project-local** under `.claude/` and works
immediately in this repo — no install step. To reuse it across other repos/teams,
lift it into a standalone, installable Claude Code plugin.

## What's here (project-local layout)

```
.claude/
├── skills/value-stack-discovery/
│   ├── SKILL.md            # orchestrator entry point (/value-stack-discovery)
│   ├── methodology.md      # the ODI/JTBD method
│   ├── data-schema.md      # discovery → prototype data contract
│   ├── prototype-kit.md    # how to scaffold the prototype + Strategy tab
│   └── PACKAGING.md         # this file
└── agents/
    ├── market-research.md
    ├── customer-research.md
    └── odi-synthesis.md
```

## Promote to a plugin

A distributable plugin keeps components at the **plugin root** (not under
`.claude/`) with a manifest in `.claude-plugin/`:

```
value-stack-discovery-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   └── value-stack-discovery/   (move the skill dir here, minus this file)
└── agents/
    ├── market-research.md
    ├── customer-research.md
    └── odi-synthesis.md
```

`plugin.json`:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-plugin-manifest.json",
  "name": "value-stack-discovery",
  "version": "0.1.0",
  "description": "ODI/JTBD discovery pipeline that turns a value-stack component into a sourced strategy report and a deployable React prototype with a Strategy tab.",
  "keywords": ["odi", "jobs-to-be-done", "discovery", "wealthtech", "prototype"],
  "skills": "./skills/",
  "agents": "./agents/"
}
```

Notes:
- Only `plugin.json` goes inside `.claude-plugin/`; `skills/` and `agents/` sit at
  the root.
- Once packaged, the skill is namespaced as `value-stack-discovery:value-stack-discovery`
  and agents resolve from the plugin (lowest precedence — project `.claude/` wins on
  collisions, so remove the project-local copies if you install the plugin here).
- Distribute via a plugin marketplace repo or a git URL; add a `version` so updates
  are explicit (omit it and each commit SHA becomes a new version).
- The prototype-kit references this repo's `WealthscapePrototype.jsx` as the template.
  When packaging for other teams, either vendor a trimmed template into the plugin or
  point `prototype-kit.md` at a shared template repo.
