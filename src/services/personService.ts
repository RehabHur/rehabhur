import ky from 'ky'
import { personsMock } from '../mocks/personsMock'
import type { Person } from '../types/person'

const USE_MOCKS = true 

const api = ky.create({ baseUrl: 'http://localhost:3000/api/v1' })

export async function getPersons(): Promise<Person[]> {
    if (USE_MOCKS) return personsMock
    return await api.get('persons').json()
}

export async function createPerson(person: Person): Promise<Person> {
    if (USE_MOCKS) return person
    return await api.post('persons', { json: person }).json()
}

export async function updatePerson(person: Person): Promise<Person> {
    if (USE_MOCKS) return person
    return await api.put(`persons/${person.id.toString()}`, { json: person }).json()
}

export async function deletePerson(id: number): Promise<void> {
    if (USE_MOCKS) return
    await api.delete(`persons/${id.toString()}`)
}