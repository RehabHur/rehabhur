
export type Role = 'admin' | 'docente' | 'estudiante' | 'paciente'

export type Person = {
    id: number
    firstName: string
    lastName: string
    dni: string
    email: string
    nationality: string
    role: Role
}