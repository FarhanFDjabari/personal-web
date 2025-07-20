"use client"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import { LocaleContext } from "@/components/locale-provider"
import { locales, localeNames, localeFlags } from "@/lib/i18n"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { locale, setLocale } = useContext(LocaleContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-3 transition-all duration-300 hover:scale-105">
          <span className="mr-2">{localeFlags[locale]}</span>
          <span className="hidden sm:inline">{localeNames[locale]}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={`cursor-pointer transition-all duration-200 ${
              locale === loc ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <span className="mr-3">{localeFlags[loc]}</span>
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
