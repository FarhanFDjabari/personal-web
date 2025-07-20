import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const author = searchParams.get('author')
  const repo = searchParams.get('repo')

  if (!author || !repo) {
    return NextResponse.json({ error: 'Author and repo are required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${author}/${repo}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
        // Add GitHub token if you have one (optional but recommended for higher rate limits)
        // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error fetching repo details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repository details' }, 
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}