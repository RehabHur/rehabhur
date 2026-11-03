//import ky from 'ky'
import { BASE_URL } from '../api'
import {
    bodyRegionsMock,
    motionTypesMock,
    materialsMock,
} from '../mocks/optionsMock'
import type { ExerciseOptions } from '../types/option'


// OPCIÓN 1: CONEXIÓN USANDO FETCH
const USE_MOCKS = false // Poner en false para probar el back real

export async function getExerciseOptions(): Promise<ExerciseOptions> {
    if (USE_MOCKS) {
        return {
            bodyRegions: bodyRegionsMock,
            motionTypes: motionTypesMock,
            materials: materialsMock,
        }
    }

    const [resRegions, resTypes, resMaterials] = await Promise.all([
        fetch(`${BASE_URL}/options/body-regions`),
        fetch(`${BASE_URL}/options/motion-types`),
        fetch(`${BASE_URL}/options/materials`),
    ])

    if (!resRegions.ok || !resTypes.ok || !resMaterials.ok) {
        throw new Error('No se pudieron cargar las opciones')
    }

    return {
        bodyRegions: await resRegions.json(),
        motionTypes: await resTypes.json(),
        materials: await resMaterials.json(),
    }
}



// OPCIÓN 2: CONEXIÓN USANDO KY
/*
const USE_MOCKS = false // Poner en false para probar el back real

const api = ky.create({ baseUrl: BASE_URL })

export async function getExerciseOptionsKy(): Promise<ExerciseOptions> {
    if (USE_MOCKS) {
        return {
            bodyRegions: bodyRegionsMock,
            motionTypes: motionTypesMock,
            materials: materialsMock,
        }
    }

    const [bodyRegions, motionTypes, materials] = await Promise.all([
        api.get('options/body-regions').json(),
        api.get('options/motion-types').json(),
        api.get('options/materials').json(),
    ])

    return { bodyRegions, motionTypes, materials }
}
*/