import { useEffect, useState, type ReactNode } from 'react'
import type { Program, ProgramExercise, ProgramInput } from '../types/program'
import { 
    getPrograms, 
    createProgram, 
    updateProgram as updateProgramService, 
    deleteProgram as deleteProgramService 
} from '../services/programService'
import { ProgramContext } from './programContextValue'
import { getErrorMessage } from '../services/http'

export function ProgramProvider({ children }: { children: ReactNode }) {
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await getPrograms()
                setPrograms(data)
            } catch (error) {
                setError(getErrorMessage(error, 'No se pudieron cargar los programas.'))
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const addProgram = async (program: ProgramInput, exercises: ProgramExercise[]) => {
        const created = await createProgram(program, exercises)
        setPrograms((prev) => [...prev, created])
    }

    const updateProgram = async (program: Program) => {
        const updated = await updateProgramService(program)
        setPrograms((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    }

    const removeProgram = async (id: number) => {
        await deleteProgramService(id)
        setPrograms((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <ProgramContext.Provider value={{ programs, loading, error, setPrograms, addProgram, updateProgram, removeProgram }}>
            {children}
        </ProgramContext.Provider>
    )
}
