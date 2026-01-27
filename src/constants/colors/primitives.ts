/**
 * Color Primitives - Raw Color Values
 *
 * This file contains all primitive color values used in the MoodNote app.
 * These are the foundation colors that semantic tokens are built from.
 *
 * DO NOT use these directly in components. Use semantic tokens from ThemeContext instead.
 *
 * Organization:
 * - Purple scale (primary brand color)
 * - Pink scale (secondary brand color)
 * - Neutral grayscale
 * - Status colors (success, warning, error, info)
 * - Emotion colors (for mood tracking)
 */

export const ColorPrimitives = {
	// ============================================================================
	// PURPLE SCALE - Primary Brand Color
	// Tím là màu chủ đạo của MoodNote
	// ============================================================================
	purple: {
		50: "#FAF5FF", // Tím cực nhạt - backgrounds
		100: "#F3E8FF", // Tím rất nhạt - elevated surfaces
		200: "#E9D5FF", // Tím nhạt - subtle borders
		300: "#D8B4FE", // Tím pastel - borders
		400: "#C084FC", // Tím lavender - primary for dark mode
		500: "#A855F7", // Tím chính (main purple) - primary hover
		600: "#9333EA", // Tím đậm - primary for light mode
		700: "#7E22CE", // Tím rất đậm - strong borders, dark backgrounds
		800: "#6B21A8", // Tím tối - elevated dark surfaces
		900: "#581C87", // Tím đen - raised dark surfaces
		950: "#3B0764", // Tím cực tối
		975: "#1A0233", // Tím gần đen - very dark background
	},

	// ============================================================================
	// PINK SCALE - Secondary Brand Color
	// Hồng tím cho secondary actions và accents
	// ============================================================================
	pink: {
		50: "#FDF4FF", // Hồng tím cực nhạt
		100: "#FAE8FF", // Hồng tím nhạt
		200: "#F5D0FE", // Hồng tím pastel
		300: "#F0ABFC", // Hồng tím sáng
		400: "#E879F9", // Hồng tím - secondary for dark mode
		500: "#D946EF", // Hồng tím đậm - secondary for light mode
		600: "#C026D3", // Hồng tím rất đậm
		700: "#A21CAF", // Hồng tím tối
		800: "#86198F", // Hồng tím cực tối
		900: "#701A75", // Hồng tím đen
	},

	// ============================================================================
	// NEUTRAL GRAYSCALE
	// Xám cho text, backgrounds, borders
	// ============================================================================
	neutral: {
		0: "#FFFFFF", // Pure white
		50: "#FAFAFA", // Xám cực nhạt
		100: "#F5F5F5", // Xám rất nhạt
		200: "#E5E5E5", // Xám nhạt
		300: "#D4D4D4", // Xám light
		400: "#A3A3A3", // Xám medium light - disabled states
		500: "#737373", // Xám medium
		600: "#525252", // Xám medium dark
		700: "#404040", // Xám dark
		800: "#262626", // Xám rất dark
		900: "#171717", // Xám cực dark - text for light mode
		950: "#0A0A0A", // Gần đen
		1000: "#000000", // Pure black
	},

	// ============================================================================
	// STATUS COLORS
	// Màu cho success, warning, error, info states
	// ============================================================================
	green: {
		// Success colors
		100: "#D1FAE5", // Light success background
		400: "#34D399", // Success for dark mode
		500: "#10B981", // Success main
		600: "#059669", // Success for light mode - better contrast
		700: "#047857", // Success dark
		900: "#064E3B", // Success very dark - for dark mode backgrounds
	},

	amber: {
		// Warning colors
		100: "#FEF3C7", // Light warning background
		400: "#FBBF24", // Warning for dark mode
		500: "#F59E0B", // Warning main
		600: "#D97706", // Warning for light mode
		700: "#B45309", // Warning dark
		900: "#78350F", // Warning very dark - for dark mode backgrounds
	},

	red: {
		// Error colors
		100: "#FEE2E2", // Light error background
		400: "#F87171", // Error for dark mode
		500: "#EF4444", // Error main
		600: "#DC2626", // Error for light mode
		700: "#B91C1C", // Error dark
		900: "#7F1D1D", // Error very dark - for dark mode backgrounds
	},

	blue: {
		// Info colors
		100: "#DBEAFE", // Light info background
		400: "#60A5FA", // Info for dark mode
		500: "#3B82F6", // Info main
		600: "#2563EB", // Info for light mode
		700: "#1D4ED8", // Info dark
		900: "#1E3A8A", // Info very dark - for dark mode backgrounds
	},

	// ============================================================================
	// EMOTION COLORS
	// Màu cho mood tracking - raw values, sẽ được adjust cho light/dark mode
	// ============================================================================
	emotions: {
		// Light mode values - adjusted for WCAG AA compliance
		happy: {
			light: "#F59E0B", // Darker amber (WCAG AA compliant)
			dark: "#FCD34D", // Brighter yellow for dark mode
		},
		excited: {
			light: "#E11D48", // Rose-600 (WCAG AA compliant)
			dark: "#F9A8D4", // Pink-300 for dark mode
		},
		calm: {
			light: "#059669", // Green-600 (WCAG AA compliant)
			dark: "#6EE7B7", // Green-300 for dark mode
		},
		sad: {
			light: "#2563EB", // Blue-600 (WCAG AA compliant)
			dark: "#93C5FD", // Blue-300 for dark mode
		},
		anxious: {
			light: "#7C3AED", // Violet-600 (WCAG AA compliant)
			dark: "#C4B5FD", // Violet-300 for dark mode
		},
		angry: {
			light: "#DC2626", // Red-600 (WCAG AA compliant)
			dark: "#FCA5A5", // Red-300 for dark mode
		},
		tired: {
			light: "#64748B", // Slate-500 (WCAG AA compliant)
			dark: "#CBD5E1", // Slate-300 for dark mode
		},
		grateful: {
			light: "#EA580C", // Orange-600 (WCAG AA compliant)
			dark: "#FDBA74", // Orange-300 for dark mode
		},
	},

	// ============================================================================
	// FEATURE-SPECIFIC COLORS
	// Colors for specific features (stats cards, etc.)
	// ============================================================================
	stats: {
		purple: {
			light: "#9333EA", // Purple-600
			dark: "#C084FC", // Purple-400 - bright on dark background
		},
		orange: {
			light: "#EA580C", // Orange-600
			dark: "#FB923C", // Orange-400 - bright on dark background
		},
		blue: {
			light: "#2563EB", // Blue-600
			dark: "#60A5FA", // Blue-400 - bright on dark background
		},
	},
} as const;

// Type exports for TypeScript
export type PurpleScale = typeof ColorPrimitives.purple;
export type PinkScale = typeof ColorPrimitives.pink;
export type NeutralScale = typeof ColorPrimitives.neutral;
export type GreenScale = typeof ColorPrimitives.green;
export type AmberScale = typeof ColorPrimitives.amber;
export type RedScale = typeof ColorPrimitives.red;
export type BlueScale = typeof ColorPrimitives.blue;
export type EmotionColors = typeof ColorPrimitives.emotions;
export type StatsColors = typeof ColorPrimitives.stats;
