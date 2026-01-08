import authService from "@/services/authService";
import type {
	AuthResponse,
	LoginCredentials,
	RegisterData,
	User,
} from "@/types/auth";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (userData: RegisterData) => Promise<void>;
	logout: () => Promise<void>;
	getUserDetail: () => Promise<User | null>;
	refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Check authentication status on mount
	useEffect(() => {
		checkAuthStatus();
	}, []);

	const checkAuthStatus = async () => {
		try {
			setIsLoading(true);
			const isAuth = await authService.isAuthenticated();

			if (isAuth) {
				const userDetail = await authService.getUserDetail();
				setUser(userDetail);
			}
		} catch (error) {
			console.error("Check auth status error:", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (credentials: LoginCredentials): Promise<void> => {
		try {
			setIsLoading(true);
			const response: AuthResponse = await authService.login(credentials);
			setUser(response.user);
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (userData: RegisterData): Promise<void> => {
		try {
			setIsLoading(true);
			const response: AuthResponse = await authService.register(userData);
			setUser(response.user);
		} catch (error) {
			console.error("Register error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			setIsLoading(true);
			await authService.logout();
			setUser(null);
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const getUserDetail = async (): Promise<User | null> => {
		try {
			const userDetail = await authService.getUserDetail();
			if (userDetail) {
				setUser(userDetail);
			}
			return userDetail;
		} catch (error) {
			console.error("Get user detail error:", error);
			return null;
		}
	};

	const refreshUser = async (): Promise<void> => {
		try {
			const userDetail = await authService.getUserDetail();
			if (userDetail) {
				setUser(userDetail);
			}
		} catch (error) {
			console.error("Refresh user error:", error);
		}
	};

	const value: AuthContextType = {
		user,
		isLoading,
		isAuthenticated: !!user,
		login,
		register,
		logout,
		getUserDetail,
		refreshUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export type { AuthContextType };
