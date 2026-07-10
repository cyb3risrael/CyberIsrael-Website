# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Commands

```bash
npm run dev       # Vite dev server on http://localhost:3000
npm run build     # tsc typecheck + vite production build -> dist/
npm run preview   # Serve the production build locally
npm run lint      # ESLint over src, .ts/.tsx, zero warnings allowed
```

There is no test suite/runner configured in this repo. `npm run lint` uses `eslint.config.js`-style flat config resolution but **no eslint config file currently exists at the project root** — running `npm run lint` will fail until one is added.

`scripts/extract-articles.ts` (run with `tsx` or similar) dumps `src/services/articlesData.ts` to `dist-temp/articles.json`, used for sitemap generation during the build/deploy pipeline.

Docker: `docker compose up --build -d` builds via the multi-stage `Dockerfile` (Node build stage -> nginx serve stage) and serves on port 80 using `nginx/nginx.conf`. The compose file has commented-out placeholders for a future Node backend + Postgres + Redis — not currently active.

## Architecture

React 18 + TypeScript SPA built with Vite, using the `@/*` -> `src/*` path alias (configured in both `tsconfig.json` and `vite.config.ts`).

**Routing & shell** (`src/App.tsx`): `BrowserRouter` wraps every route in `RootLayout` (`src/components/layout/RootLayout.tsx`), which renders the persistent `ParticleBackground`, `Navbar`, and `Footer` around a `<Outlet>` with `AnimatePresence`-based page transitions. All page components except `App.tsx` itself are lazy-loaded (`React.lazy`) for code splitting. Vite's `manualChunks` further splits `vendor` (react/react-dom/router), `animations` (framer-motion), and `i18n` (i18next/react-i18next) into separate bundles.

**Global providers**: `ThemeProvider` (`src/context/ThemeContext.tsx`) and `LangProvider` (`src/context/LangContext.tsx`) wrap the router in `App.tsx`, in that order. Both persist to `localStorage` (`cyberisrael-theme`, `cyberisrael-lang`) and mutate `document.documentElement` directly (theme toggles a `dark`/`light` class for Tailwind's `darkMode: 'class'`; lang sets `dir`/`lang` attributes for RTL). Any component reading theme/lang must use `useTheme()`/`useLang()` — there's no prop-drilling path.

**i18n**: `src/i18n.ts` initializes i18next with static resource objects from `src/translations/{en,he}/index.ts`. Hebrew renders RTL end-to-end. `LangContext.isRTL` is derived from the lang, not a separate flag.

**Pages** (`src/pages/`): `HomePage` is a stack of section components (`Hero`, `About`, `Values`, `Culture`, `Events`, `Social`, `Join` — under `src/components/sections/`, with some further split into `sections/subSections/`). Other routes (`ArticlesPage`, `ArticlePage`, `ImpactPage`, `CollaboratePage`, `ComingSoonPage`, `NotFoundPage`) are standalone.

**Articles system** — this is the most involved subsystem and spans several files:
- `src/services/articlesData.ts` is the article index/metadata store (a static in-memory array of `Article` objects — title, slug/`href`, category, tags, image, etc). `getArticleBySlug()` is the lookup used by pages.
- Actual article bodies are **not** in this file. `ArticlePage.tsx` (`src/pages/ArticlePage.tsx`) fetches raw Markdown at runtime from `public/articles/<slug>/<slug>.md` and renders it with `react-markdown` + `remark-gfm`, plus a custom `remarkGithubAlerts` plugin that turns `> [!TIP]`/`[!WARNING]`/etc. blockquotes into styled callouts. Images/relative links in the markdown resolve against `/articles/<slug>/`.
- It also switches the active i18n language to match the article's own `language` field (via `getLangCode()`) before rendering, independent of the site-wide language toggle.
- `src/components/ui/notion/` contains two alternate (currently unused by `ArticlePage`, but present for future/manual use) ways to embed content authored in Notion: `NotionIframeEmbed` (live `<iframe>` to a published Notion page) and `NotionHtmlEmbed` (fetches a Notion HTML export from `public/articles/<slug>/index.html` and mounts it in a Shadow DOM with a hand-written theme bridge so Notion's styles don't leak into the site).
- `scripts/extract-articles.ts` re-serializes `articlesData.ts` to JSON for sitemap generation — keep the two in sync if you change the `Article` shape.

**Theming**: dark/light values are defined as Tailwind color tokens (`cyber-*` for dark, `light-*` for light) in `tailwind.config.js`, not CSS variables — components branch on `theme === 'dark'` and pick Tailwind classes accordingly rather than relying on CSS custom-property cascading. `index.css` holds global styles and Tailwind layers.
