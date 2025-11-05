import { describe, it, expect } from 'vitest'
import { LINKS, MEDIUM_CACHE_DURATION, GITHUB_CACHE_DURATION } from '../../utils/constants'

describe('Constants', () => {
  describe('LINKS', () => {
    it('should have all required social links', () => {
      expect(LINKS).toHaveProperty('resume')
      expect(LINKS).toHaveProperty('github')
      expect(LINKS).toHaveProperty('linkedin')
      expect(LINKS).toHaveProperty('medium')
      expect(LINKS).toHaveProperty('email')
    })

    it('should have valid URLs', () => {
      expect(LINKS.github).toMatch(/^https:\/\/github\.com\//)
      expect(LINKS.linkedin).toMatch(/^https:\/\/linkedin\.com\//)
      expect(LINKS.medium).toMatch(/^https:\/\/medium\.com\//)
      expect(LINKS.email).toMatch(/^mailto:/)
    })

    it('should have resume link', () => {
      expect(LINKS.resume).toBeTruthy()
      expect(typeof LINKS.resume).toBe('string')
    })
  })

  describe('Cache Durations', () => {
    it('should have correct Medium cache duration (6 hours)', () => {
      const sixHoursInMs = 6 * 60 * 60 * 1000
      expect(MEDIUM_CACHE_DURATION).toBe(sixHoursInMs)
    })

    it('should have correct GitHub cache duration (24 hours)', () => {
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000
      expect(GITHUB_CACHE_DURATION).toBe(twentyFourHoursInMs)
    })
  })
})
