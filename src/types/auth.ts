export interface User {
	id: string;
	email: string;
	name: string;
	username?: string;
	avatar?: string;
	streak?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	email: string;
	password: string;
	name: string;
}

export interface AuthResponse {
	user: User;
	tokens: AuthTokens;
}
