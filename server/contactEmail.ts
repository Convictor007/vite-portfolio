import nodemailer from 'nodemailer'
import type { ContactFormData } from './contactApi'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getMailConfig() {
  const host = process.env.SMTP_HOST ?? 'smtp.gmail.com'
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? user
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? user

  if (!user || !pass || !to) {
    return null
  }

  return { host, port, user, pass, to, from: from ?? user }
}

export function isEmailConfigured(): boolean {
  return getMailConfig() !== null
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const config = getMailConfig()
  if (!config) {
    throw new Error('EMAIL_NOT_CONFIGURED')
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  })

  const subjectLine = data.subject
    ? `[Portfolio] ${data.subject}`
    : `[Portfolio] Message from ${data.name}`

  const safeName = escapeHtml(data.name)
  const safeEmail = escapeHtml(data.email)
  const safeSubject = data.subject ? escapeHtml(data.subject) : '(none)'
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br>')

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.from}>`,
    to: config.to,
    replyTo: data.email,
    subject: subjectLine,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Subject: ${data.subject ?? '(none)'}`,
      '',
      data.message,
    ].join('\n'),
    html: `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <hr>
      <p>${safeMessage}</p>
    `,
  })
}
