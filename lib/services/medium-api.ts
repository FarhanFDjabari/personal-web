import logger from "../logger"

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

export async function fetchMediumPosts(username: string, limit: number = 3): Promise<MediumPost[]> {
  try {
    logger.info('Fetching Medium posts', { username, limit })
    
    const response = await fetch(`/api/medium/posts?username=${username}&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`)
    }
    
    const posts = await response.json()
    
    logger.info('Successfully fetched Medium posts', { 
      username, 
      postCount: posts.length 
    })
    
    return posts
  } catch (error) {
    logger.error('Error fetching Medium posts:', error)
    return []
  }
}