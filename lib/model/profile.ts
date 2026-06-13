export interface ProfileExperience {
  company: string
  role: string
  location?: string
  startDate?: string
  endDate?: string | null
  summary?: string
}

export interface ProfileEducation {
  school: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string
  summary?: string
}

export interface PersonalProfile {
  about: string
  headline?: string
  location?: string
  experience: ProfileExperience[]
  education: ProfileEducation[]
  skills: string[]
  updatedAt: string
  source: "default" | "linkedin-export"
}
