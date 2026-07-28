import { API_URL } from '@/config/globals'
import type { User } from '@//api/types'


export async function getUsers(): Promise<User[]> {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/users`, {
        headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })

    const body = await response.json()

    if (!body.success) {
        throw new Error(body.message)
    }

    return body.data
}

