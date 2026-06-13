import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInSection } from "@/components/fade-in-section"
import { getProfile } from "@/lib/services/profile-store"
import { LINKS } from "@/lib/constants"
import { BriefcaseBusiness, ExternalLink, GraduationCap, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

export async function ProfileSection() {
  const profile = await getProfile()
  const sortedExperience = [...profile.experience].sort(compareExperience)
  const featuredExperience = sortedExperience.slice(0, 4)
  const hasMoreExperience = sortedExperience.length > featuredExperience.length
  const featuredEducation = profile.education.slice(0, 2)

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/20" />
      <div className="absolute left-10 top-24 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-16 right-10 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <FadeInSection>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              {profile.headline || "Mobile Developer"}
            </p>
          </div>
        </FadeInSection>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeInSection delay={150}>
            <div className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3 text-primary">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-medium">Profile</span>
                  </div>
                  <CardTitle className="text-2xl">Professional Summary</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{profile.about}</CardDescription>
                </CardHeader>
                {(profile.location || profile.updatedAt) && (
                  <CardContent className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    {profile.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {profile.location}
                      </span>
                    )}
                    {profile.updatedAt && <span>Updated {formatDate(profile.updatedAt)}</span>}
                  </CardContent>
                )}
              </Card>

              {profile.skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Core Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.slice(0, 14).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-primary/20 px-3 py-1 text-primary transition-all duration-300 hover:bg-primary/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {featuredEducation.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <div className="space-y-3">
                    {featuredEducation.map((item) => (
                      <div
                        key={`${item.school}-${item.degree}-${item.startDate}`}
                        className="flex gap-3 rounded-lg border border-border bg-card p-4"
                      >
                        <GraduationCap className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{item.school}</p>
                          <p className="text-sm text-muted-foreground">
                            {[item.degree, item.field, formatPeriod(item.startDate, item.endDate)]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeInSection>

          <FadeInSection delay={250}>
            <div className="space-y-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">Experience</h3>
                </div>
                {featuredExperience.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Recent roles
                  </Badge>
                )}
              </div>

              {featuredExperience.length > 0 ? (
                <div className="space-y-4">
                  {featuredExperience.map((item, index) => (
                    <Card
                      key={`${item.company}-${item.role}-${item.startDate}`}
                      className="group border-border bg-card transition-all duration-500 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                    >
                      <CardHeader>
                        <div className="flex gap-4">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <BriefcaseBusiness className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="break-words text-xl transition-colors duration-300 group-hover:text-primary">
                              {item.role || item.company}
                            </CardTitle>
                            <CardDescription className="mt-1 break-words">
                              {[item.company, formatPeriod(item.startDate, item.endDate), item.location]
                                .filter(Boolean)
                                .join(" • ")}
                            </CardDescription>
                          </div>
                          <span className="hidden text-sm font-medium text-muted-foreground sm:block">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </CardHeader>
                      {item.summary && (
                        <CardContent>
                          <ExperienceSummary summary={item.summary} />
                        </CardContent>
                      )}
                    </Card>
                  ))}
                  {hasMoreExperience && (
                    <Link
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                    >
                      View full experience
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ) : (
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-muted-foreground">
                    Upload a LinkedIn data export to populate your experience automatically.
                  </CardContent>
                </Card>
              )}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

function ExperienceSummary({ summary }: { summary: string }) {
  const blocks = parseSummaryBlocks(summary)

  if (blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul key={index} className="ml-4 list-disc space-y-1 marker:text-primary">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.text}</p>
        ),
      )}
    </div>
  )
}

type SummaryBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] }

export function parseSummaryBlocks(summary: string): SummaryBlock[] {
  const lines = summary
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return []
  }

  const blocks: SummaryBlock[] = []
  let pendingParagraph: string[] = []
  let pendingList: string[] = []

  const flushParagraph = () => {
    if (pendingParagraph.length > 0) {
      blocks.push({ type: "paragraph", text: pendingParagraph.join(" ") })
      pendingParagraph = []
    }
  }

  const flushList = () => {
    if (pendingList.length > 0) {
      blocks.push({ type: "list", items: pendingList })
      pendingList = []
    }
  }

  for (const line of lines) {
    const bullet = line.match(/^[-*•▪◦‣]\s+(.+)$/) || line.match(/^\d+[.)]\s+(.+)$/)
    if (bullet) {
      flushParagraph()
      pendingList.push(...splitInlineBulletItems(bullet[1].trim()))
    } else {
      flushList()
      pendingParagraph.push(line)
    }
  }

  flushParagraph()
  flushList()

  if (blocks.length === 1 && blocks[0].type === "paragraph") {
    return splitInlineBullets(blocks[0].text)
  }

  return blocks
}

function splitInlineBullets(text: string): SummaryBlock[] {
  const startsWithBullet = /^[•▪◦‣]\s+/.test(text.trim())
  const items = splitInlineBulletItems(text)

  if (items.length <= 1) {
    return [{ type: "paragraph", text }]
  }

  const [intro, ...bullets] = items
  if (!startsWithBullet && bullets.length > 0) {
    return [
      { type: "paragraph", text: intro },
      { type: "list", items: bullets },
    ]
  }

  return [
    ...(intro.endsWith(":") ? [{ type: "paragraph" as const, text: intro }] : []),
    { type: "list", items: intro.endsWith(":") ? bullets : items },
  ]
}

function splitInlineBulletItems(text: string): string[] {
  return text
    .split(/(?:^|\s+)[•▪◦‣]\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date)
}

function formatPeriod(startDate?: string, endDate?: string | null): string {
  if (!startDate && !endDate) {
    return ""
  }

  return `${formatProfileDate(startDate) || "Unknown"} - ${formatProfileDate(endDate) || "Present"}`
}

function formatProfileDate(value?: string | null): string {
  if (!value) {
    return ""
  }

  const normalized = value.trim()
  const yearMonth = normalized.match(/^(\d{4})-(\d{1,2})$/)
  if (yearMonth) {
    const [, year, month] = yearMonth
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(Number(year), Number(month) - 1, 1))
  }

  const yearOnly = normalized.match(/^\d{4}$/)
  if (yearOnly) {
    return normalized
  }

  const date = new Date(normalized)
  if (!Number.isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date)
  }

  return normalized
}

function compareExperience(a: { startDate?: string; endDate?: string | null }, b: { startDate?: string; endDate?: string | null }) {
  return getExperienceSortTime(b) - getExperienceSortTime(a)
}

function getExperienceSortTime(item: { startDate?: string; endDate?: string | null }): number {
  if (!item.endDate) {
    return Number.MAX_SAFE_INTEGER
  }

  return parseDateTime(item.endDate) || parseDateTime(item.startDate) || 0
}

function parseDateTime(value?: string | null): number {
  if (!value) {
    return 0
  }

  const normalized = value.trim()
  const yearMonth = normalized.match(/^(\d{4})-(\d{1,2})$/)
  if (yearMonth) {
    return new Date(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1).getTime()
  }

  const yearOnly = normalized.match(/^\d{4}$/)
  if (yearOnly) {
    return new Date(Number(normalized), 0, 1).getTime()
  }

  const date = new Date(normalized)
  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}
