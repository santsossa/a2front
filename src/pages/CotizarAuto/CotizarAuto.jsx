import { useState, Fragment } from 'react'
import { Link }               from 'react-router-dom'
import Navbar      from '../../components/Navbar/Navbar'
import Footer      from '../../components/Footer/Footer'
import styles      from './CotizarAuto.module.css'

/* ── helpers ── */
const formatPlate = raw =>
  raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6)

const displayPlate = plate =>
  plate.length > 3 ? plate.slice(0, 3) + ' ' + plate.slice(3) : plate

const formatPrice = n =>
  '$' + n.toLocaleString('es-CO')

const LOGOS = [
  { src: '/images/logos/bolivar.png',   alt: 'Bolívar'    },
  { src: '/images/logos/allianz.png',   alt: 'Allianz'    },
  { src: '/images/logos/axa.png',       alt: 'AXA'        },
  { src: '/images/logos/hdi.png',       alt: 'HDI'        },
  { src: '/images/logos/equidad.png',   alt: 'La Equidad' },
  { src: '/images/logos/solidaria.png', alt: 'Solidaria'  },
  { src: '/images/logos/estado.png',    alt: 'El Estado'  },
  { src: '/images/logos/sbs.png',       alt: 'SBS'        },
]

/* ── Datos de planes ── */
const FULL_PLANS = [
  {
    id: 'f1', company: 'Bolívar', logo: '/images/logos/bolivar.png', price: 4716061,
    main: [
      'Responsabilidad civil hasta $4.000 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: 1 SMLV ó 10%',
    ],
    extras: [
      'Asistencia jurídica penal y civil', 'Protección patrimonial',
      'Accidentes personales hasta $50 millones', 'Gastos de transporte pérdida total',
      'Vehículo de reemplazo', 'Grúa y carro taller', 'Conductor elegido',
      'Pequeños accesorios', 'Llantas estalladas y rotura de vidrios',
      'Asistencia en viajes', 'Pérdida de llaves',
    ],
  },
  {
    id: 'f2', company: 'Allianz', logo: '/images/logos/allianz.png', price: 3831023,
    main: [
      'Responsabilidad civil hasta $4.000 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: 1 SMLV ó 10%',
    ],
    extras: [
      'Asistencia jurídica penal y civil', 'Protección patrimonial',
      'Accidentes personales hasta $50 millones', 'Gastos de transporte pérdida total',
      'Vehículo de reemplazo', 'Grúa y carro taller', 'Conductor elegido',
      'Pequeños accesorios', 'Llantas estalladas y rotura de vidrios',
      'Grúa y transporte a ocupantes', 'Asistencia en viajes', 'Pérdida de llaves',
    ],
  },
  {
    id: 'f3', company: 'AXA', logo: '/images/logos/axa.png', price: 3304703,
    main: [
      'Responsabilidad civil hasta $4.000 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: $900.000',
    ],
    extras: [
      'Asistencia jurídica penal y civil', 'Protección patrimonial',
      'Accidentes personales hasta $50 millones', 'Gastos de transporte pérdida total',
      'Vehículo de reemplazo', 'Grúa y carro taller', 'Conductor elegido',
      'Pérdida de llaves', 'Pequeños accesorios', 'Llantas estalladas y rotura de vidrios',
    ],
  },
  {
    id: 'f4', company: 'HDI', logo: '/images/logos/hdi.png', price: 4357020,
    main: [
      'Responsabilidad civil hasta $4.000 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: $1.276.000',
    ],
    extras: [
      'Asistencia jurídica penal y civil', 'Protección patrimonial',
      'Accidentes personales hasta $50 millones', 'Gastos de transporte pérdida total',
      'Vehículo de reemplazo', 'Grúa y carro taller', 'Asistencia plus',
      'Conductor elegido', 'Asistencia en viajes', 'Pequeños accesorios',
      'Pérdida de llaves', 'Llantas estalladas y rotura de vidrios',
    ],
  },
  {
    id: 'f5', company: 'La Equidad', logo: '/images/logos/equidad.png', price: 2603831,
    main: [
      'Responsabilidad civil hasta $4.000 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: $800.000',
    ],
    extras: [
      'Asistencia jurídica penal y civil', 'Protección patrimonial',
      'Accidentes personales', 'Gastos de transporte pérdida total',
      'Vehículo de reemplazo', 'Grúa y carro taller', 'Conductor elegido',
      'Pequeños accesorios', 'Llantas estalladas y rotura de vidrios',
      'Asistencia en viajes', 'Pérdida de llaves',
    ],
  },
]

const BASIC_PLANS = [
  {
    id: 'b1', company: 'Solidaria', logo: '/images/logos/solidaria.png', price: 4581882,
    main: [
      'Responsabilidad civil hasta $800 millones',
      '100% del valor del vehículo en pérdida total o robo',
      'Deducible pérdida parcial: 1 SMLV ó 10%',
    ],
    extras: [
      'Asistencia jurídica penal y civil',
      'Protección patrimonial',
      'Asistencia en viajes',
    ],
  },
  {
    id: 'b2', company: 'El Estado', logo: '/images/logos/estado.png', price: 2351504,
    main: [
      'Responsabilidad civil extracontractual $4.000 millones',
      'Accidentes personales',
      'Grúa por accidente o varada',
    ],
    extras: [
      'Carro taller',
      'Conductor elegido',
      'Pequeños accesorios',
    ],
  },
]

/* ── Stats de resumen ── */
const _all      = [...FULL_PLANS, ...BASIC_PLANS]
const BEST_PRICE  = Math.min(..._all.map(p => p.price))
const WORST_PRICE = Math.max(..._all.map(p => p.price))
const MAX_SAVINGS = WORST_PRICE - BEST_PRICE
const TOTAL_PLANS = _all.length

/* ── Fila de plan (estilo Despegar) con expansión inline ── */
function PlanRow({ plan, isLowest, expandedId, onToggle }) {
  const cuota = Math.ceil(plan.price / 11)
  const isExpanded = expandedId === plan.id
  return (
    <div className={`${styles.planRow} ${isLowest ? styles.planRowTop : ''} ${isExpanded ? styles.planRowExpanded : ''}`}>
      {isLowest && <span className={styles.planTopBadge}>Mejor precio</span>}

      <div className={styles.planRowLogoCol}>
        <img src={plan.logo} alt={plan.company} className={styles.planRowLogo}
          onError={e => (e.currentTarget.style.display = 'none')} />
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
          <span className={styles.planPriceLabel}>Prima anual</span>
          <div className={styles.planRowAmount}>
            {formatPrice(plan.price)}<span className={styles.planRowPer}>/año</span>
          </div>
          <div className={styles.planRowCuota}>o {formatPrice(cuota)}/mes · 11 cuotas</div>
        </div>
        <button className={styles.planRowBtn}>Contratar →</button>
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
              <div className={styles.planExpLabel}>Asistencias incluidas</div>
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
              <span>100% digital</span>
              <span>Asesor experto</span>
            </div>
            <button className={styles.planExpCta}>Contratar este plan →</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   Componente principal
══════════════════════════════════════════════ */
export default function CotizarAuto() {
  const [phase,      setPhase]      = useState('landing')  // 'landing' | 'form' | 'results'
  const [plate,      setPlate]      = useState('')
  const [step,       setStep]       = useState(1)          // 1 | 2 | 3
  const [expandedId, setExpandedId] = useState(null)

  const togglePlan = id => setExpandedId(prev => prev === id ? null : id)
  const [form,  setForm]  = useState({
    nombre: '', apellido: '',
    tipoDoc: 'CC', numDoc: '', fechaNac: '',
    correo: '', ciudad: '',
  })

  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const step1Ok = form.nombre.trim().length >= 2 && form.apellido.trim().length >= 2
  const step2Ok = form.numDoc.trim().length >= 5 && form.fechaNac.length === 10
  const step3Ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo) && form.ciudad.trim().length >= 2

  function handlePlate(e) {
    e.preventDefault()
    if (plate.length >= 5) { setStep(1); setPhase('form') }
  }

  /* ── Landing ── */
  if (phase === 'landing') return (
    <div className={styles.page}>
      <Navbar hideTopBar />

      <section className={styles.fold}>
        <div className={styles.foldText}>
          <span className={styles.eyebrow}>Seguro de Auto · Colombia</span>
          <div className={styles.socialProofPill}>
            <span className={styles.socialProofDot} />
            <span>+127 personas cotizaron su seguro hoy</span>
          </div>
          <h1 className={styles.h1}>
            Compara y elige el mejor<br />
            seguro para tu carro,<br />
            <span className={styles.accent}>al mejor precio</span>
          </h1>
          <div className={styles.featureTags}>
            {[
              '13+ aseguradoras comparadas',
              'Ahorra hasta un 40%',
              'Financia hasta en 11 cuotas',
              'Asesor experto sin costo',
            ].map(t => (
              <span key={t} className={styles.featureTag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.plateCard}>
          <div className={styles.plateCardHead}>
            <h2>Ingresa la placa de tu vehículo</h2>
            <p>Comparamos +13 aseguradoras al instante, gratis</p>
          </div>
          <form onSubmit={handlePlate} className={styles.plateForm}>
            <div className={styles.plateInputWrap}>
              <div className={styles.plateFlag}>CO</div>
              <input
                className={styles.plateInput}
                placeholder="ABC 123"
                value={displayPlate(plate)}
                onChange={e => setPlate(formatPlate(e.target.value))}
                maxLength={7}
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
            </div>
            <button className={styles.ctaBtn} type="submit" disabled={plate.length < 5}>
              Cotizar mi seguro →
            </button>
          </form>
          <div className={styles.plateCardFooter}>
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
          { n: '13+',    l: 'Aseguradoras aliadas' },
          { n: '4.000+', l: 'Clientes asegurados'  },
          { n: '40%',    l: 'Ahorro máximo'         },
          { n: '100%',   l: 'Servicio gratuito'     },
        ].map(s => (
          <div key={s.l} className={styles.stat}>
            <strong>{s.n}</strong>
            <span>{s.l}</span>
          </div>
        ))}
      </div>

      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <h2 className={styles.howTitle}>Cotiza en 4 pasos simples</h2>
          <p className={styles.howSub}>Sin llamadas, sin filas, en menos de 5 minutos</p>
          <div className={styles.howSteps}>
            {[
              { n: '1', title: 'Ingresa tu placa',    desc: 'Solo necesitamos la placa de tu vehículo para empezar.' },
              { n: '2', title: 'Completa tus datos',  desc: 'Nombre, cédula y correo. Menos de 2 minutos.' },
              { n: '3', title: 'Compara precios',     desc: 'Ve los planes de +13 aseguradoras al instante.' },
              { n: '4', title: 'Contrata en línea',   desc: 'Elige el mejor plan y fírmalo 100% digital.' },
            ].map((s, i) => (
              <Fragment key={s.n}>
                <div className={styles.howStep}>
                  <div className={styles.howStepNum}>{s.n}</div>
                  <div className={styles.howStepText}>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
                {i < 3 && <div className={styles.howArrow}>→</div>}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.financingSection}>
        <div className={styles.financingLeft}>
          <span className={styles.financingEyebrow}>Exclusivo Asegura2</span>
          <h2 className={styles.financingH2}>
            Financia tu seguro<br />
            <span className={styles.financingAccent}>hasta en 11 cuotas</span>
          </h2>
          <p className={styles.financingDesc}>
            Sabemos que el pago anual puede ser un golpe fuerte al bolsillo. Por eso te ofrecemos financiación en cuotas cómodas con el respaldo de las principales aseguradoras del país.
          </p>
          <ul className={styles.financingList}>
            <li>Disponible para seguros de auto, hogar y vida</li>
            <li>Cuotas fijas desde el primer mes</li>
            <li>Proceso 100% digital, sin trámites en sucursal</li>
          </ul>
        </div>
        <div className={styles.financingRight}>
          <p className={styles.fvEyebrow}>Ejemplo ilustrativo</p>
          <div className={styles.financingVisual}>
            <div className={styles.fvLabel}>Prima anual estimada</div>
            <div className={styles.fvAmount}>$1.200.000</div>
            <div className={styles.fvDivider} />
            <div className={styles.fvRow}><span>Pago de contado</span><strong>$1.200.000</strong></div>
            <div className={styles.fvRow}><span>En 2 cuotas</span><strong className={styles.fvHighlight}>$600.000 × 2</strong></div>
            <div className={styles.fvRow}><span>Costo adicional</span><strong className={styles.fvGreen}>$0</strong></div>
            <div className={styles.fvNote}>Sin cargos ocultos</div>
          </div>
        </div>
      </section>

      <section className={styles.tSection}>
        <div className={styles.tQuote}>"</div>
        <div className={styles.tCard}>
          <div className={styles.tStars}>★★★★★</div>
          <p className={styles.tText}>
            Tenía seguro con Sura desde hacía 5 años y nunca había comparado. Con Asegura2 vi 8 opciones en minutos y contraté con Allianz: misma cobertura full con vehículo de reemplazo y conductor elegido, $68.000 menos al mes. El asesor me explicó cada diferencia entre pólizas sin apresurarse. La póliza quedó activa en menos de 24 horas.
          </p>
          <div className={styles.tAuthor}>
            <div className={styles.tAvatar}>CH</div>
            <div>
              <strong>Camilo Herrera</strong>
              <span>Medellín · Seguro Full Allianz · antes con Sura</span>
            </div>
          </div>
        </div>
        <div className={styles.tMiniGrid}>
          <div className={styles.tMiniCard}>
            <div className={styles.tMiniStars}>★★★★★</div>
            <p className={styles.tMiniText}>"Pensé que todos los seguros full costaban igual. En Asegura2 comparé HDI contra Bolívar y AXA, y HDI me daba el deducible más bajo con RC hasta $4.000 millones. Contraté ese mismo día y ahorré $94.000 respecto a la cotización que me había dado el concesionario."</p>
            <div className={styles.tMiniAuthor}>
              <div className={styles.tMiniAvatar}>VR</div>
              <div>
                <strong>Valentina Ruiz</strong>
                <span>Bogotá · Seguro Full HDI · Ahorro: $94.000/año</span>
              </div>
            </div>
          </div>
          <div className={styles.tMiniCard}>
            <div className={styles.tMiniStars}>★★★★★</div>
            <p className={styles.tMiniText}>"Después de un choque me di cuenta de que la RC de mi póliza anterior no alcanzaba para cubrir los daños del otro carro. Con Asegura2 comparé los límites de cobertura de cada aseguradora y elegí AXA: RC a $4.000 millones con deducible de $900.000. Ahora sí estoy tranquilo."</p>
            <div className={styles.tMiniAuthor}>
              <div className={styles.tMiniAvatar}>LM</div>
              <div>
                <strong>Luis Moreno</strong>
                <span>Cali · Seguro Full AXA · RC $4.000M</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )

  /* ── Formulario por pasos ── */
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

          <div className={styles.platePill}>
            <div className={styles.platePillInner}>
              <span className={styles.platePillCo}>CO</span>
              <span className={styles.platePillTxt}>{displayPlate(plate)}</span>
            </div>
            <button className={styles.platePillChange} onClick={() => setPhase('landing')}>
              Cambiar placa
            </button>
          </div>

          <div className={styles.stepperBar}>
            {[
              { n: 1, label: 'Sobre ti'      },
              { n: 2, label: 'Tu documento'  },
              { n: 3, label: 'Contacto'      },
            ].map((s, i) => (
              <Fragment key={s.n}>
                <div
                  className={styles.stepperItem}
                  onClick={() => step > s.n && setStep(s.n)}
                >
                  <div className={`${styles.stepperCircle} ${step === s.n ? styles.stepperCircleActive : ''} ${step > s.n ? styles.stepperCircleDone : ''}`}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span className={`${styles.stepperLabel} ${step === s.n ? styles.stepperLabelActive : ''}`}>
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`${styles.stepperLine} ${step > s.n ? styles.stepperLineDone : ''}`} />
                )}
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
                <p className={styles.stepFormSub}>Necesitamos verificar tu identidad para la póliza</p>
                <div className={styles.stepFields2}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Tipo de documento</label>
                    <select className={styles.select} value={form.tipoDoc}
                      onChange={e => setF('tipoDoc', e.target.value)}>
                      <option value="CC">Cédula de ciudadanía</option>
                      <option value="CE">Cédula de extranjería</option>
                      <option value="PA">Pasaporte</option>
                      <option value="NIT">NIT</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel}>Número de documento</label>
                    <input className={styles.input} placeholder="Ej. 1023456789" autoFocus
                      value={form.numDoc}
                      onChange={e => setF('numDoc', e.target.value.replace(/\D/g, ''))} />
                  </div>
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label className={styles.fieldLabel}>Fecha de nacimiento</label>
                  <input className={styles.input} type="date"
                    value={form.fechaNac} onChange={e => setF('fechaNac', e.target.value)} />
                </div>
                <div className={styles.stepFormActions}>
                  <button className={styles.stepBack} type="button" onClick={() => setStep(1)}>
                    ← Atrás
                  </button>
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
                    <label className={styles.fieldLabel}>Ciudad donde circula</label>
                    <input className={styles.input} placeholder="Ej. Bogotá"
                      value={form.ciudad} onChange={e => setF('ciudad', e.target.value)} />
                  </div>
                </div>
                <div className={styles.stepFormActions}>
                  <button className={styles.stepBack} type="button" onClick={() => setStep(2)}>
                    ← Atrás
                  </button>
                  <button className={styles.stepNext} type="button"
                    disabled={!step3Ok} onClick={() => setPhase('results')}>
                    Ver mis cotizaciones →
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
              <div className={styles.benefitIcon}>2'</div>
              <strong>Resultado en 2 min</strong>
              <span>Tu asesor te contacta al instante.</span>
            </div>
          </div>

          </div>

          <aside className={styles.formSidebar}>
            <div className={styles.benefitCard}>
              <div className={`${styles.benefitIcon} ${styles.benefitIconGold}`}>40%</div>
              <strong>Ahorra hasta un 40%</strong>
              <span>Comparamos +13 aseguradoras en tiempo real para que siempre pagues menos.</span>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>11</div>
              <strong>Financia en 11 cuotas</strong>
              <span>Cuotas fijas desde el primer mes.</span>
            </div>
          </aside>

          </div>

        </div>
      </div>
    </div>
  )

  /* ── Resultados ── */
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
            <span className={styles.rtbNum}>{TOTAL_PLANS}</span>
            <span className={styles.rtbLabel}>Planes Totales</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={styles.rtbNum}>{FULL_PLANS.length}</span>
            <span className={styles.rtbLabel}>Planes Full</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={styles.rtbNum}>{BASIC_PLANS.length}</span>
            <span className={styles.rtbLabel}>Planes Básicos</span>
          </div>
          <div className={styles.rtbDivider} />
          <div className={styles.rtbItem}>
            <span className={`${styles.rtbNum} ${styles.rtbGreen}`}>{formatPrice(BEST_PRICE)}</span>
            <span className={styles.rtbLabel}>mejor precio/año</span>
          </div>
        </div>
      </div>

      <div className={styles.resultsPage}>
        <div className={styles.resultsLayout}>

          <aside className={styles.resultsSidebar}>

            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Tu cotización</div>
              <div className={styles.sideField}>
                <span className={styles.sideFieldLabel}>Placa</span>
                <span className={styles.sideFieldVal}>{displayPlate(plate)}</span>
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
                <span className={styles.sideFieldLabel}>{form.tipoDoc}</span>
                <span className={styles.sideFieldVal}>{form.numDoc}</span>
              </div>
              <button className={styles.sideEditBtn} onClick={() => setPhase('form')}>
                Editar datos →
              </button>
            </div>

            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>¿Cómo funciona?</div>
              {[
                { n: '1', t: 'Comparamos para ti',    d: 'Revisamos +13 aseguradoras en tiempo real' },
                { n: '2', t: 'Te asesoramos gratis',  d: 'Un experto te guía sin costo adicional'   },
                { n: '3', t: 'Contratas en línea',    d: '100% digital, sin visitas ni papeleo'      },
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

          <div className={styles.resultsMain}>
            <section className={styles.resultsSection}>
              <div className={styles.resultsSectionHead}>
                <div>
                  <h2 className={styles.resultsSectionTitle}>Planes Full</h2>
                  <p className={styles.resultsSectionSub}>Cobertura completa con todas las asistencias</p>
                </div>
                <span className={styles.resultsSectionBadge}>{FULL_PLANS.length} opciones</span>
              </div>
              <div className={styles.plansList}>
                {[...FULL_PLANS].sort((a, b) => a.price - b.price).map((plan, i) => (
                  <PlanRow key={`full-${plan.id}`} plan={plan} isLowest={i === 0}
                    expandedId={expandedId} onToggle={togglePlan} />
                ))}
              </div>
            </section>

            <section className={styles.resultsSection}>
              <div className={styles.resultsSectionHead}>
                <div>
                  <h2 className={styles.resultsSectionTitle}>Planes Básicos</h2>
                  <p className={styles.resultsSectionSub}>Cobertura esencial al mejor precio</p>
                </div>
                <span className={styles.resultsSectionBadge}>{BASIC_PLANS.length} opciones</span>
              </div>
              <div className={styles.plansList}>
                {[...BASIC_PLANS].sort((a, b) => a.price - b.price).map((plan, i) => (
                  <PlanRow key={`basic-${plan.id}`} plan={plan} isLowest={i === 0}
                    expandedId={expandedId} onToggle={togglePlan} />
                ))}
              </div>
            </section>

            <div className={styles.whatsappWrapper}>
            <div className={styles.whatsappSection}>
              <div className={styles.whatsappIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className={styles.whatsappText}>
                <h3 className={styles.whatsappTitle}>¿Tienes dudas con tu cotización?</h3>
                <p className={styles.whatsappSub}>Un asesor experto está disponible ahora mismo para orientarte sin costo y sin compromiso.</p>
              </div>
              <a
                href="https://api.whatsapp.com/send?text=Hola, tengo dudas sobre mi cotización de seguro de auto en Asegura2"
                target="_blank"
                rel="noopener noreferrer"
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
