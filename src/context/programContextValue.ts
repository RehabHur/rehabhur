import { createContext } from 'react'
import type { Program, ProgramExercise, ProgramInput } from '../types/program'

export type ProgramContextType = {
    programs: Program[]
    loading: boolean
    error: string | null
    setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
    addProgram: (program: ProgramInput, exercises: ProgramExercise[]) => Promise<void>
    updateProgram: (program: Program) => Promise<void>
    removeProgram: (id: number) => Promise<void>
}

export const ProgramContext = createContext<ProgramContextType | undefined>(undefined)
