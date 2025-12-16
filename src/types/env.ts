/**
 * Environment variable types
 * Provides type safety for environment configuration
 */

export type AppEnvironment = 'development' | 'preview' | 'production';

export interface EnvironmentConfig {
	// API Configuration
	API_URL: string;
	API_TIMEOUT: number;

	// App Configuration
	APP_ENV: AppEnvironment;
	ENABLE_LOGGING: boolean;

	// Feature Flags
	ENABLE_SOCIAL_LOGIN: boolean;
	ENABLE_ANALYTICS: boolean;

	// Third-party Services
	GOOGLE_CLIENT_ID: string;
	FACEBOOK_APP_ID: string;
}

export interface EnvUtils {
	// Get all environment variables
	getAll: () => EnvironmentConfig;

	// Get specific environment variable
	get: <K extends keyof EnvironmentConfig>(
		key: K
	) => EnvironmentConfig[K];

	// Environment checks
	isDevelopment: () => boolean;
	isPreview: () => boolean;
	isProduction: () => boolean;

	// Feature flags
	isFeatureEnabled: (
		feature: keyof Pick<
			EnvironmentConfig,
			'ENABLE_SOCIAL_LOGIN' | 'ENABLE_ANALYTICS' | 'ENABLE_LOGGING'
		>
	) => boolean;

	// Debugging
	printConfig: () => void;
}
