// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from '@tanstack/react-router'
// import styles from './CreateUser.module.css'
// import Button from '@/components/ui/Button/Button'
// import { createUser } from '@/api/createUser'
// import LoginRightSide from '@/components/blocks/LoginRightSide/LoginRightSide'

// function CreateUser() {
//   const navigate = useNavigate()

//   // Inputs controlados: React es la fuente de verdad del valor
//   const [nombre, setNombre] = useState('')
//   const [apellido, setApellido] = useState('')
//   const [email, setEmail] = useState('') 
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     // Esta página es solo para admins logueados: sin token, no entra
//     if (!localStorage.getItem('token')) {
//       navigate({ to: '/login' })
//     }
//   }, [navigate])

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault() // Evita que el navegador recargue la página
//     setError(null)
//     setLoading(true)
//     try {
//       await createUser(nombre, apellido, email, password)
//       // Usuario creado → volvemos a la lista para verlo
//       navigate({ to: '/' })
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <main className={styles.container}>

//       <section className={styles.left}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <h1 className={styles.title}>Crear Usuario</h1>
//           <p className={styles.subtitle}>Completá los datos del nuevo usuario</p>

//           <label className={styles.label} htmlFor="name">Nombre</label>
//           <input
//             className={styles.input}
//             id="name"
//             type="text"
//             placeholder="Nombre"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//             required
//           />

//           <label className={styles.label} htmlFor="lastname">Apellido</label>
//           <input
//             className={styles.input}
//             id="lastname"
//             type="text"
//             placeholder="Apellido"
//             value={apellido}
//             onChange={(e) => setApellido(e.target.value)}
//             required
//           />

//           <label className={styles.label} htmlFor="email">Email</label>
//           <input
//             className={styles.input}
//             id="email"
//             type="email"
//             placeholder="usuario@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label className={styles.label} htmlFor="password">Contraseña</label>
//           <input
//             className={styles.input}
//             id="password"
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//           />

//           {/* Mensaje de error que viene del backend */}
//           {error && <p className={styles.error}>{error}</p>}

//           <Button variant="primary" type="submit" disabled={loading}>
//             {loading ? 'Creando...' : 'Crear Usuario'}
//           </Button>

//           <p className={styles.footer}>
//             <Link to="/">Volver a la lista</Link>
//           </p>
//         </form>
//       </section>

//       <section className={styles.right}><LoginRightSide/></section>

//     </main>
//   )
// }

// export default CreateUser

import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import styles from './CreateUser.module.css'
import Button from '@/components/ui/Button/Button'
import { createUser } from '@/api/createUser'

const STEPS = [
  { label: 'Datos básicos' },
  { label: 'Confirmar' },
]

interface FormState {
  nombre: string
  apellido: string
  email: string
  password: string
}

const INITIAL_STATE: FormState = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
}

function CreateUser() {
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate({ to: '/login' })
    }
  }, [navigate])

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function isStepValid(target: number) {
    if (target === 0) {
      return (
        form.nombre.trim() !== '' &&
        form.apellido.trim() !== '' &&
        form.email.trim() !== '' &&
        form.password.length >= 6
      )
    }
    return true
  }

  function goNext() {
    setError(null)
    if (!isStepValid(step)) {
      setError('Completá todos los campos antes de continuar')
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setError(null)
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit() {
    setError(null)
    setLoading(true)
    try {
      await createUser(form.nombre, form.apellido, form.email, form.password)
      navigate({ to: '/' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crear Usuario</h1>
        <p className={styles.subtitle}>Completá los datos en los siguientes pasos</p>

        <div className={styles.stepper}>
          {STEPS.map((s, i) => (
            <div key={s.label} className={styles.stepItem}>
              <div className={styles.stepMarkerWrap}>
                <div
                  className={`${styles.stepCircle} ${i === step ? styles.stepCircleActive : ''} ${
                    i < step ? styles.stepCircleDone : ''
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />
                )}
              </div>
              <span className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            if (step === STEPS.length - 1) {
              handleSubmit()
            } else {
              goNext()
            }
          }}
        >
          {step === 0 && (
            <div className={styles.stepPane}>
              <label className={styles.label} htmlFor="nombre">Nombre</label>
              <input
                className={styles.input}
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => update('nombre', e.target.value)}
              />

              <label className={styles.label} htmlFor="apellido">Apellido</label>
              <input
                className={styles.input}
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={form.apellido}
                onChange={(e) => update('apellido', e.target.value)}
              />

              <label className={styles.label} htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                type="email"
                placeholder="usuario@email.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />

              <label className={styles.label} htmlFor="password">Contraseña</label>
              <input
                className={styles.input}
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                minLength={6}
              />
            </div>
          )}

          {step === 1 && (
            <div className={styles.stepPane}>
              <dl className={styles.summary}>
                <div className={styles.summaryRow}>
                  <dt>Nombre completo</dt>
                  <dd>{form.nombre} {form.apellido}</dd>
                </div>
                <div className={styles.summaryRow}>
                  <dt>Email</dt>
                  <dd>{form.email}</dd>
                </div>
              </dl>
              <p className={styles.hint}>Revisá los datos antes de crear el usuario.</p>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            {step > 0 ? (
              <Button variant="secondary" type="button" onClick={goBack}>Atrás</Button>
            ) : (
              <Link to="/" className={styles.cancelLink}>Cancelar</Link>
            )}

            {step < STEPS.length - 1 ? (
              <Button variant="primary" type="submit">Siguiente</Button>
            ) : (
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default CreateUser