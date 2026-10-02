import { useActions } from '../store'
import { useState } from "react"

const AnecdoteForm = () => {
  const { createAnecdote } = useActions()
  const [newAnecdote, setNewAnecdote] = useState(null)

  const create = event => {
    event.preventDefault()
    createAnecdote(newAnecdote)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input data-testid="new" onChange={event => setNewAnecdote(event.target.value)} />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm