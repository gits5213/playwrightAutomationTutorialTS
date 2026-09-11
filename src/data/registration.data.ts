import { type RegistrationData } from '../types/registration.types';

/**
 * Static example person for fill-and-assert lessons.
 * Success submissions should use the factory instead (unique email/username).
 */
export const validRegistrant: RegistrationData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  username: 'johndoe',
  password: 'Practice1',
  confirmPassword: 'Practice1',
  gender: 'Male',
  dateOfBirth: '1990-01-15',
  country: 'United States',
};

/** Messages observed on the live form after an empty Register click (2026-09-11). */
export const requiredFieldErrors = {
  firstName: 'First name is required',
  lastName: 'Last name is required',
  email: 'Email is required',
  phone: 'Phone number is required',
  username: 'Username is required',
  password: 'Password is required',
  gender: 'Gender is required',
  dateOfBirth: 'Date of birth is required',
  country: 'Country is required',
  terms: 'You must accept the terms and conditions',
} as const;
