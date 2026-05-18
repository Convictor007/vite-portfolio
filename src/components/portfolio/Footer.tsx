import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa'
import styles from './Footer.module.css'

const socialLinks = [
  { icon: FaGithub, url: 'https://github.com' },
  { icon: FaLinkedin, url: 'https://linkedin.com' },
  { icon: FaTwitter, url: 'https://twitter.com' },
  { icon: FaEnvelope, url: 'mailto:dareyes@my.cspc.edu.ph' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <span className={styles.logo}>DJR</span>
          <p className={styles.tagline}>
            Building digital experiences that make a difference.
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.url}
                  className={styles.socialLink}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.url}
                >
                  <Icon size={20} color="#a1a1aa" />
                </a>
              )
            })}
          </div>
        </div>

        <div className={styles.links}>
          <nav className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Navigation</h4>
            <button type="button" className={styles.link} onClick={() => scrollTo('home')}>
              Home
            </button>
            <button type="button" className={styles.link} onClick={() => scrollTo('about')}>
              About
            </button>
            <button type="button" className={styles.link} onClick={() => scrollTo('projects')}>
              Projects
            </button>
            <button type="button" className={styles.link} onClick={() => scrollTo('contact')}>
              Contact
            </button>
          </nav>

          <nav className={styles.linkColumn}>
            <h4 className={styles.columnTitle}>Connect</h4>
            <a className={styles.link} href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className={styles.link} href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className={styles.link} href="mailto:dareyes@my.cspc.edu.ph">
              Email
            </a>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {currentYear} Darryl John Reyes. All rights reserved.
        </p>
        <p className={styles.madeWith}>
          Made with <FaHeart size={12} color="#ef4444" /> and React
        </p>
      </div>
    </footer>
  )
}
