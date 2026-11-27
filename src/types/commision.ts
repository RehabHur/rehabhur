export type Commission = {
    id: number
    name: string
    year: number
    turno: 'Mañana' | 'Tarde' | 'Noche'
    cuatrimestre: number
}