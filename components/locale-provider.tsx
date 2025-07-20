"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
})

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && (savedLocale === "en" || savedLocale === "id")) {
      setLocaleState(savedLocale)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("id")) {
        setLocaleState("id")
      }
    }
    setMounted(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    // Update document language
    document.documentElement.lang = newLocale
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
}
