"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "@/hooks/use-translation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { key: "about", section: "about" },
    { key: "projects", section: "projects" },
    { key: "contact", section: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-16">
          <div className="flex justify-start">
            <Link
              href="/"
              className="text-xl font-mono font-bold text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              FarhanFDjabari
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex justify-center">
            <nav className="hidden md:flex items-center justify-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (window.location.pathname === '/blog') {
                      window.location.href = `/#${item.section}`
                    } else {
                      scrollToSection(item.section)
                    }
                  }}
                  className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 capitalize relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {t(`nav.${item.key}` as any)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative group"
              >
                {t("nav.blog")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>
          </div>

          <div className="flex justify-end">
            {/* Controls */}
            <div className="hidden md:flex items-center">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground transition-all duration-300 hover:scale-110"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (window.location.pathname === '/blog') {
                      window.location.href = `/#${item.section}`
                    } else {
                      scrollToSection(item.section)
                    }
                  }}
                  className="text-foreground hover:text-primary transition-all duration-300 text-left capitalize transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {t(`nav.${item.key}` as any)}
                </button>
              ))}
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-all duration-300 transform hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.blog")}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
