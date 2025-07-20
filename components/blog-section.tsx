"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { FadeInSection } from "@/components/fade-in-section"
import { useTranslation } from "@/hooks/use-translation"
import { fetchMediumPosts } from "@/lib/services/medium-api"
import { useEffect, useState } from "react"
import { LINKS } from "@/lib/constants"
import { BlogPost } from "@/lib/model/blog-post"

export function BlogSection() {
  const { t } = useTranslation()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  async function loadPosts(forceRefresh: boolean = false) {
    try {
      if (forceRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const mediumPosts = await fetchMediumPosts('djabaridev', 3, forceRefresh)

      if (mediumPosts.length > 0) {
        setPosts(mediumPosts)
      } else {
        setPosts([])
        setError('Using cached posts')
      }
    } catch (error) {
      console.error('Failed to load Medium posts:', error)
      setPosts([])
      setError('Medium API unavailable - showing sample posts')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-24 px-4 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading latest blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("blog.title")} <span className="text-primary">{t("blog.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <FadeInSection key={post.link || index} delay={index * 200}>
              <Card className="bg-card border-border hover:border-primary transition-all duration-500 hover:shadow-lg group hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.pubDate)}
                  </div>
                  <CardTitle className="text-xl text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {post.description || post.contentSnippet}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/20 text-primary text-xs transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${tagIndex * 100}ms` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.categories.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/20 text-primary text-xs transition-all duration-300 hover:scale-105"
                      >
                        +{post.categories.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                {post.link !== "#" && (
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="w-full transition-all duration-300 hover:scale-100 rounded-b-lg rounded-t-none flex items-center justify-center"
                  >
                    <Link href={post.link} target="_blank">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={600}>
          <div className="text-center space-y-6">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/blog">
                {t("blog.viewAll")}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-muted-foreground">
              {t("blog.findMeOn")}{" "}
              <Link
                href={LINKS.medium}
                target="_blank"
                className="text-primary hover:underline transition-all duration-300 hover:scale-105 inline-block"
              >
                {t("blog.medium")}
              </Link>
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
