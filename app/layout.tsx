import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/components/locale-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FarhanFDjabari | Mobile Developer",
  description:
    "Portfolio of Farhan Fadhilah Djabari, a skilled Mobile Developer specializing in Kotlin and Flutter. Explore my projects and articles on mobile development.",
  keywords: ["Mobile Developer", "Flutter", "Kotlin", "Android", "iOS", "Portfolio"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  authors: [{ name: "DjabariDev" }],
  creator: "Farhan Fadhilah Djabari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://djabari-dev.my.id",
    title: "FarhanFDjabari | Mobile Developer",
    description: "Portfolio of Farhan Fadhilah Djabari, a skilled Mobile Developer specializing in Kotlin and Flutter.",
    siteName: "FarhanFDjabari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "FarhanFDjabari | Mobile Developer",
    description: "Portfolio of Farhan Fadhilah Djabari, a skilled Mobile Developer specializing in Kotlin and Flutter.",
  },
  generator: 'v0.dev',
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Scrollbar visibility script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let scrollTimeout;
              window.addEventListener('scroll', () => {
                document.documentElement.classList.add('scrolling');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                  document.documentElement.classList.remove('scrolling');
                }, 1000);
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem disableTransitionOnChange={false}
        >
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
