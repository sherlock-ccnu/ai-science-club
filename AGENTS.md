# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## AI Science Club lesson preferences

- Never display the club QQ group number in student-facing UI; retain only guidance to join the club QQ group.
- The LLM-to-Agent HTML lesson uses the site's ivory, forest-green and warm-wood style with large classroom text and interactive visual explanations.
- The data/compute/algorithm metaphor is three horses pulling one shared carriage. Model comparisons use disclosed figures, chronological order, and explicit units; never invent missing data.
- Publish the standalone lesson at `public/lessons/llm-to-agent.html`, linked from the learning resources section. Keep simulated teaching data visibly distinguished from measured results.
- The second lesson is a self-study workshop: every student builds and tests their own working Windows screenshot tool during class (select a region, capture it, save a PNG). A plan alone is not the deliverable. Retain the website's ivory and forest-green visual style, and publish it at `public/lessons/think-build-screenshot.html` with a homepage learning-resources entry.
