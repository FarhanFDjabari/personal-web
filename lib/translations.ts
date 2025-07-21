export type TranslationKey = keyof typeof translations.en

export const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Farhan Fadhilah Djabari",
    "hero.subtitle": "Mobile Developer",
    "hero.tagline": "Crafting clean, efficient, and user-centric mobile experiences with Kotlin and Flutter.",
    "hero.skills": "Key Skills",
    "hero.downloadResume": "Download Resume",
    "hero.viewProjects": "View Projects",

    // Projects Section
    "projects.title": "Featured",
    "projects.titleHighlight": "Projects",
    "projects.subtitle":
      "A showcase of my mobile development work, featuring applications built with Flutter and Kotlin.",
    "projects.github": "GitHub",
    "projects.liveDemo": "Live Demo",

    // Blog Section
    "blog.title": "My Thoughts &",
    "blog.titleHighlight": "Writings",
    "blog.subtitle": "Insights and tutorials on mobile development, sharing knowledge and experiences from my journey.",
    "blog.viewAll": "View All Articles",
    "blog.findMeOn": "Also find me on",
    "blog.medium": "Medium",

    // Contact Section
    "contact.title": "Get In",
    "contact.titleHighlight": "Touch",
    "contact.subtitle": "Feel free to get in touch for collaborations, opportunities, or just to say hello.",
    "contact.connect.title": "Let's Connect",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",

    // Footer
    "footer.madeWith": "Made with",
    "footer.and": "and lots of",
  },
  id: {
    // Navigation
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",

    // Hero Section
    "hero.title": "Farhan Fadhilah Djabari",
    "hero.subtitle": "Mobile Developer",
    "hero.tagline":
      "Crafting clean, efficient, and user-centric mobile experiences with Kotlin and Flutter.",
    "hero.skills": "Keahlian Utama",
    "hero.downloadResume": "Unduh Resume",
    "hero.viewProjects": "Lihat Proyek",

    // Projects Section
    "projects.title": "Proyek",
    "projects.titleHighlight": "Unggulan",
    "projects.subtitle":
      "Showcase project mobile development saya, menampilkan aplikasi yang dibangun dengan Flutter dan Kotlin.",
    "projects.github": "GitHub",
    "projects.liveDemo": "Live Demo",

    // Blog Section
    "blog.title": "Pemikiran &",
    "blog.titleHighlight": "Tulisan Saya",
    "blog.subtitle":
      "Wawasan dan tutorial tentang pengembangan mobile, berbagi pengetahuan dan pengalaman dari perjalanan saya.",
    "blog.viewAll": "Lihat Semua Artikel",
    "blog.findMeOn": "Temukan saya juga di",
    "blog.medium": "Medium",

    // Contact Section
    "contact.title": "Mari",
    "contact.titleHighlight": "Terhubung",
    "contact.subtitle": "Mari berkoneksi! Hubungi saya untuk kolaborasi, peluang, atau sekadar menyapa.",
    "contact.connect.title": "Mari Terhubung",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",

    // Footer
    "footer.madeWith": "Dibuat dengan",
    "footer.and": "dan banyak",
  },
} as const
