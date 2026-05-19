import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContactApi } from '../server/contactApi'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await handleContactApi(req, res)
}
