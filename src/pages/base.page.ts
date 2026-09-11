import { type Page } from '@playwright/test';

/**
 * Shared moves every screen needs (open a URL). Real pages extend this
 * so you do not copy `page.goto` into every class.
 */
export class BasePage {
  constructor(readonly page: Page) {}

  async open(path: string) {
    await this.page.goto(path);
  }
}
