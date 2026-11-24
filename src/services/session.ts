import type { AuthUser, LoginResponse } from '../types/auth'

const SESSION_KEY = 'rehabhur-session'

function isAuthUser(value: unknown): value is AuthUser {
    if (!value || typeof value !== 'object') return false

    const user = value as Record<string, unknown>
    return (
        typeof user.id === 'number' &&
        typeof user.firstName === 'string' &&
        typeof user.lastName === 'string' &&
        typeof user.email === 'string' &&
        ['admin', 'docente', 'estudiante', 'paciente'].includes(String(user.role))
    )
}

function isLoginResponse(value: unknown): value is LoginResponse {
    if (!value || typeof value !== 'object') return false
    const session = value as Record<string, unknown>
    return typeof session.token === 'string' && isAuthUser(session.user)
}

export function getStoredSession(): LoginResponse | null {
    const saved = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
    if (!saved) return null

    try {
        const session: unknown = JSON.parse(saved)
        if (isLoginResponse(session)) return session
    } catch {
        // A malformed saved session should not prevent the app from starting.
    }

    clearStoredSession()
    return null
}

export function saveSession(session: LoginResponse, remember: boolean): void {
    clearStoredSession()
    const storage = remember ? localStorage : sessionStorage
    storage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function updateStoredAccessToken(token: string): void {
    const session = getStoredSession()
    if (!session) return

    saveSession({ ...session, token }, localStorage.getItem(SESSION_KEY) !== null)
}

export function clearStoredSession(): void {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
}
