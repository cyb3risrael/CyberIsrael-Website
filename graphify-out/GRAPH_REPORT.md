# Graph Report - cyberisrael  (2026-07-10)

## Corpus Check
- 48 files · ~765,592 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 315 nodes · 361 edges · 58 communities (20 shown, 38 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.67)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1d4d4ad2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Article Layout & Footer Components
- TypeScript Configuration
- NPM Dependencies
- Article Page & Sidebar
- App Routing & Pages
- Dev Tooling & Linting
- About Stats Section
- Get Accepted Article Hero Imagery
- Instagram Section
- Node TS Config
- Events Section
- i18n Bootstrap & Translations
- Planned Backend Stack
- Client-Side Vulnerabilities Lecture Photo
- Docker Frontend Deployment
- Cyber Career Path Concepts
- Articles Data System
- Providers & Tech Stack
- i18n & RTL Docs
- Routing & Project Structure Docs
- Theming Docs
- SEO Meta & Logo
- DevOps Security Talk Photo
- Community Social Photo
- Beginner Roadmap & Learning Cyber
- Stuxnet Case Study
- graphify Workflow
- Pages Overview
- Vite Root Mount
- Roadmap Hero Image
- Cybersecurity Hero Image
- Academia Tracks
- IDF Tech Roles Intro
- Miyun Season Tips
- Academic Track Diagram
- Atuda Tracks Diagram
- Service Track Diagram
- Post-Service Path Flowchart
- Application Tips Infographic
- Army Entry Diagram
- Intermediate Roadmap
- Roadmap Resources
- Responsibility Meme
- Site Logo
- Lecture Hall Photo
- Event Attendees Photo
- Campus Slide Photo
- ECS Stat Talk Photo
- Engineering Lecture Photo
- Client-Side Attacks Lecture Photo
- Contact & Social Links
- Google Form Embed
- Security Notes
- Why Study Cyber?
- Replacing the Logo

## God Nodes (most connected - your core abstractions)
1. `useTheme()` - 47 edges
2. `compilerOptions` - 18 edges
3. `CyberIsrael — Community Website` - 14 edges
4. `Get Accepted For Technological Positions - Hero Image` - 11 edges
5. `**בואו נלמד איך להיכנס לתחום על אמת בצורה מסודרת לפי רמות:` - 7 edges
6. `compilerOptions` - 6 edges
7. `Article Topic: Getting Accepted For Technological Positions` - 6 edges
8. `scripts` - 5 edges
9. `articles` - 5 edges
10. `ArticlePage()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `EventCard()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/sections/EventsSection.tsx → src/context/ThemeContext.tsx
- `EventsSection()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/sections/EventsSection.tsx → src/context/ThemeContext.tsx
- `InstagramSection()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/sections/subSections/InstagramSection.tsx → src/context/ThemeContext.tsx
- `ArticleCard()` --calls--> `useTheme()`  [EXTRACTED]
  src/pages/ArticlesPage.tsx → src/context/ThemeContext.tsx
- `ArticlesPage()` --calls--> `useTheme()`  [EXTRACTED]
  src/pages/ArticlesPage.tsx → src/context/ThemeContext.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Planned Backend Stack (Not Yet Implemented)** — readme_future_backend_integration, docker_compose_future_backend_service, docker_compose_future_db_service, docker_compose_future_redis_service [EXTRACTED 1.00]

## Communities (58 total, 38 thin omitted)

### Community 0 - "Article Layout & Footer Components"
Cohesion: 0.07
Nodes (33): ArticleLayout(), RelatedArticles(), ShareBar(), Footer(), socialLinks, RootLayout(), Particle, ParticleBackground() (+25 more)

### Community 1 - "TypeScript Configuration"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+13 more)

### Community 2 - "NPM Dependencies"
Cohesion: 0.10
Nodes (20): dependencies, framer-motion, i18next, react, react-dom, react-i18next, react-icons, react-markdown (+12 more)

### Community 3 - "Article Page & Sidebar"
Cohesion: 0.16
Nodes (13): ArticleLayoutProps, Props, ArticlePage(), ArticleType, getLangCode(), IMPORTANT: wait until i18n is truly ready, remarkGithubAlerts(), ArticleCard() (+5 more)

### Community 4 - "App Routing & Pages"
Cohesion: 0.13
Nodes (13): ArticlePage, ArticlesPage, CollaboratePage, HomePage, ImpactPage, NotFoundPage, Navbar(), Lang (+5 more)

### Community 5 - "Dev Tooling & Linting"
Cohesion: 0.13
Nodes (15): devDependencies, autoprefixer, eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, postcss, tailwindcss, @tailwindcss/typography (+7 more)

### Community 6 - "About Stats Section"
Cohesion: 0.14
Nodes (12): AboutStatsProps, StatCard(), StatCardProps, useCountUp(), galleryImages, GallerySection, ImageSkeleton, ImpactPage() (+4 more)

### Community 7 - "Get Accepted Article Hero Imagery"
Cohesion: 0.27
Nodes (12): Article Topic: Getting Accepted For Technological Positions, Confused Cat Mascot, Get Accepted For Technological Positions - Hero Image, "How To Join?" Book, Info Overload Concept, Mamram (IDF Computer Service Directorate), Unit 81700 Reference, Unit 9900 (IDF Geospatial Intelligence Unit) (+4 more)

### Community 8 - "Instagram Section"
Cohesion: 0.20
Nodes (6): InstagramPost, InstagramSection(), Props, EmbedSkeleton, Props, Window

### Community 9 - "Node TS Config"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 10 - "Events Section"
Cohesion: 0.40
Nodes (5): EventCard(), EventCardProps, EventItem, EventsSection(), eventTypes

### Community 12 - "Planned Backend Stack"
Cohesion: 0.09
Nodes (21): Adding a new language, Adding a new theme, 📰 Articles, 📞 Contact, CyberIsrael — Community Website, 🐳 Docker Deployment, 📦 Environment Variables, 🔮 Future Backend Integration (+13 more)

### Community 13 - "Client-Side Vulnerabilities Lecture Photo"
Cohesion: 0.50
Nodes (4): Bar-Ilan University Faculty of Engineering (Alexander Kofkin), "History of Client-Side Vulnerabilities" Lecture Topic, Photo: Speaker Presenting Client-Side Vulnerabilities History at CyberIsrael Lecture, Omer Ben Shalom (Photographer)

### Community 16 - "Articles Data System"
Cohesion: 0.12
Nodes (15): RoadMap כללי לעולם הפיתוח, איך אני יכול לדעת שסיימתי?, איך אני יכול לדעת שסיימתי?, **בואו נלמד איך להיכנס לתחום על אמת בצורה מסודרת לפי רמות:, **ברוכים הבאים ל-RoadMap לעולם הפיתוח**, **המפתח הממוצע:**, **המפתח המתחיל:**, **המפתח המתקדם:** (+7 more)

### Community 17 - "Providers & Tech Stack"
Cohesion: 0.14
Nodes (13): ~ או כמו שחלק ממכם יגידו ב-High Level עולם הסייבר מתחלק כך:, איך ללמוד? איך להיכנס לתחום? מה לעשות? מתי? ומאיפה?, בוא נספר סיפור איי שם ב- 17 ביוני 2010, **בקיצור התחום דיי משמעותי אפשר לומר אבל איך אפשר לדעת האם הוא מתאים לי?**, בראיית על, דוגמאות לתפקידים / עיסוקים (שנרחיב עליהם במאמרי המשך…), התקפה, והגנה (+5 more)

### Community 18 - "i18n & RTL Docs"
Cohesion: 0.29
Nodes (6): איך להתקבל לתפקידים טכנולוגיים בצה”ל?, איך מגיעים לצה”ל?, אקדמיה, דגשים חשובים, הקדמה, מיונים

### Community 26 - "graphify Workflow"
Cohesion: 0.40
Nodes (3): Architecture, Commands, graphify

## Ambiguous Edges - Review These
- `Salary/Currency Tags (Dollar, Euro)` → `Article Topic: Getting Accepted For Technological Positions`  [AMBIGUOUS]
  public/articles/ArticleImage/GetAcceptedForTechnologicalPositions.webp · relation: suggests_salary_expectations_theme

## Knowledge Gaps
- **174 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+169 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Salary/Currency Tags (Dollar, Euro)` and `Article Topic: Getting Accepted For Technological Positions`?**
  _Edge tagged AMBIGUOUS (relation: suggests_salary_expectations_theme) - confidence is low._
- **Why does `useTheme()` connect `Article Layout & Footer Components` to `Article Page & Sidebar`, `App Routing & Pages`, `About Stats Section`, `Instagram Section`, `Events Section`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Tooling & Linting` to `NPM Dependencies`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _181 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Article Layout & Footer Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07039187227866474 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._