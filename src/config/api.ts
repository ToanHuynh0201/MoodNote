import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { env } from '@/config/env';
import { getStorageItem } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants/auth';

/**
 * API Client Configuration
 *
 * Axios instance configured with environment-specific settings
 * Includes automatic token injection and error handling
 */

// Create axios instance with environment configuration
const api: AxiosInstance = axios.create({
	baseURL: env.get('API_URL'),
	timeout: env.get('API_TIMEOUT'),
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - Add authentication token
api.interceptors.request.use(
	async (config) => {
		try {
			const token = await getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			// Log requests in development
			if (env.isFeatureEnabled('ENABLE_LOGGING')) {
				console.log(
					`[API Request] ${config.method?.toUpperCase()} ${config.url}`,
					{
						params: config.params,
						data: config.data,
					}
				);
			}
		} catch (error) {
			if (env.isFeatureEnabled('ENABLE_LOGGING')) {
				console.error('[API Request Error]', error);
			}
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle errors
api.interceptors.response.use(
	(response) => {
		// Log responses in development
		if (env.isFeatureEnabled('ENABLE_LOGGING')) {
			console.log(
				`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
				{
					status: response.status,
					data: response.data,
				}
			);
		}
		return response;
	},
	async (error: AxiosError) => {
		if (env.isFeatureEnabled('ENABLE_LOGGING')) {
			console.error('[API Error]', {
				url: error.config?.url,
				status: error.response?.status,
				message: error.message,
				data: error.response?.data,
			});
		}

		// Handle specific error cases
		if (error.response?.status === 401) {
			// Token expired or invalid - handle refresh or logout
			// TODO: Implement token refresh logic
		}

		return Promise.reject(error);
	}
);

export default api;

// Convenience methods
export const apiClient = {
	get: <T = any>(url: string, config?: AxiosRequestConfig) =>
		api.get<T>(url, config),

	post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
		api.post<T>(url, data, config),

	put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
		api.put<T>(url, data, config),

	patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
		api.patch<T>(url, data, config),

	delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
		api.delete<T>(url, config),
};
