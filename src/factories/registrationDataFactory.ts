import { validRegistrant } from '../data/registration.data';
import { type RegistrationData } from '../types/registration.types';

/**
 * Builds a registrant with a unique email and username so parallel
 * success tests do not collide. No third-party faker — Date.now is enough.
 */
export function createRegistrationUser(
  overrides: Partial<RegistrationData> = {},
): RegistrationData {
  const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return {
    ...validRegistrant,
    email: `student.${stamp}@example.com`,
    username: `user${stamp}`.slice(0, 16),
    ...overrides,
  };
}
