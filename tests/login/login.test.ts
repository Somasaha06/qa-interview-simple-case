import { test, expect } from '@playwright/test'
import { logIn } from '../../src/utils/authHelpers'; // Import the helper function
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('login form tests', () => {
  test('logging in works with existing account', async ({ page }) => {
    const existingUser = existingUsers[0]
    await logIn(page, existingUser.email, existingUser.password);
    // Wait for the page to fully loaded
    await page.waitForLoadState('domcontentloaded'); 
    await expect(page.getByText('Log out')).toBeVisible()
  })
})
