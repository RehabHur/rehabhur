import { BASE_URL } from '../api'
import type { Exercise, ExerciseInput } from '../types/exercise'
import { readJson } from './http'

export async function getExercises(): Promise<Exercise[]> {
    const response = await fetch(`${BASE_URL}/exercises`)
    return readJson<Exercise[]>(response, 'No se pudieron obtener los ejercicios')
}

export async function getExerciseById(id: number): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises/${id.toString()}`)
    return readJson<Exercise>(response, 'No se pudo obtener el ejercicio')
}

export async function createExercise(exercise: ExerciseInput): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
    })
    return readJson<Exercise>(response, 'No se pudo crear el ejercicio')
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
    const response = await fetch(`${BASE_URL}/exercises/${exercise.id.toString()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: exercise.name,
            bodyRegion: exercise.bodyRegion,
            motionType: exercise.motionType,
            material: exercise.material,
            linkVideo: exercise.linkVideo,
            instructions: exercise.instructions,
        }),
    })
    return readJson<Exercise>(response, 'No se pudo actualizar el ejercicio')
}

export async function deleteExercise(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/exercises/${id.toString()}`, {
        method: 'DELETE',
    })
    await readJson<void>(response, 'No se pudo eliminar el ejercicio')
}
