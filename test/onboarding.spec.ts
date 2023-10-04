import { test, expect } from '@playwright/test'

test.describe.parallel('Speed up test', () => {
  test('scraping md landing page', async ({ page }) => {
    await page.goto('https://popcorn150.matchingday.com/')
    await page.click('//*[@id="__next"]/div/header/nav/ul/li[5]/a')

    await page.click('text=Continue with Google')

    const pageTitle = page.locator('h3')
    await expect(pageTitle).toContainText('Hello IP. Let\s help you get noticed.')

    await page.waitForTimeout(2000)
  })
})
