import { Link } from 'react-router-dom'
import styles from './Categories.module.css'

const CATS = [
  {
    label: 'Seguro de Auto',
    icon: (
      <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 30h38"/>
        <path d="M9 30l5-10h20l5 10"/>
        <path d="M14 20l2.5-6h15l2.5 6"/>
        <circle cx="15.5" cy="34" r="3.5"/>
        <circle cx="32.5" cy="34" r="3.5"/>
        <path d="M5 30v5M43 30v5"/>
      </svg>
    ),
  },
  {
    label: 'Medicina Prepagada',
    icon: (
      <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 10v11a7 7 0 0 0 14 0V10"/>
        <path d="M24 28v8c0 3.3 2.7 6 6 6"/>
        <circle cx="36" cy="38" r="3.5"/>
        <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none"/>
        <circle cx="32" cy="10" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'Seguro de Vida',
    icon: (
      <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 42C24 42 10 33 10 22V12l14-5 14 5v10c0 11-14 20-14 20z"/>
        <path d="M18.5 23c0-2 1.4-3.5 3-3.5 1 0 2 .7 2.5 1.5.5-.8 1.5-1.5 2.5-1.5 1.6 0 3 1.5 3 3.5 0 3-5.5 6.5-5.5 6.5S18.5 26 18.5 23z"/>
      </svg>
    ),
  },
  {
    label: 'Seguro de Hogar',
    icon: (
      <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 24L24 8l18 16"/>
        <path d="M11 22v18h26V22"/>
        <path d="M19 40V30h10v10"/>
        <path d="M30 12v-4h4v8"/>
      </svg>
    ),
  },
  {
    label: 'Seguro de Arrendamiento',
    icon: (
      <svg className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="22" width="32" height="20" rx="2.5"/>
        <path d="M14 22V16a10 10 0 0 1 20 0v6"/>
        <circle cx="24" cy="32" r="3"/>
        <line x1="24" y1="35" x2="24" y2="38"/>
      </svg>
    ),
  },
]

export default function Categories() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.intro}>
          <span className={styles.introArrow}>↓</span>
          <p className={styles.introText}>¿Qué quieres asegurar? Elige y cotiza gratis en segundos</p>
        </div>
        <div className={styles.grid}>
          {CATS.map((c, i) => {
            const isAuto      = c.label === 'Seguro de Auto'
            const isMedicina  = c.label === 'Medicina Prepagada'
            const CardEl      = (isAuto || isMedicina) ? Link : 'a'
            const cardProps   = isAuto
              ? { to: '/cotizar-auto' }
              : isMedicina
                ? { to: '/cotizar-medicina' }
                : { href: '#planes' }

            return (
              <CardEl
                key={c.label}
                {...cardProps}
                className={styles.card}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={styles.iconBox}>{c.icon}</div>
                <span className={styles.cardLabel}>{c.label}</span>
                <span className={styles.cta}>Cotizar →</span>
              </CardEl>
            )
          })}
        </div>
      </div>
    </div>
  )
}
