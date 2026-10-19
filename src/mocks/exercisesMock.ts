
//Esto seria el ejemplo de la base de datos de los ejercicios
import type { Exercise } from '../types/exercise'

export const exercisesMock: Exercise[] = [
    {
        id: 1,
        name: 'Flexión cervical',
        bodyRegion: 'Cuello',
        motionType: 'Movilidad',
        material: 'Sin equipamiento',
        linkVideo: 'https://www.youtube.com/watch?v=NEqp5YXLhs8',
        instructions: 'Inclinar lentamente la cabeza hacia adelante y regresar a la posición inicial.',
    },
    {
        id: 2,
        name: 'Rotación cervical',
        bodyRegion: 'Cuello',
        motionType: 'Movilidad',
        material: 'Sin equipamiento',
        linkVideo: 'https://www.youtube.com/watch?v=UrRPuBnXuBY',
        instructions: 'Girar lentamente la cabeza hacia un lado y luego hacia el otro.',
    },
    {
        id: 3,
        name: 'Estiramiento de isquiotibiales',
        bodyRegion: 'Pierna',
        motionType: 'Estiramiento',
        material: 'Colchoneta',
        linkVideo: 'https://www.youtube.com/watch?v=_d7yEj2DCzU',
        instructions: 'Mantener la pierna extendida y realizar el movimiento sin rebotes.',
    },
    {
        id: 4,
        name: 'Liberación de cadera',
        bodyRegion: 'Cadera',
        motionType: 'Estiramiento',
        material: 'Colchoneta',
        linkVideo: 'https://www.youtube.com/watch?v=89My0fee3pY&t=292s',
        instructions: 'Mantener las piernas flexionadas y elevar la cadera.',
    },
]