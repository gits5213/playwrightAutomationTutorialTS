import { test as base } from '@playwright/test';
import { KeywordRunner } from '../keywords/KeywordRunner';
import { RegistrationKeywords } from '../keywords/registrationKeywords';
import { RegistrationPage } from '../pages/RegistrationPage';

type AppFixtures = {
  registrationPage: RegistrationPage;
  registrationKeywords: RegistrationKeywords;
  keywordRunner: KeywordRunner;
};

export const test = base.extend<AppFixtures>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await use(registrationPage);
  },

  registrationKeywords: async ({ registrationPage }, use) => {
    await use(new RegistrationKeywords(registrationPage));
  },

  keywordRunner: async ({ registrationPage }, use) => {
    await use(new KeywordRunner(registrationPage));
  },
});

export { expect } from '@playwright/test';
