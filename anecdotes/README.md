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