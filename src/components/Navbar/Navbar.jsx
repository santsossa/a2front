import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const PRODUCTS = [
  {
    to: '/cotizar-auto',
    label: 'Seguro de Auto',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M5 17H3a2 2 0 01-2-2v-3a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2h-2"/>
        <path d="M5 12L7.5 5h9L19 12"/>
        <circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>
      </svg>
    ),
  },
  {
    href: '/#hogar',
    label: 'Seguro de Hogar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: '/#vida',
    label: 'Seguro de Vida',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    to: '/cotizar-medicina',
    label: 'Medicina Prepagada',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    href: '/#arriendo',
    label: 'Seguro de Arrendamiento',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
        <circle cx="12" cy="16" r="1.5"/>
      </svg>
    ),
  },
]

export default function Navbar({ hideTopBar = false }) {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [productsOpen,  setProductsOpen]  = useState(false)
  const [scrolled,      setScrolled]      = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeAll = () => { setMenuOpen(false); setProductsOpen(false) }

  return (
    <>
      {/* ── Top info bar ── */}
      {!hideTopBar && (
        <div className={styles.topBar}>
          <div className={`container ${styles.topInner}`}>
            <div className={styles.topSocials}>
              <a href="#" aria-label="Facebook"  className={styles.topSocial}>f</a>
              <a href="#" aria-label="LinkedIn"  className={styles.topSocial}>in</a>
              <a href="#" aria-label="Twitter"   className={styles.topSocial}>tw</a>
              <a href="#" aria-label="Instagram" className={styles.topSocial}>ig</a>
            </div>
            <div className={styles.topContact}>
              <a href="https://wa.me/573116925385" target="_blank" rel="noopener noreferrer">📞 311 692 5385</a>
              <a href="mailto:info@asegura2.com.co">✉ info@asegura2.com.co</a>
            </div>
          </div>
        </div>
      )}

      {/* ── Main navbar ── */}
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navInner}`}>

          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeAll}>
            <img src="/images/logo-curvas.png" alt="Asegura2" className={styles.logoImg} />
          </Link>

          {/* Desktop nav */}
          <nav className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
            <Link to="/" onClick={closeAll}>Inicio</Link>

            {/* Mega menu Productos */}
            <div
              className={styles.megaWrap}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className={styles.dropdownTrigger}>
                Productos
                <svg
                  className={`${styles.dropdownArrow} ${productsOpen ? styles.dropdownArrowOpen : ''}`}
                  viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="6"
                >
                  <path d="M1 1l4 4 4-4"/>
                </svg>
              </button>

              {/* Panel flotante */}
              {productsOpen && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaPanel}>
                    <p className={styles.megaTitle}>Nuestros productos</p>
                    <div className={styles.megaDivider} />
                    <div className={styles.megaGrid}>
                      {PRODUCTS.map(p => p.to ? (
                        <Link key={p.to} to={p.to} className={styles.megaItem} onClick={closeAll}>
                          <div className={styles.megaItemIcon}>{p.icon}</div>
                          <span className={styles.megaItemLabel}>{p.label}</span>
                        </Link>
                      ) : (
                        <a key={p.href} href={p.href} className={styles.megaItem} onClick={closeAll}>
                          <div className={styles.megaItemIcon}>{p.icon}</div>
                          <span className={styles.megaItemLabel}>{p.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link to="/nosotros" onClick={closeAll}>Nosotros</Link>
            <a href="/#contacto" onClick={closeAll}>Contacto</a>
          </nav>

          <button className={styles.hamburger} aria-label="Menú" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>
    </>
  )
}
