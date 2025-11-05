# Portfolio Website - Nuxt.js Migration

This is a portfolio website migrated from Next.js to Nuxt.js with Vue.js.

## Features

- **Nuxt 3** with TypeScript and Vue 3 Composition API
- **Static Site Generation (SSG)** for optimal performance
- **Internationalization** (English & Indonesian)
- **Dark/Light Theme** system
- **Tailwind CSS** styling
- **GitHub & Medium API Integration**
- **Responsive Design**
- **GitHub Pages** deployment ready

## Tech Stack

- **Framework:** Nuxt 3
- **UI:** Vue 3 + Radix Vue
- **Styling:** Tailwind CSS 3
- **Package Manager:** pnpm

## Development

```bash
pnpm install
pnpm run dev        # Start dev server
pnpm run build      # Build for production
pnpm run generate   # Generate static site
```

## Deployment

Configured for automatic GitHub Pages deployment via GitHub Actions.

See `.github/workflows/deploy.yml` for deployment configuration.

## Alternative Hosting

- **Netlify** (Recommended) - Full SSR support
- **Cloudflare Pages** - Edge functions
- **Vercel** - Original hosting option
- **Railway** - Modern platform

## License

MIT
