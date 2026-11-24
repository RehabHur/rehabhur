import { BASE_URL } from '../api'
import type { LoginCredentials, LoginResponse } from '../types/auth'
import { readJson } from './http'

type ApiLoginResponse = {
    accessToken: string
    user: LoginResponse['user']
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
    })

    const data = await readJson<ApiLoginResponse>(response, 'Correo o contraseña incorrectos.')
    return {
        token: data.accessToken,
        user: data.user,
    }
}

export async function logout(): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
        credentials: 'include',
    })
    await readJson<void>(response, 'No se pudo cerrar la sesión en el servidor.')
}