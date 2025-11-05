// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Static Site Generation for GitHub Pages
  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/icon',
  ],

  // Tailwind CSS Configuration
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  // Color Mode Configuration (Dark/Light theme)
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    dataValue: 'theme',
    storageKey: 'nuxt-theme',
  },

  // Internationalization Configuration
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'id',
        iso: 'id-ID',
        name: 'Indonesian',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    vueI18n: './i18n.config.ts',
  },

  // App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Portfolio',
      meta: [
        { name: 'description', content: 'Personal portfolio website' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  // CSS
  css: ['assets/css/tailwind.css'],

  // TypeScript Configuration
  typescript: {
    strict: true,
    shim: false,
  },

  // Vite Configuration
  vite: {
    optimizeDeps: {
      include: ['radix-vue'],
    },
  },

  // Nitro Configuration for GitHub Pages
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog'],
    },
  },

  // Runtime Config (for API endpoints)
  runtimeConfig: {
    public: {
      githubUsername: 'farhanfdjabari',
      mediumUsername: 'djabaridev',
    },
  },
})
