import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS } from '../test-data/users';
import { PRODUCTS } from '../test-data/products';

test.describe('Checkout', () => {
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);
    await login.goto();
    await login.login(USERS.standard);
  });

  test('completes an order for one item', async ({ page }) => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.openCart();
    await cart.checkout();
    await checkout.fillInfo('Jane', 'Doe', '33701');
    await checkout.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkout.subtotal).toContainText(PRODUCTS.backpack.price);

    await checkout.finish();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkout.completeHeader).toHaveText('Thank you for your order!');
  });

  test('order summary adds up the subtotal for two items', async () => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.addToCart(PRODUCTS.bikeLight.slug);
    await inventory.openCart();
    await cart.checkout();
    await checkout.fillInfo('Jane', 'Doe', '33701');
    await checkout.continue();

    // 29.99 + 9.99
    await expect(checkout.subtotal).toContainText('39.98');
  });
});
