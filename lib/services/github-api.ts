interface PinnedRepoResponse {
  name: string
  author: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
}

interface GitHubRepoDetail {
  name: string
  description: string | null
  html_url: string
  topics: string[]
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  homepage: string | null
}

interface PinnedRepo {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  stars: number
  forks: number
}

interface CachedData {
  data: PinnedRepo[]
  timestamp: number
  expiry: number
}

const CACHE_KEY = 'github_pinned_repos'
const CACHE_DURATION = 24 * 60 * 60 * 1000

function getCachedData(): PinnedRepo[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsedCache: CachedData = JSON.parse(cached)
    const now = Date.now()

    // Check if cache has expired
    if (now > parsedCache.expiry) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return parsedCache.data
  } catch (error) {
    console.error('Error reading cache:', error)
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

function setCachedData(data: PinnedRepo[]): void {
  try {
    const cacheData: CachedData = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + CACHE_DURATION
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch (error) {
    console.error('Error setting cache:', error)
  }
}

function clearCache(): void {
  localStorage.removeItem(CACHE_KEY)
}

export async function fetchPinnedRepositories(username: string, forceRefresh: boolean = false): Promise<PinnedRepo[]> {
  // Check cache first (unless force refresh is requested)
  if (!forceRefresh) {
    const cachedData = getCachedData()
    if (cachedData) {
      console.log('Using cached GitHub data')
      return cachedData
    }
  }

  try {
    // Step 1: Get pinned repositories from berrysauce API
    const pinnedResponse = await fetch(`/api/github/pinned?username=${username}`)
    
    if (!pinnedResponse.ok) {
      throw new Error('Failed to fetch pinned repositories')
    }
    
    const pinnedRepos: PinnedRepoResponse[] = await pinnedResponse.json()
    
    if (!Array.isArray(pinnedRepos) || pinnedRepos.length === 0) {
      throw new Error('No pinned repositories found')
    }
    
    // Step 2: Get detailed information for each pinned repo
    const detailedRepos = await Promise.all(
      pinnedRepos.map(async (pinnedRepo) => {
        try {
          // Get detailed repo information from GitHub API
          const repoResponse = await fetch(`/api/github/repo?author=${pinnedRepo.author}&repo=${pinnedRepo.name}`)
          
          if (!repoResponse.ok) {
            console.warn(`Failed to fetch details for ${pinnedRepo.name}`)
            // Fallback to pinned API data
            return {
              title: pinnedRepo.name.charAt(0).toUpperCase() + pinnedRepo.name.slice(1),
              description: pinnedRepo.description || 'No description available',
              technologies: pinnedRepo.language ? [pinnedRepo.language] : [],
              githubUrl: `https://github.com/${pinnedRepo.author}/${pinnedRepo.name}`,
              liveUrl: null,
              stars: pinnedRepo.stars,
              forks: pinnedRepo.forks
            }
          }
          
          const repoDetail: GitHubRepoDetail = await repoResponse.json()
          
          // Get languages for the repository
          const languagesResponse = await fetch(repoDetail.languages_url)
          const languages = languagesResponse.ok ? await languagesResponse.json() : {}
          
          return {
            title: repoDetail.name.charAt(0).toUpperCase() + repoDetail.name.slice(1),
            description: repoDetail.description || 'No description available',
            technologies: [
              ...Object.keys(languages),
              ...repoDetail.topics
            ].filter(Boolean),
            githubUrl: repoDetail.html_url,
            liveUrl: repoDetail.homepage || null,
            stars: repoDetail.stargazers_count,
            forks: repoDetail.forks_count
          }
        } catch (error) {
          console.error(`Error fetching details for ${pinnedRepo.name}:`, error)
          // Fallback to pinned API data
          return {
            title: pinnedRepo.name.charAt(0).toUpperCase() + pinnedRepo.name.slice(1),
            description: pinnedRepo.description || 'No description available',
            technologies: pinnedRepo.language ? [pinnedRepo.language] : [],
            githubUrl: `https://github.com/${pinnedRepo.author}/${pinnedRepo.name}`,
            liveUrl: null,
            stars: pinnedRepo.stars,
            forks: pinnedRepo.forks
          }
        }
      })
    )

    // Cache the fresh data
    setCachedData(detailedRepos)
    
    return detailedRepos
  } catch (error) {
    console.error('Error fetching pinned repositories:', error)

    // Try to return cached data as fallback, even if expired
    const cachedData = getCachedData()
    if (cachedData) {
      console.log('Using expired cache as fallback')
      return cachedData
    }

    return []
  }
}