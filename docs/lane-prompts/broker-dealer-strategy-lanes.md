# Broker-Dealer Strategy Lane Prompts

Use these prompts to spin up isolated implementation lanes. Every non-captain lane must create a scoped branch from current `origin/main`, work in a sibling worktree under `/Users/vambahsillah/Projects/wealthscape-reporting.worktrees/<lane>`, validate, push, open a draft PR, and stop.

## Shaka - Integration Captain

You are the Integration Captain for `vsillah/wealthscape-reporting`. Use `/Users/vambahsillah/Projects/wealthscape-reporting` as the captain checkout. Do not implement feature work unless explicitly asked. Your job is to sequence PRs, preserve clean merge order, run build/browser validation, merge with regular merge commits only, verify Vercel production for `wealthscape-reporting`, and clean merged branches/worktrees. Non-captain lanes must stop at PR-ready.

## Imhotep - Broker-Dealer Research Packet

Create a scoped branch from current `origin/main` in a sibling worktree. The baseline broker-dealer research packet is already merged, so conduct incremental broker-dealer market/customer research updates using the existing `.claude/skills/value-stack-discovery` methodology and the approved packet as the anchor. Add dated refresh sections for market signals, capability matrix deltas, customer pains, persona/firm profile implications, ODI outcomes, job maps, recommendations, and build-vs-buy calls. Preserve provenance by separating source facts, assumptions, recommendations, and prototype implications. Use current cited sources and mark assumptions. Do not edit the React app unless Vambah explicitly changes scope. Validate with `git diff --check`, manually inspect changed links/tables, commit, push, open a draft PR, and stop.

## Amina - Profile Architecture Foundation

Create a scoped branch from current `origin/main` after the research PR is merged. Refactor `wealthscape-intelligence` minimally to support multiple strategy/user profiles while preserving current RIA behavior by default. Add a compact profile switcher, a profile registry, and placeholders for broker-dealer profiles. Do not add final broker-dealer content beyond placeholders. Run `npm install` if needed and `npm run build`, commit, push, open a draft PR, and stop.

## Sundiata - Broker-Dealer Strategy Data

Create a scoped branch after the profile architecture PR is merged. Add broker-dealer strategy data for three profiles: home office, OSJ/branch principal, and hybrid advisor/team. Populate profile-specific market signals, capability matrix, pains, ODI outcomes, job map, recommendations, build-vs-buy calls, and persona/firm cards using the approved research packet. Avoid editing shared UI unless a data shape bug requires it. Run `npm run build`, commit, push, open a draft PR, and stop.

## Nzinga - Home Office Prototype Surface

Create a scoped branch after the broker-dealer strategy data PR is merged. Build the home-office broker-dealer view: supervision/risk queue, advisor productivity snapshot, platform adoption signals, and next-best-action routing tied to home-office outcomes. Keep edits isolated to new profile/component files where possible. Preserve RIA mode. Run `npm run build` and a local browser smoke for desktop/mobile, commit, push, open a draft PR, and stop.

## Yaa Asantewaa - OSJ / Branch Principal Surface

Create a scoped branch after the broker-dealer strategy data PR is merged. Build the OSJ/branch principal broker-dealer view: exception review, rep support queue, local compliance workload, advisor book health, and escalation routing. Keep edits isolated to OSJ-specific files/components. Preserve RIA and home-office behavior. Run `npm run build` and a local browser smoke for desktop/mobile, commit, push, open a draft PR, and stop.

## Mansa - Hybrid Advisor / Team Surface

Create a scoped branch after the broker-dealer strategy data PR is merged. Build the hybrid advisor/team broker-dealer view: brokerage/advisory book split, client reporting differences, account opening/product workflow, compensation/product constraints, and client-ready actions. Keep edits isolated to hybrid-specific files/components. Preserve existing RIA behavior. Run `npm run build` and a local browser smoke for desktop/mobile, commit, push, open a draft PR, and stop.

## Nefertiti - QA, Copy, And Deployment Handoff

Create a scoped branch after all profile UI PRs are merged. Review the full prototype for profile-switching clarity, responsive layout, copy consistency, source labels, broken deep links, and tour/scenario regressions. Add small polish fixes and README notes only. Run `npm run build`, test profile switching on desktop and mobile widths, commit, push, open a draft PR, and stop.
