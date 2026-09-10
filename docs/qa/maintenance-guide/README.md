# Maintenance guide QA

Review route: `http://127.0.0.1:5195/#view=strategy&profileId=bd-hybrid-advisor`.

## Reproduce the scenario

1. Scroll to the Account maintenance footer and click **Run Scenario**. The selected profile stays unchanged; the guide dashboard contains one isolated Baobab request.
2. Use Next through the blocked queue and account scope. Verify highlights `dashboard`, `queue`, `case`, then `evidence`.
3. Attempt **Status timeline** before recording evidence. The route stays at the evidence step and the guide explains the prerequisite. Next is disabled.
4. Check two attestations: Next remains disabled. Check the third: Next opens human review. Next remains disabled until **Confirm demo review & complete** is clicked.
5. Continue to the timeline and verify the three actual check events and human review event. Highlights are `review` and `timeline`.
6. Continue to reporting. Next remains disabled until **Generate account report** creates the guide output. The final highlighted output contains both GUIDE accounts and recorded review history.
7. Previous retains the output. Restart returns to one blocked case with all checks false and no report. Exit/Return to research returns to Account maintenance Strategy.

## Reproduce the tour and cleanup

- Take Tour visits all seven surfaces with highlights `dashboard`, `queue`, `case`, `evidence`, `review`, `timeline`, `prerequisites`. Case checks and owner controls are read-only; report generation remains held.
- Expand **Production boundary & source** for the source snapshot and production proposal. Research insight, primary outcome label, target IDs, and UX rationale appear in the normal guide body. On narrow screens, scroll the explanation area independently from the workspace.
- Changing the global profile exits the guide and opens Strategy in the chosen scope. All four profiles were exercised: Hybrid scenario, Home Office full tour, Principal evidence/read-only checks, and RIA launch/cleanup.
- Navigating to Strategy ends the guide, removes highlights, and preserves nine sections and three diagrams.
- A normal Cedar-session signature check was recorded before launching/restarting/exiting a guide. The normal session still had `[true, true, false]` afterward, with the original three RIA requests restored.

## Checks run

- `node --test wealthscape-intelligence/src/maintenanceGuide.test.js`: 4 passing tests covering independent restart fixtures, checklist/review/report gates, read-only tour definitions, and operational shortcut guards including backward navigation.
- `npm --prefix wealthscape-intelligence run build`: passed.
- `git diff --check`: passed.
- Actual integrated Browser: full eight-step scenario at 1280; all seven tour highlights at 768 and 390; guide target visibility, independent scrolling, preserved global profile, repeatable restart, exit, and navigation-away cleanup.
- Compact-panel regression: expanded/scrolled explanation at 768 had scrollTop 149.5. Previous then Next reset it to 0 with the new title visible and the operational target retained. Restart on the first step also resets explanation scroll to 0.
- Reporting regression: original 20-step tour launch, Next/Back/close, and original Chen drift scenario launch/Skip. The entire reporting delivery flow was not rerun; no reporting logic was refactored.
- Desktop, tablet, and mobile screenshots were displayed in the implementation and captain tasks. The browser screenshot writer could not write to this worktree (`EPERM`); no screenshot was saved elsewhere. No MP4 was created; use the visible screenshots and reproduction steps above for review.
- Captain independently completed the eight-step Home Office scenario, verified all seven tour highlights, checked all four profiles, exercised the blocked timeline shortcut, and confirmed that a normal MC-102 evidence edit survived scenario launch and exit. Explanation scrolling reset to zero on Previous/Next; the new outcome label and research insight were visually checked at 1280/768/390.
- No real customer data, provider calls, external delivery, merge, or deployment tested. Human QA and captain publication remain.
- An initial case-insensitive module-resolution error was fixed with explicit `.jsx`/`.js` imports. The old Vite HMR errors remain in browser log history; final build and subsequent guide interactions passed.
