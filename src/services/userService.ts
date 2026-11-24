import { BASE_URL } from '../api'
import type { AuthUser } from '../types/auth'
import { apiFetch, readJson } from './http'

export type AccountUser = AuthUser & {
    dni: string
}

export async function getUsers(): Promise<AccountUser[]> {
    const response = await apiFetch(`${BASE_URL}/users`)
    return readJson<AccountUser[]>(response, 'No se pudieron obtener las cuentas de usuario.')
}
