import { FaUser } from 'react-icons/fa'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.sectionIcon}>
          <FaUser size={14} color="#a1a1aa" />
        </div>
        <span className={styles.sectionTitle}>ABOUT ME</span>
      </div>

      <div className={styles.content}>
        <p>
          My journey in technology began in 2015 when I first explored programming and development.
          After a brief pause during my undergraduate years, I returned to pursue my passion in 2021
          by enrolling in B.S. Information Technology at Camarines Sur Polytechnic Colleges (CSPC).
          Now in my 3rd year, I specialize in backend development and cybersecurity.
        </p>
        <p>
          During my time working with the LGU Assessor&apos;s Office, I developed practical solutions
          to real-world problems. I created a Lot Plotter application that can scan land titles and
          calculate distances and bearings to plot land accurately. This tool helps property owners
          prevent multiple visits to the assessor office by providing precise measurements from the start.
        </p>
        <p>
          With hands-on experience in Java, PHP (Laravel, CodeIgniter 4), JavaScript (React, Node.js),
          and modern web technologies, I build secure and scalable applications. My cybersecurity
          knowledge includes penetration testing, vulnerability assessment, and security tools like
          Kali Linux, Wireshark, Burp Suite, Nmap, and OWASP ZAP.
        </p>
      </div>
    </div>
  )
}
