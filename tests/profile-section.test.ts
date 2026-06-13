import { strict as assert } from "node:assert"
import { test } from "node:test"
import { parseSummaryBlocks } from "@/components/profile-section"

test("parseSummaryBlocks maps bullet-only inline LinkedIn descriptions to list items", () => {
  const blocks = parseSummaryBlocks(
    "• Maintained and enhanced production e-commerce applications by resolving defects, implementing new features, and improving existing functionality • Introduced AI-assisted development workflows for debugging, code analysis, and implementation, reducing development time by approximately 40% and accelerating feature delivery.",
  )

  assert.deepEqual(blocks, [
    {
      type: "list",
      items: [
        "Maintained and enhanced production e-commerce applications by resolving defects, implementing new features, and improving existing functionality",
        "Introduced AI-assisted development workflows for debugging, code analysis, and implementation, reducing development time by approximately 40% and accelerating feature delivery.",
      ],
    },
  ])
})

test("parseSummaryBlocks keeps intro paragraph separate from inline bullet list", () => {
  const blocks = parseSummaryBlocks(
    "At Mitra Informatika, I worked on building and maintaining mobile applications for clients in various sector. My role involved a mix of native Android and cross-platform development, with a strong focus on performance, stability, and reusable UI.  • Improved overall app stability by addressing Android lifecycle issues and resolving a recurring crash problem affecting end users. • Implemented reusable UI components with Jetpack Compose and Flutter, helping the team speed up future app development.",
  )

  assert.deepEqual(blocks, [
    {
      type: "paragraph",
      text: "At Mitra Informatika, I worked on building and maintaining mobile applications for clients in various sector. My role involved a mix of native Android and cross-platform development, with a strong focus on performance, stability, and reusable UI.",
    },
    {
      type: "list",
      items: [
        "Improved overall app stability by addressing Android lifecycle issues and resolving a recurring crash problem affecting end users.",
        "Implemented reusable UI components with Jetpack Compose and Flutter, helping the team speed up future app development.",
      ],
    },
  ])
})
