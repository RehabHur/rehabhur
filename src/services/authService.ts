import { BASE_URL } from '../api'
import { MOCK_EMAIL, MOCK_PASSWORD, mockUser } from '../mocks/authMock'
import type { LoginCredentials, LoginResponse } from '../types/auth'
import { readJson } from './http'

const USE_MOCKS = true // cuando este el backend listo, cambiar a false para usar la API 

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    if (USE_MOCKS) {
        await new Promise((resolve) => setTimeout(resolve, 600))

        const email = credentials.email.trim().toLowerCase()
        if (email !== MOCK_EMAIL || credentials.password !== MOCK_PASSWORD) {
            throw new Error('Credenciales inválidas')
        }

        return { token: 'token-de-prueba', user: mockUser }
    }

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    })
    return readJson<LoginResponse>(response, 'Credenciales inválidas')
}