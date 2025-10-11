Clean Architecture Suggestion for this project
=========================================

This file describes a small, practical "clean architecture" layout you can adopt for this Next.js project.

Top-level folders (non-destructive):

- `app/` - Next.js app routes (already present).
- `components/` - Reusable UI components (already present). Keep small, focused components here (e.g. `ui/`, `layout/`).
- `src/features/` - Feature folders grouping domain-specific screens/logic (e.g. `auth/`, `patients/`). Each feature can contain `components`, `hooks`, `api`, and tests.
- `src/services/` - External integrations and API clients (e.g. `apiClient.ts`, `authService.ts`).
- `src/contexts/` - React context providers used across the app.
- `src/hooks/` - Shared custom hooks (you already have a `hooks/` at repo root; you can migrate or keep both during migration).
- `src/lib/` - Utility functions and helpers.
- `src/types/` - Shared TypeScript types and domain models.
- `src/constants/` - App-wide constants and enums.
- `src/layouts/` - Higher-level layout components (wrapping pages/features).
- `tests/` - Top-level tests (integration/e2e) if needed.

Notes:
- This structure is intentionally simple and non-invasive so you can adopt it incrementally.
- Use barrel files (`index.ts`) inside folders to re-export internals and keep imports tidy.
- Keep UI-only components inside `components/ui` and domain-specific components inside `src/features/<feature>/components`.

Quick migration tip:
- Create the `src/` folders and gradually move code. Update tsconfig paths or keep existing `@/` alias pointing to project root.

Header component was added to `components/ui/header.tsx` and wired into `app/layout.tsx` as an example.
