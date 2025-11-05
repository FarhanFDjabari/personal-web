import { cleanupExpiredCache, getFromCache, setCache } from '../../../lib/services/shared-cache'
import logger from '../../../utils/logger'
import { MEDIUM_CACHE_DURATION } from '../../../utils/constants'

const AVERAGE_WORDS_PER_MINUTE = 200
const MIN_READ_TIME = 1

function calculateReadTime(htmlContent: string): { readTime: number, wordCount: number } {
  // Remove HTML tags and decode HTML entities
  const textContent = htmlContent
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, '\'') // Replace &#39; with '
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()

  // Count words (split by whitespace and filter out empty strings)
  const words = textContent.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  // Calculate read time (round up to nearest minute)
  const readTime = Math.max(MIN_READ_TIME, Math.ceil(wordCount / AVERAGE_WORDS_PER_MINUTE))

  return { readTime, wordCount }
}

async function getPostContent(postUrl: string): Promise<string> {
  try {
    const response = await fetch(postUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      },
    })

    if (!response.ok) {
      return ''
    }

    const html = await response.text()

    // Extract content from Medium's article structure
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)
    return contentMatch ? contentMatch[1] : html
  }
  catch (error) {
    logger.error('Error fetching post content', { postUrl, error })
    return ''
  }
}

export default defineEventHandler(async (event) => {
  const CACHE_KEY = 'medium_posts_full'

  const query = getQuery(event)
  const username = query.username as string
  const limit = Number.parseInt(query.limit as string || '3')

  if (!username) {
    logger.warn('Medium posts API called without username')
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  // Check cache first (cache all posts, not per limit)
  const cached = await getFromCache(`${CACHE_KEY}_${username}`)
  if (cached) {
    const arrayCached = Array.isArray(cached) ? cached : []
    logger.info('Using cached Medium posts', { username, limit, totalCached: arrayCached.length })
    const limitedPosts = arrayCached.slice(0, limit)
    setResponseHeaders(event, {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=3600',
    })
    return limitedPosts
  }

  try {
    logger.info('Fetching fresh Medium posts', { username, limit })

    // Step 1: Get posts from RSS with improved error handling
    const rssUrl = `https://medium.com/feed/@${username}`
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`

    logger.info('Requesting RSS2JSON API', { rssUrl, apiUrl })

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      },
    })

    logger.info('RSS2JSON API response received', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })

    if (!response.ok) {
      const errorText = await response.text()
      logger.error('RSS2JSON API error details', {
        status: response.status,
        statusText: response.statusText,
        errorBody: errorText,
      })
      throw new Error(`RSS2JSON API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    logger.info('RSS2JSON API response data', {
      status: data.status,
      itemCount: data.items?.length || 0,
    })

    if (data.status !== 'ok') {
      logger.error('RSS2JSON API returned error', data)
      throw new Error(`Failed to fetch RSS data: ${data.message || 'Unknown error'}`)
    }

    if (!data.items || data.items.length === 0) {
      logger.warn('No Medium posts found', { username })
      return []
    }

    // Step 2: Process ALL posts with read time calculation (don't limit here)
    const processedPosts = await Promise.all(
      data.items.map(async (item: any) => {
        try {
          // Get full content for more accurate read time
          const fullContent = await getPostContent(item.link)
          const contentToAnalyze = fullContent || item.description || ''

          const { readTime, wordCount } = calculateReadTime(contentToAnalyze)

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description,
            contentSnippet: item.description.replace(/<[^>]*>/g, ''),
            categories: item.categories || [],
            guid: item.guid,
            isoDate: new Date(item.pubDate).toISOString(),
            readTime,
            wordCount,
          }
        }
        catch (error) {
          logger.error(`Error processing post ${item.title}`, error)
          // Fallback: estimate based on description
          const { readTime, wordCount } = calculateReadTime(item.description || '')

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: item.description,
            contentSnippet: item.description.replace(/<[^>]*>/g, ''),
            categories: item.categories || [],
            guid: item.guid,
            isoDate: new Date(item.pubDate).toISOString(),
            readTime: Math.max(MIN_READ_TIME, readTime),
            wordCount,
          }
        }
      }),
    )

    // Cache ALL the posts (not limited by the request limit)
    await setCache(`${CACHE_KEY}_${username}`, processedPosts, MEDIUM_CACHE_DURATION)
    logger.info('All Medium posts cached successfully', {
      username,
      totalPostsCached: processedPosts.length,
      requestedLimit: limit,
    })

    // Occasionally cleanup expired cache
    if (Math.random() < 0.1) {
      cleanupExpiredCache().catch(() => {}) // Don't wait for cleanup
    }

    // Return only the requested number of posts
    const limitedPosts = processedPosts.slice(0, limit)

    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=3600',
    })

    return limitedPosts
  }
  catch (error) {
    logger.error('Error fetching Medium posts', { username, error })

    // Try to return stale cached data as fallback
    const staleCache = await getFromCache(`${CACHE_KEY}_${username}`)
    if (staleCache) {
      const arrayStaleCache = Array.isArray(staleCache) ? staleCache : []
      logger.info('Using stale Medium cache as fallback', { username, limit, totalCached: arrayStaleCache.length })
      const limitedPosts = arrayStaleCache.slice(0, limit)
      setResponseHeaders(event, {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=43200',
        'CDN-Cache-Control': 'public, s-maxage=1800',
      })
      return limitedPosts
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Medium posts',
    })
  }
})
