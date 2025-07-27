import logger from "../logger"

interface PinnedRepo {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  stars: number
  forks: number
}

export async function fetchPinnedRepositories(username: string): Promise<PinnedRepo[]> {
  try {
    logger.info('Fetching GitHub repositories', { username })
    
    const response = await fetch(`/api/github/repositories?username=${username}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`)
    }
    
    const repositories = await response.json()
    
    logger.info('Successfully fetched GitHub repositories', { 
      username, 
      repoCount: repositories.length 
    })
    
    return repositories
  } catch (error) {
    logger.error('Error fetching GitHub repositories:', error)
    return []
  }
}