export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: string;
  country: string;
}

export type RegistrationFieldError =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'username'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'dateOfBirth'
  | 'country'
  | 'terms';
