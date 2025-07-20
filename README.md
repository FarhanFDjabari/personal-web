# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, featuring dynamic content integration with GitHub and Medium APIs, internationalization support, and a beautiful dark/light theme toggle.

## 🚀 Features

- **Modern Design**: Clean, professional UI built with Tailwind CSS and shadcn/ui components
- **Dynamic Content**: Automatically fetches and displays GitHub repositories and Medium blog posts
- **Internationalization**: Multi-language support with easy language switching
- **Theme Support**: Dark/light mode toggle with system preference detection
- **Responsive**: Fully responsive design that works on all devices
- **Performance**: Optimized with Next.js 15 for fast loading and great user experience
- **Animations**: Smooth animations and interactive elements for enhanced UX

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Hooks
- **API Integration**: GitHub API, Medium API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion capabilities via Tailwind
- **Package Manager**: pnpm

## 📁 Project Structure

```plaintext
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── github/        # GitHub API integration
│   │   └── medium/        # Medium API integration
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # shadcn/ui components
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
- `pnpm lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any required environment variables here
# Example:
# GITHUB_TOKEN=your_github_token
# MEDIUM_USERNAME=your_medium_username
```

### Customization

1. **Personal Information**: Update constants in `lib/constants.ts`
2. **Translations**: Modify `lib/translations.ts` for different languages
3. **Styling**: Customize themes in `app/globals.css` and Tailwind config
4. **Components**: Modify components in the `components/` directory

## 🌐 API Routes

- `/api/github/repo` - Fetch GitHub repositories
- `/api/github/pinned` - Fetch pinned repositories
- `/api/medium/posts` - Fetch Medium blog posts
- `/api/medium/content` - Fetch specific blog content

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Farhan Fadhilah Djabari - [@farhanfdjabari](https://github.com/farhanfdjabari)

Project Link: [https://github.com/FarhanFDjabari/personal-web](https://github.com/FarhanFDjabari/personal-web)

---

Built with ❤️ using Next.js and TypeScript
