import Navigation from '@/components/portfolio/Navigation'
import HeroSection from '@/components/portfolio/HeroSection'
import AboutSection from '@/components/portfolio/AboutSection'
import TechStackSection from '@/components/portfolio/TechStackSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import ContactSection from '@/components/portfolio/ContactSection'
import Footer from '@/components/portfolio/Footer'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.page}>
      <Navigation />

      <main className={styles.main}>
        <div className={styles.bgGlow1} aria-hidden />
        <div className={styles.bgGlow2} aria-hidden />

        <section id="home">
          <HeroSection />
        </section>

        <section id="about" className={styles.sectionDark}>
          <AboutSection />
        </section>

        <section id="techstack">
          <TechStackSection />
        </section>

        <section id="projects" className={styles.sectionDark}>
          <ProjectsSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>

        <Footer />
      </main>
    </div>
  )
}


