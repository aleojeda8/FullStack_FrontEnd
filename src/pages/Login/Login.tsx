import {useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import styles  from './Login.module.css'
import Button from '@/components/ui/Button/Button'
import LoginRightSide from '@/components/blocks/LoginRightSide/LoginRightSide'
import { login } from '@/api/login'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const data = await login(email, password)
            localStorage.setItem('token', data.token)
            localStorage.setItem('role' , data.role)
            navigate({ to: '/'})
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={styles.container}>

            <section className={styles.left}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={styles.title}>Iniciar Sesion</h1>
                    <p className={styles.subtitle}>Ingresa tu email y contraseña para continuar</p>

                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        className={styles.input}
                        id="email"
                        type="email"
                        placeholder='tu@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className={styles.label} htmlFor="password">Contraseña</label>
                    <input
                        className={styles.input}
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Iniciar Sesion'}
                    </Button>
                </form>
            </section>

            <section className={styles.right}><LoginRightSide/></section>

        </main>
    )
}

export default Login