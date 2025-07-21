"use client"

import Link from "next/link"
import { Github, Linkedin, Heart } from "lucide-react"
import { FadeInSection } from "@/components/fade-in-section"
import { useTranslation } from "@/hooks/use-translation"
import { LINKS } from "@/lib/constants"

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: LINKS.github, label: "GitHub Profile" },
    { icon: Linkedin, href: LINKS.linkedin, label: "LinkedIn Profile" },
  ]

  return (
    <footer className="bg-muted/50 border-t border-border py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm md:text-base">
                © {currentYear} FarhanFDjabari. {t("footer.madeWith")}
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
                {t("footer.and")} 🤖
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </footer>
  )
}
