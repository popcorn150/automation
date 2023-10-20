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

test.describe.parallel('Signing up for matchingday', () => {
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
    await page.getByRole('button').click({ force: true })

    // const element = page.locator('h1')
    // await expect(element).not.toBeVisible()
  })
})

test.describe.parallel('Building the profile', () => {
  test('Basic - Introduction', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page
      .getByLabel('Email or phone')
      .type('david.damian@10hourlabs.com', { delay: 200 })
    await page.getByLabel('Email or phone').press('Enter')
    await page.getByLabel('Enter your password').click()
    await page
      .getByLabel('Enter your password')
      .type('D3YS6%gy', { delay: 200 })
    await page.getByLabel('Enter your password').press('Enter')
    await page.waitForTimeout(10000)

    // Start building your profile
    await page
      .getByRole('button', { name: 'Start building your profile' })
      .first()
      .click()
    await page
      .getByLabel('Basic')
      .locator('div')
      .filter({
        hasText:
          'Write a brief introduction so that Surrogates can quickly get to know you. The limit is 500 characters.',
      })
      .nth(1)
      .click()

    // Introduction
    await page
      .getByPlaceholder(
        'Write a brief introduction so that Surrogates can quickly get to know you.  The limit is 500 characters.',
      )
      .type('Hey there! This is my introduction!', { delay: 100 })

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()

    const element = page.locator('h1')
    await expect(element).not.toBeVisible()
  })

  test('Basic - About your journey', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page
      .getByLabel('Email or phone')
      .type('david.damian@10hourlabs.com', { delay: 200 })
    await page.getByLabel('Email or phone').press('Enter')
    await page.getByLabel('Enter your password').click()
    await page
      .getByLabel('Enter your password')
      .type('D3YS6%gy', { delay: 200 })
    await page.getByLabel('Enter your password').press('Enter')
    await page.waitForTimeout(10000)

    // About your journey
    await page
      .getByRole('button', { name: 'Start building your profile' })
      .first()
      .click()
    await page
      .locator('div')
      .filter({ hasText: /^About your journeyEdit$/ })
      .getByRole('button')
      .click()
    await page.locator('#mantine-ypm7rahx9').click()
    // Type of surrogacy
    await page.getByRole('option', { name: 'Traditional' }).click()
    await page.getByRole('searchbox').nth(1).click()
    // Type of jouney
    await page.getByRole('option', { name: 'First Child' }).click()
    await page.locator('#mantine-euhn1jke0').click()
    // How many years have you been looking for a surrogate
    await page.getByRole('option', { name: 'Less than a year' }).click()
    await page.locator('#mantine-hcf3r577k').click()
    // Egg donor required
    await page.getByRole('option', { name: 'No', exact: true }).click()
    // Embryo Information
    await page.getByPlaceholder('Embryo Information').click()
    await page.getByPlaceholder('Embryo Information').fill('Blah Blah Blah')
    // Saving...
    await page.getByRole('button', { name: 'Save' }).click()

    const element = page.locator('h1')
    await expect(element).not.toBeVisible()
  })

  test('Basic - Agency Information[Yes]', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByLabel('Email or phone').press('Enter')
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByLabel('Enter your password').press('Enter')
    await page.waitForTimeout(1000)

    // Agency Information
    await page
      .locator('div')
      .filter({ hasText: /^Agency informationEdit$/ })
      .getByRole('button')
      .click()

    // Are you open to matching with an independent surrogate
    await page.locator('#mantine-yj5kgnjcr').click()
    await page.getByRole('option', { name: 'Yes' }).click()

    // Are you working with an agency
    await page.locator('#mantine-84dgjkbxy').click()
    await page.getByRole('option', { name: 'Yes' }).click()

    // Agency name
    await page.getByPlaceholder('Surrogate Type').click()
    await page.getByPlaceholder('Surrogate Type').fill('Banana Agency')

    // Agency address
    await page.getByRole('searchbox').nth(2).click()
    await page.getByRole('searchbox').nth(2).fill('Baha')
    await page.getByRole('option', { name: 'Bahamas' }).click()

    // Are you open to matching with a surrogate from a different agency
    await page.locator('#mantine-z69rgv0ph').click()
    await page.getByRole('option', { name: 'Yes' }).click()

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()

    const element = page.locator('h1')
    await expect(element).not.toBeVisible()
  })
  test('Basic - Agency Information[No]', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByLabel('Email or phone').press('Enter')
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByLabel('Enter your password').press('Enter')
    await page.waitForTimeout(1000)

    // Agency Information
    await page
      .locator('div')
      .filter({ hasText: /^Agency informationEdit$/ })
      .getByRole('button')
      .click()

    // Are you open to matching with an independent surrogate
    await page.locator('#mantine-yj5kgnjcr').click()
    await page.getByRole('option', { name: 'No' }).click()

    // Are you working with an agency
    await page.locator('#mantine-84dgjkbxy').click()
    await page.getByRole('option', { name: 'No' }).click()

    // Are you open to agencies contacting you
    await page.locator('#mantine-hu28hyi1s').click();
    await page.getByRole('option', { name: 'No' }).click();

    // Are you open to matching with a surrogate who is with an agency
    await page.locator('#mantine-unn3ey3ft').click();
    await page.getByRole('option', { name: 'No' }).click();

    //saving...
    await page.getByRole('button', { name: 'Save' }).click();

    const element = page.locator('h1')
    await expect(element).not.toBeVisible()
  })

  test('Basic - Relationship[Married]', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Relationship
    await page.getByRole('button', { name: 'Edit' }).click()

    // Relationship status
    await page.locator('#mantine-msepabtob').selectOption('Married')

    // Years togehter
    await page.locator('#mantine-9xu7e95ik').selectOption('1 to 5 years')

    // Type of couple
    await page.locator('#mantine-1p9jngkbk').selectOption('Heterosexual')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
  })
  test('Basic - Relationship[Single]', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Relationship
    await page.getByRole('button', { name: 'Edit' }).click()

    // Relationship status
    await page.locator('#mantine-msepabtob').selectOption('Single')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
  })

  test('Basic - Clinic', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Clinic
    await page.getByRole('button', { name: 'Edit' }).click()

    // Clinic name
    await page.getByRole('textbox').fill('Banana Clinic')

    // Clinic address
    await page.getByRole('textbox').type('Bahamas', { delay: 100 })
    await page.locator('#mantine-2mngt42h0').selectOption('Bahamas')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
  })

  test('Basic - Your story', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Your story
    await page.getByRole('button', { name: 'Edit' }).click()

    //Write your story
    await page.getByRole('textbox').fill('Hi there! This is my story!')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
  })

  test('Basic - Matching Information', async ({ page }) => {
    await page.goto('https://dotunpeters.matchingday.com/')
    await page.getByRole('button').click()
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page
      .getByRole('button', { name: 'Google Icon Continue with Google' })
      .click()
    await page.getByLabel('Email or phone').click()
    await page.getByLabel('Email or phone').fill('david.damian@10hourlabs.com')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Surrogate Location
    await page
      .locator('MatchingInformation_editable__599eO')
      .fill('Hi there! This is my story!')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(1000)
  })
})
