import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS } from '../test-data/users';
import { PRODUCTS } from '../test-data/products';

const cases = [
  { name: 'missing first name', first: '', last: 'Doe', zip: '33701', message: 'First Name is required' },
  { name: 'missing last name', first: 'Jane', last: '', zip: '33701', message: 'Last Name is required' },
  { name: 'missing postal code', first: 'Jane', last: 'Doe', zip: '', message: 'Postal Code is required' },
];

test.describe('Checkout form validation', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    await login.goto();
    await login.login(USERS.standard);
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.openCart();
    await cart.checkout();
  });

  for (const c of cases) {
    test(`shows an error for ${c.name}`, async ({ page }) => {
      const checkout = new CheckoutPage(page);
      await checkout.fillInfo(c.first, c.last, c.zip);
      await checkout.continue();

      await expect(checkout.error).toContainText(c.message);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }
});
