import { fontSize } from "@/utils/scaling";

/**
 * Typography System - Font Sizes, Line Heights, and Material Design Type Scale
 *
 * This file provides:
 * 1. Simple font size scale (xs to 6xl) - For quick inline usage
 * 2. Line height presets - For controlling text density
 * 3. Material Design 3 type scale (TYPOGRAPHY) - For semantic text styles
 *
 * Migration from old system:
 * - moderateScale(16) → fontSize(16) or fontSizes.lg
 * - TYPOGRAPHY variants still work the same way
 */

// ============================================================================
// FONT FAMILIES
// Segoe UI family + Pacifico decorative font
// ============================================================================

export const FONTS = {
	regular: "Segoe UI",
	italic: "Segoe UI Italic",
	bold: "Segoe UI Bold",
	boldItalic: "Segoe UI Bold Italic",
	decorative: "Pacifico", // For special headings, brand text
} as const;

// ============================================================================
// FONT SIZE SCALE
// Numeric scale for quick inline usage
// ============================================================================

export const fontSizes = {
	xs: fontSize(11), // 11px - Very small text (captions, labels)
	sm: fontSize(12), // 12px - Small text (helper text, fine print)
	base: fontSize(14), // 14px - Base body text
	lg: fontSize(16), // 16px - Large body text
	xl: fontSize(18), // 18px - Small headings, emphasized text
	"2xl": fontSize(20), // 20px - Sub-headings
	"3xl": fontSize(24), // 24px - Section headings
	"4xl": fontSize(28), // 28px - Page headings
	"5xl": fontSize(34), // 34px - Large displays
	"6xl": fontSize(40), // 40px - Extra large displays
} as const;

// ============================================================================
// LINE HEIGHT PRESETS
// Multipliers for controlling text density
// ============================================================================

export const lineHeights = {
	none: 1, // No additional line height (tight)
	tight: 1.25, // 125% - Tight line height for headings
	normal: 1.5, // 150% - Standard line height for body text
	relaxed: 1.75, // 175% - Relaxed line height for readability
	loose: 2, // 200% - Very loose line height
} as const;

// ============================================================================
// FONT WEIGHTS
// Standard weight scale
// ============================================================================

export const fontWeights = {
	normal: "400" as const,
	medium: "500" as const,
	semibold: "600" as const,
	bold: "700" as const,
} as const;

// ============================================================================
// MATERIAL DESIGN 3 TYPE SCALE
// Semantic typography variants for consistent UI
// Keep this for backward compatibility with existing components
// ============================================================================

export const TYPOGRAPHY = {
	// ====================================
	// DISPLAY STYLES - Largest text
	// For splash screens, hero sections
	// ====================================
	displayLarge: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes["6xl"], // 40px
		lineHeight: fontSize(48),
		letterSpacing: -0.25,
		fontWeight: fontWeights.normal,
	},
	displayMedium: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes["5xl"], // 34px
		lineHeight: fontSize(40),
		letterSpacing: 0,
		fontWeight: fontWeights.normal,
	},
	displaySmall: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes["4xl"], // 28px
		lineHeight: fontSize(36),
		letterSpacing: 0,
		fontWeight: fontWeights.normal,
	},

	// ====================================
	// HEADLINE STYLES - High-emphasis
	// For page titles, section headings
	// ====================================
	headlineLarge: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes["3xl"], // 24px
		lineHeight: fontSize(32),
		letterSpacing: 0,
		fontWeight: fontWeights.normal,
	},
	headlineMedium: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes["2xl"], // 20px
		lineHeight: fontSize(28),
		letterSpacing: 0,
		fontWeight: fontWeights.normal,
	},
	headlineSmall: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes.xl, // 18px
		lineHeight: fontSize(28),
		letterSpacing: 0,
		fontWeight: fontWeights.normal,
	},

	// ====================================
	// TITLE STYLES - Medium-emphasis
	// For component titles, card headers
	// ====================================
	titleLarge: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes.xl, // 18px
		lineHeight: fontSize(26),
		letterSpacing: 0,
		fontWeight: fontWeights.bold,
	},
	titleMedium: {
		fontFamily: FONTS.bold,
		fontSize: fontSizes.lg, // 16px
		lineHeight: fontSize(24),
		letterSpacing: 0.15,
		fontWeight: fontWeights.bold,
	},
	titleSmall: {
		fontFamily: FONTS.bold,
		fontSize: fontSizes.base, // 14px
		lineHeight: fontSize(22),
		letterSpacing: 0.1,
		fontWeight: fontWeights.bold,
	},

	// ====================================
	// BODY STYLES - Long-form text
	// For paragraphs, descriptions
	// ====================================
	bodyLarge: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes.lg, // 16px
		lineHeight: fontSize(24),
		letterSpacing: 0.5,
		fontWeight: fontWeights.normal,
	},
	bodyMedium: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes.base, // 14px
		lineHeight: fontSize(20),
		letterSpacing: 0.25,
		fontWeight: fontWeights.normal,
	},
	bodySmall: {
		fontFamily: FONTS.regular,
		fontSize: fontSizes.sm, // 12px
		lineHeight: fontSize(16),
		letterSpacing: 0.4,
		fontWeight: fontWeights.normal,
	},

	// ====================================
	// LABEL STYLES - UI elements
	// For buttons, tabs, input labels
	// ====================================
	labelLarge: {
		fontFamily: FONTS.bold,
		fontSize: fontSizes.base, // 14px
		lineHeight: fontSize(20),
		letterSpacing: 0.1,
		fontWeight: fontWeights.bold,
	},
	labelMedium: {
		fontFamily: FONTS.bold,
		fontSize: fontSizes.sm, // 12px
		lineHeight: fontSize(16),
		letterSpacing: 0.5,
		fontWeight: fontWeights.bold,
	},
	labelSmall: {
		fontFamily: FONTS.bold,
		fontSize: fontSizes.xs, // 11px
		lineHeight: fontSize(16),
		letterSpacing: 0.5,
		fontWeight: fontWeights.bold,
	},
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type FontFamily = (typeof FONTS)[keyof typeof FONTS];
export type FontSize = (typeof fontSizes)[keyof typeof fontSizes];
export type LineHeight = (typeof lineHeights)[keyof typeof lineHeights];
export type FontWeight = (typeof fontWeights)[keyof typeof fontWeights];
export type TypographyVariant = keyof typeof TYPOGRAPHY;
export type TypographyStyle = (typeof TYPOGRAPHY)[TypographyVariant];

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
	FONTS,
	fontSizes,
	lineHeights,
	fontWeights,
	TYPOGRAPHY,
};
