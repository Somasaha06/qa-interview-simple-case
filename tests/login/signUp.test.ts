import { test, expect } from '@playwright/test'
import { logIn } from '../../src/utils/authHelpers'; // Import helper function
import { existingUsers } from '../../test-setup/localstorage.setup'

test.describe.configure({ mode: 'serial' })

test.describe('signUp page tests', () => {
  test('Verify SignUp', async ({ page }) => {
    await page.goto('http://localhost:8080/login')
    const existingUser = existingUsers[1]
    //Click  SignUp button
    const button_signUp = page.locator('text=Signup')
    button_signUp.click()
    await page
      .locator('#firstName')
      .pressSequentially(existingUser.firstName);

      await page
      .locator('#lastName')
      .pressSequentially(existingUser.lastName);

      await page
      .locator('#email')
      .pressSequentially(existingUser.email);

      await page
      .locator('#password')
      .pressSequentially(existingUser.password);

      // Submit button
      await page.getByRole('button', { name: 'Submit' }).click();
    //const button_submit = page.locator('text=Submit')
    // Click on the button
    //button_submit.click()
    //Verify SignUp is Success
    const element = await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Log out')).toBeVisible()
    //Logout
    await page.locator('button:text("Log out")').click();
    const login_page = 'http://localhost:8080/login';
    await expect(page).toHaveURL(login_page);

    //await page
     // .locator('#root form div:nth-child(1) > div > input')
     // .pressSequentially(existingUser.email)

    // Reuse sign-in function instead of repeating login steps
    await logIn(page, existingUser.email, existingUser.password);

   // Verify login success
   await page.waitForLoadState('domcontentloaded'); 
   await expect(page.getByText(`Welcome ${existingUser.firstName} ${existingUser.lastName}`)).toBeVisible();
   await expect(page.getByText('Log out')).toBeVisible()
    
  })
})
