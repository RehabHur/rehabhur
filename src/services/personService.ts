//import ky from 'ky'
import { BASE_URL } from '../api'
import { personsMock } from '../mocks/personsMock'
import type { Person } from '../types/person'


// OPCIÓN 1: CONEXIÓN USANDO FETCH
const USE_MOCKS = false // Poner en false para probar el back real

export async function getPersons(): Promise<Person[]> {
    if (USE_MOCKS) return personsMock

    const response = await fetch(`${BASE_URL}/persons`)
    if (!response.ok) throw new Error('No se pudieron obtener las personas')
    return await response.json()
}

export async function createPerson(person: Person): Promise<Person> {
    if (USE_MOCKS) return person

    const response = await fetch(`${BASE_URL}/persons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
    })
    if (!response.ok) throw new Error('No se pudo crear la persona')
    return await response.json()
}

export async function updatePerson(person: Person): Promise<Person> {
    if (USE_MOCKS) return person

    const response = await fetch(`${BASE_URL}/persons/${person.id.toString()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person),
    })
    if (!response.ok) throw new Error('No se pudo actualizar la persona')
    return await response.json()
}

export async function deletePerson(id: number): Promise<void> {
    if (USE_MOCKS) return

    const response = await fetch(`${BASE_URL}/persons/${id.toString()}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('No se pudo eliminar la persona')
}



// OPCIÓN 2: CONEXIÓN USANDO KY
/*
const USE_MOCKS = false // Poner en false para probar el back real

const api = ky.create({ baseUrl: BASE_URL })

export async function getPersonsKy(): Promise<Person[]> {
    if (USE_MOCKS) return personsMock
    return await api.get('persons').json()
}

export async function createPersonKy(person: Person): Promise<Person> {
    if (USE_MOCKS) return person
    return await api.post('persons', { json: person }).json()
}

export async function updatePersonKy(person: Person): Promise<Person> {
    if (USE_MOCKS) return person
    return await api.put(`persons/${person.id.toString()}`, { json: person }).json()
}

export async function deletePersonKy(id: number): Promise<void> {
    if (USE_MOCKS) return
    await api.delete(`persons/${id.toString()}`)
}
*/