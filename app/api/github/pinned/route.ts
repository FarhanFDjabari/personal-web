import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    // Add CORS headers
    const response = await fetch(`https://pinned.berrysauce.dev/get/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)'
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
    console.error('Error fetching pinned repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pinned repositories' }, 
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