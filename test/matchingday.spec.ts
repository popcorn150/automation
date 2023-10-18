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

test.describe.parallel.only('Building the profile', () => {
  test('Basic - Introduction', async ({ page }) => {
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
    await page
      .getByRole('button', { name: ' Start building your profile' })
      .click()

    // Introduction
    const textArea = page.locator(
      '//*[@id="mantine-gh5mw5f7c-panel-basic"]/div[2]/div[2]/textarea',
    )
    await textArea.click({ force: true })
    // await page.getByRole('textbox').fill('Hi there! This is my introduction')
    await page
      .getByLabel(
        'Write a brief introduction so that Surrogates can quickly get to know you.  The limit is 500 characters.',
      )
      .fill('Hi there! This is my introduction')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)

    // const element = page.locator('h3')
    // await expect(element).toHaveText('Matching Day')
  })

  test('Basic - About your journey', async ({ page }) => {
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

    // About your journey
    await page.getByRole('button', { name: 'Edit' }).click()

    // Type of surrogacy
    // mantine-Input-input mantine-Select-input mantine-1cn2mlo (incase the selectorS doesn't works)
    await page.locator('#mantine-15nce71ep').selectOption('Traditional')

    // Type of journey
    await page.locator('#mantine-avyop31kl').selectOption('First Child')

    // How long have you been looking for a surrogate
    await page.locator('#mantine-0ti71hkpn').selectOption('1 to 3 years')

    // Egg donor required
    await page.locator('#mantine-eqs2h73gz').selectOption('Yes')

    // Embryo Information
    await page.getByRole('textbox').fill('Imma give ya my embryo info later')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
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
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Agency Information
    await page.getByRole('button', { name: 'Edit' }).click()

    // Are you open to matching with an independent surrogate
    await page.locator('#mantine-m8a3yocse').selectOption('Yes')

    // Are you working with an agency
    await page.locator('#mantine-ihyyklsw0').selectOption('Yes')

    // Agency name
    await page.getByRole('textbox').fill('Banana Agency')

    // Agency address
    await page.getByRole('textbox').type('Bahamas', { delay: 100 })
    await page.locator('#mantine-pkc7mfbo6').selectOption('Bahamas')

    // Are you open to matching with a surrogate from a different agency
    await page.locator('#mantine-1631dx1tx').selectOption('Yes')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
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
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByLabel('Enter your password').click()
    await page.getByLabel('Enter your password').fill('D3YS6%gy')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.waitForTimeout(1000)

    // Agency Information
    await page.getByRole('button', { name: 'Edit' }).click()

    // Are you open to matching with an independent surrogate
    await page.locator('#mantine-m8a3yocse').selectOption('No')

    // Are you working with an agency
    await page.locator('#mantine-ihyyklsw0').selectOption('No')

    // Are you open to agencies contacting you
    await page.locator('#mantine-ihvm7vp4q').fill('No')

    // Are you open to matching with a surrogate who is with an agency
    await page.locator('#mantine-mh2r4oj4f').selectOption('No')

    //saving...
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(10000)
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

  test('Basic - Your story', async ({page}) => {
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

    await page.getByRole('textbox').fill('Hi there! This is my story!')
  })
})
