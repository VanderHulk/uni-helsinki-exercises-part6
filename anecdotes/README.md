# Anecdotes Zustand

> 1.10.2026

1. `npm install`

2. `npm install zustand`

> 2.10.2026

3. Implemented voting with Zustand.
    - Stored vote counts directly in each anecdote object.
    - Added `addAVote` action to update the selected anecdote immutably.

4. Added the ability to create new anecdotes.
    - Created new anecdote objects with `asObject()`.
    - Added `createAnecdote` action to the Zustand store.
    - Used `concat()` to add the new anecdote without mutating the existing array.
    - Kept the creation form uncontrolled with React state only tracking the input value.
    - Handled form submission with `onSubmit` and `event.preventDefault()` to prevent the page from reloading.

5. Separated the application into components.
    - Created `AnecdoteForm` for creating new anecdotes.
    - Created `AnecdoteList` for displaying anecdotes.

6. Added sorting by vote count.
    - Used `toSorted()` to create a sorted copy of the anecdotes array.
    - Sorted anecdotes in descending order by `votes`.
    - Kept sorting in `AnecdoteList` so the Zustand state does not need to be mutated or kept in display order.

> 15.10.2026
7. Refactored AnecdoteForm.
    - Read the input value directly from the submitted form.
    - Removed useState and onChange because the input value was only needed on submission.
    - Implemented notification messages in the Zustand store.
    - Added a message state.

8. Created a reusable setMessageTimer action to display a message and clear it after 5 seconds using setTimeout.
    - Used notifications for voting and creating anecdotes.
    - Fixed the new-anecdote voting bug.
    - Used the anecdote returned by the backend, including its generated id, when updating the store.

9. Fixed voting immediately after creating a new anecdote.
    - Used the anecdote returned by the backend, including its generated id, when updating the store.
    - Fixed voting immediately after creating a new anecdote.

> 16.10.2026
10. Implemented deleting anecdotes with zero votes.
    - Added a DELETE request to anecdotesService.
    - Added a deleteAnecdote action to the Zustand store.
    - Updated the store using filter() after successful deletion.
    - Displayed the delete button only for anecdotes with zero votes.
    - Added a notification after deletion.
    - Fixed the test server configuration to use db-test.json.
    - Passed all 14 Playwright tests.

> 21.10.2026
11. Installed vitest and react testing library

12. Created the test file and resolved the JSX parsing error by renaming anecdotes.test.js to anecdotes.test.jsx.

13. Tested store initialization (Exercise 14).
    - Mocked anecdotesService.getAll using mockResolvedValue().
    - Used renderHook() to access the Zustand store actions.
    - Used act() to wait for the initialization updates.
    - Verified that the store contained the anecdotes returned by the mock.
    - The test passed, without making a real HTTP request.

    `act() tells React that you're performing an operation that may cause updates, and it lets those updates be processed before you continue with your test assertions. Wait for the updates to be processed before checking the resulting state.`

> 22.10.2026
14. Started testing AnecdoteList (Exercise 15).
    - Used render() to render the component.
    - Used screen.debug() to inspect the rendered HTML.
    - Learned how screen.getAllByText() selects matching elements in DOM order.
    - Resolved why toHaveTextContent() wasn't available in your test setup.
    - Explored regex matching and discovered that the rendered text structure affects what React Testing Library can match.

> 23.10.2026
15. Tested filtering and voting in AnecdoteList (Exercise 16).
    - Used userEvent to type into the filter and click vote buttons.
    - Used within() to target the vote button for a specific anecdote.
    - Mocked anecdotesService.update() to return the updated anecdote.
    - Added assertions to verify filtering and vote count updates.
    - Learned how to mock asynchronous service responses with mockResolvedValue().
    - Learned how to test UI updates after user interactions.
    - Used getByText() and queryByText() to assert that elements exist or are absent.
    - Learned how to inspect Zustand state with getState() when debugging.