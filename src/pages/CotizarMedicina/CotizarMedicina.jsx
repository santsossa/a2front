import { useState, Fragment } from 'react'
import { Link }               from 'react-router-dom'
import Navbar  from '../../components/Navbar/Navbar'
import Footer  from '../../components/Footer/Footer'
import styles  from './CotizarMedicina.module.css'

/* ── helpers ── */
const formatPrice = n => '$' + n.toLocaleString('es-CO')

const calcEdad = fechaNac => {
  if (!fechaNac) return null
  const hoy = new Date()
  const nac = new Date(fechaNac)
  let edad = hoy.getFullYear() - nac.getFullYear()
  const m = hoy.getMonth() - nac.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--
  return edad
}

const LOGOS = [
  { src: '/images/logos/axa.png',     alt: 'AXA'     },
  { src: '/images/logos/coomeva.png', alt: 'Coomeva' },
  { src: '/images/logos/sura.png',    alt: 'Sura'    },
  { src: '/images/logos/bolivar.png', alt: 'Bolívar' },
]

/* ── Planes individuales ── */
const INDIVIDUAL_PLANS = [
  {
    id: 'i1', company: 'Compensar', price: 278000,
    main: [
      'Consultas médicas generales y preventivas',
      'Especialistas disponibles sin referencia',
      'Urgencias 24/7',
    ],
    extras: [
      'Hospitalización básica', 'Cirugías programadas', 'Laboratorios clínicos',
      'Imágenes diagnósticas básicas', 'Vacunación incluida', 'Optometría básica',
    ],
  },
  {
    id: 'i2', company: 'Coomeva', price: 298000,
    main: [
      'Consultas generales y especializadas',
      'Urgencias en red propia 24/7',
      'Medicina preventiva incluida',
    ],
    extras: [
      'Hospitalización', 'Cirugías', 'Laboratorios completos',
      'Imágenes diagnósticas', 'Optometría básica', 'Psicología básica',
    ],
  },
  {
    id: 'i3', company: 'Sanitas', price: 312000,
    main: [
      'Consultas médicas generales sin límite',
      'Especialistas con cita directa',
      'Urgencias 24/7 en red Sanitas',
    ],
    extras: [
      'Hospitalización', 'Cirugías programadas', 'Laboratorios',
      'Imágenes básicas', 'Odontología preventiva', 'Vacunación',
    ],
  },
  {
    id: 'i4', company: 'Colsanitas', price: 389000,
    badge: 'Más popular',
    main: [
      'Consultas médicas generales ilimitadas',
      'Especialistas sin referencia de EPS',
      'Urgencias 24/7 en toda la red',
    ],
    extras: [
      'Hospitalización y cirugía programada', 'Laboratorios clínicos completos',
      'Imágenes diagnósticas (Eco, TAC, RMN)', 'Medicina física y rehabilitación',
      'Odontología básica', 'Medicamentos ambulatorios parcial',
      'Vacunación incluida', 'Check-up preventivo anual',
    ],
  },
  {
    id: 'i5', company: 'Sura', price: 456000,
    badge: 'Cobertura premium',
    main: [
      'Consultas ilimitadas generales y especializadas',
      'Telemedicina disponible 24/7',
      'Red de clínicas de alta complejidad',
    ],
    extras: [
      'Hospitalización y UCI', 'Cirugías complejas', 'Oncología básica',
      'Laboratorios completos', 'Imágenes avanzadas (TAC, RMN)',
      'Medicamentos cubiertos', 'Odontología integral',
      'Check-up anual ejecutivo', 'Psicología incluida',
    ],
  },
]

/* ── Planes familiares ── */
const FAMILIAR_PLANS = [
  {
    id: 'f1', company: 'Sanitas', price: 780000,
    main: [
      'Cobertura familiar completa',
      'Especialistas directos para todos los miembros',
      'Urgencias 24/7 · Pediatría incluida',
    ],
    extras: [
      'Hospitalización familiar', 'Cirugías', 'Pediatría especializada',
      'Maternidad y parto', 'Laboratorios', 'Imágenes', 'Odontología preventiva', 'Vacunación',
    ],
  },
  {
    id: 'f2', company: 'Colsanitas', price: 920000,
    badge: 'Más popular',
    main: [
      'Cobertura para familia completa',
      'Especialistas sin referencia para todos',
      'Urgencias 24/7 · Maternidad y parto',
    ],
    extras: [
      'Hospitalización familiar', 'Cirugías programadas', 'Pediatría especializada',
      'Maternidad y parto', 'Neonatos', 'Odontología familiar',
      'Laboratorios completos', 'Imágenes diagnósticas', 'Vacunación familiar', 'Check-up familiar',
    ],
  },
  {
    id: 'f3', company: 'Sura', price: 1100000,
    badge: 'Premium familiar',
    main: [
      'Cobertura premium para toda la familia',
      'Telemedicina 24/7 · Red VIP de clínicas',
      'Alta complejidad · Oncología · UCI',
    ],
    extras: [
      'Hospitalización y UCI', 'Cirugías complejas', 'Oncología',
      'Maternidad premium', 'Pediatría completa', 'Neonatos',
      'Psicología familiar', 'Medicamentos cubiertos',
      'Check-up ejecutivo familiar', 'Odontología integral',
    ],
  },
]

const _all       = [...INDIVIDUAL_PLANS, ...FAMILIAR_PLANS]
const BEST_PRICE = Math.min(..._all.map(p => p.price))
const TOTAL      = _all.length

/* ── Fila de plan ── */
function PlanRow({ plan, isLowest, expandedId, onToggle }) {
  const isExpanded = expandedId === plan.id
  return (
    <div className={`${styles.planRow} ${isLowest ? styles.planRowTop : ''} ${isExpanded ? styles.planRowExpanded : ''}`}>
      {(plan.badge || isLowest) && (
        <span className={styles.planTopBadge}>{plan.badge || 'Mejor precio'}</span>
      )}

      <div className={styles.planRowLogoCol}>
        <div className={styles.planLogoText}>{plan.company.slice(0, 2).toUpperCase()}</div>
      </div>

      <div className={styles.planRowCoverages}>
        <span className={styles.planRowCompanyName}>{plan.company}</span>
        {plan.main.map((item, i) => (
          <div key={i} className={styles.planRowCovItem}>
            <span className={styles.planRowCovDot} />
            <span>{item}</span>
          </div>
        ))}
        <button className={styles.planRowExpandBtn} onClick={() => onToggle(plan.id)}>
          {isExpanded ? '↑ Ocultar coberturas' : `↓ Ver ${plan.extras.length} coberturas adicionales`}
        </button>
      </div>

      <div className={styles.planRowActions}>
        <div className={styles.planPriceBlock}>
          <span className={styles.planPriceLabel}>Mensualidad</span>
          <div className={styles.planRowAmount}>
            {formatPrice(plan.price)}<span className={styles.planRowPer}>/mes</span>
          </div>
          <div className={styles.planRowAnual}>{formatPrice(plan.price * 12)} al año</div>
        </div>
        <button className={styles.planRowBtn}>Solicitar info →</button>
      </div>

      {isExpanded && (
        <div className={styles.planExpansion}>
          <div className={styles.planExpBody}>
            <div className={styles.planExpSection}>
              <div className={styles.planExpLabel}>Coberturas principales</div>
              {plan.main.map((item, i) => (
                <div key={i} className={styles.planExpMainItem}>
                  <span className={styles.planExpDot} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.planExpSection}>
              <div className={styles.planExpLabel}>Servicios incluidos</div>
              <div className={styles.planExpGrid}>
                {plan.extras.map((item, i) => (
                  <div key={i} className={styles.planExpExtraItem}>
                    <span className={styles.planExpCheck}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.planExpFooter}>
            <div className={styles.planExpTags}>
              <span>Sin filas</span>
              <span>100% digital</span>
              <span>Asesor experto</span>
            </div>
            <button className={styles.planExpCta}>Solicitar información →</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   Componente principal
══════════════════════════════════════════ */
export default function CotizarMedicina() {
  const [phase,      setPhase]      = useState('landing')
  const [fechaNac,   setFechaNac]   = useState('')
  const [step,       setStep]       = useState(1)
  const [expandedId, setExpandedId] = useState(null)
  const [form, setForm] = useState({
    nombre: '', apellido: '',
    tipoDoc: 'CC', numDoc: '',
    correo: '', ciudad: '', telefono: '',
  })

  const togglePlan = id => setExpandedId(prev => prev === id ? null : id)
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const edad = calcEdad(fechaNac)
  const edadValida = edad !== null && edad >= 0 && edad <= 80

  const step1Ok = form.nombre.trim().length >= 2 && form.apellido.trim().length >= 2
  const step2Ok = form.numDoc.trim().length >= 5
  const step3Ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) &&
                  form.ciudad.trim().length >= 2 &&
                  form.telefono.trim().length >= 7

  function handleFechaNac(e) {
    e.preventDefault()
    if (edadValida) { setStep(1); setPhase('form') }
  }

  /* ════════════════════════════ LANDING ════════════════════════════ */
  if (phase === 'landing') return (
    <div className={styles.page}>
      <Navbar hideTopBar />

      <section className={styles.fold}>
        <div className={styles.foldText}>
          <span className={styles.eyebrow}>Medicina Prepagada · Colombia</span>
          <div className={styles.socialProofPill}>
            <span className={styles.socialProofDot} />
            <span>+89 personas solicitaron su plan hoy</span>
          </div>
          <h1 className={styles.h1}>
            Deja las filas de la EPS.<br />
            Accede a especialistas<br />
            <span className={styles.accent}>cuando los necesites.</span>
          </h1>
          <p className={styles.h1Sub}>Compara los mejores planes de medicina prepagada. Asesoría experta, sin costo.</p>
          <div className={styles.featureTags}>
            {[
              '4 aseguradoras comparadas',
              'Sin listas de espera',
              'Cobertura desde el primer mes',
              'Asesor sin costo',
            ].map(t => (
              <span key={t} className={styles.featureTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.dateCard}>
          <div className={styles.dateCardHead}>
            <h2>¿Cuándo naciste?</h2>
            <p>Comparamos planes de 4 aseguradoras según tu edad, gratis</p>
          </div>
          <form onSubmit={handleFechaNac} className={styles.dateForm}>
            <div className={styles.dateFieldWrap}>
              <input
                className={styles.dateInput}
                type="date"
                value={fechaNac}
                onChange={e => setFechaNac(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                min="1940-01-01"
                autoFocus
              />
              {fechaNac && edad !== null && (
                <div className={edadValida ? styles.edadPillOk : styles.edadPillErr}>
                  {edadValida ? `✓ ${edad} años` : '⚠ Edad fuera de rango (0–80)'}
                </div>
              )}
            </div>
            <button className={styles.ctaBtn} type="submit" disabled={!edadValida}>
              Ver mis opciones →
            </button>
          </form>
          <div className={styles.dateCardFooter}>
            <span>✓ Gratuito</span>
            <span>✓ Sin compromiso</span>
            <span>✓ Resultado en 2 min</span>
          </div>
        </div>

        <div className={styles.logosWrap}>
          <p className={styles.logosLabel}>Aseguradoras que comparamos</p>
          <div className={styles.logosRow}>
            {LOGOS.map(l => (
              <img key={l.alt} src={l.src} alt={l.alt} className={styles.partnerLogo}
                onError={e => (e.currentTarget.style.display = 'none')} />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.statsStrip}>
        {[
          { n: '4',       l: 'Aseguradoras comparadas'  },
          { n: '50.000+', l: 'Personas protegidas'       },
          { n: '24h',     l: 'Urgencias disponibles'     },
          { n: '100%',    l: 'Servicio gratuito'         },
        ].map(s => (
          <div key={s.l} className={styles.stat}>
            <strong>{s.n}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      {/* ── Cómo funciona ── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <h2 className={styles.howTitle}>Cotiza en 3 pasos simples</h2>
          <p className={styles.howSub}>Sin filas, sin llamadas, sin compromiso</p>
          <div className={styles.howSteps}>
            {[
              { n: '1', title: 'Ingresa tu edad',     desc: 'Tu fecha de nacimiento define el precio del plan.' },
              { n: '2', title: 'Cuéntanos sobre ti',  desc: 'Nombre, documento y correo. Menos de 2 minutos.' },
              { n: '3', title: 'Elige tu plan',        desc: 'Tu asesor te presenta las mejores opciones para ti.' },
            ].map((s, i) => (
              <Fragment key={s.n}>
                <div className={styles.howStep}>
                  <div className={styles.howStepNum}>{s.n}</div>
                  <div className={styles.howStepText}>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
                {i < 2 && <div className={styles.howArrow}>→</div>}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── EPS vs Medicina Prepagada ── */}
      <section className={styles.compSection}>
        <div className={styles.compInner}>
          <span className={styles.compEyebrow}>¿Por qué medicina prepagada?</span>
          <h2 className={styles.compTitle}>Lo que no te cuentan de la EPS</h2>
          <p className={styles.compSub}>
            Miles de colombianos están cansados de las listas de espera, la burocracia y la atención deficiente. La medicina prepagada existe para que cuides tu salud sin esas barreras.
          </p>
          <div className={styles.compGrid}>
            <div className={styles.compColHeader} />
            <div className={`${styles.compColHeader} ${styles.compColEPS}`}>
              <span className={styles.compHeaderIcon}>⚠</span> EPS
            </div>
            <div className={`${styles.compColHeader} ${styles.compColMed}`}>
              <span className={styles.compHeaderIcon}>✓</span> Medicina Prepagada
            </div>
            {[
              { label: 'Cita con especialista', eps: 'Semanas o meses',   med: 'Días u horas'        },
              { label: 'Urgencias',             eps: 'Largas esperas',    med: '24/7 sin filas'      },
              { label: 'Elección de clínica',   eps: 'Asignada por EPS', med: 'Tú eliges dónde ir'  },
              { label: 'Calidad de atención',   eps: 'Variable',          med: 'Alta y garantizada'  },
              { label: 'Medicamentos',          eps: 'Trámites y demoras',med: 'Cubiertos en el plan'},
              { label: 'Experiencia general',   eps: 'Frustrante',        med: 'Sin estrés'          },
            ].map(row => (
              <Fragment key={row.label}>
                <div className={styles.compRowLabel}>{row.label}</div>
                <div className={styles.compCellEPS}>
                  <span className={styles.compCross}>✗</span> {row.eps}
                </div>
                <div className={styles.compCellMed}>
                  <span className={styles.compCheck}>✓</span> {row.med}
                </div>
              </Fragment>
            ))}
          </div>
          <button className={styles.compCta} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Cotizar mi plan ahora →
          </button>
        </div>
      </section>

      {/* ── Testimonios ── */}
      <section className={styles.tSection}>
        <div className={styles.tQuote}>"</div>
        <div className={styles.tCard}>
          <div className={styles.tStars}>★★★★★</div>
          <p className={styles.tText}>
            Cuatro años esperando cita con el reumatólogo por la EPS, siempre cancelaciones. En Asegura2 comparé Colsanitas contra Sura y Coomeva; elegí Colsanitas porque cubría imágenes diagnósticas sin tope adicional. Tres días después tenía mi primera cita en la Clínica del Country. El asesor me leyó el contrato conmigo para que no hubiera sorpresas.
          </p>
          <div className={styles.tAuthor}>
            <div className={styles.tAvatar}>MR</div>
            <div>
              <strong>Mauricio Rincón</strong>
              <span>Bogotá · Plan Individual Colsanitas · antes en EPS Sanitas</span>
            </div>
          </div>
        </div>
        <div className={styles.tMiniGrid}>
          <div className={styles.tMiniCard}>
            <div className={styles.tMiniStars}>★★★★★</div>
            <p className={styles.tMiniText}>"Mi hija de 3 años necesitaba pediatra un domingo a las 8 pm. En la EPS no había nada hasta el martes. Llamé a la línea de Sanitas y en 40 minutos estábamos siendo atendidas en la clínica. Nunca más vuelvo a depender solo de la EPS."</p>
            <div className={styles.tMiniAuthor}>
              <div className={styles.tMiniAvatar}>LC</div>
              <div>
                <strong>Laura Cárdenas</strong>
                <span>Medellín · Plan Familiar Sanitas · Pediatría urgente</span>
              </div>
            </div>
          </div>
          <div className={styles.tMiniCard}>
            <div className={styles.tMiniStars}>★★★★★</div>
            <p className={styles.tMiniText}>"Necesitaba ecografías de control y en la EPS el turno era para dentro de 2 meses. El asesor de Asegura2 me mostró que Coomeva las cubría sin tope adicional en mi plan. Contraté, y la semana siguiente ya tenía mis exámenes listos en la clínica."</p>
            <div className={styles.tMiniAuthor}>
              <div className={styles.tMiniAvatar}>JV</div>
              <div>
                <strong>Jorge Vargas</strong>
                <span>Cali · Plan Individual Coomeva · Imágenes sin tope</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )

  /* ════════════════════════════ FORM ════════════════════════════ */
  if (phase === 'form') return (
    <div className={styles.page}>
      <header className={styles.formNav}>
        <div className={styles.formNavInner}>
          <Link to="/" className={styles.formNavLogo}>
            <img src="/images/logo-curvas.png" alt="Asegura2" className={styles.formNavImg} />
          </Link>
        </div>
      </header>

      <div className={styles.formPage}>
        <div className={styles.formContainer}>

          <div className={styles.agePill}>
            <div className={styles.agePillInner}>
              <span className={styles.agePillIcon}>🗓</span>
              <span className={styles.agePillTxt}>{edad} años · {fechaNac}</span>
            </div>
            <button className={styles.agePillChange} onClick={() => setPhase('landing')}>
              Cambiar fecha
            </button>
          </div>

          <div className={styles.stepperBar}>
            {[
              { n: 1, label: 'Sobre ti'     },
              { n: 2, label: 'Tu documento' },
              { n: 3, label: 'Contacto'     },
            ].map((s, i) => (
              <Fragment key={s.n}>
                <div className={styles.stepperItem} onClick={() => step > s.n && setStep(s.n)}>
                  <div className={`${styles.stepperCircle} ${step === s.n ? styles.stepperCircleActive : ''} ${step > s.n ? styles.stepperCircleDone : ''}`}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span className={`${styles.stepperLabel} ${step === s.n ? styles.stepperLabelActive : ''}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && <div className={`${styles.stepperLine} ${step > s.n ? styles.stepperLineDone : ''}`} />}
              </Fragment>
            ))}
          </div>

          <div className={styles.formInnerGrid}>
            <div className={styles.formLeft}>
              <div className={styles.stepForm}>

                {step === 1 && (
                  <>
                    <h2 className={styles.stepFormTitle}>Cuéntanos sobre ti</h2>
                    <p className={styles.stepFormSub}>¿Cómo te llamas?</p>
                    <div className={styles.stepFields2}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Nombre</label>
                        <input className={styles.input} placeholder="Ej. Carlos" autoFocus
                          value={form.nombre} onChange={e => setF('nombre', e.target.value)} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Apellido</label>
                        <input className={styles.input} placeholder="Ej. Martínez"
                          value={form.apellido} onChange={e => setF('apellido', e.target.value)} />
                      </div>
                    </div>
                    <div className={styles.stepFormActions}>
                      <button className={styles.stepNext} type="button"
                        disabled={!step1Ok} onClick={() => setStep(2)}>
                        Continuar →
                      </button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className={styles.stepFormTitle}>Tu documento</h2>
                    <p className={styles.stepFormSub}>Necesitamos verificar tu identidad para la cotización</p>
                    <div className={styles.stepFields2}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Tipo de documento</label>
                        <select className={styles.select} value={form.tipoDoc}
                          onChange={e => setF('tipoDoc', e.target.value)}>
                          <option value="CC">Cédula de ciudadanía</option>
                          <option value="CE">Cédula de extranjería</option>
                          <option value="PA">Pasaporte</option>
                        </select>
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Número de documento</label>
                        <input className={styles.input} placeholder="Ej. 1023456789" autoFocus
                          value={form.numDoc}
                          onChange={e => setF('numDoc', e.target.value.replace(/\D/g, ''))} />
                      </div>
                    </div>
                    <div className={styles.stepFormActions}>
                      <button className={styles.stepBack} type="button" onClick={() => setStep(1)}>← Atrás</button>
                      <button className={styles.stepNext} type="button"
                        disabled={!step2Ok} onClick={() => setStep(3)}>
                        Continuar →
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className={styles.stepFormTitle}>¿Cómo te contactamos?</h2>
                    <p className={styles.stepFormSub}>Tu asesor usará estos datos para enviarte las opciones</p>
                    <div className={styles.stepFields2}>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Correo electrónico</label>
                        <input className={styles.input} type="email" placeholder="tu@correo.com" autoFocus
                          value={form.correo} onChange={e => setF('correo', e.target.value)} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.fieldLabel}>Ciudad de residencia</label>
                        <input className={styles.input} placeholder="Ej. Bogotá"
                          value={form.ciudad} onChange={e => setF('ciudad', e.target.value)} />
                      </div>
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.fieldLabel}>Número de celular</label>
                      <input className={styles.input} type="tel" placeholder="Ej. 3001234567"
                        value={form.telefono}
                        onChange={e => setF('telefono', e.target.value.replace(/\D/g, '').slice(0, 10))} />
                    </div>
                    <div className={styles.stepFormActions}>
                      <button className={styles.stepBack} type="button" onClick={() => setStep(2)}>← Atrás</button>
                      <button className={styles.stepNext} type="button"
                        disabled={!step3Ok} onClick={() => setPhase('results')}>
                        Ver mis planes →
                      </button>
                    </div>
                    <p className={styles.privacyNote}>
                      Tus datos están protegidos · No los compartimos con terceros
                    </p>
                  </>
                )}
              </div>

              <div className={styles.benefitRow}>
                <div className={styles.benefitCard}>
                  <div className={`${styles.benefitIcon} ${styles.benefitIconGreen}`}>$0</div>
                  <strong>100% gratuito</strong>
                  <span>Sin compromiso ni cargos ocultos.</span>
                </div>
                <div className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>🏥</div>
                  <strong>Red premium</strong>
                  <span>Accede a las mejores clínicas del país.</span>
                </div>
              </div>
            </div>

            <aside className={styles.formSidebar}>
              <div className={styles.benefitCard}>
                <div className={`${styles.benefitIcon} ${styles.benefitIconGold}`}>0h</div>
                <strong>Sin filas de EPS</strong>
                <span>Especialistas disponibles en días, no en meses.</span>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>24h</div>
                <strong>Urgencias 24/7</strong>
                <span>Atención de urgencias disponible siempre.</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )

  /* ════════════════════════════ RESULTS ════════════════════════════ */
  return (
    <div className={styles.page}>
      <header className={styles.formNav}>
        <div className={styles.formNavInner}>
          <Link to="/" className={styles.formNavLogo}>
            <img src="/images/logo-curvas.png" alt="Asegura2" className={styles.formNavImg} />
          </Link>
        </div>
      </header>

      <div className={styles.resultsTopBar}>
        <div className={styles.resultsTopBarInner}>
          <div className={styles.rtbItem}>
            <span className={styles.rtbNum}>{TOTAL}</span>
            <span className={styles.rtbLabel}>Planes Totales</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={styles.rtbNum}>{INDIVIDUAL_PLANS.length}</span>
            <span className={styles.rtbLabel}>Individuales</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={styles.rtbNum}>{FAMILIAR_PLANS.length}</span>
            <span className={styles.rtbLabel}>Familiares</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={`${styles.rtbNum} ${styles.rtbGreen}`}>{formatPrice(BEST_PRICE)}</span>
            <span className={styles.rtbLabel}>desde /mes</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsPage}>
        <div className={styles.resultsLayout}>

          {/* ── Sidebar ── */}
          <aside className={styles.resultsSidebar}>
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Tu cotización</div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Edad</span>
                <span className={styles.sideFieldVal}>{edad} años</span>
              </div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Fecha de nacimiento</span>
                <span className={styles.sideFieldVal}>{fechaNac}</span>
              </div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Cotizante</span>
                <span className={styles.sideFieldVal}>{form.nombre} {form.apellido}</span>
              </div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Correo</span>
                <span className={styles.sideFieldVal}>{form.correo}</span>
              </div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Ciudad</span>
                <span className={styles.sideFieldVal}>{form.ciudad}</span>
              </div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Celular</span>
                <span className={styles.sideFieldVal}>{form.telefono}</span>
              </div>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>¿Cómo funciona?</div>
              {[
                { n: '1', t: 'Comparamos para ti',  d: 'Revisamos 4 aseguradoras en tiempo real' },
                { n: '2', t: 'Te asesoramos gratis', d: 'Un experto te guía sin costo adicional'  },
                { n: '3', t: 'Te afilias en línea',  d: '100% digital, sin visitas ni papeleo'    },
              ].map(s => (
                <div key={s.n} className={styles.sideStep}>
                  <div className={styles.sideStepNum}>{s.n}</div>
                  <div>
                    <strong>{s.t}</strong>
                    <span>{s.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Planes ── */}
          <div className={styles.resultsMain}>
            <section className={styles.resultsSection}>
              <div className={styles.resultsSectionHead}>
                <div>
                  <h2 className={styles.resultsSectionTitle}>Planes Individuales</h2>
                  <p className={styles.resultsSectionSub}>Cobertura completa solo para ti</p>
                </div>
                <span className={styles.resultsSectionBadge}>{INDIVIDUAL_PLANS.length} opciones</span>
              </div>
              <div className={styles.plansList}>
                {[...INDIVIDUAL_PLANS].sort((a, b) => a.price - b.price).map((plan, i) => (
                  <PlanRow key={plan.id} plan={plan} isLowest={i === 0}
                    expandedId={expandedId} onToggle={togglePlan} />
                ))}
              </div>
            </section>

            <section className={styles.resultsSection}>
              <div className={styles.resultsSectionHead}>
                <div>
                  <h2 className={styles.resultsSectionTitle}>Planes Familiares</h2>
                  <p className={styles.resultsSectionSub}>Cobertura completa para toda tu familia</p>
                </div>
                <span className={styles.resultsSectionBadge}>{FAMILIAR_PLANS.length} opciones</span>
              </div>
              <div className={styles.plansList}>
                {[...FAMILIAR_PLANS].sort((a, b) => a.price - b.price).map((plan, i) => (
                  <PlanRow key={plan.id} plan={plan} isLowest={i === 0}
                    expandedId={expandedId} onToggle={togglePlan} />
                ))}
              </div>
            </section>

            {/* WhatsApp CTA */}
            <div className={styles.whatsappWrapper}>
              <div className={styles.whatsappSection}>
                <div className={styles.whatsappIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className={styles.whatsappText}>
                  <h3 className={styles.whatsappTitle}>¿Tienes dudas con tu plan?</h3>
                  <p className={styles.whatsappSub}>Un asesor especialista en medicina prepagada está disponible ahora mismo, sin costo y sin compromiso.</p>
                </div>
                <a
                  href="https://api.whatsapp.com/send?text=Hola, tengo dudas sobre mi cotización de medicina prepagada en Asegura2"
                  target="_blank" rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
