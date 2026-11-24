import type { AuthUser } from '../types/auth'

export const MOCK_EMAIL = 'admin@rehabhur.com'
export const MOCK_PASSWORD = 'admin123'

export const mockUser: AuthUser = {
    id: 1,
    firstName: 'Elena',
    lastName: 'Gómez',
    email: MOCK_EMAIL,
    role: 'admin',
}