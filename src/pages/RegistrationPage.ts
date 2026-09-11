import { type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/HeaderComponent';
import { ROUTES } from '../constants/routes';
import { validRegistrant } from '../data/registration.data';
import { type RegistrationData, type RegistrationFieldError } from '../types/registration.types';

const errorIds: Record<RegistrationFieldError, string> = {
  firstName: 'registration-form-firstname-error',
  lastName: 'registration-form-lastname-error',
  email: 'registration-form-email-error',
  phone: 'registration-form-phone-error',
  username: 'registration-form-username-error',
  password: 'registration-form-password-error',
  confirmPassword: 'registration-form-confirmpassword-error',
  gender: 'registration-form-gender-error',
  dateOfBirth: 'registration-form-dateofbirth-error',
  country: 'registration-form-country-error',
  terms: 'registration-form-terms-error',
};

/**
 * One screen: the GITS practice registration form.
 * Locators come from the live accessible names (inspected 2026-09-11).
 */
export class RegistrationPage {
  readonly heading: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly gender: Locator;
  readonly dateOfBirth: Locator;
  readonly country: Locator;
  readonly terms: Locator;
  readonly termsLink: Locator;
  readonly registerButton: Locator;
  readonly successTitle: Locator;
  readonly successEmail: Locator;
  readonly registerAnotherButton: Locator;
  readonly header: HeaderComponent;

  constructor(readonly page: Page) {
    this.header = new HeaderComponent(page);
    this.heading = page.getByRole('heading', { name: 'Registration Form' });
    this.firstName = page.getByRole('textbox', { name: 'First Name *' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name *' });
    this.email = page.getByRole('textbox', { name: 'Email *' });
    this.phone = page.getByRole('textbox', { name: 'Phone Number *' });
    this.username = page.getByRole('textbox', { name: 'Username *' });
    this.password = page.getByRole('textbox', { name: 'Password *', exact: true });
    this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password *' });
    this.gender = page.getByRole('combobox', { name: 'Gender *' });
    this.dateOfBirth = page.getByRole('textbox', { name: 'Date of Birth *' });
    this.country = page.getByRole('combobox', { name: 'Country *' });
    this.terms = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions *' });
    this.termsLink = page.getByRole('link', { name: 'Terms and Conditions' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successTitle = page.locator('#registration-form-success-title');
    this.successEmail = page.locator('#registration-form-success-email');
    this.registerAnotherButton = page.locator('#registration-form-register-another-button');
  }

  error(field: RegistrationFieldError) {
    return this.page.locator(`#${errorIds[field]}`);
  }

  async goto() {
    await this.page.goto(ROUTES.registrationForm, { waitUntil: 'domcontentloaded' });
    await this.heading.waitFor();
    await this.allowCustomValidationMessages();
  }

  /**
   * The email input is type=email, so the browser may show its own tooltip
   * instead of the page's red "Invalid email format" text. novalidate lets
   * the page's messages appear. Empty-form required messages still show
   * without this (the fields are not HTML required).
   */
  async allowCustomValidationMessages() {
    await this.page.locator('#registration-form').evaluate((form) => {
      form.setAttribute('novalidate', 'novalidate');
    });
  }

  async enterFirstName(value: string) {
    await this.firstName.fill(value);
  }

  async enterLastName(value: string) {
    await this.lastName.fill(value);
  }

  async enterEmail(value: string) {
    await this.email.fill(value);
  }

  async enterPhone(value: string) {
    await this.phone.fill(value);
  }

  async enterUsername(value: string) {
    await this.username.fill(value);
  }

  async enterPassword(value: string) {
    await this.password.scrollIntoViewIfNeeded();
    await this.password.fill(value);
  }

  async enterConfirmPassword(value: string) {
    await this.confirmPassword.fill(value);
  }

  async selectGender(label: string) {
    await this.gender.selectOption({ label });
  }

  async enterDateOfBirth(value: string) {
    await this.dateOfBirth.fill(value);
  }

  async selectCountry(label: string) {
    await this.country.selectOption({ label });
  }

  async acceptTerms() {
    await this.terms.check();
  }

  async fillRegistrationForm(data: RegistrationData) {
    await this.enterFirstName(data.firstName);
    await this.enterLastName(data.lastName);
    await this.enterEmail(data.email);
    await this.enterPhone(data.phone);
    await this.enterUsername(data.username);
    await this.enterPassword(data.password);
    await this.enterConfirmPassword(data.confirmPassword);
    await this.selectGender(data.gender);
    await this.enterDateOfBirth(data.dateOfBirth);
    await this.selectCountry(data.country);
  }

  async fillValid(overrides: Partial<RegistrationData> = {}) {
    await this.fillRegistrationForm({ ...validRegistrant, ...overrides });
    await this.acceptTerms();
  }

  async submit() {
    await this.registerButton.scrollIntoViewIfNeeded();
    // Site marketing banner can sit on top of Register (observed on the live page).
    // eslint-disable-next-line playwright/no-force-option -- overlay intercepts a normal click
    await this.registerButton.click({ force: true });
  }

  async startAnotherRegistration() {
    await this.registerAnotherButton.scrollIntoViewIfNeeded();
    // eslint-disable-next-line playwright/no-force-option -- overlay intercepts a normal click
    await this.registerAnotherButton.click({ force: true });
  }
}
