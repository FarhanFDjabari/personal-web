import logger from "@/lib/logger"
import { GITHUB_CACHE_DURATION } from "@/lib/constants"

const GITHUB_REVALIDATE_SECONDS = GITHUB_CACHE_DURATION / 1000
const FETCH_TIMEOUT_MS = 15000

interface PinnedRepo {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  stars: number
  forks: number
}

interface PinnedRepoResponse {
  name: string
  author: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  website?: string
  url?: string
  topics?: string[]
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

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN
  if (token) {
    logger.info("Using authenticated GitHub API requests")
  }
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    Accept: "application/vnd.github+json",
    "User-Agent": "Portfolio-Bot/1.0",
  }
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      next: (options as any).next,
    })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

function fallbackRepo(pinnedRepo: PinnedRepoResponse): PinnedRepo {
  return {
    title: pinnedRepo.name.charAt(0).toUpperCase() + pinnedRepo.name.slice(1),
    description: pinnedRepo.description || "No description available",
    technologies: normalizeTechnologies([pinnedRepo.language, ...(pinnedRepo.topics || [])]),
    githubUrl: `https://github.com/${pinnedRepo.author}/${pinnedRepo.name}`,
    liveUrl: pinnedRepo.website || null,
    stars: pinnedRepo.stars,
    forks: pinnedRepo.forks,
  }
}

export { type PinnedRepo }

export async function getPinnedRepositories(username: string): Promise<PinnedRepo[]> {
  logger.info("Fetching GitHub repositories", { username })

  let pinnedRepos: PinnedRepoResponse[]

  try {
    pinnedRepos = await fetchPinnedFromBerrySauce(username)
  } catch (error) {
    logger.warn("pinned.berrysauce.dev failed, falling back to GitHub GraphQL", { username, error })
    try {
      pinnedRepos = await fetchPinnedViaGraphQL(username)
    } catch (graphqlError) {
      logger.error("GitHub GraphQL fallback also failed", { username, error: graphqlError })
      throw new Error("All pinned repo sources exhausted")
    }
  }

  if (!Array.isArray(pinnedRepos) || pinnedRepos.length === 0) {
    logger.warn("No pinned repositories found", { username })
    return []
  }

  const detailedRepos = await Promise.all(
    pinnedRepos.map(async (pinnedRepo) => {
      try {
        const repoResponse = await fetchWithTimeout(
          `https://api.github.com/repos/${pinnedRepo.author}/${pinnedRepo.name}`,
          {
            headers: githubHeaders(),
            next: {
              revalidate: GITHUB_REVALIDATE_SECONDS,
              tags: [`github-repo-${pinnedRepo.author}-${pinnedRepo.name}`],
            },
          } as RequestInit,
        )

        if (!repoResponse.ok) {
          logger.warn(`Failed to fetch details for ${pinnedRepo.name}`, {
            status: repoResponse.status,
            statusText: repoResponse.statusText,
          })
          return fallbackRepo(pinnedRepo)
        }

        const repoDetail: GitHubRepoDetail = await repoResponse.json()
        const languages = await fetchRepoLanguages(repoDetail.languages_url, pinnedRepo)

        return {
          title: repoDetail.name.charAt(0).toUpperCase() + repoDetail.name.slice(1),
          description: repoDetail.description || "No description available",
          technologies: normalizeTechnologies([
            ...Object.keys(languages),
            repoDetail.language,
            pinnedRepo.language,
            ...repoDetail.topics,
            ...(pinnedRepo.topics || []),
          ]),
          githubUrl: repoDetail.html_url,
          liveUrl: repoDetail.homepage || pinnedRepo.website || null,
          stars: repoDetail.stargazers_count,
          forks: repoDetail.forks_count,
        }
      } catch (error) {
        logger.error(`Error fetching details for ${pinnedRepo.name}`, error)
        return fallbackRepo(pinnedRepo)
      }
    }),
  )

  logger.info("Successfully fetched GitHub repositories", {
    username,
    repoCount: detailedRepos.length,
  })

  return detailedRepos
}

async function fetchPinnedFromBerrySauce(username: string): Promise<PinnedRepoResponse[]> {
  const response = await fetchWithTimeout(
    `https://pinned.berrysauce.dev/get/${username}`,
    {
      headers: {
        "User-Agent": "Portfolio-Bot/1.0",
      },
      next: {
        revalidate: GITHUB_REVALIDATE_SECONDS,
        tags: [`github-pinned-${username}`],
      },
    } as RequestInit,
  )

  if (!response.ok) {
    throw new Error(`BerrySauce returned ${response.status}`)
  }

  return response.json()
}

async function fetchPinnedViaGraphQL(username: string): Promise<PinnedRepoResponse[]> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error("GITHUB_TOKEN not configured, cannot use GraphQL")
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              owner { login }
              description
              primaryLanguage { name color }
              stargazerCount
              forkCount
              homepageUrl
              url
              repositoryTopics(first: 10) {
                nodes { topic { name } }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetchWithTimeout(
    "https://api.github.com/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-Bot/1.0",
      },
      body: JSON.stringify({ query, variables: { username } }),
    },
  )

  if (!response.ok) {
    throw new Error(`GraphQL returned ${response.status}`)
  }

  const result = await response.json()

  if (result.errors) {
    logger.error("GraphQL errors", result.errors)
    throw new Error(`GraphQL error: ${result.errors[0]?.message}`)
  }

  const nodes = result.data?.user?.pinnedItems?.nodes
  if (!Array.isArray(nodes) || nodes.length === 0) {
    return []
  }

  return nodes.map((node: any) => ({
    name: node.name,
    author: node.owner.login,
    description: node.description || "",
    language: node.primaryLanguage?.name || "",
    languageColor: node.primaryLanguage?.color || "",
    stars: node.stargazerCount,
    forks: node.forkCount,
    website: node.homepageUrl || undefined,
    url: node.url,
    topics: node.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
  }))
}

async function fetchRepoLanguages(languagesUrl: string, pinnedRepo: PinnedRepoResponse): Promise<Record<string, number>> {
  try {
    const languagesResponse = await fetchWithTimeout(languagesUrl, {
      headers: githubHeaders(),
      next: {
        revalidate: GITHUB_REVALIDATE_SECONDS,
        tags: [`github-languages-${pinnedRepo.author}-${pinnedRepo.name}`],
      },
    } as RequestInit)

    if (!languagesResponse.ok) {
      logger.warn(`Failed to fetch languages for ${pinnedRepo.name}`, {
        status: languagesResponse.status,
        statusText: languagesResponse.statusText,
      })
      return {}
    }

    return languagesResponse.json()
  } catch (error) {
    logger.warn(`Error fetching languages for ${pinnedRepo.name}`, error)
    return {}
  }
}

function normalizeTechnologies(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>()

  return values
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value))
    .filter((value) => {
      const key = value.toLowerCase()
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
}
