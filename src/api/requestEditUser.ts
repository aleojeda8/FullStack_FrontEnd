import { API_URL } from '@/config/globals'

interface Cambio {
  campo: string
  antes: string
  ahora: string
}

export async function requestEditUser(cambios: Cambio[]): Promise<void> {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/users/request-edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cambios }),
  })

  const body = await response.json()

  if (!body.success) {
    throw new Error(body.message)
  }
}