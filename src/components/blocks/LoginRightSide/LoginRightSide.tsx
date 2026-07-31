import styles from "./LoginRightSide.module.css";

function LoginRightSide() {
    return (
        <section className={styles.right}>
            <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            src="/cosmos.mp4"
        />

        <div className={styles.overlay}></div>

        <img className={styles.logo} src="/Logo1.png" alt="Logo" />

        <div className={styles.content}>
            <h1 className={styles.title}>
                Más que un taller,
                <br />
                tu confianza
                <br />
                en el agua.
            </h1>

            <div className={styles.services}>
            <div className={styles.item}>
                <span>🔧</span>

                <div>
                <h3>Mantenimiento Integral</h3>
                <p>Motores, electricidad, casco y service.</p>
                </div>
            </div>

            <div className={styles.item}>
                <span>⚓</span>

                <div>
                <h3>Repuestos Originales</h3>
                <p>Trabajamos con primeras marcas.</p>
                </div>
            </div>

            <div className={styles.item}>
                <span>🛥️</span>

                <div>
                <h3>Lista para Navegar</h3>
                <p>Entregamos tu embarcación lista.</p>
                </div>
            </div>
            </div>

            <div className={styles.quote}>
            "Tu embarcación merece el mejor cuidado."
            </div>
        </div>
        </section>
    );
}

export default LoginRightSide;