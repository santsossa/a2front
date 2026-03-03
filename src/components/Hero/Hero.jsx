import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const IMG_SRC = '/images/Imagen-1.png'

const STATS = [
  { number: '10+',  label: 'Años en el mercado' },
  { number: '4000+', label: 'Clientes activos'  },
  { number: '13+',  label: 'Compañías aliadas'  },
  { number: '100%', label: 'Servicio gratuito'  },
]

const AWARDS = [
  {
    id: 'speed',
    center: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 15.5 14"/>
      </svg>
    ),
    label: 'Cotización\nexprés',
  },
  {
    id: 'satisfaction',
    center: <span className={styles.awardBigText}>98%</span>,
    label: 'Satisfacción\ndel cliente',
  },
  {
    id: 'producer',
    center: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
        <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
        <path d="M4 22h16"/>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
        <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
      </svg>
    ),
    label: 'Mayor productor\nde pólizas',
  },
]

function Laurel({ flip }) {
  return (
    <svg
      viewBox="0 0 30 60"
      fill="currentColor"
      className={styles.laurel}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path d="M14.0947 9.35871C16.8587 9.08173 19.5519 5.86753 19.2482 1.59668C15.2005 2.17114 12.7117 6.59369 14.0947 9.35871Z"/>
      <path d="M9.84495 15.0454C11.3313 13.8755 12.8841 8.96429 9.62272 5.5204C5.42024 8.68822 8.16782 14.1711 9.84495 15.0454Z"/>
      <path d="M8.46051 23.3394C9.32182 21.6553 9.0378 16.0771 4.0246 15.0236C1.87123 19.234 6.57147 23.2461 8.46051 23.3394Z"/>
      <path d="M8.77875 32.5161C9.07611 30.648 6.91525 24.8271 1.82228 25.3781C1.0788 30.0483 6.2582 32.8936 8.77875 32.5161Z"/>
      <path d="M11.9011 41.4024C11.7067 39.4928 7.80018 34.1114 2.48796 34.954C3.04076 41.4024 10.0796 42.0072 11.9011 41.4024Z"/>
      <path d="M17.5849 49.6023C16.9542 47.5302 10.9975 42.1893 5.07298 43.8383C7.33357 50.3866 15.6209 50.5148 17.5849 49.6023Z"/>
      <path d="M24.8713 56.5979C23.8075 54.7112 17.1405 50.6749 11.7124 53.5655C14.3717 58.2824 21.3974 58.8228 24.8713 56.5979Z"/>
      <path d="M26.5857 55.0667C28.347 54.4303 30.5452 48.9804 25.9242 46.1679C21.7057 49.784 24.2179 53.7486 26.5857 55.0667Z"/>
      <path d="M19.5207 48.7717C21.3778 48.5311 24.5242 43.6143 20.6204 39.8695C15.7201 42.4882 18.3433 47.3157 19.5207 48.7717Z"/>
      <path d="M13.8978 40.9918C15.6131 41.0353 18.6613 37.4608 16.1737 33.5105C12.0313 36.0546 13.0368 39.508 13.8978 40.9918Z"/>
      <path d="M10.1811 32.3355C11.8166 32.7276 15.575 30.4957 14.2307 25.9681C9.53946 26.0767 9.8478 30.7897 10.1811 32.3355Z"/>
      <path d="M10.12 23.6177C11.3059 24.3893 16.173 23.0644 16.1718 18.8474C12.0709 17.9523 10.1563 22.2037 10.12 23.6177Z"/>
      <path d="M11.775 15.8755C12.9608 16.6471 18.1349 16.152 17.8265 11.7638C14.5411 11.176 11.8113 14.4615 11.775 15.8755Z"/>
    </svg>
  )
}

const PHRASES = [
  'en un solo lugar.',
  'en minutos.',
  'en tu computador.',
  'en tu celular.',
  'con un click.',
]

function useTyping(phrases) {
  const [text, setText] = useState(phrases[0])
  const [phase, setPhase] = useState('pause')
  const [phraseIdx, setPhraseIdx] = useState(0)

  useEffect(() => {
    let timer
    const target = phrases[phraseIdx]

    if (phase === 'pause') {
      timer = setTimeout(() => setPhase('deleting'), 2500)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(t => t.slice(0, -1)), 35)
      } else {
        setPhraseIdx(i => (i + 1) % phrases.length)
        setPhase('typing')
      }
    } else if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 55)
      } else {
        setPhase('pause')
      }
    }

    return () => clearTimeout(timer)
  }, [text, phase, phraseIdx, phrases])

  return { text, isTyping: phase !== 'pause' }
}

export default function Hero() {
  const { text, isTyping } = useTyping(PHRASES)

  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.heroInner}`}>

        {/* ── LEFT ── */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Compara todos los<br />
            Seguros del mercado<br />
            <span className={styles.titleAccent}>
              {text}
              <span className={`${styles.cursor} ${isTyping ? styles.cursorBlink : ''}`}>|</span>
            </span>
          </h1>

          <div className={styles.statsRow}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.number}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.awardsRow}>
            {AWARDS.map(a => (
              <div key={a.id} className={styles.awardCard}>
                <div className={styles.awardTop}>
                  <Laurel />
                  <div className={styles.awardCenter}>{a.center}</div>
                  <Laurel flip />
                </div>
                <p className={styles.awardLabel}>{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={styles.right}>
          <img
            src={IMG_SRC}
            alt="Comparador de seguros"
            className={styles.illustration}
          />
        </div>

      </div>
    </section>
  )
}
