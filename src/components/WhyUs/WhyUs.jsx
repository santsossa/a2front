import { useEffect, useRef } from 'react'
import styles from './WhyUs.module.css'

const FEATURES = [
  { icon: '🆓', title: '100% Gratuito',          desc: 'Nuestro comparador no tiene ningún costo. Siempre.' },
  { icon: '⚖️', title: 'Comparación Imparcial',  desc: 'No somos una aseguradora. Te mostramos todas las opciones sin favoritismos.' },
  { icon: '🎯', title: 'Asesoría Personalizada', desc: 'Un experto te orienta para que elijas el plan que realmente se adapta a ti.' },
  { icon: '🔓', title: 'Sin Compromisos',        desc: 'Compara libremente. Contratas solo si encuentras lo que buscas.' },
]

export default function WhyUs() {
  const featuresRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    featuresRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.whyUs} id="nosotros">
      <div className={`container ${styles.whyInner}`}>

        {/* Visual */}
        <div className={styles.whyVisual}>
          <img
            src="/images/why-us.png"
            alt="Por qué elegirnos"
            onError={e => (e.currentTarget.style.display = 'none')}
          />
          <div className={styles.floatCard}>
            <span className={styles.floatIcon}>✅</span>
            <div>
              <strong>+21,000</strong>
              <small>clientes satisfechos</small>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.whyContent}>
          <p className="sectionEyebrow">Por qué comparar con nosotros</p>
          <h2 className="sectionTitle">
            Comparar nunca fue<br />
            <span className="highlight">tan fácil</span>
          </h2>
          <p className={styles.whyDesc}>
            En Asegura2 hacemos el trabajo por ti. Analizamos y comparamos
            cientos de opciones de las principales aseguradoras del mercado
            para que tomes la mejor decisión con total transparencia y sin
            costo alguno.
          </p>

          <div className={styles.whyFeatures}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                ref={el => (featuresRef.current[i] = el)}
                className={`${styles.whyFeature} fadeIn`}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="#planes" className="btn btnPrimary">Comparar ahora →</a>
        </div>
      </div>
    </section>
  )
}
