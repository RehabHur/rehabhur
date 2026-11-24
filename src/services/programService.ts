import { BASE_URL } from "../api";
import { programsMock } from "../mocks/programMock";
import type { PatientAssignment, Program, ProgramExercise, ProgramInput } from "../types/program";
import { readJson } from "./http";


const USE_MOCKS = true // cuando este el backend listo, cambiar a false para usar la API


export async function getPrograms(): Promise<Program[]> {
    if(USE_MOCKS) return programsMock

    const response = await fetch(`${BASE_URL}/programs`)
    return readJson<Program[]>(response, 'No se pudieron obtener los programas')
}

// Función para asignar un paciente a un programa (para pantalla de asignar programas)
export async function assignPatientToProgram(programId: number, patient: PatientAssignment): Promise<Program> {
    if(USE_MOCKS){
        const program = programsMock.find(p => p.id === programId)
        if(!program) throw new Error('Programa no encontrado')

        program.assignedPatients.push(patient)
        return program
    }

    const response = await fetch(`${BASE_URL}/programs/${programId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
    })

    return readJson<Program>(response, 'No se pudo asignar el paciente')
}


let nextMockId = Math.max(0, ...programsMock.map((p) => p.id)) + 1

export async function getProgramById(id: number): Promise<Program> {
    if (USE_MOCKS) {
        const program = programsMock.find((p) => p.id === id)
        if (!program) throw new Error('Programa no encontrado')
        return program
    }

    const response = await fetch(`${BASE_URL}/programs/${id.toString()}`)
    return readJson<Program>(response, 'No se pudo obtener el programa')
}

export async function createProgram(program: ProgramInput, exercises: ProgramExercise[]): Promise<Program> {
    if (USE_MOCKS) {
        return { ...program, id: nextMockId++, exercises, assignedPatients: [] }
    }

    const response = await fetch(`${BASE_URL}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...program, exercises }),
    })
    return readJson<Program>(response, 'No se pudo crear el programa')
}

export async function updateProgram(program: Program): Promise<Program> {
    const { id, ...data } = program

    if (USE_MOCKS) {
        return program
    }

    const response = await fetch(`${BASE_URL}/programs/${id.toString()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return readJson<Program>(response, 'No se pudo actualizar el programa')
}

export async function deleteProgram(id: number): Promise<void> {
    if (USE_MOCKS) {
        return
    }

    const response = await fetch(`${BASE_URL}/programs/${id.toString()}`, {
        method: 'DELETE',
    })
    await readJson<void>(response, 'No se pudo eliminar el programa')
}
