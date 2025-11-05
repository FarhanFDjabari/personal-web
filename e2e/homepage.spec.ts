import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Portfolio/)
  })

  test('should display the hero section', async ({ page }) => {
    await page.goto('/')

    const heroSection = page.locator('#about')
    await expect(heroSection).toBeVisible()

    const title = page.getByText('Farhan Fadhilah Djabari')
    await expect(title).toBeVisible()
  })

  test('should display the header with navigation', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()

    const siteName = page.getByText('FarhanFDjabari')
    await expect(siteName).toBeVisible()
  })

  test('should display projects section', async ({ page }) => {
    await page.goto('/')

    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()

    // Wait for projects to load (they come from API)
    await page.waitForSelector('#projects', { timeout: 10000 })
  })

  test('should display footer', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    const currentYear = new Date().getFullYear().toString()
    await expect(footer).toContainText(currentYear)
  })

  test('should have social media links', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    const githubLink = footer.locator('a[href*="github.com"]')
    const linkedinLink = footer.locator('a[href*="linkedin.com"]')

    await expect(githubLink).toBeVisible()
    await expect(linkedinLink).toBeVisible()
  })

  test('should navigate to sections on click', async ({ page }) => {
    await page.goto('/')

    // Click on projects nav item (desktop)
    const projectsButton = page.getByText('projects').first()

    if (await projectsButton.isVisible()) {
      await projectsButton.click()

      // Check if scrolled to projects section
      const projectsSection = page.locator('#projects')
      await expect(projectsSection).toBeInViewport()
    }
  })

  test('should toggle theme', async ({ page }) => {
    await page.goto('/')

    const themeButton = page.getByLabel('Toggle theme')
    await expect(themeButton).toBeVisible()

    await themeButton.click()

    // Wait a bit for theme to change
    await page.waitForTimeout(300)
  })
})
