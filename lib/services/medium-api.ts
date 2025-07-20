interface MediumPost {
  title: string
  link: string
  pubDate: string
  description: string
  contentSnippet: string
  categories: string[]
  guid: string
  isoDate: string
  readTime: number
  wordCount: number
}

interface CachedMediumData {
  data: MediumPost[]
  timestamp: number
  expiry: number
}

const AVERAGE_WORDS_PER_MINUTE = 200
const MIN_READ_TIME = 1

const MEDIUM_CACHE_KEY = 'medium_posts'
const MEDIUM_CACHE_DURATION = 6 * 60 * 60 * 1000

function calculateReadTime(htmlContent: string): { readTime: number; wordCount: number } {
  // Remove HTML tags and decode HTML entities
  const textContent = htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()

  // Count words (split by whitespace and filter out empty strings)
  const words = textContent.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  // Calculate read time (round up to nearest minute)
  const readTime = Math.max(MIN_READ_TIME, Math.ceil(wordCount / AVERAGE_WORDS_PER_MINUTE))

  return { readTime, wordCount }
}

async function getFullMediumContent(postUrl: string): Promise<string> {
  try {
    // Use a CORS proxy to fetch the full Medium post content
    const response = await fetch(`/api/medium/content?url=${encodeURIComponent(postUrl)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch full content')
    }
    
    const data = await response.json()
    return data.content || ''
  } catch (error) {
    console.error('Error fetching full content:', error)
    return ''
  }
}

function getCachedMediumData(): MediumPost[] | null {
  try {
    const cached = localStorage.getItem(MEDIUM_CACHE_KEY)
    if (!cached) return null

    const parsedCache: CachedMediumData = JSON.parse(cached)
    const now = Date.now()

    if (now > parsedCache.expiry) {
      localStorage.removeItem(MEDIUM_CACHE_KEY)
      return null
    }

    return parsedCache.data
  } catch (error) {
    console.error('Error reading Medium cache:', error)
    localStorage.removeItem(MEDIUM_CACHE_KEY)
    return null
  }
}

function setCachedMediumData(data: MediumPost[]): void {
  try {
    const cacheData: CachedMediumData = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + MEDIUM_CACHE_DURATION
    }
    localStorage.setItem(MEDIUM_CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Error setting Medium cache:', error)
  }
}

export async function fetchMediumPosts(username: string, limit: number = 3, forceRefresh: boolean = false): Promise<MediumPost[]> {
  // Check cache first
  if (!forceRefresh) {
    const cachedData = getCachedMediumData()
    if (cachedData) {
      console.log('Using cached Medium data')
      return cachedData.slice(0, limit)
    }
  }

  try {
    console.log('Fetching fresh Medium data')
    
    // Fetch from our API route
    const response = await fetch(`/api/medium/posts?username=${username}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts')
    }
    
    const posts: MediumPost[] = await response.json()

    const postsWithReadTime = await Promise.all(
      posts.map(async (post) => {
        try {
          // Try to get full content for more accurate read time
          const fullContent = await getFullMediumContent(post.link)
          const contentToAnalyze = fullContent || post.contentSnippet || post.description
          
          const { readTime, wordCount } = calculateReadTime(contentToAnalyze)
          
          return {
            title: post.title,
            link: post.link,
            pubDate: post.pubDate,
            contentSnippet: post.contentSnippet,
            description: post.description,
            categories: post.categories || [],
            guid: post.guid,
            isoDate: post.isoDate,
            readTime: readTime,
            wordCount: wordCount
          }
        } catch (error) {
          console.error(`Error calculating read time for ${post.title}:`, error)
          // Fallback: estimate based on contentSnippet
          const { readTime, wordCount } = calculateReadTime(post.contentSnippet || post.description || '')
          
          return {
            title: post.title,
            link: post.link,
            pubDate: post.pubDate,
            description: post.description,
            contentSnippet: post.contentSnippet,
            categories: post.categories || [],
            guid: post.guid,
            isoDate: post.isoDate,
            readTime: Math.max(MIN_READ_TIME, readTime),
            wordCount: wordCount
          }
        }
      })
    )
    
    // Cache the fresh data
    setCachedMediumData(postsWithReadTime)
    
    return postsWithReadTime.splice(0, limit)
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    
    // Try to return cached data as fallback
    const cachedData = getCachedMediumData()
    if (cachedData) {
      console.log('Using expired Medium cache as fallback')
      return cachedData.slice(0, limit)
    }
    
    return []
  }
}

export function clearMediumCache(): void {
  localStorage.removeItem(MEDIUM_CACHE_KEY)
}