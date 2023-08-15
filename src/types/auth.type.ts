export interface LoginFormState {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  userName: string;
  active: boolean;
}
