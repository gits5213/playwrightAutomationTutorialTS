import { type RegistrationData, type RegistrationFieldError } from '../types/registration.types';

export const registrationErrorCases: Array<{
  name: string;
  override: Partial<RegistrationData>;
  errorField: RegistrationFieldError;
  errorText: string;
}> = [
  {
    name: 'an email without @',
    override: { email: 'invalid-email' },
    errorField: 'email',
    errorText: 'Invalid email format',
  },
  {
    name: 'a username shorter than 5 characters',
    override: { username: 'ab' },
    errorField: 'username',
    errorText: 'Username must be at least 5 characters',
  },
  {
    name: 'a password shorter than 8 characters',
    override: { password: '123', confirmPassword: '123' },
    errorField: 'password',
    errorText: 'Password must be at least 8 characters',
  },
  {
    name: 'mismatched passwords',
    override: { password: 'Practice1', confirmPassword: 'Practice2' },
    errorField: 'confirmPassword',
    errorText: 'Passwords do not match',
  },
  {
    name: 'a phone number that is not 10 digits',
    override: { phone: '123' },
    errorField: 'phone',
    errorText: 'Invalid phone number',
  },
];
