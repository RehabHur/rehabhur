import type { Role } from './person'

export type LoginCredentials = {
    email: string
    password: string
}

export type AuthUser = {
    id: number
    firstName: string
    lastName: string
    email: string
    role: Role
}

export type LoginResponse = {
    token: string
    user: AuthUser
}