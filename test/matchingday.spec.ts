import { test, expect } from '@playwright/test'

test.describe.parallel('Scraping matchingday landing page', () => {
  test('letter from the ceo page', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.click('#__next > div > header > nav > ul > li:nth-child(1) > a')

    const pageTitle = page.locator('h1')
    await expect(pageTitle).toBeVisible()
  })
  test('browse profiles page', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.click('//*[@id="__next"]/div/header/nav/ul/li[2]/a')

    await expect(page).toHaveURL('https://dotunpeters.matchingday.com/browse-profiles?filter=in-usa')
  })
  test('faq page', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.click('#__next > div > header > nav > ul > li:nth-child(3) > a')

    const pageTitle = page.locator('h1')
    await expect(pageTitle).toBeVisible()
  })
  test('pricing page', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.click('#__next > div > header > nav > ul > li:nth-child(4) > a')

    const pageTitle = page.locator('h1')
    await expect(pageTitle).toBeVisible()
  })
  test('create an ip profile page', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.click('#__next > div > header > nav > ul > li:nth-child(5) > a')

    const pageTitle = page.locator('h1')
    await expect(pageTitle).toBeVisible()
  })
})

test.describe.parallel('Signing up for matchingday', () => {
  
})