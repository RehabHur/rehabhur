
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import type { Person } from '../types/person'
import {
    getPersons,
    createPerson,
    updatePerson as updatePersonService,
    deletePerson as deletePersonService,
} from '../services/personService'

type PersonContextType = {
    persons: Person[]
    loading: boolean
    error: string | null
    addPerson: (person: Person) => Promise<void>
    updatePerson: (person: Person) => Promise<void>
    removePerson: (id: number) => Promise<void>
}

const PersonContext = createContext<PersonContextType | undefined>(undefined)

export function PersonProvider({ children }: { children: ReactNode }) {
    const [persons, setPersons] = useState<Person[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function load() {
            try {
                const data = await getPersons()
                setPersons(data)
            } catch {
                setError('No se pudieron cargar las personas.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const addPerson = async (person: Person) => {
        const created = await createPerson(person)
        setPersons((prev) => [...prev, created])
    }

    const updatePerson = async (person: Person) => {
        const updated = await updatePersonService(person)
        setPersons((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    }

    const removePerson = async (id: number) => {
        await deletePersonService(id)
        setPersons((prev) => prev.filter((p) => p.id !== id))
    }

    return (
        <PersonContext.Provider
            value={{ persons, loading, error, addPerson, updatePerson, removePerson }}
        >
            {children}
        </PersonContext.Provider>
    )
}

export function usePersons() {
    const context = useContext(PersonContext)
    if (!context) throw new Error('usePersons debe usarse dentro de PersonProvider')
    return context
}