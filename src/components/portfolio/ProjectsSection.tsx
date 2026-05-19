import type { IconType } from 'react-icons'
import {
  FaChevronDown,
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaServer,
  FaDatabase,
  FaCoffee,
  FaPlug,
  FaLock,
  FaUserGraduate,
} from 'react-icons/fa'
import lamScreenshot from '../../images/LAMscreenshot.png'
import lotPlotterScreenshot from '../../images/lot-plotter.png'
import styles from './ProjectsSection.module.css'

type Project = {
  title: string
  description: string
  tech: { name: string; icon: IconType }[]
  github: string
  live: string | null
  type: string
  previewCards: [string, string, string]
  image?: string
}

const projects: Project[] = [
  {
    title: 'Land Title Lot Plotter',
    description:
      'A web-based application that digitizes land title scanning and automatically calculates distances and bearings to plot land parcels accurately. This tool helps property owners and assessors prevent multiple office visits by providing precise land measurements and boundary calculations from the start. Built for LGU Assessor Office to streamline property assessment workflows.',
    tech: [
      { name: 'React', icon: FaCode },
      { name: 'PHP', icon: FaServer },
      { name: 'MySQL', icon: FaDatabase },
      { name: 'XAMPP', icon: FaServer },
    ],
    github: 'https://github.com/Convictor007/lot-plotter-',
    live: 'https://web-automated-lot-plotter.vercel.app',
    type: 'Work Project',
    previewCards: ['Plotting', 'Records', 'Reports'],
    image: lotPlotterScreenshot,
  },
  {
    title: 'Student Information & Payment Recording System (SIPR)',
    description:
      'A mini project for Camarines Sur Polytechnic Colleges — College of Computer Studies (BSIT 3F, Event Driven, SY 2024–2025). A secure, database-driven desktop system for teachers and ICT coordinators to manage kindergarten student profiles and payment records—including homeroom projects, miscellaneous fees, PTA projects, and other fees. Replaces manual record-keeping and receipt tracking with role-based login, paid/pending/unpaid status visibility, and tabular reports aligned with the Data Privacy Act (RA 10173). Developed for Duran Elementary School (Kindergarten, AY 2024–2025).',
    tech: [
      { name: 'Java', icon: FaCoffee },
      { name: 'MySQL', icon: FaDatabase },
      { name: 'NetBeans', icon: FaCode },
      { name: 'JDBC', icon: FaPlug },
      { name: 'Event-Driven', icon: FaUserGraduate },
      { name: 'Auth', icon: FaLock },
    ],
    github: 'https://github.com/Convictor007',
    live: null,
    type: 'Academic Project · CSPC',
    previewCards: ['Students', 'Payments', 'Status'],
    image: lamScreenshot,
  },
]

export default function ProjectsSection() {
  return (
    <div className={styles.container}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <div className={styles.arrowDown}>
          <FaChevronDown size={20} color="#6366f1" />
        </div>
      </header>

      <div className={styles.projectsContainer}>
        {projects.map((project) => {
          const PreviewIcon = project.tech[0].icon
          return (
            <article key={project.title} className={styles.projectCard}>
              <div className={styles.projectPreview}>
                <div className={styles.projectMockup}>
                  <div className={styles.mockupHeader}>
                    <div className={styles.mockupDots}>
                      <span className={styles.dotRed} />
                      <span className={styles.dotYellow} />
                      <span className={styles.dotGreen} />
                    </div>
                  </div>
                  <div
                    className={`${styles.mockupContent}${project.image ? ` ${styles.mockupContentHasImage}` : ''}`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} preview screenshot`}
                        className={styles.mockupPreviewImg}
                      />
                    ) : (
                      <>
                        <PreviewIcon size={48} color="#6366f1" />
                        <p>{project.title}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.projectDetails}>
                <div className={styles.previewCards}>
                  <span className={`${styles.previewCard} ${styles.previewPurple}`}>
                    {project.previewCards[0]}
                  </span>
                  <span className={`${styles.previewCard} ${styles.previewCyan}`}>
                    {project.previewCards[1]}
                  </span>
                  <span className={`${styles.previewCard} ${styles.previewPink}`}>
                    {project.previewCards[2]}
                  </span>
                </div>

                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <span className={styles.projectBadge}>{project.type}</span>
                  </div>

                  <p className={styles.projectDesc}>{project.description}</p>

                  <div className={styles.builtWith}>
                    <p className={styles.builtWithTitle}>Built with</p>
                    <div className={styles.techGrid}>
                      {project.tech.map((tech) => {
                        const Icon = tech.icon
                        return (
                          <span key={tech.name} className={styles.techItem}>
                            <Icon size={16} color="#6366f1" />
                            {tech.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  <div className={styles.projectLinks}>
                    <a
                      className={styles.linkBtn}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub size={16} />
                      View Code
                    </a>
                    {project.live && (
                      <a
                        className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
