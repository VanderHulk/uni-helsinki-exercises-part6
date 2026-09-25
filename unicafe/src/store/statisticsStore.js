import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useStatisticsStore = create (set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  addGood: () => set(state => ({
    good: state.good + 1  
  })),
  addNeutral: () => set(state => ({
    neutral: state.neutral + 1  
  })),
  addBad: () => set(state => ({
    bad: state.bad + 1
  }))  
}))

export const usePoints = () => 
  useStatisticsStore(
    useShallow((state) => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad      
    }))  
  )

export const useAdd = () =>
  useStatisticsStore(
    useShallow((state) => ({
      good: state.addGood,
      neutral: state.addNeutral,
      bad: state.addBad
    }))  
  )