import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProfileSection } from "@/components/profile-section"
import { ProjectsSection } from "@/components/projects-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingElements } from "@/components/floating-elements"
import { getPinnedRepositories } from "@/lib/services/github-repositories"

export default async function Home() {
  const projects = await getPinnedRepositories("farhanfdjabari").catch(() => [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <ProfileSection />
        <ProjectsSection initialProjects={projects} />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
