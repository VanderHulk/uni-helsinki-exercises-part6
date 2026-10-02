# Unicafe Zustand

> 25.9.2026

1. `npm install`

2. `npm install zustand`

3. Implemented Unicafe state management with Zustand.

4. Kept `good`, `neutral`, and `bad` as the actual store state.

5. Added Zustand actions for updating each feedback value.

6. Derived `all`, `average`, and `positive` from the feedback values instead of storing them as separate state.

7. Used `useShallow` when selecting multiple values from the store to avoid unnecessary re-renders caused by new object references.

8. Added and enabled the GitHub Actions workflow for Unicafe tests.

9. Ran the Playwright tests locally and on GitHub.

10. GitHub Actions tests passed successfully. ✅

**Exercises completed:** 1–2