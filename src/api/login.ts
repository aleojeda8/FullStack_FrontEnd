import { API_URL } from '../config/globals'

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    const body = await response.json()

    if (!body.success) {
        throw new Error(body.message)
    }

    return body.data
}

