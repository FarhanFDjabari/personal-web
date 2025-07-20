"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ArrowDown } from "lucide-react"
import Image from "next/image"
import { FadeInSection } from "@/components/fade-in-section"
import { AnimatedCounter } from "@/components/animated-counter"
import { useTranslation } from "@/hooks/use-translation"
import { LINKS } from "@/lib/constants"

export function HeroSection() {
  const { t, locale } = useTranslation()

  const skills = [
    "Flutter",
    "Kotlin",
    "Dart",
    "Swift/iOS",
  ]

  const handleDownloadResume = () => {
    window.open(LINKS.resume, "_blank")
  }

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex items-center justify-center max-w-4xl mx-auto">
          {/* Centered Content */}
          <div className="space-y-8 text-center relative">
            {/* Floating animation rings - positioned around the content */}
            <div className="absolute -inset-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-primary/20 animate-ping" />
              <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full border border-primary/20 animate-pulse" />
              <div className="absolute top-0 left-1 w-32 h-32 rounded-full border border-primary/20 animate-pulse" 
                   style={{ animationDelay: "1s" }} />
            </div>

            <FadeInSection delay={200}>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-foreground">{t("hero.title")}</span>
                  <br />
                  <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent animate-pulse">
                    {t("hero.subtitle")}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {t("hero.tagline")}
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={400}>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  {t("hero.description")}
                </p>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">{t("hero.skills")}</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skills.map((skill, index) => (
                      <FadeInSection key={skill} delay={600 + index * 100}>
                        <Badge
                          variant="secondary"
                          className="bg-primary/20 text-primary hover:bg-primary/30 text-sm px-3 py-1 transition-all duration-300 hover:scale-105 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </FadeInSection>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <FadeInSection delay={800}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                    <Button
                      onClick={handleDownloadResume}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      {t("hero.downloadResume")}
                    </Button>
                    <Button
                      onClick={scrollToProjects}
                      variant="outline"
                      size="lg"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      {t("hero.viewProjects")}
                      <ArrowDown className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </FadeInSection>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <FadeInSection delay={1000}>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
