import { useEffect, useState, type ReactNode } from "react";
import { ProgramContext } from "./programContextValue";
import { getPrograms } from "../services/programService";
import type { Program } from "../types/program";

export function ProgramProvider({ children }: { children: ReactNode }) {
    const [programs, setPrograms] = useState<Program[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await getPrograms()
                setPrograms(data)
            } catch {
                setError('No se pudieron cargar los programas.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    return (
        <ProgramContext.Provider value={{ programs, loading, error, setPrograms }}>
            {children}
        </ProgramContext.Provider>
    )
}