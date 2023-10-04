import { test, expect } from '@playwright/test'

test.describe.parallel('Speed up test', () => {
  test('scraping md landing page', async ({ page }) => {
    await page.goto('https://popcorn150.matchingday.com/')
    await page.click('//*[@id="__next"]/div/header/nav/ul/li[5]/a')

    await page.click('text=Continue with Google')

    const pageTitle = page.locator('h3')
    await expect(pageTitle).toBeVisible()

    await page.waitForTimeout(3000)
  })
})
