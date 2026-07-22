# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable design direction

- The selected direction combines a cinematic continuous-take narrative with a director's research notebook: dark analog film, tactile archival paper, warm ember-red evidence thread, scientific annotations, and restrained interactive UI.
- The central story is “from human decisions to medical evidence systems.” Computational psychiatry, HDDM/HSSM, fMRI, ECG, biostatistics, and epidemiology are foundational chapters rather than side notes.
- Pharmacovigilance is presented as one domain of Safety Science and post-market evidence, not the primary professional identity.
- GCP and GVP should visibly communicate evidence quality across the clinical-to-post-market lifecycle.
- The 2021–2023 chapter is a necessary bridge: clinical research operations, diagnostic-test data work, prostate-cancer case NLP, and biomedical research-material operations led from theory toward medical data analysis.
- Do not present Medical Affairs as a current, prior, or target field on this site. Keep future positioning centered on RWE, pharmacoepidemiology, Safety Science, Clinical Data Science, medical data analytics, and intelligent health systems.
- The site is English-first and should help global recruiters understand the positioning within 30–60 seconds.
- A dedicated Experience chapter uses factual role cards to connect research, clinical operations, medical data, and regulated safety work without turning the site into a CV wall.
- An Off Hours chapter presents tennis (NTRP 3.0 and the two specified racquets), swimming, strength training, Chacha and Rocky, and AI-assisted coding as authentic personal context.
- Every new navigation label, heading, card, annotation, and aria label must support English and Simplified Chinese with stable language-independent item IDs.
- The mobile UNRAVEL hero title must remain fully visible without horizontal overflow at 320–430 px viewport widths.
