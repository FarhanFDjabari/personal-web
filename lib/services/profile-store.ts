import { promises as fs } from "fs"
import path from "path"
import { head, put } from "@vercel/blob"
import type { PersonalProfile } from "@/lib/model/profile"
import profileData from "@/data/profile.json"

const PROFILE_PATH = path.join(process.cwd(), "data", "profile.json")
const PROFILE_REVALIDATE_SECONDS = 7 * 24 * 60 * 60
const PROFILE_BLOB_PATH = "profile/profile.json"

interface ProfileStoreTestBlobAdapter {
  head?: typeof head
  put?: typeof put
}

export async function getProfile(): Promise<PersonalProfile> {
  const remoteProfile = await getRemoteProfile()
  if (remoteProfile) {
    return remoteProfile
  }

  try {
    const file = await fs.readFile(PROFILE_PATH, "utf-8")
    return JSON.parse(file) as PersonalProfile
  } catch {
    return profileData as PersonalProfile
  }
}

export async function saveProfile(profile: PersonalProfile): Promise<{ changed: boolean; hash: string }> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return saveProfileToBlob(profile)
  }

  if (process.env.VERCEL) {
    throw new Error("Persistent profile storage is not configured. Set BLOB_READ_WRITE_TOKEN in Vercel.")
  }

  await fs.mkdir(path.dirname(PROFILE_PATH), { recursive: true })

  const nextJson = stableStringify(profile)
  const nextHash = await sha256(nextJson)

  try {
    const current = await fs.readFile(PROFILE_PATH, "utf-8")
    const currentHash = await sha256(stableStringify(JSON.parse(current)))
    if (currentHash === nextHash) {
      return { changed: false, hash: nextHash }
    }
  } catch {
    // Missing or invalid profile file should be replaced.
  }

  await fs.writeFile(PROFILE_PATH, `${JSON.stringify(profile, null, 2)}\n`)
  return { changed: true, hash: nextHash }
}

async function getRemoteProfile(): Promise<PersonalProfile | null> {
  const url = process.env.PROFILE_DATA_URL || (await getProfileBlobUrl())
  if (!url) {
    return null
  }

  try {
    const response = await fetch(url, {
      next: {
        revalidate: PROFILE_REVALIDATE_SECONDS,
        tags: ["profile-data"],
      },
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as PersonalProfile
  } catch {
    return null
  }
}

async function saveProfileToBlob(profile: PersonalProfile): Promise<{ changed: boolean; hash: string }> {
  const nextContent = `${JSON.stringify(profile, null, 2)}\n`
  const nextHash = await sha256(stableStringify(profile))

  const currentUrl = await getProfileBlobUrl()
  if (currentUrl) {
    try {
      const currentResponse = await fetch(currentUrl, { cache: "no-store" })
      const currentJson = await currentResponse.text()
      const currentHash = await sha256(stableStringify(JSON.parse(currentJson)))
      if (currentHash === nextHash) {
        return { changed: false, hash: nextHash }
      }
    } catch {
      // Missing or invalid blob should be replaced.
    }
  }

  await blobPut(PROFILE_BLOB_PATH, nextContent, {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: PROFILE_REVALIDATE_SECONDS,
  })

  return { changed: true, hash: nextHash }
}

async function getProfileBlobUrl(): Promise<string | null> {
  if (process.env.PROFILE_DATA_URL) {
    return process.env.PROFILE_DATA_URL
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return null
  }

  try {
    const blob = await blobHead(PROFILE_BLOB_PATH)
    return blob.url
  } catch {
    return null
  }
}

function getTestBlobAdapter(): ProfileStoreTestBlobAdapter | undefined {
  return (globalThis as typeof globalThis & { __profileStoreBlobAdapter?: ProfileStoreTestBlobAdapter })
    .__profileStoreBlobAdapter
}

function blobHead(...args: Parameters<typeof head>): ReturnType<typeof head> {
  return (getTestBlobAdapter()?.head ?? head)(...args)
}

function blobPut(...args: Parameters<typeof put>): ReturnType<typeof put> {
  return (getTestBlobAdapter()?.put ?? put)(...args)
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value))
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue)
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, child]) => [key, sortValue(child)]),
    )
  }

  return value
}

async function sha256(value: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}
