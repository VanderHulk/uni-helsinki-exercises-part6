import { useActions } from '../store'

const AnecdoteForm = () => {
  const { createAnecdote } = useActions()  

  const create = async (event) => {
    event.preventDefault()

    const newAnecdote = event.target.note.value
    await createAnecdote(newAnecdote)
    
    event.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input data-testid="new" name='note' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm