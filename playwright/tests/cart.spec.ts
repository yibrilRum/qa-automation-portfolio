import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { USERS } from '../test-data/users';
import { PRODUCTS } from '../test-data/products';

test.describe('Cart', () => {
  let inventory: InventoryPage;
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    await login.goto();
    await login.login(USERS.standard);
    await expect(inventory.title).toHaveText('Products');
  });

  test('adding one item updates the badge and shows it in the cart', async ({ page }) => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.openCart();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cart.items).toHaveCount(1);
    await expect(cart.itemNames).toHaveText(PRODUCTS.backpack.name);
  });

  test('adding two items shows both in the cart', async ({ page }) => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.addToCart(PRODUCTS.bikeLight.slug);
    await expect(inventory.cartBadge).toHaveText('2');

    await inventory.openCart();
    await expect(cart.items).toHaveCount(2);
    await expect(cart.itemNames).toHaveText([PRODUCTS.backpack.name, PRODUCTS.bikeLight.name]);
  });

  test('removing the only item empties the cart and clears the badge', async () => {
    await inventory.addToCart(PRODUCTS.backpack.slug);
    await inventory.openCart();
    await cart.remove(PRODUCTS.backpack.slug);

    await expect(cart.items).toHaveCount(0);
    await expect(cart.cartBadge).toHaveCount(0);
  });
});
