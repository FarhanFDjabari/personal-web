import { inflateRawSync } from "zlib"
import type { PersonalProfile, ProfileEducation, ProfileExperience } from "@/lib/model/profile"

interface ZipEntry {
  name: string
  data: Buffer
}

type CsvRow = Record<string, string>

export function parseLinkedInExport(buffer: Buffer): PersonalProfile {
  const entries = readZipEntries(buffer)
  const csvFiles = new Map(
    entries
      .filter((entry) => entry.name.toLowerCase().endsWith(".csv"))
      .map((entry) => [normalizeFileName(entry.name), entry.data.toString("utf-8")]),
  )

  const profileRows = findCsv(csvFiles, ["profile.csv", "basic_info.csv"])
  const positionRows = findCsv(csvFiles, ["positions.csv", "experience.csv"])
  const educationRows = findCsv(csvFiles, ["education.csv"])
  const skillRows = findCsv(csvFiles, ["skills.csv"])

  const profile = profileRows[0] ?? {}
  const firstName = pick(profile, ["First Name", "FirstName"])
  const lastName = pick(profile, ["Last Name", "LastName"])
  const headline = pick(profile, ["Headline", "Title"])
  const summary = pick(profile, ["Summary", "About", "Profile Summary"])
  const location = pick(profile, ["Geo Location", "Location", "Address"])

  const experience = positionRows
    .map<ProfileExperience>((row) => ({
      company: pick(row, ["Company Name", "Company", "Organization Name"]),
      role: pick(row, ["Title", "Position", "Role"]),
      location: pick(row, ["Location"]),
      startDate: pick(row, ["Started On", "Start Date", "From"]),
      endDate: pick(row, ["Finished On", "End Date", "To"]) || null,
      summary: pick(row, ["Description", "Summary"]),
    }))
    .filter((item) => item.company || item.role)

  const education = educationRows
    .map<ProfileEducation>((row) => ({
      school: pick(row, ["School Name", "School", "Institution Name"]),
      degree: pick(row, ["Degree Name", "Degree"]),
      field: pick(row, ["Field of Study", "Field"]),
      startDate: pick(row, ["Start Date", "Started On", "From"]),
      endDate: pick(row, ["End Date", "Finished On", "To"]),
      summary: pick(row, ["Notes", "Description"]),
    }))
    .filter((item) => item.school)

  const skills = unique(
    skillRows
      .map((row) => pick(row, ["Name", "Skill Name", "Skill"]))
      .filter(Boolean),
  )

  return {
    about:
      summary ||
      [headline, experience[0]?.role && experience[0]?.company ? `at ${experience[0].company}` : ""]
        .filter(Boolean)
        .join(" ") ||
      "Mobile developer focused on building clean, efficient, and user-centric mobile experiences.",
    headline: headline || undefined,
    location: location || undefined,
    experience,
    education,
    skills,
    updatedAt: new Date().toISOString(),
    source: "linkedin-export",
  }
}

function readZipEntries(buffer: Buffer): ZipEntry[] {
  const entries: ZipEntry[] = []
  const endOffset = findEndOfCentralDirectory(buffer)
  const centralDirectoryOffset = buffer.readUInt32LE(endOffset + 16)
  const entryCount = buffer.readUInt16LE(endOffset + 10)

  let offset = centralDirectoryOffset
  for (let index = 0; index < entryCount; index++) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("Invalid ZIP central directory")
    }

    const compressionMethod = buffer.readUInt16LE(offset + 10)
    const compressedSize = buffer.readUInt32LE(offset + 20)
    const uncompressedSize = buffer.readUInt32LE(offset + 24)
    const fileNameLength = buffer.readUInt16LE(offset + 28)
    const extraFieldLength = buffer.readUInt16LE(offset + 30)
    const commentLength = buffer.readUInt16LE(offset + 32)
    const localHeaderOffset = buffer.readUInt32LE(offset + 42)
    const name = buffer.subarray(offset + 46, offset + 46 + fileNameLength).toString("utf-8")

    const localFileNameLength = buffer.readUInt16LE(localHeaderOffset + 26)
    const localExtraFieldLength = buffer.readUInt16LE(localHeaderOffset + 28)
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraFieldLength
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize)

    if (!name.endsWith("/")) {
      entries.push({
        name,
        data: decompress(compressed, compressionMethod, uncompressedSize),
      })
    }

    offset += 46 + fileNameLength + extraFieldLength + commentLength
  }

  return entries
}

function findEndOfCentralDirectory(buffer: Buffer): number {
  for (let offset = buffer.length - 22; offset >= 0; offset--) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) {
      return offset
    }
  }

  throw new Error("Invalid ZIP archive")
}

function decompress(data: Buffer, method: number, expectedSize: number): Buffer {
  if (method === 0) {
    return data
  }

  if (method === 8) {
    const inflated = inflateRawSync(data)
    if (expectedSize > 0 && inflated.length !== expectedSize) {
      throw new Error("ZIP entry size mismatch")
    }
    return inflated
  }

  throw new Error(`Unsupported ZIP compression method: ${method}`)
}

function findCsv(files: Map<string, string>, names: string[]): CsvRow[] {
  for (const name of names) {
    const file = files.get(name)
    if (file) {
      return parseCsv(file)
    }
  }

  return []
}

function normalizeFileName(name: string): string {
  return name.split("/").pop()?.toLowerCase() ?? name.toLowerCase()
}

function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let index = 0; index < input.length; index++) {
    const char = input[index]
    const next = input[index + 1]

    if (char === '"' && inQuotes && next === '"') {
      field += '"'
      index++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      row.push(field)
      field = ""
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index++
      }
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else {
      field += char
    }
  }

  if (field || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  const [headers = [], ...body] = rows.filter((item) => item.some((value) => value.trim()))
  return body.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header.trim(), (values[index] ?? "").trim()])),
  )
}

function pick(row: CsvRow, keys: string[]): string {
  for (const key of keys) {
    const value = row[key]
    if (value) {
      return value.trim()
    }
  }

  return ""
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values))
}
