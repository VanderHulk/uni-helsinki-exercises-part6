import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useMessage, useActions } from './store'

import { useEffect } from 'react'

const App = () => {
  const { initialize } = useActions()
  const message = useMessage()
  console.log(message)

  useEffect(() => {
    initialize()
  }, [initialize])
  
  return (
    <div>
      <Filter />
      { message && <Notification message={message} /> }
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
