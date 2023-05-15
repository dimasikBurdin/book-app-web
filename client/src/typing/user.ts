export interface LoginUserResponse {
  access_token: string;
  userId: number;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface RegisterUserPayload extends LoginUserPayload {
  name: string;
}

export interface User {
  userId: number;
  name: string | null;
  email: string | null;
}
