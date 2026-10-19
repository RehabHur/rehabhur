import { API_URL } from '../api'
import {
    bodyRegionsMock,
    motionTypesMock,
    materialsMock,
} from '../mocks/optionsMock'
import type { ExerciseOptions } from '../types/option'

const OPTIONS_URL = `${API_URL}/options`

// TODO: cuando el back esté listo, reemplazar por:
//   GET ${OPTIONS_URL}/body-regions
//   GET ${OPTIONS_URL}/motion-types
//   GET ${OPTIONS_URL}/materials

export async function getExerciseOptions(): Promise<ExerciseOptions> {
    return {
        bodyRegions: bodyRegionsMock,
        motionTypes: motionTypesMock,
        materials: materialsMock,
    }
}

export const OPTIONS_ENDPOINT = OPTIONS_URL