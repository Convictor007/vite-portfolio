import type { IconType } from 'react-icons'
import {
  FaDesktop,
  FaCode,
  FaServer,
  FaCubes,
  FaWrench,
  FaShieldAlt,
  FaMobile,
  FaRocket,
  FaHtml5,
  FaCss3,
  FaJs,
  FaCoffee,
  FaDatabase,
  FaMicrochip,
  FaTerminal,
  FaBolt,
  FaExchangeAlt,
  FaFileAlt,
  FaFire,
  FaGitAlt,
  FaGithub,
  FaLaptop,
  FaPaperPlane,
  FaExclamationTriangle,
  FaLinux,
  FaEye,
  FaSpider,
  FaCrosshairs,
} from 'react-icons/fa'
import styles from './TechStackSection.module.css'

type Tech = { name: string; desc: string; icon: IconType; color: string }

const techCategories: { title: string; icon: IconType; technologies: Tech[] }[] = [
  {
    title: 'Frontend',
    icon: FaDesktop,
    technologies: [
      { name: 'React', desc: 'Component-based UI library', icon: FaCode, color: '#61DAFB' },
      { name: 'React Native', desc: 'Cross-platform mobile apps', icon: FaMobile, color: '#61DAFB' },
      { name: 'Next.js', desc: 'Production-grade React framework', icon: FaRocket, color: '#ffffff' },
      { name: 'HTML5', desc: 'Modern web markup', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', desc: 'Modern web styling', icon: FaCss3, color: '#1572B6' },
      { name: 'TypeScript', desc: 'Static type safety', icon: FaCode, color: '#3178C6' },
    ],
  },
  {
    title: 'Languages',
    icon: FaCode,
    technologies: [
      { name: 'JavaScript', desc: 'Web & server-side programming', icon: FaJs, color: '#F7DF1E' },
      { name: 'TypeScript', desc: 'Typed JavaScript superset', icon: FaCode, color: '#3178C6' },
      { name: 'Java', desc: 'Enterprise & desktop applications', icon: FaCoffee, color: '#007396' },
      { name: 'PHP', desc: 'Server-side scripting', icon: FaServer, color: '#777BB4' },
      { name: 'C++', desc: 'Systems & application development', icon: FaMicrochip, color: '#00599C' },
      { name: 'SQL', desc: 'Database query language', icon: FaDatabase, color: '#336791' },
    ],
  },
  {
    title: 'Backend',
    icon: FaServer,
    technologies: [
      { name: 'Node.js', desc: 'Server-side JavaScript runtime', icon: FaTerminal, color: '#339933' },
      { name: 'Express.js', desc: 'Server-side framework', icon: FaBolt, color: '#ffffff' },
      { name: 'REST APIs', desc: 'API design & development', icon: FaExchangeAlt, color: '#6366f1' },
      { name: 'JSON', desc: 'Data interchange format', icon: FaFileAlt, color: '#4CAF50' },
    ],
  },
  {
    title: 'Frameworks',
    icon: FaCubes,
    technologies: [
      { name: 'Laravel', desc: 'PHP web framework', icon: FaCode, color: '#FF2D20' },
      { name: 'CodeIgniter 4', desc: 'Lightweight PHP framework', icon: FaFire, color: '#DD4814' },
      { name: 'Next.js', desc: 'React framework with SSR', icon: FaRocket, color: '#ffffff' },
      { name: 'React Native', desc: 'Mobile app framework', icon: FaMobile, color: '#61DAFB' },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: FaWrench,
    technologies: [
      { name: 'Git', desc: 'Distributed version control', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', desc: 'Version control hosting', icon: FaGithub, color: '#ffffff' },
      { name: 'VSCode', desc: 'Primary development environment', icon: FaLaptop, color: '#007ACC' },
      { name: 'Postman', desc: 'API testing & development', icon: FaPaperPlane, color: '#FF6C37' },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: FaShieldAlt,
    technologies: [
      { name: 'OWASP Top 10', desc: 'Web security vulnerabilities', icon: FaExclamationTriangle, color: '#FF9900' },
      { name: 'Kali Linux', desc: 'Penetration testing OS', icon: FaLinux, color: '#2777B8' },
      { name: 'Wireshark', desc: 'Network protocol analyzer', icon: FaEye, color: '#009639' },
      { name: 'Burp Suite', desc: 'Web vulnerability scanner', icon: FaSpider, color: '#FF6633' },
      { name: 'Nmap', desc: 'Network discovery & security', icon: FaCrosshairs, color: '#4CAF50' },
      { name: 'OWASP ZAP', desc: 'Web app security scanner', icon: FaShieldAlt, color: '#7B68EE' },
    ],
  },
]

function techColorWithOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export default function TechStackSection() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>
          Tech <span className={styles.gradientText}>Stack</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Technologies and tools organized by domain expertise
        </p>
      </header>

      <div className={styles.categories}>
        {techCategories.map((category) => (
          <section key={category.title} className={styles.category}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIconContainer}>
                <category.icon size={20} color="#6366f1" />
              </div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </div>

            <div className={styles.techGrid}>
              {category.technologies.map((tech) => {
                const Icon = tech.icon
                return (
                  <article
                    key={tech.name}
                    className={styles.techCard}
                    style={{ borderColor: techColorWithOpacity(tech.color, 0.3) }}
                  >
                    <div
                      className={styles.iconBox}
                      style={{ borderColor: techColorWithOpacity(tech.color, 0.3) }}
                    >
                      <Icon size={22} color={tech.color} />
                    </div>
                    <div>
                      <h4 className={styles.techName}>{tech.name}</h4>
                      <p className={styles.techDesc}>{tech.desc}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
