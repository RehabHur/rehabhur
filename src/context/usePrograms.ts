import { useContext } from 'react'
import { ProgramContext } from './programContextValue'

export function usePrograms() {
    const context = useContext(ProgramContext)
    if (!context) {
        throw new Error('usePrograms debe usarse dentro de ProgramProvider')
    }
    return context
}