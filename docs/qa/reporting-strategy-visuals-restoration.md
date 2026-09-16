# Reporting Strategy visual restoration — 16 September 2026

## Historical comparison

- `c3632a3`: interactive outcomes ranked by legacy synthesis scores, with proposal/demo detail and vendor reference cards.
- `d5ca161`: importance/satisfaction opportunity map, reset, scale control, evidence grid and reporting journey.
- `5050cd8`: navigation and drilldown polish.
- `b31a229`: executive summary, explanation drawers and section findings retained; evidence updates use five ordinal outcome hypotheses and explicitly remove numeric opportunity scores. The older scatterplot component remains in source but is no longer mounted.

The restored map uses the current five qualitative hypotheses. No old scores are assigned to the new outcomes. All five share an explicitly proposed higher-importance/lower-satisfaction quadrant; label spacing is not a measurement. The ranked view preserves the existing management ordering. Selection, dropdown and reset share state. Outcome detail includes proposed UX response, synthetic coverage limitations and Reporting outputs links.

The new capability explorer reuses the existing nine-vendor/four-capability evidence matrix with described/unknown icons and selectable vendor cards. The evidence grid and original reference cards remain available. Fidelity's incumbent baseline, source links and no-product-audit caveats remain intact. Account Maintenance's selection/detail/icon treatment informed the interaction, but no maintenance scores or data were reused.

## Validation

- `npm --prefix wealthscape-intelligence ci`
- `npm --prefix wealthscape-intelligence run build` — pass.
- `node --test wealthscape-intelligence/src/*.test.js` — 39 pass, 0 fail.
- `git diff --check` — pass.
- In-app Browser route: `http://127.0.0.1:5179/#view=strategy&profileId=bd-home-office&strategyTrack=reporting`.
- Visual review at 1440×1000, 768×1024 and 390×844. Tablet and mobile document widths matched viewport widths.
- Clicked all five map outcomes; inspected distinct detail, proposed responses and limitations.
- Tested ranked selection, dropdown selection, Opportunity map / Ranked outcomes, and All outcomes reset.
- Clicked reporting assembly, customization and pipeline destinations; URL retained `profileId=bd-home-office` and used `reportTab=build`, `customize`, `generate` respectively.
- Clicked recommendation drilldown; jump navigation selected section 7.
- Tested all four capability filters and Fidelity evidence, including described report design and unassessed delivery/batch/access evidence.
- Tested existing evidence-grid cell and reference-card selection, plus described Advyzon batch evidence.
- Desktop map/vendor and mobile/tablet screenshots saved in `/Users/vambahsillah/Documents/Fidelity/reporting-visuals-qa-20260916/`.

## Review boundary

Synthetic local UI checks only. No live workflow, customer data, provider calls, research refresh, production deployment or merge performed. Hosted preview and human acceptance remain captain gates. The qualitative map intentionally does not restore the old numeric scatterplot. No migrations or environment changes. Portfolio Vercel contexts are not applicable to this Wealthscape repo.
