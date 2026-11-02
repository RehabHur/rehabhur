//import ky from 'ky'
import { exercisesMock } from '../mocks/exercisesMock'
import type { Exercise } from '../types/exercise'


const USE_MOCKS = false // Poner en false para probar el back real

const BASE_URL = 'http://localhost:3000/api/v1'

// Instancia de ky descomentar la const api y el import para usarla
//const api = ky.create({ baseUrl: BASE_URL })


// OPCIÓN 1: CONEXIÓN USANDO FETCH

export async function getExercises(): Promise<Exercise[]> {
    if (USE_MOCKS) return exercisesMock

    const response = await fetch(`${BASE_URL}/exercises`)
    if (!response.ok) throw new Error('No se pudieron obtener los ejercicios')
    return await response.json()
}

export async function getExerciseById(id: number): Promise<Exercise | undefined> {
    if (USE_MOCKS) return exercisesMock.find((e) => e.id === id)

    const response = await fetch(`${BASE_URL}/exercises/${id.toString()}`)
    if (!response.ok) throw new Error('No se pudo obtener el ejercicio')
    return await response.json()
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise

    const response = await fetch(`${BASE_URL}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
    })
    if (!response.ok) throw new Error('No se pudo crear el ejercicio')
    return await response.json()
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise

    const response = await fetch(`${BASE_URL}/exercises/${exercise.id.toString()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
    })
    if (!response.ok) throw new Error('No se pudo actualizar el ejercicio')
    return await response.json()
}

export async function deleteExercise(id: number): Promise<void> {
    if (USE_MOCKS) return

    const response = await fetch(`${BASE_URL}/exercises/${id.toString()}`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error('No se pudo eliminar el ejercicio')
}





// OPCIÓN 2: CONEXIÓN USANDO KY

/*
export async function getExercisesKy(): Promise<Exercise[]> {
    if (USE_MOCKS) return exercisesMock
    return await api.get('exercises').json()
}

export async function getExerciseByIdKy(id: number): Promise<Exercise | undefined> {
    if (USE_MOCKS) return exercisesMock.find((e) => e.id === id)
    return await api.get(`exercises/${id.toString()}`).json()
}

export async function createExerciseKy(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise
    return await api.post('exercises', { json: exercise }).json()
}

export async function updateExerciseKy(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise
    return await api.put(`exercises/${exercise.id.toString()}`, { json: exercise }).json()
}

export async function deleteExerciseKy(id: number): Promise<void> {
    if (USE_MOCKS) return
    await api.delete(`exercises/${id.toString()}`)
}
*/
