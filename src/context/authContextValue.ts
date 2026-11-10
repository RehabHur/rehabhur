import { createContext } from 'react'
import type { AuthUser, LoginCredentials } from '../types/auth'

export type AuthContextType = {
    user: AuthUser | null
    login: (credentials: LoginCredentials, remember: boolean) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)