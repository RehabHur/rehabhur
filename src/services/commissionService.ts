import { BASE_URL } from '../api'
import type { Commission } from '../types/commision'
import { apiFetch, fetchAllPages } from './http'

export async function getCommissions(): Promise<Commission[]> {
    return fetchAllPages<Commission>(`${BASE_URL}/comissions`, 'No se pudieron obtener las comisiones')
}