interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

interface AuthUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export type {
  RegisterUserRequest,
  LoginUserRequest,
  AuthUserResponse,
  UpdateUserRequest,
};
