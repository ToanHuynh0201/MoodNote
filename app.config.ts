import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
	// Determine which environment we're in
	const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV || 'development';
	const IS_PRODUCTION = APP_ENV === 'production';
	const IS_PREVIEW = APP_ENV === 'preview';
	const IS_DEVELOPMENT = APP_ENV === 'development';

	return {
		...config,
		name: IS_PRODUCTION ? 'MoodNote' : `MoodNote (${APP_ENV.toUpperCase()})`,
		slug: 'MoodNote',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/images/icon.png',
		scheme: 'moodnote',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,

		// Dynamic splash screen based on environment
		splash: {
			image: './assets/images/splash-icon.png',
			resizeMode: 'contain',
			backgroundColor: IS_PRODUCTION ? '#ffffff' : '#E6F4FE',
		},

		ios: {
			supportsTablet: true,
			bundleIdentifier: IS_PRODUCTION
				? 'com.toanhuynh0201.MoodNote'
				: `com.toanhuynh0201.MoodNote.${APP_ENV}`,
		},

		android: {
			adaptiveIcon: {
				backgroundColor: '#E6F4FE',
				foregroundImage: './assets/images/android-icon-foreground.png',
				backgroundImage: './assets/images/android-icon-background.png',
				monochromeImage: './assets/images/android-icon-monochrome.png',
			},
			edgeToEdgeEnabled: true,
			predictiveBackGestureEnabled: false,
			package: IS_PRODUCTION
				? 'com.toanhuynh0201.MoodNote'
				: `com.toanhuynh0201.MoodNote.${APP_ENV}`,
			softwareKeyboardLayoutMode: 'pan',
		},

		web: {
			output: 'static',
			favicon: './assets/images/favicon.png',
		},

		plugins: [
			'expo-router',
			[
				'expo-splash-screen',
				{
					image: './assets/images/splash-icon.png',
					imageWidth: 200,
					resizeMode: 'contain',
					backgroundColor: '#ffffff',
					dark: {
						backgroundColor: '#000000',
					},
				},
			],
			'expo-font',
		],

		experiments: {
			typedRoutes: true,
			reactCompiler: true,
		},

		extra: {
			router: {},
			eas: {
				projectId: '484d033e-d611-48a9-80e7-b26d8fa18bb9',
			},
			// Expose environment variables through expo-constants
			// These will be accessible via Constants.expoConfig.extra
			env: {
				API_URL: process.env.EXPO_PUBLIC_API_URL,
				API_TIMEOUT: process.env.EXPO_PUBLIC_API_TIMEOUT,
				APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
				ENABLE_LOGGING: process.env.EXPO_PUBLIC_ENABLE_LOGGING,
				ENABLE_SOCIAL_LOGIN: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN,
				ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS,
				GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
				FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
			},
		},
	};
};
