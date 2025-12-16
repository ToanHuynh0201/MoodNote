import { env } from '@/config/env';

/**
 * Environment Validation Utility
 *
 * Validates that all required environment variables are properly configured
 * Should be called on app startup in development
 */

interface ValidationError {
	key: string;
	message: string;
}

export const validateEnvironment = (): {
	isValid: boolean;
	errors: ValidationError[];
} => {
	const errors: ValidationError[] = [];
	const config = env.getAll();

	// Validate API_URL
	if (!config.API_URL) {
		errors.push({
			key: 'API_URL',
			message: 'API_URL is required',
		});
	} else if (!config.API_URL.startsWith('http')) {
		errors.push({
			key: 'API_URL',
			message: 'API_URL must start with http:// or https://',
		});
	}

	// Validate API_TIMEOUT
	if (config.API_TIMEOUT <= 0) {
		errors.push({
			key: 'API_TIMEOUT',
			message: 'API_TIMEOUT must be greater than 0',
		});
	}

	// Validate APP_ENV
	const validEnvs = ['development', 'preview', 'production'];
	if (!validEnvs.includes(config.APP_ENV)) {
		errors.push({
			key: 'APP_ENV',
			message: `APP_ENV must be one of: ${validEnvs.join(', ')}`,
		});
	}

	// Warn about missing OAuth credentials in development
	if (env.isDevelopment()) {
		if (!config.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID.includes('your_')) {
			console.warn(
				'[ENV] Google Client ID not configured - social login may not work'
			);
		}
		if (!config.FACEBOOK_APP_ID || config.FACEBOOK_APP_ID.includes('your_')) {
			console.warn(
				'[ENV] Facebook App ID not configured - social login may not work'
			);
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};

/**
 * Print validation results
 */
export const printValidation = (): void => {
	const result = validateEnvironment();

	if (result.isValid) {
		console.log('[ENV] ✓ Environment validation passed');
		env.printConfig();
	} else {
		console.error('[ENV] ✗ Environment validation failed:');
		result.errors.forEach((error) => {
			console.error(`  - ${error.key}: ${error.message}`);
		});
	}
};
