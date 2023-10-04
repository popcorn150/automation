import { test, expect } from '@playwright/test'

test('something quick', async ({ page }) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('clicking on elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('text=Sign in')

  const errorMessage = page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.only('working with inputs', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.type('#user_login', 'bananaflakes')
  await page.type('#user_password', 'bananapassword')

  await page.click('text=Sign in')
})
