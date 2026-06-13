import axe from "axe-core"
import { chromium } from "playwright"

const BASE_URL = process.env.A11Y_BASE_URL || "http://localhost:3000"
const pages = [
  { name: "Home", path: "/" },
  { name: "LinkedIn Import", path: "/admin/linkedin-import" },
]

const browser = await chromium.launch({ headless: true })
const results = []

try {
  for (const target of pages) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } })
    await page.goto(`${BASE_URL}${target.path}`, { waitUntil: "networkidle" })
    await page.waitForSelector("main", { timeout: 10_000 })
    await page.addScriptTag({ content: axe.source })
    const result = await page.evaluate(async () => {
      return axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
        },
      })
    })

    results.push({
      name: target.name,
      path: target.path,
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
      passes: result.passes.length,
      incomplete: result.incomplete.length,
      inapplicable: result.inapplicable.length,
    })
    await page.close()
  }
} finally {
  await browser.close()
}

const totalViolations = results.reduce((sum, result) => sum + result.violations.length, 0)
const totalChecks = results.reduce(
  (sum, result) => sum + result.passes + result.violations.length + result.incomplete + result.inapplicable,
  0,
)
const score = totalChecks > 0 ? Math.round(((totalChecks - totalViolations) / totalChecks) * 100) : 100

console.log(JSON.stringify({ score, totalViolations, results }, null, 2))

if (totalViolations > 0) {
  process.exitCode = 1
}
