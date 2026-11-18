
export type Difficulty = 'Principiante' | 'Intermedio' | 'Avanzado' | 'Intenso' | 'Moderado' | 'Liviano'

export type ProgramExercise = {
    id: number
    name: string
    series: number
    repetitions: number
}

export type PatientAssignment = {
    patientId: number
    patientName: string
    dni: string
}

export type Program = {
    id: number
    name: string
    difficulty: Difficulty
    createdBy: string
    date: string
    exercises: ProgramExercise[]
    assignedPatients: PatientAssignment[]
}