export const env = {
  baseURL: process.env.BASE_URL ?? 'https://gitsuniversity.org',
  /** When true, tests that click Register with valid data may create a practice account. */
  runRegistrationSubmission: process.env.RUN_REGISTRATION_SUBMISSION === 'true',
};
