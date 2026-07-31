import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import styles from "./Login.module.css";
import Button from "@/components/ui/Button/Button";
import LoginRightSide from "@/components/blocks/LoginRightSide/LoginRightSide";
import { login } from "@/api/login";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate({ to: "/" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.left}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Iniciar Sesión</h1>

          <p className={styles.subtitle}>
            Ingresa tu email y contraseña para continuar
          </p>

          <label className={styles.label}>Email</label>

          <input
            className={styles.input}
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>Contraseña</label>

          <input
            className={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p>{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </section>

      <LoginRightSide />
    </main>
  );
}

export default Login;