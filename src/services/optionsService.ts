import { BASE_URL } from '../api'
import type { ExerciseOptions } from '../types/option'
import { readJson } from './http'

export async function getExerciseOptions(): Promise<ExerciseOptions> {
    const [regionsResponse, typesResponse, materialsResponse] = await Promise.all([
        fetch(`${BASE_URL}/options/body-regions`),
        fetch(`${BASE_URL}/options/motion-types`),
        fetch(`${BASE_URL}/options/materials`),
    ])

    const [bodyRegions, motionTypes, materials] = await Promise.all([
        readJson<ExerciseOptions['bodyRegions']>(regionsResponse, 'No se pudieron cargar las regiones corporales'),
        readJson<ExerciseOptions['motionTypes']>(typesResponse, 'No se pudieron cargar los tipos de movimiento'),
        readJson<ExerciseOptions['materials']>(materialsResponse, 'No se pudieron cargar los materiales'),
    ])

    return { bodyRegions, motionTypes, materials }
}
