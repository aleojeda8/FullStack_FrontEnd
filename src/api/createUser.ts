import { API_URL } from '@/config/globals'

export async function createUser(nombre: string, apellido: string, email: string, password: string) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            nombre,
            apellido,
            email, 
            password,
            role: 'USER',
            // sacar required en los siguiente campos
            fechaNacimiento: '2010-12-10',
            edad: 1,
            genero: 'Sin especificar',
            telefono: '0000000',
            direccion: 'sin modificar',
            localidad: 'sin modificar',
            provincia: 'sin modificar',
            pais: 'sin modificar',
            cp: '0000', 
        }),
    })

    const body = await response.json()

    if (!body.success) {
        throw new Error(body.message)
    }

    return body.data
}