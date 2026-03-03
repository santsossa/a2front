import { useState } from 'react'
import styles from './FAQ.module.css'

const ITEMS = [
  {
    q: '¿Asegura2 es una aseguradora?',
    a: 'No. Somos una plataforma independiente que compara y presenta las mejores opciones del mercado. No somos empleados ni representantes de ninguna aseguradora, por eso nuestra comparación es 100% imparcial.',
  },
  {
    q: '¿Cuánto cuesta usar Asegura2?',
    a: 'Nada. Nuestro comparador es completamente gratuito para ti. Nos financiamos con comisiones que pagan las aseguradoras cuando se contrata a través de nuestra plataforma, sin que esto afecte el precio que ves.',
  },
  {
    q: '¿Cómo funciona la comparación?',
    a: 'Ingresa el tipo de seguro que necesitas y algunos datos básicos. En segundos obtienes un ranking personalizado con las mejores opciones del mercado para tu perfil. Sin registro previo.',
  },
  {
    q: '¿Puedo contratar directamente desde Asegura2?',
    a: 'Sí. Puedes comparar y solicitar tu póliza directamente en nuestra plataforma. Un asesor te acompaña en todo el proceso si lo necesitas, sin costo adicional.',
  },
  {
    q: '¿Los precios que veo son los reales?',
    a: 'Sí. Mostramos los precios oficiales de cada aseguradora en tiempo real. Lo que ves es lo que pagas, sin costos adicionales por usar nuestro servicio de comparación.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section className={styles.faq}>
      <div className={`container ${styles.faqInner}`}>

        {/* Header */}
        <div className={styles.faqHeader}>
          <p className="sectionEyebrow">Preguntas frecuentes</p>
          <h2 className="sectionTitle">
            ¿Tienes dudas?<br />
            <span className="highlight">Tenemos respuestas</span>
          </h2>
          <a href="#contacto" className="btn btnPrimary">Contactar asesor</a>
        </div>

        {/* Accordion */}
        <div className={styles.faqList}>
          {ITEMS.map((item, i) => (
            <div
              key={item.q}
              className={`${styles.faqItem} ${openIndex === i ? styles.faqItemOpen : ''}`}
            >
              <button
                className={styles.faqSummary}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <span className={styles.faqIcon}>{openIndex === i ? '−' : '+'}</span>
              </button>
              {openIndex === i && (
                <p className={styles.faqAnswer}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
