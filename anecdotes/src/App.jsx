import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

import { useActions } from './store'

import { useEffect } from 'react'

const App = () => {
  const { initialize } = useActions()

  useEffect(() => {
    initialize()
  }, [initialize])
  
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
