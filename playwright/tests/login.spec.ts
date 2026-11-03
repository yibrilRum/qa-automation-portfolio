import { test, expect } from '@playwright/test';

// Day 1: intentionally written as plain specs (no Page Objects yet).
// Day 2 refactors these into a Page Object Model in a separate PR.

test.describe('Login', () => {
  test('standard user can log in and sees the product list', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('not_the_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('locked out user is blocked with a clear message', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});
