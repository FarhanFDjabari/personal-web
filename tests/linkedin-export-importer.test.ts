import { strict as assert } from "node:assert"
import { test } from "node:test"
import { Buffer } from "node:buffer"
import { parseLinkedInExport } from "@/lib/services/linkedin-export-importer"

test("parseLinkedInExport reads profile, positions, education, and skills from a raw LinkedIn ZIP", () => {
  const archive = createZip({
    "Basic_Info.csv": csv([
      ["First Name", "Last Name", "Headline", "Summary", "Location"],
      ["Farhan", "Djabari", "Mobile Developer", "Builds mobile apps with Kotlin and Flutter.", "Indonesia"],
    ]),
    "Positions.csv": csv([
      ["Company Name", "Title", "Location", "Started On", "Finished On", "Description"],
      ["Acme Mobile", "Mobile Developer", "Remote", "2024-01", "", "Built production mobile features."],
    ]),
    "Education.csv": csv([
      ["School Name", "Degree Name", "Field of Study", "Start Date", "End Date"],
      ["Brawijaya University", "Bachelor", "Information Technology", "2019", "2023"],
    ]),
    "Skills.csv": csv([
      ["Name"],
      ["Kotlin"],
      ["Flutter"],
      ["Kotlin"],
    ]),
  })

  const profile = parseLinkedInExport(archive)

  assert.equal(profile.source, "linkedin-export")
  assert.equal(profile.about, "Builds mobile apps with Kotlin and Flutter.")
  assert.equal(profile.headline, "Mobile Developer")
  assert.equal(profile.location, "Indonesia")
  assert.deepEqual(profile.skills, ["Kotlin", "Flutter"])
  assert.deepEqual(profile.experience, [
    {
      company: "Acme Mobile",
      role: "Mobile Developer",
      location: "Remote",
      startDate: "2024-01",
      endDate: null,
      summary: "Built production mobile features.",
    },
  ])
  assert.deepEqual(profile.education, [
    {
      school: "Brawijaya University",
      degree: "Bachelor",
      field: "Information Technology",
      startDate: "2019",
      endDate: "2023",
      summary: "",
    },
  ])
})

function csv(rows: string[][]): string {
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n")
}

function escapeCsv(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value
}

function createZip(files: Record<string, string>): Buffer {
  const localParts: Buffer[] = []
  const centralParts: Buffer[] = []
  let offset = 0

  for (const [name, content] of Object.entries(files)) {
    const nameBuffer = Buffer.from(name)
    const data = Buffer.from(content)
    const crc = crc32(data)

    const localHeader = Buffer.alloc(30)
    localHeader.writeUInt32LE(0x04034b50, 0)
    localHeader.writeUInt16LE(20, 4)
    localHeader.writeUInt16LE(0, 6)
    localHeader.writeUInt16LE(0, 8)
    localHeader.writeUInt32LE(crc, 14)
    localHeader.writeUInt32LE(data.length, 18)
    localHeader.writeUInt32LE(data.length, 22)
    localHeader.writeUInt16LE(nameBuffer.length, 26)

    localParts.push(localHeader, nameBuffer, data)

    const centralHeader = Buffer.alloc(46)
    centralHeader.writeUInt32LE(0x02014b50, 0)
    centralHeader.writeUInt16LE(20, 4)
    centralHeader.writeUInt16LE(20, 6)
    centralHeader.writeUInt16LE(0, 8)
    centralHeader.writeUInt16LE(0, 10)
    centralHeader.writeUInt32LE(crc, 16)
    centralHeader.writeUInt32LE(data.length, 20)
    centralHeader.writeUInt32LE(data.length, 24)
    centralHeader.writeUInt16LE(nameBuffer.length, 28)
    centralHeader.writeUInt32LE(offset, 42)
    centralParts.push(centralHeader, nameBuffer)

    offset += localHeader.length + nameBuffer.length + data.length
  }

  const centralDirectory = Buffer.concat(centralParts)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(Object.keys(files).length, 8)
  end.writeUInt16LE(Object.keys(files).length, 10)
  end.writeUInt32LE(centralDirectory.length, 12)
  end.writeUInt32LE(offset, 16)

  return Buffer.concat([...localParts, centralDirectory, end])
}

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}
