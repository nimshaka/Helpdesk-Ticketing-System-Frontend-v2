# Helpdesk Frontend

The web interface of the Helpdesk Ticketing System. It talks to a Laravel API (Sanctum
token authentication) and has three role based areas: **customer**, **agent** and **admin**.

## Features by role

| Role | What they can do |
|---|---|
| Customer | Register, create tickets, see and search their own tickets, reply until a ticket is resolved, see their dashboard |
| Agent | See the unassigned queue and the tickets they hold, claim tickets, reply and change status on tickets they hold |
| Admin | See every ticket, assign or reassign tickets, see the assignment history, manage users (create, edit, change role, activate, deactivate) |

The ticket status flow is: `Open` -> `In Progress` (claim or assign) -> `Waiting for Customer` or
`Resolved`. A customer reply moves `Waiting for Customer` back to `In Progress`. `Resolved` is closed.

## Tech stack

- Next.js (App Router) and React, TypeScript
- Tailwind CSS and ShadCN UI
- TanStack Query (mutations, client side queries), TanStack Form, TanStack Table
- Zod (validation), Sonner (toasts)
- Playwright (end to end tests)

## Getting started

Prerequisites: Node.js 20.9 or newer, npm, and the Laravel API running (see the backend README).

```bash
npm install
cp .env.example .env.local   # then set API_BASE_URL
npm run dev                  # http://localhost:3000
```

Sign in with an account created by the backend seeders (for example `admin@helpdesk.test`).

### Environment variables

| Name | Description |
|---|---|
| `API_BASE_URL` | Base URL of the Laravel API, including `/api` (for example `http://localhost:8000/api`). Used on the server only, so it has no `NEXT_PUBLIC_` prefix. |

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check without emitting files |
| `npm run format` | Prettier |
| `npm run test:e2e` | Playwright tests (needs the app and the API running) |

## How it works

### Request flow

```
Component -> hook (TanStack Query / Form) -> server action (features/*/api.ts)
          -> lib/api client -> Laravel API
```

- Pages are server components. They read the URL (`searchParams`, `params`), fetch data on the server and
  render. Only the interactive parts (forms, dialogs, buttons) are client components.
- Search, filters and pagination live in the URL, so every view can be refreshed and shared. Filtering and
  paging are done by the API.
- Changes (create, claim, assign, reply, status, users) are server actions called through `useMutation`.
  After a change the page data is refreshed with `router.refresh()`.

### Authentication

- Laravel Sanctum issues a token on login. A server action stores it in an `httpOnly` cookie, so browser
  JavaScript can never read it. The browser never calls the API directly (no CORS setup is needed).
- `proxy.ts` is a quick check: no cookie, no access to protected pages.
- `getCurrentUser`, `requireUser` and `requireRole` (`features/auth/utils.ts`) ask the API who the user is
  (`GET /auth/me`) and are called by every protected page.
- The API has the final word: it answers 401, 403, 404, 409 or 422, and the interface shows them.
- If the token is no longer valid, `/api/session/expired` clears the cookie and sends the user to the login page.

### Error handling

| Code | Meaning | What the user sees |
|---|---|---|
| 401 | Not signed in or token expired | Redirect to the login page (wrong password: message in the form) |
| 403 | Not allowed | Message from the API, or "not found" for tickets |
| 404 | Not found | "Not found" page inside the app shell |
| 409 | Conflict (ticket already claimed) | "Another agent already took this ticket", list refreshes |
| 422 | Validation error | Message under the matching field |

## Project structure

```
app/                  Routes: (auth), customer, agent, admin, api (route handlers), providers, error pages
features/             auth, dashboard, tickets, users
                      each with components/, hooks/, api.ts, schemas.ts, types.ts, constants.ts, utils.ts
components/           ui (ShadCN), shared (reusable pieces), layout (app shell)
lib/api/              HTTP client, authenticated request, error classes, action results
config/ constants/ hooks/ stores/ styles/ types/ utils/   shared code
tests/e2e/            Playwright tests
proxy.ts              Route gate (called middleware.ts before Next.js 16)
```

Rules of the codebase:

1. `app` -> `features` -> `components`, `lib`, `utils`. Features never import each other. Shared code never imports a feature.
2. Components show things. Logic lives in hooks, actions and utils.
3. No magic strings: fixed values live in `constants`.
4. Server actions can be called like public endpoints, so each one uses `authedRequest` and the API checks permissions.

## Testing

```bash
npm run build && npm start      # in one terminal (a production build avoids dev only overlays)
npm run test:e2e                # in another terminal
```

Set `E2E_ADMIN_EMAIL`, `E2E_AGENT_EMAIL`, `E2E_CUSTOMER_EMAIL` and `E2E_PASSWORD` if your seeded accounts differ
from the defaults in `tests/e2e/support/users.ts`.

## Troubleshooting

- **`NETWORK_ERROR` or "Cannot reach the server"**: the Laravel API is not running, or `API_BASE_URL` is wrong.
  Restart `npm run dev` after changing `.env.local`.
- **Development only overlay "Failed to execute 'measure' on 'Performance'"**: a known React bug with `redirect()`
  and `notFound()` in development. It does not happen in a production build.
- **Turbopack path errors**: delete `.next`, keep the project in a simple path (no spaces or special characters),
  or try `npx next dev --webpack`.
- **TanStack Table errors about `useReactTable`**: this project uses TanStack Table v8 (`@tanstack/react-table@8`).

## Commits

Conventional Commits, for example `feat(tickets): add claim action with 409 handling`.