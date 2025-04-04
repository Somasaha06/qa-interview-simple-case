import { Page } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup'

export async function logIn(page: Page, email: string, password: string) {
  await page.goto('http://localhost:8080/login');
  await page
      .locator('#root form div:nth-child(1) > div > input')
      .pressSequentially(email)
      await page
      .locator('#root form div:nth-child(2) > div > input')
      .pressSequentially(password)
  // Submit button
  const button = page.locator('form .MuiButton-sizeMedium')
  // Click on the button
  button.click()
}
