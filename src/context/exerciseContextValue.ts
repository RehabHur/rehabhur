import { createContext } from 'react'
import type { Exercise, ExerciseInput } from '../types/exercise'

export type ExerciseContextType = {
    exercises: Exercise[]
    loading: boolean
    error: string | null
    addExercise: (exercise: ExerciseInput) => Promise<void>
    updateExercise: (exercise: Exercise) => Promise<void>
    removeExercise: (id: number) => Promise<void>
}

export const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)
