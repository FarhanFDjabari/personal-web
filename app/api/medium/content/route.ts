import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postUrl = searchParams.get('url')

  if (!postUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    // Fetch the Medium post content
    const response = await fetch(postUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()
    
    // Extract content from Medium's article structure
    // Medium uses specific CSS classes for article content
    const contentMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/)
    const content = contentMatch ? contentMatch[1] : html
    
    return NextResponse.json({ content }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error fetching Medium content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content', content: '' }, 
      { status: 500 }
    )
  }
}