import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../test-data/users';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user can log in and sees the product list', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await loginPage.login(USERS.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventory.title).toHaveText('Products');
    await expect(inventory.items).toHaveCount(6);
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    await loginPage.login(USERS.standard, 'not_the_password');

    await expect(loginPage.error).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('locked out user is blocked with a clear message', async () => {
    await loginPage.login(USERS.lockedOut);

    await expect(loginPage.error).toContainText('locked out');
  });
});
