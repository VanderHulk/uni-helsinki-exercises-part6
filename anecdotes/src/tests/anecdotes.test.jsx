import { 
  describe, 
  it, 
  expect, 
  beforeEach, 
  vi, 
  afterEach 
} from 'vitest'

import { 
  render, 
  renderHook, 
  act, 
  screen,
  within,
  cleanup,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import AnecdoteList from '../components/AnecdoteList'
import Filter from '../components/Filter'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }   
}))

import anecdotesService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useActions } from '../store'

beforeEach( async () => {
  useAnecdoteStore.setState({ anecdote: [] })
  useAnecdoteStore.setState({ filter: null })
  vi.clearAllMocks()  
})

afterEach(() => {
  cleanup()
})

describe('anecdoteActions', () => {
  it('initialize anecdotes returned by the backend', async () => {
    const mockAnecdote = [{ id: '1', content: 'This is just a test', votes: 5 }]
    anecdotesService.getAll.mockResolvedValue(mockAnecdote)

    const { result } = renderHook(() => useActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdote)
  })

  it('testing AnecdoteList component and order of votes', async() => {
    const mockAnecdotes = [
      {id: '2', content: 'Anecdote with 3 votes', votes: 3},
      {id: '1', content: 'Anecdote with 5 votes', votes: 5},      
      {id: '3', content: 'Anecdote with no votes', votes: 0},
    ]

    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useActions())

    await act(async () => {
      await result.current.initialize()
    })

    render(<AnecdoteList />)

    const anecdotes = screen.getAllByText(/has \d+/)
    expect(anecdotes[0].textContent).toContain('has 5')
    expect(anecdotes[1].textContent).toContain('has 3')
    expect(anecdotes[2].textContent).toContain('has 0')
  })

  it('anecdotes have been properly filtered', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'If it hurts, do it more often.', votes: 2 },
      { id: '2', content: 'Premature optimization is the root of all evil.', votes: 5 },
      { id: '3', content: 'Any fool can write code that a computer can understand.', votes: 1 },
    ]

    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useActions())

    await act(async () => {
      await result.current.initialize()
    })

    render(<Filter />)
    render(<AnecdoteList />)

    const user = userEvent.setup()
    const input = screen.getByRole('textbox')
    await user.type(input, 'fool')

    expect(screen.getByText('Any fool can write code that a computer can understand.'))
    expect(screen.queryByText('If it hurts, do it more often.')).toBeNull()
    expect(screen.queryByText('Premature optimization is the root of all evil.')).toBeNull()
  })

  it('voting works', async () => {
    const mockAnecdotes = [
      { id: '1', content: 'If it hurts, do it more often.', votes: 2 },
      { id: '2', content: 'Premature optimization is the root of all evil.', votes: 5 },
      { id: '3', content: 'Any fool can write code that a computer can understand.', votes: 1 },
    ]

    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useActions())

    await act(async () => {
      await result.current.initialize()
    })

    render(<AnecdoteList />)

    const anecdote = screen.getByText('If it hurts, do it more often.')    
    const container = anecdote.parentElement
    const voteBtn = within(container).getByRole('button', { name: 'vote' })

    expect(within(container).getByText('has 2'))   

    anecdotesService.update.mockResolvedValue({ ...mockAnecdotes[0], votes: mockAnecdotes[0].votes + 1 })

    const user = userEvent.setup()
    await user.click(voteBtn)
    
    expect(within(container).getByText('has 3'))
  })
})