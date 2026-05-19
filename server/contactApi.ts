import type { IncomingMessage, ServerResponse } from 'http'
import { isEmailConfigured, sendContactEmail } from './contactEmail'

export type ContactFormData = {
  name: string
  email: string
  subject?: string
  message: string
}

const MAX_FIELD_LENGTH = 5000

function trimField(value: string, max = MAX_FIELD_LENGTH): string {
  return value.trim().slice(0, max)
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.end(JSON.stringify(body))
}

export async function handleContactApi(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.end()
    return
  }

  if (req.method === 'GET') {
    sendJson(res, 200, {
      message: 'Contact Form API',
      endpoints: { POST: '/api/contact - Submit contact form' },
      requiredFields: ['name', 'email', 'message'],
      optionalFields: ['subject'],
      emailConfigured: isEmailConfigured(),
    })
    return
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { success: false, message: 'Method not allowed' })
    return
  }

  try {
    const raw = await readBody(req)
    const body = JSON.parse(raw) as ContactFormData

    if (!body.name || !body.email || !body.message) {
      sendJson(res, 400, {
        success: false,
        message: 'Missing required fields: name, email, and message are required',
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      sendJson(res, 400, { success: false, message: 'Invalid email format' })
      return
    }

    const payload: ContactFormData = {
      name: trimField(String(body.name), 200),
      email: trimField(String(body.email), 320),
      subject: body.subject ? trimField(String(body.subject), 200) : undefined,
      message: trimField(String(body.message)),
    }

    if (!isEmailConfigured()) {
      sendJson(res, 503, {
        success: false,
        message: 'Contact email is not configured on the server.',
      })
      return
    }

    await sendContactEmail(payload)

    sendJson(res, 200, {
      success: true,
      message: 'Message received successfully. Thank you for reaching out!',
    })
  } catch (error) {
    const code = error instanceof Error ? error.message : ''
    if (code === 'EMAIL_NOT_CONFIGURED') {
      sendJson(res, 503, {
        success: false,
        message: 'Contact email is not configured on the server.',
      })
      return
    }

    console.error('Contact form error:', error)
    sendJson(res, 500, {
      success: false,
      message: 'Failed to send message. Please try again later.',
    })
  }
}
