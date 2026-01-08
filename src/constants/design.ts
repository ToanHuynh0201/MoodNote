import { scale, verticalScale, moderateScale } from "@/utils/responsive";

/**
 * Design Constants System for MoodNote
 * All values are properly scaled for responsive design
 *
 * Guidelines:
 * - Use spacingScale for horizontal padding/margin/gaps
 * - Use verticalSpacing for vertical padding/margin/gaps
 * - Use borderRadius for all border radius values
 * - Use componentSizes for fixed component dimensions
 */

// ============================================================================
// SPACING SCALE
// Based on 8px grid system with responsive scaling
// ============================================================================

/**
 * Horizontal spacing scale
 * Use for: paddingHorizontal, marginHorizontal, gap, width adjustments
 */
export const spacingScale = {
	/** 2px - Fine details, label offsets */
	xxs: scale(2),
	/** 4px - Small gaps, error message spacing */
	xs: scale(4),
	/** 8px - Tight spacing, inline elements */
	sm: scale(8),
	/** 12px - Medium gaps, icon margins */
	md: scale(12),
	/** 16px - Standard spacing */
	lg: scale(16),
	/** 20px - Large spacing, card padding */
	xl: scale(20),
	/** 24px - Extra large, screen padding */
	xxl: scale(24),
	/** 32px - Major sections */
	xxxl: scale(32),
	/** 40px - Large sections, icon containers */
	xxxxl: scale(40),
} as const;

/**
 * Vertical spacing scale
 * Use for: paddingVertical, marginVertical, height adjustments
 */
export const verticalSpacing = {
	/** 2px - Button label padding */
	xxs: verticalScale(2),
	/** 4px - Error message margins */
	xs: verticalScale(4),
	/** 8px - Title margins, small spacing */
	sm: verticalScale(8),
	/** 16px - Input margins, button padding */
	md: verticalScale(16),
	/** 20px - Back button margins, screen padding */
	lg: verticalScale(20),
	/** 24px - Form spacing, section margins */
	xl: verticalScale(24),
	/** 32px - Header margins */
	xxl: verticalScale(32),
	/** 40px - Bottom section padding, large margins */
	xxxl: verticalScale(40),
} as const;

// ============================================================================
// BORDER RADIUS
// Using moderateScale for consistent rounded corners
// ============================================================================

export const borderRadius = {
	/** 4px - Small elements, dots */
	xs: moderateScale(4),
	/** 5px - Animated dots */
	sm: moderateScale(5),
	/** 12px - Inputs, cards, standard components */
	md: moderateScale(12),
	/** 20px - Back buttons, small icon circles */
	lg: moderateScale(20),
	/** 28px - Social buttons, medium circles */
	xl: moderateScale(28),
	/** 70px - Icon containers (half of 140px diameter) */
	xxl: moderateScale(70),
	/** 80px - Large icon circles (half of 160px diameter) */
	xxxl: moderateScale(80),
	/** 100px - Pill-shaped buttons (fully round) */
	full: moderateScale(100),
} as const;

// ============================================================================
// COMPONENT SIZES
// Fixed dimensions for common UI components
// ============================================================================

export const componentSizes = {
	/**
	 * Icon sizes - using moderateScale for responsive icons
	 */
	icon: {
		/** 20px - TextInput icons, small icons */
		small: moderateScale(20),
		/** 24px - Button icons, standard icons */
		medium: moderateScale(24),
		/** 40px - Back buttons (container size) */
		large: moderateScale(40),
		/** 56px - Social buttons, large icons */
		xLarge: moderateScale(56),
		/** 80px - Welcome screen, onboarding */
		xxLarge: moderateScale(80),
	},

	/**
	 * Button dimensions
	 */
	button: {
		/** 60px - Standard button height */
		height: verticalScale(60),
		/** 60px - Minimum button height */
		minHeight: verticalScale(60),
		/** 24px - Horizontal padding */
		paddingHorizontal: scale(24),
		/** 16px - Vertical padding */
		paddingVertical: verticalScale(16),
		/** 2px - Label vertical padding */
		labelPadding: verticalScale(2),
		/** 10px - Gap between icon and text */
		iconGap: scale(10),
		/** 200px - Minimum width (onboarding buttons) */
		minWidth: moderateScale(200),
	},

	/**
	 * Input field dimensions
	 */
	input: {
		/** 52px - Input height */
		height: verticalScale(52),
		/** 16px - Horizontal padding */
		padding: scale(16),
		/** 12px - Icon left/right margin */
		iconMargin: scale(12),
		/** 4px - Right icon touch padding */
		iconPadding: moderateScale(4),
		/** 8px - Label bottom margin */
		labelMargin: verticalScale(8),
		/** 4px - Error top margin */
		errorMargin: verticalScale(4),
		/** 4px - Error left margin */
		errorMarginLeft: scale(4),
		/** 16px - Container bottom margin */
		containerMargin: verticalScale(16),
	},

	/**
	 * Screen layout dimensions
	 */
	screen: {
		/** 24px - Standard horizontal padding */
		paddingHorizontal: scale(24),
		/** 20px - Standard vertical padding */
		paddingVertical: verticalScale(20),
	},

	/**
	 * Back button dimensions
	 */
	backButton: {
		/** 40x40px - Back button size */
		size: moderateScale(40),
		/** 20px - Border radius (half of size for circle) */
		borderRadius: moderateScale(20),
		/** 20px - Margin below */
		marginBottom: verticalScale(20),
	},

	/**
	 * Social login button dimensions
	 */
	socialButton: {
		/** 56x56px - Social login button size */
		size: moderateScale(56),
		/** 28px - Border radius (half of size for circle) */
		borderRadius: moderateScale(28),
		/** 16px - Gap between social buttons */
		gap: scale(16),
	},

	/**
	 * Icon container dimensions (welcome, onboarding)
	 */
	iconContainer: {
		/** 140px - Welcome screen icon circle */
		small: moderateScale(140),
		/** 160px - Onboarding icon circle */
		medium: moderateScale(160),
	},

	/**
	 * Shadow offsets
	 */
	shadow: {
		/** 2px - Button shadow offset height */
		offsetHeight: verticalScale(2),
	},

	/**
	 * Divider dimensions
	 */
	divider: {
		/** 1px - Divider line height (no scaling) */
		height: 1,
		/** 16px - Text horizontal margin */
		textMargin: scale(16),
	},

	/**
	 * Dots (onboarding pagination)
	 */
	dots: {
		/** 10px - Dot height */
		height: moderateScale(10),
		/** 5px - Dot border radius */
		borderRadius: moderateScale(5),
		/** 4px - Dot horizontal margin */
		margin: moderateScale(4),
		/** 20px - Dots container height */
		containerHeight: moderateScale(20),
	},

	/**
	 * Loading spinner dimensions
	 * Note: Values are unscaled for consistent animation performance
	 */
	loading: {
		/** 60px - Sound wave height (unscaled - animation reference) */
		waveHeight: 60,
		/** 6px - Bar width (unscaled - visual balance) */
		barWidth: 6,
		/** 4px - Bar border radius (unscaled) */
		barBorderRadius: 4,
		/** 4px - Bar horizontal margin (unscaled) */
		barMargin: 4,
		/** 20px - Container padding (unscaled) */
		containerPadding: 20,
		/** 20px - Container margin bottom (unscaled) */
		containerMarginBottom: 20,
	},
} as const;

// ============================================================================
// CONVENIENCE EXPORTS
// Pre-configured spacing for common patterns
// ============================================================================

export const commonSpacing = {
	/** 16px - Between form fields */
	formFieldGap: verticalSpacing.md,
	/** 24px - Between form sections */
	formSectionGap: verticalSpacing.xl,

	/** Screen padding presets */
	screenPadding: {
		/** 24px - Horizontal */
		horizontal: spacingScale.xxl,
		/** 20px - Vertical */
		vertical: verticalSpacing.lg,
	},

	/** 20px - Card/Container padding */
	cardPadding: spacingScale.xl,

	/** 10px - Icon-text gap */
	iconTextGap: componentSizes.button.iconGap,
	/** 16px - Social button gap */
	socialButtonGap: componentSizes.socialButton.gap,
} as const;

// ============================================================================
// TYPE EXPORTS
// For TypeScript autocomplete and type safety
// ============================================================================

export type SpacingScaleKey = keyof typeof spacingScale;
export type VerticalSpacingKey = keyof typeof verticalSpacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ComponentSizesKey = keyof typeof componentSizes;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
	spacingScale,
	verticalSpacing,
	borderRadius,
	componentSizes,
	commonSpacing,
};
