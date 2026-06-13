import logger from "@/lib/logger"
import { GITHUB_CACHE_DURATION } from "@/lib/constants"

const GITHUB_REVALIDATE_SECONDS = GITHUB_CACHE_DURATION / 1000

export interface PinnedRepo {
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
  return {
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    Accept: "application/vnd.github+json",
    "User-Agent": "Portfolio-Bot/1.0",
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

export async function getPinnedRepositories(username: string): Promise<PinnedRepo[]> {
  logger.info("Fetching GitHub repositories", { username })

  const pinnedResponse = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
    headers: {
      "User-Agent": "Portfolio-Bot/1.0",
    },
    next: {
      revalidate: GITHUB_REVALIDATE_SECONDS,
      tags: [`github-pinned-${username}`],
    },
  })

  if (!pinnedResponse.ok) {
    throw new Error(`Failed to fetch pinned repos: ${pinnedResponse.status}`)
  }

  const pinnedRepos: PinnedRepoResponse[] = await pinnedResponse.json()

  if (!Array.isArray(pinnedRepos) || pinnedRepos.length === 0) {
    logger.warn("No pinned repositories found", { username })
    return []
  }

  const detailedRepos = await Promise.all(
    pinnedRepos.map(async (pinnedRepo) => {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${pinnedRepo.author}/${pinnedRepo.name}`, {
          headers: githubHeaders(),
          next: {
            revalidate: GITHUB_REVALIDATE_SECONDS,
            tags: [`github-repo-${pinnedRepo.author}-${pinnedRepo.name}`],
          },
        })

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

async function fetchRepoLanguages(languagesUrl: string, pinnedRepo: PinnedRepoResponse): Promise<Record<string, number>> {
  try {
    const languagesResponse = await fetch(languagesUrl, {
      headers: githubHeaders(),
      next: {
        revalidate: GITHUB_REVALIDATE_SECONDS,
        tags: [`github-languages-${pinnedRepo.author}-${pinnedRepo.name}`],
      },
    })

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
