import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async remove(slug: string) {
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
