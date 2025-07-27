"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BlogPost } from "@/lib/model/blog-post"
import { fetchMediumPosts } from "@/lib/services/medium-api"
import { LINKS } from "@/lib/constants"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  async function loadPosts() {
    try {
      setLoading(true)
      setError(null)

      setError(null)

      const mediumPosts = await fetchMediumPosts('djabaridev', 10)

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Thoughts & <span className="text-primary">Writings</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on mobile development, technology trends, and software engineering best
              practices.
            </p>
          </div>

          <div className="grid gap-8">
            {posts.map((post, index) => (
              <Card key={post.link || index} className="bg-card border-border hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {formatDate(post.pubDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors">
                    <Link href={`${post.link}`} target="_blank" className="flex items-center gap-2">
                      {post.title}
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-5 text-base leading-relaxed">
                    {post.contentSnippet || post.description || 'No description available.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Want to read more?</p>
            <Link
              href={LINKS.medium}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Visit My Medium Profile
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
