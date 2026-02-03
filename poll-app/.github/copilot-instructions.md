# Copilot / Agent Instructions — poll-app

This file gives actionable, project-specific guidance to AI coding agents working on this Angular app.

1. Project overview
- This is an Angular 21 single-page app (see [package.json](package.json#L1-L40)).
- UI is lightweight and uses Bootstrap via the build config (see [angular.json](angular.json#L1-L40)).
- The frontend talks to a backend API at `http://localhost:8080/api/polls` (see `src/app/poll.service.ts`).

2. How to run / build / test
- Start dev server: `npm start` (runs `ng serve`).
- Build for production: `npm run build` (uses `angular.json` configurations).
- Run tests: `npm test` (runs `ng test`).

3. Key architectural patterns to preserve
- Standalone components: components may use `standalone: true` (example: `src/app/poll/poll.component.ts`). Prefer following that style when adding simple components.
- Global providers are configured in `src/app/app.config.ts` using `provideHttpClient()` and `provideRouter(routes)`; add providers here for app-wide services.
- Routing is declared in `src/app/app.routes.ts` (currently empty). Add route entries here and ensure `appConfig` includes `provideRouter(routes)`.
- Services: `PollService` is provided in root (`providedIn: 'root'`) and uses `HttpClient`. Keep network logic inside services; components should call services and subscribe to Observables.

4. Common file locations and examples
- Models: `src/app/poll.models.ts` (data shapes used by `PollService` and components).
- Service example: [src/app/poll.service.ts](src/app/poll.service.ts#L1-L120) — base URL and methods: `createPoll`, `getPolls`, `vote`.
- Component example: [src/app/poll/poll.component.ts](src/app/poll/poll.component.ts#L1-L160) — standalone component, uses `PollService` in `ngOnInit`.
- App config & routing: [src/app/app.config.ts](src/app/app.config.ts#L1-L60), [src/app/app.routes.ts](src/app/app.routes.ts#L1-L40).

5. Integration & environment notes
- Local backend expectation: many UI features expect a backend at `localhost:8080`. If the backend is not available, mock `PollService` or stub HTTP responses in tests.
- Static assets are served from `public/` (configured in `angular.json`).

6. Style / formatting
- Prettier settings live in `package.json` (HTML parser: `angular`, `singleQuote: true`, `printWidth: 100`). Honor these when editing templates and styles.

7. When editing code, follow these concrete rules
- Minimize scope: prefer small, focused changes and add tests where behavior changes.
- Keep HTTP endpoints inside services; do not put raw `HttpClient` calls in templates.
- When adding routes, update `app.routes.ts` and ensure `provideRouter(routes)` remains in `app.config.ts`.
- For UI changes, prefer standalone components and keep module-level changes minimal.

8. Helpful hints for common tasks
- Add a new page: create a standalone component in `src/app/<name>/`, add an entry in `app.routes.ts`, and link from existing UI.
- Add an API call: add a method to `PollService`, return typed `Observable<>`, and consume it from a component subscribing with `next`/`error` handlers.
- Debugging: run `npm start` and watch console logs; network calls go to `http://localhost:8080` by default.

9. What *not* to change without approval
- Do not change the base API URL in `PollService` unless coordinating with backend changes.
- Do not remove `provideHttpClient()` or `provideRouter(routes)` from `app.config.ts` without migrating providers appropriately.

If anything here is unclear or you want this adapted (more examples, test patterns, CI notes), tell me which area to expand.
