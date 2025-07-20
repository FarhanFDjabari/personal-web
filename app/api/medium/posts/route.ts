import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    // Use RSS2JSON service to convert Medium RSS to JSON
    const rssUrl = `https://medium.com/feed/@${username}`
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
    
    const response = await fetch(apiUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch RSS data')
    }

    // Transform the data to match our interface
    const posts = data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      categories: item.categories || [],
      guid: item.guid,
      isoDate: new Date(item.pubDate).toISOString()
    }))
    
    return NextResponse.json(posts, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts' }, 
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}