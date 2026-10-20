import ky from 'ky';
import { API_URL } from '../api'
import { exercisesMock } from '../mocks/exercisesMock'
import type { Exercise } from '../types/exercise'

//const EXERCISES_URL = `${API_URL}/exercises`

const json: Exercise[] = await ky('http://localhost:3000/api/v1/exercises').json();

console.log(json);

// TODO: reemplazar cada función por fetch cuando el back esté listo.
// Ejemplo:
//   const res = await fetch(EXERCISES_URL)
//   if (!res.ok) throw new Error('No se pudieron obtener los ejercicios')
//   return await res.json()

export async function getExercises(): Promise<Exercise[]> {
    return json;
}

export async function getExerciseById(id: number): Promise<Exercise | undefined> {
    return exercisesMock.find((e) => e.id === id)
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
    return exercise
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
    return exercise
}

export async function deleteExercise(_id: number): Promise<void> {
    return
}

// Referencia para cuando haya back:
//export const EXERCISES_ENDPOINT = EXERCISES_URL