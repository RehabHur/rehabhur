import { useEffect, useState, type ReactNode } from 'react'
import type { LoginCredentials, LoginResponse } from '../types/auth'
import { login as loginService, logout as logoutService } from '../services/authService'
import { clearStoredSession, getStoredSession, saveSession } from '../services/session'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<LoginResponse | null>(getStoredSession)

    useEffect(() => {
        const handleUnauthorized = () => setSession(null)
        window.addEventListener('rehabhur:unauthorized', handleUnauthorized)
        return () => window.removeEventListener('rehabhur:unauthorized', handleUnauthorized)
    }, [])

    const login = async (credentials: LoginCredentials, remember: boolean) => {
        const data = await loginService(credentials)

        saveSession(data, remember)
        setSession(data)
    }

    const logout = async () => {
        await logoutService()
        clearStoredSession()
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ user: session?.user ?? null, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}