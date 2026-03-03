import styles from './Partners.module.css'

const PARTNERS = [
  { logo: '/images/logos/equidad.png',  name: 'Equidad Seguros'      },
  { logo: '/images/logos/estado.png',   name: 'Seguros del Estado'   },
  { logo: '/images/logos/axa.png',      name: 'AXA Colpatria'        },
  { logo: '/images/logos/hdi.png',      name: 'HDI Seguros'          },
  { logo: '/images/logos/allianz.png',  name: 'Allianz'              },
  { logo: '/images/logos/sbs.png',      name: 'SBS Seguros'          },
  { logo: '/images/logos/bolivar.png',  name: 'Seguros Bolívar'      },
  { logo: '/images/logos/solidaria.png',name: 'Aseguradora Solidaria'},
  { logo: '/images/logos/mapfre.png',   name: 'Mapfre'               },
  { logo: '/images/logos/coomeva.png',  name: 'Coomeva'              },
  { logo: '/images/logos/sura.png',     name: 'Sura'                 },
]

export default function Partners() {
  return (
    <section className={styles.partners}>
      <div className="container">
        <p className={styles.label}>Respaldados por las principales aseguradoras del mercado</p>
      </div>

      {/* Ticker — full width, no container constraint */}
      <div className={styles.ticker}>
        <div className={styles.track}>
          {/* Duplicated for seamless loop */}
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className={styles.item}>
              <img
                src={p.logo}
                alt={p.name}
                className={styles.logo}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <span className={styles.name}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
