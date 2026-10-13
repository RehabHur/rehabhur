// import { createContext, useContext, useState, type ReactNode } from 'react'
// import type { Ejercicio } from '../types/ejercicio'
// import { ejerciciosMock } from '../mocks/ejerciciosMock'

// interface EjerciciosContextType {
//     ejercicios: Ejercicio[]
//     agregarEjercicio: (ejercicio: Ejercicio) => void
//     eliminarEjercicio: (id: number) => void
// }

// const EjerciciosContext = createContext<EjerciciosContextType | undefined>(undefined)

// export function EjerciciosProvider({ children }: { children: ReactNode }) {
//     const [ejercicios, setEjercicios] = useState<Ejercicio[]>(ejerciciosMock)

//     const agregarEjercicio = (ejercicio: Ejercicio) => {
//         setEjercicios((prev) => [...prev, ejercicio])
//     }

//     const eliminarEjercicio = (id: number) => {
//         setEjercicios((prev) => prev.filter((e) => e.id !== id))
//     }

//     return (
//         <EjerciciosContext.Provider value={{ ejercicios, agregarEjercicio, eliminarEjercicio }}>
//         {children}
//         </EjerciciosContext.Provider>
//     )
// }

// export function useEjercicios() {
//     const context = useContext(EjerciciosContext)
//     if (!context) {
//         throw new Error('useEjercicios debe usarse dentro de EjerciciosProvider')
//     }
//     return context
// }



import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Ejercicio } from '../types/ejercicio'
import { ejerciciosMock } from '../mocks/ejerciciosMock'

interface EjerciciosContextType {
    ejercicios: Ejercicio[]
    agregarEjercicio: (ejercicio: Ejercicio) => void
    actualizarEjercicio: (ejercicio: Ejercicio) => void
    eliminarEjercicio: (id: number) => void
}

const EjerciciosContext = createContext<EjerciciosContextType | undefined>(undefined)

export function EjerciciosProvider({ children }: { children: ReactNode }) {
    const [ejercicios, setEjercicios] = useState<Ejercicio[]>(ejerciciosMock)

    const agregarEjercicio = (ejercicio: Ejercicio) => {
        setEjercicios((prev) => [...prev, ejercicio])
    }

    const actualizarEjercicio = (ejercicio: Ejercicio) => {
        setEjercicios((prev) =>
            prev.map((e) => (e.id === ejercicio.id ? ejercicio : e))
        )
    }

    const eliminarEjercicio = (id: number) => {
        setEjercicios((prev) => prev.filter((e) => e.id !== id))
    }

    return (
        <EjerciciosContext.Provider
            value={{ ejercicios, agregarEjercicio, actualizarEjercicio, eliminarEjercicio }}
        >
            {children}
        </EjerciciosContext.Provider>
    )
}

export function useEjercicios() {
    const context = useContext(EjerciciosContext)
    if (!context) {
        throw new Error('useEjercicios debe usarse dentro de EjerciciosProvider')
    }
    return context
}