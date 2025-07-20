"use client"

import type React from "react"
import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { FadeInSection } from "@/components/fade-in-section"
import { useTranslation } from "@/hooks/use-translation"

export function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      labelKey: "contact.email",
      value: "farhanf@djabari-dev.my.id",
      href: "mailto:farhanf@djabari-dev.my.id",
    },
    {
      icon: Github,
      labelKey: "contact.github",
      value: "github.com/farhanfdjabari",
      href: "https://github.com/farhanfdjabari",
    },
    {
      icon: Linkedin,
      labelKey: "contact.linkedin",
      value: "linkedin.com/in/farhanfdjabari",
      href: "https://linkedin.com/in/farhanfdjabari",
    },
  ]

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("contact.title")} <span className="text-primary">{t("contact.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Contact Information */}
          <FadeInSection delay={400}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">{t("contact.connect.title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{t("contact.connect.description")}</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div
                    key={contact.labelKey}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <contact.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t(contact.labelKey as any)}</p>
                      <Link
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        className="text-foreground hover:text-primary transition-colors duration-300"
                      >
                        {contact.value}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
