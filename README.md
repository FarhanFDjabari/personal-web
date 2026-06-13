# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, featuring dynamic content integration with GitHub and Medium APIs, internationalization support, and a beautiful dark/light theme toggle.

## 🚀 Features

- **Modern Design**: Clean, professional UI built with Tailwind CSS and focused shadcn/ui components
- **Dynamic Content**: Automatically fetches and displays GitHub repositories, Medium blog posts, and imported profile data
- **Private LinkedIn Import**: Upload a LinkedIn data export ZIP from a password-protected admin page
- **Internationalization**: Multi-language support with easy language switching
- **Theme Support**: Dark/light mode toggle with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized with Next.js 15 for fast loading and great user experience
- **Animations**: Smooth animations and interactive elements for enhanced UX

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Focused shadcn/ui components with Radix primitives
- **State Management**: React Hooks
- **API Integration**: GitHub API, Medium API
- **Icons**: Lucide React
- **Animations**: Framer Motion capabilities via Tailwind
- **Package Manager**: pnpm

## 📁 Project Structure

```plaintext
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── admin/         # Private import API routes
│   │   ├── github/        # GitHub API integration
│   │   └── medium/        # Medium API integration
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── profile-section.tsx # About and experience display
│   ├── hero-section.tsx   # Hero section component
│   ├── projects-section.tsx # Projects display
│   ├── blog-section.tsx   # Blog posts display
│   └── ...                # Other components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and constants
│   ├── services/          # API service functions
│   ├── model/             # Type definitions
│   ├── translations.ts    # i18n translations
│   └── utils.ts           # Helper utilities
└── public/                # Static assets
```

## Private LinkedIn Import

The admin import page is available at `/admin/linkedin-import`. Upload the ZIP file from LinkedIn's account data export and the app will parse profile summary, experience, education, and skills.

For Vercel, configure these environment variables:

- `LINKEDIN_IMPORT_PASSWORD` - password required by the private upload page.
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob read/write token for the connected Blob store.
- `PROFILE_DATA_URL` - optional raw JSON URL if profile data should be read from a different source.

On Vercel, uploaded data is persisted as `profile/profile.json` in Vercel Blob. Local development falls back to writing `data/profile.json` directly when `BLOB_READ_WRITE_TOKEN` is not set.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/FarhanFDjabari/personal-web.git
cd personal-web
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run unit tests

## 🎨 Theme Customization

The project uses a sophisticated theming system with:

- CSS custom properties for colors
- Dark/light mode support
- System preference detection
- Smooth theme transitions

## 📱 Responsive Design

Built with mobile-first approach:

- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interactions
- Optimized performance on all devices

## 🔍 SEO & Performance

- Server-side rendering with Next.js
- Optimized images with Next.js Image component
- Meta tags and structured data
- Performance monitoring ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and TypeScript
