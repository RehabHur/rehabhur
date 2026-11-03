import { useContext } from 'react'
import { PersonContext } from './personContextValue'

export function usePersons() {
    const context = useContext(PersonContext)
    if (!context) {
        throw new Error('usePersons debe usarse dentro de PersonProvider')
    }
    return context
}
