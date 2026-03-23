export interface LoginResponse {
  message: string;
  token: string;
}

export interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  permissions: string[];
}
