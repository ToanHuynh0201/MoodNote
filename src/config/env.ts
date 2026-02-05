import { AppEnvironment, EnvironmentConfig, EnvUtils } from '@/types/env';

/**
 * Environment Configuration Utility
 *
 * Centralizes access to environment variables with type safety
 * All variables are read directly from process.env with EXPO_PUBLIC_ prefix
 *
 * Usage:
 *   import { env } from '@/config/env';
 *   const apiUrl = env.get('API_URL');
 *   if (env.isDevelopment()) { ... }
 */

// Helper to safely parse boolean from string
const parseBoolean = (value: string | boolean | undefined): boolean => {
	if (typeof value === 'boolean') return value;
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	return false;
};

// Helper to safely parse number from string
const parseNumber = (
	value: string | number | undefined,
	defaultValue: number
): number => {
	if (typeof value === 'number') return value;
	if (typeof value === 'string') {
		const parsed = parseInt(value, 10);
		return isNaN(parsed) ? defaultValue : parsed;
	}
	return defaultValue;
};

// Get environment config directly from process.env
const getEnvConfig = (): EnvironmentConfig => {
	return {
		// API Configuration
		API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
		API_TIMEOUT: parseNumber(process.env.EXPO_PUBLIC_API_TIMEOUT, 30000),

		// App Configuration
		APP_ENV: (process.env.EXPO_PUBLIC_APP_ENV || 'development') as AppEnvironment,
		ENABLE_LOGGING: parseBoolean(process.env.EXPO_PUBLIC_ENABLE_LOGGING ?? true),

		// Feature Flags
		ENABLE_SOCIAL_LOGIN: parseBoolean(process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN ?? true),
		ENABLE_ANALYTICS: parseBoolean(process.env.EXPO_PUBLIC_ENABLE_ANALYTICS ?? false),

		// Third-party Services
		GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
		FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID || '',
	};
};

// Cache the config to avoid repeated parsing
let cachedConfig: EnvironmentConfig | null = null;

const getConfig = (): EnvironmentConfig => {
	if (!cachedConfig) {
		cachedConfig = getEnvConfig();
	}
	return cachedConfig;
};

/**
 * Environment utility object
 * Provides convenient methods to access and check environment configuration
 */
export const env: EnvUtils = {
	/**
	 * Get all environment variables
	 */
	getAll: (): EnvironmentConfig => {
		return getConfig();
	},

	/**
	 * Get a specific environment variable by key
	 * @param key - The environment variable key
	 * @returns The environment variable value with proper type
	 */
	get: <K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] => {
		return getConfig()[key];
	},

	/**
	 * Check if running in development environment
	 */
	isDevelopment: (): boolean => {
		return getConfig().APP_ENV === 'development';
	},

	/**
	 * Check if running in preview/staging environment
	 */
	isPreview: (): boolean => {
		return getConfig().APP_ENV === 'preview';
	},

	/**
	 * Check if running in production environment
	 */
	isProduction: (): boolean => {
		return getConfig().APP_ENV === 'production';
	},

	/**
	 * Check if a specific feature is enabled
	 * @param feature - The feature flag to check
	 */
	isFeatureEnabled: (
		feature: keyof Pick<
			EnvironmentConfig,
			'ENABLE_SOCIAL_LOGIN' | 'ENABLE_ANALYTICS' | 'ENABLE_LOGGING'
		>
	): boolean => {
		return getConfig()[feature];
	},

	/**
	 * Print current environment configuration (for debugging)
	 * Only works in development mode
	 */
	printConfig: (): void => {
		if (env.isDevelopment() || __DEV__) {
			console.log('=== Environment Configuration ===');
			console.log(JSON.stringify(getConfig(), null, 2));
			console.log('================================');
		}
	},
};

// Export the config type for use elsewhere
export type { EnvironmentConfig, AppEnvironment } from '@/types/env';
