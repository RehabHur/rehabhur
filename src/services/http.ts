type ApiErrorResponse = {
    error?: {
        message?: string
    }
}

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
