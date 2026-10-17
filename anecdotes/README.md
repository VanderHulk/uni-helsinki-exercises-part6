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