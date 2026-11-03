import { Locator, Page } from '@playwright/test';
import { PASSWORD } from '../test-data/users';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, password: string = PASSWORD) {
    await this.username.fill(user);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
