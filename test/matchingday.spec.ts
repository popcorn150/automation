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

    await expect(page).toHaveURL(
      'https://dotunpeters.matchingday.com/browse-profiles?filter=in-usa',
    )
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

test.describe.parallel.only('Signing up for matchingday', () => {
  test('onboarding', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    //create an ip profile
    await page.click('#__next > div > header > nav > ul > li:nth-child(5) > a')
    //continue with google
    await page
      .locator(
        '#__next > div > main > div.landingLayout_container___2Cg_ > div > button > span',
      )
      .click({ force: true })
    await page.waitForTimeout(2000)

    //email
    await page
      .locator('//*[@id="identifierId"]')
      .type('david.damian@10hourlabs.com', { delay: 200 })
    await page.getByRole('button', { name: 'Next' }).click({ force: true })

    //password
    await page.waitForTimeout(2000)
    await page
      .locator('//*[@id="password"]/div[1]/div/div[1]/input')
      .type('D3YS6%gy', { delay: 200 })
    await page.getByRole('button', { name: 'Next' }).click({ force: true })

    //redirecting...
    await page.waitForTimeout(2000)

    //step0
    await page.getByRole('button', {name: 'Let\s Begin'}).click({force: true})

    // //step1
    // await page.getByRole('textbox').press('Command+A')
    // await page.getByRole('textbox').press('Command+X')
    // await page.getByRole('textbox').type('Testing', {delay: 100})

    const element = page.locator('h1')
    await expect(element).not.toBeVisible()
  })
})
