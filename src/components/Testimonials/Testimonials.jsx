import { useEffect, useRef } from 'react'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  {
    stars: 5,
    text: 'Tenía seguro con Sura desde hacía 5 años y nunca había comparado precios. Con Asegura2 vi 8 opciones en minutos y contraté con Allianz: misma cobertura full con vehículo de reemplazo y conductor elegido, $68.000 menos al mes. La póliza quedó activa en menos de 24 horas, todo digital.',
    name: 'Camilo Herrera',
    city: 'Medellín',
    plan: 'Seguro Full Allianz · antes en Sura',
    initials: 'CH',
    featured: false,
  },
  {
    stars: 5,
    text: 'Cuatro años esperando cita con el reumatólogo por la EPS — siempre cancelaciones y reprogramaciones. Comparé en Asegura2, elegí Colsanitas por precio y cobertura, y tres días después tenía mi primera cita en la Clínica del Country. El asesor me explicó punto por punto qué cubría el plan antes de firmar.',
    name: 'Paola Vásquez',
    city: 'Bogotá',
    plan: 'Medicina Prepagada · Plan Individual Colsanitas',
    initials: 'PV',
    featured: true,
  },
  {
    stars: 5,
    text: 'Tuve un accidente leve y me di cuenta de que mi seguro anterior no cubría los gastos médicos de los pasajeros. En Asegura2 comparé los límites de responsabilidad civil de cada plan y contraté con Bolívar, que tenía la RC más alta y el deducible más bajo del mercado para mi tipo de vehículo.',
    name: 'Luis Moreno',
    city: 'Cali',
    plan: 'Seguro Full Bolívar · RC hasta $4.000M',
    initials: 'LM',
    featured: false,
  },
]

export default function Testimonials() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    cardsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <p className="sectionEyebrow center">Testimonios</p>
        <h2 className="sectionTitle center">
          Lo que dicen<br />
          <span className="highlight">nuestros clientes</span>
        </h2>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              ref={el => (cardsRef.current[i] = el)}
              className={`${styles.card} ${t.featured ? styles.cardFeatured : ''} fadeIn`}
            >
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p>{t.text}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.city} · {t.plan}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
