import { BASE_URL } from '../api'
import {
    clearStoredSession,
    getStoredSession,
    updateStoredAccessToken,
} from './session'

type ApiErrorResponse = {
    error?: {
        message?: string
    }
}

let refreshPromise: Promise<string | null> | null = null

export function getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback
}

export async function readJson<T>(response: Response, fallbackMessage: string): Promise<T> {
    if (!response.ok) {
        let message = fallbackMessage
        try {
            const body = (await response.json()) as ApiErrorResponse
            if (body.error?.message) message = body.error.message
        } catch {
            // La respuesta no era JSON: conservamos el mensaje por defecto.
        }
        throw new Error(message)
    }

    if (response.status === 204) return undefined as T
    return (await response.json()) as T
}

function refreshAccessToken(): Promise<string | null> {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: '{}',
                credentials: 'include',
            })

            if (!response.ok) {
                clearStoredSession()
                window.dispatchEvent(new Event('rehabhur:unauthorized'))
                return null
            }

            const refreshed = await readJson<{ accessToken: string }>(
                response,
                'No se pudo renovar la sesión.',
            )
            if (!refreshed.accessToken) {
                throw new Error('El servidor no devolvió un token de acceso al renovar la sesión.')
            }

            updateStoredAccessToken(refreshed.accessToken)
            return refreshed.accessToken
        })().finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

export async function apiFetch(url: string, init: RequestInit = {}): Promise<Response> {
    const session = getStoredSession()
    const headers = new Headers(init.headers)
    if (session) headers.set('Authorization', `Bearer ${session.token}`)

    const requestInit: RequestInit = {
        ...init,
        headers,
        credentials: 'include',
    }
    const response = await fetch(url, requestInit)
    if (response.status !== 401 || !session) return response

    const refreshedToken = await refreshAccessToken()
    if (!refreshedToken) return response

    headers.set('Authorization', `Bearer ${refreshedToken}`)
    const retryResponse = await fetch(url, requestInit)
    if (retryResponse.status === 401) {
        clearStoredSession()
        window.dispatchEvent(new Event('rehabhur:unauthorized'))
    }
    return retryResponse
}

type PaginatedResponse<T> = {
    data: T[]
    meta: { totalPages: number }
}

export async function fetchAllPages<T>(url: string, fallbackMessage: string): Promise<T[]> {
    const results: T[] = []
    let page = 1
    let hasMorePages = true

    while (hasMorePages) {
        const separator = url.includes('?') ? '&' : '?'
        const response = await apiFetch(`${url}${separator}page=${page}&limit=100`)
        const result = await readJson<PaginatedResponse<T>>(response, fallbackMessage)
        const totalPages = result.meta?.totalPages
        if (
            !Array.isArray(result.data) ||
            typeof totalPages !== 'number' ||
            !Number.isInteger(totalPages) ||
            totalPages < 0
        ) {
            throw new Error('La API devolvió una respuesta de paginación inválida.')
        }
        results.push(...result.data)
        hasMorePages = page < totalPages
        page += 1
    }

    return results
}
