import ky from 'ky'
import { exercisesMock } from '../mocks/exercisesMock'
import type { Exercise } from '../types/exercise'

const USE_MOCKS = true 

const api = ky.create({ baseUrl: 'http://localhost:3000/api/v1' })

export async function getExercises(): Promise<Exercise[]> {
    if (USE_MOCKS) return exercisesMock
    return await api.get('exercises').json()
}

export async function getExerciseById(id: number): Promise<Exercise | undefined> {
    if (USE_MOCKS) return exercisesMock.find((e) => e.id === id)
    return await api.get(`exercises/${id.toString()}`).json()
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise
    return await api.post('exercises', { json: exercise }).json()
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
    if (USE_MOCKS) return exercise
    return await api.put(`exercises/${exercise.id.toString()}`, { json: exercise }).json()
}

export async function deleteExercise(id: number): Promise<void> {
    if (USE_MOCKS) return
    await api.delete(`exercises/${id.toString()}`)
}

