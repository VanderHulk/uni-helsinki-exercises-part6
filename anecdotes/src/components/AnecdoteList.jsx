import { useAnecdotes } from "../store"
import { useActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { addAVote, deleteAnecdote } = useActions() 

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  return (
    sortedAnecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => addAVote(anecdote.id)}>vote</button>
          { anecdote.votes === 0 && <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button> }
        </div>
      </div>
    ))
  )
}

export default AnecdoteList