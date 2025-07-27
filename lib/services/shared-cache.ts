import { promises as fs } from 'fs'
import path from 'path'
import logger from '../logger'

const CACHE_DIR = '/tmp/cache'

async function ensureCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true })
  } catch (error) {
    console.error('Failed to create cache directory:', error)
  }
}

function sanitizeKey(key: string): string {
  return Buffer.from(key).toString('base64url')
}

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    await ensureCacheDir()
    const sanitizedKey = sanitizeKey(key)
    const filePath = path.join(CACHE_DIR, `${sanitizedKey}.json`)
    
    const data = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)
    
    // Check if cache has expired
    if (Date.now() > parsed.expiry) {
      // Async clean up expired cache file
      fs.unlink(filePath).catch(() => {})
      return null
    }
    
    return parsed.data
  } catch (error) {
    // File doesn't exist or other error - return null
    return null
  }
}

export async function setCache<T>(key: string, data: T, ttl: number): Promise<void> {
  try {
    await ensureCacheDir()
    const sanitizedKey = sanitizeKey(key)
    const filePath = path.join(CACHE_DIR, `${sanitizedKey}.json`)
    
    const cacheData = {
      data,
      expiry: Date.now() + ttl,
      createdAt: new Date().toISOString(),
      originalKey: key
    }
    
    await fs.writeFile(filePath, JSON.stringify(cacheData, null, 2))
  } catch (error) {
    logger.error('Cache set error:', error)
    // Don't throw error - cache failure shouldn't break the app
    // Clean up temp file if it exists
    try {
      const tempPath = `${path.join(CACHE_DIR, sanitizeKey(key))}.json.tmp`
      await fs.unlink(tempPath)
    } catch {}
  }
}

export async function deleteFromCache(key: string): Promise<void> {
  try {
    const sanitizedKey = sanitizeKey(key)
    const filePath = path.join(CACHE_DIR, `${sanitizedKey}.json`)
    await fs.unlink(filePath)
  } catch (error) {
    // File doesn't exist or other error - ignore
  }
}

export async function cleanupExpiredCache(): Promise<number> {
  let cleaned = 0

  try {
    await ensureCacheDir()
    const files = await fs.readdir(CACHE_DIR)
    
    for (const file of files) {
      if (!file.endsWith('.json')) continue
      
      try {
        const filePath = path.join(CACHE_DIR, file)
        const data = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(data)
        
        if (Date.now() > parsed.expiry) {
          await fs.unlink(filePath)
          cleaned++
        }
      } catch (error) {
        // Error reading/parsing file - remove it
        await fs.unlink(path.join(CACHE_DIR, file)).catch(() => {})
        cleaned++
      }
    }

    if (cleaned > 0) {
      logger.info(`Cleaned up ${cleaned} expired cache files`)
    }
  } catch (error) {
    logger.error('Cache cleanup error:', error)
  }

  return cleaned
}