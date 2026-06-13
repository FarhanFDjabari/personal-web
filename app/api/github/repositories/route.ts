import { NextRequest, NextResponse } from 'next/server'
import { cleanupExpiredCache, getFromCache, setCache } from '@/lib/services/shared-cache'
import logger from '@/lib/logger'
import { GITHUB_CACHE_DURATION } from '@/lib/constants'
import { getPinnedRepositories } from '@/lib/services/github-repositories'

export async function GET(request: NextRequest) {
    const CACHE_KEY = 'github_repositories_full'

    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
        logger.warn('GitHub repositories API called without username')
        return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    // Check cache first
    const cached = await getFromCache(`${CACHE_KEY}_${username}`)
    if (cached) {
        logger.info('Using cached GitHub repositories', { username })
        return NextResponse.json(cached, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
            }
        })
    }

    try {
        logger.info('Fetching fresh GitHub repositories', { username })
        const detailedRepos = await getPinnedRepositories(username)

        // Cache the complete result
        await setCache(`${CACHE_KEY}_${username}`, detailedRepos, GITHUB_CACHE_DURATION)
        logger.info('GitHub repositories cached successfully', {
            username,
            repoCount: detailedRepos.length
        })

        // Occasionally cleanup expired cache
        if (Math.random() < 0.1) {
            cleanupExpiredCache().catch(() => { }) // Don't wait for cleanup
        }

        return NextResponse.json(detailedRepos, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                // HTTP Edge Caching - cache for 1 hour, serve stale for 24 hours
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'CDN-Cache-Control': 'public, s-maxage=3600',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
            },
        })

    } catch (error) {
        logger.error('Error fetching GitHub repositories', { username, error })

        // return fallback cached data if available
        const fallbackCached = await getFromCache(`${CACHE_KEY}_${username}`)
        if (fallbackCached) {
            logger.info('Using stale cached data as fallback', { username })
            return NextResponse.json(fallbackCached, { 
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=43200', // Shorter cache for fallback
                    'CDN-Cache-Control': 'public, s-maxage=1800',
                    'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
                }
            })
        }

        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        )
    }
}

export async function OPTIONS(request: NextRequest) {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}
