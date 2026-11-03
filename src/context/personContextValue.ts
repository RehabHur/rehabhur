import { createContext } from 'react'
import type { Person, PersonInput } from '../types/person'

export type PersonContextType = {
    persons: Person[]
    loading: boolean
    error: string | null
    addPerson: (person: PersonInput) => Promise<void>
    updatePerson: (person: Person) => Promise<void>
    removePerson: (id: number) => Promise<void>
}

export const PersonContext = createContext<PersonContextType | undefined>(undefined)
