import { useState, type ReactNode } from 'react'
import type { LoginCredentials, LoginResponse } from '../types/auth'
import { login as loginService } from '../services/authService'
import { AuthContext } from './authContextValue'

const SESSION_KEY = 'rehabhur-session'

function getSavedSession(): LoginResponse | null {
    const saved = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<LoginResponse | null>(getSavedSession)

    const login = async (credentials: LoginCredentials, remember: boolean) => {
        const data = await loginService(credentials)

        const storage = remember ? localStorage : sessionStorage
        storage.setItem(SESSION_KEY, JSON.stringify(data))
        setSession(data)
    }

    const logout = () => {
        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)
        setSession(null)
    }

    return (
        <AuthContext.Provider value={{ user: session?.user ?? null, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}