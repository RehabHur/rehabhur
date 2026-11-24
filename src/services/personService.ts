import { BASE_URL } from '../api'
import type { Person, PersonInput } from '../types/person'
import { readJson } from './http'

type PaginatedResponse<T> = {
    data: T[]
    meta?: { total: number, page: number, lastPage: number }
}

export async function getPersons(): Promise<Person[]> {
    const response = await fetch(`${BASE_URL}/persons`)
    const result = await readJson<PaginatedResponse<Person>>(response, 'No se pudieron obtener las personas')
    return result.data
}

export async function createPerson(person: PersonInput): Promise<Person> {
    const response = await fetch(`${BASE_URL}/persons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
    })
    return readJson<Person>(response, 'No se pudo crear la persona')
}

export async function updatePerson(person: Person): Promise<Person> {
    const response = await fetch(`${BASE_URL}/persons/${person.id.toString()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: person.firstName,
            lastName: person.lastName,
            dni: person.dni,
            email: person.email,
            nationality: person.nationality,
            role: person.role,
        }),
    })
    return readJson<Person>(response, 'No se pudo actualizar la persona')
}

export async function deletePerson(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/persons/${id.toString()}`, {
        method: 'DELETE',
    })
    await readJson<void>(response, 'No se pudo eliminar la persona')
}
