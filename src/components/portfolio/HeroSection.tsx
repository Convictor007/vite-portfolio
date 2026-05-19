import {
  FaEnvelope,
  FaGithub,
  FaMapMarkerAlt,
  FaRoad,
  FaBriefcase,
} from 'react-icons/fa'
import profilePicture from '../../images/profile-picture.jpg'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const handleContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.sideGradientLeft} aria-hidden />
      <div className={styles.sideGradientRight} aria-hidden />

      <div className={styles.heroGrid}>
        <div className={styles.content}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>OPEN FOR OPPORTUNITIES</span>
          </div>

          <h1 className={styles.name}>Darryl John Reyes</h1>
          <p className={styles.title}>
            Full Stack Web Developer & Cybersecurity Enthusiast
          </p>
          <p className={styles.description}>
            I specialize in building secure web applications using modern technologies.
            Combining my passion for development with cybersecurity best practices to create
            robust, efficient, and secure digital solutions.
          </p>

          <div className={styles.location}>
            <FaMapMarkerAlt size={14} color="#71717a" />
            <span>Camarines Sur, Philippines</span>
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.btnPrimary} onClick={handleContact}>
              <FaEnvelope size={14} />
              Get in Touch
            </button>
            <a
              className={styles.btnSecondary}
              href="https://github.com/Convictor007"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </div>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaRoad size={14} color="#a1a1aa" />
              <span className={styles.sectionTitle}>MY JOURNEY</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>CSPC - College</strong>
                <span>B.S. Information Technology</span>
              </div>
              <span className={styles.year}>2021 - Present</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>Undergraduate</strong>
                <span>Career exploration & work</span>
              </div>
              <span className={styles.year}>2017 - 2021</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>Early Exploration</strong>
                <span>First steps into programming</span>
              </div>
              <span className={styles.year}>2015 - 2017</span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FaBriefcase size={14} color="#a1a1aa" />
              <span className={styles.sectionTitle}>EXPERIENCE</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>LGU Assessor Office</strong>
                <span>Developer & System Builder</span>
              </div>
              <span className={styles.status}>2015 - 2017</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>Backend Developer</strong>
                <span>Current Focus</span>
              </div>
              <span className={styles.statusHighlight}>In Progress</span>
            </div>
          </section>
        </div>

        <aside className={styles.heroVisual} aria-label="Profile photo">
          <div className={styles.visualGlow} aria-hidden />
          <div className={styles.avatarRing}>
            <div className={styles.avatarInner}>
              <img
                src={profilePicture}
                alt="Darryl John Reyes — Full Stack Web Developer"
                className={styles.avatarImg}
                width={320}
                height={320}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
