import type { Program } from '../types/program'

export const programsMock: Program[] = [
    {
        id: 1,
        name: 'Rehabilitación Hombro Post-quirúrgico',
        difficulty: 'Moderado',
        createdBy: 'Carlos Méndez',
        date: '2026-07-03',
        exercises: [],
        assignedPatients: [],
    },
    {
        id: 2,
        name: 'Movilidad de hombro',
        difficulty: 'Moderado',
        createdBy: 'Helena Rodríguez',
        date: '2026-08-16',
        exercises: [],
        assignedPatients: [
            { patientId: 10, patientName: 'Pedro Rodríguez', dni: '32455881' },
            { patientId: 11, patientName: 'Brissa Méndez', dni: '40632899' },
        ],
    },
    {
        id: 3,
        name: 'Equilibrio y propiocepción',
        difficulty: 'Liviano',
        createdBy: 'Martina Rodríguez',
        date: '2026-08-18',
        exercises: [],
        assignedPatients: [],
    },
]