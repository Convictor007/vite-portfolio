import { useState } from 'react'
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
} from 'react-icons/fa'
import styles from './ContactSection.module.css'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'dareyes@my.cspc.edu.ph',
    link: 'mailto:dareyes@my.cspc.edu.ph',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Philippines',
    link: null,
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/Convictor007',
    link: 'https://github.com/Convictor007',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/darryljohn',
    link: 'https://linkedin.com',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setError(result?.message ?? 'Failed to send message. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>
          Get In <span className={styles.gradientText}>Touch</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Have a project in mind? Let&apos;s work together to bring it to life.
        </p>
      </header>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <h3 className={styles.infoTitle}>Contact Information</h3>
          <p className={styles.infoDesc}>
            Feel free to reach out through any of these channels. I&apos;m always open to
            discussing new projects and opportunities.
          </p>

          <ul className={styles.infoList}>
            {contactInfo.map((info) => {
              const Icon = info.icon
              const content = (
                <>
                  <div className={styles.infoIconContainer}>
                    <Icon size={20} color="#6366f1" />
                  </div>
                  <div>
                    <p className={styles.infoLabel}>{info.label}</p>
                    <p className={styles.infoValue}>{info.value}</p>
                  </div>
                </>
              )

              return (
                <li key={info.label}>
                  {info.link ? (
                    <a className={styles.infoItem} href={info.link} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div className={styles.infoItem}>{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Send a Message</h3>

          {success ? (
            <div className={styles.successMessage}>
              <FaCheckCircle size={48} color="#4ade80" />
              <p className={styles.successText}>Message sent successfully!</p>
              <p className={styles.successSubtext}>I&apos;ll get back to you soon.</p>
              <button type="button" className={styles.resetButton} onClick={() => setSuccess(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputRow}>
                <label className={styles.inputContainer}>
                  <span className={styles.inputLabel}>Name *</span>
                  <input
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className={styles.inputContainer}>
                  <span className={styles.inputLabel}>Email *</span>
                  <input
                    type="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </label>
              </div>

              <label className={styles.inputContainer}>
                <span className={styles.inputLabel}>Subject</span>
                <input
                  className={styles.input}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What's this about?"
                />
              </label>

              <label className={styles.inputContainer}>
                <span className={styles.inputLabel}>Message *</span>
                <textarea
                  className={`${styles.input} ${styles.textArea}`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </label>

              {error && (
                <div className={styles.errorContainer}>
                  <FaExclamationCircle size={16} color="#ef4444" />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
