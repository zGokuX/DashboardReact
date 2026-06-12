# CLAUDE.md

Guidance for working in this repository.

## What this is

A single-page admin **dashboard** demo built with React 19 + Vite. There is **no backend** — all data comes from the public [dummyjson.com](https://dummyjson.com) API (users, carts, products). The app is deployed to **GitHub Pages** as a static build.

The repo root contains the app under `dashboard-react/`. Everything below assumes you are working inside that directory.

## Commands

Run from `dashboard-react/`:

```bash
npm install        # install deps
npm run dev        # Vite dev server (HMR)
npm run build      # production build -> ../docs (used for GitHub Pages)
npm run preview    # preview the production build
npm run lint       # ESLint (flat config)
npm test           # Vitest run (jsdom + Testing Library)
```

To run a single test: `npx vitest run src/test/ProductCart.test.jsx`.

## Architecture

- **UI**: React 19, React Router v7 via `HashRouter` (hash routing is required for GitHub Pages). Styling is Bootstrap 5 + `react-bootstrap` + FontAwesome (CDN in `index.html`) + custom CSS (`App.css`, `theme.css`, per-component CSS). Charts use `@highcharts/react`.
- **State**: Redux Toolkit store in `src/store/store.js`. Slices live in `src/store/slices/`. `serializableCheck` is disabled (for redux-saga compatibility).
- **Side effects**: `redux-saga`. Each domain has a watcher saga in `src/store/sagas/`, composed in `rootSaga.jsx`. The pattern is `xxxRequest` (action) → saga `call`s an API fn → `xxxSuccess`/`xxxFailure`. Sagas use `takeLatest` to avoid race conditions.
- **API layer**: all `fetch` calls to dummyjson are centralized in `src/services/requests.ts`. Add new endpoints here, not inline in components.
- **Routing**: `App.jsx` defines top-level routes; `src/layouts/layout.jsx` holds the sidebar nav + a nested `<Routes>` for the main pages. Pages live in `src/views/`, composed from `src/components/`.

### Directory map (`src/`)

- `components/` — feature-grouped UI (Cart, CartCheckout, Product, User, Login, ProfileUser, Feedback, Common, examples). `examples/` is throwaway demo code (counter/name), not production.
- `views/` — page-level components wired into routes.
- `layouts/` — `header`, `layout` (sidebar + routes), and chart wrappers (`Graphic`, `BigGraphic`).
- `store/` — `slices/`, `sagas/`, `store.js`.
- `services/requests.ts` — the only place that talks to the API.
- `test/` — Vitest specs + `setup.ts`.
- `Constants.js` — shared constants (e.g. `ITEM_PER_PAGE`).

## Conventions & gotchas

- **Mixed JS/TS by design.** Files are a mix of `.jsx`/`.js` and `.tsx`/`.ts`. TypeScript is **loose**: `allowJs: true`, `checkJs: false`, `strict: false`, `noEmit: true` — TS is for editor hints only and is never type-checked in the build. Don't expect type safety; `any` is used freely. Match the style of the file you're editing rather than converting it.
- **Path alias**: `@/` → `src/` (configured in `vite.config.js`, `vitest.config.ts`, `tsconfig.json`, `jsconfig.json`). Both `@/...` and relative imports appear in the codebase.
- **Build output goes to `../docs`** (repo-root `docs/`), and `base` is `/DashboardReact/` for production (`/` in dev) — this is what GitHub Pages serves. Don't change these without understanding the deploy.
- **Comments and some UI strings are in Italian** (the original author's language). Keep new comments consistent with the surrounding file; UI copy is largely Italian.
- **Routes have intentional-looking spellings**: `/cards` (Carts page) and `/feeback` (Feedback). Match the existing route string when linking.
- Remote: `github.com/zGokuX/DashboardReact`. Main branch is `main`.

## When adding a feature

A typical data-backed feature touches four layers, in order:
1. `services/requests.ts` — add the API call.
2. `store/slices/<domain>Slice` — add `request`/`success`/`failure` actions + state.
3. `store/sagas/<domain>Saga` — add a handler + watcher, and register the watcher in `rootSaga.jsx`.
4. `views/` + `components/` — dispatch the `request` action and select from the slice.
