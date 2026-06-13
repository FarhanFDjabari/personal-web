import { NextRequest, NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"
import { parseLinkedInExport } from "@/lib/services/linkedin-export-importer"
import { saveProfile } from "@/lib/services/profile-store"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  const expectedPassword = process.env.LINKEDIN_IMPORT_PASSWORD

  if (!expectedPassword) {
    return NextResponse.json({ error: "LINKEDIN_IMPORT_PASSWORD is not configured." }, { status: 503 })
  }

  const formData = await request.formData()
  const password = formData.get("password")
  const archive = formData.get("archive")

  if (typeof password !== "string" || password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 })
  }

  if (!(archive instanceof File)) {
    return NextResponse.json({ error: "LinkedIn export ZIP is required." }, { status: 400 })
  }

  if (!archive.name.toLowerCase().endsWith(".zip")) {
    return NextResponse.json({ error: "Upload the LinkedIn export as a .zip file." }, { status: 400 })
  }

  const buffer = Buffer.from(await archive.arrayBuffer())
  const profile = parseLinkedInExport(buffer)
  let result: Awaited<ReturnType<typeof saveProfile>>

  try {
    result = await saveProfile(profile)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to persist profile data." },
      { status: 500 },
    )
  }

  if (result.changed) {
    revalidateTag("profile-data", "max")
    revalidatePath("/")
  }

  return NextResponse.json({
    changed: result.changed,
    hash: result.hash,
    experienceCount: profile.experience.length,
    educationCount: profile.education.length,
    skillCount: profile.skills.length,
    updatedAt: profile.updatedAt,
  })
}
