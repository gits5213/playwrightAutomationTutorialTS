import { type Locator, type Page } from '@playwright/test';

/** Site header shared across GITS pages. Only extract what tests actually need. */
export class HeaderComponent {
  readonly labsLink: Locator;
  readonly enrollLink: Locator;

  constructor(private readonly page: Page) {
    this.labsLink = page.getByRole('link', { name: 'Labs', exact: true });
    this.enrollLink = page.getByRole('link', { name: 'Enroll Now' });
  }
}
