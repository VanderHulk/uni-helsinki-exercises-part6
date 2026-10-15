import { useAnecdotes, useActions } from '../store'

const Filter = () => {
  const anecdotes = useAnecdotes()
  const { setFilter } = useActions()

  const handleChange = (word) => {    
    setFilter(word)    
  }

  return (
    <div>
      Filter <input onChange={(event) => handleChange(event.target.value)} data-testid='filter' />
    </div>
  )
}

export default Filter