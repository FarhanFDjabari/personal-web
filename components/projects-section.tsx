"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Loader2, Star, GitFork } from "lucide-react"
import Link from "next/link"
import { FadeInSection } from "@/components/fade-in-section"
import { useTranslation } from "@/hooks/use-translation"
import { LINKS } from "@/lib/constants"
import { useEffect, useState } from "react"
import { fetchPinnedRepositories } from "@/lib/services/github-api"

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  stars: number
  forks: number
}

export function ProjectsSection() {
  const { t } = useTranslation()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        setError(null)
        const githubProjects = await fetchPinnedRepositories('farhanfdjabari')
        
        if (githubProjects.length > 0) {
          setProjects(githubProjects)
        } else {
          setProjects([])
          setError('No pinned projects found')
        }
      } catch (error) {
        console.error('Failed to load projects:', error)
        setProjects([])
        setError('Failed to load GitHub data')
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading projects from GitHub...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("projects.title")} <span className="text-primary">{t("projects.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FadeInSection key={index} delay={index * 200}>
              <Card className="bg-card border-border hover:border-primary transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group hover:scale-105">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground text-base leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>
                    {(project.stars > 0 || project.forks > 0) && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground ml-4">
                        {project.stars > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            <span>{project.stars}</span>
                          </div>
                        )}
                        {project.forks > 0 && (
                          <div className="flex items-center gap-1">
                            <GitFork className="w-4 h-4" />
                            <span>{project.forks}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0,4).map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300 hover:scale-105"
                      >
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    >
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="w-4 h-4 mr-2" />
                        {t("projects.github")}
                      </Link>
                    </Button>
                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-border text-muted-foreground hover:bg-muted bg-transparent transition-all duration-300 hover:scale-105"
                      >
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("projects.liveDemo")}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
