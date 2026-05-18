import type { IncomingMessage, ServerResponse } from 'http'

export type ContactFormData = {
  name: string
  email: string
  subject?: string
  message: string
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
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

    const sanitizedData: ContactFormData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: body.subject ? sanitizeInput(body.subject) : undefined,
      message: sanitizeInput(body.message),
    }

    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    })

    await new Promise((resolve) => setTimeout(resolve, 500))

    sendJson(res, 200, {
      success: true,
      message: 'Message received successfully. Thank you for reaching out!',
      data: sanitizedData,
    })
  } catch {
    sendJson(res, 500, {
      success: false,
      message: 'Internal server error. Please try again later.',
    })
  }
}
