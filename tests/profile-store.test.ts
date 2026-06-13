import { strict as assert } from "node:assert"
import { afterEach, test } from "node:test"
import type { PersonalProfile } from "@/lib/model/profile"

const ORIGINAL_ENV = { ...process.env }

afterEach(() => {
  process.env = { ...ORIGINAL_ENV }
  delete (globalThis as { fetch?: unknown }).fetch
  delete (globalThis as { __profileStoreBlobAdapter?: unknown }).__profileStoreBlobAdapter
})

test("saveProfile skips Blob update when remote profile content is unchanged", async () => {
  const { saveProfile } = await importFreshProfileStore()
  const profile = createProfile()
  const requests: Array<{ url: string; init?: RequestInit }> = []

  process.env.BLOB_READ_WRITE_TOKEN = "test-token"
  process.env.PROFILE_DATA_URL = "https://blob.vercel-storage.com/profile/profile.json"
  const writes: Array<{ pathname: string; content: string; options: unknown }> = []
  ;(globalThis as { __profileStoreBlobAdapter?: unknown }).__profileStoreBlobAdapter = {
    put: async (pathname: string, content: string, options: unknown) => {
      writes.push({ pathname, content, options })
      return {
        url: "https://blob.vercel-storage.com/profile/profile.json",
        downloadUrl: "https://blob.vercel-storage.com/profile/profile.json",
        pathname,
        contentType: "application/json",
        contentDisposition: "",
      }
    },
  }
  globalThis.fetch = async (url, init) => {
    requests.push({ url: String(url), init })
    return jsonResponse(profile)
  }

  const result = await saveProfile(profile)

  assert.equal(result.changed, false)
  assert.equal(requests.length, 1)
  assert.equal(requests[0].init?.cache, "no-store")
  assert.equal(writes.length, 0)
})

test("saveProfile writes to Blob when imported profile content changes", async () => {
  const { saveProfile } = await importFreshProfileStore()
  const previous = createProfile({ about: "Old summary" })
  const next = createProfile({ about: "New summary" })
  const requests: Array<{ url: string; init?: RequestInit }> = []

  process.env.BLOB_READ_WRITE_TOKEN = "test-token"
  process.env.PROFILE_DATA_URL = "https://blob.vercel-storage.com/profile/profile.json"
  const writes: Array<{ pathname: string; content: string; options: { access?: string; allowOverwrite?: boolean } }> = []
  ;(globalThis as { __profileStoreBlobAdapter?: unknown }).__profileStoreBlobAdapter = {
    put: async (pathname: string, content: string, options: { access?: string; allowOverwrite?: boolean }) => {
      writes.push({ pathname, content, options })
      return {
        url: "https://blob.vercel-storage.com/profile/profile.json",
        downloadUrl: "https://blob.vercel-storage.com/profile/profile.json",
        pathname,
        contentType: "application/json",
        contentDisposition: "",
      }
    },
  }
  globalThis.fetch = async (url, init) => {
    requests.push({ url: String(url), init })
    return jsonResponse(previous)
  }

  const result = await saveProfile(next)

  assert.equal(result.changed, true)
  assert.equal(requests.length, 1)
  assert.equal(writes.length, 1)
  assert.equal(writes[0].pathname, "profile/profile.json")
  assert.equal(writes[0].content, `${JSON.stringify(next, null, 2)}\n`)
  assert.equal(writes[0].options.access, "public")
  assert.equal(writes[0].options.allowOverwrite, true)
})

async function importFreshProfileStore(): Promise<typeof import("@/lib/services/profile-store")> {
  return import(`@/lib/services/profile-store?test=${Date.now()}-${Math.random()}`)
}

function createProfile(overrides: Partial<PersonalProfile> = {}): PersonalProfile {
  return {
    about: "Mobile developer",
    headline: "Mobile Developer",
    location: "Indonesia",
    experience: [
      {
        company: "Acme Mobile",
        role: "Mobile Developer",
        startDate: "2024-01",
        endDate: null,
        summary: "Built mobile features.",
      },
    ],
    education: [],
    skills: ["Kotlin", "Flutter"],
    updatedAt: "2026-06-08T00:00:00.000Z",
    source: "linkedin-export",
    ...overrides,
  }
}

function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
