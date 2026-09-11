import { RegistrationPage } from '../pages/RegistrationPage';
import { type KeywordStep } from './keyword.types';

/**
 * Runs a typed list of business steps. TypeScript rejects unknown keyword
 * names at compile time — there is no string reflection.
 */
export class KeywordRunner {
  constructor(private readonly form: RegistrationPage) {}

  async execute(steps: KeywordStep[]) {
    for (const step of steps) {
      await this.run(step);
    }
  }

  private async run(step: KeywordStep) {
    switch (step.keyword) {
      case 'OPEN_REGISTRATION_FORM':
        await this.form.goto();
        return;
      case 'ENTER_FIRST_NAME':
        await this.form.enterFirstName(step.value);
        return;
      case 'ENTER_LAST_NAME':
        await this.form.enterLastName(step.value);
        return;
      case 'ENTER_EMAIL':
        await this.form.enterEmail(step.value);
        return;
      case 'ENTER_PHONE':
        await this.form.enterPhone(step.value);
        return;
      case 'ENTER_USERNAME':
        await this.form.enterUsername(step.value);
        return;
      case 'ENTER_PASSWORD':
        await this.form.enterPassword(step.value);
        return;
      case 'CONFIRM_PASSWORD':
        await this.form.enterConfirmPassword(step.value);
        return;
      case 'SELECT_GENDER':
        await this.form.selectGender(step.value);
        return;
      case 'ENTER_DATE_OF_BIRTH':
        await this.form.enterDateOfBirth(step.value);
        return;
      case 'SELECT_COUNTRY':
        await this.form.selectCountry(step.value);
        return;
      case 'ACCEPT_TERMS':
        await this.form.acceptTerms();
        return;
      case 'SUBMIT_REGISTRATION':
        await this.form.submit();
        return;
      case 'FILL_VALID_FORM':
        await this.form.fillValid(step.value);
        return;
    }
  }
}
