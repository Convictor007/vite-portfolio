# vite-portfolio

Darryl John Reyes — Portfolio (Vite + React)

Vite + React portfolio site.

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # preview production build
```

## API (dev server)

- `POST /api/contact` — contact form
- `GET /api/health` — health check

Contact form sends email via Gmail SMTP (no database). Copy `.env.example` to `.env` for local dev, and add the same variables in the Vercel project settings for production.

## Live site

**Production:** [darryl-john-reyes.vercel.app](https://darryl-john-reyes.vercel.app)

To use your name instead of `vite-portfolio-umber-one.vercel.app`, rename the project in Vercel (see below).
