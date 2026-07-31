import styles  from './LoginRightSide.module.css'
// import logo from '@/assets/cerebro.png'
// import vid from '@/assets/movimi.mp4'

function LoginRightSide (){
    return (
            <section className={styles.right}>
                <div className={styles.video}>
                    <img className={styles.logo} src="/cerebro.png" alt="imagen de cerebro" />
                    <h1>Un puente entre la mente y la tecnologia del mañana</h1>
                    <video autoPlay loop muted playsInline src="/movimi.mp4"></video>
                </div>
            </section>
    )
}

export default LoginRightSide;