import { useContext } from 'react'
import { ExerciseContext } from './exerciseContextValue'

export function useExercises() {
    const context = useContext(ExerciseContext)
    if (!context) {
        throw new Error('useExercises debe usarse dentro de ExerciseProvider')
    }
    return context
}
