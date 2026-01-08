import { STORAGE_KEYS } from "@/constants/auth";
import type {
	AuthResponse,
	LoginCredentials,
	RegisterData,
	User,
} from "@/types/auth";
import {
	getStorageItem,
	removeStorageItem,
	setStorageItem,
} from "@/utils/storage";

// API base URL - cập nhật theo URL backend của bạn
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

class AuthService {
	/**
	 * Login user with credentials
	 */
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Login failed");
			}

			const data: AuthResponse = await response.json();

			// Save tokens and user to secure storage
			await this.saveAuthData(data);

			return data;
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	}

	/**
	 * Register new user
	 */
	async register(userData: RegisterData): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Registration failed");
			}

			const data: AuthResponse = await response.json();

			// Save tokens and user to secure storage
			await this.saveAuthData(data);

			return data;
		} catch (error) {
			console.error("Registration error:", error);
			throw error;
		}
	}

	/**
	 * Logout user and clear storage
	 */
	async logout(): Promise<void> {
		try {
			const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);

			// Call backend logout endpoint if token exists
			if (accessToken) {
				try {
					await fetch(`${API_URL}/auth/logout`, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
				} catch (error) {
					console.warn("Logout API call failed:", error);
				}
			}
		} finally {
			// Always clear local storage
			await this.clearAuthData();
		}
	}

	/**
	 * Get current user details from storage or API
	 */
	async getUserDetail(): Promise<User | null> {
		try {
			// First try to get user from storage
			const userString = await getStorageItem(STORAGE_KEYS.USER);
			if (userString) {
				return JSON.parse(userString);
			}

			// If not in storage, try to fetch from API
			const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
			if (!accessToken) {
				return null;
			}

			const response = await fetch(`${API_URL}/auth/me`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch user details");
			}

			const user: User = await response.json();

			// Save to storage for future use
			await setStorageItem(STORAGE_KEYS.USER, JSON.stringify(user));

			return user;
		} catch (error) {
			console.error("Get user detail error:", error);
			return null;
		}
	}

	/**
	 * Refresh access token
	 */
	async refreshToken(): Promise<string | null> {
		try {
			const refreshToken = await getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

			if (!refreshToken) {
				throw new Error("No refresh token available");
			}

			const response = await fetch(`${API_URL}/auth/refresh`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ refreshToken }),
			});

			if (!response.ok) {
				throw new Error("Token refresh failed");
			}

			const data = await response.json();
			const newAccessToken = data.accessToken;

			// Save new access token
			await setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

			return newAccessToken;
		} catch (error) {
			console.error("Token refresh error:", error);
			await this.clearAuthData();
			return null;
		}
	}

	/**
	 * Check if user is authenticated
	 */
	async isAuthenticated(): Promise<boolean> {
		const accessToken = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
		return !!accessToken;
	}

	/**
	 * Get access token from storage
	 */
	async getAccessToken(): Promise<string | null> {
		return await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
	}

	/**
	 * Save authentication data to storage
	 */
	private async saveAuthData(data: AuthResponse): Promise<void> {
		await Promise.all([
			setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken),
			setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken),
			setStorageItem(STORAGE_KEYS.USER, JSON.stringify(data.user)),
		]);
	}

	/**
	 * Clear all authentication data from storage
	 */
	private async clearAuthData(): Promise<void> {
		await Promise.all([
			removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN),
			removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN),
			removeStorageItem(STORAGE_KEYS.USER),
		]);
	}
}

export default new AuthService();
