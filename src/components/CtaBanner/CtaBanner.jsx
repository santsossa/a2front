import styles from './CtaBanner.module.css'

export default function CtaBanner() {
  return (
    <section className={styles.banner} id="consulta">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2>¿Listo para encontrar<br />el mejor seguro?</h2>
          <p>Compara gratis en segundos y ahorra en tu próxima póliza. Sin registros, sin spam.</p>
        </div>
        <div className={styles.actions}>
          <a href="#planes"   className="btn btnYellow">📊 Comparar ahora</a>
          <a href="#contacto" className="btn btnWhiteOutline">Hablar con un asesor →</a>
        </div>
      </div>
    </section>
  )
}
