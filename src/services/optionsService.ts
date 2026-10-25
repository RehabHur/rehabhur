import { API_URL } from '../api'
import {
    bodyRegionsMock,
    motionTypesMock,
    materialsMock,
} from '../mocks/optionsMock'
import type { ExerciseOptions } from '../types/option'

const OPTIONS_URL = `${API_URL}/options`

export async function getExerciseOptions(): Promise<ExerciseOptions> {
    return {
        bodyRegions: bodyRegionsMock,
        motionTypes: motionTypesMock,
        materials: materialsMock,
    }
}

export const OPTIONS_ENDPOINT = OPTIONS_URL