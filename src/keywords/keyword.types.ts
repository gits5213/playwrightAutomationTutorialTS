import { type RegistrationData } from '../types/registration.types';

export type KeywordStep =
  | { keyword: 'OPEN_REGISTRATION_FORM' }
  | { keyword: 'ENTER_FIRST_NAME'; value: string }
  | { keyword: 'ENTER_LAST_NAME'; value: string }
  | { keyword: 'ENTER_EMAIL'; value: string }
  | { keyword: 'ENTER_PHONE'; value: string }
  | { keyword: 'ENTER_USERNAME'; value: string }
  | { keyword: 'ENTER_PASSWORD'; value: string }
  | { keyword: 'CONFIRM_PASSWORD'; value: string }
  | { keyword: 'SELECT_GENDER'; value: string }
  | { keyword: 'ENTER_DATE_OF_BIRTH'; value: string }
  | { keyword: 'SELECT_COUNTRY'; value: string }
  | { keyword: 'ACCEPT_TERMS' }
  | { keyword: 'SUBMIT_REGISTRATION' }
  | { keyword: 'FILL_VALID_FORM'; value?: Partial<RegistrationData> };
