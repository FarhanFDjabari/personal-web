# Personal Portfolio Website

A modern, responsive portfolio website built with **Nuxt 3** and **Vue.js**. Previously built with Next.js + React, now fully migrated to the Vue ecosystem.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/FarhanFDjabari/personal-web)

## ✨ Features

- 🚀 **Nuxt 3** with TypeScript and Vue 3 Composition API
- 🎨 **Tailwind CSS** for modern, responsive design
- 🌍 **Internationalization** (English & Indonesian)
- 🌙 **Dark/Light Theme** with system preference detection
- 📝 **Medium Blog Integration** with automatic read time calculation
- 💻 **GitHub Projects** showcase via API integration
- ⚡ **Static Site Generation** for optimal performance
- 🎯 **SEO Optimized** with meta tags and Open Graph
- 📱 **Fully Responsive** mobile-first design
- ♿ **Accessible** with ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Framework:** Nuxt 3
- **UI Library:** Vue 3 with Composition API
- **Styling:** Tailwind CSS 3
- **UI Components:** Radix Vue
- **Icons:** Lucide Icons via @nuxt/icon
- **Internationalization:** @nuxtjs/i18n
- **Theme Management:** @nuxtjs/color-mode
- **Package Manager:** pnpm
- **TypeScript:** Full type safety

## 📁 Project Structure

```
personal-web/
├── nuxt-app/              # Nuxt 3 application
│   ├── app/
│   │   └── assets/        # Global styles and assets
│   ├── components/        # Vue components
│   │   ├── ui/           # Reusable UI components
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── HeroSection.vue
│   │   ├── ProjectsSection.vue
│   │   ├── BlogSection.vue
│   │   └── ContactSection.vue
│   ├── pages/            # Application pages
│   │   ├── index.vue    # Home page
│   │   └── blog.vue     # Blog listing page
│   ├── server/
│   │   └── api/         # API endpoints
│   │       ├── github/  # GitHub API integration
│   │       └── medium/  # Medium API integration
│   ├── locales/         # i18n translation files
│   ├── lib/             # Business logic and services
│   ├── utils/           # Utility functions
│   ├── public/          # Static assets
│   └── nuxt.config.ts   # Nuxt configuration
├── netlify.toml         # Netlify deployment config
├── LICENSE
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/FarhanFDjabari/personal-web.git
cd personal-web/nuxt-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:3000` to see your site!

### Available Scripts

```bash
# Development
pnpm run dev          # Start dev server

# Production
pnpm run build        # Build for production
pnpm run generate     # Generate static site
pnpm run preview      # Preview production build

# Code Quality
pnpm run postinstall  # Generate TypeScript types
```

## 🌐 Deployment to Netlify

This project is optimized for Netlify deployment with automatic builds and deploys.

### Option 1: One-Click Deploy

Click the "Deploy to Netlify" button at the top of this README to instantly deploy your own copy.

### Option 2: Manual Deployment via Netlify UI

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Import your repository:**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select this repository

3. **Configure build settings:**
   - Build command: `cd nuxt-app && pnpm install && pnpm run generate`
   - Publish directory: `nuxt-app/.output/public`
   - Node version: `18`

4. **Deploy!** Netlify will automatically build and deploy your site

### Option 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod
```

### Automatic Deployments

Once connected to Netlify, every push to your main branch will automatically trigger a new deployment.

## ⚙️ Configuration

### Runtime Configuration

Update your personal information in `nuxt-app/nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    githubUsername: 'your-github-username',
    mediumUsername: 'your-medium-username',
  },
}
```

### Personal Links

Update your social links in `nuxt-app/utils/constants.ts`:

```typescript
export const LINKS = {
  resume: 'https://your-resume-link',
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
  medium: 'https://medium.com/@your-username',
  email: 'mailto:your-email@example.com',
}
```

### Translations

Edit translation files in `nuxt-app/locales/`:
- `en.json` - English translations
- `id.json` - Indonesian translations

Add more languages by creating new JSON files and updating `nuxt.config.ts`.

## 🎨 Customization

### Styling

- **Tailwind Config:** `nuxt-app/tailwind.config.ts`
- **Global Styles:** `nuxt-app/app/assets/css/tailwind.css`
- **Color Theme:** Modify CSS variables in `tailwind.css`

### Theme Colors

The color palette uses CSS variables defined in the Tailwind config. Customize them in `nuxt-app/app/assets/css/tailwind.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;    /* Primary blue */
  --secondary: 210 40% 96%;         /* Light gray */
  /* ... more variables */
}
```

## 📊 API Routes

### GitHub Repositories API

```
GET /api/github/repositories?username={username}
```

Returns pinned GitHub repositories with stars, forks, and technologies.

### Medium Posts API

```
GET /api/medium/posts?username={username}&limit={limit}
```

Returns Medium blog posts with calculated read time and word count.

## 🔧 Alternative Hosting Options

While optimized for Netlify, this site can be deployed to:

- **Vercel** - Excellent Nuxt support, serverless functions
- **Cloudflare Pages** - Edge functions, global CDN
- **Railway** - Full-stack support
- **GitHub Pages** - Static hosting (API routes run at build time)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Nuxt 3](https://nuxt.com/)
- UI components powered by [Radix Vue](https://www.radix-vue.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/FarhanFDjabari/personal-web/issues).

## 📧 Contact

Farhan Fadhilah Djabari - [@FarhanFDjabari](https://github.com/FarhanFDjabari)

Project Link: [https://github.com/FarhanFDjabari/personal-web](https://github.com/FarhanFDjabari/personal-web)

---

**Note:** This project was migrated from Next.js + React to Nuxt.js + Vue.js while maintaining 100% feature parity.
