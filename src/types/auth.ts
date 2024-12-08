export namespace Auth {
  export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  export interface SignUpRequest {
    email: string;
    password: string;
    passwordConfirm: string;
    nickname: string;
    lastName: string;
    firstName: string;
  }

  export interface LoginResponse {
    status: number;
    timestamp: string;
    message: string;
    data: {
      accessToken: string;
      tokenType: string;
      expiresIn: number;
    };
  }

  export interface LogoutResponse {
    username: string;
    email: string;
    password: string;
  }

  export namespace State {
    export interface AuthState {
      accessToken: string | null;
      tokenType: string | null;
      expiresIn: number | null;
    }
  }
}
