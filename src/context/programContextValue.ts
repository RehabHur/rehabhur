import { createContext } from "react"
import type { Program } from "../types/program"

export type ProgramContextType ={
    programs: Program[]
    loading: boolean
    error: string | null
    setPrograms: React.Dispatch<React.SetStateAction<Program[]>>
}

export const ProgramContext = createContext<ProgramContextType | undefined>(undefined)