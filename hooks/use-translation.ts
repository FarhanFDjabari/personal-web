"use client"

import { useContext } from "react"
import { LocaleContext } from "@/components/locale-provider"
import { translations, type TranslationKey } from "@/lib/translations"

export function useTranslation() {
  const { locale } = useContext(LocaleContext)

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || key
  }

  return { t, locale }
}
