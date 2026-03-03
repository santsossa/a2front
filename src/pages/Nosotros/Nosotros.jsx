import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './Nosotros.module.css'

const Icon = ({ size = 24, children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    {children}
  </svg>
)

const DOCS = [
  {
    id: 1,
    title: 'Acta de Posesión Asegura2.com',
    desc: 'Acta oficial de posesión de Asegura2.com Agencia de Seguros Ltda. ante la Superintendencia Financiera de Colombia.',
    file: '/docs/acta-posesion-asegura2.com-agencia-de-seguros-ltda.pdf',
  },
  {
    id: 2,
    title: 'Admisión 2025',
    desc: 'Documento de admisión — Expediente 2025-06-008510.',
    file: '/docs/admision_2025-06-008510.pdf',
  },
  {
    id: 3,
    title: 'Anexo Demandas (10 DIC 25)',
    desc: 'Relación de demandas vigentes con corte al 10 de diciembre de 2025.',
    file: '/docs/anexo-demandas-10-dic-25.pdf',
  },
  {
    id: 4,
    title: 'Anexo Pasivos (10 DIC 25)',
    desc: 'Relación de pasivos con corte al 10 de diciembre de 2025.',
    file: '/docs/anexo-pasivos-10-dic-25.pdf',
  },
  {
    id: 5,
    title: 'Calificación y Graduación',
    desc: 'Documento de calificación y graduación de créditos en el proceso ante la Superintendencia Financiera.',
    file: '/docs/calificacion-y-graduacion.pdf',
  },
  {
    id: 6,
    title: 'Derechos de Voto',
    desc: 'Documento que establece los derechos de voto en el proceso ante la Superintendencia Financiera de Colombia.',
    file: '/docs/derechos-de-voto.pdf',
  },
  {
    id: 7,
    title: 'Documentos Remitidos por Asegura',
    desc: 'Puesta en conocimiento de los documentos remitidos — Expediente 2026-06-000153.',
    file: '/docs/pon-en-conocimiento-documentos-remitidos-por-asegura_2026-06-000153.pdf',
  },
  {
    id: 8,
    title: 'Aviso 2025',
    desc: 'Aviso oficial ante la Superintendencia Financiera de Colombia — Expediente 2025-06-008705.',
    file: '/docs/aviso_2025-06-008705.pdf',
  },
]

const VALUES = [
  {
    title: 'Transparencia',
    desc: 'Antes de que tomes una decisión, recibes un comparativo claro con coberturas, exclusiones y precio real de cada opción. Nunca vendemos una póliza sin que sepas exactamente qué estás comprando.',
    icon: (
      <Icon size={28}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </Icon>
    ),
  },
  {
    title: 'Independencia',
    desc: 'No somos el canal de ventas de ninguna aseguradora. Nuestra única lealtad es contigo. Cuando te recomendamos una opción, es porque genuinamente es la mejor para tu situación, no porque nos genere mayor comisión.',
    icon: (
      <Icon size={28}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </Icon>
    ),
  },
  {
    title: 'Respaldo',
    desc: 'Nuestro trabajo no termina cuando firmas la póliza. Estamos disponibles para resolver dudas, gestionar novedades y acompañarte en el proceso de cualquier siniestro, de principio a fin.',
    icon: (
      <Icon size={28}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </Icon>
    ),
  },
]

export default function Nosotros() {
  const [openDoc, setOpenDoc] = useState(null)

  useEffect(() => {
    if (!openDoc) return
    const onKey = (e) => { if (e.key === 'Escape') setOpenDoc(null) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openDoc])

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className="sectionEyebrow">Quiénes somos</span>
            <h1 className={styles.heroTitle}>
              Intermediarios de seguros al servicio del <span className="highlight">cliente</span>
            </h1>
            <div className={styles.heroCopy}>
              <p>
                Somos una agencia de seguros registrada ante la Superintendencia Financiera de Colombia,
                constituida con un propósito claro: poner al cliente en el centro de cada decisión.
                Operamos de manera independiente — no pertenecemos a ninguna compañía aseguradora —
                lo que nos permite comparar el mercado con libertad y recomendar con objetividad.
              </p>
              <p>
                Trabajamos con las principales aseguradoras del país: Sura, Allianz, Bolívar,
                AXA Colpatria, HDI, Colsanitas, Coomeva y más, para ofrecerte una cotización honesta
                y un análisis real de tus opciones antes de que tomes cualquier decisión.
              </p>
            </div>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>
                <Icon size={15}>
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </Icon>
                Registrados ante la SFC
              </span>
              <span className={styles.badge}>
                <Icon size={15}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </Icon>
                Intermediario independiente
              </span>
              <span className={styles.badge}>
                <Icon size={15}>
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </Icon>
                Proceso 100% digital
              </span>
            </div>
          </div>
        </section>

        <section className={styles.valuesSection}>
          <div className={`container ${styles.valuesInner}`}>
            <h2 className={`sectionTitle ${styles.valuesTitle}`}>Lo que nos define</h2>
            <div className={styles.valuesGrid}>
              {VALUES.map(v => (
                <div key={v.title} className={styles.valueCard}>
                  <div className={styles.valueIconWrap}>{v.icon}</div>
                  <div className={styles.valueText}>
                    <h3 className={styles.valueCardTitle}>{v.title}</h3>
                    <p className={styles.valueCardDesc}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.legalSection}>
          <div className={`container ${styles.legalInner}`}>
            <span className="sectionEyebrow">Cumplimiento regulatorio</span>
            <h2 className={`sectionTitle ${styles.legalTitle}`}>Documentos públicos</h2>
            <p className={styles.legalSub}>
              Conforme a la normativa vigente, ponemos a disposición del público los documentos
              institucionales exigidos por ley. Haz clic en cualquier documento para consultarlo
              directamente desde esta página.
            </p>

            <div className={styles.docsGrid}>
              {DOCS.map(doc => (
                <button
                  key={doc.id}
                  className={styles.docCard}
                  onClick={() => setOpenDoc(doc)}
                >
                  <div className={styles.docCardTop}>
                    <span className={styles.pdfBadge}>
                      <Icon size={13}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </Icon>
                      PDF
                    </span>
                  </div>
                  <h3 className={styles.docTitle}>{doc.title}</h3>
                  <p className={styles.docDesc}>{doc.desc}</p>
                  <span className={styles.docCta}>
                    Ver documento
                    <Icon size={14}>
                      <polyline points="9 18 15 12 9 6"/>
                    </Icon>
                  </span>
                </button>
              ))}
            </div>

            <p className={styles.legalNote}>
              Si tienes dificultades para acceder a alguno de estos documentos, escríbenos a{' '}
              <a href="mailto:info@asegura2.com.co">info@asegura2.com.co</a>
            </p>
          </div>
        </section>

      </main>
      <Footer />

      {openDoc && (
        <div className={styles.modalOverlay} onClick={() => setOpenDoc(null)}>
          <div className={styles.modalPanel} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleWrap}>
                <span className={styles.pdfBadge}>
                  <Icon size={13}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </Icon>
                  PDF
                </span>
                <span className={styles.modalTitle}>{openDoc.title}</span>
              </div>
              <div className={styles.modalActions}>
                <a
                  href={openDoc.file}
                  download
                  className={styles.modalDownload}
                  onClick={e => e.stopPropagation()}
                >
                  <Icon size={15}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </Icon>
                  Descargar
                </a>
                <button
                  className={styles.modalClose}
                  onClick={() => setOpenDoc(null)}
                  aria-label="Cerrar"
                >
                  <Icon size={18}>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </Icon>
                </button>
              </div>
            </div>
            <div className={styles.modalViewer}>
              <iframe
                src={openDoc.file}
                title={openDoc.title}
                className={styles.pdfFrame}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
