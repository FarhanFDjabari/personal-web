import logger from "@/lib/logger"
import { GITHUB_CACHE_DURATION } from "@/lib/constants"
import type { PinnedRepo } from "@/lib/services/github-repositories"

const CLIENT_FETCH_TIMEOUT_MS = 10000
const CACHE_KEY = "github_pinned_repos"

interface CachedData {
  data: PinnedRepo[]
  expiry: number
}

function getCachedData(): PinnedRepo[] | null {
  if (typeof window === "undefined") return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsedCache: CachedData = JSON.parse(cached)

    if (Date.now() > parsedCache.expiry) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return parsedCache.data
  } catch {
    try { localStorage.removeItem(CACHE_KEY) } catch {}
    return null
  }
}

function getExpiredCachedData(): PinnedRepo[] | null {
  if (typeof window === "undefined") return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsedCache: CachedData = JSON.parse(cached)
    return parsedCache.data
  } catch {
    return null
  }
}

function setCachedData(data: PinnedRepo[]): void {
  if (typeof window === "undefined") return

  try {
    const cacheData: CachedData = {
      data,
      expiry: Date.now() + GITHUB_CACHE_DURATION,
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
  } catch {
    // localStorage might be full or unavailable
  }
}

export function cachePinnedRepositories(data: PinnedRepo[]): void {
  setCachedData(data)
}

export async function fetchPinnedRepositories(username: string): Promise<PinnedRepo[]> {
  const cached = getCachedData()
  if (cached) {
    logger.info("Using localStorage cached GitHub repositories", { username })
    return cached
  }

  try {
    logger.info("Fetching GitHub repositories via API", { username })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), CLIENT_FETCH_TIMEOUT_MS)

    const response = await fetch(
      `/api/github/repositories?username=${username}`,
      { signal: controller.signal }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`)
    }

    const repositories = await response.json()

    setCachedData(repositories)

    logger.info("Successfully fetched GitHub repositories", {
      username,
      repoCount: repositories.length,
    })

    return repositories
  } catch (error) {
    logger.error("Error fetching GitHub repositories:", error)

    const staleCache = getExpiredCachedData()
    if (staleCache) {
      logger.info("Using expired localStorage cache as fallback", { username })
      setCachedData(staleCache)
      return staleCache
    }

    return []
  }
}
