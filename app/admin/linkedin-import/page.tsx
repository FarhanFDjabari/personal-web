"use client"

import { useState, type FormEvent } from "react"
import { Upload, Lock, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImportResult {
  changed: boolean
  hash: string
  experienceCount: number
  educationCount: number
  skillCount: number
  updatedAt: string
}

export default function LinkedInImportPage() {
  const [password, setPassword] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ImportResult | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      if (!file) {
        throw new Error("Choose a LinkedIn export ZIP first.")
      }

      const formData = new FormData()
      formData.set("password", password)
      formData.set("archive", file)

      const response = await fetch("/api/admin/linkedin-import", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Import failed.")
      }

      setResult(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Import failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-20 text-foreground">
      <div className="mx-auto max-w-xl space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-primary">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">Private Import</span>
          </div>
          <h1 className="text-3xl font-bold">LinkedIn Data Import</h1>
          <p className="text-muted-foreground">
            Upload the ZIP file from LinkedIn&apos;s data export. The site will parse experience, education, skills,
            and profile summary, then update the public profile data only when the parsed content changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-card p-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Import password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="archive" className="text-sm font-medium">
              LinkedIn export ZIP
            </label>
            <input
              id="archive"
              type="file"
              accept=".zip,application/zip"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            {loading ? "Importing..." : "Import LinkedIn Export"}
          </Button>
        </form>

        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="mt-0.5 h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/10 p-4">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-medium">{result.changed ? "Profile data updated." : "No changes detected."}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Imported {result.experienceCount} experience entries, {result.educationCount} education entries, and{" "}
              {result.skillCount} skills.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
