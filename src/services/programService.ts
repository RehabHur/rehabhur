import { BASE_URL } from "../api";
import type { PatientAssignment, Program, ProgramExercise, ProgramInput } from "../types/program";
import { apiFetch, readJson } from "./http";

export async function getPrograms(): Promise<Program[]> {
    const response = await apiFetch(`${BASE_URL}/programs`)
    return readJson<Program[]>(response, 'No se pudieron obtener los programas')
}

export async function assignPatientToProgram(programId: number, patient: PatientAssignment): Promise<Program> {
    const response = await apiFetch(`${BASE_URL}/programs/${programId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
    })

    return readJson<Program>(response, 'No se pudo asignar el paciente')
}

export async function removePatientFromProgram(programId: number, patientId: number): Promise<void> {
    const response = await apiFetch(`${BASE_URL}/programs/${programId}/patients/${patientId}`, {
        method: 'DELETE',
    })
    await readJson<void>(response, 'No se pudo desasignar al paciente')
}

export async function getProgramById(id: number): Promise<Program> {
    const response = await apiFetch(`${BASE_URL}/programs/${id.toString()}`)
    return readJson<Program>(response, 'No se pudo obtener el programa')
}

export async function createProgram(program: ProgramInput, exercises: ProgramExercise[]): Promise<Program> {
    const response = await apiFetch(`${BASE_URL}/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...program, exercises }),
    })
    return readJson<Program>(response, 'No se pudo crear el programa')
}

export async function updateProgram(program: Program): Promise<Program> {
    const { id, ...data } = program

    const response = await apiFetch(`${BASE_URL}/programs/${id.toString()}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return readJson<Program>(response, 'No se pudo actualizar el programa')
}

export async function deleteProgram(id: number): Promise<void> {
    const response = await apiFetch(`${BASE_URL}/programs/${id.toString()}`, {
        method: 'DELETE',
    })
    await readJson<void>(response, 'No se pudo eliminar el programa')
}
