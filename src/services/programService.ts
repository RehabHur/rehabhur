import { BASE_URL } from "../api";
import { programsMock } from "../mocks/programMock";
import type { PatientAssignment, Program } from "../types/program";
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
