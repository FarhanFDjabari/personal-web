import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
