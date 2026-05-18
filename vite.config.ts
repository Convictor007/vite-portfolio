import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { handleContactApi } from './server/contactApi'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/')) {
            next()
            return
          }

          if (req.url === '/api/contact' || req.url.startsWith('/api/contact?')) {
            await handleContactApi(req, res)
            return
          }

          if (req.url === '/api/health') {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(
              JSON.stringify({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                services: { api: 'operational' },
              }),
            )
            return
          }

          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
