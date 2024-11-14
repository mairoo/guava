export interface AuthState {
    accessToken: string | null;
    tokenType: string | null;
    expiresIn: number | null;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
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
    status: number;
    timestamp: string;
    message: string;
}