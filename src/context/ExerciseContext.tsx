
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import type { Exercise } from '../types/exercise'
import {
    getExercises,
    createExercise,
    updateExercise as updateExerciseService,
    deleteExercise as deleteExerciseService,
} from '../services/exerciseService'

type ExerciseContextType = {
    exercises: Exercise[]
    loading: boolean
    error: string | null
    addExercise: (exercise: Exercise) => Promise<void>
    updateExercise: (exercise: Exercise) => Promise<void>
    removeExercise: (id: number) => Promise<void>
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined)

export function ExerciseProvider({ children }: { children: ReactNode }) {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await getExercises()
                setExercises(data)
            } catch {
                setError('No se pudieron cargar los ejercicios.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const addExercise = async (exercise: Exercise) => {
        const created = await createExercise(exercise)
        setExercises((prev) => [...prev, created])
    }

    const updateExercise = async (exercise: Exercise) => {
        const updated = await updateExerciseService(exercise)
        setExercises((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
        )
    }

    const removeExercise = async (id: number) => {
        await deleteExerciseService(id)
        setExercises((prev) => prev.filter((e) => e.id !== id))
    }

    return (
        <ExerciseContext.Provider
            value={{
                exercises,
                loading,
                error,
                addExercise,
                updateExercise,
                removeExercise,
            }}
        >
            {children}
        </ExerciseContext.Provider>
    )
}

export function useExercises() {
    const context = useContext(ExerciseContext)
    if (!context) {
        throw new Error('useExercises debe usarse dentro de ExerciseProvider')
    }
    return context
}