import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from './Navigation.module.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const MOBILE_BREAKPOINT = 768

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.replace('#', ''))
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`${styles.container} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {!isMobile && (
            <nav className={styles.desktopNav}>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  className={`${styles.navLink} ${
                    activeSection === link.href.replace('#', '') ? styles.navLinkActive : ''
                  }`}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {isMobile && (
            <button
              type="button"
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
        </div>
      </header>

      {isMobile && isMobileMenuOpen && (
        <nav className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              className={`${styles.mobileNavLink} ${
                activeSection === link.href.replace('#', '') ? styles.mobileNavLinkActive : ''
              }`}
              onClick={() => scrollToSection(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </>
  )
}


