import styles from './HowItWorks.module.css'

const STEPS = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="13" y2="16"/>
      </svg>
    ),
    title: 'Cuéntanos qué necesitas',
    desc: 'Elige qué quieres asegurar y completa un formulario simple. Sin datos innecesarios.',
    tag: '2 minutos',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <polyline points="6 9 9 12 13 8 17 11"/>
      </svg>
    ),
    title: 'Compara y elige el mejor',
    desc: 'Cotizaciones de +13 aseguradoras al instante, ordenadas de menor a mayor precio.',
    tag: 'En segundos',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.47 2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: 'Tu asesor lo activa contigo',
    desc: 'Un experto te contacta gratis, resuelve tus dudas y activa la póliza. Sin trámites.',
    tag: '100% gratis',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">

      {/* ── Blob dorado ── */}
      <svg className={styles.blob} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 92 0 C 91 14, 76 14, 75 38 C 74 62, 53 60, 56 80 C 58 93, 53 97, 51 100 L 100 100 L 100 0 Z" />
      </svg>

      {/* ── Anillos decorativos ── */}
      <div className={styles.ringLg} aria-hidden="true" />
      <div className={styles.ringSm} aria-hidden="true" />

      {/* ══ Grupo flotante: card principal + tarjetas alrededor ══ */}
      <div className={styles.floatGroup} aria-hidden="true">

        {/* Pill – encima del card principal */}
        <div className={styles.visualPill}>
          <span className={styles.pillDot} />
          Comparando en tiempo real
        </div>

        {/* CARD PRINCIPAL de cotizaciones */}
        <div className={styles.visual}>
          <div className={styles.visualCard}>

            <div className={styles.visualHeader}>
              <span className={styles.visualHeaderLabel}>Resultados</span>
              <span className={styles.visualHeaderCount}>13 planes</span>
            </div>

            <div className={styles.visualRows}>
              {[
                { name: 'Allianz',  bar: 80, price: '$89.000',  best: false },
                { name: 'Bolívar',  bar: 57, price: '$67.000',  best: true  },
                { name: 'Equidad',  bar: 72, price: '$79.000',  best: false },
                { name: 'HDI',      bar: 94, price: '$102.000', best: false },
              ].map(r => (
                <div key={r.name} className={`${styles.visualRow} ${r.best ? styles.visualRowBest : ''}`}>
                  <span className={styles.visualName}>{r.name}</span>
                  <div className={styles.visualBarWrap}>
                    <div className={styles.visualBarFill} style={{ width: `${r.bar}%` }} />
                  </div>
                  <span className={styles.visualPrice}>{r.price}</span>
                </div>
              ))}
            </div>

            <div className={styles.visualDivider} />

            <div className={styles.visualFooter}>
              <span className={styles.visualFooterLabel}>Ahorrás hasta</span>
              <span className={styles.visualFooterAmount}>$35.000<small>/mes</small></span>
            </div>

          </div>
          <div className={styles.visualBadge}>✓ Mejor precio</div>

          <div className={styles.visualActivated}>
            <span className={styles.activatedIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </span>
            <div>
              <p className={styles.activatedTitle}>Póliza lista</p>
              <p className={styles.activatedSub}>Actívala en minutos</p>
            </div>
          </div>
        </div>

        {/* freeBadge – debajo del card principal */}
        <div className={styles.freeBadge}>
          <span className={styles.freeBadgeIcon}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <div>
            <p className={styles.freeBadgeTitle}>Sin costo, sin sorpresas</p>
            <p className={styles.freeBadgeSub}>Comparar es 100% gratis</p>
          </div>
        </div>

        {/* Tarjetas laterales: featCard + asesorCard */}
        <div className={styles.sideCards}>
          <div className={styles.featCard}>
            {[
              { icon: '⚡', label: 'Resultado en 2 min' },
              { icon: '📱', label: '100% digital' },
              { icon: '🔒', label: 'Datos protegidos' },
            ].map(f => (
              <div key={f.label} className={styles.featRow}>
                <span className={styles.featIcon}>{f.icon}</span>
                <span className={styles.featLabel}>{f.label}</span>
                <span className={styles.featCheck}>✓</span>
              </div>
            ))}
          </div>

          <div className={styles.asesorCard}>
            <div className={styles.asesorAvatar}>JP</div>
            <div>
              <p className={styles.asesorName}>Asesor Asegura2</p>
              <p className={styles.asesorStatus}>
                <span className={styles.asesorDot} />
                Disponible ahora
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Left content ── */}
      <div className={styles.contentWrap}>
        <div className={styles.left}>
          <span className="sectionEyebrow">¿Cómo funciona?</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            Tu seguro ideal en <span className="highlight">3 pasos simples</span>
          </h2>
          <p className={styles.subtitle}>
            Sin agencias, sin filas, sin papeleos. Solo tú eligiendo con información real.
          </p>

          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.number} className={styles.step}>
                <div className={styles.stepLeft}>
                  <div className={styles.iconWrap}>
                    <span className={styles.stepNum}>{s.number}</span>
                    <div className={styles.icon}>{s.icon}</div>
                  </div>
                  {i < STEPS.length - 1 && <div className={styles.connector} />}
                </div>
                <div className={styles.body}>
                  <span className={styles.tag}>{s.tag}</span>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
