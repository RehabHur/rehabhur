
export type Exercise = {
    id: number
    name: string
    bodyRegion: string
    motionType: string
    material: string
    linkVideo: string
    instructions: string
}

export type ExerciseInput = Omit<Exercise, 'id'>
