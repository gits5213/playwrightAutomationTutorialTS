import { expect } from '@playwright/test';
import { createRegistrationUser } from '../factories/registrationDataFactory';
import { RegistrationPage } from '../pages/RegistrationPage';
import { type RegistrationData } from '../types/registration.types';

export class RegistrationKeywords {
  constructor(private readonly form: RegistrationPage) {}

  async openRegistrationForm() {
    await this.form.goto();
  }

  async fillValidForm(overrides: Partial<RegistrationData> = {}) {
    const user = createRegistrationUser(overrides);
    await this.form.fillRegistrationForm(user);
    await this.form.acceptTerms();
    return user;
  }

  async submitRegistration() {
    await this.form.submit();
  }

  async expectSuccess(user: Pick<RegistrationData, 'email' | 'firstName' | 'lastName' | 'username'>) {
    await expect(this.form.successTitle).toContainText('Registration Successful');
    await expect(this.form.successEmail).toContainText(user.email);
    await expect(this.form.page.getByText(user.firstName)).toBeVisible();
    await expect(this.form.page.getByText(user.lastName)).toBeVisible();
    await expect(this.form.page.getByText(user.username)).toBeVisible();
  }
}
