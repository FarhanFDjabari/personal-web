import { cleanupExpiredCache, getFromCache, setCache } from '../../../lib/services/shared-cache'
import logger from '../../../utils/logger'
import { GITHUB_CACHE_DURATION } from '../../../utils/constants'

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

export default defineEventHandler(async (event) => {
  const CACHE_KEY = 'github_repositories_full'

  const query = getQuery(event)
  const username = query.username as string

  if (!username) {
    logger.warn('GitHub repositories API called without username')
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  // Check cache first
  const cached = await getFromCache(`${CACHE_KEY}_${username}`)
  if (cached) {
    logger.info('Using cached GitHub repositories', { username })
    setResponseHeaders(event, {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=3600',
    })
    return cached
  }

  try {
    logger.info('Fetching fresh GitHub repositories', { username })

    // Step 1: Get pinned repos
    const pinnedResponse = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      },
    })

    if (!pinnedResponse.ok) {
      throw new Error(`Failed to fetch pinned repos: ${pinnedResponse.status}`)
    }

    const pinnedRepos: PinnedRepoResponse[] = await pinnedResponse.json()

    if (!Array.isArray(pinnedRepos) || pinnedRepos.length === 0) {
      logger.warn('No pinned repositories found', { username })
      return []
    }

    // Step 2: Get detailed info for each repo
    const detailedRepos = await Promise.all(
      pinnedRepos.map(async (pinnedRepo) => {
        try {
          // Get repo details from GitHub API
          const repoResponse = await fetch(
            `https://api.github.com/repos/${pinnedRepo.author}/${pinnedRepo.name}`,
            {
              headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
              },
            },
          )

          if (!repoResponse.ok) {
            logger.warn(`Failed to fetch details for ${pinnedRepo.name} ${pinnedRepo.author}`, {
              status: repoResponse.status,
              statusText: repoResponse.statusText,
            })
            // Fallback to basic data
            return {
              title: pinnedRepo.name.charAt(0).toUpperCase() + pinnedRepo.name.slice(1),
              description: pinnedRepo.description || 'No description available',
              technologies: pinnedRepo.language ? [pinnedRepo.language] : [],
              githubUrl: `https://github.com/${pinnedRepo.author}/${pinnedRepo.name}`,
              liveUrl: null,
              stars: pinnedRepo.stars,
              forks: pinnedRepo.forks,
            }
          }

          const repoDetail: GitHubRepoDetail = await repoResponse.json()

          // Get languages
          const languagesResponse = await fetch(repoDetail.languages_url, {
            headers: {
              'User-Agent': 'Portfolio-Bot/1.0',
            },
          })
          const languages = languagesResponse.ok ? await languagesResponse.json() : {}

          return {
            title: repoDetail.name.charAt(0).toUpperCase() + repoDetail.name.slice(1),
            description: repoDetail.description || 'No description available',
            technologies: [
              ...Object.keys(languages),
              ...repoDetail.topics,
            ].filter(Boolean),
            githubUrl: repoDetail.html_url,
            liveUrl: repoDetail.homepage || null,
            stars: repoDetail.stargazers_count,
            forks: repoDetail.forks_count,
          }
        }
        catch (error) {
          logger.error(`Error fetching details for ${pinnedRepo.name}`, error)
          // Fallback to pinned API data
          return {
            title: pinnedRepo.name.charAt(0).toUpperCase() + pinnedRepo.name.slice(1),
            description: pinnedRepo.description || 'No description available',
            technologies: pinnedRepo.language ? [pinnedRepo.language] : [],
            githubUrl: `https://github.com/${pinnedRepo.author}/${pinnedRepo.name}`,
            liveUrl: null,
            stars: pinnedRepo.stars,
            forks: pinnedRepo.forks,
          }
        }
      }),
    )

    // Cache the complete result
    await setCache(`${CACHE_KEY}_${username}`, detailedRepos, GITHUB_CACHE_DURATION)
    logger.info('GitHub repositories cached successfully', {
      username,
      repoCount: detailedRepos.length,
    })

    // Occasionally cleanup expired cache
    if (Math.random() < 0.1) {
      cleanupExpiredCache().catch(() => {}) // Don't wait for cleanup
    }

    setResponseHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, s-maxage=3600',
    })

    return detailedRepos
  }
  catch (error) {
    logger.error('Error fetching GitHub repositories', { username, error })

    // return fallback cached data if available
    const fallbackCached = await getFromCache(`${CACHE_KEY}_${username}`)
    if (fallbackCached) {
      logger.info('Using stale cached data as fallback', { username })
      setResponseHeaders(event, {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=43200',
        'CDN-Cache-Control': 'public, s-maxage=1800',
      })
      return fallbackCached
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch repositories',
    })
  }
})
