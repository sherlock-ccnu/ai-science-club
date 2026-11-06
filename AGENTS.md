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

- The third lesson is a 45-minute self-study workshop on prompt comparisons, HTML/CSS/JavaScript events and state, and AI debugging. Preserve its built-in 3D demo with local dependencies. Publish at public/lessons/prompt-to-interactive-web.html and link from homepage resources.

- Weather API examples use Open-Meteo in two standalone apps: weather-outfit.html and weather-farm.html. The outdoor school farm grows Chinese cabbage, beans, eggplant and lettuce. Distinguish forecast/model data, classroom simulations and field observations. Keep school coordinates configurable; Wuhan is only an example location.

- The weather API self-study workflow is Lesson 4, at public/lessons/weather-api-lab.html. Keep Lesson 3 unchanged. Link Lesson 4 and its two weather applications from homepage resources. Include the user-provided club communication tool https://club.aimuyiworkspace.xyz/ as a homepage resource.
