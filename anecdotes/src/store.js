
import { create } from 'zustand'

import anecdotesService from './services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  message: '',
  filter: null,
  actions: {
    addAVote: async (id) => {
      console.log(id)
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdotesService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updated : anecdote)
      }))
      get().actions.setMessageTimer(`you voted '${anecdote.content}'`)   
    },

    createAnecdote: async (anecdote) => {
      const anecdoteObject = {
        content: anecdote,
        votes: 0
      }
      const newAnecdote = await anecdotesService.create(anecdoteObject)

      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
      get().actions.setMessageTimer(`A new anecdote '${newAnecdote.content}' is created.`)
    },

    deleteAnecdote: async (id) => {      
      const anecdote = get().anecdotes.find(a => a.id === id)
      await anecdotesService.remove(id)

      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
      get().actions.setMessageTimer(`Anecdote '${anecdote.content}' is removed.`)
    },

    setFilter: word => set(() => ({ filter: word })),    
    setMessageTimer: message => {
      set(() => ({ message: message }))   

      setTimeout(() => {
        set(() => ({ message: ''}))     
      }, 5000)
    },

    initialize: async () => {
      const anecdotes = await anecdotesService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)

  if (filter) {
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
    return filteredAnecdotes
  }
  return anecdotes
}

export const useMessage = () => useAnecdoteStore(state => state.message)
export const useFilter = () => useAnecdoteStore(state => state.filter)
export const useActions = () => useAnecdoteStore(state => state.actions)
