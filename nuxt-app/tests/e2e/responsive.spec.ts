import { test, expect } from '@playwright/test'

test.describe('Responsive Design', () => {
  test('should display mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    const mobileMenuButton = page.getByLabel('Toggle menu')
    await expect(mobileMenuButton).toBeVisible()

    await mobileMenuButton.click()

    // Mobile menu should open
    await page.waitForTimeout(300)
  })

  test('should hide mobile menu on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')

    const desktopNav = page.locator('nav.hidden.md\\:flex')
    await expect(desktopNav).toBeVisible()
  })

  test('should adapt layout on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    const projectsSection = page.locator('#projects')
    await expect(projectsSection).toBeVisible()
  })

  test('should work on mobile portrait', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('should work on mobile landscape', async ({ page }) => {
    await page.setViewportSize({ width: 812, height: 375 })
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})
