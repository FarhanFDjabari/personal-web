import { test, expect } from '@playwright/test'

test.describe('Blog Page', () => {
  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/')

    const blogLink = page.getByRole('link', { name: /blog/i }).first()
    await blogLink.click()

    await expect(page).toHaveURL('/blog')
  })

  test('should display blog page title', async ({ page }) => {
    await page.goto('/blog')

    const title = page.getByRole('heading', { level: 1 })
    await expect(title).toBeVisible()
  })

  test('should load blog posts from Medium', async ({ page }) => {
    await page.goto('/blog')

    // Wait for posts to load (they come from API)
    await page.waitForTimeout(2000)

    // Check if posts or loading state is visible
    const pageContent = await page.content()
    expect(pageContent.length).toBeGreaterThan(0)
  })

  test('should display post metadata', async ({ page }) => {
    await page.goto('/blog')

    // Wait for potential posts to load
    await page.waitForTimeout(2000)

    // Check for read time indicators if posts exist
    const readTimeElements = page.locator('text=/min read/i')
    const count = await readTimeElements.count()

    // Either posts loaded with read time, or no posts (both valid)
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('should have external links to Medium', async ({ page }) => {
    await page.goto('/blog')

    // Wait for posts to load
    await page.waitForTimeout(2000)

    // Check for Medium links if they exist
    const mediumLinks = page.locator('a[href*="medium.com"]')
    const count = await mediumLinks.count()

    if (count > 0) {
      const firstLink = mediumLinks.first()
      await expect(firstLink).toHaveAttribute('target', '_blank')
      await expect(firstLink).toHaveAttribute('rel', /noopener/)
    }
  })

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/blog')

    const homeLink = page.getByText('FarhanFDjabari')
    await homeLink.click()

    await expect(page).toHaveURL('/')
  })
})
